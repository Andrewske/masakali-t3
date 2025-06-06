import { PrismaAdapter } from '@auth/prisma-adapter';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '~/env.mjs';

import { db } from '~/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    //   async signIn({ account, profile }) {
    //     if (account.provider === "google") {
    //       return profile.email_verified && profile.email.endsWith("@example.com")
    //     }
    //     return true // Do different verification for other providers that don't have `email_verified`
    //   },
  },
} satisfies NextAuthConfig;
