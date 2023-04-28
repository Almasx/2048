import { createTRPCRouter } from "~/server/api/trpc";
import { scoreRouter } from "~/server/api/routers/score";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  score: scoreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
