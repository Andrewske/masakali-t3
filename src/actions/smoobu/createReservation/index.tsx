'use server';
import { env } from '~/env.mjs';
import { channelIds } from '~/lib/smoobu';
import type { CreateReservationPropsType } from '~/utils/smoobu/createReservationData';

type ReservationResponse = {
  id: string;
};

export const createReservation = async ({
  data: {
    villaId,
    checkin,
    checkout,
    finalPrice,
    firstName,
    lastName,
    email,
    phone,
    adults,
    children,
    country,
    xenditExternalId,
  },
  reservationId,
}: {
  data: CreateReservationPropsType;
  reservationId: string;
}) => {
  try {
    // Create the reservation in Smoobu
    // Assuming fetch returns a Response object
    const response = await fetch(env.SMOOBU_API_URL + '/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': `${env.SMOOBU_API_KEY}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        arrivalDate: checkin,
        departureDate: checkout,
        apartmentId: villaId,
        channelId: channelIds.website,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        adults: adults,
        children: children,
        notice: xenditExternalId,
        country: country,
        price: finalPrice,
        'reference-id': reservationId,
      }),
    });

    // Parse the JSON content of the Response object
    const responseData = (await response.json()) as ReservationResponse;

    if (response.status === 200) {
      return responseData.id;
    } else {
      console.error(responseData);
      throw new Error('Failed to create reservation');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};
