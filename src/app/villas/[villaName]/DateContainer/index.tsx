'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import { format, parseISO } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import DateRangePicker from '~/components/DateRangePicker';

const DateContainer = ({ disabledDates }: { disabledDates: string[] }) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <DateRangePicker
        isActive={isActive}
        setIsActive={setIsActive}
        disabledDates={disabledDates.map(date => parseISO(date))}
        range={range}
        setRange={setRange}
      />
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Arrival Date</h3>
        <p>{range?.from && format(range.from, 'MMM d, yyyy')}</p>
      </span>
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Departure Date</h3>
        <p>{range?.to && format(range.to, 'MMM d, yyyy')}</p>
      </span>
      <div className={styles.container}>
        <h3 className={styles.title}>Guests</h3>
        <p>1 adult</p>
      </div>

      <div className={styles.container}>
        <span className={styles.line} />
        <h3 className={styles.title}>Total</h3>
        <p>$163.96 USD</p>
      </div>
    </div>
  );
};

export default DateContainer;
