#!/usr/bin/env node
/**
 * Generate fa/ar Open Graph cards for the money pages (homepage, services,
 * tools, top-4 portfolio) — the site-wide OG localisation batch 1.
 *
 * Output: public/images/og/{fa,ar}/{home.webp,tools/<slug>.webp,
 *   services/<slug>.webp,portfolio/<slug>.webp} at 1200x630.
 *
 * Same contract as scripts/generate-og-tool-images.mjs (typography cards via
 * hand-authored SVG + the sharp already in devDependencies — no image model,
 * no runtime cost; output committed), mirrored for RTL:
 *   - wordmark/path/pill/title/description right-aligned, gradients mirrored;
 *   - IRANYekanXFaNum (assets/og-fonts, TTF) via a runtime fonts.conf with an
 *     absolute dir, so no host font installation is needed for reproducible
 *     builds — FONTCONFIG_FILE is set before sharp ever touches fontconfig;
 *   - content pulled from the same per-locale sources the pages render, so a
 *     card cannot drift from its page (tool/service t() keys, portfolio
 *     frontmatter, home.json).
 *
 * Run: node scripts/generate-og-locale-images.mjs [fa|ar]  (default: both)
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/* Repo-local fontconfig: absolute dir written to a temp conf so generation is
 * reproducible on any host without installing fonts system-wide. */
const ROOT = process.cwd();
const FONTS_DIR = path.join(ROOT, 'assets/og-fonts');
const FC_CONF = path.join(os.tmpdir(), `webabc-og-fonts-${process.pid}.conf`);
fs.writeFileSync(
  FC_CONF,
  `<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig><dir>${FONTS_DIR}</dir></fontconfig>\n`
);
process.env.FONTCONFIG_FILE = FC_CONF;

const { default: sharp } = await import('sharp');

const OUT_ROOT = path.join(ROOT, 'public/images/og');
const W = 1200;
const H = 630;

/** Dark-theme tokens shared with the EN tool cards. */
const C = {
  bg: '#030711',
  fg: '#F8FAFC',
  muted: '#A3B0C2',
  primary: '#3C83F6',
  primarySoft: '#5B9DFF',
  border: '#1F2A3D',
};

const FONT = "'IRANYekanXFaNum', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const TOOL_CATEGORY = {
  fa: {
    BusinessApplication: 'ابزار کسب‌وکار',
    DeveloperApplication: 'ابزار توسعه‌دهنده',
    DesignApplication: 'ابزار طراحی',
    UtilityApplication: 'ابزار کاربردی',
  },
  ar: {
    BusinessApplication: 'أداة أعمال',
    DeveloperApplication: 'أداة للمطورين',
    DesignApplication: 'أداة تصميم',
    UtilityApplication: 'أداة مساعدة',
  },
};

const EYEBROW = {
  services: { fa: 'خدمات', ar: 'خدمات' },
  portfolio: { fa: 'مطالعه موردی', ar: 'دراسة حالة' },
  home: { fa: 'وب اِی‌بی‌سی', ar: 'ويب إيه بي سي' },
};

const PATH_LABEL = {
  tools: (lang, slug) => `/${lang}/tools/${slug}/`,
  services: (lang, slug) => `/${lang}/services/${slug}/`,
  portfolio: (lang, slug) => `/${lang}/portfolio/${slug}/`,
  home: (lang) => `/${lang}/`,
};

const PAD_X = 100;
const FRAME = 44;
const RIGHT = W - PAD_X; // 1100 — the RTL text edge
const ARABIC = /[؀-ۿ]/;

/* ------------------------------------------------------------------ text model
 * Conservative width estimates (over-estimate wraps early). Arabic-script
 * glyphs average ~0.5em; 0.62 keeps every line inside the frame even when the
 * host resolves fallback metrics. shrunk, never re-wrapped. */

const NARROW = 'iIljtfr!.,;:\'"|()[]{} ';

function charWidth(ch, size) {
  if (ARABIC.test(ch)) return size * 0.62;
  if (NARROW.includes(ch)) return size * 0.3;
  if (ch === ' ') return size * 0.3;
  if (ch >= 'A' && ch <= 'Z') return size * 0.66;
  if ('mMW@%&'.includes(ch)) return size * 0.86;
  return size * 0.54;
}

function textWidth(str, size) {
  let w = 0;
  for (const ch of String(str)) w += charWidth(ch, size);
  return w;
}

/** Em dash / en dash have no IRANYekanXFaNum glyph (verified via fc charset);
 * a hyphen keeps the cadence without tofu. Applied to card text only. */
function sanitize(str) {
  return String(str).replace(/[—–]/g, '-');
}

function wrap(str, size, maxWidth) {
  const words = sanitize(str).split(/\s+/).filter(Boolean);
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

function fitLines(text, sizes, maxWidth, maxLines) {
  for (const size of sizes) {
    const lines = wrap(text, size, maxWidth);
    if (lines.length <= maxLines) return { size, lines };
  }
  const size = sizes[sizes.length - 1];
  return { size, lines: wrap(text, size, maxWidth).slice(0, maxLines) };
}

/* ------------------------------------------------------------------ rendering */

async function renderPng(svg) {
  const hi = await sharp(Buffer.from(svg), { density: 144 }).png().toBuffer();
  return sharp(hi).resize(W, H, { fit: 'fill' }).png().toBuffer();
}

/**
 * Left-most painted pixel of near-white title glyphs (titles are right
 * anchored, so overrun escapes toward the left edge). Mirrors the EN
 * measureTitleExtent guard: -1 means nothing painted and must fail loudly.
 */
async function measureTitleMinX(png) {
  const { data, info } = await sharp(png)
    .extract({ left: 0, top: 200, width: W, height: 260 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, channels } = info;
  let minX = -1;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] > 225 && data[i + 1] > 232 && data[i + 2] > 240) {
      const x = (i / channels) % width;
      if (minX < 0 || x < minX) minX = x;
    }
  }
  return minX;
}

/** Left-most muted-grey pixel in the description band — same escape check. */
async function measureDescMinX(png, top, height) {
  const { data, info } = await sharp(png)
    .extract({ left: 0, top, width: W, height })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, channels } = info;
  let minX = -1;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 150 && r < 178 && g > 164 && g < 192 && b > 184 && b < 208) {
      const x = (i / channels) % width;
      if (minX < 0 || x < minX) minX = x;
    }
  }
  return minX;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSvg({ pathLabel, eyebrow, title, description }, widthFactor = 1) {
  const maxTextW = W - PAD_X * 2;

  const titleFit = fitLines(title, [78, 70, 62, 56, 50, 45], maxTextW, 2);
  const titleSize = Math.max(38, Math.round(titleFit.size * widthFactor));
  const titleLineH = Math.round(titleSize * 1.18);
  const titleTop = 272;

  const descFit = fitLines(description, [28, 26, 24, 22], Math.round(maxTextW * 0.86), 2);
  const descSize = descFit.size;
  const descLineH = Math.round(descSize * 1.45);
  const descTop = titleTop + (titleFit.lines.length - 1) * titleLineH + 54;
  const descBandH = descFit.lines.length * descLineH + 8;

  const ruleY = 548;

  const titleNodes = titleFit.lines
    .map(
      (line, i) =>
        `<text x="${RIGHT}" y="${titleTop + i * titleLineH}" fill="${C.fg}" font-family="${FONT}" font-size="${titleSize}" font-weight="700" text-anchor="end">${esc(line)}</text>`
    )
    .join('\n  ');

  const descNodes = descFit.lines
    .map(
      (line, i) =>
        `<text x="${RIGHT}" y="${descTop + i * descLineH}" fill="${C.muted}" font-family="${FONT}" font-size="${descSize}" font-weight="400" text-anchor="end">${esc(line)}</text>`
    )
    .join('\n  ');

  const pillText = eyebrow;
  const pillW = Math.ceil(textWidth(pillText, 21)) + 56;
  const pillX = RIGHT - pillW;
  const pillY = 152;

  return {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="rule" x1="1" y1="0" x2="0" y2="0">
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
  <ellipse cx="190" cy="70" rx="540" ry="440" fill="url(#glowA)"/>
  <ellipse cx="1110" cy="620" rx="440" ry="360" fill="url(#glowB)"/>
  <rect x="${FRAME}" y="${FRAME}" width="${W - FRAME * 2}" height="${H - FRAME * 2}" rx="18"
        fill="none" stroke="${C.border}" stroke-width="2" stroke-dasharray="11 9"/>

  <text x="${RIGHT}" y="104" fill="${C.primary}" font-family="${FONT}" font-size="27" font-weight="700" text-anchor="end">webabc.ir</text>
  <text x="${PAD_X}" y="104" fill="${C.muted}" font-family="${FONT}" font-size="23" text-anchor="start">${esc(pathLabel)}</text>

  <rect x="${pillX}" y="${pillY}" width="${pillW}" height="46" rx="23" fill="${C.primary}" fill-opacity="0.13" stroke="${C.primary}" stroke-opacity="0.4"/>
  <text x="${RIGHT - 28}" y="${pillY + 31}" fill="${C.primary}" font-family="${FONT}" font-size="21" font-weight="700" text-anchor="end">${esc(pillText)}</text>

  ${titleNodes}
  ${descNodes}

  <rect x="${PAD_X}" y="${ruleY}" width="${maxTextW}" height="3" rx="1.5" fill="url(#rule)"/>
</svg>`,
    descTop,
    descBandH,
  };
}

async function renderFitting(card) {
  const limit = PAD_X; // left frame edge: RTL text may not cross it
  let last = { png: null, extent: -1, factor: 1 };
  for (let attempt = 0; attempt < 7; attempt++) {
    const factor = 1 - attempt * 0.04;
    const { svg, descTop, descBandH } = renderSvg(card, factor);
    const png = await renderPng(svg);
    const extent = await measureTitleMinX(png);
    last = { png, extent, factor, descTop, descBandH };
    if (extent >= 0 && extent >= limit) return { ...last, overflows: false };
  }
  return { ...last, overflows: true };
}

/* ------------------------------------------------------------------ page sources */

function readNamespaces() {
  const src = fs.readFileSync(path.join(ROOT, 'src/i18n/get-dictionary.ts'), 'utf8');
  const map = new Map();
  for (const m of src.matchAll(/^\s{2}'?([\w-]+)'?:\s*'([^']+)'/gm)) {
    map.set(m[1], m[2]);
  }
  return map;
}

function lookup(obj, dotted) {
  return dotted.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

/** Same t(key, {fallback}) the .astro page calls, resolved in `lang`. */
function resolveFromPage(pageSrc, varName, lang, namespaces) {
  const re = new RegExp(
    `const ${varName}\\s*=\\s*t\\(\\s*'([^']+)'[\\s\\S]*?fallback:\\s*'([^']*)'`
  );
  const m = pageSrc.match(re);
  if (!m) return null;
  const [, key, fallback] = m;
  const dot = key.indexOf('.');
  const file = namespaces.get(key.slice(0, dot));
  if (file) {
    const jsonPath = path.join(ROOT, 'src/i18n', lang, `${file}.json`);
    if (fs.existsSync(jsonPath)) {
      const value = lookup(JSON.parse(fs.readFileSync(jsonPath, 'utf8')), key.slice(dot + 1));
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
  }
  return fallback;
}

function parseFrontmatter(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const get = (k) => {
    const m = txt.match(new RegExp(`^${k}:\\s*['"](.*)['"]\\s*$`, 'm'));
    return m ? m[1] : '';
  };
  return { title: get('title'), description: get('description') };
}

function readServiceSlugs() {
  const src = fs.readFileSync(path.join(ROOT, 'src/config/services.ts'), 'utf8');
  const info = {};
  for (const m of src.matchAll(/^ {2}'?([a-z-]+)'?: \{\n([\s\S]*?)^ {2}\},?$/gm)) {
    const slug = m[1];
    const titleKey = (m[2].match(/titleKey:\s*'([^']+)'/) || [])[1];
    const subtitleKey = (m[2].match(/subtitleKey:\s*'([^']+)'/) || [])[1];
    if (titleKey && subtitleKey) info[slug] = { titleKey, subtitleKey };
  }
  return info;
}

function resolveServiceKey(key, lang, namespaces) {
  const dot = key.indexOf('.');
  const file = namespaces.get(key.slice(0, dot));
  if (!file) return '';
  const jsonPath = path.join(ROOT, 'src/i18n', lang, `${file}.json`);
  if (!fs.existsSync(jsonPath)) return '';
  const value = lookup(JSON.parse(fs.readFileSync(jsonPath, 'utf8')), key.slice(dot + 1));
  return typeof value === 'string' ? value.trim() : '';
}

function collectCards(lang) {
  const namespaces = readNamespaces();
  const cards = [];

  // 1. Homepage
  const home = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/i18n', lang, 'home.json'), 'utf8'));
  cards.push({
    out: `public/images/og/${lang}/home.webp`,
    pathLabel: PATH_LABEL.home(lang),
    eyebrow: EYEBROW.home[lang],
    title: home.title,
    description: home.description,
  });

  // 2. Tools (all 21, same slugs as the EN batch)
  const toolConfig = fs.readFileSync(path.join(ROOT, 'src/config/tools.ts'), 'utf8');
  for (const m of toolConfig.matchAll(/^ {2}'([a-z0-9-]+)': \{([\s\S]*?)^ {2}\},?$/gm)) {
    const slug = m[1];
    const cat = (m[2].match(/category:\s*'([^']+)'/) || [])[1] || 'UtilityApplication';
    const pagePath = path.join(ROOT, 'src/pages/[lang]/tools', `${slug}.astro`);
    if (!fs.existsSync(pagePath)) continue;
    const page = fs.readFileSync(pagePath, 'utf8');
    cards.push({
      out: `public/images/og/${lang}/tools/${slug}.webp`,
      pathLabel: PATH_LABEL.tools(lang, slug),
      eyebrow: (TOOL_CATEGORY[lang] || {})[cat] || cat,
      title: resolveFromPage(page, 'titleText', lang, namespaces) || slug,
      description: resolveFromPage(page, 'descriptionText', lang, namespaces) || '',
    });
  }

  // 3. Services (all slugInfoMap entries with resolvable keys)
  for (const [slug, { titleKey, subtitleKey }] of Object.entries(readServiceSlugs())) {
    const title = resolveServiceKey(titleKey, lang, namespaces);
    const description = resolveServiceKey(subtitleKey, lang, namespaces);
    if (!title || !description) continue;
    cards.push({
      out: `public/images/og/${lang}/services/${slug}.webp`,
      pathLabel: PATH_LABEL.services(lang, slug),
      eyebrow: EYEBROW.services[lang],
      title,
      description,
    });
  }

  // 4. Portfolio — top-4 click earners (ACTION-PLAN §3.1 evidence)
  for (const slug of ['ramzarz-negaran', 'remido', 'behrad-dc', 'zeytoun-masoud']) {
    const fm = parseFrontmatter(path.join(ROOT, 'src/content/portfolio', lang, `${slug}.mdx`));
    if (!fm.title || !fm.description) continue;
    cards.push({
      out: `public/images/og/${lang}/portfolio/${slug}.webp`,
      pathLabel: PATH_LABEL.portfolio(lang, slug),
      eyebrow: EYEBROW.portfolio[lang],
      title: fm.title,
      description: fm.description,
    });
  }

  return cards;
}

/* ------------------------------------------------------------------ main */

async function main() {
  const only = process.argv[2];
  const langs = only ? [only] : ['fa', 'ar'];
  for (const l of langs) {
    if (!['fa', 'ar'].includes(l)) {
      console.error(`Unknown locale ${l} — want fa or ar.`);
      process.exit(1);
    }
  }

  const problems = [];
  let total = 0;
  for (const lang of langs) {
    const cards = collectCards(lang);
    if (!cards.length) {
      console.error(`No cards collected for ${lang} — refusing to write.`);
      process.exit(1);
    }
    for (const card of cards) {
      const { png, extent, overflows, descTop, descBandH } = await renderFitting(card);
      const out = path.join(ROOT, card.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await sharp(png).webp({ quality: 90 }).toFile(out);

      const meta = await sharp(out).metadata();
      const bytes = fs.statSync(out).size;
      const rel = path.relative(ROOT, out);
      if (meta.width !== W || meta.height !== H) {
        problems.push(`${rel}: ${meta.width}x${meta.height}, expected ${W}x${H}`);
      }
      if (bytes < 12_000) {
        problems.push(`${rel}: only ${bytes} bytes — text likely did not render`);
      }
      if (extent < 0) {
        problems.push(`${rel}: no title pixels found — font did not render`);
      } else if (overflows) {
        problems.push(`${rel}: title still crosses the left frame (measured x=${extent})`);
      } else {
        const descMinX = await measureDescMinX(png, descTop, descBandH);
        if (descMinX >= 0 && descMinX < PAD_X - 12) {
          problems.push(`${rel}: description crosses the left frame (measured x=${descMinX})`);
        }
      }
      total++;
      console.log(`  ${rel}  ${String(bytes).padStart(7)} B  minX=${String(extent).padStart(4)}`);
    }
  }

  console.log(`\nWrote ${total} cards.`);
  if (problems.length) {
    console.error('\nProblems:');
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    try {
      fs.unlinkSync(FC_CONF);
    } catch {
      /* best effort */
    }
  });
