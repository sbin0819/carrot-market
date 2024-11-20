import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Route {
  [key: string]: boolean;
}

const publicOnlyUrls = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
} satisfies Route;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession();
  const exists =
    pathname in publicOnlyUrls
      ? publicOnlyUrls[pathname as keyof typeof publicOnlyUrls]
      : false;

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
