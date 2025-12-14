import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ["en", "fa", "ar"]
const defaultLocale = "en"

// Define the country-to-language mappings
const persianCountries = new Set(['IR', 'AF', 'TJ'])
const arabianCountries = new Set([
    'SA', 'AE', 'EG', 'QA', 'KW', 'OM', 'BH',
    'JO', 'LB', 'IQ', 'SY', 'YE', 'PS',
    'DZ', 'MA', 'TN', 'LY', 'SD', 'MR'
])

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const url = request.nextUrl.clone()

    // --- 1. WWW to non-WWW Redirect ---
    if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '')
        return NextResponse.redirect(url, 301)
    }

    // --- 2. Skip Internal Paths ---
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/assets') ||
        pathname.startsWith('/assets') ||
        pathname === '/favicon.ico' ||
        pathname === '/sitemap.xml' ||
        pathname === '/robots.txt'
    ) {
        return NextResponse.next()
    }

    // --- 3. Locale Handling ---
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    // --- 4. Language Detection & Redirect ---
    // Detect country from Cloudflare header
    const country = request.headers.get('cf-ipcountry')?.toUpperCase()
    let targetLocale = defaultLocale

    if (country) {
        if (persianCountries.has(country)) targetLocale = 'fa'
        else if (arabianCountries.has(country)) targetLocale = 'ar'
    }

    // Redirect to the target locale
    url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`

    // Use 307 for temporary redirect to allow browser caching behavior updates
    return NextResponse.redirect(url, 307)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - images, fonts, assets (static assets)
         * - blog
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|fonts|assets).*)',
    ],
}
