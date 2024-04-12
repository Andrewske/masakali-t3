'use server';
import { getVillaName } from '~/lib/villas';
import type { VillaIdsType } from '~/lib/villas';
import { prisma } from '~/db/prisma';
import { env } from '~/env.mjs';
import { channelIds } from '~/lib/smoobu';


export type PricingDataType = {
  villaName: string;
  checkin: Date;
  checkout: Date;
  numNights: number;
  pricing: {
    pricePerNight: number;
    discount: number;
    taxes: number;
    total: number;
  };
};

// Okay I am going to have getPricing return all the prices for that villa

export const getPricing = async ({
  villaId,
  checkin,
  checkout,
  conversionRate,
}: {
  villaId: VillaIdsType;
  checkin: Date;
  checkout: Date;
  conversionRate: number;
  currency?: string;
}): Promise<PricingDataType> => {
  const diffInTime = checkout.getTime() - checkin.getTime();
  const numNights = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  try {
    const villaPricing = (await prisma.villaPricing.findMany({
      where: {
        villaId: Number(villaId),
        date: {
          gte: checkin,
          lt: checkout,
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

    // const conversionRate = await getConversionRate(currency);

    // console.log(conversionRate);
    const pricePerNight =
      villaPricing.reduce((acc, curr) => acc + curr.price, 0) || 0;
    const discountRate = parseFloat(env.WEBSITE_DISCOUNT ?? '0');
    const discountPerNight = pricePerNight * discountRate;
    const subTotal = (pricePerNight - discountPerNight) * numNights;
    const taxRate = parseFloat(env.WEBSITE_TAX ?? '0');
    const taxes = subTotal * taxRate;

    return {
      villaName: getVillaName(villaId),
      checkin: checkin,
      checkout: checkout,
      numNights: numNights,
      pricing: {
        pricePerNight: pricePerNight / conversionRate,
        discount: discountPerNight / conversionRate,
        taxes: taxes / conversionRate,
        total: (subTotal + taxes) / conversionRate,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

type DisabledDate = {
  date: Date;
  villaId: number;
};

export const getAllDisabledDates = async (): Promise<
  Set<string | undefined>
> => {
  const disabledDates = await prisma.villaPricing.findMany({
    where: {
      available: false,
      date: {
        gte: new Date(),
      },
    },
    select: {
      villaId: true,
      date: true,
    },
  });
  const villas = new Set(
    Object.values(disabledDates).map(({ villaId }) => villaId)
  );

  const numVillas = villas.size;

  const dateCounts = groupByDateAndFilter(disabledDates, numVillas);
  return new Set(dateCounts);
};

const groupByDateAndFilter = (
  dates: DisabledDate[],
  numVillas: number
): string[] => {
  // Step 1: Group by date
  const groupedByDate = new Map<string, DisabledDate[]>();
  dates.forEach((disabledDate) => {
    // Convert date to string to use as a Map key
    const dateString = disabledDate.date.toISOString().split('T')[0];
    if (!groupedByDate.has(dateString ?? '')) {
      groupedByDate.set(dateString ?? '', []);
    }
    groupedByDate.get(dateString ?? '')?.push(disabledDate);
  });

  // Step 2: Filter groups where the count is exactly 5
  const filteredDates = Array.from(groupedByDate.entries())
    .filter(([_, group]) => group.length === numVillas)
    .map(([dateString, _]) => dateString);

  return filteredDates;
};

function subtractSets<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of set1) {
    if (!set2.has(item)) {
      result.add(item);
    }
  }
  return result;
}

export const getDisabledDatesForVilla = async (
  villaId: number
): Promise<{
  disabledDates: Set<string | undefined>;
  checkoutDates: Set<string | undefined>;
}> => {
  const disabledDates = await prisma.villaPricing.findMany({
    where: {
      villaId: villaId,
      available: false,
    },
    select: {
      date: true,
    },
  });

  const disabledDatesSet = new Set([
    ...disabledDates.map((date) => date.date.toISOString().split('T')[0]),
  ]);

  const checkoutDates = await getCheckoutDatesForVilla(villaId);

  const resultSet = subtractSets(disabledDatesSet, checkoutDates);

  return {
    disabledDates: resultSet,
    checkoutDates: checkoutDates,
  };
};

export const getCheckoutDatesForVilla = async (
  villaId: number
): Promise<Set<string | undefined>> => {
  const checkoutDates = await prisma.villaPricing.findMany({
    where: {
      villaId: villaId,
    },
    select: {
      date: true,
      available: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  const availableCheckoutDates = new Set<string | undefined>();

  if (checkoutDates.length === 0) {
    return availableCheckoutDates;
  }

  for (let i = 1; i < checkoutDates.length; i++) {
    if (checkoutDates[i]) {
      const currentDate = checkoutDates[i];
      const previousDate = checkoutDates[i - 1];

      if (!currentDate?.available && previousDate?.available) {
        availableCheckoutDates.add(
          currentDate?.date.toISOString().split('T')[0]
        );
      }
    }
  }

  return availableCheckoutDates;
};

type CreateReservationPropsType = {
  villaId: VillaIdsType;
  checkin: Date;
  checkout: Date;
  finalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  country: string;
  xenditExternalId: string;
};
export const createReservation = async ({
  villaId,
  checkin,
  checkout,
  finalPrice,
  firstName,
  lastName,
  email,
  phone,
  adults,
  children,
  country,
  xenditExternalId,
}: CreateReservationPropsType) => {
  try {
    const reservation = await fetch(env.SMOOBU_API_URL + '/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': `${env.SMOOBU_API_KEY}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        arrivalDate: checkin.toISOString().split('T')[0],
        departureDate: checkout.toISOString().split('T')[0],
        apartmentId: villaId,
        channelId: channelIds.website,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        adults: adults,
        children: children,
        notice: xenditExternalId,
        country: country,
        price: finalPrice,
      }),
    });

    console.log(await reservation.json());
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};
