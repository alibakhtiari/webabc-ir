#!/usr/bin/env node
/**
 * Assert that on-page hreflang == sitemap hreflang.
 *
 *   node scripts/verify-hreflang-parity.mjs   (run automatically after `astro build`)
 *
 * The two are implemented independently and can silently drift:
 *
 *   on-page  src/layouts/Layout.astro      <link rel="alternate" hreflang=…>
 *   sitemap  astro.config.mjs              <xhtml:link rel="alternate" hreflang=…>
 *
 * Layout.astro hardcodes the three language codes and x-default target, while the
 * sitemap hook derives them from LANGS / LANG_HREF — edit one without the other
 * and Google is told two different language relationships for the same page
 * (ACTION-PLAN §4.8). This reads what the build actually emitted and fails the
 * build when they disagree.
 *
 * Exit 0 = every URL agrees; exit 1 = drift, with each mismatch listed.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `astro build` first.');
  process.exit(1);
}

/** Every <url> block of every sitemap except the index. */
function readSitemapEntries() {
  const files = fs
    .readdirSync(DIST)
    .filter((f) => f.startsWith('sitemap') && f.endsWith('.xml') && !f.includes('index'));

  const out = new Map(); // canonical url -> Map(hreflang -> href)
  for (const f of files) {
    const xml = fs.readFileSync(path.join(DIST, f), 'utf-8');
    for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
      const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1];
      if (!loc) continue;
      const links = new Map();
      for (const m of block.matchAll(/<xhtml:link\s[^>]*\/>/g)) {
        const hreflang = /hreflang="([^"]+)"/.exec(m[0])?.[1];
        const href = /href="([^"]+)"/.exec(m[0])?.[1];
        if (hreflang && href) links.set(hreflang, href);
      }
      out.set(loc, links);
    }
  }
  return out;
}

/** dist url -> built HTML path. */
function toPath(url) {
  const rel = url.replace(/^https?:\/\/[^/]+/, '');
  const p = rel.endsWith('/') ? `${rel}index.html` : `${rel}/index.html`;
  return path.join(DIST, p);
}

function readPageHreflang(url) {
  const file = toPath(url);
  if (!fs.existsSync(file)) return { missing: true, links: new Map() };
  const html = fs.readFileSync(file, 'utf-8');
  const links = new Map();
  for (const m of html.matchAll(/<link\s[^>]*rel="alternate"[^>]*>/g)) {
    if (!/hreflang=/.test(m[0])) continue;
    const hreflang = /hreflang="([^"]+)"/.exec(m[0])?.[1];
    const href = /href="([^"]+)"/.exec(m[0])?.[1];
    if (hreflang && href) links.set(hreflang, href);
  }
  return { missing: false, links };
}

const sitemap = readSitemapEntries();
if (sitemap.size === 0) {
  console.error('No sitemap entries parsed — nothing to verify.');
  process.exit(1);
}

const problems = [];
let checked = 0;

for (const [loc, want] of sitemap) {
  const { missing, links: have } = readPageHreflang(loc);
  checked++;

  if (missing) {
    problems.push(`${loc}\n    sitemap entry has no built HTML at ${toPath(loc)}`);
    continue;
  }

  if (want.size === 0) {
    problems.push(`${loc}\n    sitemap declares no hreflang alternates`);
    continue;
  }
  if (have.size === 0) {
    problems.push(`${loc}\n    sitemap declares [${[...want.keys()]}] but the page emits no hreflang (noindex page in the sitemap?)`);
    continue;
  }

  const diffs = [];
  for (const [lang, url] of want) {
    if (!have.has(lang)) diffs.push(`missing on page: hreflang="${lang}"`);
    else if (have.get(lang) !== url) {
      diffs.push(`hreflang="${lang}"\n        sitemap: ${url}\n        page   : ${have.get(lang)}`);
    }
  }
  for (const lang of have.keys()) {
    if (!want.has(lang)) diffs.push(`on page but not in sitemap: hreflang="${lang}"`);
  }

  if (diffs.length) problems.push(`${loc}\n    ${diffs.join('\n    ')}`);
}

if (problems.length) {
  console.error(`\nhreflang parity FAILED — ${problems.length} of ${checked} URLs disagree:\n`);
  for (const p of problems.slice(0, 25)) console.error(`  ${p}`);
  if (problems.length > 25) console.error(`  … and ${problems.length - 25} more`);
  console.error(
    '\nOn-page hreflang (Layout.astro) and sitemap hreflang (astro.config.mjs) are\n' +
      'implemented twice. Make them agree before building.\n'
  );
  process.exit(1);
}

console.log(`hreflang parity: ${checked} URLs, on-page == sitemap`);
