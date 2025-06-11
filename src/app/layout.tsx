import Script from 'next/script';
import type { ReactNode } from 'react';
import 'react-day-picker/dist/style.css';
import { Toaster } from '~/components/ui/toaster';
import ReactQueryProvider from '~/context/ReactQueryProvider';
import { baskerville, montserrat } from '~/fonts';
import { CurrencyStoreProvider } from '~/providers/CurrencyStoreProvider/index';
import { ReservationStoreProvider } from '~/providers/ReservationStoreProvider/index';
import { UserStoreProvider } from '~/providers/UserStoreProvider';
import '~/styles/globals.css';

import Footer from '~/components/layout/Footer';

import '~/styles/icomoon.css';

import type { Metadata } from 'next';
import HeaderWrapper from '~/components/layout/HeaderWrapper';

export const metadata: Metadata = {
  title: 'Masakali Retreat | Luxury Villas in Bali',
  description:
    'Experience serenity at Masakali Retreat, a luxury villa resort in Kelusa, Bali. Enjoy private infinity pools, stunning rice field views, and exceptional service.',
  keywords: [
    'Bali resort',
    'luxury villas',
    'infinity pools',
    'Ubud',
    'rice field views',
  ],
  openGraph: {
    title: 'Masakali Retreat - Luxury Villas in Bali',
    description:
      'Indulge in the perfect blend of luxury and nature at Masakali Retreat, nestled in the heart of Bali.',
    // images: [
    //   {
    //     url: 'https://www.masakaliretreat.com/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Masakali Retreat Villa with Infinity Pool',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/masakali_logo.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable} overflow-x-hidden`}
    >
      <body>
        <ReactQueryProvider>
          <UserStoreProvider>
            <CurrencyStoreProvider>
              <ReservationStoreProvider>
                <header className="relative md:sticky top-0 z-50">
                  <HeaderWrapper />
                </header>
                <main className="min-h-screen flex flex-col justify-between text-baskerville">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </ReservationStoreProvider>
            </CurrencyStoreProvider>
          </UserStoreProvider>
        </ReactQueryProvider>
        <Script
          src="https://js.xendit.co/v1/xendit.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
