import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';
export { default as authMiddleware } from 'next-auth/middleware';

const excludedPaths = ['/sign-in', '/sign-up', '/verify', '/'];

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;
    const isExcludedPath = excludedPaths.some((path) => url.pathname.startsWith(path))

    if (token && isExcludedPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!token && isExcludedPath) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
};