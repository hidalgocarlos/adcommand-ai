import { router } from "./trpc";
import { workspaceRouter } from "./routers/workspace";
import { metaRouter } from "./routers/meta";
import { aiRouter } from "./routers/ai";

export const appRouter = router({
  workspaces: workspaceRouter,
  meta: metaRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
