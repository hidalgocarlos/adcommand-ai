import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';
import type { NextRequest } from 'next/server';

interface CreateContextOptions {
  req: NextRequest;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  const session = await auth();
  return {
    session,
    req: opts.req,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
