'use client';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useMemo } from 'react';
import { formatCurrency } from '~/utils/helpers';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import CountryDropdown from '~/components/CountryDropdown';
import { type CountryType } from '~/actions/countries';
import { format } from 'date-fns';
import Link from 'next/link';

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

  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    useMemo(() => {
      if (!dateRange?.from || !dateRange?.to) {
        return {
          pricePerNight: 0,
          subTotal: 0,
          discount: 0,
          taxes: 0,
          finalPrice: 0,
          numNights: 0,
        };
      }
      return createPricingObject({
        villaPricing,
        checkin: dateRange?.from, // ?? getCurrentDateInBali(),
        checkout: dateRange?.to, // ?? getCurrentDateInBali(),
        conversionRate,
      });
    }, [dateRange, villaPricing, conversionRate]);

  const checkinString = dateRange.from && format(dateRange.from, 'yyyy-MM-dd');
  const checkoutString = dateRange.to && format(dateRange.to, 'yyyy-MM-dd');

  const renderDetail = (
    label: string,
    value: string | number | null,
    className?: string
  ) => (
    <span
      key={label}
      className={`${className} py-2`}
    >
      <h3>{label}</h3>
      <p>{value}</p>
    </span>
  );

  const renderConvertedAmount = (
    label: string,
    amount: number,
    className?: string
  ) =>
    useMemo(
      () => (
        <span
          key={label}
          className={`${className} flex justify-between py-2 px-4 col-span-2`}
        >
          <h3>{label}</h3>
          <p>{formatCurrency(amount, currency)}</p>
        </span>
      ),
      [amount]
    );

  return (
    <section className="w-full h-[600px] bg-gray items-center">
      <div className="p-4 w-full text-center bg-purple text-white">
        <h2>{villaName}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 text-sm">
        {renderDetail(
          'Arrival Date',
          checkinString ?? '',
          'bg-white rounded-lg px-4'
        )}
        {renderDetail(
          'Departure Date',
          checkoutString ?? '',
          'bg-white rounded-lg px-4'
        )}
        <Link
          className="col-span-2 px-4 hover:text-blue-500 text-xs"
          href={`/villas/${villaName}`}
        >
          {'<< Change Dates'}
        </Link>
        {renderDetail('Number of Nights', numNights, 'px-4')}
        {renderConvertedAmount('Price Per Night', pricePerNight, 'col-span-2')}
        {renderConvertedAmount('Subtotal', subTotal, 'col-span-2')}
        {renderConvertedAmount('Discount', discount, 'col-span-2 text-red-500')}
        {renderConvertedAmount('Taxes', taxes, 'col-span-2')}
        {renderConvertedAmount('Total', finalPrice, 'border-t col-span-2')}
        <CountryDropdown countries={countries} />
      </div>
    </section>
  );
};

export default CartDetails;
