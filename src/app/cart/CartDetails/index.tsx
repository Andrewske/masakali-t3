'use client';

import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';
import { getPricing } from '~/actions/smoobu';
import type { VillaIdsType } from '~/lib/villas';
import useCurrency from '~/hooks/useCurrency';
import { useMemo } from 'react';
import { formatCurrency } from '~/utils/helpers';
import { Skeleton } from '~/components/ui/skeleton';

type CartDetailsProps = {
  checkIn: string;
  checkOut: string;
  villaId: VillaIdsType;
};

const CartDetails = ({ checkIn, checkOut, villaId }: CartDetailsProps) => {
  const { currency, conversionRate, CountryDropdown } = useCurrency();
  const { data, error, isLoading, isFetching } = useQuery({
    queryFn: () => getPricing({ checkIn, checkOut, villaId, conversionRate }),
    queryKey: ['cart', checkIn, checkOut, villaId, conversionRate],
    staleTime: 1000,
  });

  console.log({ conversionRate, data });

  const convertAmount = useMemo(
    () => (amount: number) => {
      return amount;
    },
    [conversionRate]
  );

  if (error) {
    console.error(error);
    return <div>Something went wrong. Please try again later.</div>;
  }

  const renderDetail = (label: string, value: string | number | null) => (
    <span
      className={styles.line}
      key={label}
    >
      <h3>{label}</h3>
      <p>{value}</p>
    </span>
  );

  const renderConvertedAmount = (label: string, amount: number) => (
    <span
      className={styles.line}
      key={label}
    >
      <h3>{label}</h3>

      {isFetching || isLoading ? (
        <Skeleton className="w-[100px] h-6 rounded-full bg-light-purple-7" />
      ) : (
        <p>{formatCurrency(amount, currency)}</p>
      )}
    </span>
  );

  return (
    <section className="w-full h-full bg-gray items-center">
      <div className="p-4 text-center bg-purple text-white w-100">
        <h2>{data?.villaName}</h2>
      </div>
      <div className="flex flex-col gap-2 p-4 text-sm">
        {renderDetail('Arrival Date', data?.checkIn ?? '')}
        {renderDetail('Departure Date', data?.checkOut ?? '')}
        {renderDetail('Number of Nights', data?.numNights ?? 1)}
        {renderConvertedAmount(
          'Price Per Night',
          data?.pricing?.pricePerNight ?? 0
        )}
        {renderConvertedAmount('Discount', data?.pricing?.discount ?? 0)}
        {renderConvertedAmount('Taxes', data?.pricing?.taxes ?? 0)}
        {renderConvertedAmount('Total', data?.pricing?.total ?? 0)}
        <CountryDropdown />
      </div>
    </section>
  );
};

export default CartDetails;
