import { Montserrat, Libre_Baskerville } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
});

export const baskerville = Libre_Baskerville({
  weight: '400',
  variable: '--font-baskerville',
  subsets: ['latin'],
  display: 'swap',
});
