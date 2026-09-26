# webabc.ir — SEO / AEO / GEO Audit Package

**Audit date:** 2026-09-22 · **Overall health: 76 / 100**

Data source: `../../webabc.ir-Performance-on-Search-2026-09-21.xlsx` (GSC, Search type Web, 2026-06-19 → 2026-09-18) plus live HTTP verification and full source inspection of the Astro + Cloudflare Workers codebase.

---

## Read in this order

| # | File | What it answers |
|---|---|---|
| 1 | [`FULL-AUDIT-REPORT.md`](./FULL-AUDIT-REPORT.md) | Scorecard, the 5 findings that matter, market read |
| 2 | [`ACTION-PLAN.md`](./ACTION-PLAN.md) | Sequenced work with a falsifiability check per item |
| 3 | [`audit-data.json`](./audit-data.json) | Machine-readable findings for diffing between audits |

## Findings (detail)

| File | Scope |
|---|---|
| [`findings/01-gsc-performance.md`](./findings/01-gsc-performance.md) | 416 queries, 289 pages, monthly trend, zero-click clusters, striking distance, devices, countries |
| [`findings/02-on-page-serp.md`](./findings/02-on-page-serp.md) | Titles/descriptions live + all 108 frontmatter, CTR rewrites, brand SERP, CTA mapping |
| [`findings/03-technical.md`](./findings/03-technical.md) | Crawlability, redirects, sitemap, robots, headers, content negotiation, the blank-404 bug, markdown duplicates |
| [`findings/04-schema.md`](./findings/04-schema.md) | Live JSON-LD inventory, entity graph integrity, deprecation compliance, `speakable` |
| [`findings/05-content-blog.md`](./findings/05-content-blog.md) | Inventory, thin content, 7 cannibalization clusters, freshness/bulk-date pattern, locale differentiation, taxonomy |
| [`findings/06-i18n-hreflang.md`](./findings/06-i18n-hreflang.md) | hreflang emission, sitemap parity, RTL, geo-redirect, locale quality parity |
| [`findings/07-aeo.md`](./findings/07-aeo.md) | Answer engine readiness: negotiation, quotable blocks, answer-first formatting, human handoff |
| [`findings/08-geo-ai-citations.md`](./findings/08-geo-ai-citations.md) | AI crawler permissions, `llms.txt`/`llms-full.txt`, entity footprint, citation testing |
| [`findings/09-performance-images.md`](./findings/09-performance-images.md) | Page weight, caching, encoding, fonts, OG images — **includes the measurement-limitation note** |
| [`findings/10-corrections.md`](./findings/10-corrections.md) | What the previous audit got wrong (13 claims), what it missed (14 defects), what it got right |

## Superseded

The 2026-09-21 report was retired: it contained factual errors now catalogued in [`findings/10-corrections.md`](./findings/10-corrections.md). Its files were removed during docs consolidation and remain recoverable from git history (see `8e06389`). **Do not act on it.**

---

## Evidence standard

Every claim in this package cites either:

- a **source path** (with line number where relevant), e.g. `src/layouts/Layout.astro:264-279`, or
- a **live HTTP result** captured 2026-09-22, e.g. `HTTP/2 404 · content-length: 0`, or
- a **recomputed figure** from the GSC workbook, e.g. `23,814 impressions · 9 clicks`.

Where data does **not** exist, that is stated rather than estimated — notably Core Web Vitals (`09-performance-images.md` §6) and citation performance (`08-geo-ai-citations.md` §7).

## Scoring weights

From the `seo` skill: Technical 22 · Content 23 · On-Page 20 · Schema 10 · Performance 10 · AI Search 10 · Images 5.
