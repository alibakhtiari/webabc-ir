import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fa", "ar"];
const defaultLocale = "fa";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        // Redirect to default locale
        const newPath = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(new URL(newPath, request.url));
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|api|favicon.ico|.*\\..*).*)",
    ],
};
