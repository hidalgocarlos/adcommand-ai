import { Worker } from 'bullmq';
import { redis } from '../redis';
import { db } from '../db';
import { MetaAdsApi } from '../meta/api';
import { decrypt } from '../crypto';

export const syncWorker = new Worker(
  'meta-sync',
  async (job) => {
    const { connectionId } = job.data;
    
    const connection = await db.adConnection.findUnique({
      where: { id: connectionId },
    });

    if (!connection || connection.status !== 'ACTIVE') {
      console.log(`Connection ${connectionId} not found or inactive.`);
      return;
    }

    const decryptedToken = decrypt(connection.accessToken);
    const metaApi = new MetaAdsApi(decryptedToken);

    console.log(`Starting sync for ${connection.name} (${connection.adAccountId})`);

    // 1. Fetch Campaigns
    const campaigns = await metaApi.getCampaigns(connection.adAccountId);
    
    for (const camp of campaigns) {
      await db.campaign.upsert({
        where: { externalId: camp.id },
        update: {
          name: camp.name,
          status: camp.status,
          objective: camp.objective,
          budget: camp.daily_budget || camp.lifetime_budget,
        },
        create: {
          externalId: camp.id,
          workspaceId: connection.workspaceId,
          connectionId: connection.id,
          name: camp.name,
          status: camp.status,
          objective: camp.objective,
          budget: camp.daily_budget || camp.lifetime_budget,
        },
      });

      // 2. Fetch Insights for this campaign
      const insights = await metaApi.getCampaignInsights(camp.id);
      for (const ins of insights) {
        await db.campaignInsight.create({
          data: {
            campaignId: camp.id, // This should map to internal ID in a real case, but using external as placeholder
            date: new Date(ins.date_start),
            spend: parseFloat(ins.spend),
            impressions: parseInt(ins.impressions),
            clicks: parseInt(ins.clicks),
            conversions: parseInt(ins.conversions[0]?.value || "0"),
            revenue: parseFloat(ins.conversions[0]?.revenue || "0"),
          },
        });
      }
    }

    console.log(`Sync completed for ${connection.id}`);
  },
  { connection: redis }
);
