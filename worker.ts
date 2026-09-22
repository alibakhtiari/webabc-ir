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
  '/en/tools/serp-preview': '/en/tools/headline-analyzer/',
  '/fa/tools/serp-preview': '/fa/tools/headline-analyzer/',
  '/ar/tools/serp-preview': '/ar/tools/headline-analyzer/',
  '/en/tools/serp-preview/': '/en/tools/headline-analyzer/',
  '/fa/tools/serp-preview/': '/fa/tools/headline-analyzer/',
  '/ar/tools/serp-preview/': '/ar/tools/headline-analyzer/',

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

// ---------------------------------------------------------------------------
// acceptmarkdown.com RFC 9110 content negotiation helpers
// ---------------------------------------------------------------------------
type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw) => {
      const parts = raw
        .trim()
        .split(';')
        .map((s) => s.trim());
      const type = parts[0]?.toLowerCase();
      if (!type) return null;
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split('=').map((s) => s.trim());
        if (name === 'q') {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((e): e is AcceptEntry => e !== null);
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

function preferredType(header: string | null, produces: string[]): string | null {
  if (!header) return produces[0] ?? null;
  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    const matchedQ: number = matched.q;
    if (matchedQ <= 0) continue; // explicit rejection

    if (matchedQ > bestQ || (matchedQ === bestQ && matchedPosition < bestPosition)) {
      bestQ = matchedQ;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

function appendVaryAccept(headers: Headers): void {
  const existing = headers.get('vary');
  if (!existing) {
    headers.set('Vary', 'Accept');
    return;
  }
  const tokens = existing.split(',').map((s) => s.trim().toLowerCase());
  if (!tokens.includes('accept')) {
    headers.set('Vary', `${existing}, Accept`);
  }
}

function markdownPath(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/') return '/index.md';
  return `${clean}/index.md`;
}

const MARKDOWN_404_BODY = `# Page Not Found

The requested WebABC resource does not exist or has moved. Use the following machine-readable and directory indexes to recover:

- Return to the English homepage: https://webabc.ir/en/
- Read the machine-readable site guide: https://webabc.ir/llms.txt
- Browse the full LLM corpus: https://webabc.ir/llms-full.txt
- Browse the XML sitemap index: https://webabc.ir/sitemap-index.xml
- Explore core web design & SEO services: https://webabc.ir/en/services/
- Try developer & SEO interactive tools: https://webabc.ir/en/tools/
- Review client case studies & portfolio: https://webabc.ir/en/portfolio/
- Read our latest technical insights: https://webabc.ir/en/blog/
- Contact our team for consultation: https://webabc.ir/en/contact/

Available representations:
- Request \`Accept: text/markdown\` on any page to receive structured Markdown.
- Request \`Accept: text/html\` to receive full interactive web pages.
`;

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

    // 2b. Trailing-slash normalization — permanent redirect for valid routes.
    // Only redirect if the path actually exists as a directory/page in assets.
    // Nonexistent paths must return 404 directly, never a 301 redirect hop.
    const lastSegment = url.pathname.split('/').pop() || '';
    if (
      url.pathname !== '/' &&
      !url.pathname.endsWith('/') &&
      lastSegment !== '' &&
      !/\.[a-z0-9]+$/i.test(lastSegment)
    ) {
      const slashedUrl = new URL(url);
      slashedUrl.pathname += '/';
      const probe = await env.ASSETS.fetch(
        new Request(slashedUrl.toString(), { method: 'HEAD' })
      );
      if (probe.status === 200) {
        return Response.redirect(slashedUrl.toString(), 301);
      }
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

    // 4. Static assets (.css, .js, .webp, .svg, .xml, .txt, .json, .md, etc.)
    const STATIC_EXT =
      /\.(?:css|js|mjs|map|png|jpe?g|webp|gif|svg|avif|ico|woff2?|ttf|otf|eot|xml|txt|json|pdf|mp4|webm|mp3|wav|ogg|zip|md)$/i;
    if (STATIC_EXT.test(url.pathname)) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status === 404 && url.pathname.endsWith('.md')) {
        const headers = new Headers();
        headers.set('Content-Type', 'text/markdown; charset=utf-8');
        headers.set('X-Robots-Tag', 'noindex, follow');
        appendVaryAccept(headers);
        return new Response(MARKDOWN_404_BODY, { status: 404, statusText: 'Not Found', headers });
      }
      return assetRes;
    }

    // 5. Content negotiation for HTML and Markdown pages (acceptmarkdown.com compliant)
    const acceptHeader = request.headers.get('accept');
    const chosen = preferredType(acceptHeader, ['text/html', 'text/markdown']);

    // Client explicitly rejected all available representations (e.g. q=0 on both html and markdown)
    if (chosen === null && acceptHeader) {
      const headers = new Headers({
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      });
      appendVaryAccept(headers);
      return new Response('Not Acceptable\n\nAvailable: text/html, text/markdown\n', {
        status: 406,
        statusText: 'Not Acceptable',
        headers,
      });
    }

    // Client requested text/markdown representation
    if (chosen === 'text/markdown') {
      const mdPath = markdownPath(url.pathname);
      const mdUrl = new URL(mdPath, url);
      const mdReq = new Request(mdUrl.toString(), request);
      const mdRes = await env.ASSETS.fetch(mdReq);

      if (mdRes.status === 200) {
        const headers = new Headers(mdRes.headers);
        headers.set('Content-Type', 'text/markdown; charset=utf-8');
        appendVaryAccept(headers);
        if (url.hostname !== CANONICAL_HOST) {
          headers.set('X-Robots-Tag', 'noindex, nofollow');
        }
        return new Response(mdRes.body, { status: 200, headers });
      }

      // If specific /index.md failed, try bare .md (e.g. /en.md)
      const bareMdPath = `${url.pathname.replace(/\/$/, '')}.md`;
      if (bareMdPath !== mdPath) {
        const bareUrl = new URL(bareMdPath, url);
        const bareRes = await env.ASSETS.fetch(new Request(bareUrl.toString(), request));
        if (bareRes.status === 200) {
          const headers = new Headers(bareRes.headers);
          headers.set('Content-Type', 'text/markdown; charset=utf-8');
          appendVaryAccept(headers);
          if (url.hostname !== CANONICAL_HOST) {
            headers.set('X-Robots-Tag', 'noindex, nofollow');
          }
          return new Response(bareRes.body, { status: 200, headers });
        }
      }

      // Check whether this path is a 404
      const htmlCheck = await env.ASSETS.fetch(request);
      const is404 =
        htmlCheck.status === 404 ||
        url.pathname.endsWith('/404') ||
        url.pathname.endsWith('/404/');

      if (is404) {
        const headers = new Headers({
          'Content-Type': 'text/markdown; charset=utf-8',
          'X-Robots-Tag': 'noindex, follow',
        });
        appendVaryAccept(headers);
        return new Response(MARKDOWN_404_BODY, { status: 404, statusText: 'Not Found', headers });
      }

      // Page exists in HTML, but no markdown sibling found.
      // If client explicitly rejects HTML, return 406 Not Acceptable.
      if (!preferredType(acceptHeader, ['text/html'])) {
        const headers = new Headers({
          'Content-Type': 'text/plain; charset=utf-8',
        });
        appendVaryAccept(headers);
        return new Response(
          'Not Acceptable\n\nMarkdown sibling missing and HTML is not acceptable.\n',
          {
            status: 406,
            statusText: 'Not Acceptable',
            headers,
          }
        );
      }

      // Fall back to HTML representation with Vary: Accept
      const headers = new Headers(htmlCheck.headers);
      appendVaryAccept(headers);
      if (url.hostname !== CANONICAL_HOST) {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return new Response(htmlCheck.body, {
        status: htmlCheck.status,
        headers,
      });
    }

    // 6. Client requested text/html (or default wildcard)
    const response = await env.ASSETS.fetch(request);
    const is404 =
      url.pathname.endsWith('/404') || url.pathname.endsWith('/404/') || response.status === 404;

    if (is404) {
      const rawAccept = (acceptHeader || '').toLowerCase();
      const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
      const isAgentOrCli =
        !rawAccept.includes('text/html') ||
        rawAccept.includes('markdown') ||
        userAgent.includes('curl') ||
        userAgent.includes('bot') ||
        userAgent.includes('agent') ||
        userAgent.includes('crawler') ||
        userAgent.includes('spider') ||
        userAgent.includes('ora');

      if (isAgentOrCli) {
        const headers = new Headers({
          'Content-Type': 'text/markdown; charset=utf-8',
          'X-Robots-Tag': 'noindex, follow',
        });
        appendVaryAccept(headers);
        return new Response(MARKDOWN_404_BODY, {
          status: 404,
          statusText: 'Not Found',
          headers,
        });
      }

      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, follow');
      headers.set('Link', '</404.md>; rel="alternate"; type="text/markdown"');
      appendVaryAccept(headers);
      return new Response(response.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
    }

    // Standard HTML page response: add Vary: Accept and advertise markdown alternate if it exists
    const headers = new Headers(response.headers);
    appendVaryAccept(headers);

    if (url.hostname !== CANONICAL_HOST) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    if (headers.get('content-type')?.includes('text/html')) {
      const mdPath = markdownPath(url.pathname);
      const mdHead = await env.ASSETS.fetch(
        new Request(new URL(mdPath, url).toString(), { method: 'HEAD' })
      );
      if (mdHead.status === 200) {
        const linkValue = `<${mdPath}>; rel="alternate"; type="text/markdown"`;
        const existingLink = headers.get('link');
        headers.set('Link', existingLink ? `${existingLink}, ${linkValue}` : linkValue);
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
