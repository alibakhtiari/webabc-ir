import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const SRC_PAGES_DIR = path.join(ROOT_DIR, 'src/pages');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const LANGUAGES = ['en', 'fa', 'ar'];

function runCheck() {
  console.log('🔍 Checking 404 pages in codebase, build output, and sitemaps...\n');

  let hasErrors = false;

  // 1. Verify Source Code 404 Pages
  console.log('--- 1. Source Code Verification ---');
  const root404Src = path.join(SRC_PAGES_DIR, '404.astro');
  const lang404Src = path.join(SRC_PAGES_DIR, '[lang]/404.astro');

  if (fs.existsSync(root404Src)) {
    console.log('✅ Found root 404 source page: src/pages/404.astro');
  } else {
    console.error('❌ Missing root 404 source page: src/pages/404.astro');
    hasErrors = true;
  }

  if (fs.existsSync(lang404Src)) {
    console.log('✅ Found localized 404 source page: src/pages/[lang]/404.astro');
  } else {
    console.error('❌ Missing localized 404 source page: src/pages/[lang]/404.astro');
    hasErrors = true;
  }

  // Check for noindex directive in source 404 pages
  if (fs.existsSync(root404Src)) {
    const content = fs.readFileSync(root404Src, 'utf-8');
    if (content.includes('noindex')) {
      console.log('✅ Root 404 source has noindex directive');
    } else {
      console.warn('⚠️ Root 404 source is missing explicit noindex directive');
    }
  }

  if (fs.existsSync(lang404Src)) {
    const content = fs.readFileSync(lang404Src, 'utf-8');
    if (content.includes('noindex')) {
      console.log('✅ Localized 404 source has noindex directive');
    } else {
      console.warn('⚠️ Localized 404 source is missing explicit noindex directive');
    }
  }

  // 2. Verify Build Output HTML Pages
  console.log('\n--- 2. Build Output (dist/) Verification ---');
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory does not exist. Run "npm run build" first.');
    hasErrors = true;
  } else {
    const root404Dist = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(root404Dist)) {
      console.log('✅ Generated root 404 HTML: dist/404.html');
    } else {
      console.error('❌ Missing root 404 HTML in build output: dist/404.html');
      hasErrors = true;
    }

    LANGUAGES.forEach((lang) => {
      const lang404Dist = path.join(DIST_DIR, lang, '404/index.html');
      const lang404Alt = path.join(DIST_DIR, lang, '404.html');
      if (fs.existsSync(lang404Dist) || fs.existsSync(lang404Alt)) {
        console.log(`✅ Generated ${lang.toUpperCase()} 404 HTML: dist/${lang}/404/index.html`);
      } else {
        console.error(`❌ Missing ${lang.toUpperCase()} 404 HTML: dist/${lang}/404/index.html`);
        hasErrors = true;
      }
    });
  }

  // 3. Verify Sitemap Exclusion (404 pages MUST NOT be in sitemap)
  console.log('\n--- 3. Sitemap Exclusion Verification ---');
  if (fs.existsSync(DIST_DIR)) {
    const sitemapFiles = fs.readdirSync(DIST_DIR).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

    if (sitemapFiles.length === 0) {
      console.error('❌ No sitemap files found in dist/');
      hasErrors = true;
    } else {
      console.log(`Found sitemap file(s): ${sitemapFiles.join(', ')}`);

      let found404InSitemap = false;

      sitemapFiles.forEach((file) => {
        const sitemapPath = path.join(DIST_DIR, file);
        const xmlContent = fs.readFileSync(sitemapPath, 'utf-8');

        // Search for 404 URLs inside XML
        const matches = xmlContent.match(/<loc>[^<]*404[^<]*<\/loc>/gi);
        if (matches && matches.length > 0) {
          console.error(`❌ Found 404 page URL in ${file}:`);
          matches.forEach(m => console.error(`   ${m}`));
          found404InSitemap = true;
          hasErrors = true;
        } else {
          console.log(`✅ ${file} contains 0 404 URLs (Excluded correctly)`);
        }
      });

      if (!found404InSitemap) {
        console.log('✅ All 404 pages are properly excluded from sitemaps!');
      }
    }
  }

  // Final Summary
  console.log('\n--- Test Result Summary ---');
  if (hasErrors) {
    console.error('❌ 404 verification checks FAILED.');
    process.exit(1);
  } else {
    console.log('🎉 ALL CHECKS PASSED: 404 pages exist in code & build output, and are excluded from sitemaps as required by SEO best practices!');
    process.exit(0);
  }
}

runCheck();
