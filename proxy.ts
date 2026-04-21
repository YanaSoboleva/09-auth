// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/', '/home'];
// const PRIVATE_ROUTES = ['/profile', '/notes'];

// export function proxy(request: NextRequest) {
//   const session = request.cookies.get('accessToken');
//   const { pathname } = request.nextUrl;

//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
//   const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

//   if (session && (pathname === '/sign-in' || pathname === '/sign-up')) {
//     return NextResponse.redirect(new URL('/profile', request.url));
//   }
//   if (isPublicRoute) {
//     return NextResponse.next();
//   }
//   if (!session && isPrivateRoute) {
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/api/serverApi';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/profile', '/notes'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  if (!accessToken && refreshToken) {
    try {
      await checkSession();
      // const updatedCookies = await cookies();
      // accessToken = updatedCookies.get('accessToken')?.value;
      accessToken = (await cookies()).get('accessToken')?.value;
    } catch (err) {
      console.error('Middleware session refresh failed');
    }
  }

  const isAuthPage = PUBLIC_ROUTES.includes(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up'
  ],
};