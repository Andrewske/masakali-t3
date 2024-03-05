'use client';

import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';
import { getPricing } from '~/actions/smoobu';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useMemo } from 'react';
import { formatCurrency } from '~/utils/helpers';
import { Skeleton } from '~/components/ui/skeleton';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import CountryDropdown from '~/components/CountryDropdown';

type CartDetailsProps = {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
};

const CartDetails = ({ villaId, villaPricing }: CartDetailsProps) => {
  const { conversionRate, country, currency } = useCurrencyStore(
    (state) => state
  );

  console.log(conversionRate, country);
  const { dateRange } = useReservationStore((state) => state);
  const villaName = getVillaName(villaId);

  if (!dateRange.to || !dateRange.from) {
    throw new Error('Date range is not set');
  }

  const checkinString =
    dateRange.from && dateRange.from.toISOString().split('T')[0];
  const checkoutString =
    dateRange.to && dateRange.to.toISOString().split('T')[0];
  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    useMemo(() => {
      return createPricingObject({
        villaPricing,
        checkin: dateRange.from ?? new Date(),
        checkout: dateRange.to ?? new Date(),
        conversionRate,
      });
    }, [dateRange, villaPricing, conversionRate]);

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
      <p>{formatCurrency(amount, currency)}</p>
    </span>
  );

  return (
    <section className="w-full h-full bg-gray items-center">
      <div className="p-4 text-center bg-purple text-white w-100">
        <h2>{villaName}</h2>
      </div>
      <div className="flex flex-col gap-2 p-4 text-sm">
        {renderDetail('Arrival Date', checkinString ?? '')}
        {renderDetail('Departure Date', checkoutString ?? '')}
        {renderDetail('Number of Nights', numNights)}
        {renderConvertedAmount('Price Per Night', pricePerNight)}
        {renderConvertedAmount('Subtotal', subTotal)}
        {renderConvertedAmount('Discount', discount)}
        {renderConvertedAmount('Taxes', taxes)}
        {renderConvertedAmount('Total', finalPrice)}
        <CountryDropdown />
      </div>
    </section>
  );
};

export default CartDetails;
