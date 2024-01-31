import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

import styles from './styles.module.scss';
import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { getPricing } from '~/actions/smoobu';
import { suryaId, type villaIdsType } from '~/utils/smoobu';

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.wrapper}>
        <section className={styles.container}>
          <CartDetails
            checkIn={checkIn}
            checkOut={checkOut}
            villaId={searchParams.villaId ?? suryaId}
          />
          <CartForm />
        </section>
      </main>
    </HydrationBoundary>
  );
}
