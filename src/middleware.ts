import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isAdmin = request.nextUrl.pathname.startsWith('/admin');
  response.headers.set('x-is-admin', isAdmin.toString());
  return response;
}

export const config = {
  matcher: '/:path*',
};
