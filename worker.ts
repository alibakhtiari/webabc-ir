import { Resend } from 'resend';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_EMAIL_TO?: string;
}

// This is the actual entrypoint Cloudflare Workers runs for `wrangler deploy`.
// `functions/_middleware.ts` and `functions/api/contact.ts` are Cloudflare Pages
// Functions conventions — they are never invoked by a plain Workers deployment,
// which is what this project's `npm run deploy` (`wrangler deploy`) does. This
// file replaces both, ported 1:1, so the logic they implemented actually runs.

const PERSIAN_COUNTRIES = ['IR', 'AF', 'TJ'];
const ARABIC_COUNTRIES = [
  'SA',
  'AE',
  'QA',
  'KW',
  'BH',
  'OM',
  'IQ',
  'EG',
  'LB',
  'JO',
  'SY',
  'YE',
  'PS',
  'SD',
  'LY',
  'MA',
  'DZ',
  'TN',
  'MR',
];

// Only the real production domain should be indexable. Any other hostname this
// Worker answers on (workers.dev preview URL, staging domains, etc.) gets a
// noindex header so it can never compete with the canonical site in search.
const CANONICAL_HOST = 'webabc.ir';

const STATIC_REDIRECTS: Record<string, string> = {
  // Sitemaps
  '/sitemap.xml': '/sitemap-index.xml',

  // Tool legacy slugs
  '/en/tools/seo-title-analyzer': '/en/tools/headline-analyzer/',
  '/fa/tools/seo-title-analyzer': '/fa/tools/headline-analyzer/',
  '/ar/tools/seo-title-analyzer': '/ar/tools/headline-analyzer/',
  '/en/tools/seo-title-checker': '/en/tools/headline-analyzer/',
  '/fa/tools/seo-title-checker': '/fa/tools/headline-analyzer/',
  '/ar/tools/seo-title-checker': '/ar/tools/headline-analyzer/',

  // Services
  '/en/services/modern-web-development': '/en/services/web-development/',
  '/fa/services/modern-web-development': '/fa/services/web-development/',
  '/ar/services/modern-web-development': '/ar/services/web-development/',
  '/en/local-seo-services': '/en/services/seo/',
  '/en/local-seo': '/en/services/seo/',
  '/fa/local-seo': '/fa/services/seo/',
  '/ar/local-seo': '/ar/services/seo/',
  '/en/seo-services': '/en/services/seo/',
  '/ar/seo-services': '/ar/services/seo/',
  '/fa/web-design': '/fa/services/web-design/',
  '/fa/web-development-services': '/fa/services/web-development/',
  '/ar/web-development-services': '/ar/services/web-development/',

  // Service Areas
  '/en/dubai': '/en/service-areas/dubai/',
  '/ar/dubai': '/ar/service-areas/dubai/',

  // Portfolio
  '/en/case-studies': '/en/portfolio/',
  '/en/portfolio/1': '/en/portfolio/samake-alpha/',
  '/ar/portfolio/1': '/ar/portfolio/samake-alpha/',
  '/en/portfolio/2': '/en/portfolio/samake-bartar/',
  '/ar/portfolio/2': '/ar/portfolio/samake-bartar/',
  '/ar/portfolio/4': '/ar/portfolio/zeytoun-masoud/',
  '/en/portfolio/5': '/en/portfolio/ramzarz-negaran/',
  '/ar/portfolio/5': '/ar/portfolio/ramzarz-negaran/',
  '/fa/portfolio/7': '/fa/portfolio/4-seasons-carpet-clean/',
  '/ar/portfolio/7': '/ar/portfolio/4-seasons-carpet-clean/',
  '/en/portfolio/10': '/en/portfolio/samake-alpha/',
  '/ar/portfolio/10': '/ar/portfolio/samake-alpha/',

  // Blog 2025 legacy slugs
  '/en/blog/seo-best-practices-2025': '/en/blog/seo-best-practices/',
  '/fa/blog/seo-best-practices-2025': '/fa/blog/seo-best-practices/',
  '/ar/blog/seo-best-practices-2025': '/ar/blog/seo-best-practices/',
  '/en/blog/best-seo-tools-2025': '/en/blog/best-seo-tools/',
  '/fa/blog/best-seo-tools-2025': '/fa/blog/best-seo-tools/',
  '/ar/blog/best-seo-tools-2025': '/ar/blog/best-seo-tools/',
  '/en/blog/mobile-first-design-2025': '/en/blog/mobile-first-design/',
  '/fa/blog/mobile-first-design-2025': '/fa/blog/mobile-first-design/',
  '/ar/blog/mobile-first-design-2025': '/ar/blog/mobile-first-design/',
  '/en/blog/web-design-trends-2025': '/en/blog/web-design-trends/',
  '/fa/blog/web-design-trends-2025': '/fa/blog/web-design-trends/',
  '/ar/blog/web-design-trends-2025': '/ar/blog/web-design-trends/',
};

async function handleContact(request: Request, env: Env): Promise<Response> {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  let payload: {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    message?: unknown;
    token?: unknown;
    company?: unknown; // honeypot — bots fill it, humans don't
  };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return json({ error: 'Invalid request body', code: 'invalid_input' }, 400);
  }

  // Silent success for bots so they can't probe the endpoint.
  if (typeof payload.company === 'string' && payload.company.trim() !== '') {
    return json({ success: true });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const token = typeof payload.token === 'string' ? payload.token : '';

  if (name.length < 2 || name.length > 100) {
    return json({ error: 'Invalid name', code: 'invalid_name' }, 400);
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email', code: 'invalid_email' }, 400);
  }
  if (message.length < 10 || message.length > 5000) {
    return json({ error: 'Invalid message', code: 'invalid_message' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Missing API Key', code: 'server_misconfigured' }, 500);
  }

  // Verify captcha when a secret is configured (production). Without a secret
  // (local dev) verification is skipped so the form stays testable.
  if (env.TURNSTILE_SECRET_KEY) {
    if (!token) {
      return json({ error: 'Invalid Captcha', code: 'invalid_captcha' }, 403);
    }
    try {
      const turnstileResult = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
        }
      );
      const outcome = (await turnstileResult.json()) as { success?: boolean };
      if (!outcome.success) {
        return json({ error: 'Invalid Captcha', code: 'invalid_captcha' }, 403);
      }
    } catch {
      return json({ error: 'Invalid Captcha', code: 'invalid_captcha' }, 403);
    }
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const esc = (v: unknown) =>
      String(v ?? '').replace(
        /[&<>"']/g,
        (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
      );
    const safeName = esc(name) || 'Website Visitor';
    const safePhone = esc(phone);
    const safeEmail = esc(email);
    const safeMessage = esc(message);
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Update this if you have a verified domain
      to: env.CONTACT_EMAIL_TO || 'alibakhtiari.dev@gmail.com',
      replyTo: email,
      subject: `New Inquiry from ${safeName}${safePhone ? ` (${safePhone})` : ''}`,
      html: `<p><strong>Name:</strong> ${safeName}</p>${safePhone ? `<p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>` : ''}<p><strong>Email:</strong> ${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : 'Not provided'}</p><p><strong>Message:</strong><br/>${safeMessage || 'N/A'}</p>`,
    });

    return json({ success: true, message: 'Message sent successfully!', data });
  } catch (error) {
    return json(
      { error: 'Failed to send email', code: 'send_failed', details: String(error) },
      500
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. www -> non-www
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.replace('www.', '');
      return Response.redirect(url.toString(), 301);
    }

    // 2. Contact form backend
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    // 2a. Legacy & Canonical Redirects (single 301 hop).
    // Must run BEFORE trailing-slash normalization below, so that both barePath
    // and slashed paths are redirected in a single hop and never return 404.
    const barePath =
      url.pathname.length > 1 && url.pathname.endsWith('/')
        ? url.pathname.slice(0, -1)
        : url.pathname;
    const redirectTarget = STATIC_REDIRECTS[barePath] || STATIC_REDIRECTS[url.pathname];
    if (redirectTarget) {
      return Response.redirect(`${url.origin}${redirectTarget}${url.search}`, 301);
    }
    // Canonical tool URL without slash -> slashed, same single hop.
    if (/^\/(en|fa|ar)\/tools\/headline-analyzer$/.test(url.pathname)) {
      url.pathname += '/';
      return Response.redirect(url.toString(), 301);
    }

    // 2b. Trailing-slash normalization — permanent redirect. The assets layer
    // answers bare-directory paths with a temporary 307, which leaves both URL
    // variants indexed (confirmed in GSC). A single explicit 301 here collapses
    // duplicates and passes link equity to the canonical slashed URL. Files with
    // an extension (/rss.xml, /_astro/*.js, /images/*) are excluded.
    const lastSegment = url.pathname.split('/').pop() || '';
    if (
      url.pathname !== '/' &&
      !url.pathname.endsWith('/') &&
      lastSegment !== '' &&
      !/\.[a-z0-9]+$/i.test(lastSegment)
    ) {
      url.pathname += '/';
      return Response.redirect(url.toString(), 301);
    }

    // 3. Root path -> geo-based locale redirect. This MUST be a 302 (temporary),
    // not 301: a permanent redirect that varies by geolocation would (a) poison
    // browser/edge caches for visitors who change regions, and (b) is what Google
    // recommends against for locale routing — the target selection varies by IP.
    if (url.pathname === '/' || url.pathname === '') {
      const country = (request as { cf?: { country?: string } }).cf?.country || 'US';
      let targetLang = 'en';
      if (PERSIAN_COUNTRIES.includes(country)) targetLang = 'fa';
      else if (ARABIC_COUNTRIES.includes(country)) targetLang = 'ar';
      return Response.redirect(`${url.origin}/${targetLang}/`, 302);
    }

    // 4. Everything else: serve static build, adding noindex on non-canonical hosts and 404 pages
    const response = await env.ASSETS.fetch(request);
    const is404 =
      url.pathname.endsWith('/404') || url.pathname.endsWith('/404/') || response.status === 404;
    if (url.hostname !== CANONICAL_HOST || is404) {
      const headers = new Headers(response.headers);
      if (is404) {
        headers.set('X-Robots-Tag', 'noindex, follow');
      } else {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return new Response(response.body, {
        status: is404 ? 404 : response.status,
        statusText: is404 ? 'Not Found' : response.statusText,
        headers,
      });
    }
    return response;
  },
};
