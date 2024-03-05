'use client';
import { useEffect, useState } from 'react';
import getPricePerNight from '~/actions/smoobu/getPricePerNight';

// This is a hook to manage the pricing of the reservation

import type { VillaIdsType } from '~/types/smoobu';
import { daysBetweenDates } from '~/utils/calculations';
import logError from '~/utils/logError';

// It will accept checkin, checkout, villaId, discounts?
const usePricing = ({
  checkin,
  checkout,
  villaId,
}: {
  checkin: string;
  checkout: string;
  villaId: VillaIdsType;
}) => {
  const [pricePerNight, setPricePerNight] = useState<number | null>(null);
  const [numDays, setNumDays] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [taxes, setTaxes] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const calculateTotals = async () => {
      const pricePerNight = await getPricePerNight({
        checkin,
        checkout,
        villaId,
      });

      if (pricePerNight) {
        setPricePerNight(pricePerNight);
        setNumDays(daysBetweenDates(checkin, checkout));
      } else {
        throw new Error(`No price found for ${villaId} ${checkin} ${checkout}`);
      }
    };

    calculateTotals().catch((error) => {
      logError('Error calculating totals', error);
    });
  }, [checkin, checkout, villaId]);

  useEffect(() => {
    if (pricePerNight && numDays) {
      const discount = pricePerNight * 0.1;
      const taxes = pricePerNight * 0.11;
      const total = (pricePerNight - discount + taxes) * numDays;
      setDiscount(discount);
      setTaxes(taxes);
      setTotal(total);
    }
  }, [pricePerNight, numDays]);

  return { pricePerNight, numDays, discount, taxes, total };
};

export default usePricing;
