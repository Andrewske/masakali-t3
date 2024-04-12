import axios from 'axios';
import { NextResponse } from 'next/server';
import { villaIdsArray } from '~/lib/villas';

import type { PricingData, SmoobuRatesResponse } from '~/types/smoobu';
import { batchVillaPricing } from '~/utils/smoobu';

export async function GET() {
  const smoobuRatesResponse = await fetchSmoobuRates();

  await batchVillaPricing(smoobuRatesResponse);

  return NextResponse.json({ success: true });
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

// // Type guard to ensure the object is of the expected pricing data type
// function isPricingData(obj: unknown): obj is PricingData {
//   return (
//     typeof obj === 'object' &&
//     obj !== null &&
//     'price' in obj &&
//     'min_length_of_stay' in obj &&
//     'available' in obj
//   );
// }
