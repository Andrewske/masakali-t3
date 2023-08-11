import { createTRPCRouter } from '~/app/api/trpc';
import { smoobuRouter } from '~/app/api/routers/smoobu';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  smoobu: smoobuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
