'use server';
import { db } from '~/server/db';

export const lookupReservation = async (reservationId: string) => {
  try {
    const reservation = await db.reservation.findFirst({
      where: {
        id: reservationId,
      },
      select: {
        smoobu_id: true,
      },
    });
    if (!reservation) {
      console.log('Could not find reservation');
      return { smoobuId: null, error: 'Could not find reservation' };
    }
    return { smoobuId: reservation?.smoobu_id, error: null };
  } catch (error) {
    console.log('Error finding reservation:', error);
    return { smoobuId: null, error: 'Error finding reservation' };
  }
};
