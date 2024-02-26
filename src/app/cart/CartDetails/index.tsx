'use client';

import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.scss';
import { getPricing } from '~/actions/smoobu';
import type { villaIdsType } from '~/utils/smoobu';

type CartDetailsProps = {
  checkIn: string;
  checkOut: string;
  villaId: villaIdsType;
};

const CartDetails = ({ checkIn, checkOut, villaId }: CartDetailsProps) => {
  const { data, error } = useQuery({
    queryFn: () => getPricing({ checkIn, checkOut, villaId }),
    queryKey: ['cart', checkIn, checkOut, villaId],
  });

  if (error) {
    console.error(error);
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <section className="w-full bg-gray">
        <div className="p-4 text-center bg-purple text-white w-100">
          <h2>{data?.villaName}</h2>
        </div>
        <div className="flex flex-col gap-2 p-4 text-sm">
          <span
            id="checkIn"
            className="py-2"
          >
            <h3>Arrival Date</h3>
            <p>{data?.checkIn}</p>
          </span>
          <span
            id="checkOut"
            className={styles.line}
          >
            <h3>departure date</h3>
            <p>{data?.checkOut}</p>
          </span>
          {/* 
        TODO: Figure out how I want to handle guests
        <span
          id="numGuests"
          className={styles.line}
        >
          <h3>Number of Guests</h3>
          <p>{numGuests}</p>
        </span> */}
          <span
            id="numNights"
            className={styles.line}
          >
            <h3>Number of Nights</h3>
            <p>{data?.numNights}</p>
          </span>
          <span
            id="price"
            className={styles.line}
          >
            <h3>Price Per Night</h3>
            <p>{data?.pricing?.pricePerNight}</p>
          </span>
          <span
            id="discount"
            className={styles.line}
          >
            <h3>Discount</h3>
            <p>{data?.pricing?.discount}</p>
          </span>
          <span
            id="taxes"
            className={styles.line}
          >
            <h3>Taxes</h3>
            <p>{data?.pricing?.taxes}</p>
          </span>
          <span
            id="total"
            className={styles.line}
          >
            <h3>Total</h3>
            <p>{data?.pricing?.total}</p>
            {/* TODO: Need to implement a currency selector here */}
          </span>
        </div>
      </section>
    </>
  );
};

export default CartDetails;
