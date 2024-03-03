import type { Dispatch, SetStateAction } from 'react';
import type { DateRange } from 'react-day-picker';
import { createStore } from 'zustand/vanilla';

export type ReservationState = {
  dateRange: DateRange;
  villaName: string;
};

export type ReservationActions = {
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  setVillaName: (name: string) => void;
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
  return createStore<ReservationStore>((set, get) => ({
    ...initState,
    setDateRange: (range: SetStateAction<DateRange | undefined>) => {
      if (typeof range === 'function') {
        // If range is a function, we need to get the current state first
        const currentState = get().dateRange;
        // Ensure from and to are always Date objects
        const currentRange = {
          from: currentState.from || new Date(),
          to: currentState.to || new Date(),
        };
        const newRange = range(currentRange);
        set({ dateRange: newRange });
      } else {
        // If range is a DateRange object or undefined, we can directly set it
        set({ dateRange: range });
      }
    },
    setVillaName: (name: string) => set({ villaName: name }),
  }));
};
