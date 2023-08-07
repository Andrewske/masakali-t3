'use client';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import Button from '~/components/Button';

const DateContainer = ({ villaName }: { villaName: string }) => {
  const date = new Date();
  return (
    <section className={styles.detailsContainer}>
      {/* @ts-expect-error Async Server Component */}
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
      <Button
        callToAction={'Book Surya'}
        isWhite={false}
        handleClick={() => null}
      />
      <div className={styles.villaExtrasContainer}>
        <span className={styles.villaExtrasHeader}>
          <h4>Description</h4>
          <h4>Amenities</h4>
          <h4>Reviews</h4>
        </span>
        <p>
          Our largest villa is a warm and elegant choice with ample space to
          rest and recharge. It has an ensuite breakfast table and features a
          hand-carved outdoor dining table that can seat larger groups on the
          private patio. Inside you’ll find a luxury king-sized mattress with
          high-quality bedding as well as a couch that can serve as an
          additional bed for an additional guest.
        </p>
      </div>
    </section>
  );
};

export default DateContainer;
