import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "@/lib/db";
import { AiAnalyzer } from "@/lib/ai/analyzer";
import { encrypt, decrypt } from "@/lib/crypto";

export const aiRouter = router({
  analyzeCampaign: protectedProcedure
    .input(z.object({
      campaignId: z.string(),
      workspaceId: z.string(),
      provider: z.enum(["OPENAI", "ANTHROPIC", "GOOGLE"]),
    }))
    .mutation(async ({ input }) => {
      const keyConfig = await db.aiKeyConfig.findUnique({
        where: {
          workspaceId_provider: {
            workspaceId: input.workspaceId,
            provider: input.provider,
          },
        },
      });

      if (!keyConfig) throw new Error(`API Key for ${input.provider} not found.`);

      const apiKey = decrypt(keyConfig.apiKey);
      
      const campaign = await db.campaign.findUnique({
        where: { id: input.campaignId },
        include: { insights: { orderBy: { date: "desc" }, take: 14 } },
      });

      if (!campaign) throw new Error("Campaign not found.");

      const analyzer = new AiAnalyzer(apiKey, input.provider);
      const analysisJson = await analyzer.analyzeCampaignPerformance(campaign);
      
      return db.aiAnalysis.create({
        data: {
          campaignId: input.campaignId,
          workspaceId: input.workspaceId,
          provider: input.provider,
          model: "standard",
          prompt: "Expert Performance Audit",
          rawResponse: JSON.stringify(analysisJson),
          recommendations: {
            create: (analysisJson as any).recommendations.map((rec: any) => ({
              type: rec.type,
              priority: rec.priority,
              title: rec.title,
              explanation: rec.explanation,
              impact: rec.impact,
            })),
          },
        },
        include: { recommendations: true },
      });
    }),

  saveKeys: protectedProcedure
    .input(z.object({
      workspaceId: z.string(),
      provider: z.enum(["OPENAI", "ANTHROPIC", "GOOGLE"]),
      apiKey: z.string(),
    }))
    .mutation(async ({ input }) => {
      const encryptedKey = encrypt(input.apiKey);
      
      return db.aiKeyConfig.upsert({
        where: {
          workspaceId_provider: {
            workspaceId: input.workspaceId,
            provider: input.provider,
          },
        },
        update: {
          apiKey: encryptedKey,
        },
        create: {
          workspaceId: input.workspaceId,
          provider: input.provider,
          apiKey: encryptedKey,
        },
      });
    }),
});
