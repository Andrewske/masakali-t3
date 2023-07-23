'use client';

import { format, addDays } from 'date-fns';
import { useState } from 'react';

import styles from './styles.module.scss';
import DatePicker from '../../DatePicker';

import { api } from '~/utils/api';

const Availability = () => {
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(addDays(new Date(), 1));

  const setDate = ({
    type,
    date,
  }: {
    type: 'arrival' | 'departure';
    date: Date;
  }) => {
    if (type === 'arrival') {
      setArrivalDate(date);
      setDepartureDate(addDays(date, 1));
    }

    if (type === 'departure') {
      setDepartureDate(date);
    }
  };

  const { data: villasAvailable } = api.smoobu.getAllBlockedDates.useQuery({
    arrival: arrivalDate,
    departure: departureDate,
  });

  return (
    <section
      id="availability"
      className={styles.wrapper}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <DatePicker
            isRange={false}
            date={arrivalDate}
            setDate={setDate}
            type={'arrival'}
            arrivalDate={new Date()}
          />
          <h3 className={styles.dateTitle}>ARRIVAL DATE</h3>
          <span className={styles.dateContainer}>
            <p className={styles.dateDayLarge}>{format(arrivalDate, 'dd')}</p>
            <span>
              <p>
                {format(arrivalDate, 'MMM')}, {format(arrivalDate, 'yyyy')}
                <br />
                {format(arrivalDate, 'EEEE')}
              </p>
            </span>
          </span>
        </div>
        <div className={styles.container}>
          <DatePicker
            isRange={false}
            arrivalDate={arrivalDate}
            date={departureDate}
            setDate={setDate}
            type={'departure'}
          />
          <h3 className={styles.dateTitle}>DEPARTURE DATE</h3>
          <span className={styles.dateContainer}>
            <span className={styles.dateDayLarge}>
              {format(departureDate, 'dd')}
            </span>
            <span className={styles.dateInfo}>
              <p>
                {format(departureDate, 'MMM')}, {format(departureDate, 'yyyy')}
                <br />
                {format(departureDate, 'EEEE')}
              </p>
            </span>
          </span>
        </div>
      </div>

      <div className={styles.wrapper}>
        {villasAvailable &&
          villasAvailable.map((villaId) => (
            <div key={villaId.toString()}>{villaId}</div>
          ))}
      </div>
    </section>
  );
};

export default Availability;
