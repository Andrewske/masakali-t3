'use client';
import { createContext, useContext, useState } from 'react';
import { type VillaIdsType } from '~/lib/villas';

type ReservationContextProviderProps = {
  children: React.ReactNode;
};

type ReservationContext = {
  villaId: VillaIdsType | null;
  setVillaId: React.Dispatch<React.SetStateAction<number | null>>;
  range: Range | null;
  setRange: React.Dispatch<React.SetStateAction<Range | null>>;
};

const ReservationContext = createContext<ReservationContext | null>(null);

export default function ReservationContextProvider({
  children,
}: ReservationContextProviderProps) {
  const [villaId, setVillaId] = useState(null);
  const [range, setRange] = useState(null);

  return (
    <ReservationContext.Provider
      value={{ villaId, setVillaId, range, setRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      'useReservationContext must be used within a ReservationContextProvider'
    );
  }

  return context;
}
