# fa Locale Audit — webabc.ir

**Date:** 2026-10-05 · **Source:** `webabc.ir-Performance-on-Search-2026-10-05.xlsx` (2026-07-03 → 2026-10-02) + codebase inspection
**Baseline:** `docs/audit/CTR-BASELINE-2026-10-05.json` · **Plan:** `docs/audit/ACTION-PLAN.md`
**Skills to use:** `seo` (hub), `seo-geo`, `seo-hreflang`, `seo-sxo`, `blog` (+ `blog-rewrite`, `blog-cluster`, `blog-decay`, `blog-locale-audit`)

---

## 1. Where fa stands

| Metric | Value | vs site |
|---|---:|---|
| fa page impressions | **3,228** | ~9.5% of site |
| fa clicks | **48** | ~32% of site clicks — fa punches 3× above its impression share |
| fa page rows | in Pages sheet with tail-slash splits (always sum both) | — |
| Persian GSC queries | 141 rows, 2,783 impr, 10 clicks | 0.36% CTR — the N opportunity |
| `/fa/` homepage | 54 impr, 1 click, pos 41 | buried |

**fa's winning assets (protect these):**

| URL | Impr | Clicks | Pos | Verdict |
|---|---:|---:|---:|---|
| `/fa/blog/website-speed-optimization-pricing-guide-2026/` | 235 | **18** | 15.2 | sole traffic engine — extend, don't touch clock |
| `/fa/portfolio/ramzarz-negaran/` | 269 | 3 | 6.8 | page-1 portfolio, working |
| `/fa/service-areas/muscat/` | 149 | 3 | 10.5 | Gulf bet paying off |
| `/fa/blog/website-development-cost-calculator-guide-2026/` | 174 | 2 | 31.5 | striking distance on one query, flat elsewhere |
| `/fa/tools/cost-calculator/` | 99 | 2 | 52 | page-5 — needs CTR/intent work |

**fa's bleeding:** `/fa/service-areas/tehran/` 222 impr / 0 clicks / pos 79.5 · `/fa/services/local-seo/` 164 / 0 / 37 · `/fa/service-areas/qazvin/` 340 / 1 / 60.4 · `/fa/services/speed-optimization/` 54 / 0 / 55 · `/fa/services/seo/` 38 / 0 / 91 · `/fa/` home 54 / 1 / 41.

---

## 2. Query-side diagnosis (Persian, 141 queries)

Top Persian queries are **all commercial-local intent** and nearly all sit on page 4–8:

| Query | Impr | Pos | Read |
|---|---:|---:|---|
| `ويب سي` | 285 | 4.9 | brand — 0 clicks, title reinforced §3.5, clock to 2026-11-10 — **do not touch** |
| `طراحی سایت در قزوین` | 254 | 64.6 | core local head term — pos 6.5, never optimised past §3.1 |
| `طراحی سایت در عمان` | 209 | 21.1 | Muscat page exists and converts — push to page 1 |
| `خدمات سئو محلی` | 146 | 35.3 | matches `/fa/services/local-seo/` buried at 37 |
| `رمز ارز نگاران` / `شرکت رمز ارز نگاران` | 186 | 6.7–6.8 | portfolio brand — working |
| `محاسبه آنلاین هزینه طراحی سایت وردپرس` | 122 | 41.5 | WordPress calc intent — cost-calculator targets it (§06ee87a retarget shipped) |
| `چک لیست سئو 2026` | 112 | 36.4 | `/fa/blog/seo-checklist-2026/` at 36.2 — one intent match, needs depth/links |
| `طراحی سایت در تهران` / `طراحی سایت تهران` | 179 | 77–78 | Tehran page buried — §3.1 added FAQs, no movement yet |
| `قیمت بهینه سازی سرعت` | 102 | 26.9 | pricing-intent ↔ speed post mismatch |
| `هزینه افزایش سرعت سایت` | 31 | 8.6 | page-1 strip — only speed query that works |
| `محاسبه هزینه طراحی سایت` / `محاسبه آنلاین هزینه طراحی سایت` | 104 | 34–49 | calculator cluster, split across two queries |
| `سئو سایت در قزوین` / `سئو محلی` / `خدمات سئو و بهینه سازی` / `شرکت طراحی سایت در قزوین` | 128 | 46–88 | local SEO cluster, no page answers it well |

**Pattern:** fa has impressions and zero-click on money queries, positions 30–90. The pages exist; they are not winning. This is a **content-depth + snippet + internal-link** problem, not an indexing problem.

---

## 3. AEO / GEO findings for fa

1. **No Persian answer-first formatting is verified.** Blog posts carry `keyTakeaways` + `faq` frontmatter (GEO hooks) but there is no measurement of whether fa passages get cited. The 5 frozen GEO prompts (ACTION-PLAN §0.3) were never run for fa — Perplexity/ChatGPT citations for Persian queries are untracked.
2. **`llms-full.txt` fa corpus is 236 KB** — healthy in size, but its top URLs are services/areas; the two posts that actually earn clicks (speed-pricing, cost-calculator) are not confirmed as prominent in the fa corpus ordering. Verify ordering, don't assume.
3. **Schema:** `FAQPage` via `FAQ.astro`, `WebPage` node, per-locale `WebSite @id` — all present and gate-tested. **No `SpeakableSpecification` anywhere in `src/`** — leaving a clear AEO surface unclaimed for the headline-analyzer + cost-calculator tools.
4. **`/fa/` homepage answers nothing.** Title reinforced with `(ويب سي)`, 54 impressions at pos 41 — it does not state in the first 100 words what webabc does, for whom, or in which cities.
5. **fa/ar tool pages (headline-analyzer, cost-calculator tools)** — fa cost-calculator ranks 52, headline-analyzer gets ~1 impression: the fa tool intent is uncaptured. `محاسبه آنلاین هزینه طراحی سایت وردپرس` (122 impr) proves the demand exists.

---

## 4. Prioritized action list (fa)

Severity key: 🔴 blocks revenue queries · 🟠 high value · 🟡 medium · ⚪ hygiene.

### 🔴 4.1 Local-intent cluster: qazvin/tehran/dubai/muscat
Impressions: ~1,000 across `طراحی سایت در {قزوین،تهران،عمان،امارات،دبی}`, all pos 21–80.
- Rewrite `/fa/service-areas/qazvin/` and `/fa/service-areas/tehran/` H2 openers to answer "طراحی سایت در X چقدر هزینه دارد و چقدر طول می‌کشد" in 40–60 words (spec §3 H2 opener rule).
- Add one localized proof block per area (Mahsun/Qazvin data already on portfolio pages — reuse, don't invent).
- Internally link qazvin↔tehran↔dubai↔muscat service-area pages from `/fa/` and from `services/web-development`.
- **Skill:** `seo-page` audit first, then `blog-geo` passage check.
- **Falsifiability:** `طراحی سایت در قزوین` moves from pos ~65 toward ≤20 in the next export; `/fa/` CTR > 0.

### 🔴 4.2 `خدمات سئو محلی` (146 impr, pos 35)
- `/fa/services/local-seo/` H2 structure currently descriptive; rework around: what local SEO includes, GMB/GBP setup, Qazvin proof, price band.
- Cross-link from `seo-checklist-2026` (already ranks for `چک لیست سئو 2026`) and from `seoo` service page.
- **Falsifiability:** pos ≤ 20, impressions ≥ 146 retained.

### 🟠 4.3 Speed-pricing query bridge (`قیمت بهینه سازی سرعت` 102 impr @ 26.9)
- The page that ranks is likely `/fa/services/speed-optimization/` (pos 55) and the post ranks for other speed terms. Align one H2 in the speed post to `قیمت بهینه سازی سرعت` phrasing with a real price band (existing repo fact: Mahsun pricing data).
- `هزینه افزایش سرعت سایت` at pos 8.6 proves the post can rank — replicate the format.
- **Falsifiability:** query moves into pos ≤ 15 with clicks ≥ 1/week.

### 🟠 4.4 Calculator cluster (`محاسبه هزینه طراحی سایت` ×2, 226 impr combined, pos 34–52)
- §06ee87a retargeted the fa calculator at the WordPress query — clock is open, **verify it landed**: the WordPress query is still pos 41.5, so the rewrite has not moved it (6–10d exposure is too early, but log the read).
- Add a visible price table + FAQ block on `/fa/tools/cost-calculator/` matching the two phrasings (`محاسبه هزینه طراحی سایت`, `محاسبه آنلاین هزینه طراحی سایت`).
- **Falsifiability:** any of the 3 calculator queries ≤ pos 20 by 2026-11-01.

### 🟠 4.5 fa homepage (`/fa/`)
- First 100 words must state: agency, Qazvin-based, services, Gulf coverage (Oman/UAE), CTA.
- Add a `WebSite`+`Organization` sameAs parity already present — verify in rendered HTML, not source.
- **Falsifiability:** `/fa/` pos < 30 and CTR > 0 in next export.

### 🟡 4.6 Blog consolidation (fa)
- `seo-checklist-2026` (115 impr, pos 36): add 3 H2s answering `چک لیست سئو` sub-intents, link to local-seo service.
- `dubai-uae-web-design-seo-guide-2026` (88 impr, pos 33): merge Dubai/Sharjah/Abu Dhabi subsections into one stronger UAE guide or cut. §2.3 B/D/E/F/G re-check applies — **do not merge while §2.3 clock precedent says demand splits**; re-measure first with `blog-decay`.
- Cost-calculator post (174 impr, pos 31.5): refresh with current Mahsun numbers, re-stamp `updatedDate` same commit.

### 🟡 4.7 GEO/AEO instrumentation
- Add `SpeakableSpecification` to `headline-analyzer` + `cost-calculator` tool layouts (en/fa/ar together, one commit).
- Run the 5 frozen GEO prompts manually for fa and log results in a new `docs/audit/GEO-BASELINE-2026-10-05.md` (parked by owner 2026-09-29 — re-offer; this only *records*, doesn't change URLs).
- Confirm fa `llms-full.txt` corpus ordering puts the two earning posts before long-tail; if not, reorder `scripts/llms-index.data.json`.

### ⚪ 4.8 Hygiene
- `verify-blog-spec.py` covers only 8/38 EN posts; fa has no spec gate. Extend the iteration or add a fa parity check (`blog-locale-audit`).
- `/fa/portfolio/soheil-accessory/` 155 impr, 0 clicks, pos 6.3 — page-1 with no clicks; audit its title/snippet (`seo-sxo`).

---

## 5. Explicitly do NOT touch (open clocks)

| Clock item | Due | Why |
|---|---|---|
| §1.3 headline-analyzer title (fa mirror) | 2026-10-27 | 6–10d exposure, unmeasurable |
| §3.2/§3.2b remido + ar snippets | 2026-10-19 | first CTR read pending |
| §2.6 pricing post decision | 2026-11-16 | speed-pricing post's fate undecided |
| §3.1 buried services pages (43–86) | 2026-11-24 | FAQ/depth shipped, measuring |
| §3.5 `ويب سي` brand title | 2026-11-10 | pos 4.9, watch |
| §06ee87a fa calculator retarget | measure 30d | shipped 2026-10-05ish — too early |

Any edit to these pages before their due date destroys the measurement.

---

## 6. Invariants checklist before shipping fa work

- [ ] Slugs byte-identical fa/en/ar (`verify-hreflang-parity.mjs` gates build)
- [ ] `updatedDate` bumped in the same commit as content edits, `date:` never backdated
- [ ] `category` stays English
- [ ] No fabricated stats; reuse Mahsun/portfolio page numbers only
- [ ] Trailing slash URLs; root redirect stays 302
- [ ] `_redirects` ↔ `STATIC_REDIRECTS` in sync
- [ ] Run `python3 scripts/verify-blog-parity.py` + `verify-blog-spec.py`
- [ ] `npm run build` full pipeline, not `astro build`

---

## 7. Evidence appendix

- GSC: `webabc.ir-Performance-on-Search-2026-10-05.xlsx` — Pages + Queries sheets, 297/525 rows, 2026-07-03→2026-10-02
- Snapshot: `docs/audit/CTR-BASELINE-2026-10-05.json`
- Prior art: `docs/audit/findings/01-gsc-performance.md`, `05-content-blog.md`, `06-i18n-hreflang.md`, `07-aeo.md`, `08-geo-ai-citations.md`
- Contract: `docs/BLOG-REWRITE-SPEC.md`
