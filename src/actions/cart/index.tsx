'use server';

import {
  type VillaDetail,
  villaDetails,
  type VillaIdsType,
} from '~/lib/villas';

import { db } from '~/server/db';
import { logAndPosthog } from '~/utils/posthogServerError';

import { tryCatch } from '~/utils/tryCatch';

export async function getVillaDetails(
  villaId: VillaIdsType
): Promise<VillaDetail | undefined> {
  const villa = Object.values(villaDetails).find(
    (villa) => villa.id === villaId
  );
  if (!villa) {
    await logAndPosthog({
      message: 'Villa not found',
      error: new Error(`Villa not found: ${villaId}`),
      level: 'error',
      data: { location: 'getVillaDetails', villaId },
    });
  }
  return villa;
}

export const getVillaPricing = async (villaId: VillaIdsType) => {
  const { data, error } = await tryCatch(
    db.villa_pricing.findMany({
      where: {
        villa_id: Number(villaId),
        price: {
          not: null,
        },
      },
      select: {
        date: true,
        price: true,
        available: true,
      },
    })
  );
  if (error) {
    await logAndPosthog({
      message: 'Error fetching villa pricing',
      error,
      level: 'error',
      data: { location: 'getVillaPricing', villaId },
    });
  }
  return data;
};
