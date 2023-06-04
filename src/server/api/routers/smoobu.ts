import { z } from 'zod';
import { manuallyUpdateReservations } from '~/utils/smoobu';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

// date-fns eachDayOfInterval

export const smoobuRouter = createTRPCRouter({
  //getBlockedDates: publicProcedure.query(() => {}),

  update: publicProcedure.mutation(async ({ ctx }) => {
    try {
      // const reservation = await ctx.prisma.reservation.findFirst({
      //   where: { smoobuId: 37705951 },
      // });
      // console.log({ reservation });
      await manuallyUpdateReservations();
    } catch (err) {
      console.error(err);
    }
  }),

  getFutureReservations: publicProcedure
    .input(z.object({ villaId: z.number() }))
    .query(async ({ ctx }) => {
      const futureReservations = await ctx.prisma.reservation.findMany({
        where: {
          departure: {
            gt: new Date(),
          },
        },
        select: {
          id: true,
          arrival: true,
          departure: true,
        },
      });

      console.log({ futureReservations });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
