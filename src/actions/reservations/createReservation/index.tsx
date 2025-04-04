'use server';
import { env } from '~/env';
import { db } from '~/server/db';
import type { VillaIdsType } from '~/lib/villas';

export const createReservation = async ({
  villaId,
  arrival,
  departure,
}: {
  villaId: VillaIdsType;
  arrival: string;
  departure: string;
}) => {
  try {
    const reservation = await db.reservation.create({
      data: {
        villa_id: Number(villaId),
        arrival: new Date(arrival),
        departure: new Date(departure),
        channel_id: Number(env.SMOOBU_SETTINGS_CHANNEL_ID),
      },
      select: {
        id: true,
      },
    });
    if (reservation.id) {
      console.log('Reservation created:', reservation.id);
      return reservation.id;
    } else {
      console.log('Error creating reservation');
      return null;
    }
  } catch (error) {
    console.log('Error creating reservation:', error);
    return null;
  }
};
