'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import { format } from 'date-fns';

import DateRangePicker from '~/components/DateRangePicker';

import { type VillaName } from '~/utils/smoobu';

const DateContainer = ({ villaName }: { villaName: VillaName }) => {
  const [dates, setDates] = useState({ from: new Date(), to: new Date() });
  const [isActive, setIsActive] = useState(false);

  //const villaDetails = document ? document.getElementById('villa-info') : null;

  return (
    <div className={styles.wrapper}>
      {/* <DatePicker isRange={true} date={date}  /> */}
      {/* {villaDetails &&
        createPortal(
          <DateRangePicker
            isActive={isActive}
            setIsActive={setIsActive}
            villaName={villaName}
          />,
          villaDetails
        )} */}
      <DateRangePicker
        isActive={isActive}
        setIsActive={setIsActive}
        villaName={villaName}
      />
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Arrival Date</h3>
        <p>{format(dates.from, 'MMM d, yyyy')}</p>
      </span>
      <span
        className={styles.container}
        onClick={() => setIsActive(true)}
      >
        <h3 className={styles.title}>Departure Date</h3>
        <p>{format(dates.to, 'MMM d, yyyy')}</p>
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
