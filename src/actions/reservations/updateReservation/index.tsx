'use server';
import { prisma } from '~/db/prisma';

type ReservationDataType = {
  smoobu_id?: number | null;
  villa_id?: number;
  arrival?: Date;
  departure?: Date;
  guest_name?: string;
  email?: string;
  phone?: string;
  adults?: number;
  children?: number;
  note?: string;
  amount?: number;
  currency?: string;
};

export const updateReservation = async ({
  reservationId,
  data,
}: {
  reservationId: string;
  data: ReservationDataType;
}) => {
  try {
    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data,
      select: {
        id: true,
      },
    });
    if (reservation.id) {
      console.log('Reservation updated:', reservation.id);
      return reservation.id;
    } else {
      console.log('Error updating reservation');
      return null;
    }
  } catch (error) {
    console.log('Error updating reservation:', error);
    return null;
  }
};
