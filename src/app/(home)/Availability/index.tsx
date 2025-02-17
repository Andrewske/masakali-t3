'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { getAvailableVillas } from '~/actions/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';
import Link from 'next/link';
// import { useUserStore } from '~/providers/UserStoreProvider';
// import type { UserState } from '~/stores/userStore';
import { formatCurrency } from '~/utils/helpers';
import Image from 'next/image';

export type VillaPricing = {
  date: Date;
  villa_id: number;
  price: number | null;
};

const Availability = ({
  disabledDates,
  villaPricing,
}: {
  disabledDates: Set<string | undefined>;
  villaPricing: VillaPricing[];
}) => {
  const [datePickerActive, setDatePickerActive] = useState(false);
  const { dateRange } = useReservationStore((state) => state);
  const { currency } = useCurrencyStore((state) => state);
  const [villasAvailable, setVillasAvailable] = useState<
    VillaIdsType[] | undefined
  >(undefined);

  // const {
  //   user,
  //   user: { adults, children },
  //   setUser,
  // } = useUserStore((state) => state);

  useEffect(() => {
    const fetchVillas = async () => {
      if (dateRange.to) {
        const villasAvailable = await getAvailableVillas({
          from: dateRange?.from?.toISOString().split('T')[0] ?? '',
          to: dateRange?.to.toISOString().split('T')[0] ?? '',
        });
        setVillasAvailable(villasAvailable);
      }
    };
    void fetchVillas();
  }, [dateRange]);

  // function updateUserAdults(
  //   state: UserState['user'],
  //   adults: number
  // ): UserState['user'] {
  //   // Define the minimum and maximum allowed values for adults
  //   const minAdults = 0;
  //   const maxAdults = 4; // Assuming a reasonable upper limit, adjust as needed

  //   // Validate the adults count
  //   if (adults < minAdults || adults > maxAdults) {
  //     // Optionally, log an error or handle the invalid case as needed
  //     console.error('Invalid number of adults. Must be between 0 and 10.');
  //     // Return the current state without changes
  //     return state;
  //   }

  //   // Update the state with the valid adults count
  //   return {
  //     ...state,
  //     adults,
  //   };
  // }

  // function updateUserChildren(
  //   state: UserState['user'],
  //   children: number
  // ): UserState['user'] {
  //   // Define the minimum and maximum allowed values
  //   const minChildren = 0;
  //   const maxChildren = 4;

  //   // Validate the children count
  //   if (children < minChildren || children > maxChildren) {
  //     // Optionally, log an error or handle the invalid case as needed
  //     console.error('Invalid number of children. Must be between 0 and 4.');
  //     // Return the current state without changes
  //     return state;
  //   }

  //   // Update the state with the valid children count
  //   return {
  //     ...state,
  //     children,
  //   };
  // }

  // const handleClick = async () => {
  //   if (dateRange.to) {
  //     const villasAvailable = await getAvailableVillas({
  //       from: dateRange?.from?.toISOString().split('T')[0] ?? '',
  //       to: dateRange?.to.toISOString().split('T')[0] ?? '',
  //     });
  //     setVillasAvailable(villasAvailable);
  //   }
  // };

  const getVillaPrice = (villaId: VillaIdsType): number | null => {
    if (!dateRange.from || !dateRange.to) return null;

    const from = dateRange.from;
    const to = dateRange.to;

    const prices = villaPricing.filter(
      (villa) =>
        villa.villa_id === villaId && villa.date >= from && villa.date <= to
    );

    return prices.length ? Math.max(...prices.map((p) => p.price ?? 0)) : null;
  };

  return (
    <section
      id="availability"
      className="bg-purple text-white  h-full w-full py-16 md:py-0"
    >
      <div className="relative flex h-auto min-h-[350px]">
        <DateRangePicker
          isActive={datePickerActive}
          setIsActive={setDatePickerActive}
          disabledDates={disabledDates}
        />
        <span className="flex flex-col justify-center align-middle w-full gap-8">
          <span className="flex flex-wrap justify-center  gap-4 h-content">
            <div onClick={() => setDatePickerActive(!datePickerActive)}>
              <h3 className="text-sm font-montserrat text-left">
                ARRIVAL DATE
              </h3>
              <div className="w-[235px] h-[45px] bg-white text-purple text-xl flex items-center  px-4">
                <p className="my-auto font-montserrat">
                  {dateRange.from && format(dateRange.from, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div onClick={() => setDatePickerActive(!datePickerActive)}>
              <h3 className="text-sm font-montserrat text-left">
                DEPARTURE DATE
              </h3>
              <div className="w-[235px] h-[45px] bg-white text-purple text-xl flex items-center px-4">
                <p className="my-auto font-montserrat">
                  {dateRange.to && format(dateRange.to, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            {/* <div>
              <h3 className="text-sm font-montserrat text-left">Adults</h3>
              <input
                id="adults"
                className="w-[235px] h-[45px] font-montserrat bg-white text-purple px-4 text-xl"
                onChange={(e) => {
                  setUser(
                    updateUserAdults(user, parseInt(e.target.value ?? 2))
                  );
                }}
                value={adults}
                type="number"
              />
            </div>
            <div>
              <h3 className="text-sm font-montserrat text-left">Children</h3>
              <input
                id="children"
                className="w-[235px] h-[45px] bg-white text-purple px-4 text-xl normal-nums align-middle font-montserrat"
                onChange={(e) => {
                  setUser(
                    updateUserChildren(user, parseInt(e.target.value ?? 0))
                  );
                }}
                value={children}
                type="number"
              />
            </div> */}
            {/* <button
              type="button"
              onClick={handleClick}
              className="uppercase bg-white text-purple font-montserrat w-[235px] h-[45px] mt-5 hover:bg-purple hover:text-white hover:border border-white border-solid"
            >
              Check Availability
            </button> */}
          </span>

          <h3 className="uppercase  text-center font-montserrat">
            Unlock a 10% discount by booking directly
          </h3>
        </span>
      </div>

      <div
        className={`flex flex-wrap align-items-stretch gap-4 transition-all duration-300 ease-in-out justify-evenly w-full ${
          villasAvailable ? 'py-8' : ''
        } `}
      >
        {villasAvailable?.map((villaId) => {
          const villaName = getVillaName(villaId);
          const villa = villaDetails[villaName];
          const price = getVillaPrice(villaId);

          return (
            <Link
              key={villaId}
              href={`/villas/${villaName}`}
              className="w-[350px] z-10 shadow-light-purple hover:bg-purple hover:text-white flex flex-col "
            >
              <Image
                src={villa.defaultImage}
                alt={villa.name}
                width={300}
                height={300}
                className="w-full object-cover aspect-3/2"
              />
              <span className="px-8 py-4 bg-white text-purple h-full flex flex-col gap-2 justify-between">
                <h3 className="uppercase text-2xl">{villa.name}</h3>
                <p className="!text-sm">{villa.shortDescription}</p>
                {price && (
                  <p className="!text-lg">{formatCurrency(price, currency)}</p>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Availability;
