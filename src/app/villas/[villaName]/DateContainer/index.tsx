'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';

const DateContainer = ({ villaName }: { villaName: string }) => {
  const [dates, setDates] = useState({ from: new Date(), to: new Date() });

  return (
    <div className={styles.wrapper}>
      {/* <DatePicker isRange={true} date={date}  /> */}
      <div className={styles.container}>
        <h3 className={styles.title}>Arrival Date</h3>
        <p>{format(dates.from, 'MMM d, yyyy')}</p>
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>Departure Date</h3>
        <p>{format(dates.to, 'MMM d, yyyy')}</p>
      </div>
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
