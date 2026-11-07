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

// Index each locale's blog covers for sitemap image entries.
const blogImages = new Map();
for (const lang of LANGS) {
  const dir = `src/content/blog/${lang}`;
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.mdx')) continue;
    const content = fs.readFileSync(`${dir}/${file}`, 'utf8');
    const frontmatter = content.split(/^---\s*$/m, 3)[1];
    const image = frontmatter?.match(/^image:[ \t]*['"]?(\/images\/[^'"\r\n]+)['"]?/m)?.[1].trim();
    if (image) blogImages.set(`${lang}/${file.slice(0, -4)}`, image);
  }
}

export const getImageForPage = (pageKey) => {
  // Blog posts: locale typography card when generated, else the frontmatter cover image.
  if (pageKey.match(/^(en|fa|ar)\/blog\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/blog\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/blog/${slug}.webp`)) {
      return `/images/og/${lang}/blog/${slug}.webp`;
    }
    const cover = blogImages.get(`${lang}/${slug}`);
    if (cover && fs.existsSync(`public${cover}`)) {
      return cover;
    }
    if (fs.existsSync(`public/images/blog/${slug}.webp`)) {
      return `/images/blog/${slug}.webp`;
    }
    return undefined;
  }
  // Services: locale card when generated, else the shared EN card if it exists.
  if (pageKey.match(/^(en|fa|ar)\/services\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/services\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/services/${slug}.webp`)) {
      return `/images/og/${lang}/services/${slug}.webp`;
    }
    if (fs.existsSync(`public/images/og/services/${slug}.webp`)) {
      return `/images/og/services/${slug}.webp`;
    }
    return undefined;
  }
  // Service areas: locale card when generated, else the shared location crop if it exists.
  if (pageKey.match(/^(en|fa|ar)\/service-areas\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/service-areas\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/service-areas/${slug}.webp`)) {
      return `/images/og/${lang}/service-areas/${slug}.webp`;
    }
    if (fs.existsSync(`public/images/og/service-areas/${slug}.webp`)) {
      return `/images/og/service-areas/${slug}.webp`;
    }
    return undefined;
  }
  // Portfolio: locale money-page card when generated, else the shared crop if it exists.
  if (pageKey.match(/^(en|fa|ar)\/portfolio\/(.+)$/)) {
    const m = pageKey.match(/^(en|fa|ar)\/portfolio\/(.+?)\/?$/);
    const lang = m[1];
    const slug = m[2];
    if (lang !== 'en' && fs.existsSync(`public/images/og/${lang}/portfolio/${slug}.webp`)) {
      return `/images/og/${lang}/portfolio/${slug}.webp`;
    }
    if (fs.existsSync(`public/images/og/portfolio/${slug}.webp`)) {
      return `/images/og/portfolio/${slug}.webp`;
    }
    return undefined;
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
    if (fs.existsSync('public/images/og-image.webp')) {
      return '/images/og-image.webp';
    }
    return undefined;
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

// Vite plugin to mirror public/_redirects in local dev server (npm run dev)
function devRedirectsPlugin() {
  return {
    name: 'dev-redirects',
    apply: 'serve',
    configureServer(server) {
      let redirectMap = new Map();
      try {
        const redirectsRaw = fs.readFileSync('public/_redirects', 'utf-8');
        for (const line of redirectsRaw.split('\n')) {
          const t = line.trim();
          if (!t || t.startsWith('#')) continue;
          const [src, dst] = t.split(/\s+/);
          if (src && dst) {
            redirectMap.set(src, dst);
            if (src.endsWith('/')) {
              redirectMap.set(src.slice(0, -1), dst);
            } else {
              redirectMap.set(`${src}/`, dst);
            }
          }
        }
      } catch {
        // public/_redirects not yet read
      }

      server.middlewares.use((req, res, next) => {
        const rawUrl = (req.url || '').split('?')[0];
        const target = redirectMap.get(rawUrl);
        if (target) {
          const search = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
          res.statusCode = 301;
          res.setHeader('Location', `${target}${search}`);
          res.end();
          return;
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  prefetch: false,
  build: {
    format: 'directory',
    // Inline stylesheets directly into <style> tags to eliminate the render-blocking
    // external CSS request (Layout.[hash].css), saving ~300ms on FCP/LCP.
    // Under Brotli transport encoding, combined HTML+CSS transfers in ~34 KiB
    // (10 KiB less than separate HTML and CSS transfers combined).
    inlineStylesheets: 'always',
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
    plugins: [tailwind(), devRedirectsPlugin()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
