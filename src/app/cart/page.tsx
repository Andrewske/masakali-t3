import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useMemo } from 'react';
import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { getPricing } from '~/actions/smoobu';
import { suryaId, type VillaIdsType } from '~/lib/villas';
import { getMainImage } from '~/utils/villas/images';
import { getConversionRate } from '~/actions/currencyApi';
import { AspectRatio } from '~/components/ui/aspect-ratio';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    checkIn: string;
    checkOut: string;
    villaId: VillaIdsType;
  };
}) {
  const queryClient = new QueryClient();
  const defaultCheckIn = new Date();
  const defaultCheckOut = new Date();
  defaultCheckOut.setDate(defaultCheckIn.getDate() + 1);

  const checkIn: string =
    searchParams.checkIn ?? defaultCheckIn.toISOString().split('T')[0];
  const checkOut: string =
    searchParams.checkOut ?? defaultCheckOut.toISOString().split('T')[0];
  const villaId = searchParams.villaId ?? suryaId;

  await queryClient.prefetchQuery({
    queryKey: ['pricing'],
    queryFn: () => {
      return getPricing({
        checkIn,
        checkOut,
        villaId: searchParams.villaId ?? suryaId,
        conversionRate: 1,
      });
    },
  });

  const mainImage = getMainImage(1574678);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex-grow flex flex-wrap justify-evenly items-center ">
        <span className="w-full text-center p-8">
          <h1>Cart</h1>
        </span>
        <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            className="object-cover"
          />
        </span>

        <span className="w-full md:w-[600px] h-[600px] p-4  grid place-items-center">
          <CartDetails
            checkIn={checkIn}
            checkOut={checkOut}
            villaId={searchParams.villaId ?? suryaId}
          />
        </span>
        <span className="w-full md:w-[600px] h-[600px] p-4  grid place-items-center">
          <CartForm
            checkIn={checkIn}
            checkOut={checkOut}
            villaId={villaId}
          />
        </span>
      </section>
    </HydrationBoundary>
  );
}
