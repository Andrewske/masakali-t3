import { z } from 'zod';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

import { type Matcher } from 'react-day-picker';

import { eachDayOfInterval, format, add, sub } from 'date-fns';
// date-fns eachDayOfInterval

const suryaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_SURYA_ID ?? '');
const chandraId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_CHANDRA_ID ?? '');
const jalaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_JALA_ID ?? '');
const akashaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_AKASHA_ID ?? '');
const lakshmiId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_LAKSHMI_ID ?? '');

const villaIds = [suryaId, chandraId, jalaId, akashaId, lakshmiId];

export const smoobuRouter = createTRPCRouter({
  //getBlockedDates: publicProcedure.query(() => {}),

  update: publicProcedure.mutation(({ ctx }) => {
    try {
      // const reservation = await ctx.prisma.reservation.findFirst({
      //   where: { smoobuId: 37705951 },
      // });
      // console.log({ reservation });
      return;
    } catch (err) {
      console.error(err);
    }
  }),

  getAllBlockedDates: publicProcedure.query(async ({ ctx }) => {
    // Query for all future reservations
    const futureReservations = await ctx.prisma.reservation.findMany({
      where: {
        departure: {
          gt: new Date(),
        },
        cancelled: false,
      },
      select: {
        id: true,
        arrival: true,
        departure: true,
        villaId: true,
      },
    });

    const isArrival = true;

    const allBlockedDates: { [key: number]: Set<string> } = {};

    // Add each villa and their blocked dates to Object and return
    for (const villaId of villaIds) {
      const villaReservations = futureReservations.filter(
        (res) => res.villaId === villaId
      );

      if (villaReservations.length > 0) {
        allBlockedDates[villaId] = new Set(
          getBlockedDatesFromReservations({
            reservations: villaReservations,
            isArrival: true,
          })
        );
      } else {
        allBlockedDates[villaId] = new Set();
      }
    }
    return allBlockedDates;
  }),
  getDisabledDates: publicProcedure
    .input(z.object({ startDate: z.date() }))
    .query(async ({ input: { startDate }, ctx }) => {
      // Query for all future reservations
      const futureReservations = await ctx.prisma.reservation.findMany({
        where: {
          departure: {
            gt: startDate,
          },
          cancelled: false,
        },
        select: {
          id: true,
          arrival: true,
          departure: true,
          villaId: true,
        },
      });

      const dateHash = new Map<string, number>();

      //const allDates = getBlockedDatesFromReservations(futureReservations);

      const daysBefore = eachDayOfInterval({
        start: sub(startDate, { years: 1 }),
        end: startDate,
      });

      console.log({ allDates });

      allDates.forEach((dateStr: string) => {
        const value = dateHash.get(dateStr) ?? 0;
        dateHash.set(dateStr, value + 1);
      });

      const disabledDates = [
        ...new Set(
          [...dateHash]
            .filter(([date, value]) => value === villaIds.length)
            .map(([date, value]) => new Date(date))
        ),
      ];

      const allDisabledDates = [...new Set([...daysBefore, ...disabledDates])];

      return allDisabledDates as Matcher;
    }),

  getBlockedDatesForVilla: publicProcedure
    .input(z.object({ villaId: z.number() }))
    .query(async ({ input: { villaId }, ctx }) => {
      const futureReservations = await ctx.prisma.reservation.findMany({
        where: {
          villaId,
          departure: {
            gt: new Date(),
          },
          cancelled: false,
        },
        select: {
          id: true,
          arrival: true,
          departure: true,
          villaId: true,
        },
      });

      //return getBlockedDatesFromReservations(futureReservations);
    }),
});

type BlockedDate = {
  id: string;
  arrival: Date;
  departure: Date;
  villaId: number;
};

type BlockedDatesOptions = {
  reservations: {
    id: string;
    villaId: number;
    arrival: Date;
    departure: Date;
  }[];
  isArrival: boolean;
};

const getBlockedDatesFromReservations = ({
  reservations,
  isArrival,
}: BlockedDatesOptions) => {
  const allBlockedDates = reservations.map((res) => {
    // get the days between the arrival and departure and format as a string
    const arrival = res.arrival ?? new Date();
    const departure = res.departure ?? new Date();
    let reservationDates = eachDayOfInterval({
      start: add(arrival, { days: 0 }),
      end: departure,
    });

    if (isArrival) {
      reservationDates = reservationDates.filter(
        (date) => date !== departure && date >= arrival
      );
    } else {
      reservationDates = reservationDates.filter((date) => date > arrival);
    }

    return reservationDates.map((date) => format(date, 'yyyy-MM-dd'));
  });

  // return an array of date strings
  return allBlockedDates.flat();
};
