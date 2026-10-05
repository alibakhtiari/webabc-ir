# webabc.ir — SEO / AEO / GEO Audit Package

**Original audit:** 2026-09-22 · Health: 76 / 100  
**Latest audit:** 2026-10-05 · Health: **82 / 100** (up +6 points) · Data: GSC export (2026-07-03 → 2026-10-02) + Search Console API & PSI API.  
**Living Action Plan & Ledger:** [`ACTION-PLAN.md`](./ACTION-PLAN.md) — records all shipped work with commit hashes and schedules upcoming falsifiability clocks.

## Read in this order

| # | File | What it answers | State |
|---|---|---|---|
| 1 | [`ACTION-PLAN.md`](./ACTION-PLAN.md) | **Source of truth**: Completed work ledger, active clocks calendar, strategic decisions | **Living document** |
| 2 | [`AUDIT-REPORT-2026-10-05.md`](./AUDIT-REPORT-2026-10-05.md) | Latest audit: 2026-09-21 collapse analysis, health score 82/100, Persian market review | **Authoritative audit** |
| 3 | [`FULL-AUDIT-REPORT.md`](./FULL-AUDIT-REPORT.md) | Original scorecard and baseline findings from 2026-09-22 | Baseline reference |
| 4 | [`audit-data.json`](./audit-data.json) | Machine-readable findings for diffing between audits | Reference |
| 5 | [`../BLOG-REWRITE-SPEC.md`](../BLOG-REWRITE-SPEC.md) | Binding content contract for all blog edits | **Active gate** |

## Data snapshots

| File | Window | Notes |
|---|---|---|
| [`CTR-BASELINE-2026-10-05.json`](./CTR-BASELINE-2026-10-05.json) | 2026-07-03 → 2026-10-02 | **Latest.** 525 queries. Records permanent competitor exclusion (`ctr_exclusion`: 0.45% with vs 0.65% without). |
| [`CTR-BASELINE-2026-09-27.json`](./CTR-BASELINE-2026-09-27.json) | 2026-06-25 → 2026-09-24 | Historical shifted-window baseline. |

## Detailed Findings Archive (2026-09-22)

| File | Scope |
|---|---|
| [`findings/01-gsc-performance.md`](./findings/01-gsc-performance.md) | Queries, pages, trend, zero-click clusters, striking distance, devices, countries |
| [`findings/02-on-page-serp.md`](./findings/02-on-page-serp.md) | Live titles/descriptions, frontmatter, CTR rewrites, brand SERP, CTA mapping |
| [`findings/03-technical.md`](./findings/03-technical.md) | Crawlability, redirects, sitemap, robots, headers, negotiation, markdown duplicates |
| [`findings/04-schema.md`](./findings/04-schema.md) | JSON-LD inventory, entity graph integrity, deprecation compliance, `speakable` |
| [`findings/05-content-blog.md`](./findings/05-content-blog.md) | Inventory, thin content, cannibalization clusters, freshness, locale differentiation |
| [`findings/06-i18n-hreflang.md`](./findings/06-i18n-hreflang.md) | Hreflang emission, sitemap parity, RTL, geo-redirect, locale parity |
| [`findings/07-aeo.md`](./findings/07-aeo.md) | Answer-engine readiness: negotiation, quotable blocks, answer-first formatting |
| [`findings/08-geo-ai-citations.md`](./findings/08-geo-ai-citations.md) | AI crawler permissions, `llms.txt`, entity footprint, citation testing |
| [`findings/09-performance-images.md`](./findings/09-performance-images.md) | Page weight, caching, encoding, fonts, OG images |
| [`findings/10-corrections.md`](./findings/10-corrections.md) | Historical corrections log from previous audit |

## Conventions (binding for future edits)

- **Evidence before synthesis.** Every claim cites a source path, a live HTTP result, or a recomputed GSC figure. No fabricated statistics, ever.
- **Trailing-slash trap.** GSC Pages lists `/x/` and `/x` separately — always sum both rows.
- **Table discipline.** Every `|` inside a table cell raggeds the table. Never put raw pipes (even in backticks) in cell text.
- **No backdating.** `date:` history stands; every `updatedDate` bump ships in the same commit as its content edit.
- **Blog gates.** `verify-blog-spec.py` (1500–2400 words) and `verify-blog-parity.py` must stay green; `category` stays English in all locales.
