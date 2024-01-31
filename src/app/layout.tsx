import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';
import { montserrat, baskerville } from '~/fonts';
// import Script from 'next/script';
// import { env } from '~/env.mjs';
import ReactQueryProvider from '~/context/ReactQueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable}`}
    >
      {/* <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
      /> */}

      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
