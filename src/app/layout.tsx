import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextAuthProvider from '~/context/NextAuthProvider';
import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';
import { montserrat, baskerville } from './fonts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable}`}
    >
      <body>
        <NextAuthProvider>
          <Header />

          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
