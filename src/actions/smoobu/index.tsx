'use server';
import { getVillaName } from '~/utils/smoobu';
import type { villaIdsType } from '~/utils/smoobu';
import { prisma } from '~/db/prisma';

export type PricingDataType = {
  villaName: string;
  checkIn: string;
  checkOut: string;
  numNights: number;
  pricing: {
    pricePerNight: number;
    discount: number;
    taxes: number;
    total: number;
  };
};

export const getPricing = async ({
  villaId,
  checkIn,
  checkOut,
}: {
  villaId: villaIdsType;
  checkIn: string;
  checkOut: string;
}): Promise<PricingDataType> => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const diffInTime = checkOutDate.getTime() - checkInDate.getTime();
  const numNights = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  try {
    const villaPricing = (await prisma.villaPricing.findMany({
      where: {
        villaId: Number(villaId),
        date: {
          gte: new Date(checkIn),
          lt: new Date(checkOut),
        },
        price: {
          not: null,
        },
        available: true,
      },
      select: {
        date: true,
        price: true,
        available: true,
      },
    })) as { date: Date; price: number; available: boolean }[];

    if (villaPricing.length !== numNights)
      throw new Error('Villa not available');

    const pricePerNight =
      villaPricing.reduce((acc, curr) => acc + curr.price, 0) || 0;
    const discountRate = parseFloat(process.env.WEBSITE_DISCOUNT ?? '0');
    const discountPerNight = pricePerNight * discountRate;
    const subTotal = (pricePerNight - discountPerNight) * numNights;
    const taxRate = parseFloat(process.env.WEBSITE_TAX ?? '0');
    const taxes = subTotal * taxRate;

    return {
      villaName: getVillaName(villaId),
      checkIn: checkIn,
      checkOut: checkOut,
      numNights: numNights,
      pricing: {
        pricePerNight: pricePerNight,
        discount: discountPerNight,
        taxes: taxes,
        total: subTotal + taxes,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export const getAllDisabledDates = async (): Promise<
  Set<string | undefined>
> => {
  const disabledDates = await prisma.villaPricing.findMany({
    where: {
      available: false,
    },
    select: {
      date: true,
    },
  });

  return new Set([
    ...disabledDates.map((date) => date.date.toISOString().split('T')[0]),
  ]);
};

export const getDisabledDatesForVilla = async (
  villaId: number
): Promise<Set<string | undefined>> => {
  const disabledDates = await prisma.villaPricing.findMany({
    where: {
      villaId: villaId,
      available: false,
    },
    select: {
      date: true,
    },
  });

  return new Set([
    ...disabledDates.map((date) => date.date.toISOString().split('T')[0]),
  ]);
};
