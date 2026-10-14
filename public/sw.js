// WebABC Service Worker — offline caching with network-first navigation
// and stale-while-revalidate for static assets.
const VERSION = 'v1.0.1';
const CACHE_PREFIX = 'webabc';
const ASSET_CACHE = `${CACHE_PREFIX}-assets-${VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${VERSION}`;
const INSTALL_URLS = ['/', '/en/', '/fa/', '/ar/', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE).then((cache) => cache.addAll(INSTALL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== ASSET_CACHE && key !== PAGE_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isNavigationalRequest(request) {
  return request.mode === 'navigate';
}

function isStaticAsset(url) {
  return (
    url.origin === self.location.origin &&
    /\.(js|css|webp|avif|png|jpg|jpeg|svg|ico|woff2?|json)$/i.test(url.pathname)
  );
}

// Navigation: network first, fall back to cache, then to cached home page.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Skip non-http and dev server requests.
  if (url.protocol === 'chrome-extension:') return;

  if (isNavigationalRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = (await caches.match('/')) || (await caches.match('/en/'));
          if (fallback) return fallback;
          return new Response('Network error or offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        })
    );
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) {
          // Stale-while-revalidate: return cached copy and refresh in background
          fetch(request)
            .then((response) => {
              if (response.ok) {
                const copy = response.clone();
                caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
              }
            })
            .catch(() => {});
          return cached;
        }

        try {
          const response = await fetch(request);
          if (response.ok) {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        } catch {
          // If network fetch fails and nothing is cached, respond with a valid 404
          // instead of undefined, preventing TypeError: Failed to convert value to 'Response'
          return new Response(null, { status: 404, statusText: 'Not Found' });
        }
      })()
    );
  }
});
