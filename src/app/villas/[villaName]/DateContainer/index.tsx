'use client';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import Button from '~/components/Button';

const DateContainer = ({ villaName }: { villaName: string }) => {
  const date = new Date();
  return (
    <section className={styles.detailsContainer}>
      {/* <NextVilla currentVillaName={villaName} /> */}
      <div className={styles.datePickerContainer}>
        <h3 className={styles.datePickerTitle}>Arrival Date</h3>
        <p>{format(date, 'MMM d, yyyy')}</p>
        <h3 className={styles.datePickerTitle}>Departure Date</h3>
        <p>{format(date.setDate(date.getDate() + 1), 'MMM d, yyyy')}</p>
        <h3 className={styles.datePickerTitle}>Number Of Guests</h3>
        <p>1 adult</p>
        <span className={styles.lineBreak} />
        <div className={styles.totalContainer}>
          <h3>Total</h3>
          <p>$163.96 USD</p>
        </div>
      </div>
    </section>
  );
};

export default DateContainer;
