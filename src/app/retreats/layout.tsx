import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section className="h-full w-full flex flex-col">{children}</section>;
}
