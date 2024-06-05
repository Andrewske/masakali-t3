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
import { type VillaIdsType } from '~/lib/villas';
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
    <span
      className="flex justify-between w-full text-sm"
      key={label}
    >
      <h3 className="text-sm">{label}</h3>
      <p>{amount > 0 && formatCurrency(amount, currency)}</p>
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
        const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        if (reservationId) {
          await updateReservation({
            reservationId,
            data: {
              villa_id: Number(villaId),
              arrival: new Date(dateRange.from.getTime() - userTimezoneOffset),
              departure: new Date(dateRange.to.getTime() - userTimezoneOffset),
            },
          });

          router.push(`/cart?reservationId=${String(reservationId)}`);
        } else {
          const newResId = await createReservation({
            villaId,
            checkin: dateRange.from,
            checkout: dateRange.to,
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
          className="flex-grow w-content"
          onClick={() => setIsActive(true)}
        >
          <h3 className="text-xl font-montserrat">Arrival Date</h3>
          <p>{arrivalDate}</p>
        </span>
        <span
          className="flex-grow w-content"
          onClick={() => setIsActive(true)}
        >
          <h3 className="text-xl font-montserrat">Departure Date</h3>
          <p>{departureDate}</p>
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
        callToAction={`Book Surya`}
      />
    </div>
  );
};

export default DateContainer;
