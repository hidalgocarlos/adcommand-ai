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

      // 2. Fetch Insights for this campaign (Last 30 days)
      const timeRange = {
        since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        until: new Date().toISOString().split('T')[0]
      };
      
      const insights = await metaApi.getCampaignInsights(camp.id, timeRange);
      
      for (const ins of insights) {
        await db.campaignInsight.create({
          data: {
            campaignId: camp.id,
            date: new Date(ins.date_start),
            spend: parseFloat(ins.spend),
            impressions: parseInt(ins.impressions),
            clicks: parseInt(ins.clicks),
            conversions: parseInt(ins.actions?.find(a => a.action_type === 'offsite_conversion.fb_pixel_purchase')?.value || "0"),
            revenue: parseFloat(ins.action_values?.find(a => a.action_type === 'offsite_conversion.fb_pixel_purchase')?.value || "0"),
          },
        });
      }
    }

    console.log(`Sync completed for ${connection.id}`);
  },
  { connection: redis as any }
);
