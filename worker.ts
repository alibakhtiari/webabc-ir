import { Resend } from 'resend';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
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

async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const { name, email, phone, message, token } = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      token?: string;
    };

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing API Key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (token && env.TURNSTILE_SECRET_KEY) {
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
        return new Response(JSON.stringify({ error: 'Invalid Captcha' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Update this if you have a verified domain
      to: 'alibakhtiari.dev@gmail.com',
      replyTo: email,
      subject: `New Inquiry from ${name || 'Website Visitor'}${phone ? ` (${phone})` : ''}`,
      html: `<p><strong>Name:</strong> ${name || 'N/A'}</p>${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}<p><strong>Email:</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</p><p><strong>Message:</strong><br/>${message || 'N/A'}</p>`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email', details: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
    const is404Page = url.pathname.endsWith('/404') || url.pathname.endsWith('/404/');
    if (url.hostname !== CANONICAL_HOST || is404Page) {
      const headers = new Headers(response.headers);
      if (is404Page) {
        headers.set('X-Robots-Tag', 'noindex, follow');
      } else {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return new Response(response.body, {
        status: is404Page ? 404 : response.status,
        statusText: is404Page ? 'Not Found' : response.statusText,
        headers,
      });
    }
    return response;
  },
};
