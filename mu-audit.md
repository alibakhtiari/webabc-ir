# mu-audit — webabc.ir (2026-10-05)

Mini-audit with the updated SEO + Blog skills and live Google data. Read
[`docs/audit/ACTION-PLAN.md`](docs/audit/ACTION-PLAN.md) for the full ledger;
this file adds only what is new or actionable. It proposes **no edits to any
page under an unexpired falsifiability clock** (`AGENTS.md` §5) and no new
blog posts (the 10-05 verdict stands).

## Data used

| Source | Window | Notes |
|---|---|---|
| `webabc.ir-Performance-on-Search-2026-10-05.xlsx` | 2026-07-03 → 2026-10-02 | 297 page rows, 525 query rows (first export with queries) |
| GSC Search Analytics API (`gsc_query.py`, query×page, 28d) | → ~2026-10-02 | **Query→page attribution the xlsx cannot give**; 396 rows, 37c / 9,880i |
| PSI Lighthouse lab (`pagespeed_check.py`, mobile, 2026-10-05) | point-in-time | **Lab only** — CrUX 404s below threshold, so no field metrics exist |

Conventions honored throughout: trailing-slash rows summed before comparing;
webnewstips competitor query excluded from every CTR figure (Queries sheet
only — it has no page dimension); GSC lags 2–3 days, so ≤10-day-old edits are
unmeasurable, not failed.

## Grade report (reads only — no action)

| Check | Read | Verdict |
|---|---|---|
| §1.3 headline-analyzer | API 28d: 14c / 8,104i, CTR **0.17%** (was 0.12%); position ~13.7 vs 13.97 | Moving, directionally right. Clock to 10-27 **unexpired — touch nothing** |
| `webabc` brand | API: 16c / 34i @ **1.7** (was 3.27–3.41) | Brand owns position 1. External-competition thesis confirmed; §3.5 escalation logic holds |
| `ويب سي` | API 28d: 130i, 0 clicks | Flat, as expected 6 days post-title. Clock to 11-10, no action |
| webnewstips | API 28d: 763i, 0 clicks @ ~5.5 | Byte-identical behavior. Exclusion **permanent** |
| Title long-tail → headline-analyzer | `title tag preview tool` 112i @20.0, `tester` 97i @17.3, `moz` pair 257i @10–15, `headline checker` 189i @19.2 — all serve the tool page | Supports the §1.3 read; grading only until 10-27 |
| Cluster re-open (API attribution) | A/D/E/F/G: **0 shared queries**. B: 2 shared Arabic queries, 10i total, 0 clicks | Below any action threshold (merges need 30–45% cuts). **Watch only** |
| `Translated results` | 0c / 210i @ 93.15 | Flat. Clock to 11-24, no action |
| PSI lab | headline-analyzer 100 (LCP 1.4s) · `/fa/` 98 (LCP 2.4s) · web-design 97 (LCP 2.3s); TBT 0, CLS 0 everywhere | All green. §4.10 stays closed. Lab only, never cite as field |
| Tehran Persian queries (NEW attribution) | `طراحی سایت در تهران` 105i + `طراحی سایت تهران` 73i → `/fa/service-areas/tehran/` @ ~77 | Confirms the §3.1 target, still buried, still clocked to 11-24 — no action |

## Actionable tasks

### MU-1 — Decide the utm-builder query fate (SEO, diagnose-then-decide)

- **Observation (first principle):** `url builder` earns 81i @ 41.2 → `/en/tools/utm-builder/`, but the page already names the query (title 60ch, desc 142ch) and already holds **23 inbound links** — snippet and equity levers are spent.
- **SERP reality (websearch 2026-10-05):** the query is owned by dedicated builders (utmbuilder.net/.com, utm.io, Google's own Campaign URL Builder). Out-ranking them with tweaks is not a plan.
- **Do:** either (a) differentiate toward an underserved angle with query evidence, or (b) formally accept positions 30–50 long-tail trickle. Do NOT rewrite the snippet again.
- **Falsifiability:** a differentiated angle ships with its own query evidence, or the accept-decision is recorded with this data. Revisit only if the query passes 200i/28d.
- **Clock-clean:** untouched since 2026-09-26; no open clock names it.

### MU-2 — Resolve the moz post vs tool page split (SEO/blog, decision)

- **Observation:** `moz title checker` (113i @10.3) + `moz title tag checker` (144i @15.4) both serve `headline-analyzer`, never `moz-title-checker-alternatives` (the post built 2026-09-22 to catch them).
- **Do:** either (a) sharpen the post into a true alternatives-shootout the tool page cannot be (data-led, no invented scores), or (b) accept the tool page as canonical and leave the post as supporting coverage. Do not merge without the 30–45% cut math from §2.3.
- **Falsifiability:** moz queries attribute to the post, or the accept-decision is recorded. Revisit at the next export.
- **Clock-clean:** §2.6 constrains *producing pricing content*, not this post. (Conservative note: same batch — one edit max, then hands off until 11-16.)

### MU-3 — Capture an `seo drift` baseline on the money pages (measurement, no page edits)

- **Observation:** no drift baseline exists, so every future "did X move" argument re-diffs exports by hand.
- **Do:** run the skill's drift baseline for headline-analyzer, fa speed-pricing, ramzarz-negaran, `/fa/`, `/en/services/web-design/`. Zero production impact by construction.
- **Falsifiability:** `drift compare` runs clean at the next export.

### MU-4 — Owner-gated items (not code tasks — waiting on human)

- Agency LinkedIn/X URLs → wire into `Organization.sameAs` on delivery (§3.3).
- GEO 5-prompt baseline → parked ("not now"); re-offer with §4.11.
- remido/odyps/samake metric nuances + Rank-1 reality check → need business labels only the owner has.

## Explicit non-tasks (audited, deliberately left alone)

- **No new blog posts.** Every demand cluster has a dedicated asset; the only unserved queries are navigational/competitor (`webnewstips`, `moz` navigational intent, `remido` brand) or already-covered long-tail.
- **No edits to clocked or freshly-edited pages:** headline-analyzer, `/ar/`, remido portfolio, pricing post, buried pages, fa home title, fa calculator, fa seo page, cost-guide Gulf sentences (all ≤10 days old or clocked to 10-19…11-24).
- **No AEO/GEO code tasks.** Schema graph, llms.txt parity, OG localization, and discovery headers are shipped and gated green; remaining GEO work is measurement + off-site (owner-gated above).
- **No performance tasks.** PSI lab is green on money pages; field data does not exist (CrUX below threshold) and must never be reported as measured.

## Housekeeping (not SEO, for the record)

- `.gitignore` carries uncommitted credential-ignore additions; `public/images/og/fa/portfolio/remido.webp` shows a 48-byte diff. Neither is from audit work — commit or revert at the owner's convenience.
