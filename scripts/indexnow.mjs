import fs from 'node:fs';
import path from 'node:path';

// IndexNow configuration
const HOST = 'webabc.ir';
const KEY = 'a80a679f84dbefed20bf85a111725390';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Key search engine endpoints supporting IndexNow
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

async function getUrlsToSubmit() {
  const rootDir = process.cwd();
  const sitemapPath = path.join(rootDir, 'dist', 'sitemap-0.xml');
  
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const matches = [...xml.matchAll(/<loc>(https:\/\/webabc\.ir\/[^<]+)<\/loc>/g)];
    return [...new Set(matches.map(m => m[1]))];
  }

  // Fallback core URLs if dist sitemap isn't generated yet
  return [
    `https://${HOST}/en/`,
    `https://${HOST}/fa/`,
    `https://${HOST}/ar/`,
    `https://${HOST}/en/services/`,
    `https://${HOST}/en/blog/`,
    `https://${HOST}/en/tools/`
  ];
}

async function submitIndexNow() {
  const isDryRun = process.argv.includes('--dry-run');
  const urlList = await getUrlsToSubmit();
  
  console.log(`[IndexNow] Preparing payload for ${urlList.length} URLs...`);
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  if (isDryRun) {
    console.log('[IndexNow Dry Run] Payload created successfully:');
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  for (const endpoint of ENDPOINTS) {
    try {
      console.log(`[IndexNow] Submitting to ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      
      console.log(`[IndexNow] ${endpoint} -> HTTP ${response.status}`);
    } catch (err) {
      console.error(`[IndexNow Error] Failed to reach ${endpoint}:`, err.message);
    }
  }
}

submitIndexNow();
