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

    console.log(`[Middleware] Processing request for: ${pathname}`)

    // --- 1. WWW to non-WWW Redirect ---
    if (request.nextUrl.hostname.startsWith('www.')) {
        const newUrl = new URL(request.url)
        newUrl.hostname = newUrl.hostname.replace('www.', '')
        return NextResponse.redirect(newUrl, 301)
    }

    // --- 2. Geolocation Language Redirect ---
    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    // Detect country from Cloudflare header
    const country = request.headers.get('cf-ipcountry')?.toUpperCase()
    console.log(`[Middleware] Detected country: ${country || 'None (Local)'}`)

    let targetLocale = defaultLocale

    if (country) {
        if (persianCountries.has(country)) {
            targetLocale = 'fa'
        } else if (arabianCountries.has(country)) {
            targetLocale = 'ar'
        } else {
            // Fallback to 'fa' as default for all other countries
            targetLocale = 'fa'
        }
    }

    // Redirect to the target locale
    const newUrl = new URL(request.url)
    newUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`
    console.log(`[Middleware] Redirecting to: ${newUrl.pathname}`)

    return NextResponse.redirect(newUrl, 307)
}

export const config = {
    matcher: [
        '/',
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - images, fonts, assets (static assets)
         * - blog (if excluded in original)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|fonts|assets|blog).*)',
    ],
}
