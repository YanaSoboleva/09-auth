import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/', '/home'];
const PRIVATE_ROUTES = ['/profile', '/notes'];

export function proxy(request: NextRequest) {
  const session = request.cookies.get('accessToken'); 
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

  if (session && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
  if (isPublicRoute) {
    return NextResponse.next();
  }
  if (!session && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};