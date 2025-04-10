import { db } from '~/server/db';
import ReservationDetails from './ReservationDetails';

export default async function Page(props: {
  searchParams: Promise<{
    reservationId: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const { reservationId } = searchParams;

  const reservation = await db.reservation.findFirst({
    where: {
      id: reservationId,
    },
    select: {
      arrival: true,
      departure: true,
      adults: true,
      children: true,
      villa_id: true,
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
