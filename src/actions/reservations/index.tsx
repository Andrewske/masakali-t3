'use server';
import { prisma } from '~/db/prisma';

import { villaIdsMap, type VillaIdsType } from '~/lib/villas';

export const getAvailableVillas = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  const blockedVillas = await prisma.reservation.findMany({
    where: {
      AND: [
        { arrival: { lt: new Date(to) } },
        { departure: { gt: new Date(from) } },
      ],
    },
    // select: {
    //   villaId: true,
    // },
  });

  const blockedVillaIds = blockedVillas.map(({ villa_id }) => villa_id);

  // Filter out the blocked villas from the villaIds array
  const availableVillas = Array.from(villaIdsMap.keys()).filter(
    (villaId: VillaIdsType) => !blockedVillaIds.includes(villaId)
  );

  return availableVillas;
};

export const getAllBlockedDates = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      departure: {
        gte: new Date(),
      },
      cancelled: false,
    },
    select: {
      arrival: true,
      departure: true,
      villa_id: true,
    },
  });

  // Step 1: Group the reservations by villaId

  // Step 2: Count the number of reservations for each unique date
  const dates: Date[] = [];

  reservations.forEach(({ arrival, departure }) => {
    const days = getDaysBetweenDates(arrival, departure);
    dates.push(...days);
  });

  const dateReservationCounts = getValueCounts(dates);

  const allVillasBlockedDates = new Set<string>();

  const filteredDates = Array.from(dateReservationCounts.entries()).filter(
    ([, count]) => count === villaIdsMap.size
  );

  filteredDates.forEach(([date]) => {
    allVillasBlockedDates.add(date.toISOString().split('T')[0] ?? '');
  });

  return allVillasBlockedDates;
};

function getDaysBetweenDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function getValueCounts<T>(array: T[]): Map<T, number> {
  return array.reduce((acc, value) => {
    acc.set(value, (acc.get(value) || 0) + 1);
    return acc;
  }, new Map<T, number>());
}
