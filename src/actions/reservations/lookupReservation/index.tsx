'use server';
import { db } from '~/server/db';
import { logAndPosthog } from '~/utils/posthogServerError';
import { tryCatch } from '~/utils/tryCatch';

export const lookupReservation = async (reservationId: string) => {
  if (!reservationId) {
    return { data: null, error: 'No reservation ID provided' };
  }

  try {
    const { data: reservation, error: reservationError } = await tryCatch(
      db.reservation.findFirst({
        where: {
          id: reservationId,
        },
      })
    );

    if (reservationError || !reservation) {
      throw reservationError ?? new Error('Could not find reservation');
    }

    const { data: pricing, error: pricingError } = await tryCatch(
      db.reservation.findFirst({
        where: {
          id: reservationId,
        },
        include: {
          villa: {
            include: {
              pricing: {
                where: {
                  date: {
                    gte: new Date(reservation.arrival),
                    lte: new Date(reservation.departure),
                  },
                },
              },
            },
          },
        },
      })
    );

    if (pricingError || !pricing) {
      throw pricingError ?? new Error('Could not find pricing');
    }

    return {
      data: {
        ...reservation,
        ...pricing,
        arrival: new Date(reservation.arrival)
          .toISOString()
          .split('T')[0] as string,
        departure: new Date(reservation.departure)
          .toISOString()
          .split('T')[0] as string,
      },
      error: null,
    };
  } catch (error) {
    await logAndPosthog({
      message: 'Error finding reservation',
      error,
      level: 'error',
      data: { location: 'lookupReservation', reservationId },
    });
    return { data: null, error: 'Could not find reservation' };
  }
};
