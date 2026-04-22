// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { cookies } from 'next/headers';
// import { checkSession } from '@/lib/api/serverApi';

// const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
// const PRIVATE_ROUTES = ['/profile', '/notes'];

// export async function proxy(request: NextRequest) {
//   const cookieStore = await cookies();
//   let accessToken = cookieStore.get('accessToken')?.value;
//   const refreshToken = cookieStore.get('refreshToken')?.value;
//   const { pathname } = request.nextUrl;

//   let response = NextResponse.next();
//   if (!accessToken && refreshToken) {
//     try {
//       const sessionRes = await checkSession();
//       const setCookieHeader = sessionRes.headers['set-cookie'];

//       if (setCookieHeader) {
//         response = NextResponse.next();
//         setCookieHeader.forEach((cookie) => {
//           response.headers.append('Set-Cookie', cookie);
//         });
//         accessToken = 'updated';
//       }
//     } catch (err) {
//       console.error('Middleware session refresh failed');
//     }
//   }

//   const isAuthPage = PUBLIC_ROUTES.includes(pathname);
//   const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

//   if (accessToken && isAuthPage) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (!accessToken && isPrivateRoute) {
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     '/profile/:path*',
//     '/notes/:path*',
//     '/sign-in',
//     '/sign-up'
//   ],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/api/serverApi';
import { parse } from 'cookie';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/profile', '/notes'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  const response = NextResponse.next();
  if (!accessToken && refreshToken) {
    try {
      const sessionRes = await checkSession();
      const setCookieHeader = sessionRes.headers['set-cookie'];

      if (setCookieHeader) {
        setCookieHeader.forEach((cookieStr) => {
          response.headers.append('Set-Cookie', cookieStr);
          const parsed = parse(cookieStr);
          if (parsed.accessToken) {
            accessToken = parsed.accessToken;
          }
        });
      }
    } catch (err) {
      console.error('Middleware session refresh failed');
    }
  }
  const isAuthPage = PUBLIC_ROUTES.includes(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!accessToken && isPrivateRoute) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};