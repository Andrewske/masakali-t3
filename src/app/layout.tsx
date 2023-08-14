import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import NextAuthProvider from '~/context/NextAuthProvider';
import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';
import { montserrat, baskerville } from '~/fonts';

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
