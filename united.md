# united.md — webabc.ir united action plan (2026-10-05)

Combines [`mu-audit.md`](./mu-audit.md), [`sb-audit.md`](./sb-audit.md) and
[`fa-audit.md`](./fa-audit.md) into one plan. Every claim below was re-verified
against primary sources before merging — §0 lists what was **corrected or
rejected**, so this file supersedes the three inputs wherever they disagree.
[`docs/audit/ACTION-PLAN.md`](docs/audit/ACTION-PLAN.md) remains the shipped-work
ledger; this file is the forward plan only.

## Sources and method

| Source | Window | Notes |
|---|---|---|
| `webabc.ir-Performance-on-Search-2026-10-05.xlsx` | 2026-07-03 → 2026-10-02 | 297 page rows, 525 query rows |
| GSC API `gsc_query.py` (query×page) | 28d → ~2026-10-02 | query→page attribution the xlsx cannot give |
| GSC API pre/post split | 2026-08-24→09-20 vs 09-21→10-03 | collapse verification (§0.1) |
| GSC URL Inspection API | 2026-10-05 | index status, canonical, rich results |
| PSI Lighthouse lab (mobile) | 2026-10-05 | **lab only** — CrUX 404s below threshold, no field data exists |
| Repo inspection | HEAD | every file/line claim re-checked; no trust-me citations |

Conventions: slash-variant rows summed; webnewstips excluded from CTR (Queries
sheet only); ≤10-day-old edits are unmeasurable, not failed; no fabricated
statistics — every number below names its source.

## §0. Verified corrections (what the inputs got wrong)

- **§0.1 The 09-21 collapse is real — reproduced independently.** Pre 793 impr/day
  → post 104/day; `/en/tools/headline-analyzer/` 676.6 → 3.7/day (-99.5%, 91% of
  all lost volume). CTR 0.39% → 1.54% (the lost impressions never clicked).
  URL Inspection 2026-10-05: indexed PASS, crawled 10-03 mobile, canonical match,
  rich results PASS — ranking event, not a technical fault. **Causality safe:**
  the collapse (09-21) predates the §1.3 title ship (09-29).
- **§0.2 Consequence for the §1.3 clock:** at ~4 impr/day there may be **no data
  to read on 10-27** — CTR off 0.12% is ungradeable with zero impressions. If the
  page is still at ~0 impressions on 10-27, the read is "no signal", not
  "title failed". Do not re-test a leading noun into a vacuum; diagnose
  distribution first.
- **§0.3 sb-audit T3 scheduling was stale.** It pairs the remido title trim with
  "the description rewrite lands then" — but §3.2b **already shipped 09-29**.
  Title (65ch verified) and description read as one snippet under the 10-19
  clock: the trim ships **at** the 10-19 read, not now.
- **§0.4 sb-audit T2 conflicts with the §3.2 clock.** `/ar/` title is clocked to
  10-19 with the shipped description. Adding `ويب سي` now destroys that read.
  Deferred to 10-19 (combine: if CTR still 0, ship title + description together).
- **§0.5 sb-audit T6 is dead on current data.** Muscat query volume is ~2i/28d
  (page 1c/2i); the 92d figures describe a demand window that has closed. Index
  retitle downgraded to watch — no demand, no task.
- **§0.6 Dubai split is real but anemic** (blog 16i @54.6 + area 16i @42.5, plus
  2i split 1/1). Watch, not P1.
- **§0.7 fa-audit "no SpeakableSpecification in src" is false.** It exists in
  `src/pages/[lang]/blog/[slug].astro:156-157`. Narrowed truth: absent from
  **tool layouts** — but ToolLayout is shared with clocked pages, so schema work
  there waits for post-10-27.
- **§0.8 fa-audit 4.1/4.3/4.4/4.5 vs clocks.** Area H2 rewrites (§3.1 clock 11-24),
  speed-post H2 work (fresh Gulf sentences), calculator price-table/FAQ (fresh
  06ee87a retarget), `/fa/` body rewrite (title clock 11-10): all deferred with
  explicit dates below. What was checkable now got checked: both earning posts
  ARE prominent in fa `llms-full.txt` (index lines 110–111, bodies at
  lines 156/260 of 1481) — no reorder needed.
- **§0.9 B-cluster "re-open" fails its own trigger.** 2 shared Arabic queries,
  10i/28d, 0 clicks — below any merge-or-split threshold. Watch only.

## §1. Do now (clock-clean, verified actionable)

### U-1 · T6 index cannibalization is a non-issue; T7 Tehran split is real — fix the indexes, spare the blog
- **Evidence:** `ecommerce web design tehran` → tehran page 21i + **index 7i** + blog 6i + portfolio 1i; the `…website…` variant → **index 11i** + tehran 7i. ~40% of a ~60i/28d cluster leaks to hub/index pages. (sb-audit T7 verified; T6 index rows read 0i/28d — dropped.)
- **Do:** retitle `/en/service-areas/` (and `/en/portfolio/` if it leaks further) to pure hub-and-spoke role, strip city terms from title/H1. **Do not touch** the blog guide (edited ≤10d ago) or any clocked page.
- **Check:** one page holds ≥80% of cluster impressions within 8 weeks.

### U-2 · Qazvin decision (no edit yet)
- **Evidence:** `طراحی سایت در قزوین` 103i/28d @62.2, all on `/fa/service-areas/qazvin/` (92d: 254i). Own-city head term, page seven, deepest location asset, PSI 100.
- **Do:** decide pillar-vs-writeoff **now** (a decision disturbs no clock); execute only post-11-24 (§3.1 clock). No half-measures.
- **Check:** ≥20-position gain in 8 weeks post-execution, or retire the ambition permanently.

### U-3 · Local-proof depth on `/fa/services/local-seo/` (fa-audit 4.2, verified actionable)
- **Evidence:** `خدمات سئو محلی` 146i/92d @35.3 → this page; template verified descriptive (7 H2s, 1 results/portfolio mention); page untouched since the 09-26 refactors; `localSeo.*` namespace is independent of the 06ee87a `seoService` edit.
- **Do:** H2 rework around local-SEO inclusions + Qazvin proof + price band (repo facts only); cross-link from `seo-checklist-2026` and the seo service page.
- **Check:** pos ≤ 20, impressions ≥ 146 retained.

### U-4 · Measurement tasks (zero production impact)
- **Drift baseline** on headline-analyzer, fa speed-pricing, ramzarz-negaran, `/fa/`, web-design (MU-3 — still unexecuted).
- **T1 rebaseline numbers into the baseline JSON note:** 0.45% with (151/33,387) vs **0.65%** without webnewstips — arithmetic verified. Queries-sheet-only rule stands.
- **T10 README fix:** root `README.md:24` claims `FAQPage` for "AI engine citability" — Google retired FAQ rich results 2026-05-07. Keep all schema; correct the sentence to entity/AEO-structure value with no SERP-benefit claim. (Per updated skill: flag at Info, never remove, never add for SERP benefit.)

### U-5 · Ship `ai-catalog.json` (T9)
- **Evidence:** verified absent in `public/`; llms.txt parity exists, agent-catalogue does not.
- **Do:** generate from `scripts/llms-index.data.json` (21 tools + 12 services × locale so it cannot drift); build-time assertion fails if `tools.ts` drifts from it; every URL must resolve 200.
- **Check:** valid JSON, all URLs 200, assertion green in `npm test`.

## §2. Scheduled (dated — do not pull forward)

| When | Task | Why waiting |
|---|---|---|
| 10-19 read | T3 remido title trim (65ch → ≤60) + §3.2b CTR read | same-snippet read (§0.3) |
| 10-19 | T2 `/ar/` title gains `ويب سي` verbatim **iff** CTR still 0 | §3.2 clock (§0.4); keep ≤60 rendered chars |
| 10-19 | T12 `/ar/` LCP fix (PSI lab 3.3s verified 10-05, only perf defect) | page edit mid-clock; diagnose element now, fix then |
| 10-27 read | §1.3 grade (caveat §0.2: no-signal ≠ failed) | clock |
| post-10-27 | SpeakableSpecification on tool layouts (verified absent there) | shared layout touches clocked pages |
| ~11-05 | fa-audit 4.3/4.4 (speed H2, calculator table/FAQ) | 30-day measurement on fresh edits |
| 11-10 | `/fa/` body rewrite (fa-audit 4.5) + brand read | title clock |
| 11-16 | §2.6 pricing-content decision; MU-2 moz decision (one edit max) | clocks/batch |
| 11-24 | §3.1 grades; fa-audit 4.1 area openers; U-2 execution | clocks |

## §3. Owner-gated (not code — waiting on human)

- Agency LinkedIn/X URLs → `Organization.sameAs` on delivery (§3.3).
- GEO 5-prompt baseline → parked; re-offer with §4.11.
- remido/odyps/samake metric nuances + Rank-1 reality check → business labels only the owner has.
- GA4 `ga4_property_id` → unlocks organic traffic + AI-assistant channel data (T14).

## §4. Explicit non-tasks

- No new blog posts (108 posts, demand fully covered; only navigational/competitor gaps remain).
- No edits to clocked/fresh pages (full list in mu-audit §"Explicit non-tasks").
- No AEO/GEO code beyond U-5 + speakable (scheduled): schema graph, llms.txt, OG, discovery all green and gated.
- No performance project: lab is green except T12; field data does not exist and must never be reported.
- No Indexing API submissions for normal pages (policy violation).
- No `WebSite.SearchAction` / `QAPage` / `HowTo` / homepage `BreadcrumbList` / fabricated ratings / root-302-to-301 changes.
