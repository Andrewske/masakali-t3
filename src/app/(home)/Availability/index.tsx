'use client';

import { format, addDays, parseISO } from 'date-fns';
import { useState } from 'react';

import styles from './styles.module.scss';

import { type Reservation } from '@prisma/client';
import { getAvailableVillas } from '~/utils/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { type DateRange } from 'react-day-picker';

const today = new Date();
const nextDay = addDays(today, 1);

const Availability = ({
  reservations,
  disabledDates,
}: {
  reservations: Reservation[];
  disabledDates: Set<string | undefined>;
}) => {
  const [datePickerActive, setDatePickerActive] = useState(true);
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: nextDay,
  });

  const villasAvailable =
    range?.to &&
    getAvailableVillas({
      reservations,
      arrivalDate: range?.from ?? today,
      departureDate: range.to,
    });

  // TODO: Add the villas cards for when they are available. Also check logic
  return (
    <section
      id="availability"
      className={styles.main}
    >
      <div className={styles.wrapper}>
        <DateRangePicker
          isActive={datePickerActive}
          setIsActive={setDatePickerActive}
          disabledDates={disabledDates}
          range={range}
          setRange={setRange}
        />
        <div
          className={styles.container}
          onClick={() => setDatePickerActive(!datePickerActive)}
        >
          <h3 className={styles.dateTitle}>ARRIVAL DATE</h3>
          {range?.from && (
            <span className={styles.dateContainer}>
              <p className={styles.dateDayLarge}>{format(range.from, 'dd')}</p>
              <span>
                <p>
                  {format(range.from, 'MMM')}, {format(range.from, 'yyyy')}
                  <br />
                  {format(range.from, 'EEEE')}
                </p>
              </span>
            </span>
          )}
        </div>
        <div
          className={styles.container}
          onClick={() => setDatePickerActive(!datePickerActive)}
        >
          <h3 className={styles.dateTitle}>DEPARTURE DATE</h3>
          {range?.to && (
            <span className={styles.dateContainer}>
              <span className={styles.dateDayLarge}>
                {format(range.to, 'dd')}
              </span>
              <span className={styles.dateInfo}>
                <p>
                  {format(range.to, 'MMM')}, {format(range.to, 'yyyy')}
                  <br />
                  {format(range.to, 'EEEE')}
                </p>
              </span>
            </span>
          )}
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