'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { type reservation } from '@prisma/client';

// import { getAvailableVillas } from '~/utils/reservations';
import { getAvailableVillas } from '~/actions/reservations';
import DateRangePicker from '~/components/DateRangePicker';
import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import { useReservationStore } from '~/providers/ReservationStoreProvider';
import Link from 'next/link';
import { useUserStore } from '~/providers/UserStoreProvider';
import type { UserState } from '~/stores/userStore';

export type VillaPricing = {
  date: Date;
  villa_id: VillaIdsType;
};

const Availability = ({
  disabledDates,
}: {
  disabledDates: Set<string | undefined>;
}) => {
  1;
  const [datePickerActive, setDatePickerActive] = useState(false);
  const { dateRange } = useReservationStore((state) => state);
  const [villasAvailable, setVillasAvailable] = useState<
    VillaIdsType[] | undefined
  >(undefined);

  const {
    user,
    user: { adults, children },
    setUser,
  } = useUserStore((state) => state);

  function updateUserAdults(
    state: UserState['user'],
    adults: number
  ): UserState['user'] {
    // Define the minimum and maximum allowed values for adults
    const minAdults = 0;
    const maxAdults = 4; // Assuming a reasonable upper limit, adjust as needed

    // Validate the adults count
    if (adults < minAdults || adults > maxAdults) {
      // Optionally, log an error or handle the invalid case as needed
      console.error('Invalid number of adults. Must be between 0 and 10.');
      // Return the current state without changes
      return state;
    }

    // Update the state with the valid adults count
    return {
      ...state,
      adults,
    };
  }

  function updateUserChildren(
    state: UserState['user'],
    children: number
  ): UserState['user'] {
    // Define the minimum and maximum allowed values
    const minChildren = 0;
    const maxChildren = 4;

    // Validate the children count
    if (children < minChildren || children > maxChildren) {
      // Optionally, log an error or handle the invalid case as needed
      console.error('Invalid number of children. Must be between 0 and 4.');
      // Return the current state without changes
      return state;
    }

    // Update the state with the valid children count
    return {
      ...state,
      children,
    };
  }

  const handleClick = async () => {
    if (dateRange.to) {
      const villasAvailable = await getAvailableVillas({
        from: dateRange?.from?.toISOString().split('T')[0] ?? '',
        to: dateRange?.to.toISOString().split('T')[0] ?? '',
      });
      setVillasAvailable(villasAvailable);
    }
  };

  return (
    <section
      id="availability"
      className="bg-purple text-white  h-full w-full py-16 md:py-0"
    >
      <div className="relative flex h-auto md:h-[300px]">
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
              <div className="w-[235px] h-[45px] bg-white text-purple text-xl flex  px-4">
                <p className="my-auto font-montserrat">
                  {dateRange.from && format(dateRange.from, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div onClick={() => setDatePickerActive(!datePickerActive)}>
              <h3 className="text-sm font-montserrat text-left">
                DEPARTURE DATE
              </h3>
              <div className="w-[235px] h-[45px] bg-white text-purple text-xl flex align-center px-4">
                <p className="my-auto font-montserrat">
                  {dateRange.to && format(dateRange.to, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-montserrat text-left">Adults</h3>
              <input
                id="adults"
                className="w-[235px] h-[45px] font-montserrat bg-white text-purple px-4 text-xl"
                onChange={(e) => {
                  setUser(updateUserAdults(user, parseInt(e.target.value)));
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
                  setUser(updateUserChildren(user, parseInt(e.target.value)));
                }}
                value={children}
                type="number"
              />
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="uppercase bg-white text-purple font-montserrat w-[235px] h-[45px] mt-5 hover:bg-purple hover:text-white hover:border border-white border-solid"
            >
              Check Availability
            </button>
          </span>

          <h3 className="uppercase  text-center font-montserrat">
            Unlock a 10% discount by booking directly
          </h3>
        </span>
      </div>

      <div
        className={`flex flex-wrap gap-4 transition-all duration-300 ease-in-out justify-evenly w-full h-full  ${
          villasAvailable ? 'py-8' : ''
        } `}
      >
        {villasAvailable &&
          villasAvailable.map((villaId) => {
            const villaName = getVillaName(villaId);
            const villa = villaDetails[villaName];
            return (
              <Link
                key={villaId}
                href={`/villas/${villaName}`}
              >
                <div className=" h-full w-content relative z-10 shadow-light-purple hover:bg-purple hover:text-white ">
                  <span className="h-full">
                    <span className="bg-white text-purple py-2 px-4 w-full h-full grid grid-col-1 place-items-center">
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
