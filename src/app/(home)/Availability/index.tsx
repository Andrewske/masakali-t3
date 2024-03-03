'use client';

import Image from 'next/image';
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { type Reservation } from '@prisma/client';

import styles from './styles.module.scss';
import { getAvailableVillas } from '~/utils/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { getVillaName, villaDetails } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';

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

  // TODO: Work on availability logic
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

      <div className="flex flex-wrap gap-4 transition-all duration-300 ease-in-out justify-evenly w-full">
        {villasAvailable &&
          villasAvailable.map((villaId) => {
            const villaName = getVillaName(villaId);
            const villa = villaDetails[villaName];
            return (
              <div
                key={villaId}
                className=" w-[350px] h-[350px] relative z-10 shadow-light-purple"
              >
                <Image
                  src={villa.defaultImage}
                  alt={villa.name}
                  width={300}
                  height={300}
                  className="relative object-cover w-full h-full z-0"
                />
                <span className="absolute top-0 left-0  h-full z-20 p-4">
                  <span className="bg-white bg-opacity-80 p-4 w-full h-full grid grid-col-1 place-items-center">
                    <h3 className="uppercase text-2xl">{villa.name}</h3>
                    <p className="text-sm">{villa.shortDescription}</p>
                    <GoToPageButton
                      callToAction="Book Now"
                      isWhite={false}
                      path={`/villas/${villa.name}`}
                    />
                  </span>
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Availability;
