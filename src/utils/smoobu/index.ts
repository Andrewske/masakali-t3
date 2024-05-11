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
  villaId: number;
  date: string;
  price: number;
  available: boolean;
};

type CurrentVillaPricingType = {
  id: string;
  villaId: number;
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
          villaId: parseInt(villaId),
          date,
          price: pricingData.price,
          available: Boolean(pricingData.available),
        };

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
        record.villaId === currentRecord.villaId &&
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
        currentRecord.villaId === newRecord.villaId &&
        areDatesEqual(newRecord.date, currentRecord.date)
      );
    });

    if (!hasCorrespondingRecord) {
      changedRecords.push(newRecord);
    }
  }

  return changedRecords;
};

export async function batchVillaPricing({ data }: SmoobuRatesResponse) {
  console.log('Starting batchVillaPricing');

  // Transform incoming data to new villa pricing
  const newVillaPricing = transformSmoobuRatesResponse(data);

  // Retrieve current villa pricing from the database
  const currentVillaPricing: CurrentVillaPricingType[] =
    await prisma.villaPricing.findMany();

  // Determine pricing changes
  const changedVillaPricing = getChangedVillaPricing(
    currentVillaPricing,
    newVillaPricing
  );
  console.log(
    'Changed villa pricing for',
    changedVillaPricing.length,
    'villas'
  );

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
  for (const chunk of upsertDataChunks) {
    await prisma.$transaction(
      chunk.map(({ villaId, date, ...rest }) =>
        prisma.villaPricing.upsert({
          where: { villaId_date: { villaId, date: new Date(date) } },
          update: { ...rest },
          create: { villaId, date: new Date(date), ...rest },
        })
      )
    );
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
