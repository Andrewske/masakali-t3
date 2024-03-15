import type { DateRange } from 'react-day-picker';

import type { VillaNamesType } from '~/lib/villas';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

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
  return {
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    villaName: 'surya',
  };
};

export const defaultInitialState: ReservationState = {
  dateRange: {
    from: new Date(),
    to: new Date(),
  },
  villaName: 'surya',
};

export const createReservationStore = (
  initState: ReservationState = defaultInitialState
) => {
  return create<ReservationStore>()(
    persist(
      (set) => ({
        ...initState,
        dateRange: initState.dateRange,
        setDateRange: ({ to, from }: DateRange) => {
          // If range is a DateRange object or undefined, we can directly set it
          set({ dateRange: { to, from } }); // Type assertion to DateRange
        },
        setVillaName: (name: VillaNamesType) => set({ villaName: name }),
      }),
      {
        name: 'reservation-storage', // name of item in the storage (must be unique)
        // partialize: (state: UserStore) => ({ user: state.user }),
        // storage: sessionStorage,
      }
    )
  );
};
