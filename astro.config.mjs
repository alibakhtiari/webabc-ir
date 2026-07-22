import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://webabc.ir',
  output: 'static',
  prefetch: true,
  build: {
    format: 'directory',
    // Inline the global stylesheet instead of a render-blocking <link> request —
    // it's small and needed on every page, so a critical round-trip costs more than the
    // (uncached) duplication. See PageSpeed "render-blocking requests" finding on Layout.css.
    inlineStylesheets: 'always',
  },
  experimental: {
    svgOptimizer: svgoOptimizer()
  },
  integrations: [
    sitemap({
      // Root `/` only exists as a locale-redirect target (see functions/_middleware.ts),
      // it has no content of its own — exclude it so it isn't indexed as an orphan URL.
      filter: (page) => page !== 'https://webabc.ir/',
      // Canonical tags site-wide (see Layout.astro) never use a trailing slash;
      // strip it here so the sitemap matches what's actually crawled/canonicalized.
      serialize: (item) => {
        if (item.url !== 'https://webabc.ir/' && item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1);
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
