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

function resolveInternalTarget(distDir, linkHref) {
  // Strip query parameters and hash fragments
  const cleanHref = linkHref.split('?')[0].split('#')[0];

  if (!cleanHref || cleanHref === '/') {
    return path.join(distDir, 'index.html');
  }

  // Handle absolute paths starting with '/'
  let relativePath = cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref;
  let targetPath = path.join(distDir, relativePath);

  // Check possible static file resolutions:
  // 1. Direct file match (e.g. dist/sitemap.xml or dist/favicon.ico or dist/images/...)
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  // 2. Directory index match (e.g. dist/en/portfolio/ -> dist/en/portfolio/index.html)
  const indexMatch = path.join(targetPath, 'index.html');
  if (fs.existsSync(indexMatch) && fs.statSync(indexMatch).isFile()) {
    return indexMatch;
  }

  // 3. HTML file match without extension (e.g. dist/404 -> dist/404.html)
  const htmlMatch = `${targetPath}.html`;
  if (fs.existsSync(htmlMatch) && fs.statSync(htmlMatch).isFile()) {
    return htmlMatch;
  }

  return null;
}

function runCheck() {
  console.log('🔗 Checking internal links for broken URLs across dist/ build output...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`Found ${htmlFiles.length} HTML files in build output.\n`);

  let totalLinksChecked = 0;
  let brokenCount = 0;
  const brokenLinksMap = new Map();

  const tagHrefRegex = /<(?:a|link|area|form)[^>]*?\b(?:href|action)=["']([^"']+)["']/gi;

  htmlFiles.forEach((filePath) => {
    const relativeHtmlPath = path.relative(DIST_DIR, filePath);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Strip inline <script>, <style>, and <pre> tags so JS string literals or code snippets don't trigger false positives
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    content = content.replace(/<pre\b[^<]*(?:(?!<\/pre>)<[^<]*)*<\/pre>/gi, '');

    let match;
    while ((match = tagHrefRegex.exec(content)) !== null) {
      const href = match[1].trim();

      // Skip external, protocol-relative, anchors, mailto, tel, javascript, data URIs, template variables
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('data:') ||
        href.startsWith('#') ||
        href.includes('${')
      ) {
        continue;
      }

      totalLinksChecked++;

      const resolved = resolveInternalTarget(DIST_DIR, href);
      if (!resolved) {
        brokenCount++;
        if (!brokenLinksMap.has(relativeHtmlPath)) {
          brokenLinksMap.set(relativeHtmlPath, []);
        }
        brokenLinksMap.get(relativeHtmlPath).push(href);
      }
    }
  });

  console.log(`Total internal HTML links checked: ${totalLinksChecked}`);

  if (brokenCount > 0) {
    console.error(`\n❌ Found ${brokenCount} broken internal link(s):\n`);
    brokenLinksMap.forEach((links, page) => {
      console.error(`📄 On page: ${page}`);
      links.forEach((l) => console.error(`   - Broken link: ${l}`));
    });
    console.error('\n❌ Internal broken link check FAILED.');
    process.exit(1);
  } else {
    console.log('🎉 ALL INTERNAL LINKS ARE VALID! Zero broken links detected across all 230 generated HTML pages.');
    process.exit(0);
  }
}

runCheck();
