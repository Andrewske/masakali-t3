'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// Create a context
const StripeContext = createContext(null);

// Create a provider component
export const StripeProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const stripe = await loadStripe('your-stripe-publishable-key');

  return (
    <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
  );
};

// Create a custom hook to use the Stripe context
export const useStripeLib = () => useContext(StripeContext);
