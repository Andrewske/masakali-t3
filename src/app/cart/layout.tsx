'use client';
import type { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const initialOptions = {
  clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'IDR',
  intent: 'capture',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Elements stripe={stripePromise}>
        <Header />
        {children}
        <Footer />
      </Elements>
    </PayPalScriptProvider>
  );
}
