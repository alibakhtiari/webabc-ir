import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fa", "ar"];
const defaultLocale = "fa";

// Define the country-to-language mappings
const persianCountries = new Set(['IR', 'AF', 'TJ']); // Iran, Afghanistan, Tajikistan
const arabianCountries = new Set([
    'SA', 'AE', 'EG', 'QA', 'KW', 'OM', 'BH', // GCC
    'JO', 'LB', 'IQ', 'SY', 'YE', 'PS',      // Levant & Yemen
    'DZ', 'MA', 'TN', 'LY', 'SD', 'MR'       // North Africa
]);

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log(`[Proxy] Processing request for: ${pathname}`);

    // Skip redirection for static SEO files
    if (pathname.match(/^\/(sitemap.*\.xml|robots\.txt)$/)) {
        return NextResponse.next();
    }

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        // Detect country from Cloudflare header
        const country = request.headers.get('cf-ipcountry')?.toUpperCase();
        console.log(`[Proxy] Detected country: ${country || 'None (Local)'}`);

        let targetLocale = defaultLocale;

        if (country) {
            if (persianCountries.has(country)) {
                targetLocale = 'fa';
            } else if (arabianCountries.has(country)) {
                targetLocale = 'ar';
            } else {
                // Fallback to 'fa' as requested
                targetLocale = 'fa';
            }
        }

        // Redirect to the target locale
        const newPath = pathname === '/' ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
        console.log(`[Proxy] Redirecting to: ${newPath}`);
        return NextResponse.redirect(new URL(newPath, request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - fonts (static fonts)
         * - images (static images)
         * - blog (static blog markdown files)
         * - assets (other static assets)
         * - src (source directory - contains assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg|fonts|images|blog|assets|src).*)',
    ],
};

