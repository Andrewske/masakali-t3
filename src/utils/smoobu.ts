import axios from 'axios';

// import * as fs from 'fs';
import { prisma } from '~/server/db';
import { Prisma } from '@prisma/client';

type smoobuReservation = {
  id: number;
  'reference-id': string;
  type: string;
  arrival: string;
  departure: string;
  'created-at': string;
  modifiedAt: string;
  apartment: {
    id: number;
    name: string;
  };
  channel: {
    id: number;
    name: string;
  };
  'guest-name': string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  'check-in': string;
  'check-out': string;
  notice: string;
  'assistant-notice': string;
  price: number;
  'price-paid': string;
  'commission-included': number;
  prepayment: string;
  'prepayment-paid': string;
  deposit: null;
  'deposit-paid': string;
  language: string;
  'guest-app-url': string;
  'is-blocked-booking': boolean;
  guestId: number;
};

type ReservationCreateInput = {
  smoobuId: number;
  referenceId?: string;
  villaId?: number;
  channelId?: number;
  arrival: Date;
  departure: Date;
  createdAt: Date;
  guestName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  note: string;
  extraNote: string;
  amount: number;
  currency: string;
  commission: number;
  cancelled: boolean;
};

type smoobuReservationsResponse = {
  page_count: number;
  page_size: number;
  total_items: number;
  page: 1;
  bookings: smoobuReservation[];
};

// const findReservation = (smoobuId: number) => {
//     return Prisma.validator<Prisma.ReservationWhereInput>()({
//         smoobuId
//     })
// }
export const manuallyUpdateReservations = async () => {
  try {
    const url = 'https://login.smoobu.com/api/reservations';

    const headers = {
      'Content-Type': 'application/json',
      'Api-Key': process.env.SMOOBU_API_KEY,
    };

    const params = {
      showCancellation: true,
    };

    const {
      data: { page_count, bookings },
    }: { data: smoobuReservationsResponse } = await axios.get(url, {
      headers,
      params,
    });

    const reservations: smoobuReservation[] = bookings;
    // let count = page_count < 2 ? page_count : 2;

    // while (count <= page_count) {
    //   const {
    //     data: { bookings: newBookings },
    //   }: { data: smoobuReservationsResponse } = await axios.get(url, {
    //     headers,
    //     params: {
    //       ...params,
    //       page: count,
    //     },
    //   });

    //   reservations = [...reservations, ...newBookings];
    //   count += 1;
    // }

    if (reservations.length > 0) {
      for (const res of reservations) {
        // const user = await prisma.user.upsert({
        //   where: {
        //     email: res.email,
        //   },
        //   update: {
        //     name: res['guest-name'],
        //     firstName: res.firstname,
        //     lastName: res.lastname,
        //   },
        //   create: {
        //     email: res.email,
        //     name: res['guest-name'],
        //     firstName: res.firstname,
        //     lastName: res.lastname,
        //   },
        // });

        const smoobuId = res.id;

        const reservationData = {
          smoobuId,
          referenceId: res['reference-id'] ?? '',
          villaId: res.apartment.id ?? 0,
          channelId: res.channel.id ?? 0,
          arrival: new Date(res['arrival']) ?? new Date(),
          departure: new Date(res['departure']) ?? new Date(),
          createdAt: new Date(res['created-at']) ?? new Date(),
          guestName: res['guest-name'],
          firstName: res.firstname,
          lastName: res.lastname,
          email: res.email,
          phone: res.phone,
          adults: res.adults,
          children: res.children,
          note: res['notice'],
          extraNote: res['assistant-notice'],
          amount: res.price,
          currency: 'IDR',
          commission: res['commission-included'],
        };

        await prisma.reservation.upsert({
          where: { smoobuId },
          create: reservationData,
          update: reservationData,
        });

        // await prisma.user.update({
        //   where: {
        //     id: user.id,
        //   },
        //   data: {
        //     reservations: {
        //       connectOrCreate: [
        //         {
        //           where: {
        //             smoobuId: res.id,
        //           },
        //           create: reservationData,
        //         },
        //       ],
        //     },
        //   },
        // });
      }
    }

    return reservations;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
