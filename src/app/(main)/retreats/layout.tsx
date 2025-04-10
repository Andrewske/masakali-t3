import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section className="h-full w-full flex flex-col">{children}</section>;
}
