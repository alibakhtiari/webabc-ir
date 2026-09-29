import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import sitemapLastmod from './src/generated/sitemap-lastmod.json' with { type: 'json' };

const SITE = 'https://webabc.ir';
const LANGS = ['en', 'fa', 'ar'];
const LANG_HREF = { en: 'en', fa: 'fa', ar: 'ar' };
const LASTMOD_FALLBACK = sitemapLastmod._fallback;

// Map slug to its representative image for sitemap image entries
export const getImageForPage = (pageKey) => {
  // Blog posts: locale typography card when generated, else the shared cover.
  if (pageKey.match(/^(en|fa|ar)\/blog\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/blog\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/blog/${slug}.webp`)) {
      return `/images/og/${lang}/blog/${slug}.webp`;
    }
    return `/images/blog/${slug}.webp`;
  }
  // Services: locale card when generated, else the shared EN card.
  if (pageKey.match(/^(en|fa|ar)\/services\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/services\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/services/${slug}.webp`)) {
      return `/images/og/${lang}/services/${slug}.webp`;
    }
    return `/images/og/services/${slug}.webp`;
  }
  // Service areas: locale card when generated, else the shared location crop.
  if (pageKey.match(/^(en|fa|ar)\/service-areas\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/service-areas\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/service-areas/${slug}.webp`)) {
      return `/images/og/${lang}/service-areas/${slug}.webp`;
    }
    return `/images/og/service-areas/${slug}.webp`;
  }
  // Portfolio: locale money-page card when generated, else the shared crop.
  if (pageKey.match(/^(en|fa|ar)\/portfolio\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/portfolio\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/portfolio/${slug}.webp`)) {
      return `/images/og/${lang}/portfolio/${slug}.webp`;
    }
    return `/images/og/portfolio/${slug}.webp`;
  }
  // Tools: per-tool art at /images/og/tools/<slug>.webp once it exists. The old
  // branch returned that path unconditionally for every tool, so all 66 tool URLs
  // published an <image:loc> pointing at images/og/tools/headline-analyzer.webp —
  // a file that does not exist (ACTION-PLAN §4.5). Existence is checked here so a
  // missing image degrades to the site default instead of shipping a 404, and the
  // per-tool card appears automatically as soon as the art is generated.
  if (pageKey.match(/^(en|fa|ar)\/tools(\/.*)?$/)) {
    const tool = pageKey.match(/^(en|fa|ar)\/tools\/([^/]+)\/?$/);
    if (tool) {
      const lang = tool[1];
      // Locale card first; then the shared EN card; then the site default.
      if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/tools/${tool[2]}.webp`)) {
        return `/images/og/${lang}/tools/${tool[2]}.webp`;
      }
      if (fs.existsSync(`public/images/og/tools/${tool[2]}.webp`)) {
        return `/images/og/tools/${tool[2]}.webp`;
      }
    }
    return '/images/og-image.webp';
  }
  // Locale homepages: per-locale home card once generated.
  if (pageKey.match(/^(en|fa|ar)\/$/)) {
    const lang = pageKey.replace(/\/$/, '');
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/home.webp`)) {
      return `/images/og/${lang}/home.webp`;
    }
  }
  return undefined;
}; // site-launch date — never a build timestamp

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  prefetch: false,
  build: {
    format: 'directory',
    // Inline the global stylesheet instead of a render-blocking <link> request —
    // The full stylesheet is ~120 KB — far past the inline threshold. With 'auto' it
    // ships as a content-hashed external stylesheet under /_astro/* (immutable,
    // cached for a year) instead of being re-downloaded inside the HTML of every
    // page. Multi-page sessions stop paying ~120 KB per navigation; the cold-load
    // cost is one same-origin edge-cached request (see audit M1).
    inlineStylesheets: 'auto',
  },
  trailingSlash: 'always',
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [
    sitemap({
      // Root `/` and 404 pages are excluded from the index.
      //
      // `/` is geo-redirected server-side by `worker.ts` (a 302 to the
      // visitor's locale), so it never answers 200 to a single-locale crawler.
      // A sitemap entry for it would therefore point at a URL that changes
      // response per visitor — the three locale roots (/en/, /fa/, /ar/) are the
      // intended entry points instead. Do not "fix" this by adding `/` back.
      filter: (page) => page !== `${SITE}/` && !page.includes('/404'),
      serialize: (item) => {
        if (item.url !== `${SITE}/` && !item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }

        // Content-accurate lastmod: frontmatter dates for blog, git-authorship dates for
        // everything else (resolved by scripts/resolve-sitemap-lastmod.mjs at build time).
        const pageKey = item.url.replace(`${SITE}/`, '');
        item.lastmod = sitemapLastmod[pageKey] || LASTMOD_FALLBACK;

        // Cross-language hreflang alternates via the sitemap stream's `links` field,
        // which renders <xhtml:link rel="alternate" hreflang="..." href="..."/> entries.
        if (LANGS.some((l) => pageKey === `${l}/` || pageKey.startsWith(`${l}/`))) {
          const slug = pageKey.replace(/^(en|fa|ar)\//, '');
          const altHref = (lang) => `${SITE}/${lang}/${slug}`;
          item.links = [
            ...LANGS.map((l) => ({ lang: LANG_HREF[l], url: altHref(l) })),
            { lang: 'x-default', url: altHref('en') },
          ];
        }

        if (item.url.match(/\/(en|fa|ar)\/$/)) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/tools/') || item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/portfolio/') || item.url.includes('/service-areas/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }

        // Add image entry for sitemap image index (node sitemap library expects item.img = [{ url: ... }])
        const img = getImageForPage(pageKey);
        if (img) {
          item.img = [{ url: `${SITE}${img}` }];
        }

        return item;
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
