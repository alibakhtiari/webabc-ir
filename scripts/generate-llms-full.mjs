import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const LOCALES = ['en', 'fa', 'ar'];

// Curated key pages per locale. Money posts first, then (en only) a short
// cornerstone list, then the GSC-driven posts. Each locale is built into its
// own file so no context window ever carries all three languages concatenated.
const KEY_PAGES = {
  en: [
    // Money posts
    'website-development-cost-calculator-guide-2026',
    'website-speed-optimization-pricing-guide-2026',
    'wordpress-website-cost-guide-2026',
    'local-seo-services-guide-2026',
    // Short cornerstone list (English bodies)
    'seo-checklist-2026',
    'free-seo-developer-tools-guide-2026',
    'dubai-uae-web-design-seo-guide-2026',
    'website-maintenance-security-guide-2026',
    // GSC-driven posts
    'best-title-tag-checker-tools-2026',
    'tehran-ecommerce-web-design-guide-2026',
    'seo-services-pricing-guide-2026',
    'qazvin-web-design-seo-guide-2026',
  ],
  fa: [
    'website-development-cost-calculator-guide-2026',
    'website-speed-optimization-pricing-guide-2026',
    'wordpress-website-cost-guide-2026',
    'local-seo-services-guide-2026',
    'best-title-tag-checker-tools-2026',
    'tehran-ecommerce-web-design-guide-2026',
    'seo-services-pricing-guide-2026',
    'qazvin-web-design-seo-guide-2026',
  ],
  ar: [
    'website-development-cost-calculator-guide-2026',
    'website-speed-optimization-pricing-guide-2026',
    'wordpress-website-cost-guide-2026',
    'local-seo-services-guide-2026',
    'best-title-tag-checker-tools-2026',
    'tehran-ecommerce-web-design-guide-2026',
    'seo-services-pricing-guide-2026',
    'qazvin-web-design-seo-guide-2026',
  ],
};

const MAX_BYTES = 500 * 1024; // hard cap — never ship more than this
const WARN_BYTES = 480 * 1024; // ACTION-PLAN §2.1: warn at build time above this

function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n/, '');
}

/** Back off a partial multi-byte sequence: continuation bytes AND their lead byte.
 *  Leaving the lead byte in place yields U+FFFD on decode, which re-encodes one
 *  byte larger than the buffer it was cut from — that is how this file used to
 *  come out 2 bytes over MAX_BYTES. */
function truncateUtf8(text, budget) {
  let buf = Buffer.from(text, 'utf8');
  if (buf.length <= budget) return text;
  let end = budget;
  while (end > 0 && (buf[end - 1] & 0xc0) === 0x80) end -= 1; // continuation bytes
  if (end > 0 && (buf[end - 1] & 0xc0) === 0xc0) end -= 1; // dangling lead byte
  return buf.subarray(0, end).toString('utf8');
}

/** Assemble index + whole key-page bodies without ever cutting mid-word.
 *  Pages that would breach the budget are dropped whole and reported. */
function buildCorpus(indexText, slugs, lang, budget) {
  const head = `${indexText.trimEnd()}\n\n---\n\n# Key page bodies (markdown, frontmatter stripped)\n`;
  if (Buffer.byteLength(head, 'utf8') > budget) {
    throw new Error(
      `index alone is ${Buffer.byteLength(head, 'utf8')} bytes (> ${budget}); nothing fits`
    );
  }

  const included = [];
  const excluded = [];
  let body = '';

  for (const slug of slugs) {
    const file = path.join(root, 'src/content/blog', lang, `${slug}.mdx`);
    if (!fs.existsSync(file)) {
      console.warn(`  skip: missing ${lang}/${slug}`);
      excluded.push(slug);
      continue;
    }
    const chunk = `\n\n## /${lang}/blog/${slug}/\n\n${stripFrontmatter(fs.readFileSync(file, 'utf8')).trim()}\n`;
    if (Buffer.byteLength(head + body + chunk, 'utf8') > budget) {
      excluded.push(slug);
      continue; // drop this page whole rather than truncating it mid-sentence
    }
    body += chunk;
    included.push(slug);
  }

  return { head, body, included, excluded };
}

function emit(name, indexFile, slugs, lang, outFile) {
  const indexText = fs.readFileSync(indexFile, 'utf8');

  let { head, body, included, excluded } = buildCorpus(indexText, slugs, lang, MAX_BYTES);

  let note = '';
  if (excluded.length) {
    note =
      `\n\n... [${excluded.length} of ${slugs.length} key page(s) omitted whole to stay under the ` +
      `${MAX_BYTES / 1024}KB cap: ${excluded.join(', ')} — read them at /${lang}/blog/<slug>/]\n`;
    // The note itself consumes budget, so rebuild with the reduced allowance.
    ({ head, body, included, excluded } = buildCorpus(
      indexText,
      slugs,
      lang,
      MAX_BYTES - Buffer.byteLength(note, 'utf8')
    ));
  }

  let out = head + body + note;
  if (Buffer.byteLength(out, 'utf8') > MAX_BYTES) {
    // Unreachable while the budget check holds; kept as a loud last resort so
    // the file can never silently exceed the cap again.
    console.error(`  WARNING: ${name} over cap — truncating on a character boundary`);
    out = truncateUtf8(out, MAX_BYTES);
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, out, 'utf8');

  const bytes = fs.statSync(outFile).size;
  if (bytes > WARN_BYTES) {
    console.warn(
      `  WARNING: ${name} is ${bytes} bytes, over the ${WARN_BYTES / 1024}KB target ` +
        `(${MAX_BYTES / 1024}KB hard cap). Trim KEY_PAGES.`
    );
  }
  const report = excluded.length
    ? `${included.length} pages, ${excluded.length} omitted: ${excluded.join(', ')}`
    : `${included.length} pages, 0 omitted`;
  console.log(`  ${name}: ${report}, ${bytes.toLocaleString('en-US')} bytes`);
}

console.log('Generating per-locale llms-full.txt (each file single-language, each under the cap):');
for (const lang of LOCALES) {
  emit(
    `/${lang}/llms-full.txt`,
    path.join(root, 'public', lang, 'llms.txt'),
    KEY_PAGES[lang],
    lang,
    path.join(root, 'public', lang, 'llms-full.txt')
  );
}
// Root corpus stays an English fallback so existing recovery links keep working.
emit(
  '/llms-full.txt',
  path.join(root, 'public/llms.txt'),
  KEY_PAGES.en,
  'en',
  path.join(root, 'public/llms-full.txt')
);
