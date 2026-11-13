#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

console.log('--- Running WebABC SEO & CRO Automated Pre-Flight Check ---\n');

let passCount = 0;
let failCount = 0;

function check(label, condition, details = '') {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${label}${details ? ' - ' + details : ''}`);
    failCount++;
  }
}

// 1. Verify robots.txt
const robotsTxt = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
check('public/robots.txt exists', robotsTxt.length > 0);
check('robots.txt points to sitemap-index.xml', robotsTxt.includes('Sitemap: https://webabc.ir/sitemap-index.xml'));
check('robots.txt explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot)', 
  robotsTxt.includes('GPTBot') && robotsTxt.includes('ClaudeBot') && robotsTxt.includes('PerplexityBot'));

// 2. Verify _redirects & worker.ts parity
const redirectsTxt = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8');
const workerTs = fs.readFileSync(path.join(root, 'worker.ts'), 'utf8');
check('public/_redirects exists and carries 301 mappings', redirectsTxt.includes('301'));
check('Legacy seo-title-optimization-guide redirects to headline-analyzer in _redirects', 
  redirectsTxt.includes('/en/blog/seo-title-optimization-guide') && redirectsTxt.includes('/en/tools/headline-analyzer/'));
check('Legacy seo-title-optimization-guide redirects to headline-analyzer in worker.ts', 
  workerTs.includes("'/en/blog/seo-title-optimization-guide': '/en/tools/headline-analyzer/'"));

// 3. Verify llms.txt & llms-full.txt
const llmsTxt = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8');
const llmsFull = fs.readFileSync(path.join(root, 'public/llms-full.txt'), 'utf8');
check('public/llms.txt exists and acts as multi-locale language router', 
  llmsTxt.includes('/en/llms.txt') && llmsTxt.includes('/fa/llms.txt') && llmsTxt.includes('/ar/llms.txt'));
check('public/llms-full.txt exists within size limits', llmsFull.length > 50000 && llmsFull.length <= 500000);

// 4. Verify AEO quick-answer blocks in service templates
const seoContent = fs.readFileSync(path.join(root, 'src/components/services/SeoContent.astro'), 'utf8');
const localSeoContent = fs.readFileSync(path.join(root, 'src/components/services/LocalSeoContent.astro'), 'utf8');
check('SeoContent.astro contains .aeo-quick-answer structured capsule', seoContent.includes('aeo-quick-answer'));
check('LocalSeoContent.astro contains .aeo-quick-answer structured capsule', localSeoContent.includes('aeo-quick-answer'));
check('LocalSeoContent.astro carries Qazvin & Tehran regional proof sections', 
  localSeoContent.includes('mehromah-qazvin') && localSeoContent.includes('behrad-dc'));

// 5. Verify Headline Analyzer CRO Default Fix
const headlineAnalyzer = fs.readFileSync(path.join(root, 'src/pages/[lang]/tools/headline-analyzer.astro'), 'utf8');
check('headline-analyzer.astro populates demo title on page load for instant CRO analysis', 
  headlineAnalyzer.includes('input.value = I18N.demoTitle'));

// 6. Verify ai-catalog.json
const aiCatalogPath = path.join(root, 'public/ai-catalog.json');
check('public/ai-catalog.json exists', fs.existsSync(aiCatalogPath));
if (fs.existsSync(aiCatalogPath)) {
  const catalog = JSON.parse(fs.readFileSync(aiCatalogPath, 'utf8'));
  check('ai-catalog.json lists 21 tools across en/fa/ar', 
    catalog.tools?.en?.length === 21 && catalog.tools?.fa?.length === 21 && catalog.tools?.ar?.length === 21);
}

// 7. Verify Container Width Standards
const layoutCheck = fs.readFileSync(path.join(root, 'src/styles/globals.css'), 'utf8');
check('globals.css container capped at max 1280px (max-w-7xl)', layoutCheck.includes('max-width: 1280px'));

console.log(`\n--- SEO Verification Completed: ${passCount} Passed, ${failCount} Failed ---`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All pre-flight SEO, AEO, and CRO requirements are verified!\n');
  process.exit(0);
}
