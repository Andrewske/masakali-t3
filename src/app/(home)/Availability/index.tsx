'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { type reservation } from '@prisma/client';

import styles from './styles.module.scss';
// import { getAvailableVillas } from '~/utils/reservations';
import { getAvailableVillas } from '~/actions/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import Link from 'next/link';
const today = new Date();

export type VillaPricing = {
  date: Date;
  villa_id: VillaIdsType;
};

const Availability = ({
  reservations,
  disabledDates,
  villaPricing,
}: {
  reservations: reservation[];
  disabledDates: Set<string | undefined>;
  villaPricing: VillaPricing[];
}) => {
  1;
  const [datePickerActive, setDatePickerActive] = useState(true);
  const { dateRange } = useReservationStore((state) => state);
  const [villasAvailable, setVillasAvailable] = useState<
    VillaIdsType[] | undefined
  >(undefined);

  useEffect(() => {
    async function fetchAvailableVillas() {
      const villasAvailable =
        dateRange?.to &&
        (await getAvailableVillas({
          from:
            dateRange?.from?.toISOString().split('T')[0] ??
            today.toISOString().split('T')[0] ??
            '',
          to: dateRange?.to.toISOString().split('T')[0] ?? '',
        }));

      console.log(villasAvailable);

      setVillasAvailable(villasAvailable);
    }

    fetchAvailableVillas().catch((err) => console.log(err));
  }, [dateRange, reservations, villaPricing]);

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

      <div className="flex flex-wrap gap-4 transition-all duration-300 ease-in-out justify-evenly w-full m-4">
        {villasAvailable &&
          villasAvailable.map((villaId) => {
            const villaName = getVillaName(villaId);
            const villa = villaDetails[villaName];
            return (
              <Link
                key={villaId}
                href={`/villas/${villaName}`}
              >
                <div className=" h-full w-content relative z-10 shadow-light-purple hover:bg-purple hover:text-white">
                  <span className="h-full">
                    <span className="bg-white bg-opacity-80 px-4 py-2 w-full h-full grid grid-col-1 place-items-center">
                      <h3 className="uppercase text-2xl">{villa.name}</h3>
                      <p className="text-xs">{villa.shortDescription}</p>
                      {/* <GoToPageButton
                      callToAction="Book Now"
                      isWhite={false}
                      path={`/villas/${villa.name}`}
                    /> */}
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Availability;
