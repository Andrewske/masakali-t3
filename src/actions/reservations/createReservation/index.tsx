'use server';
import { env } from '~/env.mjs';
import { prisma } from '~/db/prisma';
import type { VillaIdsType } from '~/lib/villas';

export const createReservation = async ({
  villaId,
  checkin,
  checkout,
}: {
  villaId: VillaIdsType;
  checkin: Date;
  checkout: Date;
}) => {
  try {
    const reservation = await prisma.reservation.create({
      data: {
        villa_id: Number(villaId),
        arrival: checkin,
        departure: checkout,
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
