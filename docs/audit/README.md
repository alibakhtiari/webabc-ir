# webabc.ir — SEO / AEO / GEO Audit Package

**Original audit:** 2026-09-22 · Overall health: 76 / 100 · Data: GSC 2026-06-19 → 2026-09-18 plus live HTTP verification and full source inspection.
**Now:** nearly every item is shipped and live. [`ACTION-PLAN.md`](./ACTION-PLAN.md) is the source of truth — its Completed ledger records what closed and in which commit; its open sections (§1.3, §2.6, falsifiability clocks) record what is still being measured.

## Read in this order

| # | File | What it answers | State |
|---|---|---|---|
| 1 | [`FULL-AUDIT-REPORT.md`](./FULL-AUDIT-REPORT.md) | Scorecard, verdict, market read at audit time | Historical — do not act on numbers without checking the ledger |
| 2 | [`ACTION-PLAN.md`](./ACTION-PLAN.md) | Sequenced work, falsifiability checks, per-item shipped evidence | **Living document** |
| 3 | [`audit-data.json`](./audit-data.json) | Machine-readable findings for diffing between audits | Reference |
| 4 | [`../BLOG-REWRITE-SPEC.md`](../BLOG-REWRITE-SPEC.md) | Binding content contract for all blog edits | **Active gate** |

## Data snapshots

| File | Window | Notes |
|---|---|---|
| [`CTR-BASELINE-2026-09-27.json`](./CTR-BASELINE-2026-09-27.json) | 2026-06-25 → 2026-09-24 | Holds the §1.4 CTR-exclusion convention (`ctr_exclusion`) — still authoritative |
| [`CTR-BASELINE-2026-10-05.json`](./CTR-BASELINE-2026-10-05.json) | 2026-07-03 → 2026-10-02 | **Latest.** First export with per-query rows (525). Verdict: optimize, no new posts |

Superseded snapshots (`CTR-BASELINE-2026-09-26.json`, `TOOL-METADATA-2026-09-26.json`) were removed; they remain in git history.

## Findings (detail — evidence layer, cited by plan rows)

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
| [`findings/10-corrections.md`](./findings/10-corrections.md) | What the previous (09-21) audit got wrong, missed, and right — historical |

## Conventions (binding for future edits)

- **Evidence before synthesis.** Every claim cites a source path, a live HTTP result, or a recomputed GSC figure. No fabricated statistics, ever.
- **Trailing-slash trap.** GSC Pages lists `/x/` and `/x` separately — always sum both rows.
- **Table discipline.** Every `|` inside a table cell raggeds the table. Never put raw pipes (even in backticks) in cell text.
- **No backdating.** `date:` history stands; every `updatedDate` bump ships in the same commit as its content edit.
- **Blog gates.** `verify-blog-spec.py` (1500–2400 words) and `verify-blog-parity.py` must stay green; `category` stays English in all locales.
