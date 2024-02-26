'use client';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import DateRangePicker from '~/components/DateRangePicker';
import { useRouter } from 'next/navigation';
import { fr } from 'date-fns/locale';

const DateContainer = ({
  disabledDates,
  checkIn,
  checkOut,
}: {
  disabledDates: Set<string | undefined>;
  checkIn: string;
  checkOut: string;
}) => {
  // TODO: set range needs to set the searchParams of the page.
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(checkIn ?? new Date()),
    to: new Date(checkOut ?? new Date()),
  });
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const setQueryParams = (newRange: DateRange | undefined) => {
      const { from, to } = newRange || {};

      if (from && to) {
        const checkIn = format(from, 'yyyy-MM-dd');
        const checkOut = format(to, 'yyyy-MM-dd');

        router.push(`?checkIn=${checkIn}&checkOut=${checkOut}`);
      }
    };
    setQueryParams(range);
  }, [range]);

  return (
    <div className={styles.wrapper}>
      <DateRangePicker
        isActive={isActive}
        setIsActive={setIsActive}
        disabledDates={disabledDates}
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
