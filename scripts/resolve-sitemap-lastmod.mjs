import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const lastmodFile = path.join(root, 'src/generated/sitemap-lastmod.json');

let current = {};
if (fs.existsSync(lastmodFile)) {
  try {
    current = JSON.parse(fs.readFileSync(lastmodFile, 'utf8'));
  } catch (e) {
    current = {};
  }
}

const fallback = current._fallback || '2025-01-01T00:00:00.000Z';
const updated = {
  _generated: new Date().toISOString(),
  _fallback: fallback,
};

// Base static pages lastmod
const staticPages = [
  '',
  'about/',
  'about/ali-bakhtiari/',
  'contact/',
  'faq/',
  'privacy/',
  'blog/',
  'portfolio/',
  'services/',
  'service-areas/',
  'tools/',
];

const langs = ['en', 'fa', 'ar'];

langs.forEach((lang) => {
  staticPages.forEach((sp) => {
    const key = `${lang}/${sp}`;
    updated[key] = current[key] || '2026-08-07';
  });
});

// Helper to extract frontmatter date
function extractDate(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matchUpdated = content.match(/updatedDate:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/);
    if (matchUpdated) return matchUpdated[1];
    const matchDate = content.match(/date:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/);
    if (matchDate) return matchDate[1];
  } catch (e) {}
  return '2026-08-07';
}

// Blog posts
langs.forEach((lang) => {
  const dir = path.join(root, `src/content/blog/${lang}`);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((f) => {
      if (f.endsWith('.mdx')) {
        const slug = f.replace('.mdx', '');
        const date = extractDate(path.join(dir, f));
        updated[`${lang}/blog/${slug}/`] = date;
      }
    });
  }
});

// Portfolio
langs.forEach((lang) => {
  const dir = path.join(root, `src/content/portfolio/${lang}`);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((f) => {
      if (f.endsWith('.mdx')) {
        const slug = f.replace('.mdx', '');
        const date = extractDate(path.join(dir, f));
        updated[`${lang}/portfolio/${slug}/`] = date;
      }
    });
  }
});

// Services
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
langs.forEach((lang) => {
  services.forEach((s) => {
    updated[`${lang}/services/${s}/`] = '2026-08-18';
  });
});

// Service areas
const areas = ['dubai', 'riyadh', 'abu-dhabi', 'muscat', 'tehran', 'qazvin'];
langs.forEach((lang) => {
  areas.forEach((a) => {
    updated[`${lang}/service-areas/${a}/`] = '2026-08-18';
  });
});

// Tools
const toolsDir = path.join(root, 'src/pages/[lang]/tools');
if (fs.existsSync(toolsDir)) {
  const files = fs.readdirSync(toolsDir);
  files.forEach((f) => {
    if (f.endsWith('.astro') && f !== 'index.astro') {
      const toolSlug = f.replace('.astro', '');
      langs.forEach((lang) => {
        updated[`${lang}/tools/${toolSlug}/`] = '2026-08-07';
      });
    }
  });
}

// Write clean sitemap-lastmod.json
fs.writeFileSync(lastmodFile, JSON.stringify(updated, null, 2) + '\n');
console.log(`Generated sitemap-lastmod.json with ${Object.keys(updated).length} entries.`);
