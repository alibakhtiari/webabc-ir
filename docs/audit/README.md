# webabc.ir — SEO / AEO / GEO Audit Package

**Living Action Plan & Ledger:** [`ACTION-PLAN.md`](./ACTION-PLAN.md) — records all shipped work with commit hashes, baseline Search Console data, and schedules upcoming falsifiability clocks.

## Source of Truth

| File | What it answers | State |
|---|---|---|
| [`ACTION-PLAN.md`](./ACTION-PLAN.md) | **Single Source of Truth**: Completed work ledger, baseline metrics, active clocks calendar, strategic decisions | **Living document** |
| [`../BLOG-REWRITE-SPEC.md`](../BLOG-REWRITE-SPEC.md) | Binding content contract for all blog edits (enforced by `scripts/verify-blog-spec.py`) | **Active gate** |

## Data snapshots

| File | Window | Notes |
|---|---|---|
| [`CTR-BASELINE-2026-10-05.json`](./CTR-BASELINE-2026-10-05.json) | 2026-07-03 → 2026-10-02 | 525 queries. Records competitor exclusion (`ctr_exclusion`: 0.45% with vs 0.65% without). |
| [`DRIFT-BASELINE-2026-10-05.json`](./DRIFT-BASELINE-2026-10-05.json) | 2026-09-07 → 2026-10-02 (28d) | Search Console API drift baseline for core money assets. |
| [`CTR-BASELINE-2026-09-27.json`](./CTR-BASELINE-2026-09-27.json) | 2026-06-25 → 2026-09-24 | Historical baseline. |

## Conventions (binding for future edits)

- **Evidence before synthesis.** Every claim cites a source path, a live HTTP result, or a recomputed GSC figure. No fabricated statistics, ever.
- **Trailing-slash trap.** GSC Pages lists `/x/` and `/x` separately — always sum both rows.
- **Table discipline.** Every `|` inside a table cell raggeds the table. Never put raw pipes (even in backticks) in cell text.
- **No backdating.** `date:` history stands; every `updatedDate` bump ships in the same commit as its content edit.
- **Blog gates.** `verify-blog-spec.py` (1500–2400 words) and `verify-blog-parity.py` must stay green; `category` stays English in all locales.
