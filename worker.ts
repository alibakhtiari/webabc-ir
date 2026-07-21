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
  'SA', 'AE', 'QA', 'KW', 'BH', 'OM',
  'IQ', 'EG', 'LB', 'JO', 'SY', 'YE',
  'PS', 'SD', 'LY', 'MA', 'DZ', 'TN', 'MR',
];

// Only the real production domain should be indexable. Any other hostname this
// Worker answers on (workers.dev preview URL, staging domains, etc.) gets a
// noindex header so it can never compete with the canonical site in search.
const CANONICAL_HOST = 'webabc.ir';

async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const { name, email, message, token } = (await request.json()) as {
      name?: string;
      email?: string;
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
      const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      });
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
      subject: `New Contact from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
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

    // 3. Root path -> geo-based locale redirect
    if (url.pathname === '/') {
      const country = ((request as { cf?: { country?: string } }).cf?.country) || 'US';
      let targetLang = 'en';
      if (PERSIAN_COUNTRIES.includes(country)) targetLang = 'fa';
      else if (ARABIC_COUNTRIES.includes(country)) targetLang = 'ar';
      return Response.redirect(`${url.origin}/${targetLang}`, 307);
    }

    // 4. Everything else: serve the static build, adding noindex on non-canonical hosts
    const response = await env.ASSETS.fetch(request);
    if (url.hostname !== CANONICAL_HOST) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  },
};
