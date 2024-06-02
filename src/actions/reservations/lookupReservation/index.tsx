'use server';
import { prisma } from '~/db/prisma';

export const lookupReservation = async (reservationId: string) => {
  try {
    const reservation = await prisma.reservation.findFirst({
      where: {
        id: reservationId,
      },
      select: {
        smoobu_id: true,
      },
    });
    if (!reservation) {
      console.log('Could not find reservation');
      return null;
    }
    return reservation?.smoobu_id;
  } catch (error) {
    console.log('Error finding reservation:', error);
    return null;
  }
};
