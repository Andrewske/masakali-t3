'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return <Header isAdmin={isAdmin} />;
}
