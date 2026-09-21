import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

// Curated key-page list: [lang, slug] pairs resolved to src/content/blog/<lang>/<slug>.mdx.
// Money posts (pricing-led guides, all three locales) first, then a short list of
// high-value cornerstone guides (EN bodies; fa/ar ship the same slugs where translated).
const KEY_PAGES = [
  // Money posts x3 locales
  ['en', 'website-development-cost-calculator-guide-2026'],
  ['fa', 'website-development-cost-calculator-guide-2026'],
  ['ar', 'website-development-cost-calculator-guide-2026'],
  ['en', 'website-speed-optimization-pricing-guide-2026'],
  ['fa', 'website-speed-optimization-pricing-guide-2026'],
  ['ar', 'website-speed-optimization-pricing-guide-2026'],
  ['en', 'wordpress-website-cost-guide-2026'],
  ['fa', 'wordpress-website-cost-guide-2026'],
  ['ar', 'wordpress-website-cost-guide-2026'],
  ['en', 'local-seo-services-guide-2026'],
  ['fa', 'local-seo-services-guide-2026'],
  ['ar', 'local-seo-services-guide-2026'],
  // Short cornerstone list
  ['en', 'seo-checklist-2026'],
  ['en', 'free-seo-developer-tools-guide-2026'],
  ['en', 'dubai-uae-web-design-seo-guide-2026'],
  ['en', 'website-maintenance-security-guide-2026'],
  // New GSC-driven posts x3 locales
  ['en', 'best-title-tag-checker-tools-2026'],
  ['fa', 'best-title-tag-checker-tools-2026'],
  ['ar', 'best-title-tag-checker-tools-2026'],
  ['en', 'tehran-ecommerce-web-design-guide-2026'],
  ['fa', 'tehran-ecommerce-web-design-guide-2026'],
  ['ar', 'tehran-ecommerce-web-design-guide-2026'],
];

const MAX_BYTES = 500 * 1024; // ~500KB cap
const TRUNC_NOTE =
  '\n\n... [truncated: llms-full.txt capped at ~500KB; see individual /<lang>/blog/<slug>/ pages for full text]\n';

function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n/, '');
}

const parts = [];
const indexPath = path.join(root, 'public/llms.txt');
parts.push(fs.readFileSync(indexPath, 'utf8').trimEnd());
parts.push('\n\n---\n\n# Key page bodies (markdown, frontmatter stripped)\n');

let included = 0;
let skipped = 0;
for (const [lang, slug] of KEY_PAGES) {
  const file = path.join(root, 'src/content/blog', lang, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    console.warn(`skip: missing ${lang}/${slug}`);
    skipped += 1;
    continue;
  }
  const body = stripFrontmatter(fs.readFileSync(file, 'utf8')).trim();
  parts.push(`\n\n## /${lang}/blog/${slug}/\n\n${body}\n`);
  included += 1;
}

let out = parts.join('\n');
if (Buffer.byteLength(out, 'utf8') > MAX_BYTES) {
  // Truncate on a byte boundary without splitting a multi-byte char.
  const buf = Buffer.from(out, 'utf8').subarray(
    0,
    MAX_BYTES - Buffer.byteLength(TRUNC_NOTE, 'utf8')
  );
  let end = buf.length;
  while (end > 0 && buf[end - 1] >= 0x80 && buf[end - 1] < 0xc0) end -= 1; // back off continuation bytes
  out = buf.subarray(0, end).toString('utf8') + TRUNC_NOTE;
}

const outPath = path.join(root, 'public/llms-full.txt');
fs.writeFileSync(outPath, out, 'utf8');
const bytes = fs.statSync(outPath).size;
console.log(`Generated llms-full.txt: ${included} pages, ${skipped} skipped, ${bytes} bytes.`);
