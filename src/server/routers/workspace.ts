import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "@/lib/db";

export const workspaceRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.workspace.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        _count: {
          select: { members: true, connections: true },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return db.workspace.create({
        data: {
          name: input.name,
          slug: input.name.toLowerCase().replace(/ /g, "-"),
          members: {
            create: {
              userId: ctx.session.user.id,
              role: "ADMIN",
            },
          },
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return db.workspace.findUnique({
        where: { id: input.id },
        include: {
          members: {
            include: { user: true },
          },
          connections: true,
        },
      });
    }),
});
