import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getFutureReservations } from '~/utils/reservations';
import { normalizeDate, getDatesBetweenDates } from '~/utils';
import { reportError, getErrorMessage } from '~/utils/errors';
import { villas } from '~/utils/smoobu';
import {
  eachDayOfInterval,
  format,
  addDays,
  isAfter,
  parse,
  areIntervalsOverlapping,
} from 'date-fns';

export const runtime = 'edge';

const date = new Date();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const arrival = parse(
      searchParams.get('arrival') ?? '',
      'yyyy-MM-dd',
      date
    );
    const departure = parse(
      searchParams.get('arrival') ?? '',
      'yyyy-MM-dd',
      date
    );

    if (arrival == departure) throw new Error('Invalid dates');

    const futureReservations = await getFutureReservations({
      startDate: arrival,
      endDate: departure,
    });

    const villaBlocked = new Set<number>();
    const allVillas = new Set(Object.values(villas));

    // Check each reservation to see if it overlaps
    // if so, then add the villaId to blocked list
    futureReservations.forEach((reservation) => {
      /* The code is checking if two date intervals overlap using the `areIntervalsOverlapping`
      function from the `date-fns` library. */
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

    return NextResponse.json(Array(allVillas));
  } catch (error) {
    reportError({
      message: getErrorMessage(error),
    });
  }
}
