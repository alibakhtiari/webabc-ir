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

// Ensure target dir exists
const outPath = path.join(root, 'src/generated/og-images.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated og-images.json with ${Object.keys(manifest).length} entries.`);
