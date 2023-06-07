import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { getFutureReservations } from '~/utils/reservations';

import {
  eachDayOfInterval,
  format,
  addDays,
  isAfter,
  areIntervalsOverlapping,
} from 'date-fns';
import { normalizeDate } from '~/utils';
// date-fns eachDayOfInterval

const suryaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_SURYA_ID ?? '');
const chandraId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_CHANDRA_ID ?? '');
const jalaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_JALA_ID ?? '');
const akashaId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_AKASHA_ID ?? '');
const lakshmiId = parseInt(process.env.NEXT_PUBLIC_SMOOBU_LAKSHMI_ID ?? '');

const villaIds = [suryaId, chandraId, jalaId, akashaId, lakshmiId];

export const smoobuRouter = createTRPCRouter({
  getAllBlockedDates: publicProcedure
    .input(z.object({ arrival: z.date(), departure: z.date() }))
    .query(async ({ input: { arrival, departure }, ctx }) => {
      // Query for all future reservations
      const futureReservations = await getFutureReservations({
        startDate: arrival,
        endDate: departure,
      });

      const villaBlocked = new Set<number>();
      const allVillas = new Set(villaIds);

      // Check each reservation to see if it overlaps
      // if so, then add the villaId to blocked list
      futureReservations.forEach((reservation) => {
        const overlap = areIntervalsOverlapping(
          {
            start: normalizeDate(reservation.arrival),
            end: normalizeDate(reservation.departure),
          },
          {
            start: normalizeDate(arrival),
            end: normalizeDate(departure),
          }
        );

        if (overlap) {
          villaBlocked.add(reservation.villaId);
        }
      });

      // Remove blocked villas from list of Ids and return the remaining list
      for (const id of villaBlocked) {
        allVillas.delete(id);
      }

      return Array(allVillas);
    }),
  getDisabledDates: publicProcedure
    .input(z.object({ type: z.string().nullable(), startDate: z.date() }))
    .query(async ({ input: { type, startDate }, ctx }) => {
      // Query for all future reservations
      const futureReservations = await getFutureReservations({
        startDate,
      });

      const occupancyMap: Record<string, Set<number>> = {};

      // Create a map of all the reserved dates and number of villas with that date reserved
      futureReservations.forEach((reservation) => {
        const dates = eachDayOfInterval({
          start: addDays(reservation.arrival, 1),
          end: addDays(reservation.departure, 1),
        });

        // Remove first or last date based on the type
        if (type && type === 'arrival') {
          dates.pop();
        }
        if (type && type === 'departure') {
          dates.shift();
        }

        dates.forEach((date) => {
          if (isAfter(date, startDate)) {
            const dateStr = format(date, 'yyyy-MM-dd');

            if (!occupancyMap[dateStr]) {
              occupancyMap[dateStr] = new Set();
            }

            occupancyMap[dateStr]?.add(reservation.villaId);
          }
        });
      });

      // Filter dates blocked by every villa and sort by date
      const disabledDates = Object.keys(occupancyMap)
        .filter((date) => occupancyMap[date]?.size === villaIds.length)
        .sort((a, b) => a.localeCompare(b));

      // To find the disabled departure dates
      // find dates between the startDate and earliest date in the occupancyMap
      if (type === 'departure') {
        const nextDisabledDate = new Date(disabledDates[0] ?? '');

        const betweenDates = [];

        while (startDate.getTime() < nextDisabledDate.getTime()) {
          const dateStr = format(startDate, 'yyyy-MM-dd');

          betweenDates.push(dateStr);

          startDate = addDays(startDate, 1);
        }

        return [format(nextDisabledDate, 'yyyy-MM-dd')];
      }

      return disabledDates;
    }),
});
