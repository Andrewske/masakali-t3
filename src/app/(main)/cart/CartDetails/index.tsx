'use client';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useMemo } from 'react';
import { formatCurrency } from '~/utils/helpers';
import { createPricingObject } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import CountryDropdown from '~/components/CountryDropdown';
import { type CountryType } from '~/actions/countries';
import { format } from 'date-fns';
import Link from 'next/link';
import type { villa, villa_pricing } from '@prisma/client';

type CartDetailsProps = {
  reservation: {
    villa_id: number;
    arrival: string;
    departure: string;
    villa: villa & { pricing: villa_pricing[] };
  };
  countries: CountryType[];
};

const CartDetails = ({
  reservation: {
    villa: { pricing },
    villa_id,
    arrival,
    departure,
  },
  countries,
}: CartDetailsProps) => {
  const { conversionRate, currency } = useCurrencyStore((state) => state);

  const villaName = getVillaName(villa_id as VillaIdsType);

  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    useMemo(() => {
      return createPricingObject({
        villaPricing: pricing,
        checkin: new Date(arrival),
        checkout: new Date(departure),
        conversionRate,
      });
    }, [pricing, conversionRate, arrival, departure]);

  const checkinString = format(new Date(arrival), 'yyyy-MM-dd');
  const checkoutString = format(new Date(departure), 'yyyy-MM-dd');

  return (
    <section className="w-full h-[600px] bg-gray items-center">
      <div className="p-4 w-full text-center bg-purple text-white">
        <h2>{villaName}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 text-sm">
        {[
          {
            label: 'Arrival Date',
            value: checkinString,
            className: 'bg-white rounded-lg px-4',
          },
          {
            label: 'Departure Date',
            value: checkoutString,
            className: 'bg-white rounded-lg px-4',
          },
          { label: 'Number of Nights', value: numNights, className: 'px-4' },
        ].map(({ label, value, className }) => (
          <span
            key={label}
            className={`${className} py-2`}
          >
            <h3>{label}</h3>
            <p>{value}</p>
          </span>
        ))}
        <Link
          className="col-span-2 px-4 hover:text-blue-500 text-xs"
          href={`/villas/${villaName}`}
        >
          {'<< Change Dates'}
        </Link>
        {[
          { label: 'Price Per Night', value: pricePerNight },
          { label: 'Subtotal', value: subTotal },
          { label: 'Discount', value: discount, className: 'text-red-500' },
          { label: 'Taxes', value: taxes },
          { label: 'Total', value: finalPrice, className: 'border-t' },
        ].map(({ label, value, className }) => (
          <span
            key={label}
            className={`${className} flex justify-between py-2 px-4 col-span-2`}
          >
            <h3>{label}</h3>
            <p>{formatCurrency(value, currency)}</p>
          </span>
        ))}
        <CountryDropdown countries={countries} />
      </div>
    </section>
  );
};

export default CartDetails;
