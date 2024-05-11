'use server';
import { env } from '~/env.mjs';
import type { UserState } from '~/stores/userStore';
import type { XenditChargeResponse } from '~/types/xendit';
import { sendBookingConfirmation } from '../sendgrid';
import { formatCurrency } from '~/utils/helpers';
import type { VillaIdsType } from '~/lib/villas';
import { createReservation } from '~/actions/smoobu';

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
}: ConfirmXenditPaymentProps): Promise<boolean> => {
  const {
    taxes,
    finalPrice,
    currency,
    villaId,
    villaName,
    checkin,
    checkout,
    numNights,
    pricePerNight,
    discount,
    totalIDR,
  } = reservation;

  const { fullName, email, address, phone, adults, children } = user;

  const body = createRequestBody(token, user, totalIDR);
  const headers = createRequestHeaders();

  try {
    console.log('Request body:', JSON.stringify(body, null, 2)); // Logging the request body
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
    console.log('Response body:', JSON.stringify(responseBody, null, 2));

    console.log({ status: responseBody.status === 'CAPTURED' });

    // await sendBookingConfirmation({
    //   data: {
    //     name: fullName,
    //     email: email,
    //     country: address.country,
    //     villaName: villaName,
    //     startDate: checkin.toISOString(),
    //     endDate: checkout.toISOString(),
    //     numDays: numNights,
    //     price: formatCurrency(pricePerNight, currency),
    //     discount: formatCurrency(discount, currency),
    //     taxes: formatCurrency(taxes, currency),
    //     total: formatCurrency(finalPrice, currency),
    //   },
    //   isRetreat: false,
    // });

    // await createReservation({
    //   villaId,
    //   checkin,
    //   checkout,
    //   finalPrice: totalIDR,
    //   firstName: fullName.split(' ')[0] ?? '',
    //   lastName: fullName.split(' ')[1] ?? '',
    //   email: email,
    //   phone: phone,
    //   adults: adults,
    //   children: children,
    //   country: address.country,
    //   xenditExternalId: body.external_id,
    // });

    return responseBody.status === 'CAPTURED';
  } catch (error) {
    console.error('Failed to make the credit card charge:', { error });
    return false;
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
