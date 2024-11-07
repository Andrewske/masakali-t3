'use client';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useMemo } from 'react';
import { formatCurrency } from '~/utils/helpers';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import CountryDropdown from '~/components/CountryDropdown';
import { getCurrentDateInBali } from '~/utils';
import { type CountryType } from '~/actions/countries';
import { consoleIntegration } from '@sentry/nextjs';
import { format } from 'date-fns';

type CartDetailsProps = {
  villaId: VillaIdsType;
  villaPricing: VillaPricingType[];
  countries: CountryType[];
};

const CartDetails = ({
  villaId,
  villaPricing,
  countries,
}: CartDetailsProps) => {
  const { conversionRate, currency } = useCurrencyStore((state) => state);

  const { dateRange } = useReservationStore((state) => state);
  const villaName = getVillaName(villaId);

  if (!dateRange.to || !dateRange.from) {
    throw new Error('Date range is not set');
  }

  const checkinString = format(dateRange.from, 'yyyy-MM-dd');

  const checkoutString = format(dateRange.to, 'yyyy-MM-dd');

  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    useMemo(() => {
      if (!dateRange?.from || !dateRange?.to) {
        throw new Error('Date range is not set');
      }
      return createPricingObject({
        villaPricing,
        checkin: dateRange?.from, // ?? getCurrentDateInBali(),
        checkout: dateRange?.to, // ?? getCurrentDateInBali(),
        conversionRate,
      });
    }, [dateRange, villaPricing, conversionRate]);

  const renderDetail = (label: string, value: string | number | null) => (
    <span key={label}>
      <h3>{label}</h3>
      <p>{value}</p>
    </span>
  );

  const renderConvertedAmount = (label: string, amount: number) => (
    <span key={label}>
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
        <CountryDropdown countries={countries} />
      </div>
    </section>
  );
};

export default CartDetails;
