import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://webabc.ir',
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
    svgOptimizer: svgoOptimizer()
  },
  integrations: [
    sitemap({
      // Root `/` and 404 pages are excluded from index
      filter: (page) => page !== 'https://webabc.ir/' && !page.includes('/404'),
      serialize: (item) => {
        if (item.url !== 'https://webabc.ir/' && !item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }
        item.lastmod = new Date().toISOString();
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
