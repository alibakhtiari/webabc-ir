# Technical SEO Audit — webabc.ir

**Stack:** Astro 7 (`output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`) → Cloudflare Workers with `[assets] run_worker_first = true`.
**Method:** source inspection (`astro.config.mjs`, `worker.ts`, `wrangler.toml`, `public/_redirects`, `public/_headers`, `public/robots.txt`) + live HTTP verification on 2026-09-22.

---

## 1. Crawlability & indexability — verified working

| Check | Result | Evidence |
|---|---|---|
| Root `www` → non-www | ✅ 301 | `worker.ts` step 1 |
| Trailing-slash normalisation | ✅ 301 | Live: `/en/tools/headline-analyzer` → **301** → `…/`; `/en` → 301 → `/en/`; `/fa/service-areas/qazvin` → 301 |
| Nonexistent path → 404, not a redirect hop | ✅ | Live: `/nonexistent-abc` → **404** (no redirect); worker probes `ASSETS` before redirecting |
| Legacy slug merges | ✅ 301 single hop | Live: `seo-title-checker`, `serp-preview`, `seo-title-analyzer` all → **301** → `headline-analyzer/` |
| `/sitemap.xml` → `/sitemap-index.xml` | ✅ 301 | Live |
| Root `/` geo-locale redirect | ✅ **302** | Live: `/` → **302** → `/fa/` (this request geolocated to a Persian country; code defaults to `en`) |
| Canonical tag | ✅ | `<link rel="canonical" href="https://webabc.ir/en/tools/headline-analyzer/">` |
| `robots` meta | ✅ | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| `X-Robots-Tag` header | ✅ | Same directive in `public/_headers` on `/*` |
| 404 page noindex | ✅ | `X-Robots-Tag: noindex, follow` |
| Non-canonical host noindex | ✅ | Worker sets `noindex, nofollow` when `hostname !== CANONICAL_HOST` |
| RSS feed | ✅ 200 | `/en/rss.xml` → 200, 23,433 B |

### The root redirect must stay a 302 — and it does ✅

`worker.ts` step 3 issues a **302**, with an accurate inline comment explaining that a 301 that varies by geolocation would poison caches and violate Google's locale-routing guidance. **This is correct and must not be "optimised" to a 301.**

Note the interaction: `x-default` hreflang points to `/en/`, while `/` 302s by geo. Googlebot crawls from the US → receives `/en/`, matching `x-default`. Consistent.

---

## 2. 🔴 CRITICAL — Blank 404 page for real browsers

### Symptom (reproduced twice)

```
$ curl -A "Mozilla/5.0 … Chrome/131.0.0.0 Safari/537.36" \
       -H "Accept: text/html,application/xhtml+xml,*/*;q=0.8" \
       https://webabc.ir/en/nope-xyz/

HTTP/2 404
content-length: 0          ← empty body
link: </404.md>; rel="alternate"; type="text/markdown"
```

Compare with the deliberate 404 route:

```
https://webabc.ir/en/404/   → 404, content-type: text/html, 125,693 bytes ✅
```

**Real users hitting any broken or mistyped URL get a completely blank white page.**

### Root cause

`wrangler.toml`:

```toml
[assets]
directory = "./dist"
binding = "ASSETS"
run_worker_first = true
# ← no not_found_handling
```

Because `run_worker_first = true`, every request goes through the worker, which calls `env.ASSETS.fetch()`. Without `not_found_handling = "404.html"`, the assets layer returns a bare `404` with **an empty body** — it never falls back to `dist/404.html` (which exists, 104,198 B) or `dist/en/404/index.html` (123,069 B).

`worker.ts` step 6 then does:

```ts
const headers = new Headers(response.headers);   // ← content-type absent, body empty
headers.set('X-Robots-Tag', 'noindex, follow');
headers.set('Link', '</404.md>; rel="alternate"; …');
return new Response(response.body, { status: 404, headers });  // ← passes the empty body through
```

The **agent/curl branch immediately above it works correctly** because it returns the hardcoded `MARKDOWN_404_BODY` (923 B). Only the human branch is broken.

### Why this matters

- **UX:** every 404 is a dead end with no navigation, no search, no return link.
- **SEO:** status is correctly `404`, so there is **no indexation damage** — this is not a soft-404. The loss is engagement: users who land on a broken URL (from a stale backlink, a mistyped share, or an old SERP) bounce instead of recovering.
- **AEO/GEO:** an AI agent following a stale link gets a useful recovery document; the human it hands off to gets nothing. The recovery loop is broken at exactly the handoff point.

### Fix (pick one)

**Option A — declarative (preferred, no worker code):**
```toml
[assets]
directory = "./dist"
binding = "ASSETS"
run_worker_first = true
not_found_handling = "404.html"
```

**Option B — worker-side:** in the browser branch, when `response.status === 404 && body is empty`, fetch `/404.html` (or `/${lang}/404/` when the path matches `^/(en|fa|ar)/`) and serve it with status 404.

**Falsifiability check (ACCEPT):**
> `curl -A "<real browser UA>" -H "Accept: text/html" https://webabc.ir/en/does-not-exist/` must return `content-length > 50000` with `<title>Page Not Found | WebABC</title>`, still at status 404.

---

## 3. Sitemap — accurate, with one deliberate gap

`dist/sitemap-0.xml`: **306 URLs · 1,224 `xhtml:link` hreflang alternates · 276 image entries · 306 `lastmod`**

| Section | URLs | Derivation |
|---|---:|---|
| blog | 111 | 36 posts × 3 + 3 indexes |
| tools | 66 | 22 × 3 (21 tools + hub) |
| portfolio | 54 | 17 × 3 + 3 indexes |
| services | 36 | 11 × 3 + 3 indexes |
| service-areas | 21 | 6 × 3 + 3 indexes |
| about / contact / faq / privacy / root-locale | 18 | |
| **Total** | **306** | 102 per language — exact en/fa/ar parity ✅ |

`lastmod` is content-accurate (frontmatter dates for blog, git-authorship elsewhere) via `scripts/resolve-sitemap-lastmod.mjs`. Sample values: `2026-07-22`, `2026-08-07` — not build timestamps ✅.

### 🔴 The homepage is excluded from the sitemap

`astro.config.mjs`:

```js
filter: (page) => page !== `${SITE}/` && !page.includes('/404'),
```

`https://webabc.ir/` is **not in the sitemap**. It also does not appear as a canonical sitemap entry anywhere.

**Is this defensible?** Partially — `/` is a geo-302 to a locale, so submitting it would submit a redirecting URL, and `x-default` points to `/en/` which *is* in the sitemap. That reasoning is sound for `/`.

**But** GSC shows `https://webabc.ir/` as a property URL with historical impressions, and it is the entity root referenced by `Organization @id` and `WebSite @id`. Leaving the domain root entirely unsubmitted is unusual.

**Recommendation:** keep `/` out (the 302 argument holds), but confirm `/en/`, `/fa/`, `/ar/` are the intended entry points and document the decision so it is not re-litigated.

### Sitemap coverage vs. GSC

- 306 sitemap URLs; 229 unique GSC page URLs.
- **93 sitemap URLs earned zero impressions in 92 days.**
- 15 GSC URLs are not in the sitemap — all are retired 301 sources (see `01-gsc-performance.md` §7) plus `/`.

**93 URLs with zero visibility is the honest coverage gap** — these are indexed-but-uncompetitive pages (mostly fa/ar service-area and portfolio variants), not an indexing fault.

---

## 4. `robots.txt` — good, with two trivia items

```
User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: GPTBot          Allow: /
User-agent: OAI-SearchBot   Allow: /
User-agent: ChatGPT-User    Allow: /
User-agent: ClaudeBot       Allow: /
User-agent: Claude-SearchBot Allow: /
User-agent: Claude-User     Allow: /
User-agent: PerplexityBot   Allow: /
User-agent: Google-Extended Allow: /
User-agent: CCBot           Allow: /
User-agent: Bytespider      Allow: /

Sitemap: https://webabc.ir/sitemap-index.xml
```

✅ Explicit, grouped AI-crawler allowlist covering OpenAI, Anthropic, Perplexity, Google, Common Crawl and ByteDance. This is better than most sites.

**Trivia (no action needed):**
- `Disallow: /private/` — no such route exists in `dist/`. Harmless dead rule.
- `Disallow: /api/` — protects `/api/contact`, which is POST-only. Correct.

---

## 5. Security & response headers

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | ✅ |
| `Content-Security-Policy` | full policy, `frame-ancestors 'self'`, `object-src 'none'` | ✅ |
| `X-Frame-Options` | `SAMEORIGIN` | ✅ |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | ✅ |
| `X-Robots-Tag` | `index, follow, max-image-preview:large…` | ✅ |
| Content encoding | **`br`** on HTML and CSS | ✅ |
| `Vary` | `Accept` on negotiated pages | ✅ |

### ⚠️ The `/*.html` cache rule never matches

`public/_headers`:

```http
/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

Because `build.format: 'directory'`, every page URL ends in `/` (`/en/`, not `/en/index.html` or `/en.html`). **The glob does not match any HTML page.**

Verified live:

```
https://webabc.ir/en/   →  cache-control: public, max-age=0, must-revalidate
```

**Impact is low and arguably beneficial** (`max-age=0, must-revalidate` = always revalidate = freshest content), but the *declared* intent (1-hour HTML cache) is not in effect. Either fix the glob to `/*/` or delete the dead rule so configuration matches reality.

**Static assets do work correctly:** `/images/*`, `/fonts/*`, `/_astro/*` → `public, max-age=31536000, immutable` ✅ verified.

---

## 6. Content negotiation (`Accept: text/markdown`) — implemented correctly

A distinctive AEO feature, and it is genuinely built:

| Check | Result |
|---|---|
| `curl -H "Accept: text/markdown" /en/blog/seo-checklist-2026/` | ✅ 200, `text/markdown`, 5,067 B |
| Direct `/en/blog/seo-checklist-2026/index.md` | ✅ 200, 5,067 B |
| `<link rel="alternate" type="text/markdown" href="…/index.md">` in `<head>` | ✅ |
| `Link: </404.md>; rel="alternate"; type="text/markdown"` response header | ✅ |
| `Vary: Accept` on negotiated responses | ✅ |
| 406 Not Acceptable when client sets `q=0` on both types | ✅ |
| Markdown siblings generated | ✅ 205 `index.md` files in `dist/` |
| Non-canonical host → `noindex, nofollow` | ✅ |
| Agent-friendly markdown 404 with recovery links | ✅ 923 B |

Compliant with acceptmarkdown.com conventions. This is a genuine differentiator for answer engines.

---

## 7. 🟠 HIGH — 205 indexable markdown duplicates with no canonical

### Symptom

```
$ curl -D- https://webabc.ir/en/blog/seo-checklist-2026/index.md

HTTP/2 200
content-type: text/markdown
x-content-type-options: nosniff
x-robots-tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
                                                       ^^^^^^^^^^^^^^^^^^^^ indexable
( no canonical header )
( no Link rel=alternate )
( no Vary: Accept )
```

**205 `.md` files in `dist/` are served at HTTP 200 with an `index, follow` directive.**

### Why it's a problem

1. **Duplicate content at scale.** Each `.md` is a near-verbatim text rendering of its HTML sibling. Google can index both, splitting signals across two URLs per page for the same content.
2. **No canonical signal.** Markdown cannot carry `<link rel="canonical">`, and the worker does not emit a `Link: <html-url>; rel="canonical"` header on `.md` responses. Nothing tells Google which representation is primary.
3. **Inconsistent `Vary`.** The *negotiated* representation (`Accept: text/markdown` on the HTML URL) correctly carries `Vary: Accept` and shares the HTML URL — that is fine. But the *direct* `.md` URL goes down the static-asset branch (`worker.ts` step 4), which returns the raw asset with **no `Vary: Accept`**. Two paths to the same content, only one annotated.
4. The site-wide `_headers` `/*` rule stamps `X-Robots-Tag: index, follow` onto `.md` files, so the default is indexable.

### Fix

In `worker.ts` step 4 (static asset branch), special-case `.md`:

```ts
if (/\.md$/i.test(url.pathname)) {
  const headers = new Headers(assetRes.headers);
  headers.set('X-Robots-Tag', 'noindex, follow');
  headers.set('Link', `<${htmlUrlFor(url.pathname)}>; rel="canonical"`);
  headers.set('Vary', 'Accept');
  return new Response(assetRes.body, { status: assetRes.status, headers });
}
```

Keep the **negotiated** markdown on the HTML URL indexable (that is correct — same URL, `Vary: Accept`), and noindex the **separate `.md` URL**.

> **Alternative:** if you deliberately want `.md` discoverable for agents, keep it 200 but *must* add the `Link: rel="canonical"` header pointing at the HTML URL. Either choice is defensible; shipping neither is not.

**Falsifiability check:**
> `curl -D- …/index.md` must show either `x-robots-tag: noindex` or a `link: …; rel="canonical"` header.

---

## 8. Redirect inventory — verified correct

`public/_redirects` + `worker.ts STATIC_REDIRECTS` together cover:

- **Tool merges (18 rules):** `seo-title-analyzer`, `seo-title-checker`, `serp-preview` → `headline-analyzer/` in en/fa/ar, slash and non-slash variants.
- **Canonical slash (3 rules):** bare `headline-analyzer` → slashed.
- **Service merge (3):** `modern-web-development` → `web-development/`.
- **Legacy slugs (12):** `/en/local-seo-services`, `/en/seo-services`, `/fa/web-design`, `/en/dubai`, `/en/case-studies`, etc.
- **Legacy portfolio IDs (10):** `/en/portfolio/1` → `samake-alpha/`, etc.
- **Year-free blog slugs (12):** `*-2025` → canonical.
- **`/sitemap.xml` → `/sitemap-index.xml`.**

**All targets carry a trailing slash**, so each is a single 301 hop rather than 301 → 307. Verified live — no chains observed.

**Two sources of truth exist** (`_redirects` and `worker.ts`). With `run_worker_first = true` the worker runs first, but `_redirects` remains the Cloudflare-native fallback. They currently agree; keep them in sync or consolidate to one.

---

## 9. Score: Technical SEO — 84/100

| Evidence | Impact |
|---|---|
| ✅ SSG, trailing-slash always, verified 301s, correct 302 geo-redirect | base strong |
| ✅ Canonical + 4-way hreflang, 306-URL sitemap with hreflang/image/lastmod | + |
| ✅ AI-crawler robots allowlist, HSTS preload, CSP, brotli, immutable assets | + |
| ✅ Content negotiation + markdown recovery done properly | + |
| ❌ **Blank 404 body for browsers** (no `not_found_handling`) | −10 |
| ❌ **205 indexable `.md` duplicates, no canonical** | (counted in AI-readiness too) −4 |
| ❌ Homepage excluded from sitemap, undocumented | −4 |
| ❌ `/*.html` cache rule never matches directory URLs | −2 |

---

**Next:** `04-schema.md` · `07-aeo.md` · `08-geo-ai-citations.md`
