// Cloudflare Pages Function for handling redirects and locale-based routing
// Plain JavaScript version to avoid TypeScript compilation issues

const locales = ["en", "fa", "ar"];
const defaultLocale = "fa";

// Define the country-to-language mappings
const persianCountries = new Set(['IR', 'AF', 'TJ']); // Iran, Afghanistan, Tajikistan
const arabianCountries = new Set([
    'SA', 'AE', 'EG', 'QA', 'KW', 'OM', 'BH', // GCC
    'JO', 'LB', 'IQ', 'SY', 'YE', 'PS',      // Levant & Yemen
    'DZ', 'MA', 'TN', 'LY', 'SD', 'MR'       // North Africa
]);

export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const pathname = url.pathname;

    console.log(`[Middleware] Processing request for: ${pathname}`);

    // Skip redirection for static SEO files
    if (pathname.match(/^\/(sitemap.*\.xml|robots\.txt)$/)) {
        return next();
    }

    // Skip redirects for Next.js internal routes and static assets
    const skipPatterns = [
        /^\/api\//,
        /^\/_next\//,
        /^\/favicon\.ico$/,
        /^\/placeholder\.svg$/,
        /\.(css|js|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|webm)$/i,
        /^\/fonts\//,
        /^\/images\//,
        /^\/blog\//,
        /^\/assets\//,
        /^\/src\//
    ];

    if (skipPatterns.some(pattern => pattern.test(pathname))) {
        return next();
    }

    // --- 1. WWW to non-WWW Redirect ---
    if (url.hostname.startsWith('www.')) {
        const newHostname = url.hostname.replace('www.', '');
        const redirectUrl = `https://${newHostname}${url.pathname}${url.search}${url.hash}`;
        return Response.redirect(redirectUrl, 301);
    }

    // --- 2. Geolocation Language Redirect ---
    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        // Detect country from Cloudflare header
        const country = request.headers.get('cf-ipcountry')?.toUpperCase();
        console.log(`[Middleware] Detected country: ${country || 'None (Local)'}`);

        let targetLocale = defaultLocale;

        if (country) {
            if (persianCountries.has(country)) {
                targetLocale = 'fa';
            } else if (arabianCountries.has(country)) {
                targetLocale = 'ar';
            } else {
                // Fallback to 'fa' as default for all other countries
                targetLocale = 'fa';
            }
        }

        // Redirect to the target locale
        const newPath = pathname === '/' ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
        console.log(`[Middleware] Redirecting to: ${newPath}`);

        const redirectUrl = `https://${url.hostname}${newPath}${url.search}${url.hash}`;
        return Response.redirect(redirectUrl, 302);
    }

    // Continue to the next middleware or serve the page
    return next();
}
