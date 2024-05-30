'use server';
import { env } from '~/env.mjs';
import type { UserState } from '~/stores/userStore';
import type { XenditChargeResponse } from '~/types/xendit';

import type { VillaIdsType } from '~/lib/villas';

type ConfirmXenditPaymentProps = {
  token: string;
  user: UserState['user'];
  reservation: {
    villaId: VillaIdsType;
    checkin: Date;
    checkout: Date;
    totalIDR: number;
    villaName: string;
    pricePerNight: number;
    numNights: number;
    discount: number;
    taxes: number;
    finalPrice: number;
    currency: string;
  };
};

// Configuration for Xendit API
const xenditConfig = {
  url: 'https://api.xendit.co/credit_card_charges',
  username: env.XENDIT_TEST_SECRET_KEY,
  password: '', // Password is empty, but colon remains to fulfill the basic auth format
};

export const confirmXenditPayment = async ({
  token,
  user,
  reservation,
}: ConfirmXenditPaymentProps): Promise<{
  success: boolean;
  paymentId: string | null;
}> => {
  const { totalIDR } = reservation;

  const body = createRequestBody(token, user, totalIDR);
  const headers = createRequestHeaders();

  try {
    const response = await fetch(xenditConfig.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const textData = await response.text();
      console.log('Text data:', textData);
      throw new Error(
        `Xendit API request failed with status: ${response.statusText}`
      );
    }

    const responseBody = (await response.json()) as XenditChargeResponse;

    return {
      success: responseBody.status === 'CAPTURED',
      paymentId: body.external_id,
      // reservationId
    };
  } catch (error) {
    console.error('Failed to make the credit card charge:', { error });
    return { success: false, paymentId: null };
  }
};

// Helper function to create the request body
const createRequestBody = (
  token: string,
  user: UserState['user'],
  totalIDR: number
) => ({
  token_id: token,
  external_id: `postman-charge-${new Date().getTime()}`,
  amount: Math.round(totalIDR),
  billing_details: {
    given_names: user.fullName.split(' ')[0],
    surname: user.fullName.split(' ').slice(1).join(' '),
    email: user.email,
    mobile_number: user.phone,
    address: {
      street_line1: user.address.address1,
      street_line2: user.address.address2 || user.address.address1,
      city: user.address.city,
      province_state: user.address.region,
      postal_code: user.address.zip_code,
      country: user.address.country,
    },
  },
});

// Helper function to create the request headers
const createRequestHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Basic ${btoa(
    `${xenditConfig.username}:${xenditConfig.password}`
  )}`,
});
