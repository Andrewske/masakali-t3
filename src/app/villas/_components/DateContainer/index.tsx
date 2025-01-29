'use client';
import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import DateRangePicker from '~/components/DateRangePicker';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { formatCurrency } from '~/utils/helpers';
import CountryDropdown from '~/components/CountryDropdown';
import { type CountryType } from '~/actions/countries';
import Button from '~/components/Button';
import { createReservation } from '~/actions/reservations/createReservation';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { useRouter } from 'next/navigation';
import { updateReservation } from '~/actions/reservations/updateReservation';
import { lookupReservation } from '~/actions/reservations/lookupReservation';

const DateContainer = ({
  disabledDates,
  villaPricing,
  countries,
  villaId,
}: {
  disabledDates: Set<string | undefined>;
  villaPricing: VillaPricingType[];
  countries: CountryType[];
  villaId: VillaIdsType;
}) => {
  const { dateRange } = useReservationStore((state) => state);
  const { currency, conversionRate } = useCurrencyStore((state) => state);
  const { reservationId, setReservationId } = useReservationStore(
    (state) => state
  );
  const villaName = getVillaName(villaId);

  useEffect(() => {
    if (reservationId) {
      const fetchReservation = async () => {
        const { smoobuId, error } = await lookupReservation(reservationId);
        if (smoobuId || error) {
          setReservationId(null);
        }
      };
      fetchReservation().catch(console.error);
    }
  }, [reservationId, setReservationId]);

  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const { pricePerNight, subTotal, discount, taxes, finalPrice } =
    useMemo(() => {
      return createPricingObject({
        villaPricing,
        checkin: new Date(dateRange.from ?? ''),
        checkout: new Date(dateRange.to ?? ''),
        conversionRate,
      });
    }, [dateRange, villaPricing, conversionRate]);

  const renderConvertedAmount = (label: string, amount: number) => (
    <span>
      <span
        className="flex justify-between w-full text-sm font-montserrat"
        key={label}
      >
        <h3 className="text-sm">{label}</h3>
        <p>{amount > 0 && formatCurrency(amount, currency)}</p>
      </span>
      {label === 'Discount' &&
        (dateRange.to && dateRange.to < new Date('2025-03-01') ? (
          <p className="text-xs">
            <span className="text-red-500">LIMITED TIME </span>
            <span className="opacity-75">
              20% discount for booking directly
            </span>
          </p>
        ) : (
          <p className="text-xs opacity-75">
            10% discount for booking directly
          </p>
        ))}
    </span>
  );

  const arrivalDate =
    dateRange.from &&
    dateRange.from instanceof Date &&
    !isNaN(dateRange.from.getTime())
      ? format(dateRange.from, "MMM d',' yyyy")
      : 'Choose Dates';

  const departureDate =
    dateRange.to &&
    dateRange.to instanceof Date &&
    !isNaN(dateRange.to.getTime())
      ? format(dateRange.to, "MMM d',' yyyy")
      : 'Choose Dates';

  const handleBooking = async () => {
    try {
      if (dateRange.from && dateRange.to) {
        if (reservationId) {
          await updateReservation({
            reservationId,
            data: {
              villa_id: Number(villaId),
              arrival: format(dateRange.from, 'yyyy-MM-dd'),
              departure: format(dateRange.to, 'yyyy-MM-dd'),
            },
          });

          router.push(`/cart?reservationId=${String(reservationId)}`);
        } else {
          const newResId = await createReservation({
            villaId,
            arrival: format(dateRange.from, 'yyyy-MM-dd'),
            departure: format(dateRange.to, 'yyyy-MM-dd'),
          });
          setReservationId(newResId);
          router.push(`/cart?reservationId=${String(newResId)}`);
        }
      }
    } catch (error) {
      console.log('Error creating reservation:', error);
      throw new Error('Error creating reservation');
    }
  };

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <div className="w-full flex flex-col p-4 gap-4 bg-gray">
        <DateRangePicker
          isActive={isActive}
          setIsActive={setIsActive}
          disabledDates={disabledDates}
        />
        <span
          className="flex-grow w-content font-montserrat"
          onClick={() => setIsActive(true)}
        >
          <h3 className="text-xl ">Arrival Date</h3>
          {arrivalDate}
        </span>
        <span
          className="flex-grow w-content font-montserrat"
          onClick={() => setIsActive(true)}
        >
          <h3 className="text-xl ">Departure Date</h3>
          {departureDate}
        </span>
        {renderConvertedAmount('Price per night', pricePerNight)}
        {renderConvertedAmount('Subtotal', subTotal)}
        {renderConvertedAmount('Discount', discount)}

        {renderConvertedAmount('Taxes', taxes)}
        {renderConvertedAmount('Total', finalPrice)}
        <CountryDropdown countries={countries} />
      </div>
      <Button
        handleClick={handleBooking}
        isWhite={false}
        callToAction={`Book ${villaName}`}
      />
    </div>
  );
};

export default DateContainer;
