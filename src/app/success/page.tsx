import Image from 'next/image';
import { prisma } from '~/db/prisma';

import { type VillaIdsType, villaDetails } from '~/lib/villas';
import GoToVillaButton from '~/components/Button/GoToVillaButton';
import ReservationDetails from './ReservationDetails';
import { type VillaPricingType } from '~/utils/pricing';
export default async function Page({
  searchParams,
}: {
  searchParams: {
    villaId: string;
  };
}) {
  const villaId = parseInt(searchParams.villaId) as VillaIdsType;

  const villaPricing = (await prisma.villaPricing.findMany({
    where: {
      villaId: Number(villaId),
    },
    select: {
      date: true,
      price: true,
      available: true,
    },
  })) as VillaPricingType[];

  return (
    <section className=" w-full grid place-items-center p-16">
      <h1>Success!</h1>
      <ReservationDetails villaPricing={villaPricing} />
    </section>
  );
}
