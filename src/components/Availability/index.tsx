import { add, eachDayOfInterval, format, addDays } from 'date-fns';
import { useState, useEffect, useLayoutEffect } from 'react';
import Button from '../Button';
import styles from './styles.module.scss';
import DatePicker from '../DatePicker';

import { api } from '~/utils/api';
import { activeVillaIds } from '~/utils/smoobu';
import { all } from 'axios';

import { type DateRange, type Matcher } from 'react-day-picker';

const villaIds = activeVillaIds();

const Availability = () => {
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState<Date>(
    addDays(new Date(), 1)
  );

  //const depatureDate = departureDateRange.to as DateRange;
  const [villasAvailable, setVillasAvailable] = useState<number[]>([]);

  const { data: allBlockedDates } = api.smoobu.getAllBlockedDates.useQuery({
    isArrival: true,
  });

  const { data: disabledDates, isLoading: disabledDatesIsLoading } =
    api.smoobu.getDisabledDates.useQuery<Matcher>({
      startDate: arrivalDate,
    });

  const handleCheckAvailability = () => {
    if (allBlockedDates) {
      let available: number[] = [];
      Object.entries(villaIds).forEach(([villaName, villaId]) => {
        // Make sure the  villa is in the blockedDates Object
        if (allBlockedDates.hasOwnProperty(villaId)) {
          let isAvailable = true;

          // For each date between arrival and day before departure
          for (const stayDate of eachDayOfInterval({
            start: arrivalDate,
            end: departureDate,
          }).filter((d) => d !== departureDate)) {
            // If the date is blocked then do not add the villa to the listing
            if (allBlockedDates[villaId]?.has(format(stayDate, 'yyyy-MM-dd'))) {
              isAvailable = false;
            }
          }

          // if every date in range is available add villa to list
          if (isAvailable) {
            available = [...available, villaId];
          }
        }
      });
      setVillasAvailable(available);
    }
  };

  return (
    <section
      id="availability"
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <DatePicker
          isRange={false}
          date={arrivalDate}
          setDate={setArrivalDate}
          disabled={disabledDates ?? []}
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
          date={{ from: arrivalDate, to: add(arrivalDate, { days: 2 }) }}
          setDate={setDepartureDate}
          disabled={disabledDates ?? []}
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
      <div className={styles.container}>
        <Button
          callToAction="check availability"
          handleClick={handleCheckAvailability}
        />
      </div>

      {villasAvailable.length > 0 &&
        villasAvailable.map((villaId) => <div key={villaId}>{villaId}</div>)}
    </section>
  );
};

export default Availability;
