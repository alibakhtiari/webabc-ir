import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

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

// Helper to look up latest authored date from git commit history
function getGitDate(filePaths, fallbackDate) {
  try {
    const validPaths = (Array.isArray(filePaths) ? filePaths : [filePaths]).filter((p) =>
      fs.existsSync(path.join(root, p))
    );
    if (validPaths.length === 0) return fallbackDate;
    const cmd = `git log -1 --format="%cs" -- ${validPaths.map((p) => `"${p}"`).join(' ')}`;
    const stdout = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (stdout && /^\d{4}-\d{2}-\d{2}$/.test(stdout)) {
      return stdout;
    }
  } catch (e) {}
  return fallbackDate;
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
  'consultation/',
  'industrial-web-design/',
  'export-web-design/',
  'enterprise-automation/',
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
const serviceGitDate = getGitDate(
  ['src/pages/[lang]/services/[slug].astro', 'src/config/services.ts'],
  '2026-08-18'
);
langs.forEach((lang) => {
  services.forEach((s) => {
    const key = `${lang}/services/${s}/`;
    updated[key] = current[key] && current[key] > serviceGitDate ? current[key] : serviceGitDate;
  });
});

// Service areas
const areas = ['dubai', 'riyadh', 'abu-dhabi', 'muscat', 'tehran', 'qazvin'];
const areaGitDate = getGitDate(
  ['src/pages/[lang]/service-areas/[slug].astro'],
  '2026-08-18'
);
langs.forEach((lang) => {
  areas.forEach((a) => {
    const key = `${lang}/service-areas/${a}/`;
    updated[key] = current[key] && current[key] > areaGitDate ? current[key] : areaGitDate;
  });
});

// Tools
const toolsDir = path.join(root, 'src/pages/[lang]/tools');
if (fs.existsSync(toolsDir)) {
  const files = fs.readdirSync(toolsDir);
  files.forEach((f) => {
    if (f.endsWith('.astro') && f !== 'index.astro') {
      const toolSlug = f.replace('.astro', '');
      const toolGitDate = getGitDate(
        [`src/pages/[lang]/tools/${f}`, `src/config/tools.ts`],
        '2026-08-07'
      );
      langs.forEach((lang) => {
        const key = `${lang}/tools/${toolSlug}/`;
        updated[key] = current[key] && current[key] > toolGitDate ? current[key] : toolGitDate;
      });
    }
  });
}

// Write clean sitemap-lastmod.json
fs.writeFileSync(lastmodFile, JSON.stringify(updated, null, 2) + '\n');
console.log(`Generated sitemap-lastmod.json with ${Object.keys(updated).length} entries.`);
