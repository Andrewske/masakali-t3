import type { ReactNode } from 'react';
import Header from '~/components/layout/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <header className="relative md:sticky top-0 z-50">
        <Header />
      </header>
      <main className="min-h-screen flex flex-col justify-between text-baskerville">
        {children}
      </main>
    </section>
  );
}
