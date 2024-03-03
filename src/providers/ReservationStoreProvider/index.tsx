'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  type ReservationStore,
  createReservationStore,
  initReservationStore,
} from '~/stores/reservationStore';

export const ReservationStoreContext =
  createContext<StoreApi<ReservationStore> | null>(null);

export interface ReservationStoreProviderProps {
  children: ReactNode;
}

export function ReservationStoreProvider({
  children,
}: ReservationStoreProviderProps) {
  const store = useRef(createReservationStore());

  if (!store.current) {
    store.current = createReservationStore(initReservationStore());
  }
  return (
    <ReservationStoreContext.Provider value={store.current}>
      {children}
    </ReservationStoreContext.Provider>
  );
}

export const useReservationStore = <T,>(
  selector: (store: ReservationStore) => T
): T => {
  const reservationStoreContext = useContext(ReservationStoreContext);

  if (!reservationStoreContext) {
    throw new Error(
      'useReservationStore must be used within a ReservationStoreProvider'
    );
  }

  return useStore(reservationStoreContext, selector);
};
