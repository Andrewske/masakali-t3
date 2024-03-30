/* global Xendit */
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
import { env } from '~/env.mjs';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable}`}
    >
      <body className="h-full flex flex-col">
        <ReactQueryProvider>
          <UserStoreProvider>
            <CurrencyStoreProvider>
              <ReservationStoreProvider>
                <main className="flex-grow">{children} </main>
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
