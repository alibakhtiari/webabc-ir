#!/usr/bin/env node
/**
 * Generates AVIF versions of the site's static WebP assets so browsers that
 * support AVIF download ~50% fewer bytes than WebP for the same visual quality.
 *
 * Converts every WebP under public/images (and public/*.webp) to a same-name
 * `.avif` sibling. Templates reference the `.avif` via <picture>/<source>
 * with the WebP as the fallback <img>, so nothing breaks for older browsers.
 *
 * Usage:
 *   node scripts/generate-avif.mjs            # convert everything
 *   node scripts/generate-avif.mjs --check    # report missing conversions only
 *
 * Requires sharp (already a devDependency).
 */
import { readdir, stat, access } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const CHECK_ONLY = process.argv.includes('--check');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip sources we intentionally don't convert.
      if (entry.name === 'tools') continue;
      files.push(...await walk(full));
    } else if (entry.name.toLowerCase().endsWith('.webp')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const { default: sharp } = await import('sharp');
  const webpFiles = await walk(PUBLIC);
  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of webpFiles) {
    const avifFile = file.replace(/\.webp$/i, '.avif');
    const rel = relative(join(__dirname, '..'), file);

    if (CHECK_ONLY) {
      const exists = await access(avifFile).then(() => true).catch(() => false);
      if (!exists) console.log(`MISSING: ${rel} -> ${relative(join(__dirname, '..'), avifFile)}`);
      continue;
    }

    const avifExists = await access(avifFile).then(() => true).catch(() => false);
    if (avifExists) {
      // Only regenerate if source is newer than the existing avif.
      const [srcStat, avifStat] = await Promise.all([stat(file), stat(avifFile)]);
      if (avifStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    try {
      await sharp(file, { failOn: 'none' }).avif({ quality: 50, effort: 4 }).toFile(avifFile);
      converted++;
      const a = await stat(avifFile);
      const b = await stat(file);
      const pct = (a.size / b.size) * 100;
      console.log(`OK ${rel} (${(pct).toFixed(0)}% of webp size)`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${rel}: ${err.message}`);
    }
  }

  console.log(`\navif: ${converted} converted, ${skipped} up-to-date, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('avif generation error:', err);
  process.exit(1);
});
