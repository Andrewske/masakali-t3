import { prisma } from '~/db/prisma';
import { channelIds } from '~/lib/smoobu';
import { akashaId, lakshmiId, type VillaIdsType } from '~/lib/villas';
import type { SmoobuRatesResponse, SmoobuReservation } from '~/types/smoobu';

export const updateVillaPricing = async (
  villaId: number,
  date: Date,
  price: number,
  available: boolean
) => {
  await prisma.villaPricing.update({
    where: {
      villaId_date: {
        villaId,
        date,
      },
    },
    data: {
      price,
      available,
    },
  });
};

// export async function upsertVillaPricing({ data }: SmoobuRatesResponse) {
//   // Assuming data is an object where each key is a villa ID and the value is an object of pricing data
//   for (const [villaId, villaPricing] of Object.entries(data)) {
//     if (!villaPricing) {
//       console.log('No pricing data found for villa', villaId);
//       continue;
//     }

//     console.log('Upserting pricing data for villa', villaId);

//     for (const [date, pricing] of Object.entries(villaPricing)) {
//       if (!date || isNaN(Date.parse(date))) {
//         console.error(`Invalid date string: ${date}`);
//         continue; // Skip this iteration
//       }

//       await prisma.villaPricing.upsert({
//         where: {
//           villaId_date: {
//             villaId: parseInt(villaId),
//             date: new Date(date),
//           },
//         },
//         update: {
//           price: pricing?.price ?? 0,
//           available: pricing?.available !== 0,
//         },
//         create: {
//           villaId: parseInt(villaId),
//           date: new Date(date),
//           price: pricing?.price ?? 0,
//           available: pricing?.available !== 0,
//         },
//       });
//     }
//   }
// }

type VillaPricingDataType = {
  villaId: VillaIdsType;
  date: Date;
  price: number;
  available: boolean;
};

export async function batchVillaPricing({ data }: SmoobuRatesResponse) {
  const upsertData: VillaPricingDataType[] = [];

  console.log('Upserting pricing data for villas');

  Object.entries(data).forEach(([villaId, villaPricing]) => {
    if (!villaPricing) {
      console.log('No pricing data found for villa', villaId);
      return;
    }

    Object.entries(villaPricing).forEach(([dateStr, pricing]) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.error(`Invalid date string: ${dateStr}`);
        return;
      }

      const record: VillaPricingDataType = {
        villaId: parseInt(villaId) as VillaIdsType,
        date,
        price: pricing?.price ?? 0,
        available: pricing?.available !== 0,
      };

      upsertData.push(record);
    });
  });

  console.log('Upserting pricing data for', upsertData.length, 'villas');

  // Perform upsert operation
  try {
    // Function to split an array into chunks
    function chunkArray<T>(array: T[], chunkSize: number): T[][] {
      const chunks: T[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    }

    // Split upsertData into chunks of 100
    const upsertDataChunks = chunkArray(upsertData, 100);

    // Process each chunk in a separate transaction
    for (const chunk of upsertDataChunks) {
      await prisma.$transaction(
        chunk.map(({ villaId, date, ...rest }) =>
          prisma.villaPricing.upsert({
            where: { villaId_date: { villaId, date } },
            update: { ...rest },
            create: { villaId, date, ...rest },
          })
        )
      );
    }
    console.log('Upserted pricing data successfully');
  } catch (error) {
    console.error('Error during upsert:', error);
  }
}

function parseSmoobuReservation(smoobuReservation: SmoobuReservation) {
  const {
    id: smoobuId,
    'reference-id': referenceId,
    apartment: { id: villaId },
    channel: { id: channelId },
    arrival,
    departure,
    'created-at': createdAt,
    'guest-name': guestName,
    firstname: firstName,
    lastname: lastName,
    email,
    phone,
    adults,
    children,
    notice: note,
    'assistant-notice': extraNote,
    price: amount,
    'commission-included': commission,
  } = smoobuReservation;
  return {
    smoobuId,
    referenceId,
    villaId,
    channelId,
    arrival: new Date(arrival).toISOString(),
    departure: new Date(departure).toISOString(),
    createdAt: new Date(createdAt).toISOString(),
    guestName,
    firstName,
    lastName,
    email,
    phone,
    adults,
    children,
    note,
    extraNote,
    amount,
    commission,
  };
}

export async function createReservation(smoobuReservation: SmoobuReservation) {
  // Parse the SmoobuReservation object to match the structure expected by your database
  const reservationData = parseSmoobuReservation(smoobuReservation);

  // Use Prisma to create a new reservation in the database
  const { villaId, ...otherReservationData } = reservationData;

  const newReservation = await prisma.reservation.create({
    data: {
      ...otherReservationData,
      villa: {
        connect: {
          id: villaId,
        },
      },
    },
  });

  const { arrival, departure } = reservationData;

  if (villaId === lakshmiId) {
    console.log('Blocking Akasha');
    await blockVilla(akashaId, arrival, departure);
  }

  if (villaId === akashaId) {
    console.log('Blocking Lakshmi');
    await blockVilla(lakshmiId, arrival, departure);
  }

  return newReservation;
}

export async function updateReservation(smoobuReservation: SmoobuReservation) {
  const smoobuId = smoobuReservation.id;
  // Update the reservation

  const { villaId, ...otherReservationData } =
    parseSmoobuReservation(smoobuReservation);
  await prisma.reservation.upsert({
    where: {
      smoobuId: smoobuId, // Use the smoobuId from the function argument
    },
    update: {
      ...otherReservationData, // Exclude villaId from this object
      villa: {
        connect: {
          id: villaId, // Connect to the villa by its ID
        },
      },
    },
    create: {
      ...otherReservationData,
      // Exclude villaId from this object
      villa: {
        connect: {
          id: villaId, // Connect to the villa by its ID
        },
      },
    },
  });

  if (villaId === lakshmiId) {
    console.log('Blocking Akasha');
    await blockVilla(
      akashaId,
      smoobuReservation.arrival,
      smoobuReservation.departure
    );
  }

  if (villaId === akashaId) {
    console.log('Blocking Lakshmi');
    await blockVilla(
      lakshmiId,
      smoobuReservation.arrival,
      smoobuReservation.departure
    );
  }

  return;
}

export async function cancelReservation(smoobuId: number) {
  // First, find the reservation by smoobuId to get its id
  const reservation = await prisma.reservation.findUnique({
    where: {
      smoobuId,
    },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // Then, use the id to update the reservation
  return await prisma.reservation.update({
    where: {
      id: reservation.id, // Use the id obtained from the previous query
    },
    data: {
      cancelled: true,
    },
  });
}

export async function deleteReservation(smoobuId: number) {
  // First, find the reservation by smoobuId to get its id
  const reservation = await prisma.reservation.findUnique({
    where: {
      smoobuId,
    },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // Then, use the id to delete the reservation
  return await prisma.reservation.delete({
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

  console.log({ data, apiKey, villaId, arrival, departure });

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

    const { id: smoobuId } = (await response.json()) as CreateBookingResponse;

    await prisma.reservation.create({
      data: {
        arrival: data.arrivalDate,
        departure: data.departureDate,
        smoobuId,
        channelId: channelIds['blocked'],
        villa: {
          connect: {
            id: villaId,
          },
        },
        createdAt: new Date(),
      },
    });

    return smoobuId;
  } catch (error) {
    console.error('Error blocking villa:', error);
    throw error;
  }
}
