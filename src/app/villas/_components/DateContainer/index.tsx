'use client';
import { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import { format } from 'date-fns';

import DateRangePicker from '~/components/DateRangePicker';

import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { createPricingObject, type VillaPricingType } from '~/utils/pricing';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import { formatCurrency } from '~/utils/helpers';
import CountryDropdown from '~/components/CountryDropdown';
const DateContainer = ({
  disabledDates,
  checkoutDates,
  villaPricing,
}: {
  disabledDates: Set<string | undefined>;
  checkoutDates: Set<string | undefined>;
  villaPricing: VillaPricingType[];
}) => {
  const { dateRange } = useReservationStore((state) => state);
  const { currency, conversionRate } = useCurrencyStore((state) => state);

  const [isActive, setIsActive] = useState(false);

  const { pricePerNight, subTotal, discount, taxes, finalPrice, numNights } =
    useMemo(() => {
      return createPricingObject({
        villaPricing,
        checkin: dateRange.from ?? new Date(),
        checkout: dateRange.to ?? new Date(),
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

  return (
    <div className={styles.wrapper}>
      <DateRangePicker
        isActive={isActive}
        setIsActive={setIsActive}
        disabledDates={disabledDates}
      />
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Arrival Date</h3>
        <p>{dateRange.from && format(dateRange.from, 'MMM d, yyyy')}</p>
      </span>
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Departure Date</h3>
        <p>{dateRange?.to && format(dateRange.to, 'MMM d, yyyy')}</p>
      </span>
      {renderConvertedAmount('Price per night', pricePerNight)}
      {renderConvertedAmount('Subtotal', subTotal)}
      {renderConvertedAmount('Discount', discount)}
      {renderConvertedAmount('Taxes', taxes)}
      {renderConvertedAmount('Total', finalPrice)}
      <CountryDropdown />
    </div>
  );
};

export default DateContainer;
