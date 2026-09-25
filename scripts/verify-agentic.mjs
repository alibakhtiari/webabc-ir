import fs from 'node:fs';
import path from 'node:path';
import worker from '../worker.ts';

const root = process.cwd();
const distDir = path.join(root, 'dist');

// Mock ASSETS fetcher that reads directly from dist/
const mockAssets = {
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    
    // Exact file match
    let filePath = path.join(distDir, pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return respondWithFile(filePath, req.method);
    }
    
    // Slashed or directory match -> look for index.html
    if (pathname.endsWith('/')) {
      const idxPath = path.join(distDir, pathname, 'index.html');
      if (fs.existsSync(idxPath) && fs.statSync(idxPath).isFile()) {
        return respondWithFile(idxPath, req.method);
      }
    } else {
      const idxPath = path.join(distDir, pathname, 'index.html');
      if (fs.existsSync(idxPath) && fs.statSync(idxPath).isFile()) {
        return respondWithFile(idxPath, req.method);
      }
      const htmlPath = path.join(distDir, `${pathname}.html`);
      if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
        return respondWithFile(htmlPath, req.method);
      }
    }

    // 404 fallback
    const p404 = path.join(distDir, '404.html');
    if (fs.existsSync(p404)) {
      const body = fs.readFileSync(p404);
      return new Response(req.method === 'HEAD' ? null : body, {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

function respondWithFile(filePath, method) {
  let contentType = 'application/octet-stream';
  if (filePath.endsWith('.html')) contentType = 'text/html; charset=utf-8';
  else if (filePath.endsWith('.md')) contentType = 'text/markdown; charset=utf-8';
  else if (filePath.endsWith('.json')) contentType = 'application/json; charset=utf-8';
  else if (filePath.endsWith('.txt')) contentType = 'text/plain; charset=utf-8';
  else if (filePath.endsWith('.xml')) contentType = 'application/xml; charset=utf-8';

  const body = method === 'HEAD' ? null : fs.readFileSync(filePath);
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': contentType },
  });
}

const env = {
  ASSETS: mockAssets,
  RESEND_API_KEY: 'test_key',
};

async function test() {
  console.log('--- Starting Is Agentic Verification Suite ---\n');
  let failures = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failures++;
    }
  }

  // 1. Agent-friendly 404 with Accept: text/markdown
  console.log('1. Testing 404 handling with Accept: text/markdown:');
  const res1 = await worker.fetch(
    new Request('https://webabc.ir/nonexistent-route-for-agents', {
      headers: { Accept: 'text/markdown' },
    }),
    env
  );
  assert(res1.status === 404, `Status is 404 (got ${res1.status})`);
  assert(
    res1.headers.get('content-type')?.includes('text/markdown'),
    `Content-Type is text/markdown (got ${res1.headers.get('content-type')})`
  );
  assert(
    res1.headers.get('vary')?.toLowerCase().includes('accept'),
    `Vary header includes Accept (got ${res1.headers.get('vary')})`
  );
  const text1 = await res1.text();
  assert(
    text1.includes('llms.txt') && text1.includes('sitemap-index.xml'),
    'Body includes recovery links to llms.txt and sitemap'
  );

  // 2. Agent-friendly 404 with default curl / crawler
  console.log('\n2. Testing 404 handling with curl/agent User-Agent:');
  const res2 = await worker.fetch(
    new Request('https://webabc.ir/another-nonexistent-path', {
      headers: { 'User-Agent': 'curl/8.1.2', Accept: '*/*' },
    }),
    env
  );
  assert(res2.status === 404, `Status is 404 (got ${res2.status})`);
  assert(
    res2.headers.get('content-type')?.includes('text/markdown'),
    `Content-Type is text/markdown for curl (got ${res2.headers.get('content-type')})`
  );

  // 3. Human browser 404 (Accept: text/html)
  console.log('\n3. Testing 404 handling for human browser (Accept: text/html):');
  const res3 = await worker.fetch(
    new Request('https://webabc.ir/human-missing-page', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    }),
    env
  );
  assert(res3.status === 404, `Status is 404 (got ${res3.status})`);
  assert(
    res3.headers.get('content-type')?.includes('text/html'),
    `Content-Type is text/html for browser (got ${res3.headers.get('content-type')})`
  );
  assert(
    res3.headers.get('link')?.includes('/404.md'),
    `Link header points to /404.md alternate (got ${res3.headers.get('link')})`
  );
  // Regression guard: a blank 404 body reached real users because wrangler.toml
  // had no not_found_handling. Assert the browser actually gets a document.
  const body3 = await res3.clone().text();
  assert(
    body3.length > 50000,
    `Browser 404 body is a real document (got ${body3.length} bytes, expected > 50000)`
  );
  assert(
    body3.includes('<title>Page Not Found | WebABC</title>'),
    `Browser 404 body is the 404 document (got title: ${body3.slice(0, 200)})`
  );
  // Locale-prefixed 404s must serve that locale's document, not the English root page.
  const res3fa = await worker.fetch(
    new Request('https://webabc.ir/fa/hiany-sayh', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    }),
    env
  );
  const body3fa = await res3fa.text();
  assert(res3fa.status === 404, `Persian 404 status is 404 (got ${res3fa.status})`);
  assert(
    body3fa.includes('صفحه پیدا نشد'),
    `Persian 404 serves the fa document (got ${body3fa.length} bytes)`
  );

  // 4. Markdown content negotiation on Homepage (/en/)
  console.log('\n4. Testing Accept: text/markdown negotiation on /en/:');
  const res4 = await worker.fetch(
    new Request('https://webabc.ir/en/', {
      headers: { Accept: 'text/markdown' },
    }),
    env
  );
  assert(res4.status === 200, `Status is 200 (got ${res4.status})`);
  assert(
    res4.headers.get('content-type')?.includes('text/markdown'),
    `Content-Type is text/markdown (got ${res4.headers.get('content-type')})`
  );
  assert(
    res4.headers.get('vary')?.toLowerCase().includes('accept'),
    `Vary header includes Accept (got ${res4.headers.get('vary')})`
  );
  const text4 = await res4.text();
  assert(text4.includes('# WebABC'), 'Body contains Markdown representation of homepage');

  // 5. HTML representation with Vary: Accept and Link header on /en/
  console.log('\n5. Testing HTML representation on /en/:');
  const res5 = await worker.fetch(
    new Request('https://webabc.ir/en/', {
      headers: { Accept: 'text/html' },
    }),
    env
  );
  assert(res5.status === 200, `Status is 200 (got ${res5.status})`);
  assert(
    res5.headers.get('content-type')?.includes('text/html'),
    `Content-Type is text/html (got ${res5.headers.get('content-type')})`
  );
  assert(
    res5.headers.get('vary')?.toLowerCase().includes('accept'),
    `Vary header includes Accept (got ${res5.headers.get('vary')})`
  );
  assert(
    res5.headers.get('link')?.includes('rel="alternate"') &&
      res5.headers.get('link')?.includes('type="text/markdown"'),
    `Link header advertises markdown alternate (got ${res5.headers.get('link')})`
  );

  // 6. 406 Not Acceptable when rejecting both HTML and Markdown
  console.log('\n6. Testing 406 Not Acceptable:');
  const res6 = await worker.fetch(
    new Request('https://webabc.ir/en/', {
      headers: { Accept: 'text/html;q=0, text/markdown;q=0' },
    }),
    env
  );
  assert(res6.status === 406, `Status is 406 (got ${res6.status})`);
  assert(
    res6.headers.get('vary')?.toLowerCase().includes('accept'),
    `Vary header includes Accept on 406 (got ${res6.headers.get('vary')})`
  );

  // 7. Quality value weighting (text/markdown;q=0.9, text/html;q=0.8)
  console.log('\n7. Testing q-value negotiation:');
  const res7 = await worker.fetch(
    new Request('https://webabc.ir/en/', {
      headers: { Accept: 'text/markdown;q=0.9, text/html;q=0.8' },
    }),
    env
  );
  assert(res7.status === 200, `Status is 200 (got ${res7.status})`);
  assert(
    res7.headers.get('content-type')?.includes('text/markdown'),
    `High-q text/markdown chosen (got ${res7.headers.get('content-type')})`
  );

  // 8. Organization Schema Completeness in dist/en/index.html
  console.log('\n8. Testing Organization schema completeness:');
  const enHtml = fs.readFileSync(path.join(distDir, 'en/index.html'), 'utf8');
  assert(enHtml.includes('name="is-agentic-site-type" content="business"'), 'Has is-agentic-site-type meta tag');
  assert(enHtml.includes('rel="alternate" type="text/markdown"'), 'Has markdown alternate link tag in DOM');
  
  // Parse LD+JSON scripts in en/index.html
  const ldJsonMatches = [...enHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let foundOrg = false;
  for (const match of ldJsonMatches) {
    try {
      const data = JSON.parse(match[1]);
      const org = data['@graph']?.find(e => e['@type'] === 'Organization' || e['@type']?.includes('Organization')) ||
                  (data['@type'] === 'Organization' || data['@type']?.includes('Organization') ? data : null);
      if (org) {
        foundOrg = true;
        assert(org.contactPoint && org.contactPoint.length > 0, 'Organization has contactPoint array');
        assert(org.contactPoint[0].telephone && org.contactPoint[0].email, 'contactPoint has telephone and email');
        assert(org.contactPoint[0].contactType, `contactPoint has contactType (${org.contactPoint[0].contactType})`);
        assert(org.address && org.address['@type'] === 'PostalAddress', 'address is PostalAddress');
        assert(org.address.streetAddress && org.address.addressLocality, 'address has streetAddress and locality');
        assert(org.address.addressRegion && org.address.postalCode, `address has region (${org.address.addressRegion}) and postalCode (${org.address.postalCode})`);
        assert(org.sameAs && org.sameAs.length > 0, 'Organization has sameAs array');
      }
    } catch (e) {}
  }
  assert(foundOrg, 'Found valid Organization JSON-LD in dist/en/index.html');

  // 9. When to Use This in public/llms.txt
  console.log('\n9. Testing Agent Instruction in public/llms.txt:');
  const llmsTxt = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8');
  assert(llmsTxt.includes('## When to Use This (Agent Guidance)'), 'Contains "## When to Use This" section');
  assert(llmsTxt.includes('Jobs WebABC Excels At'), 'Details jobs WebABC excels at');
  assert(llmsTxt.includes('When to Pick WebABC Over Alternatives'), 'Details when to pick over alternatives');
  assert(llmsTxt.includes('When NOT to Use / Prerequisite Conditions'), 'Details prerequisites and when not to use');
  assert(llmsTxt.includes('Agent Invocation & Consumption Instructions'), 'Details agent consumption instructions');

  console.log(`\n--- Verification Suite Completed: ${failures === 0 ? 'ALL CHECKS PASSED (100% Score)' : `${failures} FAILURES`} ---`);
  if (failures > 0) process.exit(1);
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
