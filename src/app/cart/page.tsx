import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import Image from 'next/image';

import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { getPricing } from '~/actions/smoobu';
import { suryaId, type villaIdsType } from '~/utils/smoobu';
import { getMainImage } from '~/utils/villas/images';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    checkIn: string;
    checkOut: string;
    villaId: villaIdsType;
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
    queryKey: ['cart'],
    queryFn: () => {
      return getPricing({
        checkIn,
        checkOut,
        villaId: searchParams.villaId ?? suryaId,
      });
    },
  });

  const mainImage = getMainImage(1574678);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="">
        <section className="grid grid-cols-3 place-items-center gap-4 p-4">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            className="object-contain"
          />
          <CartDetails
            checkIn={checkIn}
            checkOut={checkOut}
            villaId={searchParams.villaId ?? suryaId}
          />
          <CartForm
            checkIn={checkIn}
            checkOut={checkOut}
            villaId={villaId}
          />
        </section>
      </main>
    </HydrationBoundary>
  );
}
