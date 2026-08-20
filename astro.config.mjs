import fs from 'node:fs';
import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const sitemapLastmod = JSON.parse(
  fs.readFileSync(new URL('./src/generated/sitemap-lastmod.json', import.meta.url), 'utf-8')
);

const SITE = 'https://webabc.ir';
const LANGS = ['en', 'fa', 'ar'];
const LANG_HREF = { en: 'en', fa: 'fa', ar: 'ar' };
const LASTMOD_FALLBACK = sitemapLastmod._fallback;

// Map slug to its representative image for sitemap image entries
export const getImageForPage = (pageKey) => {
  // Blog posts: cover image is /images/blog/<slug>.webp (exists for all blog posts)
  if (pageKey.match(/^(en|fa|ar)\/blog\/(.+)$/)) {
    const slug = pageKey.replace(/^(en|fa|ar)\/blog\//, '').replace(/\/$/, '');
    return `/images/blog/${slug}.webp`;
  }
  // Services: hero image from assets, og crop at /images/og/services/<slug>.webp
  if (pageKey.match(/^(en|fa|ar)\/services\/(.+)$/)) {
    const slug = pageKey.replace(/^(en|fa|ar)\/services\//, '').replace(/\/$/, '');
    return `/images/og/services/${slug}.webp`;
  }
  // Service areas: location image og crop at /images/og/service-areas/<slug>.webp
  if (pageKey.match(/^(en|fa|ar)\/service-areas\/(.+)$/)) {
    const slug = pageKey.replace(/^(en|fa|ar)\/service-areas\//, '').replace(/\/$/, '');
    return `/images/og/service-areas/${slug}.webp`;
  }
  // Portfolio: og crop at /images/og/portfolio/<slug>.webp
  if (pageKey.match(/^(en|fa|ar)\/portfolio\/(.+)$/)) {
    const slug = pageKey.replace(/^(en|fa|ar)\/portfolio\//, '').replace(/\/$/, '');
    return `/images/og/portfolio/${slug}.webp`;
  }
  // Tools index and individual tools: some have hero images
  if (pageKey.match(/^(en|fa|ar)\/tools\/$/)) {
    return '/images/og/tools/headline-analyzer.webp'; // fallback representative
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
    // it's small and needed on every page, so a critical round-trip costs more than the
    // (uncached) duplication. See PageSpeed "render-blocking requests" finding on Layout.css.
    inlineStylesheets: 'always',
  },
  trailingSlash: 'always',
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [
    sitemap({
      // Root `/` and 404 pages are excluded from index
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
