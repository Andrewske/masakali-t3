import type { NextAuthOptions, DefaultSession } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/app/api/db';
import { env } from '~/env.mjs';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      admin: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    admin: boolean;
    // ...other properties
    // role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        admin: user?.admin,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
};
