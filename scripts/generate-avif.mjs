#!/usr/bin/env node
/**
 * Generates AVIF versions of the site's static WebP assets so browsers that
 * support AVIF download fewer bytes than WebP with high visual quality.
 *
 * Converts WebP files under public/images (blog, portfolio, locations, root)
 * to a same-name `.avif` sibling. Templates reference the `.avif` via
 * <picture>/<source> with the WebP as fallback (see OptimizedImage.astro).
 *
 * Usage:
 *   node scripts/generate-avif.mjs            # convert missing AVIFs only
 *   node scripts/generate-avif.mjs --check    # report missing conversions only (exit 1 if missing)
 *   node scripts/generate-avif.mjs --force    # regenerate all AVIFs even if existing
 *   node scripts/generate-avif.mjs <file>     # convert a specific image
 *
 * Requires sharp (already in devDependencies).
 */
import { readdir, stat, access } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const CHECK_ONLY = process.argv.includes('--check');
const FORCE = process.argv.includes('--force');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip folders that are not optimized for picture/avif (og social cards, tools)
      if (entry.name === 'tools' || entry.name === 'og') continue;
      files.push(...(await walk(full)));
    } else if (entry.name.toLowerCase().endsWith('.webp')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const { default: sharp } = await import('sharp');

  // Handle single file argument
  const targetArg = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
  const webpFiles = targetArg
    ? [targetArg.endsWith('.webp') ? targetArg : `${targetArg}.webp`]
    : await walk(join(PUBLIC, 'images'));

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of webpFiles) {
    const avifFile = file.replace(/\.webp$/i, '.avif');
    const rel = relative(join(__dirname, '..'), file);

    const avifExists = await access(avifFile)
      .then(() => true)
      .catch(() => false);

    if (CHECK_ONLY) {
      if (!avifExists) {
        console.log(`MISSING: ${rel} -> ${relative(join(__dirname, '..'), avifFile)}`);
        failed++;
      }
      continue;
    }

    if (avifExists && !FORCE) {
      skipped++;
      continue;
    }

    try {
      await sharp(file, { failOn: 'none' })
        .avif({ quality: 70, effort: 5 })
        .toFile(avifFile);
      converted++;
      const [a, b] = await Promise.all([stat(avifFile), stat(file)]);
      const pct = (a.size / b.size) * 100;
      console.log(`OK ${rel} (${pct.toFixed(0)}% of webp size: ${a.size} B)`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${rel}: ${err.message}`);
    }
  }

  if (CHECK_ONLY) {
    if (failed > 0) {
      console.error(`\navif: ${failed} missing AVIF files detected.`);
      process.exit(1);
    } else {
      console.log('avif: all AVIF siblings present.');
    }
    return;
  }

  console.log(`avif: ${converted} converted, ${skipped} up-to-date, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('avif generation error:', err);
  process.exit(1);
});
