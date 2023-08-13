import { createNextApiHandler } from '@trpc/server/adapters/next';
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import { env } from '~/env.mjs';
import { createTRPCContext } from '~/app/api/trpc';
import { appRouter } from '~/app/api/root';

// export API handler
const handler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          );
        }
      : undefined,
});

// const handler = (request: Request) => {
//   console.log(`incoming request ${request.url}`);
//   return fetchRequestHandler({
//     endpoint: '/api/trpc',
//     req: request,
//     router: appRouter,
//     createContext: function (
//       opts: FetchCreateContextFnOptions
//     ): object | Promise<object> {
//       // empty context
//       return {};
//     },
//   });
// };

export { handler as GET, handler as POST };
