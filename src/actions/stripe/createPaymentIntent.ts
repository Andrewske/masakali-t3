'use server';

import Stripe from 'stripe';

let stripe: Stripe;
if (process.env.NODE_ENV !== 'production') {
  stripe = new Stripe(process.env.STRIPE_TEST_KEY as string, {
    apiVersion: '2023-10-16',
  });
} else {
  stripe = new Stripe(process.env.STRIPE_LIVE_KEY as string, {
    apiVersion: '2023-10-16',
  });
}

interface PaymentIntentBody {
  amount: number;
  currency: string;
  paymentMethodType: string;
}

const createPaymentIntent = async ({
  amount,
  currency,
  paymentMethodType,
}: PaymentIntentBody): Promise<{
  clientSecret: string | null;
  paymentIntentError: Error | undefined;
}> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount.toString()),
      currency,
      payment_method_types: [paymentMethodType],
    });
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentError: undefined,
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { clientSecret: null, paymentIntentError: error };
    }

    return { clientSecret: null, paymentIntentError: undefined };
  }
};

export default createPaymentIntent;
