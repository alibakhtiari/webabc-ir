# Performance & Images Audit — webabc.ir

**⚠️ Measurement limitation (stated first, honestly):** there is **no lab or field Core Web Vitals data** for this property.

- No PageSpeed Insights / CrUX credentials are configured (`~/.config/claude-seo/` does not exist).
- The GSC workbook contains **no page-experience data** — it is a Search Performance export only.

**Everything below is measured directly** (real HTTP fetches with brotli negotiation, 2026-09-22) or read from build config. **No LCP / INP / CLS numbers are claimed anywhere in this audit**, and none should be inferred from it.

---

## 1. Measured page weight

| Page | HTML (raw) | TTFB-ish fetch | CSS | JS | Images (sampled) |
|---|---:|---:|---:|---:|---:|
| `/en/` | 134,892 B | 0.74 s | 139,559 B (1 file) | 13,828 B (1 file) | 989,609 B (5) |
| `/en/tools/headline-analyzer/` | 155,732 B | 0.42 s | 139,559 B (1 file) | 13,828 B (1 file) | 0 B (0) |
| `/en/blog/seo-checklist-2026/` | 140,814 B | 0.31 s | 139,559 B (1 file) | 13,828 B (1 file) | 492,276 B (5) |

### What these numbers mean

**✅ The JavaScript budget is excellent.** One 13.8 KB script for an entire agency site with 300+ pages is close to the theoretical floor for an Astro SSG. This is the strongest performance asset the site has.

**✅ CSS is a single 139.5 KB file, brotli-encoded, cached immutable for a year.** With `inlineStylesheets: 'auto'` the build correctly chose external + content-hashed over inlining 139 KB into every document (the `astro.config.mjs` comment documents this reasoning — it is right).

**⚠️ HTML is heavy: 135–156 KB uncompressed.**

| Page | HTML | Why it's large |
|---|---:|---|
| headline-analyzer | 155,732 B | 5 JSON-LD blocks (incl. 9 Q/A pairs), full FAQ section, guide sections, related-tools CTA |
| blog post | 140,814 B | 5 JSON-LD blocks, TOC, TLDR, author box with 6 inline SVGs, FAQ, related-posts grid |
| homepage | 134,892 B | Organization schema with 6 `areaServed` cities, service grids, FAQ |

Raw size is misleading without the transport encoding — **confirmed `content-encoding: br` on both HTML and CSS**, so the wire cost is roughly 20–30% of raw. Still: a 156 KB HTML document must be fully downloaded and parsed before first paint, and it is the LCP-blocking resource.

**Likely contributors worth profiling:**
- 5 JSON-LD blocks inlined per page (needed — do not remove; just be aware they count)
- 6 inline SVG icons in the author box (repeated on all 108 posts)
- Full FAQ answers rendered server-side (required for AEO — do not remove)

**Recommendation:** measure before changing. Run PSI/CrUX once credentials exist; if LCP is green, leave this alone.

---

## 2. Image weight — the real page-weight driver

| Page | Images | Sampled bytes |
|---|---:|---:|
| `/en/` | 5 | **989,609 B (~967 KB)** |
| `/en/blog/seo-checklist-2026/` | 5 | 492,276 B (~481 KB) |

**The homepage ships ~1 MB of imagery.** This is the largest transfer cost on the site by a wide margin — roughly **7× the combined CSS + JS**.

### Image infrastructure — good ✅

| Check | Status |
|---|---|
| `OptimizedImage.astro` requires `alt: string` (typed, not optional) | ✅ compile-time enforcement |
| Formats | ✅ AVIF + WebP (git history: *"add missing avif covers"*) |
| Blog covers | ✅ `/images/blog/<slug>.webp` — exists for all posts |
| Per-entity OG crops | ✅ manifest-driven (`scripts/generate-og-manifest.mjs`) |
| Sitemap image entries | ✅ 276 `<image:loc>` entries |
| Caching | ✅ `/images/*` → `public, max-age=31536000, immutable` |
| Hero image priority | ✅ `fetchpriority="high"` + `loading="eager"` on post hero |
| Related/secondary images | ✅ `loading="lazy"` |
| Dimensions declared | ✅ `width`/`height` passed → CLS-safe |

**Alt text: 0 missing** across all content images (the collection uses `<OptimizedImage>` components and markdown images, all with alt).

### Gaps

| # | Gap | Severity |
|---|---|---|
| 1 | **Homepage ~967 KB of images** — no evidence of responsive `srcset`/`sizes` variants being served | 🔴 High |
| 2 | **All 21 tools share one OG image.** `astro.config.mjs` `getImageForPage` maps every `*/tools/*` URL → `/images/og/tools/headline-analyzer.webp` | 🟠 Medium |
| 3 | No lab CWV to confirm LCP is within 2.5 s | ⚠️ Unknown |

### Gap 2 in detail — worth fixing because the tool cluster is the traffic

```js
if (pageKey.match(/^(en|fa|ar)\/tools(\/.*)?$/)) {
  return '/images/og/tools/headline-analyzer.webp';   // ← same image for all 21 tools
}
```

**Consequences:**
- Every tool page's sitemap image entry points at the headline-analyzer OG image → search/image engines see 63 tool URLs all illustrated by one asset.
- Sharing any of the 20 other tools on social renders the headline-analyzer card — **wrong preview on the second-most valuable asset class**.
- The site's #1 traffic page has a bespoke OG image while `cost-calculator` (2 clicks, 8.70% CTR) and `glassmorphism-generator` (2 clicks, 9.52% CTR — the site's best tool CTRs) do not.

**Fix:** generate per-tool OG crops in `generate-og-manifest.mjs` and let the manifest lookup (which runs first) override the fallback.

---

## 3. Caching — one dead rule

| Asset class | Intended | Actual (live-verified) | Status |
|---|---|---|---|
| `/images/*` | 1 year immutable | `public, max-age=31536000, immutable` | ✅ |
| `/fonts/*` | 1 year immutable | `public, max-age=31536000, immutable` | ✅ |
| `/_astro/*` | 1 year immutable | `public, max-age=31536000, immutable` | ✅ |
| **HTML pages** | **1 hour** (`/*.html` rule) | **`public, max-age=0, must-revalidate`** | ❌ **rule never matches** |

### The `/*.html` glob matches nothing

`build.format: 'directory'` means every page URL is `/en/`, `/en/blog/x/` — **no URL ends in `.html`**. The Cloudflare `_headers` glob `/*.html` therefore applies to zero pages.

Live proof:
```
https://webabc.ir/en/   →   cache-control: public, max-age=0, must-revalidate
```

**Severity: Low, and arguably the opposite of harmful.** `max-age=0, must-revalidate` means every navigation revalidates — users always get current content, which is *better* for a frequently-updated blog than a 1-hour cache. The defect is that **declared configuration ≠ actual behaviour**, which will confuse the next person to audit this.

**Fix:** either change the rule to match directory URLs, or delete it and document that HTML is intentionally always-revalidated.

**Note the interplay with `Vary: Accept`:** HTML responses carry `Vary: Accept` (content negotiation). With `max-age=0, must-revalidate` this is safe. If the 1-hour cache rule is ever made effective, `Vary: Accept` **must** remain or cached HTML/markdown representations could cross-contaminate.

---

## 4. Transport & encoding ✅

| Check | Status |
|---|---|
| Brotli on HTML | ✅ `content-encoding: br` |
| Brotli on CSS | ✅ `content-encoding: br` |
| HTTP/2 | ✅ `HTTP/2 300`-series responses throughout |
| Third-party origins | ✅ **zero** for en/fa (fonts self-hosted) |
| Third-party origins (ar) | ⚠️ 2 — `fonts.googleapis.com` + `fonts.gstatic.com` |
| Server response time | ✅ 0.31–0.74 s fetch (Cloudflare edge) |
| Service worker | ✅ registered (`/sw.js`, 2.4 KB) |
| `prefetch` | ✅ disabled in config (no speculative bandwidth cost) |

### The Arabic font asymmetry

`Layout.astro` head:

```astro
{lang === 'ar' ? (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="…IBM+Plex+Sans+Arabic…Cairo…" rel="stylesheet" />
  </>
) : (
  <link rel="preload" as="font" type="font/woff2"
        href={lang === 'en' ? '/fonts/ltr.woff2' : '/fonts/rtl.woff2'} crossorigin />
)}
```

| Locale | Font delivery | Extra origins |
|---|---|---|
| en | self-hosted `woff2`, `preload` | 0 |
| fa | self-hosted `woff2`, `preload` | 0 |
| **ar** | **Google Fonts stylesheet + 2 preconnects** | **2** |

**The Arabic locale is the only one with a third-party dependency** — and it is the locale with the *worst* measured snippet performance (`/ar/` at position 5.01, 0 clicks across 232 impressions). `preconnect` mitigates the latency, but this is a render-relevant stylesheet from an external origin on a site whose entire positioning is "zero-JS, sub-second, optimal AI crawling."

**Fix:** self-host `IBM Plex Sans Arabic` + `Cairo` as `woff2` under `/fonts/`, preload them, drop both preconnects. Brings `/ar/` to parity with en/fa and restores the zero-third-party claim.

---

## 5. Header consistency — one more dead rule

`public/_headers` sets `Cache-Control` for `/*.html` (dead, §3) but the live HTML response comes from the `/*` catch-all plus Cloudflare defaults.

Also present and correct on all responses:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Robots-Tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; …
```

✅ All verified live. CSP correctly scopes scripts to self + Cloudflare Turnstile.

---

## 6. Measurement gap — the most actionable item in this file

**There is no CWV data at all.** Every performance claim above is *proxy-based* (transfer size, request count, encoding, caching).

Given:
- 156 KB HTML documents
- ~1 MB of homepage imagery
- 139 KB CSS
- but only 13.8 KB JS and zero third-party script (except `/ar/`)

…the site *should* perform well. **Nobody knows**, and Core Web Vitals are a confirmed ranking signal (INP, not FID).

**Recommendation — do this first, it costs nothing but an API key:**

1. Configure PSI/CrUX credentials at `~/.config/claude-seo/google-api.json` (shared with the `blog-google` skill).
2. Pull field CrUX data for `/`, a blog post, and a tool page.
3. Re-score this section with real LCP / INP / CLS.

**Falsifiability:** until field data exists, any performance score in this audit is an estimate and should be labelled as such.

---

## 7. Score: Performance (CWV-estimated) — 75/100 · Images — 84/100

**Performance — 75** (explicitly an estimate; no field/lab data)

| Evidence | Weight |
|---|---|
| ✅ Single 13.8 KB JS file — near-floor for a 300-page site | base |
| ✅ Single 139.5 KB CSS, brotli, immutable 1-year cache | + |
| ✅ Brotli on HTML; zero third-party script on en/fa | + |
| ✅ 0.31–0.74 s edge fetches; Cloudflare CDN | + |
| ✅ `prefetch` disabled; service worker minimal (2.4 KB) | + |
| ❌ **No field or lab CWV data — score is a proxy estimate** | −10 |
| ❌ HTML 135–156 KB raw is heavy as the LCP-blocking resource | −8 |
| ❌ Homepage ~967 KB of imagery with no evidenced responsive variants | −5 |
| ❌ `/ar/` uses 2 third-party font origins while en/fa use none | −2 |

**Images — 84**

| Evidence | Weight |
|---|---|
| ✅ AVIF + WebP, `OptimizedImage` with **required** typed `alt` | base |
| ✅ 0 missing alt text across content | + |
| ✅ Per-entity OG crops via manifest; 276 sitemap image entries | + |
| ✅ Immutable 1-year caching; explicit dimensions → CLS-safe | + |
| ✅ Correct `fetchpriority`/`loading` split on heroes vs secondary | + |
| ❌ Homepage ~967 KB imagery | −10 |
| ❌ All 21 tools share the headline-analyzer OG image (sitemap + social) | −6 |

---

**Next:** `09…` → `10-corrections.md` · back to `FULL-AUDIT-REPORT.md`
