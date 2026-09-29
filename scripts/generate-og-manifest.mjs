import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = {};

// 1. Services
const services = [
  'seo',
  'local-seo',
  'web-development',
  'wordpress-development',
  'web-design',
  'content-creation',
  'link-building',
  'speed-optimization',
  'ui-ux-audit',
  'website-maintenance',
  'ecommerce',
];

services.forEach((s) => {
  const fileKey = s === 'wordpress-development' ? 'wordpress' : s === 'ecommerce' ? 'web-development' : s;
  if (fs.existsSync(path.join(root, `public/images/og/services/${fileKey}.webp`))) {
    manifest[`services/${s}`] = `/images/og/services/${fileKey}.webp`;
  }
});

// 2. Service Areas
const areas = ['dubai', 'riyadh', 'abu-dhabi', 'muscat', 'tehran', 'qazvin'];
areas.forEach((a) => {
  if (fs.existsSync(path.join(root, `public/images/og/service-areas/${a}.webp`))) {
    manifest[`service-areas/${a}`] = `/images/og/service-areas/${a}.webp`;
  }
});

// 3. Portfolio
const portfolioDir = path.join(root, 'public/images/portfolio');
if (fs.existsSync(portfolioDir)) {
  const files = fs.readdirSync(portfolioDir);
  files.forEach((f) => {
    if (f.endsWith('.webp') && !f.includes('-1536') && !f.includes('-1920')) {
      const slug = f.replace('.webp', '');
      manifest[`portfolio/${slug}`] = `/images/portfolio/${f}`;
    }
  });
}

// 4. Blog Posts
const blogDir = path.join(root, 'src/content/blog/en');
if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  files.forEach((f) => {
    if (f.endsWith('.mdx')) {
      const slug = f.replace('.mdx', '');
      if (fs.existsSync(path.join(root, `public/images/blog/${slug}.webp`))) {
        manifest[`blog/${slug}`] = `/images/blog/${slug}.webp`;
      } else if (fs.existsSync(path.join(root, `public/images/og/blog/${slug}.webp`))) {
        manifest[`blog/${slug}`] = `/images/og/blog/${slug}.webp`;
      }
    }
  });
}

// 5. Tools — only when per-tool art exists. Layout.astro resolves og:image by
// reading this manifest with slug "tools/<tool>", so an absent file falls through
// to /images/og-image.webp instead of a broken URL. Adding public/images/og/tools/
// art is all that is needed for the card to appear (ACTION-PLAN §4.5).
const toolsSrc = path.join(root, 'src/config/tools.ts');
if (fs.existsSync(toolsSrc)) {
  const toolSlugs = [...fs.readFileSync(toolsSrc, 'utf-8').matchAll(/^  '([a-z0-9-]+)': \{/gm)].map(
    (m) => m[1]
  );
  for (const t of toolSlugs) {
    if (fs.existsSync(path.join(root, `public/images/og/tools/${t}.webp`))) {
      manifest[`tools/${t}`] = `/images/og/tools/${t}.webp`;
    }
  }
}

// 6. Localized money-page cards (fa/ar batch 1: home, tools, services,
// top-4 portfolio) at public/images/og/{lang}/... Manifest keys are
// locale-prefixed (`fa/tools/<slug>`); Layout.astro tries `${lang}/${slug}`
// before the locale-blind key, so English keeps its existing art.
for (const lang of ['fa', 'ar']) {
  const homeFile = `public/images/og/${lang}/home.webp`;
  if (fs.existsSync(path.join(root, homeFile))) {
    manifest[`${lang}/home`] = `/images/og/${lang}/home.webp`;
  }
  for (const cls of ['tools', 'services', 'portfolio']) {
    const dir = path.join(root, `public/images/og/${lang}/${cls}`);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.webp')) {
        manifest[`${lang}/${cls}/${f.replace('.webp', '')}`] = `/images/og/${lang}/${cls}/${f}`;
      }
    }
  }
}

// Ensure target dir exists
const outPath = path.join(root, 'src/generated/og-images.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated og-images.json with ${Object.keys(manifest).length} entries.`);
