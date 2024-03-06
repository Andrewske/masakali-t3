import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
