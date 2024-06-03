import { prisma } from '~/db/prisma';
import { channelIds } from '~/lib/smoobu';
import { akashaId, lakshmiId } from '~/lib/villas';
import type { SmoobuRatesResponse, SmoobuReservation } from '~/types/smoobu';

export const updateVillaPricing = async (
  villa_id: number,
  date: Date,
  price: number,
  available: boolean
) => {
  await prisma.villa_pricing.update({
    where: {
      villa_id_date: {
        villa_id,
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
  villa_id: number;
  date: string;
  price: number;
  available: boolean;
};

type CurrentVillaPricingType = {
  id: string;
  villa_id: number;
  date: Date;
  price: number | null;
  currency: string | null;
  available: boolean;
};

const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

const transformSmoobuRatesResponse = (data: SmoobuRatesResponse['data']) => {
  const transformedData: VillaPricingDataType[] = [];

  for (const villaId in data) {
    for (const date in data[villaId]) {
      const pricingData = data?.[villaId]?.[date];

      if (pricingData?.price && pricingData?.available !== null) {
        const newRecord: VillaPricingDataType = {
          villa_id: parseInt(villaId),
          date,
          price: pricingData.price,
          available: Boolean(pricingData.available),
        };

        console.log({ newRecord });

        transformedData.push(newRecord);
      }
    }
  }

  // // Filter dates that are less than one week from now
  // const filteredData = transformedData.filter((villaPricing) => {
  //   // Convert the date to a Date object if it's not already
  //   const villaDate =
  //     villaPricing.date instanceof Date
  //       ? villaPricing.date
  //       : new Date(villaPricing.date);

  //   // Check if the villaDate is less than one week from now
  //   return villaDate < oneWeekFromNow;
  // });
  return transformedData;
};

function areDatesEqual(dateString: string, dateObject: Date): boolean {
  // Convert the Date object to a string in "yyyy-mm-dd" format
  const dateObjectStr = dateObject.toISOString().split('T')[0];

  // Compare the formatted date string with the given date string
  return dateString === dateObjectStr;
}

const getChangedVillaPricing = (
  currentVillaPricing: CurrentVillaPricingType[],
  newVillaPricing: VillaPricingDataType[]
) => {
  const changedRecords: VillaPricingDataType[] = [];

  // First, check for changes in existing records
  for (const currentRecord of currentVillaPricing) {
    const correspondingRecord = newVillaPricing.find((record) => {
      return (
        record.villa_id === currentRecord.villa_id &&
        areDatesEqual(record.date, currentRecord.date)
      );
    });
    if (correspondingRecord) {
      // Check if there's a change in price or availability
      // if (correspondingRecord.villaId !== 1587920) {
      //   console.log(correspondingRecord);
      // }
      if (
        correspondingRecord.price !== currentRecord.price ||
        correspondingRecord.available !== currentRecord.available
      ) {
        // console.log({ correspondingRecord, currentRecord });
        changedRecords.push(correspondingRecord);
      }
    }
  }

  // Then, add any new records that do not have a corresponding entry in currentVillaPricing
  for (const newRecord of newVillaPricing) {
    const hasCorrespondingRecord = currentVillaPricing.some((currentRecord) => {
      return (
        currentRecord.villa_id === newRecord.villa_id &&
        areDatesEqual(newRecord.date, currentRecord.date)
      );
    });

    if (!hasCorrespondingRecord) {
      changedRecords.push(newRecord);
    }
  }

  return changedRecords;
};

export async function batchVillaPricing(data: SmoobuRatesResponse) {
  console.log('Starting batchVillaPricing');
  console.log('data:', data);

  // Transform incoming data to new villa pricing
  const newVillaPricing = transformSmoobuRatesResponse(data);

  // Retrieve current villa pricing from the database
  const currentVillaPricing: CurrentVillaPricingType[] =
    await prisma.villa_pricing.findMany();

  // Determine pricing changes
  const changedVillaPricing = getChangedVillaPricing(
    currentVillaPricing,
    newVillaPricing
  );
  // console.log(
  //   'Changed villa pricing for',
  //   changedVillaPricing.length,
  //   'villas'
  // );

  // Upsert changed pricing into the database
  try {
    await upsertPricingData(changedVillaPricing);
    console.log('Upserted pricing data successfully');
  } catch (error) {
    console.error('Error during upsert:', error);
  }
}

// Function to split an array into chunks
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Upsert pricing data into the database in chunks
async function upsertPricingData(changedVillaPricing: VillaPricingDataType[]) {
  const upsertDataChunks = chunkArray(changedVillaPricing, 100);

  try {
    for (const chunk of upsertDataChunks) {
      await prisma.$transaction(
        chunk.map(({ villa_id, date, ...rest }) =>
          prisma.villa_pricing.upsert({
            where: { villa_id_date: { villa_id, date: new Date(date) } },
            update: { ...rest },
            create: { villa_id, date: new Date(date), ...rest },
          })
        )
      );
    }
  } catch (error) {
    console.error('Error during upsert:', error);
  }
}

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

  const newReservation = await prisma.reservation.create({
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
  await prisma.reservation.upsert({
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
  const reservation = await prisma.reservation.findUnique({
    where: {
      smoobu_id,
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

export async function deleteReservation(smoobu_id: number) {
  // First, find the reservation by smoobuId to get its id
  const reservation = await prisma.reservation.findUnique({
    where: {
      smoobu_id,
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

    await prisma.reservation.create({
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
