import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';
import { montserrat, baskerville } from '~/fonts';
import { Toaster } from '~/components/ui/toaster';
import ReactQueryProvider from '~/context/ReactQueryProvider';
import { ReservationStoreProvider } from '~/providers/ReservationStoreProvider/index';
import { CurrencyStoreProvider } from '~/providers/CurrencyStoreProvider/index';
import { UserStoreProvider } from '~/providers/UserStoreProvider';
import Script from 'next/script';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

import '~/styles/icomoon.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable}`}
    >
      <body>
        <ReactQueryProvider>
          <UserStoreProvider>
            <CurrencyStoreProvider>
              <ReservationStoreProvider>
                <header className="relative md:sticky top-0 z-50">
                  <Header />
                </header>
                <main className="min-h-screen flex flex-col justify-between">
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
