import type {
  Stripe,
  PaymentIntent,
  StripeError,
  StripeCardElement,
} from '@stripe/stripe-js';

import createPaymentIntent from './createPaymentIntent';

type StripeBillingDetails = {
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
};

type StripeCheckoutParams = {
  price: number;
  stripe: Stripe;
  cardElement: StripeCardElement;
  billingDetails: StripeBillingDetails; // Replace 'any' with the actual type of billingDetails
};

type StripeCheckoutResult = {
  paymentIntent: PaymentIntent | undefined; // Replace 'any' with the actual type of paymentIntent
  errors: Array<StripeError | Error>;
};

export const stripeCheckout = async ({
  price,
  stripe,
  cardElement,
  billingDetails,
}: StripeCheckoutParams): Promise<StripeCheckoutResult> => {
  let errors: Array<StripeError | Error> = [];
  // Create Payment Intent
  const { clientSecret, paymentIntentError } = await createPaymentIntent({
    amount: price,
    currency: 'usd',
    paymentMethodType: 'card',
  });

  if (paymentIntentError) errors = [...errors, paymentIntentError];

  // Create the Payment Method Request
  const { paymentMethodReqId, paymentMethodReqError } =
    await createPaymentMethodReq({ stripe, cardElement, billingDetails });

  console.log({ paymentMethodReqId, paymentMethodReqError });

  if (paymentMethodReqError) errors = [...errors, paymentMethodReqError];

  if (paymentMethodReqId && clientSecret) {
    const { paymentIntent, confirmCardPaymentError } = await confirmCardPayment(
      {
        stripe,
        clientSecret,
        paymentMethodReqId,
      }
    );

    if (confirmCardPaymentError) throw confirmCardPaymentError;

    return { paymentIntent, errors };
  }
  return { paymentIntent: undefined, errors };
};

interface CreatePaymentMethodReqParams {
  stripe: Stripe;
  cardElement: StripeCardElement;
  billingDetails: StripeBillingDetails; // Replace 'any' with the actual type of billingDetails
}

interface CreatePaymentMethodReqResult {
  paymentMethodReqId: string | null;
  paymentMethodReqError: StripeError | undefined;
}

export const createPaymentMethodReq = async ({
  stripe,
  cardElement,
  billingDetails,
}: CreatePaymentMethodReqParams): Promise<CreatePaymentMethodReqResult> => {
  const { paymentMethod, error: paymentMethodReqError } =
    await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

  const paymentMethodReqId = paymentMethod?.id || null;

  return { paymentMethodReqId, paymentMethodReqError };
};

interface ConfirmCardPaymentParams {
  stripe: Stripe;
  clientSecret: string;
  paymentMethodReqId: string;
}

interface ConfirmCardPaymentResult {
  paymentIntent: PaymentIntent | undefined; // Replace 'any' with the actual type of paymentIntent
  confirmCardPaymentError: StripeError | undefined;
}

export const confirmCardPayment = async ({
  stripe,
  clientSecret,
  paymentMethodReqId,
}: ConfirmCardPaymentParams): Promise<ConfirmCardPaymentResult> => {
  const { error: confirmCardPaymentError, paymentIntent } =
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReqId,
    });

  return { paymentIntent, confirmCardPaymentError };
};
