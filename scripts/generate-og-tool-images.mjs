#!/usr/bin/env node
/**
 * Generate the per-tool Open Graph cards (ACTION-PLAN §4.5).
 *
 * Output: public/images/og/tools/<slug>.webp at 1200x630.
 * `scripts/generate-og-manifest.mjs` only registers a `tools/<slug>` entry when
 * that file exists, and `Layout.astro` falls back to /images/og-image.webp when
 * it does not — so an absent file degrades to a generic card rather than a 404.
 *
 * Why SVG + sharp rather than an AI image model or a runtime renderer:
 *   - the cards are typography, not illustration, so nothing is lost;
 *   - sharp is already a devDependency and is proven to rasterise SVG here;
 *   - output is committed, so the Cloudflare build never rasterises anything and
 *     ships zero bytes it did not already ship. No runtime or build cost.
 *
 * Content sources are the pages themselves, so the card can never drift from the
 * page it advertises:
 *   - title/description: the same `t(key, { fallback })` call the .astro page
 *     makes, resolved through src/i18n/get-dictionary.ts' namespace map;
 *   - category: schema.org category from src/config/tools.ts.
 *
 * Run: node scripts/generate-og-tool-images.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public/images/og/tools');
const W = 1200;
const H = 630;

/** Dark-theme tokens from src/styles/globals.css (.dark block). */
const C = {
  bg: '#030711',
  fg: '#F8FAFC',
  muted: '#A3B0C2',
  primary: '#3C83F6',
  primarySoft: '#5B9DFF',
  border: '#1F2A3D',
};

const FONT = "'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif";
const MONO = "'SF Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace";

const CATEGORY_LABEL = {
  BusinessApplication: 'Business tool',
  DeveloperApplication: 'Developer tool',
  DesignApplication: 'Design tool',
  UtilityApplication: 'Utility tool',
};

const PAD_X = 100;
const FRAME = 44;

/* ------------------------------------------------------------------ text metrics
 * SVG has no text wrapping, and we cannot measure font metrics from a static
 * generator without loading a shaping engine. This width model is deliberately
 * conservative (it over-estimates) so lines wrap early rather than overrun.      */

const NARROW = 'iIljtfr!.,;:\'"|()[]{} ';
const WIDE = 'mMW@%&';

function charWidth(ch, size) {
  if (NARROW.includes(ch)) return size * 0.3;
  if (WIDE.includes(ch)) return size * 0.86;
  if (ch >= 'A' && ch <= 'Z') return size * 0.66;
  if (ch === ' ') return size * 0.3;
  return size * 0.54;
}

function textWidth(str, size) {
  let w = 0;
  for (const ch of str) w += charWidth(ch, size);
  return w;
}

/** Greedy word wrap honouring a pixel budget. */
function wrap(str, size, maxWidth) {
  const words = String(str).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Largest size (from the ladder) whose wrapped result fits in maxLines. */
function fitTitle(title, maxWidth, maxLines) {
  for (const size of [78, 70, 62, 56, 50, 45]) {
    const lines = wrap(title, size, maxWidth);
    if (lines.length <= maxLines) return { size, lines };
  }
  const size = 45;
  return { size, lines: wrap(title, size, maxWidth).slice(0, maxLines) };
}

/**
 * Right-most painted pixel of the title text.
 *
 * The width model above is an estimate; the real answer depends on which font
 * the host resolved. Measuring the actual render lets us shrink until the line
 * provably fits instead of trusting metrics we cannot enumerate. Title glyphs
 * are the only near-white pixels in this band (description is muted grey, the
 * eyebrow and wordmark are blue), so a simple colour test isolates them.
 */
/** Rasterise at 2x for smooth glyphs, then normalise to the shipped size. */
async function renderPng(svg) {
  const hi = await sharp(Buffer.from(svg), { density: 144 }).png().toBuffer();
  return sharp(hi).resize(W, H, { fit: 'fill' }).png().toBuffer();
}

/**
 * Right-most painted pixel of the title text, measured on the shipped bitmap.
 *
 * The width model above is an estimate; the real answer depends on which font
 * the host resolved. Measuring the actual render lets us shrink until the line
 * provably fits instead of trusting metrics we cannot enumerate. Title glyphs
 * are the only near-white pixels in this band (description is muted grey, the
 * eyebrow and wordmark are blue), so a simple colour test isolates them.
 * Returns -1 when nothing is found, which callers must treat as failure — a
 * silent -1 would otherwise satisfy any "x <= limit" test.
 */
async function measureTitleExtent(png) {
  const { data, info } = await sharp(png)
    .extract({ left: 0, top: 200, width: W, height: 260 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, channels } = info;
  let maxX = -1;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] > 225 && data[i + 1] > 232 && data[i + 2] > 240) {
      const x = (i / channels) % width;
      if (x > maxX) maxX = x;
    }
  }
  return maxX;
}

/**
 * Render a card, shrinking the painted title until it provably fits.
 * Line breaks are chosen once at the nominal size and never re-chosen, so
 * shrinking can shorten lines but can never drop words from the title.
 */
async function renderFitting(tool) {
  const limit = 1100; // PAD_X + (W - 2*PAD_X): the title budget's right edge
  let last = { png: null, extent: -1, factor: 1 };
  for (let attempt = 0; attempt < 7; attempt++) {
    const factor = 1 - attempt * 0.04;
    const png = await renderPng(renderSvg(tool, factor));
    const extent = await measureTitleExtent(png);
    last = { png, extent, factor };
    if (extent >= 0 && extent <= limit) return { ...last, overflows: false };
  }
  return { ...last, overflows: true };
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------------ page sources */

/** Parse the `namespaces` map out of get-dictionary.ts (namespace -> file). */
function readNamespaces() {
  const src = fs.readFileSync(path.join(ROOT, 'src/i18n/get-dictionary.ts'), 'utf8');
  const map = new Map();
  for (const m of src.matchAll(/^\s{2}'?([\w-]+)'?:\s*'([^']+)'/gm)) {
    map.set(m[1], m[2]);
  }
  return map;
}

/** Resolve a dotted path (`a.b.c`) inside a nested object. */
function lookup(obj, dotted) {
  return dotted.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

/**
 * Reproduce the page's `const titleText = t('key', { fallback: '...' })`:
 * first the dictionary value, else the literal fallback.
 */
function resolveFromPage(pageSrc, varName, namespaces) {
  const re = new RegExp(
    `const ${varName}\\s*=\\s*t\\(\\s*'([^']+)'[\\s\\S]*?fallback:\\s*'([^']*)'`
  );
  const m = pageSrc.match(re);
  if (!m) return null;
  const [, key, fallback] = m;
  const dot = key.indexOf('.');
  const ns = key.slice(0, dot);
  const rest = key.slice(dot + 1);
  const file = namespaces.get(ns);
  if (file) {
    const jsonPath = path.join(ROOT, 'src/i18n/en', `${file}.json`);
    if (fs.existsSync(jsonPath)) {
      const value = lookup(JSON.parse(fs.readFileSync(jsonPath, 'utf8')), rest);
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
  }
  return fallback;
}

function readToolSources() {
  const config = fs.readFileSync(path.join(ROOT, 'src/config/tools.ts'), 'utf8');
  const namespaces = readNamespaces();
  const pagesDir = path.join(ROOT, 'src/pages/[lang]/tools');

  const entries = [];
  for (const m of config.matchAll(/^ {2}'([a-z0-9-]+)': \{([\s\S]*?)^ {2}\},?$/gm)) {
    const slug = m[1];
    const block = m[2];
    const cat = block.match(/category:\s*'([^']+)'/);
    const pagePath = path.join(pagesDir, `${slug}.astro`);
    if (!fs.existsSync(pagePath)) continue;
    const page = fs.readFileSync(pagePath, 'utf8');

    const title = resolveFromPage(page, 'titleText', namespaces);
    const description = resolveFromPage(page, 'descriptionText', namespaces);

    entries.push({
      slug,
      category: cat ? cat[1] : 'UtilityApplication',
      title: title || slug,
      description: description || '',
    });
  }
  return entries;
}

/* ------------------------------------------------------------------ rendering */

function renderSvg({ slug, category, title, description }, widthFactor = 1) {
  const maxTextW = W - PAD_X * 2;

  const eyebrow = CATEGORY_LABEL[category] || 'Web tool';
  // Break the lines at the nominal size, then paint them smaller. The words in
  // the title are therefore fixed; only their rendered width shrinks.
  const { size: fittedSize, lines: titleLines } = fitTitle(title, maxTextW, 2);
  const titleSize = Math.max(38, Math.round(fittedSize * widthFactor));
  const titleLineH = Math.round(titleSize * 1.14);
  const titleTop = 272; // baseline of the first title line

  const descSize = 28;
  const descLineH = 40;
  const descTop = titleTop + (titleLines.length - 1) * titleLineH + 54;
  const descLines = wrap(description, descSize, Math.round(maxTextW * 0.86)).slice(0, 2);

  // Anchor the trailing accent rule to the bottom so short cards still read full.
  const ruleY = 548;

  const titleNodes = titleLines
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${titleTop + i * titleLineH}" fill="${C.fg}" font-family="${FONT}" font-size="${titleSize}" font-weight="700">${esc(line)}</text>`
    )
    .join('\n  ');

  const descNodes = descLines
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${descTop + i * descLineH}" fill="${C.muted}" font-family="${FONT}" font-size="${descSize}" font-weight="400">${esc(line)}</text>`
    )
    .join('\n  ');

  const pillText = eyebrow.toUpperCase();
  const pillW = Math.ceil(textWidth(pillText, 21)) + 48;
  const pillY = 152;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.primary}" stop-opacity="1"/>
      <stop offset="1" stop-color="${C.primary}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.primary}" stop-opacity="0.26"/>
      <stop offset="1" stop-color="${C.primary}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.primarySoft}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${C.primarySoft}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="${C.border}" stroke-width="1" stroke-opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <ellipse cx="1010" cy="70" rx="540" ry="440" fill="url(#glowA)"/>
  <ellipse cx="90" cy="620" rx="440" ry="360" fill="url(#glowB)"/>
  <rect x="${FRAME}" y="${FRAME}" width="${W - FRAME * 2}" height="${H - FRAME * 2}" rx="18"
        fill="none" stroke="${C.border}" stroke-width="2" stroke-dasharray="11 9"/>

  <text x="${PAD_X}" y="104" fill="${C.primary}" font-family="${FONT}" font-size="27" font-weight="700">webabc.ir</text>
  <text x="${W - PAD_X}" y="104" fill="${C.muted}" font-family="${MONO}" font-size="23" text-anchor="end">/tools/${esc(slug)}</text>

  <rect x="${PAD_X}" y="${pillY}" width="${pillW}" height="46" rx="23" fill="${C.primary}" fill-opacity="0.13" stroke="${C.primary}" stroke-opacity="0.4"/>
  <text x="${PAD_X + 24}" y="${pillY + 31}" fill="${C.primary}" font-family="${FONT}" font-size="21" font-weight="700">${esc(pillText)}</text>

  ${titleNodes}
  ${descNodes}

  <rect x="${PAD_X}" y="${ruleY}" width="${maxTextW}" height="3" rx="1.5" fill="url(#rule)"/>
</svg>
`;
}

/* ------------------------------------------------------------------ main */

async function main() {
  const tools = readToolSources();
  if (tools.length === 0) {
    console.error('No tool entries parsed from src/config/tools.ts — refusing to write.');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const problems = [];
  for (const tool of tools) {
    const { png, extent, overflows } = await renderFitting(tool);
    const out = path.join(OUT_DIR, `${tool.slug}.webp`);
    await sharp(png).webp({ quality: 90 }).toFile(out);

    const meta = await sharp(out).metadata();
    const bytes = fs.statSync(out).size;
    if (meta.width !== W || meta.height !== H) {
      problems.push(`${tool.slug}: ${meta.width}x${meta.height}, expected ${W}x${H}`);
    }
    if (bytes < 12_000) {
      // A card this flat almost certainly means the font did not resolve and the
      // text never painted. Fail loudly rather than ship a blank social card.
      problems.push(`${tool.slug}: only ${bytes} bytes — text likely did not render`);
    }
    if (extent < 0) {
      problems.push(`${tool.slug}: no title pixels found — font did not render`);
    } else if (overflows) {
      problems.push(`${tool.slug}: title still overruns the frame (measured x=${extent})`);
    }
    console.log(
      `  ${tool.slug.padEnd(28)} ${String(bytes).padStart(7)} B  x=${String(extent).padStart(4)}  ${tool.title.slice(0, 42)}`
    );
  }

  console.log(`\nWrote ${tools.length} cards to public/images/og/tools/`);
  if (problems.length) {
    console.error('\nProblems:');
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
