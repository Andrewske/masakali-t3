import { createTRPCRouter } from '~/server/api/trpc';
import { exampleRouter } from '~/server/api/routers/example';
import { smoobuRouter } from '~/server/api/routers/smoobu';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  smoobu: smoobuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
