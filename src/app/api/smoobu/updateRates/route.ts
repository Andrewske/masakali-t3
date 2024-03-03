import axios from 'axios';
import { NextResponse } from 'next/server';
import { villaIdsArray } from '~/lib/villas';
import { prisma } from '~/db/prisma';

export async function GET() {
  const smoobuRatesResponse = await fetchSmoobuRates();

  await upsertVillaPricing(smoobuRatesResponse);

  return NextResponse.json({ success: true });
}

type SmoobuRatesResponse = {
  data: {
    [villaId: string]: {
      [date: string]: PricingData;
    };
  };
};

interface PricingData {
  price: number | null;
  min_length_of_stay: number;
  available: number;
}

async function fetchSmoobuRates(): Promise<SmoobuRatesResponse> {
  const smoobuApiUrl: string = process.env.SMOOBU_API_URL ?? '';
  if (!smoobuApiUrl) {
    throw new Error(
      'SMOOBU_API_URL is not defined in the environment variables.'
    );
  }
  const url = smoobuApiUrl + '/rates';

  const apiKey = process.env.SMOOBU_API_KEY;
  if (!apiKey) {
    throw new Error(
      'SMOOBU_API_KEY is not defined in the environment variables.'
    );
  }

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Api-Key': apiKey,
  };

  // Date handling
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 480);

  const params = {
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    apartments: villaIdsArray,
  };

  try {
    const response = await axios.get<SmoobuRatesResponse>(url, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    // Handle or log the error appropriately
    throw error;
  }
}

async function upsertVillaPricing(data: SmoobuRatesResponse) {
  const villaIds = Object.keys(data.data);

  for (const villaId of villaIds) {
    const upsertPromises = [];
    const villaPricing = data.data[villaId];
    if (!villaPricing) continue;

    for (const [date, pricing] of Object.entries(villaPricing)) {
      if (isPricingData(pricing)) {
        const upsertPromise = prisma.villaPricing.upsert({
          where: {
            villaId_date: {
              villaId: parseInt(villaId),
              date: new Date(date),
            },
          },
          update: {
            price: pricing.price,
            available: pricing.available != 0,
          },
          create: {
            villaId: parseInt(villaId),
            date: new Date(date),
            price: pricing.price,
            available: pricing.available !== 0,
          },
        });

        upsertPromises.push(upsertPromise);
      }
    }
    const results = await Promise.allSettled(upsertPromises);
    let numFailed = 0;
    let reason: PromiseRejectedResult | null = null;

    for (const result of results) {
      if (result.status === 'rejected') {
        numFailed++;
        reason = result.reason as PromiseRejectedResult;
      }
    }
    console.log(
      `Upserted ${
        upsertPromises.length
      } pricing records for villa ${villaId}, ${numFailed} failed. Reason: ${
        reason?.toString() ?? 'None'
      }`
    );
  }
}

// Type guard to ensure the object is of the expected pricing data type
function isPricingData(obj: unknown): obj is PricingData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'price' in obj &&
    'min_length_of_stay' in obj &&
    'available' in obj
  );
}
