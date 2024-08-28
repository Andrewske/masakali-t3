// import { Montserrat, Baskervville } from 'next/font/google';
import localFont from 'next/font/local';

// export const montserrat = Montserrat({
//   variable: '--font-montserrat',
//   weight: '300',
//   subsets: ['latin'],
//   display: 'swap',
// });
export const montserrat = localFont({
  src: [{ path: './AvenirLTStd-Book.otf', weight: '300', style: 'normal' }],
  variable: '--font-montserrat',
});

export const baskerville = localFont({
  src: [
    {
      path: './Baskerville-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './LibreBaskerville-Bold.ttf',
      weight: '700',
    },
    {
      path: './LibreBaskerville-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-baskerville',
});
