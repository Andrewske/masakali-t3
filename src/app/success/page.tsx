import { prisma } from '~/db/prisma';
import ReservationDetails from './ReservationDetails';

export default async function Page({
  searchParams: { reservationId },
}: {
  searchParams: {
    reservationId: string;
  };
}) {
  const reservation = await prisma.reservation.findFirst({
    where: {
      id: reservationId,
    },
    select: {
      arrival: true,
      departure: true,
      adults: true,
      children: true,
      villaId: true,
      amount: true,
    },
  });

  if (!reservation) {
    return (
      <section className=" w-full grid place-items-center p-16">
        <h1>Could not find reservation</h1>
        <p>Please contact admin@masakaliretreat.com</p>
      </section>
    );
  }

  return (
    <section className=" w-full grid place-items-center p-16">
      <h1>Success!</h1>
      <ReservationDetails reservation={reservation} />
    </section>
  );
}
