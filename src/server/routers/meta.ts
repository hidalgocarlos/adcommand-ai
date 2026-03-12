import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/crypto";

export const metaRouter = router({
  connect: protectedProcedure
    .input(z.object({
      workspaceId: z.string(),
      name: z.string(),
      accessToken: z.string(),
      adAccountId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const encryptedToken = encrypt(input.accessToken);
      
      return db.adConnection.create({
        data: {
          workspaceId: input.workspaceId,
          provider: "META",
          name: input.name,
          accessToken: encryptedToken,
          adAccountId: input.adAccountId,
          status: "ACTIVE",
        },
      });
    }),

  listConnections: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ input }) => {
      return db.adConnection.findMany({
        where: { workspaceId: input.workspaceId },
      });
    }),
});
