import fs from 'node:fs';
import path from 'node:path';
import worker, { STATIC_REDIRECTS } from '../worker.ts';

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

  // 9. llms.txt: root language router + per-locale canonical indexes.
  console.log('\n9. Testing llms.txt layout and agent guidance:');
  const llmsTxt = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8');

  // Root is a router first, so scrapers are handed the locale-correct index.
  assert(llmsTxt.includes('## Available Languages'), 'Root has an "Available Languages" chooser');
  for (const l of ['en', 'fa', 'ar']) {
    assert(llmsTxt.includes(`https://webabc.ir/${l}/llms.txt`), `Root links to /${l}/llms.txt`);
  }
  // ...and it still works as an English fallback if a crawler stops there.
  assert(llmsTxt.includes('## Core Global Content (English)'), 'Root keeps a curated English core');
  assert(llmsTxt.includes('## When to Use This (Agent Guidance)'), 'Contains "## When to Use This" section');
  assert(llmsTxt.includes('Jobs WebABC Excels At'), 'Details jobs WebABC excels at');
  assert(llmsTxt.includes('When to Pick WebABC Over Alternatives'), 'Details when to pick over alternatives');
  assert(llmsTxt.includes('When NOT to Use / Prerequisite Conditions'), 'Details prerequisites and when not to use');
  assert(llmsTxt.includes('Agent Invocation & Consumption Instructions'), 'Details agent consumption instructions');
  const rootLinks = (llmsTxt.match(/^- \[/gm) || []).length;
  assert(rootLinks >= 20 && rootLinks <= 50, `Root stays curated at 20-50 URLs (got ${rootLinks})`);

  // Each locale ships its own canonical index with guidance in its own language.
  const GUIDANCE = {
    en: '## When to Use This (Agent Guidance)',
    fa: '## چه زمانی از وب اِی‌بی‌سی استفاده کنیم',
    ar: '## متى تستخدم WebABC',
  };
  const shape = [];
  for (const l of ['en', 'fa', 'ar']) {
    const p = path.join(root, 'public', l, 'llms.txt');
    assert(fs.existsSync(p), `public/${l}/llms.txt exists`);
    const t = fs.readFileSync(p, 'utf8');
    assert(t.includes(GUIDANCE[l]), `/${l}/llms.txt carries localized guidance`);
    assert(t.includes(`/${l}/llms-full.txt`), `/${l}/llms.txt points at its own corpus`);
    shape.push({ l, links: (t.match(/^- \[/gm) || []).length, sections: (t.match(/^## /gm) || []).length });
  }
  assert(
    new Set(shape.map((s) => s.links)).size === 1,
    `Locale indexes carry equal link counts (${shape.map((s) => `${s.l}=${s.links}`).join(', ')})`
  );
  assert(
    new Set(shape.map((s) => s.sections)).size === 1,
    `Locale indexes carry equal section counts (${shape.map((s) => `${s.l}=${s.sections}`).join(', ')})`
  );

  // Per-locale corpus: single language, never concatenated, always under the cap.
  const corpusSize = (rel) => {
    const p = path.join(root, 'public', rel);
    assert(fs.existsSync(p), `public/${rel} exists`);
    return fs.existsSync(p) ? fs.statSync(p).size : 0;
  };
  for (const l of ['en', 'fa', 'ar']) {
    const size = corpusSize(`${l}/llms-full.txt`);
    assert(size <= 500 * 1024, `/${l}/llms-full.txt within 500KB hard cap (${size.toLocaleString('en-US')} bytes)`);
  }
  const rootCorpusSize = corpusSize('llms-full.txt');
  assert(
    rootCorpusSize <= 500 * 1024,
    `root llms-full.txt within 500KB (${rootCorpusSize.toLocaleString('en-US')} bytes)`
  );

  // The worker must answer .txt directly: one hop, no geo variation, explicit
  // UTF-8 so Persian and Arabic decode correctly.
  for (const l of ['en', 'fa', 'ar']) {
    const res = await worker.fetch(new Request(`https://webabc.ir/${l}/llms.txt`), env);
    assert(res.status === 200, `/${l}/llms.txt served directly with 200 (got ${res.status})`);
    const ct = res.headers.get('content-type') || '';
    assert(
      /text\/plain/i.test(ct) && /charset=/i.test(ct),
      `/${l}/llms.txt Content-Type declares a charset (got ${ct})`
    );
  }

  // Machine-readable discovery on rendered pages.
  const faPage = await worker.fetch(new Request('https://webabc.ir/fa/', { headers: { Accept: 'text/html' } }), env);
  assert(
    (faPage.headers.get('link') || '').includes('</fa/llms.txt>; rel="describedby"'),
    `Persian pages advertise their own index via Link describedby (got ${faPage.headers.get('link')})`
  );
  const enPage = await worker.fetch(new Request('https://webabc.ir/en/', { headers: { Accept: 'text/html' } }), env);
  assert(
    (enPage.headers.get('link') || '').includes('</en/llms.txt>; rel="describedby"'),
    `English pages advertise their own index via Link describedby (got ${enPage.headers.get('link')})`
  );

  // 10. `.md` siblings are noindexed duplicates, not standalone documents.
  console.log('\n10. Testing .md noindex + canonical:');
  for (const [mdPath, htmlPath] of [
    ['/en/blog/seo-checklist-2026/index.md', '/en/blog/seo-checklist-2026/'],
    ['/en/blog/seo-checklist-2026.md', '/en/blog/seo-checklist-2026/'],
    ['/en/contact/index.md', '/en/contact/'],
    ['/index.md', '/'],
  ]) {
    const res = await worker.fetch(new Request(`https://webabc.ir${mdPath}`), env);
    assert(res.status === 200, `${mdPath} served with 200 (got ${res.status})`);
    assert(
      (res.headers.get('x-robots-tag') || '').startsWith('noindex'),
      `${mdPath} is noindex (got ${res.headers.get('x-robots-tag')})`
    );
    const link = res.headers.get('link') || '';
    assert(
      link.includes(`<https://webabc.ir${htmlPath}>; rel="canonical"`),
      `${mdPath} canonicalises to ${htmlPath} (got ${link || 'none'})`
    );
    assert(
      (res.headers.get('vary') || '').toLowerCase().includes('accept'),
      `${mdPath} varies on Accept (got ${res.headers.get('vary')})`
    );
  }

  // 404.md maps to /404/, which answers 404 — noindex, but never canonical.
  const md404 = await worker.fetch(new Request('https://webabc.ir/404.md'), env);
  assert(
    (md404.headers.get('x-robots-tag') || '').startsWith('noindex'),
    `/404.md is noindex (got ${md404.headers.get('x-robots-tag')})`
  );
  assert(
    !/rel="canonical"/.test(md404.headers.get('link') || ''),
    `/404.md declares no canonical (got ${md404.headers.get('link') || 'none'})`
  );

  // Only `.md` is noindexed: the alternate representations must stay reachable
  // and indexable, and negotiated markdown on the HTML URL must keep working.
  const txt = await worker.fetch(new Request('https://webabc.ir/llms.txt'), env);
  assert(
    !(txt.headers.get('x-robots-tag') || '').includes('noindex'),
    `llms.txt is not noindexed by the .md rule (got ${txt.headers.get('x-robots-tag')})`
  );
  const negotiated = await worker.fetch(
    new Request('https://webabc.ir/en/blog/seo-checklist-2026/', {
      headers: { Accept: 'text/markdown' },
    }),
    env
  );
  assert(negotiated.status === 200, `negotiated markdown on the HTML URL still 200 (got ${negotiated.status})`);
  assert(
    (negotiated.headers.get('content-type') || '').includes('text/markdown'),
    `negotiated markdown on the HTML URL is text/markdown (got ${negotiated.headers.get('content-type')})`
  );
  assert(
    !(negotiated.headers.get('x-robots-tag') || '').startsWith('noindex'),
    `negotiated markdown on the HTML URL is not noindexed (got ${negotiated.headers.get('x-robots-tag')})`
  );

  // 11. `public/_redirects` and `worker.ts` STATIC_REDIRECTS agree: the test is
  // the single source of truth. Every file rule must resolve through the worker
  // in one 301 hop to the same target (the worker also serves the slash-form
  // sources via its barePath lookup, and the 3 bare headline-analyzer rules via
  // its explicit canonicalisation branch), and every map entry must have a file
  // counterpart. Statuses must stay 301 — no 302/307 may sneak in.
  console.log('\n11. Testing redirect parity (_redirects vs worker):');
  const redirectsRaw = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8');
  const redirectRules = [];
  for (const line of redirectsRaw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [src, dst, code] = t.split(/\s+/);
    redirectRules.push({ src, dst, code });
  }
  assert(redirectRules.length > 0, `parsed ${redirectRules.length} rules from public/_redirects`);
  const norm = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  const fileMap = new Map();
  for (const { src, dst, code } of redirectRules) {
    assert(code === '301', `_redirects rule ${src} stays 301 (got ${code})`);
    const res = await worker.fetch(new Request(`https://webabc.ir${src}`), env);
    assert(res.status === 301, `_redirects source ${src} resolves 301 through the worker (got ${res.status})`);
    assert(
      res.headers.get('location') === `https://webabc.ir${dst}`,
      `_redirects source ${src} lands on ${dst} (got ${res.headers.get('location')})`
    );
    const k = norm(src);
    if (fileMap.has(k)) {
      assert(
        fileMap.get(k) === dst,
        `_redirects duplicate source ${src} agrees on one target (got ${fileMap.get(k)} vs ${dst})`
      );
    } else {
      fileMap.set(k, dst);
    }
  }
  const mapKeys = Object.keys(STATIC_REDIRECTS);
  assert(mapKeys.length > 0, `STATIC_REDIRECTS holds ${mapKeys.length} entries`);
  for (const src of mapKeys) {
    const k = norm(src);
    assert(fileMap.has(k), `worker redirect ${src} has a _redirects counterpart`);
    assert(
      fileMap.get(k) === STATIC_REDIRECTS[src],
      `worker redirect ${src} targets ${STATIC_REDIRECTS[src]} in both places (file has ${fileMap.get(k)})`
    );
  }
  console.log(`  parity: ${redirectRules.length} file rules resolve via worker, ${mapKeys.length} map entries mirrored in file`);

  // 12. Same-document @id graph integrity (§4.2) + per-language WebSite (§4.3).
  // Every @id referenced by isPartOf/mainEntityOfPage/breadcrumb/publisher must
  // exist as a node on the same page. Cross-page identity refs (author/about)
  // are deliberately NOT walked — they resolve on other pages by design.
  console.log('\n12. Testing schema @id integrity:');
  const LINK_PROPS = ['isPartOf', 'mainEntityOfPage', 'breadcrumb', 'publisher'];
  const blocksOf = (html) =>
    [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .map((m) => {
        try {
          return JSON.parse(m[1]);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .flatMap((d) => (Array.isArray(d) ? d : [d]));
  const pageHtml = async (p) => {
    const res = await worker.fetch(
      new Request(`https://webabc.ir${p}`, { headers: { Accept: 'text/html' } }),
      env
    );
    assert(res.status === 200, `${p} serves HTML 200 (got ${res.status})`);
    return await res.text();
  };
  const assertLocalRefs = (label, html) => {
    const nodes = blocksOf(html);
    assert(nodes.length > 0, `${label} emits JSON-LD (${nodes.length} blocks)`);
    const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));
    const refs = [];
    for (const n of nodes)
      for (const p of LINK_PROPS) {
        const v = n[p];
        if (v && typeof v === 'object' && v['@id']) refs.push(`${n['@type']}.${p} -> ${v['@id']}`);
      }
    assert(refs.length > 0, `${label} declares ${refs.length} same-document refs`);
    for (const r of refs)
      assert(ids.has(r.slice(r.indexOf(' -> ') + 4)), `${label}: ${r} resolves`);
    return { nodes, ids };
  };

  // Blog post: the full chain BlogPosting -> WebPage <- FAQPage, WebPage ->
  // WebSite + BreadcrumbList.
  const postUrl = 'https://webabc.ir/en/blog/seo-checklist-2026/';
  const { nodes: postNodes } = assertLocalRefs('sample post', await pageHtml('/en/blog/seo-checklist-2026/'));
  const byType = (t) => postNodes.find((n) => n['@type'] === t);
  assert(
    byType('BlogPosting')?.mainEntityOfPage?.['@id'] === `${postUrl}#webpage`,
    `BlogPosting.mainEntityOfPage points at #webpage`
  );
  assert(
    byType('FAQPage')?.isPartOf?.['@id'] === `${postUrl}#webpage`,
    `FAQPage.isPartOf points at #webpage`
  );
  const wp = byType('WebPage');
  assert(wp?.['@id'] === `${postUrl}#webpage`, `WebPage node #webpage exists`);
  assert(wp?.url === postUrl && wp?.inLanguage === 'en-US', `WebPage carries url + inLanguage`);
  assert(
    wp?.isPartOf?.['@id'] === 'https://webabc.ir/en/#website',
    `WebPage.isPartOf points at the per-language WebSite`
  );
  assert(
    wp?.breadcrumb?.['@id'] === `${postUrl}#breadcrumb` &&
      byType('BreadcrumbList')?.['@id'] === `${postUrl}#breadcrumb`,
    `WebPage.breadcrumb links the BreadcrumbList node`
  );

  // Non-blog FAQ page (services, no Breadcrumbs): WebPage node present, refs
  // resolve, and NO breadcrumb link (it would dangle without a BreadcrumbList).
  const svcHtml = await pageHtml('/en/services/web-development/');
  const { nodes: svcNodes } = assertLocalRefs('service page', svcHtml);
  const svcWp = svcNodes.find((n) => n['@type'] === 'WebPage');
  assert(svcWp?.isPartOf?.['@id'] === 'https://webabc.ir/en/#website', `service WebPage joins the WebSite`);
  assert(!('breadcrumb' in (svcWp || {})), `service WebPage declares no breadcrumb link (no BreadcrumbList there)`);
  assert(
    svcNodes.find((n) => n['@type'] === 'FAQPage')?.isPartOf?.['@id'] === svcWp?.['@id'],
    `service FAQPage.isPartOf resolves to the page WebPage node`
  );

  // §4.3: WebSite @id is already per-language — lock it in on all 3 homepages.
  for (const lang of ['en', 'fa', 'ar']) {
    const nodes = blocksOf(await pageHtml(`/${lang}/`));
    const site = nodes.find((n) => n['@type'] === 'WebSite');
    assert(site?.['@id'] === `https://webabc.ir/${lang}/#website`, `/${lang}/ WebSite @id is per-language`);
    assert(site?.url === `https://webabc.ir/${lang}/`, `/${lang}/ WebSite url matches its @id language`);
  }

  // Dist sweep: every blog HTML carrying an FAQPage must carry its WebPage node
  // (all 114 posts render FAQ today; a future faq-less post fails loudly here
  // instead of shipping a dangling mainEntityOfPage).
  let swept = 0;
  for (const lang of ['en', 'fa', 'ar']) {
    const dir = path.join(distDir, lang, 'blog');
    for (const entry of fs.readdirSync(dir)) {
      const f = path.join(dir, entry, 'index.html');
      let html;
      try {
        html = fs.readFileSync(f, 'utf8');
      } catch {
        continue;
      }
      if (!html.includes('"@type":"FAQPage"')) continue;
      swept++;
      assert(html.includes('"@type":"WebPage"'), `${lang}/${entry} carries a WebPage node next to its FAQPage`);
      assert(
        html.includes('#webpage'),
        `${lang}/${entry} WebPage node uses the #webpage identity mainEntityOfPage points at`
      );
    }
  }
  console.log(`  swept ${swept} blog HTML files with FAQPage, all paired with a WebPage node`);

  console.log(`\n--- Verification Suite Completed: ${failures === 0 ? 'ALL CHECKS PASSED (100% Score)' : `${failures} FAILURES`} ---`);
  if (failures > 0) process.exit(1);
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
