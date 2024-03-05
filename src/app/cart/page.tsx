import Image from 'next/image';

import CartForm from './CartForm';
import CartDetails from './CartDetails';

import { type VillaDetail, villaDetails, VillaIdsType } from '~/lib/villas';
import { redirect } from 'next/navigation';

import { prisma } from '~/db/prisma';
import type { VillaPricingType } from '~/utils/pricing';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    villaId: string;
  };
}) {
  const villaId = parseInt(searchParams.villaId) as VillaIdsType;

  const villa = Object.values(villaDetails).find((villa) => {
    return villa.id === villaId;
  });

  if (!villa) {
    console.error('Villa not found');
    return redirect('/villas');
  }

  const villaPricing = (await prisma.villaPricing.findMany({
    where: {
      villaId: Number(villaId),
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

  return (
    <section className=" flex flex-grow flex-col items-center h-full relative">
      <div className="absolute top-0 left-0  h-full w-full z-0">
        <Image
          src={villa?.defaultImage ?? '/villa-placeholder.webp'}
          alt={`Photo of ${villa?.name ?? ''} villa`}
          className="object-cover "
          fill={true}
          priority={true}
        />
      </div>
      <span className="bg-white bg-opacity-15 p-4 w-full h-full flex flex-col z-10">
        <div className="flex z-20 justify-center">
          <h1 className="bg-purple text-white text-center py-4 px-8">Cart</h1>
        </div>
        <div className="flex flex-wrap justify-center  z-20">
          <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center">
            <CartDetails
              villaId={villaId}
              villaPricing={villaPricing}
            />
          </span>
          <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center  z-20">
            <CartForm
              villaId={villaId}
              villaPricing={villaPricing}
            />
          </span>
        </div>
      </span>
    </section>
  );
}
