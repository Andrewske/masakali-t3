'use client';
import { useEffect, type ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.Xendit) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      window.Xendit.setPublishableKey(env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY);
    }
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <Header />
        {children}
        <Footer />
      </Elements>
    </>
  );
}
