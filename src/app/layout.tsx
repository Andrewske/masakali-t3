import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextAuthProvider from '~/context/NextAuthProvider';
import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import styles from './styles.module.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
