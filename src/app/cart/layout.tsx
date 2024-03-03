'use client';
import type { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      <Header />
      {children}
      <Footer />
    </Elements>
  );
}
