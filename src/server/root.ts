import { router, publicProcedure, protectedProcedure } from './trpc';
import prisma from '@/lib/db';
import { z } from 'zod';

export const appRouter = router({
  getWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),
  
  createWorkspace: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return prisma.workspace.create({
        data: {
          name: input.name,
          members: {
            create: {
              userId: ctx.session.user.id,
              role: 'ADMIN',
            },
          },
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
