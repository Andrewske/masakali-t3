'use client';
import type { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
}
