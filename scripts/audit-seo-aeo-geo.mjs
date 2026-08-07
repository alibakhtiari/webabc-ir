import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function runAudit() {
  console.log('🔍 Auditing dist/ build output for SEO, AEO, and GEO optimization...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  const total = htmlFiles.length;

  let h1Issues = [];
  let titleIssues = [];
  let descIssues = [];
  let canonicalIssues = [];
  let schemaIssues = [];
  let ogIssues = [];
  let faqCount = 0;
  let blogCount = 0;
  let toolsCount = 0;
  let serviceAreaCount = 0;

  htmlFiles.forEach((filePath) => {
    const rel = path.relative(DIST_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip root fallback redirect shells and 404 pages
    if (rel === 'index.html' || rel === '404.html' || rel.includes('404/')) return;

    // 1. H1 Count
    const h1Matches = content.match(/<h1[\s>]/gi) || [];
    if (h1Matches.length === 0) {
      h1Issues.push(`${rel} (Missing <h1> tag)`);
    } else if (h1Matches.length > 1) {
      h1Issues.push(`${rel} (Multiple <h1> tags: ${h1Matches.length})`);
    }

    // 2. Title Tag
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      titleIssues.push(`${rel} (Missing <title>)`);
    }

    // 3. Meta Description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      descIssues.push(`${rel} (Missing meta description)`);
    }

    // 4. Canonical Tag
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (!canonicalMatch) {
      canonicalIssues.push(`${rel} (Missing canonical link)`);
    }

    // 5. Schema.org JSON-LD
    const jsonLdMatches = content.match(/<script\s+type=["']application\/ld\+json["']/gi) || [];
    if (jsonLdMatches.length === 0) {
      schemaIssues.push(`${rel} (Missing Schema.org JSON-LD)`);
    }

    // 6. OpenGraph
    const ogTitle = content.match(/<meta\s+property=["']og:title["']/i);
    if (!ogTitle) {
      ogIssues.push(`${rel} (Missing og:title)`);
    }

    // Category tracking
    if (rel.includes('/blog/')) {
      blogCount++;
    } else if (rel.includes('/tools/')) {
      toolsCount++;
    } else if (rel.includes('/service-areas/')) {
      serviceAreaCount++;
    }

    if (content.includes('FAQPage') || content.includes('faqList')) {
      faqCount++;
    }
  });

  console.log('=== AUDIT RESULTS SUMMARY ===');
  console.log(`Total HTML pages audited: ${total}`);
  console.log(`- Blog pages: ${blogCount}`);
  console.log(`- Tool pages: ${toolsCount}`);
  console.log(`- Service Area pages: ${serviceAreaCount}`);
  console.log(`- Pages with FAQ / AEO markup: ${faqCount}\n`);

  console.log(`1. Heading Hierarchy (H1): ${h1Issues.length === 0 ? '✅ 100% Passed (Single H1 on all pages)' : `❌ ${h1Issues.length} issues`}`);
  if (h1Issues.length > 0) h1Issues.slice(0, 5).forEach(i => console.log(`   - ${i}`));

  console.log(`2. Title Tags: ${titleIssues.length === 0 ? '✅ 100% Passed (Title tag present on all pages)' : `❌ ${titleIssues.length} issues`}`);
  if (titleIssues.length > 0) titleIssues.slice(0, 5).forEach(i => console.log(`   - ${i}`));

  console.log(`3. Meta Descriptions: ${descIssues.length === 0 ? '✅ 100% Passed (Meta description present on all pages)' : `❌ ${descIssues.length} issues`}`);
  if (descIssues.length > 0) descIssues.slice(0, 5).forEach(i => console.log(`   - ${i}`));

  console.log(`4. Canonical Links: ${canonicalIssues.length === 0 ? '✅ 100% Passed (Canonical link present on all pages)' : `❌ ${canonicalIssues.length} issues`}`);
  if (canonicalIssues.length > 0) canonicalIssues.slice(0, 5).forEach(i => console.log(`   - ${i}`));

  console.log(`5. Schema.org Structured Data (GEO): ${schemaIssues.length === 0 ? '✅ 100% Passed (JSON-LD present on all pages)' : `❌ ${schemaIssues.length} issues`}`);
  if (schemaIssues.length > 0) schemaIssues.slice(0, 5).forEach(i => console.log(`   - ${i}`));

  console.log(`6. Open Graph Tags: ${ogIssues.length === 0 ? '✅ 100% Passed (OG tags present on all pages)' : `❌ ${ogIssues.length} issues`}`);
  if (ogIssues.length > 0) ogIssues.slice(0, 5).forEach(i => console.log(`   - ${i}`));
}

runAudit();
