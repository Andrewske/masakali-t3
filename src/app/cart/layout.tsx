'use client';
import { useEffect, type ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import Modal from './Modal';
import XenditProvider from '~/providers/ZenditProvider';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const initialOptions = {
  clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'IDR',
  intent: 'capture',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.Xendit) {
      console.log('Xendit loaded');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      window.Xendit.setPublishableKey(env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY);
    }
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <XenditProvider>
          <Header />
          {children}
          <Modal />
          <Footer />
        </XenditProvider>
      </Elements>
    </>
  );
}
