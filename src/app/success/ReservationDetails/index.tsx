'use client';
import Image from 'next/image';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { type VillaPricingType, createPricingObject } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { useUserStore } from '~/providers/UserStoreProvider';
import { villaDetails } from '~/lib/villas';

import { formatCurrency } from '~/utils/helpers';
const ReservationDetails = ({
  villaPricing,
}: {
  villaPricing: VillaPricingType[];
}) => {
  const { dateRange, villaName } = useReservationStore((state) => state);
  const { conversionRate, currency } = useCurrencyStore((state) => state);
  const { user } = useUserStore((state) => state);

  const villa = villaDetails[villaName];
  const checkin = dateRange.from;
  const checkout = dateRange.to;

  if (!checkin || !checkout) {
    return (
      <span>
        <h1>Could not find reservation</h1>
        <p>Please contact admin@masakaliretreat.com</p>
      </span>
    );
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const pricing = createPricingObject({
    villaPricing,
    checkin,
    checkout,
    conversionRate,
  });
  return (
    <div className="flex flex-col justify-evenly items-center p-8">
      <Image
        src={villa.defaultImage}
        alt={villaName}
        width={600}
        height={400}
      />
      <div className="w-full md:w-[600px] p-4 flex flex-col items-center bg-gray">
        <h2 className="text-center w-full md:w-[550px]">
          Thank you for booking at masakali retreat
        </h2>
        <span className="flex w-full p-4 justify-evenly ">
          <div className="border border-purple p-4 grid place-items-center">
            <h3>Checkin</h3>
            <p>{formatDate(checkin)}</p>
            <p>2:00 PM</p>
          </div>
          <div className="border border-purple p-4 grid place-items-center">
            {' '}
            <h3>Checkout</h3>
            <p>{formatDate(checkout)}</p>
            <p>11:00 AM</p>
          </div>
        </span>
        <div className="flex flex-col gap-2 max-w-[350px]">
          <p>Number of guests: {user.adults + user.children}</p>
          <p>Total nights: {formatCurrency(pricing.numNights, currency)}</p>
          <p>
            Price per night: {formatCurrency(pricing.pricePerNight, currency)}
          </p>
          <p>Subtotal: {formatCurrency(pricing.subTotal, currency)}</p>
          <p>Discount: {formatCurrency(pricing.discount, currency)}</p>
          <p>Taxes: {formatCurrency(pricing.taxes, currency)}</p>
          <p>Final price: {formatCurrency(pricing.finalPrice, currency)}</p>
        </div>
        <p className="text-xs p-8">
          Questions? Email us at info@masakaliretreat.com
        </p>
      </div>
    </div>
  );
};

export default ReservationDetails;
