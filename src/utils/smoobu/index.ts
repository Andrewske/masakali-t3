import { db } from '~/server/db';
import { channelIds } from '~/lib/smoobu';
import { akashaId, lakshmiId } from '~/lib/villas';
import type { SmoobuReservation } from '~/types/smoobu';

function parseSmoobuReservation(smoobuReservation: SmoobuReservation) {
  const {
    id: smoobu_id,
    'reference-id': reference_id,
    apartment: { id: villa_id },
    channel: { id: channel_id },
    arrival,
    departure,
    'created-at': created_at,
    'guest-name': guest_name,
    firstname: first_name,
    lastname: last_name,
    email,
    phone,
    adults,
    children,
    notice: note,
    'assistant-notice': extra_note,
    price: amount,
    'commission-included': commission,
  } = smoobuReservation;
  return {
    smoobu_id,
    reference_id,
    villa_id,
    channel_id,
    arrival: new Date(arrival).toISOString(),
    departure: new Date(departure).toISOString(),
    created_at: new Date(created_at).toISOString(),
    guest_name,
    first_name,
    last_name,
    email,
    phone,
    adults,
    children,
    note,
    extra_note,
    amount,
    commission,
  };
}

export async function createReservation(smoobuReservation: SmoobuReservation) {
  // Parse the SmoobuReservation object to match the structure expected by your database
  const reservationData = parseSmoobuReservation(smoobuReservation);

  // Use Prisma to create a new reservation in the database
  const { villa_id, ...otherReservationData } = reservationData;

  const newReservation = await dbreservation.create({
    data: {
      ...otherReservationData,
      villa: {
        connect: {
          id: villa_id,
        },
      },
    },
  });

  const { arrival, departure } = reservationData;

  if (villa_id === lakshmiId) {
    console.log('Blocking Akasha');
    await blockVilla(akashaId, arrival, departure);
  }

  if (villa_id === akashaId) {
    console.log('Blocking Lakshmi');
    await blockVilla(lakshmiId, arrival, departure);
  }

  return newReservation;
}

export async function updateReservation(smoobuReservation: SmoobuReservation) {
  const smoobuId = smoobuReservation.id;
  // Update the reservation

  const { villa_id, ...otherReservationData } =
    parseSmoobuReservation(smoobuReservation);
  await dbreservation.upsert({
    where: {
      smoobu_id: smoobuId, // Use the smoobuId from the function argument
    },
    update: {
      ...otherReservationData, // Exclude villaId from this object
      villa: {
        connect: {
          id: villa_id, // Connect to the villa by its ID
        },
      },
    },
    create: {
      ...otherReservationData,
      // Exclude villaId from this object
      villa: {
        connect: {
          id: villa_id, // Connect to the villa by its ID
        },
      },
    },
  });

  if (villa_id === lakshmiId) {
    console.log('Blocking Akasha');
    await blockVilla(
      akashaId,
      smoobuReservation.arrival,
      smoobuReservation.departure
    );
  }

  if (villa_id === akashaId) {
    console.log('Blocking Lakshmi');
    await blockVilla(
      lakshmiId,
      smoobuReservation.arrival,
      smoobuReservation.departure
    );
  }

  return;
}

export async function cancelReservation(smoobu_id: number) {
  // First, find the reservation by smoobuId to get its id
  const reservation = await dbreservation.findUnique({
    where: {
      smoobu_id,
    },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // Then, use the id to update the reservation
  return await dbreservation.update({
    where: {
      id: reservation.id, // Use the id obtained from the previous query
    },
    data: {
      cancelled: true,
    },
  });
}

export async function deleteReservation(smoobu_id: number) {
  // First, find the reservation by smoobuId to get its id
  const reservation = await dbreservation.findUnique({
    where: {
      smoobu_id,
    },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // Then, use the id to delete the reservation
  return await dbreservation.delete({
    where: {
      id: reservation.id, // Use the id obtained from the previous query
    },
  });
}

type CreateBookingResponse = {
  id: number;
};

// Utility function to validate API key
function validateApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    throw new Error(
      'SMOOBU_API_KEY is not defined in the environment variables'
    );
  }
  return apiKey;
}

type SmoobuErrorResponse = {
  status: string;
  detail: string;
  validation_messages: { [type: string]: string }[];
};

// Refactored blockVilla function
export async function blockVilla(
  villaId: number,
  arrival: string,
  departure: string
) {
  const apiKey = validateApiKey(process.env.SMOOBU_API_KEY);

  const data = {
    arrivalDate: arrival,
    departureDate: departure,
    apartmentId: villaId,
    channelId: channelIds['blocked'],
    firstName: 'Masakali',
    lastName: 'Blocked',
    email: 'N/A',
  };

  try {
    console.log('fetching');
    const response = await fetch('https://login.smoobu.com/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const bodyText = await response.text();
      const body = JSON.parse(bodyText) as SmoobuErrorResponse;
      console.log(body.validation_messages);
      throw new Error(
        `Failed to block the villa. Status: ${response.status} ${response.statusText}`
      );
    }

    const { id: smoobu_id } = (await response.json()) as CreateBookingResponse;

    await dbreservation.create({
      data: {
        arrival: data.arrivalDate,
        departure: data.departureDate,
        smoobu_id,
        channel_id: channelIds['blocked'],
        villa: {
          connect: {
            id: villaId,
          },
        },
        created_at: new Date(),
      },
    });

    return smoobu_id;
  } catch (error) {
    console.error('Error blocking villa:', error);
    throw error;
  }
}
