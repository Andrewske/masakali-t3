import type { DateRange } from 'react-day-picker';

import type { VillaNamesType } from '~/lib/villas';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { getCurrentDateInBali } from '~/utils';
import { addDays } from 'date-fns';

export type ReservationState = {
  dateRange: DateRange;
  villaName: VillaNamesType;
};

export type ReservationActions = {
  setDateRange: ({ to, from }: DateRange) => void;
  setVillaName: (name: VillaNamesType) => void;
};

export type ReservationStore = ReservationState & ReservationActions;

export const initReservationStore = (): ReservationState => {
  const today = getCurrentDateInBali();
  return {
    dateRange: {
      from: today,
      to: addDays(today, 1),
    },
    villaName: 'surya',
  };
};

export const defaultInitialState: ReservationState = {
  dateRange: {
    from: getCurrentDateInBali(),
    to: addDays(getCurrentDateInBali(), 1),
  },
  villaName: 'surya',
};

interface SerializedDate {
  type: 'to' | 'from';
  value: string;
}

// Define a type guard function to check if an object is of type SerializedDate
function isSerializedDate(obj: unknown): obj is SerializedDate {
  return (
    typeof obj === 'object' && obj !== null && 'type' in obj && 'value' in obj
  );
}

export const createReservationStore = (
  initState: ReservationState = defaultInitialState
) => {
  return create<ReservationStore>()(
    persist<ReservationStore>(
      (set) => ({
        ...initState,
        // dateRange: initState.dateRange,
        setDateRange: ({ to, from }: DateRange) => {
          // If range is a DateRange object or undefined, we can directly set it
          console.log({ from, to });
          set({
            dateRange: { to, from },
          }); // Type assertion to DateRange
        },
        setVillaName: (name: VillaNamesType) => set({ villaName: name }),
      }),
      {
        name: 'reservation-storage',
        // name of item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage, {
          // https://github.com/pmndrs/zustand/discussions/2403
          reviver: (key, value: unknown) => {
            if (
              isSerializedDate(value) &&
              (value.type === 'to' || value.type === 'from')
            ) {
              return new Date(value.value ?? '');
            }
            return value;
          },
          replacer: (key, value) => {
            if (value && (key === 'to' || key === 'from')) {
              return {
                type: key,
                value,
              };
            }
            return value;
          },
        }),
      }
    )
  );
};
