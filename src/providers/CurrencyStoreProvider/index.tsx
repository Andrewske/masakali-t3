'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  type CurrencyStore,
  createCurrencyStore,
  initCurrencyStore,
} from '~/stores/currencyStore';

export const CurrencyStoreContext =
  createContext<StoreApi<CurrencyStore> | null>(null);

export interface CurrencyStoreProviderProps {
  children: ReactNode;
}

export function CurrencyStoreProvider({
  children,
}: CurrencyStoreProviderProps) {
  const store = useRef(createCurrencyStore());

  if (!store.current) {
    store.current = createCurrencyStore(initCurrencyStore());
  }
  return (
    <CurrencyStoreContext.Provider value={store.current}>
      {children}
    </CurrencyStoreContext.Provider>
  );
}

export const useCurrencyStore = <T,>(
  selector: (store: CurrencyStore) => T
): T => {
  const currencyStoreContext = useContext(CurrencyStoreContext);

  if (!currencyStoreContext) {
    throw new Error(
      'useCurrencyStore must be used within a CurrencyStoreProvider'
    );
  }

  return useStore(currencyStoreContext, selector);
};
