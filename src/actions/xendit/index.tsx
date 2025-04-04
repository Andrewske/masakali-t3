'use server';
import { env } from '~/env';
import type { UserState } from '~/stores/userStore';
import type { XenditChargeResponse } from '~/types/xendit';

type ConfirmXenditPaymentProps = {
  token: string;
  user: UserState['user'];
  totalIDR: number;
};

// Configuration for Xendit API
const xenditConfig = {
  url: 'https://api.xendit.co/credit_card_charges',
  username:
    process.env.NODE_ENV === 'production'
      ? env.XENDIT_SECRET_KEY
      : env.XENDIT_TEST_SECRET_KEY,
  password: '', // Password is empty, but colon remains to fulfill the basic auth format
};

export const confirmXenditPayment = async ({
  token,
  user,
  totalIDR,
}: ConfirmXenditPaymentProps): Promise<{
  success: boolean;
  paymentId: string | null;
}> => {
  console.log('Confirming Xendit payment...');
  console.log('Token:', token);
  console.log('User:', user);
  // console.log('Reservation:', reservation);
  // const { totalIDR } = reservation;

  const body = createRequestBody(token, user, totalIDR);
  const headers = createRequestHeaders();

  try {
    const response = await fetch(xenditConfig.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    console.log('Xendit API response:', response);

    if (!response.ok) {
      const textData = await response.text();
      console.log('Text data:', textData);
      throw new Error(
        `Xendit API request failed with status: ${response.statusText}`
      );
    }

    const responseBody = (await response.json()) as XenditChargeResponse;

    console.log('Xendit response body:', responseBody);

    return {
      success: responseBody.status === 'CAPTURED',
      paymentId: responseBody.external_id,
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
