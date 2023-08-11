import { prisma } from '~/app/api/db';
import { activeVillaIds } from '~/utils/smoobu';

const ids = activeVillaIds();

const useBlockedDates = ({
  villaName,
}: {
  villaName?: keyof typeof ids | null;
}) => {
  const ids = activeVillaIds();

  let villaId: number | undefined;

  if (villaName) {
    villaId = ids[villaName];
  }

  const reservationFilter = villaName
    ? {
        where: {
          villaId: ids[villaName],
        },
      }
    : undefined;

  const reservations = prisma.reservation.findMany(reservationFilter);
  return <div>useBlockedDates</div>;
};

export default useBlockedDates;
