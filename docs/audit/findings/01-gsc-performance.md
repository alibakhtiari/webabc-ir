# GSC Performance Analysis — webabc.ir

**Source:** `webabc.ir-Performance-on-Search-2026-09-21.xlsx`
**Window:** 2026-06-19 → 2026-09-18 (92 days) · Search type: **Web** · Date filter: **Last 3 months**
**Sheets parsed:** Chart (92 daily rows), Queries (416), Pages (289), Countries (118), Devices (4), Search appearance (2), Filters

All figures below were recomputed directly from the workbook, not copied from any prior report.

---

## 1. Headline numbers

| Metric | Value |
|---|---|
| Clicks | **124** |
| Impressions | **31,561** |
| CTR | **0.39%** |
| Distinct queries | 416 |
| Distinct page rows | 289 (→ 229 after normalising trailing slash) |
| Distinct countries | 118 |

**The single most important structural fact:** `/en/tools/headline-analyzer/` accounts for **25,743 impressions = 81.6% of all site impressions**, and converts at **0.12% CTR** at position 13.97.

The site does not have a traffic problem spread across many pages. It has **one** page carrying 4/5 of its visibility, sitting on page 2, earning essentially nothing.

---

## 2. Monthly trend — the site is ramping

| Month | Clicks | Impressions | Impr/day |
|---|---|---|---|
| 2026-06 (partial, from 06-19) | 4 | 399 | 33 |
| 2026-07 | 9 | 845 | 27 |
| 2026-08 | 60 | 17,298 | 558 |
| 2026-09 (to 09-18) | 51 | 13,019 | 723 |

Impressions/day grew **27 → 723 (~27×) across three months**. Best days: 2026-08-23 (12 clicks / 1,510 impr), 2026-08-25 (9/1,324), 2026-08-24 (8/1,231).

**Interpretation (THINK → CONNECT):** indexing and query-matching are *not* the bottleneck — Google is expanding the site's query footprint fast. The bottleneck is downstream: positions and snippets. This changes the priority order — this is a **conversion-of-existing-visibility** problem, not a "get indexed" problem.

---

## 3. Zero-click analysis (the core finding)

- **398 of 416 queries (96%) produced zero clicks.**
- Those zero-click queries carry **71.6% of all impressions**.
- The **top 10 queries by impression = 71.9% of all impressions but only 19 clicks.**
- Zero-click queries with ≥150 impressions: **12 queries / 18,005 impressions**.

### The title/headline intent cluster — 75% of the site's visibility

Aggregating 23 distinct queries matching title / headline / title-tag intent:

> **23,814 impressions · 9 clicks · 0.04% CTR**
> = **75.4% of all impressions, 7.3% of all clicks**

| Query | Impr | Clicks | CTR | Pos |
|---|---:|---:|---:|---:|
| `seo title checker for blog by webnewstips com` | 10,157 | 0 | 0.00% | **5.55** |
| `seo title checker` | 3,938 | 3 | 0.08% | 16.80 |
| `title checker seo` | 2,803 | 0 | 0.00% | 18.51 |
| `seo title check` | 2,055 | 0 | 0.00% | 27.00 |
| `title seo check` | 1,077 | 0 | 0.00% | 21.01 |
| `check seo title` | 1,006 | 1 | 0.10% | 22.54 |
| `title checker` | 522 | 2 | 0.38% | 16.56 |
| `headline checker` | 382 | 0 | 0.00% | 29.13 |
| `seo headline checker` | 380 | **13** | **3.42%** | 21.27 |
| `title tag checker` | 372 | 0 | 0.00% | 20.52 |
| `title seo checker` | 333 | 2 | 0.60% | 22.47 |
| `check title seo` | 178 | 0 | 0.00% | 16.85 |
| `title analyzer` | 181 | 0 | 0.00% | 26.11 |
| `title tag preview` | 152 | 0 | 0.00% | 17.70 |
| `blog title checker` | 138 | 0 | 0.00% | **10.25** |
| `seo headline` | 126 | 0 | 0.00% | 19.08 |
| `moz title tag checker` | 123 | 0 | 0.00% | 15.26 |
| `title tag preview tool` | 103 | 0 | 0.00% | 19.63 |
| (+ 5 more below 100 impr) | | | | |

**Control experiment inside your own data:** `seo headline checker` converts at **3.42% at position 21.27**, while `seo title checker` converts at **0.08% at position 16.80** — 43× better CTR *from a worse position*. The differentiator is not rank, it is **query-to-snippet match**. When the query says "headline", the title matches and users click. When the query says "title", the title does not lead with that word and nobody clicks.

**Leading indicator to monitor:** blended CTR on the headline-analyzer page. If a title/description rewrite is working, CTR moves first (days–weeks), position follows (weeks–months).

---

## 4. The competitor-brand query trap (Critical)

`seo title checker for blog by webnewstips com` — **10,157 impressions at position 5.55 (page 1) with 0 clicks.**

This is a *navigational query for another brand*. Google is serving webabc.ir inside it because the on-page relevance is high, but searchers are looking for webnewstips' tool and will not click a stranger.

**Two consequences:**
1. This single query is **32% of the site's total impressions** and contributes **zero** value. It inflates the impression denominator, which makes every CTR metric on the property look worse than reality.
2. It is unfixable *as traffic*. You cannot win someone else's branded navigational query. The correct response is to **stop counting it as an opportunity** and ensure the page title does not mirror the competitor's product name (see `02-on-page-serp.md`).

**Falsifiability check:** if after title differentiation this query still shows 10k+ impressions and 0 clicks, it is structural — exclude it from CTR targets rather than chasing it.

---

## 5. Page-level performance

### Pages that earned clicks (39 of 289 rows)

| Page | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| `/en/` | 34 | 126 | **26.98%** | 5.08 |
| `/en/tools/headline-analyzer/` | 30 | 25,743 | 0.12% | 13.97 |
| `/fa/blog/website-speed-optimization-pricing-guide-2026/` | **13** | 177 | **7.34%** | 14.28 |
| `/fa/tools/slug-generator` | 3 | 7 | 42.86% | 8.71 |
| `/en/blog/seo-best-practices/` | 2 | 351 | 0.57% | 8.94 |
| `/fa/portfolio/ramzarz-negaran/` | 2 | 226 | 0.88% | 6.85 |
| `/fa/service-areas/muscat/` | 2 | 146 | 1.37% | 10.58 |
| `/en/` (non-slash variant) | 2 | 27 | 7.41% | 4.19 |
| `/en/tools/cost-calculator/` | 2 | 23 | 8.70% | 52.65 |
| `/en/tools/glassmorphism-generator/` | 2 | 21 | 9.52% | 15.05 |
| `/en/blog/seo-checklist-2026/` | 2 | 11 | 18.18% | 10.36 |

**Best-performing content formula (the site's proof point):**
`/fa/blog/website-speed-optimization-pricing-guide-2026/` → **13 clicks = 10.5% of all site clicks from 0.6% of impressions**, at 7.34% CTR from position 14.28.

**Pricing/intent content in Persian converts.** This is the highest-leverage pattern on the property: it beats the headline-analyzer's CTR by 61× from a comparable position. Replicate it (see `05-content-blog.md` §4).

### Striking-distance pages (positions 4–20, ≥50 impr)

| Page | Impr | Clicks | Pos | Read |
|---|---:|---:|---:|---|
| `/en/tools/headline-analyzer/` | 25,743 | 30 | 13.97 | Own it → page 1 |
| `/fa/portfolio/ramzarz-negaran/` | 226 | 2 | 6.85 | CTR 0.88% at pos 6.8 — snippet failing |
| `/ar/` | 232 | 0 | **5.01** | Top-5 homepage, zero clicks |
| `/en/blog/seo-best-practices/` | 351 | 2 | 8.94 | Page 1, 0.57% CTR |
| `/en/service-areas/tehran/` | 166 | 0 | 16.67 | Page 2, zero clicks |
| `/fa/service-areas/muscat/` | 146 | 2 | 10.58 | Bottom page 1 |
| `/fa/portfolio/soheil-accessory/` | 122 | 0 | 6.38 | Top-7, zero clicks |
| `/fa/portfolio/mehromah-qazvin/` | 69 | 0 | 10.52 | Page 1, zero clicks |
| `/en/services/local-seo/` | 69 | 0 | 14.80 | Page 2 |
| `/en/blog/web-design-trends/` | 19 | 1 | 7.89 | Converts (5.26%) |

**`/ar/` at position 5.01 with 0 clicks across 232 impressions** is the clearest snippet failure outside the tool cluster: a top-5 Arabic homepage earning nothing.

### Pages buried beyond page 2 (need depth/links, not titles)

| Page | Impr | Pos |
|---|---:|---:|
| `/en/services/web-design/` | 184 | **87.91** |
| `/fa/service-areas/qazvin/` | 224 | 60.43 |
| `/fa/services/local-seo/` | 159 | 37.01 |
| `/fa/service-areas/tehran/` | 89 | 76.66 |
| `/fa/service-areas/dubai/` | 152 | 42.66 |
| `/en/tools/seo-title-checker/` (legacy, 301) | 115 | 63.81 |

Position 87.9 and 76.7 indicate the pages are indexed but not competitive for the query — a **relevance/depth/internal-link deficit**, not a meta-tag problem.

---

## 6. Trailing-slash duplicates

- 289 page rows → **229 unique URLs** after stripping trailing slash.
- **60 duplicate pairs** (URL appears both with and without `/`).
- Impressions inside duplicate pairs: **29,000 of 32,016 page-row impressions (~90.6%)**.

| URL | `/` impr/pos | no-`/` impr/pos |
|---|---|---|
| `/en/tools/headline-analyzer` | 25,743 / 13.97 | 230 / **57.14** |
| `/fa/portfolio/ramzarz-negaran` | 226 / 6.85 | 105 / 7.11 |
| `/fa/service-areas/qazvin` | 224 / 60.43 | 47 / 71.50 |
| `/en/tools/seo-title-checker` | 115 / 63.81 | 127 / 56.24 |
| `/en/service-areas/tehran` | 166 / 16.67 | 15 / 10.34 |
| `/en/service-areas` | 81 / 23.16 | 62 / 53.39 |

**Verified live 2026-09-22:** the edge now returns a correct **301** for every non-slash variant tested (4/4), and legacy slugs 301 straight to `headline-analyzer/`. The duplicate rows in this workbook are therefore **historical** — they record positions earned *before* the redirect existed.

**Action is monitoring, not code.** Re-export GSC in 4 weeks; the non-slash rows should decay to zero.

---

## 7. Legacy URLs still visible in GSC (15 URLs not in sitemap)

All 15 GSC URLs absent from the sitemap are retired URLs still carrying historical impressions:

- `/en|fa|ar/tools/seo-title-checker/`, `/…/serp-preview/` → now 301 → `headline-analyzer/`
- `/en|fa|ar/blog/*-2025/` → 301 → year-free slugs
- `/en|fa/services/modern-web-development/` → 301 → `web-development/`
- `https://webabc.ir/` → excluded from sitemap by the `astro.config.mjs` filter (see `03-technical.md` §4)

---

## 8. Devices

| Device | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| Desktop | 81 | 18,700 | 0.43% | 18.34 |
| Mobile | 43 | 12,768 | 0.34% | **14.50** |
| Tablet | 0 | 93 | 0.00% | 29.40 |

Mobile ranks **3.8 positions better** than desktop but converts worse (0.34% vs 0.43%). Mobile gets more page-1 exposure and still loses the click → **the snippet is not mobile-compelling**, and/or the SERP is more competitive on mobile. Mobile is where the leverage is (59% of traffic is desktop, but mobile has the better position distribution).

---

## 9. Countries

| Country | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| United States | 46 | 18,708 | 0.25% | 12.96 |
| **Iran** | **52** | 3,084 | **1.69%** | 27.40 |
| United Kingdom | 0 | 1,793 | 0.00% | 24.32 |
| India | 6 | 1,253 | 0.48% | 18.60 |
| Germany | 0 | 1,160 | 0.00% | 20.59 |
| Canada | 1 | 991 | 0.10% | 14.13 |
| Switzerland | 0 | 407 | 0.00% | 18.58 |
| Austria | 0 | 400 | 0.00% | 17.79 |
| France | 0 | 324 | 0.00% | 16.88 |

**The strategic read:**

- **Iran is the only market that converts** — 6.76× the US CTR from a *worse* position (27.4 vs 12.96). Persian content has genuine product-market fit.
- **The US carries 59% of impressions at 0.25% CTR** — and almost all of that is the headline-analyzer query cluster, most of which is competitor-branded or page-2.
- **Four European markets (UK/DE/CH/FR = 3,684 impressions) produced exactly 0 clicks.**

The English-language corpus is generating substantial Anglophone impressions and converting none of them. Combined with §3, the pattern is consistent: **English tool queries are dominated by one competitor-branded term; English commercial queries rank too low (positions 14–88).**

---

## 10. Search appearance

| Appearance | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| Translated results | 0 | 170 | 0.00% | **92.88** |

Position 92.88 means translated-result variants are effectively unranked. hreflang markup is emitted correctly on all indexable pages (verified in `06-i18n-hreflang.md`), so this is **not** a markup defect to chase — translated-result eligibility is Google-selected. No action beyond maintaining en/fa/ar parity.

---

## 11. What this sheet does *not* tell us

Recorded honestly so the action plan does not over-claim:

- **No Core Web Vitals / page-experience data** — this is a performance report only.
- **No data on 93 of the 306 sitemap URLs** (see `03-technical.md` §4) — they earned zero impressions in 92 days.
- **No backlink / referring-domain data.**
- **No query-to-page mapping** — GSC's Pages and Queries sheets are independent; cluster attribution to `/en/tools/headline-analyzer/` is inferred from topic + the page's 81.6% impression share, not directly asserted by the export.

---

**Next:** `02-on-page-serp.md` · `03-technical.md` · `05-content-blog.md`
