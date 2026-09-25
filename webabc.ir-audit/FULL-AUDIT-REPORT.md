# WebABC (webabc.ir) — Full SEO / AEO / GEO Audit

**Property:** `https://webabc.ir`
**Stack:** Astro 7 (SSG, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`) → Cloudflare Workers (`run_worker_first = true`)
**Locales:** `en` (x-default) · `fa` · `ar` — exact slug parity
**Audit date:** 2026-09-22
**Data source:** `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (GSC, Search type **Web**, 2026-06-19 → 2026-09-18)
**Supersedes:** the 2026-09-21 audit (archived in `stale-2026-09-21/`) — see `findings/10-corrections.md`

---

## 1. Overall health: 76 / 100

| Category | Score | Weight | Weighted |
|---|---:|---:|---:|
| Technical SEO | **84** | 22% | 18.5 |
| Content Quality | **66** | 23% | 15.2 |
| On-Page SEO | **68** | 20% | 13.6 |
| Schema / Structured Data | **88** | 10% | 8.8 |
| Performance (CWV — *estimated, no field data*) | **75** | 10% | 7.5 |
| AI Search Readiness (AEO + GEO) | **81** | 10% | 8.1 |
| Images | **84** | 5% | 4.2 |
| **Weighted total** | | **100%** | **76** |

> **Honesty note:** no Core Web Vitals data exists for this property (no PSI/CrUX credentials configured, and the GSC export contains no page-experience sheet). The Performance score is a **proxy estimate** from measured transfer size, request count, encoding and caching. Every other score carries a cited source path or a live HTTP header dump.

**Verdict:** technically sound, structurally disciplined, but **content-thin and CTR-starved**. The site has a visibility problem it is *winning* (impressions up ~27× in three months) and a conversion-of-that-visibility problem it is *losing* (0.39% CTR, 96% of queries at zero clicks).

---

## 2. The five findings that matter

### ① One page carries 81.6% of all impressions and earns nothing

`/en/tools/headline-analyzer/` = **25,743 impressions, position 13.97, 30 clicks, 0.12% CTR.**

This is not a distributed traffic problem. It is a single page sitting on page 2 for the site's entire query universe.

### ② 75% of site impressions sit behind a 0.04% CTR

23 title/headline-intent queries → **23,814 impressions · 9 clicks**.

The control experiment is inside your own data:

| Query | Impr | Clicks | CTR | Pos |
|---|---:|---:|---:|---:|
| `seo headline checker` | 382 | **13** | **3.42%** | 21.27 |
| `seo title checker` | 3,938 | 3 | 0.08% | 16.80 |

**43× better CTR from a *worse* position.** Rank is not the bottleneck — query-to-snippet match is. When the query says "headline" the title matches and people click; when it says "title" nobody does.

### ③ A competitor's brand name is 32% of your impressions

`seo title checker for blog by webnewstips com` → **10,157 impressions at position 5.55 with 0 clicks.**

You cannot win someone else's navigational query. It inflates the impression denominator and makes every CTR figure on the property look worse than reality. Differentiate the title away from that phrasing, then **exclude it from CTR targets** rather than chasing it.

### ④ 61% of English posts are under 900 words under "Guide" titles

Median post: **598 words.** Minimum: **322 words** (`website-maintenance-security-guide-2026`).

`technical-seo-audit-guide-2026` is **363 words**. `link-building-strategies-guide-2026` is **356**. This is precisely the *presented-as-comprehensive-but-isn't* mismatch the May 2026 Core Update and the March/June 2026 spam provisions target — amplified by a bulk-publish pattern (19/36 posts share one publish date; 26/36 share one update date; only 1 post predates 2026-08-07).

### ⑤ Real users get a blank page on every 404

```
GET https://webabc.ir/en/nope-xyz/  (Chrome UA)
HTTP/2 404
content-length: 0        ← empty body
```

`wrangler.toml` `[assets]` has **no `not_found_handling`**, so `env.ASSETS.fetch()` returns an empty-body 404 that `worker.ts` passes through. Meanwhile `/en/404/` returns a proper 125,693-byte page and agent UAs get a 923-byte markdown recovery doc.

**The site writes recovery documents for machines and hands humans a white screen.** Status code is correct (no indexation damage) — the loss is every user who lands on a moved or mistyped URL.

---

## 3. Scorecard detail

### What is working (protect it)

| Area | Evidence |
|---|---|
| Zero-JS static HTML | 1 JS file, 13,828 B brotli; content readable without execution |
| hreflang | 4-way self-referential on every indexable page, suppressed on noindex; 1,224 sitemap alternates = 4 × 306 |
| Redirects | trailing-slash 301s, legacy merges (4/4 verified live), `/sitemap.xml` → `/sitemap-index.xml`, root geo redirect correctly **302** |
| robots.txt | explicit 10-crawler AI allowlist (OpenAI, Anthropic, Perplexity, Google-Extended, CCBot, Bytespider) |
| `llms.txt` | 166 lines, 12 sections, honest *When NOT to Use* scope, actionable agent invocation instructions |
| Content negotiation | `Accept: text/markdown` fully implemented + 205 markdown siblings + `Vary: Accept` + 406 handling |
| Schema | Organization+ProfessionalService, WebSite, BlogPosting (author `Person` ×7 `sameAs`, `wordCount`), BreadcrumbList, exactly **1** FAQPage, WebApplication |
| Schema discipline | `HowTo` absent (deprecated), ratings gated behind real frontmatter, `QAPage` correctly omitted, `speakable` selectors verified to resolve |
| Template coverage | **100%** FAQ + TLDR on all 108 posts × 3 languages |
| Images | AVIF/WebP, **typed required `alt`**, 0 missing alt, 276 sitemap image entries, immutable caching |
| Best proof point | `/fa/blog/website-speed-optimization-pricing-guide-2026/` → **13 clicks = 10.5% of all site clicks from 0.6% of impressions (7.34% CTR)** |

### What is broken (ranked by impact)

| # | Finding | Severity | File |
|---|---|---|---|
| 1 | 61% of EN posts <900 words under "Guide" titles + bulk date pattern | 🔴 Critical | `05-content-blog.md` |
| 2 | Blank 404 body for real browsers (no `not_found_handling`) | 🔴 Critical | `03-technical.md` §2 |
| 3 | 75% of impressions at 0.04% CTR — title/snippet mismatch | 🔴 Critical | `01-gsc-performance.md` §3 |
| 4 | 205 indexable `.md` duplicates, no canonical, no `Vary` | 🟠 High | `03-technical.md` §7 |
| 5 | 7 cannibalization clusters across ~15 posts | 🟠 High | `05-content-blog.md` §4 |
| 6 | `llms.txt` link graph 61% English while Iran is the only converting market | 🟠 High | `08-geo-ai-citations.md` §3 |
| 7 | Thin off-site footprint — Organization `sameAs` = 3 personal + 1 site | 🟠 High | `08-geo-ai-citations.md` §6 |
| 8 | Homepage excluded from sitemap (undocumented) | 🟠 Medium | `03-technical.md` §3 |
| 9 | Dangling `#webpage` reference; no explicit `WebPage` node | 🟠 Medium | `04-schema.md` §4.1 |
| 10 | All 21 tools share one OG image | 🟡 Medium | `09-performance-images.md` §2 |
| 11 | 6 categories unmapped in `serviceToolDict`; `Performance`/`Speed Optimization` split | 🟡 Medium | `05-content-blog.md` §7 |
| 12 | `/*.html` cache rule never matches directory URLs | 🟡 Low | `09-performance-images.md` §3 |
| 13 | `/ar/` loads 2 third-party font origins; en/fa self-hosted | 🟡 Low | `09-performance-images.md` §4 |
| 14 | Tool count copy: README says 24, `llms.txt` says 23, reality is 21 | 🟡 Low | `05-content-blog.md` §1 |
| 15 | No Core Web Vitals data exists — obtain CrUX | ⚠️ Unknown | `09-performance-images.md` §6 |

---

## 4. Market read (from GSC)

| Market | Impr | Clicks | CTR | Pos | Interpretation |
|---|---:|---:|---:|---:|---|
| **Iran** | 3,084 | 52 | **1.69%** | 27.40 | **The only market that converts** — 6.8× US CTR from a *worse* position |
| United States | 18,708 | 46 | 0.25% | 12.96 | 59% of impressions, dominated by the headline-analyzer cluster |
| UK + DE + CH + FR | 3,684 | **0** | 0.00% | 16–24 | Four European markets, **zero clicks** |

**The strategic conclusion:** Persian content has genuine product-market fit. English content generates volume but no conversion. Arabic is under-optimised (`/ar/` ranks **position 5.01 with 0 clicks across 232 impressions** — the clearest snippet failure outside the tool cluster).

**Yet `llms.txt` exposes 69 English links vs 22 Persian and 20 Arabic** — AI engines reading the site's own self-description see the opposite of the market truth.

Trend is healthy: **27 → 723 impressions/day across three months (~27×)**. Indexing is not the problem; converting the visibility is.

---

## 5. Deliverable index

```
webabc.ir-audit/
├── README.md                        ← start here
├── FULL-AUDIT-REPORT.md             ← this file
├── ACTION-PLAN.md                   ← sequenced work with falsifiability checks
├── audit-data.json                  ← machine-readable findings
├── findings/
│   ├── 01-gsc-performance.md        ← 416 queries, 289 pages, trend, zero-click clusters
│   ├── 02-on-page-serp.md           ← titles/descriptions, CTR rewrites, cannibal CTA map
│   ├── 03-technical.md              ← crawl, redirects, sitemap, 404 bug, headers, negotiation
│   ├── 04-schema.md                 ← JSON-LD inventory + entity graph integrity
│   ├── 05-content-blog.md           ← thin content, 7 cannibal clusters, freshness, taxonomy
│   ├── 06-i18n-hreflang.md          ← hreflang, RTL, locale parity, geo-redirect
│   ├── 07-aeo.md                    ← answer engine readiness
│   ├── 08-geo-ai-citations.md       ← AI crawlers, llms.txt, entity footprint, citation testing
│   ├── 09-performance-images.md     ← page weight, caching, fonts, OG images
│   └── 10-corrections.md            ← what the previous audit got wrong (and right)
└── stale-2026-09-21/                ← superseded report, preserved intact
```

**Every claim in this package carries evidence**: a source path (with line number where relevant) or a live HTTP status/header dump taken 2026-09-22.

---

**Next:** `ACTION-PLAN.md`
