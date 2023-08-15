import NextAuth from 'next-auth/next';
import { authOptions } from '~/utils/authOptions';

const handler: unknown = NextAuth(authOptions);

export { handler as GET, handler as POST };
