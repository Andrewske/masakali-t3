import { Montserrat, Libre_Baskerville, Mulish } from 'next/font/google';

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: '200',
  subsets: ['latin'],
  display: 'swap',
});

export const baskerville = Libre_Baskerville({
  weight: '400',
  variable: '--font-baskerville',
  subsets: ['latin'],
  display: 'swap',
});
