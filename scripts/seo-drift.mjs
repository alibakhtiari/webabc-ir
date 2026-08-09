#!/usr/bin/env node
/**
 * SEO Drift Monitoring — capture baseline of SEO-critical elements
 * and detect regressions on subsequent runs.
 *
 * Usage:
 *   node scripts/seo-drift.mjs baseline   # write baseline to src/generated/seo-drift-baseline.json
 *   node scripts/seo-drift.mjs diff       # compare live pages vs baseline, exit 1 on drift
 *
 * Baseline fields per page:
 *   - title, description, h1, canonical, og:title, og:description, og:image
 *   - schema types present (Service, Article, FAQPage, WebApplication, etc.)
 *   - indexability (robots meta, x-robots-tag)
 *   - hreflang count
 *   - word count (content)
 *   - status code
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASELINE_FILE = join(ROOT, 'src', 'generated', 'seo-drift-baseline.json');
const SITE = 'https://webabc.ir';
const LANGS = ['en', 'fa', 'ar'];

async function ensureDir(p) {
  const { mkdir } = await import('node:fs/promises');
  await mkdir(p, { recursive: true });
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'WebABC-SEO-Drift/1.0 (+https://webabc.ir/)' },
      redirect: 'follow',
    });
    const html = await res.text();
    return { status: res.status, html, headers: res.headers };
  } catch (e) {
    return { status: 0, html: '', headers: new Headers(), error: e.message };
  }
}

function extractMeta(html) {
  const meta = {};
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Title
  meta.title = doc.querySelector('title')?.textContent?.trim() || '';

  // Meta description
  const desc = doc.querySelector('meta[name="description"]');
  meta.description = desc?.getAttribute('content')?.trim() || '';

  // H1
  const h1 = doc.querySelector('h1');
  meta.h1 = h1?.textContent?.trim() || '';

  // Canonical
  const canon = doc.querySelector('link[rel="canonical"]');
  meta.canonical = canon?.getAttribute('href')?.trim() || '';

  // OG
  meta.ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() || '';
  meta.ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() || '';
  meta.ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content')?.trim() || '';

  // Twitter
  meta.twitterCard = doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content')?.trim() || '';
  meta.twitterTitle = doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content')?.trim() || '';
  meta.twitterImage = doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content')?.trim() || '';

  // Schema types
  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  const types = new Set();
  for (const s of scripts) {
    try {
      const data = JSON.parse(s.textContent);
      const visit = (obj) => {
        if (obj && typeof obj === 'object') {
          if (obj['@type']) types.add(Array.isArray(obj['@type']) ? obj['@type'].join(',') : obj['@type']);
          for (const v of Object.values(obj)) visit(v);
        }
      };
      visit(data);
    } catch {}
  }
  meta.schemaTypes = [...types].sort();

  // Indexability
  const robots = doc.querySelector('meta[name="robots"]');
  meta.robots = robots?.getAttribute('content')?.trim() || '';
  // Hreflang
  const hreflangs = doc.querySelectorAll('link[rel="alternate"][hreflang]');
  meta.hreflangCount = hreflangs.length;

  // Word count (strip tags, count words)
  const text = doc.body?.textContent || '';
  meta.wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  // Hash for quick change detection
  meta.contentHash = createHash('sha256').update(text).digest('hex').slice(0, 16);

  return meta;
}

async function buildBaseline() {
  console.log('Building SEO drift baseline...');
  const baseline = { capturedAt: new Date().toISOString(), pages: {} };

  for (const lang of LANGS) {
    // Home, services index, tools index, blog index, portfolio index
    const urls = [
      `${SITE}/${lang}/`,
      `${SITE}/${lang}/services/`,
      `${SITE}/${lang}/tools/`,
      `${SITE}/${lang}/blog/`,
      `${SITE}/${lang}/portfolio/`,
      `${SITE}/${lang}/service-areas/`,
      `${SITE}/${lang}/contact/`,
    ];
    for (const url of urls) {
      const { status, html } = await fetchPage(url);
      if (status === 200 && html) {
        baseline.pages[url] = { ...extractMeta(html), status };
      } else {
        console.warn(`SKIP ${url} status ${status}`);
      }
    }
    // Blog posts - fetch from sitemap or known slugs
    // For simplicity, fetch sitemap to get all blog URLs
  }

  // Also fetch blog posts via sitemap
  try {
    const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
    const sitemapXml = await sitemapRes.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapXml, 'application/xml');
    const urls = xmlDoc.querySelectorAll('url > loc');
    for (const loc of urls) {
      const url = loc.textContent.trim();
      if (url.includes('/blog/') && !baseline.pages[url]) {
        const { status, html } = await fetchPage(url);
        if (status === 200 && html) {
          baseline.pages[url] = { ...extractMeta(html), status };
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch sitemap for blog URLs:', e.message);
  }

  await ensureDir(dirname(BASELINE_FILE));
  await writeFile(BASELINE_FILE, JSON.stringify(baseline, null, 2) + '\n', 'utf-8');
  console.log(`Baseline written: ${relative(ROOT, BASELINE_FILE)} (${Object.keys(baseline.pages).length} pages)`);
}

async function diffAgainstBaseline() {
  console.log('Checking for SEO drift...');
  let baseline;
  try {
    baseline = JSON.parse(await readFile(BASELINE_FILE, 'utf-8'));
  } catch {
    console.error('Baseline not found. Run "baseline" first.');
    process.exit(1);
  }

  let driftCount = 0;
  const driftDetails = [];

  for (const [url, base] of Object.entries(baseline.pages)) {
    const { status, html } = await fetchPage(url);
    if (status !== 200 || !html) {
      console.warn(`SKIP ${url} status ${status}`);
      continue;
    }
    const current = extractMeta(html);

    // Compare key fields
    const fields = ['title', 'description', 'h1', 'canonical', 'ogTitle', 'ogDescription', 'ogImage', 'robots', 'schemaTypes'];
    const diffs = [];
    for (const f of fields) {
      const b = base[f];
      const c = current[f];
      const bStr = Array.isArray(b) ? b.join('|') : String(b);
      const cStr = Array.isArray(c) ? c.join('|') : String(c);
      if (bStr !== cStr && bStr && cStr) {
        diffs.push({ field: f, baseline: bStr, current: cStr });
      }
    }

    if (diffs.length > 0) {
      driftCount++;
      driftDetails.push({ url, diffs });
    }
  }

  if (driftCount > 0) {
    console.error(`\n❌ SEO DRIFT DETECTED on ${driftCount} page(s):`);
    for (const d of driftDetails) {
      console.error(`\n  ${d.url}`);
      for (const df of d.diffs) {
        console.error(`    ${df.field}: "${df.baseline}" -> "${df.current}"`);
      }
    }
    process.exit(1);
  } else {
    console.log('\n✅ No SEO drift detected.');
  }
}

async function main() {
  const cmd = process.argv[2];
  if (cmd === 'baseline') await buildBaseline();
  else if (cmd === 'diff') await diffAgainstBaseline();
  else {
    console.log('Usage: node scripts/seo-drift.mjs [baseline|diff]');
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });