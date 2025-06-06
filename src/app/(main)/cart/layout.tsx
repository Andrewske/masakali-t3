'use client';
import { useEffect, type ReactNode } from 'react';
import { env } from '~/env.mjs';
import Modal from './Modal';
import XenditProvider from '~/providers/ZenditProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.Xendit) {
      console.log('Xendit loaded');
      window.Xendit.setPublishableKey(env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY);
    }
  }, []);

  return (
    <>
      <XenditProvider>
        {children}
        <Modal />
      </XenditProvider>
    </>
  );
}
