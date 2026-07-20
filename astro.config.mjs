import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://webabc.ir',
  output: 'static',
  build: {
    format: 'directory',
  },
  experimental: {
    svgOptimizer: svgoOptimizer()
  },
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
