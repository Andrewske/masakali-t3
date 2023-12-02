'use server';
import axios from 'axios';
import type { villaIdsType } from '~/utils/smoobu';

export const getPricing = async ({
  villaId,
  checkIn,
  checkOut,
}: {
  villaId: villaIdsType;
  checkIn: string;
  checkOut: string;
}) => {
  const apiKey = process.env.SMOOBU_API_KEY;
  try {
    const response = await axios.get('/api/smoobu/pricing', {
      params: {
        start_date: checkIn,
        end_date: checkOut,
        apartments: [villaId],
      },
      headers: {
        'Api-Key': apiKey,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
