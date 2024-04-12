'use server';
import { prisma } from '~/db/prisma';
import { channelIds } from '~/lib/smoobu';

import type { VillaIdsType } from '~/lib/villas';
type createReservationProps = {
  checkin: string;
  checkout: string;
  billingDetails: {
    email: string;
    name: string;
    phone: string;
    adults: number;
    children: number;
    address: {
      address1: string;
      address2?: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  villaId: VillaIdsType;
  amount: number;
  currency: string;
};

export const createReservation = async ({
  checkin,
  checkout,
  billingDetails,
  villaId,
  amount,
  currency,
}: createReservationProps) => {
  const id = await prisma.reservation.create({
    data: {
      arrival: checkin,
      departure: checkout,
      createdAt: new Date(),
      villaId,
      channelId: channelIds.website,
      phone: billingDetails.phone,
      adults: billingDetails.adults,
      children: billingDetails.children,
      amount,
      currency,
      guestName: billingDetails.name,
      email: billingDetails.email,
    },
  });

  console.log('Reservation created:', id);

  return id;
};

export const confrmReservation = async (id: string, paypalId: string) => {
  const updatedReservation = await prisma.reservation.update({
    where: {
      id,
    },
    data: {
      paypalId,
    },
  });

  console.log('Confirming reservation:', updatedReservation);

  return updatedReservation;
};
