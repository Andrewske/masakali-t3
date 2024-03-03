import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';

import ReactQueryProvider from '~/context/ReactQueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <Header />
      {children}
      <Footer />
    </ReactQueryProvider>
  );
}
