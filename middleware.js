import { NextResponse } from 'next/server';
import { i18n } from './next-i18next.config';

export function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Skip next internal paths
    if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
        return NextResponse.next();
    }

    // Check if the locale is part of the path
    const locale = pathname.split('/')[1];

    // Redirect if the locale is not supported
    if (!i18n.locales.includes(locale)) {
        const url = req.nextUrl.clone();
        url.pathname = `/${i18n.defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
