import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import type {
  smoobuReservation,
  smoobuReservationsResponse,
} from '~/types/smoobu';
import { getErrorMessage, reportError } from '~/utils/errors';
import { prisma } from '~/server/db';

// type ReservationCreateInput = {
//   smoobuId: number;
//   referenceId?: string;
//   villaId?: number;
//   channelId?: number;
//   arrival: Date;
//   departure: Date;
//   createdAt: Date;
//   guestName: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   adults: number;
//   children: number;
//   note: string;
//   extraNote: string;
//   amount: number;
//   currency: string;
//   commission: number;
//   cancelled: boolean;
// };

export default async function manuallyUpdateReservations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('here');
    const smoobuApiUrl: string = process.env.SMOOBU_API_URL ?? '';
    const url = smoobuApiUrl + '/reservations';

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Api-Key': process.env.SMOOBU_API_KEY,
    };

    const params = {
      showCancellation: true,
    };

    console.log({ url, headers, params });

    const {
      data: { page_count, bookings },
    }: { data: smoobuReservationsResponse } = await axios.get(url, {
      headers,
      params,
    });

    let reservations: smoobuReservation[] = bookings;
    let count = page_count < 2 ? page_count : 2;

    while (count < page_count) {
      const {
        data: { bookings: newBookings },
      }: { data: smoobuReservationsResponse } = await axios.get(url, {
        headers,
        params: { ...params, page: count },
      });

      reservations = [...reservations, ...newBookings];

      count += 1;
    }

    if (reservations.length > 0) {
      const response = await Promise.all(
        reservations.map(async (res) => {
          const smoobuId = res.id;

          const reservationData = {
            smoobuId,
            referenceId: res['reference-id'] ?? '',
            villaId: res.apartment.id ?? 0,
            channelId: res.channel.id ?? 0,
            arrival: new Date(res['arrival']) ?? new Date(),
            departure: new Date(res['departure']) ?? new Date(),
            createdAt: new Date(res['created-at']) ?? new Date(),
            guestName: res['guest-name'],
            firstName: res.firstname,
            lastName: res.lastname,
            email: res.email,
            phone: res.phone,
            adults: res.adults,
            children: res.children,
            note: res['notice'],
            extraNote: res['assistant-notice'],
            amount: res.price,
            currency: 'IDR',
            commission: res['commission-included'],
            cancelled: res.type === 'cancellation',
          };

          return await prisma.reservation.upsert({
            where: { smoobuId },
            create: reservationData,
            update: reservationData,
            select: {
              smoobuId: true,
            },
          });
        })
      );

      res.status(200).json(response);
    } else {
      throw new Error('No reservations found for manuallyUpdateReservations');
    }
  } catch (error) {
    reportError({ message: getErrorMessage(error), res });
    //console.log({ message: getErrorMessage(error) });
    //res.status(500).json({ message: getErrorMessage(error) });
  }
}
