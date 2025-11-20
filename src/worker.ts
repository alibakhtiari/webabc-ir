// src/worker.ts
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// This part is boilerplate from the Cloudflare Pages template
declare const __STATIC_CONTENT_MANIFEST: string;
const assetManifest = JSON.parse(__STATIC_CONTENT_MANIFEST);

// Define the country-to-language mappings
const persianCountries = new Set(['IR', 'AF', 'TJ']); // Iran, Afghanistan, Tajikistan
const arabianCountries = new Set([
  'SA', 'AE', 'EG', 'QA', 'KW', 'OM', 'BH', // GCC
  'JO', 'LB', 'IQ', 'SY', 'YE', 'PS',      // Levant & Yemen
  'DZ', 'MA', 'TN', 'LY', 'SD', 'MR'       // North Africa
]);

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // --- 1. WWW to non-WWW Redirect ---
    // This runs first to ensure the domain is canonical.
    if (url.hostname.startsWith('www.')) {
      const newHostname = url.hostname.replace('www.', '');
      const redirectUrl = `https://${newHostname}${url.pathname}${url.search}${url.hash}`;
      // Use a 301 permanent redirect for SEO.
      return Response.redirect(redirectUrl, 301);
    }

    // --- 2. Geolocation Language Redirect ---
    // Check for the country code provided by Cloudflare.
    const country = request.headers.get('cf-ipcountry')?.toUpperCase();

    // Regular expression to check if the path already has a language code.
    const hasLangCode = /^\/(en|fa|ar)(\/|$)/.test(url.pathname);

    // Only redirect if a country is detected AND there isn't already a language code.
    if (country && !hasLangCode) {
      let lang = 'en'; // Default to English
      if (persianCountries.has(country)) {
        lang = 'fa';
      } else if (arabianCountries.has(country)) {
        lang = 'ar';
      }

      // Reconstruct the URL with the determined language prefix.
      const redirectUrl = `https://${url.hostname}/${lang}${url.pathname}${url.search}${url.hash}`;

      // Use a 302 temporary redirect. This is better for language preferences.
      return Response.redirect(redirectUrl, 302);
    }

    // --- 3. Serve Static Assets ---
    // If no redirects occurred, serve the static file from KV storage.
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // For Single Page Applications (SPA), if a file isn't found,
      // you should serve the index.html to let React Router handle the route.
      try {
        const spaRequest = new Request(new URL("/index.html", request.url), request);
        return await getAssetFromKV(
          {
            request: spaRequest,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
          }
        );
      } catch (e) {
        // If index.html is also not found, return a 404.
        let pathname = new URL(request.url).pathname;
        return new Response(`File ${pathname} not found`, {
          status: 404,
          statusText: 'not found',
        });
      }
    }
  },
};