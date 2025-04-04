'use server';

import {
  type VillaDetail,
  villaDetails,
  type VillaIdsType,
} from '~/lib/villas';

import { db } from '~/server/db';
import type { VillaPricingType } from '~/utils/pricing';

export async function getVillaDetails(
  villaId: VillaIdsType
): Promise<VillaDetail> {
  try {
    const villa = Object.values(villaDetails).find(
      (villa) => villa.id === villaId
    );
    if (!villa) {
      throw new Error(`Villa not found: ${villaId}`);
    }
    return villa;
  } catch (error) {
    console.error('Error fetching villa details:', error);
    throw error;
  }
}

export const getVillaPricing = async (villaId: VillaIdsType) => {
  try {
    return (await db.villa_pricing.findMany({
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
    })) as VillaPricingType[];
  } catch (error) {
    console.log(error);
    throw new Error(`Could not get villa pricing: ${villaId}`);
  }
};
