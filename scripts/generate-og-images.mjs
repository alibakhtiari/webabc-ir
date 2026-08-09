#!/usr/bin/env node
/**
 * Generates page-specific Open Graph images (1200x630) from existing site
 * images and writes a manifest the Layout can use to pick the right OG image
 * per page slug.
 *
 * Outputs:
 *   public/images/og/<type>/<name>.webp      (1200x630 crop)
 *   src/generated/og-images.json             slug-prefix -> og image path
 *
 * Sources:
 *   blog/...        -> public/images/blog/*.webp      (already 1200x630)
 *   service-areas/  -> public/images/locations/*.webp (square -> center crop)
 *   services/       -> src/assets/images/services/*.webp (square -> center crop)
 *   portfolio/      -> public/images/portfolio/*.webp (wide -> crop)
 *
 * Usage: node scripts/generate-og-images.mjs [--force]
 */
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FORCE = process.argv.includes('--force');

const OG_DIR = join(ROOT, 'public', 'images', 'og');
const OUT_MANIFEST = join(ROOT, 'src', 'generated', 'og-images.json');
const W = 1200;
const H = 630;

async function ensureDir(p) { await mkdir(p, { recursive: true }); }

// Extract "public/<path>" or "src/assets/<path>" as a URL-ish page key.
async function sourceList(dir, type) {
  let entries;
  try { entries = await readdir(dir); } catch { return []; }
  return entries
    .filter((f) => /\.webp$/i.test(f))
    .map((f) => ({ src: join(dir, f), name: f.replace(/\.webp$/i, ''), type }));
}

async function upToDate(ogFile, srcFile) {
  const [a, b] = await Promise.all([stat(ogFile).catch(() => null), stat(srcFile)]);
  return a !== null && a.mtimeMs >= b.mtimeMs;
}

async function main() {
  const { default: sharp } = await import('sharp');
  await ensureDir(OG_DIR);

  const groups = [
    ...(await sourceList(join(ROOT, 'public', 'images', 'blog'), 'blog')),
    ...(await sourceList(join(ROOT, 'public', 'images', 'locations'), 'service-areas')),
    ...(await sourceList(join(ROOT, 'src', 'assets', 'images', 'services'), 'services')),
    ...(await sourceList(join(ROOT, 'public', 'images', 'portfolio'), 'portfolio')),
  ];

  const manifest = {};
  let generated = 0;
  let skipped = 0;

  for (const { src, name, type } of groups) {
    const ogFile = join(OG_DIR, type, `${name}.webp`);
    if (!FORCE && (await upToDate(ogFile, src))) { skipped++; continue; }

    await ensureDir(join(OG_DIR, type));
    try {
      await sharp(src, { failOn: 'none' })
        .resize(W, H, { fit: 'cover', position: 'attention' })
        .webp({ quality: 80 })
        .toFile(ogFile);
      generated++;
    } catch (err) {
      console.error(`OG FAIL ${src}: ${err.message}`);
      continue;
    }

    // Map page slugs. Blog covers share the filename across languages, so
    // `blog/<name>` prefix works for all langs.
    manifest[`${type}/${name}`] = `/images/og/${type}/${name}.webp`;
  }

  await ensureDir(dirname(OUT_MANIFEST));
  await writeFile(OUT_MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

  console.log(`og-images: ${generated} generated, ${skipped} up-to-date`);
  console.log(`manifest: ${relative(ROOT, OUT_MANIFEST)} (${Object.keys(manifest).length} entries)`);
}

main().catch((err) => { console.error('og-images error:', err); process.exit(1); });
