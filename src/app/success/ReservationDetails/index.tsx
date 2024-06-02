'use client';
import Image from 'next/image';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';

import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import { differenceInCalendarDays } from 'date-fns';

import { formatCurrency } from '~/utils/helpers';

const ReservationDetails = ({
  reservation: { arrival, departure, adults, children, amount, villa_id },
}: {
  reservation: {
    arrival: Date;
    departure: Date;
    adults: number | null;
    children: number | null;
    amount: number | null;
    villa_id: number;
  };
}) => {
  const { currency } = useCurrencyStore((state) => state);

  const villaName = getVillaName(villa_id as VillaIdsType);
  const villa = villaDetails[villaName];

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
            <p>{formatDate(arrival)}</p>
            <p>2:00 PM</p>
          </div>
          <div className="border border-purple p-4 grid place-items-center">
            {' '}
            <h3>Checkout</h3>
            <p>{formatDate(departure)}</p>
            <p>11:00 AM</p>
          </div>
        </span>
        <div className="flex flex-col gap-2 max-w-[350px]">
          <p>Number of guests: {(adults ?? 1) + (children ?? 0)}</p>
          <p>Total nights: {differenceInCalendarDays(departure, arrival)}</p>
          <p>Final price: {formatCurrency(amount ?? 0, currency)}</p>
        </div>
        <p className="text-xs p-8">
          Questions? Email us at info@masakaliretreat.com
        </p>
      </div>
    </div>
  );
};

export default ReservationDetails;
