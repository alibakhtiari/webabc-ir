# sb-audit.md — webabc.ir

**Audit date:** 2026-10-05
**Data sources:** `webabc.ir-Performance-on-Search-2026-10-05.xlsx` (GSC export, 07-03→10-02) **plus live Search Console API** (query+page attribution, indexation, sitemaps) and live PageSpeed Insights.
**Credentials:** Tier 1 — see [`docs/GOOGLE-API-SETUP.md`](docs/GOOGLE-API-SETUP.md).

> This is the first audit able to use **query→page attribution**. The xlsx `Queries` sheet has no page dimension, so every prior pass had to infer cannibalization from body-similarity proxies. That is now measured, and it changes three conclusions.

**Prior work:** [`docs/audit/ACTION-PLAN.md`](docs/audit/ACTION-PLAN.md) (living ledger — read before acting; several items below are already clocked).

---

## 1. Verdict

**Optimize. Do not write new blog posts.**

The site lost 87% of its impressions on 2026-09-21 and it was **one page**. That page is healthy, indexed, and correctly titled — this was a ranking loss on a competitor-branded query, not a technical failure. The technical foundation is genuinely excellent; the constraint is **relevance and authority on money pages**, which no amount of markup will fix.

Two facts reframe everything below:

1. **Traffic quality improved 4× while volume collapsed.** CTR went **0.40% → 1.56%** across the cliff. The impressions that vanished were almost entirely non-clicking.
2. **91% of all lost volume was `/en/tools/headline-analyzer/`**, which fell 676.6 → 3.7 impressions/day (**-99.5%**).

---

## 2. Health score

Scored on the `seo` skill weights. Every row cites what was measured; unmeasured is stated, not estimated.

| Category | Weight | Score | Basis |
|---|---|---|---|
| Technical SEO | 22 | **20** | Sitemaps 0 errors/0 warnings · 3× 301 chains verified single-hop · `.md` siblings noindexed with canonical · `Vary: Accept` intact · `webabc.ir`-only indexable · hreflang parity gates the build |
| Content Quality | 23 | **16** | 38×3 posts all inside 1500–2400w, 38/38 have `keyTakeaways`+`faq` — but 108 posts produced **1,876 impressions total**, and 7 cannibalization clusters remain unresolved |
| On-Page SEO | 20 | **15** | Most titles/descs in band; `/en/portfolio/remido/` at **65ch** (over), `/ar/` missing its own brand query string |
| Schema | 10 | **9** | `BlogPosting` · `FAQPage` · `BreadcrumbList` · `WebPage` · `SpeakableSpecification` · per-language `WebSite` · `WebApplication`+`Offer`. URL Inspection rich results: **PASS** |
| Performance | 10 | **9** | Lab 87–100, CLS 0, TBT 0–20 ms. **Field data does not exist** — CrUX ineligible (see §6) |
| AI Search | 10 | **8** | `llms.txt` 99 links × 3 locales + 202–237 KB corpora · 6 AI crawlers allowed · Markdown negotiation · `describedby` discovery. Missing `ai-catalog.json` + WebMCP |
| Images | 5 | **4** | 21 per-tool OG cards + 74 fa/ar RTL cards; Arabic fonts self-hosted |
| **Total** | **100** | **82** | |

**Read this correctly:** the technical score is high and the outcome score is low. Perfect markup on pages Google has no reason to rank. Do not spend another week on technical work — it is not the binding constraint.

---

## 3. Root cause: the 2026-09-21 collapse

Attributed per-page, normalized per day (windows differ in length: 28d pre, 13d post).

```
PRE   2026-08-24 → 09-20 (28d)   793 impr/day   3.1 clicks/day   CTR 0.40%
POST  2026-09-21 → 10-03 (13d)   104 impr/day   1.6 clicks/day   CTR 1.56%
                                  ── 13% of impressions, 51% of clicks, 4× the CTR ──
```

| Page | pre/day | post/day | Δ |
|---|---|---|---|
| `/en/tools/headline-analyzer/` | 676.6 | 3.7 | **-99.5%** |
| `/en/blog/seo-best-practices/` | 13.3 | 7.8 | -5.5 |
| `/ar/portfolio/remido/` | 4.3 | 0.0 | -4.3 |
| `/en/services/web-design/` | 6.6 | 3.5 | -3.2 |
| `/fa/services/local-seo/` | 3.3 | 0.4 | -2.9 |

The single page accounted for **85.3% → 3.8%** of daily impressions and **91% of all lost volume**. Nothing else materially moved.

### Why it is not a technical fault — verified live

```
/en/tools/headline-analyzer/
  URL Inspection : verdict PASS · "Submitted and indexed"
  page_fetch     : SUCCESSFUL · robots ALLOWED
  last_crawl     : 2026-10-03 · crawled_as MOBILE
  canonical      : google == user  ✅
  PSI            : mobile 98 / desktop 100 / a11y 96 / seo 100
  hreflang       : 4 (en/fa/ar + x-default)
```

### What the page was ranking for

113 distinct queries, 26,317 impressions, 23 clicks.

| Impressions | Clicks | Pos | Query |
|---|---|---|---|
| 10,158 | **0** | 5.5 | `seo title checker for blog by webnewstips com` |
| 4,036 | 3 | 15.5 | `seo title checker` |
| 2,893 | **0** | 17.9 | `title checker seo` |
| 2,134 | **0** | 26.3 | `seo title check` |
| 1,090 | **0** | 20.8 | `title seo check` |
| 349 | **13** | 18.8 | `seo headline checker` |

The webnewstips query is **39% of this page's volume at 0 clicks**, and position 5.5 with zero clicks across three months means Google never renders it as a clickable result for that query. **The ACTION-PLAN §1.4 falsifiability check has fired: confirm the exclusion permanent and stop revisiting it.**

The remaining **16,159** impressions are title-checker variants at positions 15–26 — page two, correctly earning almost nothing.

---

## 4. Actionable tasks

Priority = **impact × confidence ÷ effort**. Every task carries a falsifiability check. Each states which plan item it touches, because several have **open clocks — do not pre-empt those.**

### P0 — this week

#### T1 · Confirm the webnewstips exclusion permanently, rebaseline CTR
**Why:** §1.4's own rule fires now. Every future CTR number is wrong by ~0.2pp while this is unrecorded.
**Do:** record in `docs/audit/CTR-BASELINE-*.json` `ctr_exclusion` — this export: 0.45% with (151/33,387) vs **0.65%** without. Applies at the **Queries sheet only**; the query has no page dimension, never subtract from a page row.
**Check:** next export reports both figures; nobody re-investigates the query.

#### T2 · `/ar/` title must contain `ويب سي` verbatim
**Why:** `ويب سي` = **285 impressions at position 4.9, zero clicks**, served by `/ar/`. The title is `ويب إيه بي سي | …` — a letter-by-letter transliteration that does **not** contain the query string. Plan item **§3.5 fixed exactly this for `fa`** (added `(ويب سي)` to the fa title) and never applied it to `ar`.
**Evidence:** attribution shows 281 of 285 impressions for this query come from `/ar/`.
**Do:** add the literal string to the `ar` homepage title, mirroring the fa treatment. Keep ≤60 rendered chars.
**Check:** position ≤2 by **2026-11-10** (same clock as §3.5). If position holds at ~5 with 0 clicks after 6 weeks, the problem is SERP presentation, not the title — escalate to brand/PR, not more on-page edits.

#### T3 · `/en/portfolio/remido/` title is 65 rendered chars — over the 60 limit
**Why:** `remido` = **224 impressions at position 4.3, zero clicks.** A brand query at #4 that nobody clicks is a truncation problem: the title exceeds the pixel budget.
**Current:** `Remido – Kalimba E-Commerce & Warranty Portal | WebABC Case Study` (65 rendered, 69 raw)
**Do:** trim to ≤60 rendered. Verified clean for comparison: `/en/portfolio/ramzarz-negaran/` at 54ch.
**Check:** CTR on `remido` >0 within 4 weeks. Plan clock **§3.2b is 2026-10-19** — the description rewrite lands then; do the title in the same pass so the two read together.

#### T4 · Hands off `/en/tools/headline-analyzer/`
**Why:** §1.3's title shipped **2026-09-29 — 6 days ago**. Six days is inside GSC's noise floor.
**Do:** nothing. Do not rewrite, do not add content, do not touch canonicals.
**Check:** read CTR at **2026-10-27**. If it is still ~0.12% *and* the webnewstips query is still ≥8k impressions at 0 clicks, §1.3's stated failure condition is met — re-test a different leading noun then, not now.

---

### P1 — next two weeks

#### T5 · Qazvin: the largest single fa opportunity on the property
**Why:** `طراحی سایت در قزوین` = **254 impressions, 1 click**, with **215 of them on `/fa/service-areas/qazvin/` at position 62.3** — page seven for the highest-volume Persian city query on the site. This is the city's own home market. The page scores **PSI 100** and is already the deepest location asset, so the blocker is relevance and links, not speed or length.
**Do:** decide explicitly — either build a genuine Qazvin pillar (local pricing, named local proof, Qazvin-specific FAQs, links from `/fa/` and the service pages), or accept page-seven and stop spending here. Do **not** half-do it; §3.1 already learned this lesson on Tehran.
**Check:** ≥20 position gain in 8 weeks. Flat = the query is beyond the page's relevance, rebuild or retire.

#### T6 · Stop the service-areas index from targeting city terms
**Why:** measured cannibalization, previously invisible. The **index** page outranks and competes with individual city pages:

| Query | Index page | City page |
|---|---|---|
| `طراحی سایت در عمان` | `/fa/service-areas/` 21 impr @ 36.4 | `/fa/service-areas/muscat/` 131 @ **10.8** |
| `طراحی سایت در امارات` | — | `/fa/service-areas/dubai/` 60 @ 44.3 |

**Do:** retitle/re-scope `/[lang]/service-areas/` to a hub-and-spoke role ("all service areas") and remove city names from its title and H1. It should link out, not compete.
**Check:** city queries stop appearing as rows for the index URL within 6 weeks.

#### T7 · Pick one winner for Tehran e-commerce
**Why:** one intent, four pages, **271 combined impressions, 0 clicks:**

| Page | Impressions | Pos |
|---|---|---|
| `/en/service-areas/tehran/` | 58 + 26 | 20.9 / 8.8 |
| `/en/service-areas/` | 20 + 26 | 78.0 / 24.2 |
| `/en/portfolio/` | 20 + 17 | 78.0 / 37.9 |
| `/en/blog/ecommerce-web-design-guide-2026/` | 12 + 9 | 26.0 / 24.1 |

A portfolio index ranking for a service query is pure leakage.
**Do:** designate `/en/service-areas/tehran/` as the canonical target (best positions). Demote the index and the portfolio index out of that query space.
**Check:** one page holds ≥80% of the cluster's impressions.

#### T8 · Dubai: the blog outranks the money page
**Why:** three variants of the same query split across two URLs, and the **blog wins**:

| Query | Blog | Service-area page |
|---|---|---|
| `طراحی سایت در امارات` | 21 @ **27.4** | 60 @ 44.3 |
| `طراحی سایت در دبی` | 27 @ **27.1** | 58 @ 45.2 |
| `طراحی سایت دبی` | — | 29 @ 43.1 |

A blog post at position 27 is outranking the commercial landing page at 45.
**Do:** either strengthen `/fa/service-areas/dubai/` toward the same intent, or accept blog-first and route its CTAs to the service page. Do not leave both mid-field.
**Check:** service-area page reaches ≤20, or blog CTR rises above 0.5%.

---

### P2 — this month

#### T9 · Add the missing agentic artefacts
**Why:** the `seo-agentic` dimension is new and the site scores well on the parts it built (Markdown negotiation, `llms.txt`, `describedby`) but ships **none** of the newer discovery files: no `public/ai-catalog.json`, no WebMCP endpoint. For an agency selling AI-engine visibility, having zero agent-discoverable service catalogue is a visible gap.
**Do:** ship `ai-catalog.json` listing the 21 tools and 12 services per locale, generated from `scripts/llms-index.data.json` so it cannot drift from the pages.
**Check:** file is valid JSON, all referenced URLs resolve 200, and a build-time assertion fails if a tool in `tools.ts` is missing from it.

#### T10 · Correct the FAQPage claim in the README
**Why:** the README states `FAQPage` exists for *"AI engine citability (ChatGPT, Perplexity, Google AI Overviews)."* Per current guidance **Google retired FAQ rich results for all sites on 2026-05-07** — there is no longer a SERP feature, and confirmed LLM-citation benefit must not be claimed. This is a documentation-accuracy issue, **not** a reason to remove the schema.
**Do:** keep every `FAQPage` (entity value and AEO structure are still legitimate). Correct the README and audit docs to stop asserting a retired rich result.
**Flag as Info.** Do not remove schema. Do not add new FAQPage for SERP benefit.
**Check:** no doc claims a FAQ rich result or confirmed AI-citation lift.

#### T11 · Start measuring citations — right now nothing does
**Why:** GSC tells you **nothing** about AI-answer visibility, and the 5 frozen test prompts (§0.3) have never been run. The entire GEO/AEO work is therefore unfalsifiable. This is the highest-leverage non-code task available.
**Do:** run the frozen prompts from ACTION-PLAN §0.3 in ChatGPT Search, Perplexity, AI Overviews and Gemini. Record per prompt: mentioned? linked? which URL? position in answer?
**Check:** a repeatable monthly series exists by **2026-10-31**.

#### T12 · `/ar/` LCP 3.4 s — the only performance defect found
**Why:** PSI across six key pages is otherwise 92–100 with CLS 0 and TBT 0–20 ms. The Arabic homepage is the lone outlier and the site's weakest locale commercially.
**Do:** identify the LCP element (`audit_details` in the PSI JSON), then fix only that. Do **not** start a general performance project — there is nothing else to fix.
**Check:** mobile LCP ≤2.5 s. Measure lab-only; field data is unavailable (§6).

---

### P3 — this quarter

| # | Task | Evidence / note |
|---|---|---|
| T13 | **Re-open the cannibalization clusters — now decidable.** §2.3's ACCEPT check was blocked because the xlsx had no page dimension. Attribution now exists. Measured: B wordpress-vs-custom **flat**; D speed **healthy** (blog 70 impr @ 11.7 vs service 19 @ 61.2 — keep the blog); F design-trends earned **0 queries**; E local-seo 132 impr @ 32.2 on the fa service page, the blog earns ~0 | Only merge where two URLs **both** earn impressions on the **same** query. Measured clusters: `seo check page title` (3 URLs), `محاسبه آنلاین هزینه طراحی سایت` (2) |
| T14 | **Configure GA4** (`ga4_property_id`) | Unlocks organic traffic and the native **AI Assistants** channel group (ChatGPT, Gemini, Claude, DeepSeek, Copilot, Grok). Note GA4 excludes AI Overviews/AI Mode, and most AI sessions arrive referrer-less as Direct — expect undercount |
| T15 | **Backlinks / entity footprint** (§3.3) | Still the only GEO item code cannot fix. Needs ≥4 organisation-level `sameAs` profiles |

---

## 5. Do not do these

- ❌ **Write new blog posts.** 108 posts produced 1,876 impressions. The constraint is distribution and authority, not inventory. §2.6's pricing post is still mid-flight (clock **2026-11-16**) — writing into that cluster now risks cannibalising the post under test.
- ❌ **Touch the 301-ing URLs.** `/fa/service-areas/qazvin` (39 impr @ 77.7), `/fa/services/local-seo`, `/en/tools/seo-title-checker` all still show GSC rows. Verified single-hop 301s — this is decay, and it drains on its own.
- ❌ **Submit pages to the Indexing API.** It is for `JobPosting` and broadcast/video only. Using it on normal pages violates Google's policy.
- ❌ **Add `WebSite.SearchAction`, `QAPage`, `HowTo`, homepage `BreadcrumbList`, or fabricated `AggregateRating`.**
- ❌ **Open a work item whose falsifiability clock has not expired.** Editing a page mid-clock destroys the measurement.

---

## 6. Measurement limits — state these, never paper over them

| Limit | Reality |
|---|---|
| **CrUX field data** | Returns `404 NOT_FOUND` at origin level, for both `queryRecord` and `queryHistoryRecord`. Enabled API, valid key, origin below the Chrome traffic threshold. **No field LCP/INP/CLS exists.** All performance figures in this audit are **Lighthouse lab scores** and must be labelled as such |
| **Citation performance** | Never measured. §0.3 prompts have not been run. No GEO claim in this audit is falsifiable |
| **GSC lag** | 2–3 days. Items shipped 2026-09-29 (6 days) are **unmeasurable**, not failed |
| **Window shift** | The xlsx 3-month window advanced 8 days vs the 09-27 export. Cross-export diffs are shifted-window, not same-window |
| **Sheet sums** | `Pages` can exceed `Chart` — GSC computes each sheet independently. `matches_expected: false` is expected |
| **Backlinks** | No provider configured. §3.3 rests on `Organization.sameAs` inspection only |

---

## 7. Open clocks

| Plan item | Shipped | Due | Status |
|---|---|---|---|
| §3.2b Remido snippets | 2026-09-29 | **2026-10-19** | 14 days — pair with T3 |
| §1.3 headline-analyzer title | 2026-09-29 | **2026-10-27** | unmeasurable |
| §3.5 `ويب سي` brand | 2026-09-29 | **2026-11-10** | T2 extends this to `ar` |
| §2.6 pricing post | 2026-09-21 | **2026-11-16** | decides pricing-content strategy |
| §3.1 buried pages | 2026-09-29 | **2026-11-24** | services still rank 43–86 |

---

## 8. If you only do three things

1. **T2** — add `ويب سي` verbatim to the Arabic title. 285 impressions at #5, zero clicks, and the fix is already proven on the Persian homepage.
2. **T5** — make an explicit decision on Qazvin. 254 impressions on page seven for your own city's highest-volume query is either the biggest opportunity on the property or a permanent write-off. It is currently neither.
3. **T11** — start citation measurement. Everything labelled GEO/AEO on this site is currently unfalsifiable.

Then **stop and wait.** Four falsifiability clocks expire between 2026-10-19 and 2026-11-24. Editing those pages before their clocks fire destroys the only clean read you will get.
