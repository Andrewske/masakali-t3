'use client';

import { create } from 'lodash';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  type UserStore,
  createUserStore,
  initUserStore,
} from '~/stores/userStore';

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export function UserStoreProvider({ children }: UserStoreProviderProps) {
  const store = useRef(createUserStore());

  if (!store.current) {
    store.current = createUserStore(initUserStore());
  }
  return (
    <UserStoreContext.Provider value={store.current}>
      {children}
    </UserStoreContext.Provider>
  );
}

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const reservationStoreContext = useContext(UserStoreContext);

  if (!reservationStoreContext) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }

  return useStore(reservationStoreContext, selector);
};
