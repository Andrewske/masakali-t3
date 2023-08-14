'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/server/auth';

export default async function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
