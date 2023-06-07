import { prisma } from '~/server/db';

// Query for all future reservations
export const getFutureReservations = async ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) => {
  return await prisma.reservation.findMany({
    where: {
      departure: startDate && {
        gt: startDate ?? new Date(),
      },
      arrival: endDate && {
        lte: endDate,
      },
      cancelled: false,
    },
    select: {
      id: true,
      arrival: true,
      departure: true,
      villaId: true,
    },
  });
};
