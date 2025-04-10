import axios from 'axios';

import type { SmoobuReservation } from '~/types/smoobu';
import { db } from '~/server/db';
import { NextResponse } from 'next/server';
type TransformedReservation = {
  smoobu_id: number;
  reference_id: string;
  villa_id: number;
  channel_id: number;
  arrival: Date;
  departure: Date;
  created_at: Date;
  guest_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  note: string;
  extra_note: string;
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
    smoobu_id: res.id,
    reference_id: res['reference-id'],
    villa_id: res.apartment?.id ?? 0,
    channel_id: res.channel?.id ?? 0,
    arrival: new Date(res['arrival']),
    departure: new Date(res['departure']),
    created_at: new Date(res['created-at']),
    guest_name: res['guest-name'],
    first_name: res.firstname,
    last_name: res.lastname,
    email: res.email,
    phone: res.phone,
    adults: res.adults,
    children: res.children,
    note: res['notice'],
    extra_note: res['assistant-notice'],
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
): Promise<{ smoobu_id: number | null }> {
  const currentReservation = await db.reservation.findUnique({
    where: { smoobu_id: reservationData.smoobu_id },
  });

  if (!currentReservation) {
    return await db.reservation.create({
      data: reservationData,
      select: {
        smoobu_id: true,
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
    return await db.reservation.update({
      where: { smoobu_id: reservationData.smoobu_id },
      data: reservationData,
      select: {
        smoobu_id: true,
      },
    });
  }

  return { smoobu_id: reservationData.smoobu_id };
  // return await db.reservation.upsert({
  //   where: { smoobu_id: reservationData.smoobu_id ?? '' },
  //   create: reservationData,
  //   update: reservationData,
  //   select: {
  //     smoobu_id: true,
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
