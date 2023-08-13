// export { GET, POST } from '~/server/auth';
// export const runtime = 'edge';

import NextAuth from 'next-auth';
import { authOptions } from '~/lib/auth';

const handler: unknown = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const { handlers: {GET, POST}} = NextAuth(authOptions);
