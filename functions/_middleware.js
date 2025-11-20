// Cloudflare Pages Function for handling redirects and serving static assets
// Plain JavaScript version to avoid TypeScript compilation issues

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

    // --- 1. WWW to non-WWW Redirect ---
    if (url.hostname.startsWith('www.')) {
        const newHostname = url.hostname.replace('www.', '');
        const redirectUrl = `https://${newHostname}${url.pathname}${url.search}${url.hash}`;
        return Response.redirect(redirectUrl, 301);
    }

    // --- 2. Geolocation Language Redirect ---
    const country = request.headers.get('cf-ipcountry')?.toUpperCase();
    const hasLangCode = /^\/(en|fa|ar)(\/|$)/.test(url.pathname);

    if (country && !hasLangCode) {
        let lang = 'en'; // Default to English
        if (persianCountries.has(country)) {
            lang = 'fa';
        } else if (arabianCountries.has(country)) {
            lang = 'ar';
        }

        const redirectUrl = `https://${url.hostname}/${lang}${url.pathname}${url.search}${url.hash}`;
        return Response.redirect(redirectUrl, 302);
    }

    // Continue to the next middleware or serve the static asset
    return next();
}
