import type { ReactNode } from 'react';
import '~/styles/globals.scss';
import 'react-day-picker/dist/style.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
