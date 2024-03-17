'use client';

import Image from 'next/image';
import { useState } from 'react';
import { format } from 'date-fns';
import { type Reservation } from '@prisma/client';

import styles from './styles.module.scss';
import { getAvailableVillas } from '~/utils/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { getVillaName, villaDetails } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
const today = new Date();

const Availability = ({
  reservations,
  disabledDates,
}: {
  reservations: Reservation[];
  disabledDates: Set<string | undefined>;
}) => {
  1;
  const [datePickerActive, setDatePickerActive] = useState(true);
  const { dateRange } = useReservationStore((state) => state);

  // TODO: Fix Villas Available
  const villasAvailable =
    dateRange?.to &&
    getAvailableVillas({
      reservations,
      arrivalDate: dateRange?.from ?? today,
      departureDate: dateRange.to,
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
        />
        <div
          className={styles.container}
          onClick={() => setDatePickerActive(!datePickerActive)}
        >
          <h3 className={styles.dateTitle}>ARRIVAL DATE</h3>
          {dateRange?.from && (
            <span className={styles.dateContainer}>
              <p className={styles.dateDayLarge}>
                {format(dateRange.from, 'dd')}
              </p>
              <span>
                <p>
                  {format(dateRange.from, 'MMM')},{' '}
                  {format(dateRange.from, 'yyyy')}
                  <br />
                  {format(dateRange.from, 'EEEE')}
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
          {dateRange?.to && (
            <span className={styles.dateContainer}>
              <span className={styles.dateDayLarge}>
                {format(dateRange.to, 'dd')}
              </span>
              <span className={styles.dateInfo}>
                <p>
                  {format(dateRange.to, 'MMM')}, {format(dateRange.to, 'yyyy')}
                  <br />
                  {format(dateRange.to, 'EEEE')}
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
