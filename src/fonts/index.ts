import { Montserrat, Baskervville } from 'next/font/google';

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
});

export const baskerville = Baskervville({
  weight: '400',
  style: 'normal',
  variable: '--font-baskerville',
  subsets: ['latin'],
  display: 'swap',
});
