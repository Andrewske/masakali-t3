'use client';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '~/utils/authOptions';

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
// export default function NextAuthProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }
