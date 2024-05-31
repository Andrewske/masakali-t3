import axios from 'axios';

import type { SmoobuReservation } from '~/types/smoobu';
import { prisma } from '~/db/prisma';
import { NextResponse } from 'next/server';
type TransformedReservation = {
  smoobuId: number;
  referenceId: string;
  villaId: number;
  channelId: number;
  arrival: Date;
  departure: Date;
  createdAt: Date;
  guestName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  note: string;
  extraNote: string;
  amount: number;
  currency: string;
  commission: number;
  cancelled: boolean;
};

export async function GET() {
  const { page_count, bookings } = await fetchSmoobuReservations();

  let reservations = bookings;
  for (let count = 2; count <= page_count; count++) {
    const { bookings: newBookings } = await fetchSmoobuReservations(count);
    reservations = [...reservations, ...newBookings];
  }

  const transformedData = reservations.map(transformReservationData);

  await upsertReservationsInBatches(transformedData);

  // for (const data of transformedData) {
  //   await upsertReservationToDatabase(data);
  // }

  // const response = await Promise.all(
  //   transformedData.map((data) => upsertReservationToDatabase(data))
  // );

  return NextResponse.json('Upserted all reservations to the database.');
}

type SmoobuReservationsResponse = {
  page_count: number;
  bookings: SmoobuReservation[];
};

async function fetchSmoobuReservations(
  page = 1
): Promise<SmoobuReservationsResponse> {
  const smoobuApiUrl: string = process.env.SMOOBU_API_URL ?? '';
  const url = smoobuApiUrl + '/reservations';

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Api-Key': process.env.SMOOBU_API_KEY,
  };

  const params = {
    showCancellation: true,
    page,
  };

  const response = await axios.get<SmoobuReservationsResponse>(url, {
    headers,
    params,
  });

  return response.data;
}

function transformReservationData(
  res: SmoobuReservation
): TransformedReservation {
  return {
    smoobuId: res.id,
    referenceId: res['reference-id'],
    villaId: res.apartment?.id ?? 0,
    channelId: res.channel?.id ?? 0,
    arrival: new Date(res['arrival']),
    departure: new Date(res['departure']),
    createdAt: new Date(res['created-at']),
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
}

/**
 * Upserts a reservation to the database.
 *
 * @param reservationData The data of the reservation to upsert.
 * @returns The upserted reservation.
 */
async function upsertReservationToDatabase(
  reservationData: TransformedReservation
): Promise<{ smoobuId: number | null }> {
  const currentReservation = await prisma.reservation.findUnique({
    where: { smoobuId: reservationData.smoobuId },
  });

  if (!currentReservation) {
    return await prisma.reservation.create({
      data: reservationData,
      select: {
        smoobuId: true,
      },
    });
  }
  let numberOfChanges = 0;
  for (const [key, value] of Object.entries(currentReservation)) {
    if (
      key in reservationData &&
      reservationData[key as keyof TransformedReservation] === value
    ) {
      numberOfChanges++;
    }
  }
  if (numberOfChanges > 0) {
    return await prisma.reservation.update({
      where: { smoobuId: reservationData.smoobuId },
      data: reservationData,
      select: {
        smoobuId: true,
      },
    });
  }

  return { smoobuId: reservationData.smoobuId };
  // return await prisma.reservation.upsert({
  //   where: { smoobuId: reservationData.smoobuId ?? '' },
  //   create: reservationData,
  //   update: reservationData,
  //   select: {
  //     smoobuId: true,
  //   },
  // });
}

async function upsertReservationsInBatches(
  reservations: TransformedReservation[]
): Promise<void> {
  const batchSize = 100; // Adjust based on your needs and database capabilities

  for (let i = 0; i < reservations.length; i += batchSize) {
    const batch = reservations.slice(i, i + batchSize);
    await Promise.all(
      batch.map((reservation) => upsertReservationToDatabase(reservation))
    );
  }
}
