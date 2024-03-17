'use client';

import { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
// Create a context
const StripeContext = createContext<Stripe | null>(null);

// Create a provider component
export const StripeProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
  );
};

// Create a custom hook to use the Stripe context
export const useStripeLib = () => useContext(StripeContext);
