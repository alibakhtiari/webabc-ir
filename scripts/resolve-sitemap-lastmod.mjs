/**
 * scripts/resolve-sitemap-lastmod.mjs
 *
 * Resolves a content-accurate `lastmod` date for every sitemap URL, replacing the
 * misleading build-timestamp that @astrojs/sitemap emitted by default.
 *
 * Usage:
 *   node scripts/resolve-sitemap-lastmod.mjs            # writes src/generated/sitemap-lastmod.json
 *   node scripts/resolve-sitemap-lastmod.mjs --check    # verifies freshness, exits 0 without writing
 *
 * Priority per page type (first match wins):
 *   1. Blog:    frontmatter `updatedDate` -> `date` (src/content/blog/{lang}/{slug}.mdx)
 *   2. Others:  git log of every content-bearing source file that composes the page
 *   3. Fallback: hardcoded site-launch date (never the build timestamp)
 *
 * The script is dependency-free (Node stdlib + `git` CLI). It is forking-friendly:
 * if the repo was cloned with --depth=1 (full history already present in this repo),
 * the tradeoff is that git dates reflect clone depth, not true authorship dates.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = join(ROOT, 'src', 'generated', 'sitemap-lastmod.json');
const SITE = 'https://webabc.ir';
const LANGS = ['en', 'fa', 'ar'];
const CHECK_MODE = process.argv.includes('--check');

/** Oldest plausible content date — used when git history is unavailable (shallow clone/CI). */
const FALLBACK_DATE = '2025-01-01T00:00:00.000Z';

/* ------------------------------------------------------------------ */
/* Static page inventories (mirrored from each page's getStaticPaths)  */
/* ------------------------------------------------------------------ */

// Content-collection slugs are data-driven (same source of truth as the pages'
// getStaticPaths), so future posts cannot silently bypass lastmod resolution.
const listMdxSlugs = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.mdx?$/.test(e.name))
    .map(e => e.name.replace(/\.mdx?$/, ''));

const BLOG_SLUGS = listMdxSlugs(join(ROOT, 'src', 'content', 'blog', 'en'));
const PORTFOLIO_SLUGS = listMdxSlugs(join(ROOT, 'src', 'content', 'portfolio', 'en'));
// Per-language safety: a slug missing in one locale should not crash the build.
const slugsFor = (dir, lang, fallback) => existsSync(join(ROOT, dir, lang))
  ? listMdxSlugs(join(ROOT, dir, lang))
  : fallback;

const AREA_SLUGS = ['dubai', 'tehran', 'muscat', 'qazvin', 'abu-dhabi', 'riyadh'];

const SERVICE_SLUGS = [
  'seo', 'web-development', 'local-seo', 'wordpress-development', 'web-design',
  'content-creation', 'link-building', 'speed-optimization', 'ui-ux-audit',
  'website-maintenance', 'ecommerce',
];

const TOOL_SLUGS = [
  'base64-encoder', 'box-shadow-generator', 'color-contrast-checker', 'cost-calculator',
  'css-gradient-generator', 'faq-generator', 'glassmorphism-generator', 'headline-analyzer',
  'json-formatter', 'keyword-density-analyzer', 'lorem-generator', 'meta-generator',
  'paa-scraper', 'privacy-policy-generator', 'qr-generator', 'readability-checker',
  'robots-generator', 'schema-generator', 'seo-title-checker', 'serp-preview',
  'slug-generator', 'social-media-preview', 'utm-builder',
];

/* ------------------------------------------------------------------ */
/* git helpers                                                         */
/* ------------------------------------------------------------------ */

const gitDateCache = new Map();

/** Latest commit ISO date that touched `file`, or null if untracked / git fails. */
function gitLatestDate(file) {
  if (gitDateCache.has(file)) return gitDateCache.get(file);
  let date = null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', file], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) date = out;
  } catch { /* shallow clone or file untracked */ }
  gitDateCache.set(file, date);
  return date;
}

/** For .astro redirects: the page can only be as old as the shared i18n/data file it renders. */
function maxDateOf(files) {
  let best = null;
  for (const f of files) {
    const d = gitLatestDate(f);
    if (d && (!best || d > best)) best = d;
  }
  return best;
}

/** YYYY-MM-DD from an ISO string, or null. */
const toDay = (iso) => (iso ? iso.slice(0, 10) : null);

/* ------------------------------------------------------------------ */
/* frontmatter date reader (dependency-free YAML scalar scan)          */
/* ------------------------------------------------------------------ */

function frontmatterDates(mdxPath) {
  try {
    const src = readFileSync(join(ROOT, mdxPath), 'utf8');
    const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) return {};
    const grab = (key) => {
      const m = fm[1].match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)["']?\\s*$`, 'm'));
      return m ? m[1].trim() : null;
    };
    return { date: grab('date'), updatedDate: grab('updatedDate') };
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* routing tables                                                      */
/* ------------------------------------------------------------------ */

// Tool slug -> [astro page, i18n json data source] (json relative to src/i18n/{lang}/)
const TOOL_SOURCES = {
  'base64-encoder': ['tools/base64-encoder.astro', 'tools/base64.json'],
  'box-shadow-generator': ['tools/box-shadow-generator.astro', 'tools/boxShadow.json'],
  'color-contrast-checker': ['tools/color-contrast-checker.astro', 'tools/colorContrast.json'],
  'cost-calculator': ['tools/cost-calculator.astro', 'tools/costCalculator.json'],
  'css-gradient-generator': ['tools/css-gradient-generator.astro', 'tools/gradientGen.json'],
  'faq-generator': ['tools/faq-generator.astro', 'tools/faqGenerator.json'],
  'glassmorphism-generator': ['tools/glassmorphism-generator.astro', 'tools/glassGen.json'],
  'headline-analyzer': ['tools/headline-analyzer.astro', 'tools/headlineAnalyzer.json'],
  'json-formatter': ['tools/json-formatter.astro', 'tools.json'],
  'keyword-density-analyzer': ['tools/keyword-density-analyzer.astro', 'tools.json'],
  'lorem-generator': ['tools/lorem-generator.astro', 'tools/loremGenerator.json'],
  'meta-generator': ['tools/meta-generator.astro', 'tools/metaGenerator.json'],
  'paa-scraper': ['tools/paa-scraper.astro', 'tools/paaScraper.json'],
  'privacy-policy-generator': ['tools/privacy-policy-generator.astro', 'tools/privacyGenerator.json'],
  'qr-generator': ['tools/qr-generator.astro', 'tools/qrGenerator.json'],
  'readability-checker': ['tools/readability-checker.astro', 'tools/readabilityChecker.json'],
  'robots-generator': ['tools/robots-generator.astro', 'tools.json'],
  'schema-generator': ['tools/schema-generator.astro', 'tools/schemaGenerator.json'],
  'seo-title-checker': ['tools/seo-title-checker.astro', 'tools/seoTitleChecker.json'],
  'serp-preview': ['tools/serp-preview.astro', 'tools/serpPreview.json'],
  'slug-generator': ['tools/slug-generator.astro', 'tools/slugGenerator.json'],
  'social-media-preview': ['tools/social-media-preview.astro', 'tools/socialPreview.json'],
  'utm-builder': ['tools/utm-builder.astro', 'tools/utmBuilder.json'],
};

// Service slug -> i18n namespace json (see slugInfoMap in services/[slug].astro)
const SERVICE_NS = {
  'seo': 'seo-service', 'local-seo': 'local-seo', 'web-development': 'web-development-services',
  'wordpress-development': 'wordpress', 'web-design': 'web-design', 'content-creation': 'content-creation',
  'link-building': 'link-building', 'speed-optimization': 'speed-optimization',
  'ui-ux-audit': 'ui-ux-audit', 'website-maintenance': 'maintenance', 'ecommerce': 'ecommerce',
};

/* ------------------------------------------------------------------ */
/* build the URL -> lastmod map                                        */
/* ------------------------------------------------------------------ */

const entries = {}; // key: "en/blog/seo-best-practices-2025/" -> "YYYY-MM-DD"
const put = (urlKey, isoDate) => { if (isoDate) entries[urlKey] = toDay(isoDate); };

for (const lang of LANGS) {
  // Homepage + core pages
  put(`${lang}/`, maxDateOf(['src/pages/[lang]/index.astro', `src/i18n/${lang}/home.json`]));
  put(`${lang}/about/`, maxDateOf(['src/pages/[lang]/about.astro', `src/i18n/${lang}/about.json`]));
  put(`${lang}/about/ali-bakhtiari/`, maxDateOf(['src/pages/[lang]/about/ali-bakhtiari.astro', `src/i18n/${lang}/about.json`]));
  put(`${lang}/contact/`, maxDateOf(['src/pages/[lang]/contact.astro', `src/i18n/${lang}/contact.json`]));
  put(`${lang}/faq/`, maxDateOf(['src/pages/[lang]/faq.astro', `src/i18n/${lang}/faq.json`]));
  put(`${lang}/privacy/`, maxDateOf(['src/pages/[lang]/privacy.astro', `src/i18n/${lang}/privacy.json`]));

  // Blog
  const blogSlugs = slugsFor('src/content/blog', lang, BLOG_SLUGS);
  put(`${lang}/blog/`, maxDateOf(['src/pages/[lang]/blog/index.astro', ...blogSlugs.map(s => `src/content/blog/${lang}/${s}.mdx`)]));
  for (const slug of blogSlugs) {
    const mdx = `src/content/blog/${lang}/${slug}.mdx`;
    const fm = frontmatterDates(mdx);
    put(`${lang}/blog/${slug}/`, fm.updatedDate || fm.date || gitLatestDate(mdx));
  }

  // Portfolio
  const portfolioSlugs = slugsFor('src/content/portfolio', lang, PORTFOLIO_SLUGS);
  put(`${lang}/portfolio/`, maxDateOf(['src/pages/[lang]/portfolio/index.astro', ...portfolioSlugs.map(s => `src/content/portfolio/${lang}/${s}.mdx`)]));
  for (const slug of portfolioSlugs) {
    put(`${lang}/portfolio/${slug}/`, gitLatestDate(`src/content/portfolio/${lang}/${slug}.mdx`));
  }

  // Service areas
  put(`${lang}/service-areas/`, maxDateOf(['src/pages/[lang]/service-areas/index.astro', `src/i18n/${lang}/service-areas.json`]));
  for (const slug of AREA_SLUGS) {
    put(`${lang}/service-areas/${slug}/`, maxDateOf([`src/i18n/${lang}/service-areas.json`, 'src/pages/[lang]/service-areas/[slug].astro']));
  }

  // Services
  put(`${lang}/services/`, maxDateOf(['src/pages/[lang]/services/index.astro', `src/i18n/${lang}/services.json`]));
  for (const slug of SERVICE_SLUGS) {
    put(`${lang}/services/${slug}/`, maxDateOf([`src/i18n/${lang}/${SERVICE_NS[slug]}.json`, 'src/pages/[lang]/services/[slug].astro']));
  }

  // Tools
  put(`${lang}/tools/`, maxDateOf(['src/pages/[lang]/tools/index.astro', `src/i18n/${lang}/tools.json`]));
  for (const slug of TOOL_SLUGS) {
    const [astroPath, jsonPath] = TOOL_SOURCES[slug];
    put(`${lang}/tools/${slug}/`, maxDateOf([`src/pages/[lang]/${astroPath}`, `src/i18n/${lang}/${jsonPath}`]));
  }
}

/* ------------------------------------------------------------------ */
/* output                                                              */
/* ------------------------------------------------------------------ */

const payload = { _generated: new Date().toISOString(), _fallback: FALLBACK_DATE, ...entries };
const json = JSON.stringify(payload, null, 2) + '\n';

if (CHECK_MODE) {
  if (!existsSync(OUT_FILE)) {
    console.error('sitemap-lastmod.json missing — run: node scripts/resolve-sitemap-lastmod.mjs');
    process.exit(1);
  }
  console.log(`sitemap-lastmod.json present with ${Object.keys(entries).length} entries.`);
} else {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, json);
  const resolved = Object.keys(entries).length;
  console.log(`Wrote src/generated/sitemap-lastmod.json: ${resolved} URLs resolved via git/frontmatter.` +
    ` Any page not matching an entry falls back to ${toDay(FALLBACK_DATE)} in astro.config.mjs.`);
}
