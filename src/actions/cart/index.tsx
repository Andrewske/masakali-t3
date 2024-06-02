'use server';

import { villaDetails, type VillaIdsType } from '~/lib/villas';

import { prisma } from '~/db/prisma';
import type { VillaPricingType } from '~/utils/pricing';

export const getVillaDetails = (villaId: VillaIdsType) => {
  try {
    return Object.values(villaDetails).find((villa) => {
      return villa.id === villaId;
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Villa not found: ${villaId}`);
  }
};

export const getVillaPricing = async (villaId: VillaIdsType) => {
  try {
    return (await prisma.villa_pricing.findMany({
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
