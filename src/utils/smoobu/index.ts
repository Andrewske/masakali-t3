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
  const createData: VillaPricingDataType[] = [];
  const updateData: VillaPricingDataType[] = [];

  // Assuming a way to determine records that need to be created or updated
  // This part is highly dependent on your specific data and database setup
  for (const [villaId, villaPricing] of Object.entries(data)) {
    if (!villaPricing) {
      console.log('No pricing data found for villa', villaId);
      continue;
    }

    Object.entries(villaPricing).forEach(([date, pricing]) => {
      if (!date || isNaN(Date.parse(date))) {
        console.error(`Invalid date string: ${date}`);
        return;
      }

      // Example condition to decide between create or update, adjust based on actual logic
      const record = {
        villaId: parseInt(villaId) as VillaIdsType,
        date: new Date(date),
        price: pricing?.price ?? 0,
        available: pricing?.available !== 0,
      };

      // For illustration, assume all go to createData
      createData.push(record);

      // You would have a similar condition/logic to fill updateData
    });
  }

  // Batch Create
  try {
    await prisma.villaPricing.createMany({
      data: createData,
      skipDuplicates: true, // Assumes your ORM supports this or similar option
    });
    console.log('Batch created pricing data successfully');
  } catch (error) {
    console.error('Error during batch create:', error);
  }

  // Batch Update
  // The update logic will depend greatly on how you track changes or decide what needs updating
  // This part is more complex and would ideally rely on having unique identifiers or conditions to match records for updates
  try {
    // Example update logic, very dependent on your specific use case
    for (const record of updateData) {
      await prisma.villaPricing.updateMany({
        where: {
          // Your condition here, for example:
          villaId: record.villaId,
          date: record.date,
        },
        data: {
          price: record.price,
          available: record.available,
        },
      });
    }
    console.log('Batch updated pricing data successfully');
  } catch (error) {
    console.error('Error during batch update:', error);
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
