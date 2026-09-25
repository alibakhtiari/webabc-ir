# DS — SEO / AEO / GEO Optimization Plan — webabc.ir

**Prepared:** 2026-09-21
**Data source:** `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (Google Search Console, Performance on Search)
**Filters in export:** Search type = **Web** · Date = **Last 3 months** · no country/device filter
**Actual data window:** **2026-06-19 → 2026-09-18 (92 days)** — note the export is dated 09-21 but data stops 09-18 (normal GSC 2–3 day lag)
**Sheets:** `Chart` (92 rows), `Queries` (416), `Pages` (289), `Countries` (118), `Devices` (3), `Search appearance` (1), `Filters` (2)
**Verification:** local build (`dist/`, built 2026-09-21 11:55), source tree, and live HTTP checks on `webabc.ir` performed 2026-09-21
**Scope:** technical SEO · on-page · structured data · content · AEO (Answer Engine Optimization) · GEO (Generative Engine Optimization)

> **No source code was modified to produce this document.** It is analysis and recommendation only.

---

## 0. Read this first — the single most important framing point

**This GSC export is a pre-fix baseline, not a current-state report.**

Git history shows a batch of SEO fixes was committed and deployed on **2026-09-21** — three days *after* the GSC data ends:

| Commit | Fix |
|---|---|
| `ad2687c` | Differentiated headline-analyzer titles + tool-page jump links |
| `d47969c` | Emit single `FAQPage` per tool page via `ToolFAQ` |
| `8d6e425` | Cross-link service areas, link portfolio markets, add brand anchor |
| `c9d0582` | Expand `llms.txt` coverage + add `llms-full` generator to build |
| `f06dad8` | Retitle money posts, refresh FAQs, interlink new guides |
| `53f7f02`, `77eb308` | New content: title-tag-checker comparison; Tehran e-commerce guide |
| `012b70b` | Missing AVIF covers, translate Local SEO/Performance |

Consequence: **every zero-click and duplicate-URL number below describes the state *before* those fixes.** Do not re-implement them. The correct use of this data is as the *baseline* against which the next export is measured. Section 3 lists what is already verified fixed so no work is duplicated.

---

## 1. Headline diagnosis

### 1.1 Site totals (92 days)

| Metric | Value |
|---|---|
| Clicks | **124** |
| Impressions | **31,561** |
| CTR | **0.39%** |
| Average position | **16.82** |

A site averaging position 16.8 with a 0.39% CTR is earning roughly **one quarter** of the clicks its positions should command. The gap is not a ranking problem — it is a *concentration* problem and a *snippet* problem.

### 1.2 Three data-integrity caveats (affect how you read every number)

1. **41% of clicks are unattributable.** `Pages` sheet totals 124 clicks (= site total exactly), but `Queries` totals only **73 clicks** and 29,394 impressions — **51 clicks (41.1%) and 2,167 impressions have no query attribution**. GSC strips low-volume queries for privacy. Never compute site CTR from the Queries sheet.
2. **`Pages` impressions exceed the site total by 455 (+1.44%)** — normal for the Pages report, but it means page-level impression sums are not additive to the site total.
3. **Use weighted averages, never simple averages.** Queries simple-average position is **35.34** vs. weighted **16.84** — the 416-row tail of near-zero-volume queries destroys naive means.

### 1.3 The concentration problem (the core structural finding)

| Object | Impressions | Share | Clicks | CTR | Position |
|---|---|---|---|---|---|
| `/en/tools/headline-analyzer/` | **25,743** | **81.57% of all site impressions** | 30 | **0.12%** | 13.97 |
| Query `seo title checker for blog by webnewstips com` | **10,157** | 34.55% of query impressions | **0** | 0.00% | **5.55** |
| All 120 title/headline-intent queries | 25,796 | 87.76% of query impressions | 22 | 0.09% | — |

**One page carries 81.6% of the site's visibility and converts at 0.12%.** One query that belongs to a third party (webnewstips.com) delivers 10,157 impressions at position 5.55 and earns literally nothing.

This produces the single most dangerous pattern in the dataset:

| Month | Clicks | Impressions | CTR |
|---|---|---|---|
| Jun 2026 | 4 | 399 | 1.003% |
| Jul 2026 | 9 | 845 | 1.065% |
| **Aug 2026** | 60 | **17,298** | **0.347%** |
| Sep 2026 (18d) | 51 | 13,019 | 0.392% |

Impressions grew **+1,947%** into August while CTR **collapsed by 67%**. The site did not gain visibility — it was flooded by impressions from queries whose intent it cannot satisfy. Any dashboard reporting "impressions up 1,947%" is reporting a liability as an asset. **Impressions are currently a vanity metric for this site; clicks and CTR are the real signal.**

**Weekly detail — the ramp is very recent and immature.** 94% of all impressions landed in the final 6 weeks of the window, so position data is volatile and trend lines are unreliable:

| ISO week | Impressions | Clicks | CTR |
|---|---|---|---|
| 25–32 (pre-ramp) | 1,830 | 16 | 0.87% |
| 33 | 2,187 | 7 | 0.32% |
| 34 | 6,683 | 20 | 0.30% |
| 35 | 7,138 | 25 | 0.35% |
| 36 | 5,298 | 12 | 0.23% |
| 37 | 5,453 | 21 | 0.39% |
| 38 (partial, ends 09-18) | 2,972 | 20 | 0.67% |

Read this as: the site only began ranking at scale in mid-August. Weeks 25–32 are a different, much smaller site. Any quarter-over-quarter comparison against this window will be measuring the ramp, not the work.

### 1.4 Zero-click is systemic, not incidental

| Dimension | Zero-click rows | Share |
|---|---|---|
| Queries | 398 / 416 | **95.67%** |
| Pages | 250 / 289 | **86.51%** |
| Countries | 100 / 118 | **84.74%** |

The 9 queries with ≥200 impressions and zero clicks alone account for **17,494 impressions (59.52% of all query impressions) returning 0 clicks**.

### 1.5 Brand dependency

`webabc` (brand) = **38 clicks from 86 impressions (44.19% CTR, pos 3.41)** — that is **30.65% of all site clicks** and **52.1% of all query-attributed clicks**, from a query with just 86 impressions.

Strip the brand and the non-brand organic engine delivers ~86 clicks in 92 days. That is the honest measure of the site's current organic performance.

### 1.6 Intent clusters — where the volume sits vs. where the conversion is

Queries grouped by intent (weighted averages):

| Cluster | Queries | Impressions | Clicks | CTR | Avg Pos | Verdict |
|---|---|---|---|---|---|---|
| **A. Title / headline checker** | 120 | 25,796 | 22 | **0.09%** | 14.5 | 87.8% of query impressions, effectively zero yield — contested by Moz/WebNewsTips |
| **B. Brand** (webabc, remido, رمز ارز نگاران) | 14 | 792 | **42** | **5.30%** | 8.5 | **34% of all clicks** from 2.7% of impressions — the only healthy cluster |
| **C. Local web design (fa/ar)** | 49 | 1,553 | 6 | 0.39% | 43.4 | Commercial intent, underexposed, converts when surfaced |
| **D. Cost / pricing** | 19 | 42 | 2 | **4.76%** | 37.2 | Tiny volume, second-best CTR on the site — under-deployed |
| **E. Speed / performance** | 5 | 49 | 0 | 0% | 35.9 | Proven winner in `fa`, absent in `en` |
| F. Other / long tail | 209 | 1,162 | 1 | 0.09% | 37.0 | Mostly noise |

The strategic picture: **cluster A owns the impressions, cluster B owns the clicks, and clusters C/D own the commercial value.** The site is currently optimising for A (where it loses) and under-serving C and D (where it wins).

---

## 2. Problem inventory

### 2.1 Keyword opportunities — striking distance with zero yield

Queries ranking on **page 1 or page 2 with no clicks at all**. These are the cheapest wins available because the ranking already exists:

| Query | Impr | Pos | Clicks | Language | Diagnosis |
|---|---|---|---|---|---|
| `seo title checker for blog by webnewstips com` | 10,157 | 5.55 | 0 | en | Third-party navigational query. Unwinnable — see §5.1 |
| `title checker seo` | 2,803 | 18.51 | 0 | en | Page-2. Snippet not compelling |
| `seo title check` | 2,055 | 27.00 | 0 | en | Page-3. Snippet + depth |
| `title seo check` | 1,077 | 21.01 | 0 | en | Page-3. Snippet + depth |
| `headline checker` | 382 | 29.13 | 0 | en | Page-3 |
| `title tag checker` | 372 | 20.52 | 0 | en | Page-3 |
| `remido` | 223 | **5.05** | 0 | en | **Page 1, own portfolio brand, 0 clicks** |
| `ويب سي` | 218 | **4.93** | 0 | fa | **Page 1, own brand in Persian, 0 clicks** |
| `طراحی سایت در عمان` | 207 | 21.19 | 0 | fa | Web design in Oman — commercial, page 3 |
| `خدمات سئو محلی` | 143 | 35.20 | 0 | fa | Local SEO services — commercial |
| `blog title checker` | 138 | 10.25 | 0 | en | Bottom of page 1 |
| `moz title checker` | 99 | 10.42 | 0 | en | Competitor-brand query, bottom page 1 |
| `طراحی سایت در امارات` | 91 | 39.57 | 0 | fa | Web design in UAE — commercial |
| `محاسبه آنلاین هزینه طراحی سایت وردپرس` | 100 | 43.26 | 0 | fa | WordPress cost calculator — commercial |

**The two most striking entries are `remido` (pos 5.05) and `ويب سي` (pos 4.93).** Both are the site's *own* brand assets sitting on page 1 with zero clicks. At positions 4–5 a normal CTR is 2–8%. Zero means the SERP entry itself is failing — wrong page ranking, truncated/mismatched title, or a rich result occupying the space. This is a snippet-level bug, not an authority problem.

**Word order decides clickability at identical intent — the single cheapest win in the dataset.** Two near-identical queries in the same cluster, ranked almost the same, convert 43× apart:

| Query | Impr | Pos | CTR | Clicks |
|---|---|---|---|---|
| `seo headline checker` | 380 | 21.27 | **3.42%** | **13** |
| `seo title checker` | 3,938 | 16.80 | **0.08%** | 3 |

The audience clicks the word **"headline"**, not "title". Confirmed by the pair `title seo checker` (333 impr, 2 clicks) vs `title checker seo` (2,803 impr, **0 clicks**) — same three words, different order, opposite outcomes. The current live title `Free SEO Title Checker + Headline CTR Scorer [2026]` still leads with the losing word. See **P0-5**.

### 2.2 Pages ranking but invisible (position 60–90)

These pages are indexed and receiving impressions but sit so deep they can never earn a click:

| Page | Impr | Pos | Clicks |
|---|---|---|---|
| `/en/services/web-design/` | 184 | **87.91** | 0 |
| `/fa/services/seo/` | 17 | **88.65** | 0 |
| `/fa/services/content-creation/` | 25 | **87.72** | 0 |
| `/fa/tools/` | 26 | **80.31** | 0 |
| `/fa/service-areas/tehran/` | 89 | **76.66** | 0 |
| `طراحی سایت در قزوین` (query) | 198 | **65.19** | 1 |
| `/fa/services/speed-optimization/` | 36 | **63.44** | 0 |
| `/fa/service-areas/qazvin/` | 224 | **60.43** | 1 |

**Position 60–90 means Google has decided these pages are not the answer.** This is a relevance/depth signal failure, not a technical one. No title tweak fixes position 87.

### 2.3 Indexing / canonical problems

**60 slash-vs-non-slash duplicate URL groups.** 216 trailing-slash rows + 73 non-slash rows out of 289 page rows — roughly **120 page rows (41.5%) are duplicates of each other.** Both variants receive impressions and, in several cases, both receive clicks:

| Canonical | Trailing-slash | Non-slash | Impact |
|---|---|---|---|
| `/en/tools/headline-analyzer` | 30 clicks / 25,743 impr / **pos 13.97** | 0 clicks / 230 impr / **pos 57.14** | **43-position split on the site's #1 page** |
| `/en` | 34 / 126 / **pos 5.08** | 2 / 27 / pos 4.19 | Brand homepage split |
| `/fa/portfolio/ramzarz-negaran` | 2 / 226 / pos 6.85 | 2 / 105 / pos 7.10 | Clicks split across both |
| `/fa/service-areas/qazvin` | 1 / 224 / pos 60.43 | 0 / 47 / pos 71.47 | Both variants buried |
| `/fa/service-areas/muscat` | 2 / 146 / pos 10.58 | 2 / 30 / pos 19.73 | Clicks split |
| `/en/tools/seo-title-checker` | 1 / 115 / pos 63.81 | 1 / 127 / pos 56.23 | **Legacy URL still earning 242 impr** |
| `/en/services/web-design` | 0 / 184 / pos 87.91 | 0 / 1 / pos 4.00 | Duplicate of the 87.91 page |

The `headline-analyzer` case is the clearest proof of harm: **the same content ranks 13.97 under one URL form and 57.14 under the other.** Google has not consolidated them, so link equity and ranking signals are split across two URLs for the site's single most important page.

**Status: the 301 fix is already deployed and verified live** (see §3). What remains is GSC consolidation confirmation and internal-link cleanup.

**Other indexing observations:**
- **`/ar/` is effectively unindexed for search:** 63 pages → **3 clicks / 837 impressions**. For comparison `/fa/` has 115 pages → 38 clicks / 2,636 impressions, and `/en/` 110 pages → 83 clicks / 28,541 impressions.
- **`Translated results` search appearance: 170 impressions, 0 clicks, average position 92.88.** Google is auto-translating pages and ranking them at position ~93. This indicates locale-signal weakness, not a technical hreflang break.
- **Root `https://webabc.ir/` earns 2 impressions total** — the geo-redirect sends `/` to a locale home, which is correct behaviour, but it means the root domain carries no search equity.
- **Language homepages rank inconsistently:** `/en/` at pos 5.08, `/ar/` at pos 5.01, but `/fa/` at **pos 43.72** — a 38-position gap between locales of the same site.

### 2.4 Content gaps

1. **Service pages lack depth and ranking relevance.** 8 service/area pages sit at position 60–90. The `/en/services/web-design/` page — the flagship service — ranks 87.91 with a 28-character title and boilerplate description.
2. **Persian content: high volume, low yield.** 115 `/fa/` pages (more than `/en/`'s 110) produce only 2,636 impressions — **9.2% of `/en/`'s visibility.** Volume without depth.
3. **Persian commercial queries are unserved at depth:** `طراحی سایت در عمان` (207 impr, pos 21), `خدمات سئو محلی` (143, pos 35), `طراحی سایت در امارات` (91, pos 40), `محاسبه آنلاین هزینه طراحی سایت وردپرس` (100, pos 43) — all commercial intent, all page 2–5.
4. **Geographic mismatch between content and demand.** The US supplies **59.3% of all impressions** (18,708) but only 0.25% CTR. The site's English tool content attracts US searchers who then do not choose it.
5. **86.5% of pages earn zero clicks.** The long tail of 250 pages is not contributing search value.

### 2.5 Where the site *does* convert (replicate these)

| Asset | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| `/en/` (brand homepage) | 34 | 126 | **26.98%** | 5.08 |
| `/fa/blog/website-speed-optimization-pricing-guide-2026/` | **13** | 177 | **7.34%** | 14.28 |
| Query `هزینه افزایش سرعت سایت` | 2 | 21 | **9.52%** | 8.76 |
| Query `سئو سایت در دبی` | 1 | 8 | **12.50%** | 7.12 |
| Query `محاسبه آنلاین هزینه طراحی سایت` | 1 | 12 | **8.33%** | 16.92 |
| Query `seo checklist 2026` | 1 | 3 | 33.33% | 5.67 |

**The pattern is unambiguous: pricing, cost, and speed-optimization intent converts — especially in Persian.** A page ranking at position 14.28 with 7.34% CTR is outperforming the site's position-5 tool page by **61×**. Price-transparent content is this site's proven formula, and it is currently under-deployed.

### 2.6 Tool cannibalization — three URLs, one intent

The site splits the "title / meta / SERP preview" intent across three separate tools, which is a plausible contributing cause of the position-14 ceiling on the flagship page:

| Tool | Impr | Pos | Clicks | Title |
|---|---|---|---|---|
| `/en/tools/headline-analyzer/` | 25,973 | 14.0 | 30 | `Free SEO Title Checker + Headline CTR Scorer [2026]` |
| `/en/tools/serp-preview/` | 12 | 51.2 | 0 | `SERP Snippet Preview – Meta Title and Description Checker` |
| `/en/tools/meta-generator/` | 10 | 25.4 | 0 | (meta description generation) |

All three target the same search intent and all three rank badly except the first. Google is distributing one thin signal across three URLs. `serp-preview`'s actual differentiator — **desktop + mobile truncation preview** — is valuable and should be folded *into* `headline-analyzer` rather than competing with it. See **P1-5**.

### 2.7 Zero-impression inventory — assets that have never appeared in search

Measured against the source tree, 90 days of data:

- **7 of 22 tools have zero impressions:** `base64-encoder`, `color-contrast-checker`, `json-formatter`, `privacy-policy-generator`, `qr-generator`, `readability-checker`, `schema-generator`
- **7 of 34 EN blog posts have zero impressions:** `ai-search-optimization-guide-2026`, `best-seo-tools`, `best-title-tag-checker-tools-2026`, `how-much-does-a-website-cost-2026`, `local-seo-services-guide-2026`, `tehran-ecommerce-web-design-guide-2026`, `wordpress-website-cost-guide-2026`

The blog list is the significant one: `how-much-does-a-website-cost-2026` and `wordpress-website-cost-guide-2026` are **cost-intent pages getting zero visibility**, while the Persian equivalent of the same topic is the site's best-performing asset (§2.5). That is a localization and internal-link failure, not a content-quality failure.

**Service-area coverage is badly unbalanced.** These are the highest commercial value pages on the site:

| Area | `/en/` | `/fa/` | `/ar/` |
|---|---|---|---|
| Dubai | **0 impr** | 152 (pos 42.7) | 1 |
| Muscat | 13 (pos 45.0) | **176 (pos 10.6)** | 5 |
| Tehran | 181 (pos 16.7) | 95 (pos 76.7) | 0 |
| Qazvin | 3 (pos 16.3) | 271 (pos 60.4) | 2 |
| Riyadh | 13 (**pos 99.5**) | 0 | 4 |
| Abu Dhabi | 7 (pos 35.6) | 10 (pos 36.9) | 0 |

`/en/service-areas/dubai/` — the most commercially valuable GCC page — has **zero impressions**. Riyadh sits at position 99.5 (page 10). **Zero impressions may mean *not indexed* rather than *not ranking*** — verify with URL Inspection before treating these as ranking failures.

---

## 3. Already fixed — verified 2026-09-21, do not redo

I verified each of these against the built output (`dist/`) and live HTTP responses. Two corrections to the earlier 09-21 audit are material and worth stating explicitly, because both would otherwise cause wasted work:

- **`BreadcrumbList` is present, not absent.** The earlier audit claimed zero `BreadcrumbList` entities site-wide. That is wrong: `Breadcrumbs.astro` emits valid JSON-LD and is used across 15 files including `ToolLayout.astro`, `blog/[slug].astro`, and `portfolio/[slug].astro`. Verified as exactly **1 per page** on live tool and blog URLs.
- **`WebSite` is partially present, not absent.** The earlier audit's "no WebSite node" claim is only half right — it exists on the homepage, about, and contact pages. It is **not site-wide**, and its `@id` structure is fragmented. See P0-3 for the precise, corrected recommendation.

| Item | Verified state | Evidence |
|---|---|---|
| Trailing-slash 301 canonicalization | **Working** | `curl /en/tools/headline-analyzer` → `301 → /en/tools/headline-analyzer/`; same for `/en` → `/en/`, `/fa` → `/fa/` |
| `seo-title-checker` → `headline-analyzer` merge | **Working** | `curl /en/tools/seo-title-checker` → `301 → /en/tools/headline-analyzer/` |
| Root geo-redirect uses 302 (not 301) | **Correct** | `curl https://webabc.ir/` → `302 → /en/` — correctly temporary |
| `BreadcrumbList` JSON-LD | **Present, 1 per page** | Verified on live `/en/tools/headline-analyzer/` and `/en/blog/seo-best-practices/` |
| `FAQPage` duplication | **Fixed — 1 per page** | Live tool page and blog page each contain exactly 1 `FAQPage` (was 2) |
| headline-analyzer title differentiation | **Live** | `<title>Free SEO Title Checker + Headline CTR Scorer [2026]</title>` |
| headline-analyzer meta description hook | **Live** | "SEO title checker with pixel-accurate SERP preview: test length, score CTR power and fix truncation. Free, no signup required." |
| `llms.txt` fa/ar deep links | **Expanded** | 141 lines covering en/fa/ar services, areas, tools, blog |
| `llms-full.txt` long-context corpus | **Live** | `https://webabc.ir/llms-full.txt` → `200`, **365,527 bytes**; regenerated on every build |
| `robots.txt` AI-crawler allowlist | **Present** | Explicit `Allow: /` for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, CCBot, Bytespider |
| Sitemap | **Healthy** | `sitemap-0.xml`: **303 URLs**, **1,212 hreflang links** (303 × 4 = en/fa/ar/x-default ✓), **273 image entries** |
| Canonical + hreflang | **Correct** | Live page: `rel="canonical"` → self-referencing trailing-slash URL; 4-way hreflang emitted |

**Conclusion:** the technical foundation is genuinely solid. The remaining work is *on-page copy discipline*, *one schema placement fix*, *content depth*, and *AEO/GEO citation engineering* — not plumbing.

---

## 4. Prioritized action plan

Priorities are assigned by (impact × confidence) ÷ effort. Every action states a **measurable expected outcome** and a **fail-check** so you can tell whether it worked rather than assuming.

### Priority legend
- **P0 — Do first.** Highest leverage, low risk, directly addresses the largest measured losses.
- **P1 — High impact.** Requires more work or has a longer feedback loop.
- **P2 — Structural.** Content and authority work with 2–3 month payoff.
- **P3 — Ongoing.** Monitoring, hygiene, and iteration.

---

### P0 — Immediate (this week)

#### P0-1 · Rewrite the `/en/services/web-design/` title and description
- **Evidence:** Title is **28 characters** — `Web Design & Development`. Description is 156 characters of generic boilerplate ("Professional web design and development services. We build responsive, SEO-friendly, and high-performance websites tailored to your specific business goals."). This page ranks **position 87.91** with 184 impressions and 0 clicks.
- **Why it matters:** This is the flagship commercial service page. Its title carries no geography, no differentiator, no proof, no brand — nothing that distinguishes it from thousands of identical agency pages. It is the single weakest on-page asset measured.
- **Do:** Rewrite to ≤60 characters with a commercial differentiator and geo term. Rewrite the description to lead with a concrete outcome and a proof point. Source: `src/i18n/en/web-design.json` (`title`, `description` keys). Mirror the change in `src/i18n/fa/web-design.json` and `src/i18n/ar/web-design.json` with locale-appropriate proof.
- **Expected outcome:** Title reaches the 50–60 character band. Because the page ranks 87.91, expect **position movement of 15–30 places within 6–8 weeks** (page 9 → page 5–6) and the **first non-zero clicks** from a page currently at 184 impressions / 0 clicks. Realistic target: **5–15 clicks/quarter**.
- **Fail-check:** After 6 weeks, position still >70 → the problem is page depth and internal links, not the title. Escalate to P2-1.

#### P0-2 · Fix the truncated Arabic homepage title and description
- **Evidence:** `src/i18n/ar/home.json` title is **103 characters** — `ويب إيه بي سي | خدمات احترافية لتحسين محركات البحث وتصميم` — which ends mid-phrase on "وتصميم" ("and design"), i.e. a sentence fragment. Description is **225 characters** (Google renders ~155–160). `/ar/` earns 232 impressions at position 5.01 with **0 clicks**.
- **Why it matters:** The Arabic homepage ranks on page 1 and converts nothing. A 103-character title is truncated in SERP display, and the surviving fragment reads as a broken sentence in a right-to-left script where readability loss is severe.
- **Do:** Shorten to ≤60 characters so the phrase completes naturally. Trim the description to 150–158 characters. Preserve the geo cluster (Dubai / Riyadh / Muscat) since that is the commercial intent.
- **Expected outcome:** Title displays in full without truncation. At position 5.01, moving CTR from 0% to the 2–4% norm for that position yields **5–9 clicks/quarter from 232 impressions** — from zero today.
- **Fail-check:** Impressions hold but CTR stays 0% after 4 weeks → the SERP entry is being out-competed by richer results; investigate rich-result eligibility and add `WebSite` schema (P0-3).

#### P0-3 · Make the `WebSite` schema site-wide and unify its `@id`
- **Evidence (verified):** `WebSite` markup exists, but **only on three page templates** — `src/pages/[lang]/index.astro:31`, `about.astro:40`, `contact.astro:38`. It is **absent from every tool page and every blog post** (confirmed: `/en/tools/headline-analyzer/` contains **0** `WebSite` nodes; the live homepage contains 1). Two further structural problems in the existing node:

| Issue | Current implementation | Consequence |
|---|---|---|
| **`@id` is per-language** | `https://webabc.ir/{lang}/#website` → `/en/#website`, `/fa/#website`, `/ar/#website` | Declares **three separate WebSite entities** instead of one site with three language versions. Fragments the very entity it exists to consolidate. |
| **`SearchAction` target is a tag filter** | `/{lang}/blog?tag={search_term_string}` | Declares a search endpoint that is really a filtered blog listing. A `SearchAction` should point at a genuine query endpoint or be omitted. |

*(Positive finding: the `publisher: { '@id': 'https://webabc.ir/#organization' }` reference **does resolve** — `#organization` is defined in `src/layouts/Layout.astro:21` and confirmed present in live HTML. There is no dangling reference.)*
- **Why it matters:** This is the last real structured-data gap, and it is a *placement and identity* problem rather than a missing-markup problem. `WebSite` is the node that declares the site as a single entity and anchors content attribution for knowledge graphs and answer engines. With it present on only 3 of 303 URLs and split across three per-language `@id` values, the entity signal is weakest on precisely the pages that generate 81.57% of impressions.
- **Do:** Move the `WebSite` node into `src/layouts/Layout.astro` so every page inherits it. Give it a **single language-neutral `@id`** (`https://webabc.ir/#website`) with `inLanguage` reflecting the page's locale — mirroring how `#organization` already works correctly. Keep `publisher` pointing at `#organization`. Either point `SearchAction` at a real search endpoint or remove it.
- **Expected outcome:** `WebSite` present on 100% of indexable URLs, with one site entity instead of three. Validators show a coherent graph (`#website` → `publisher` → `#organization`). Supports brand consolidation: `webabc` sits at **position 3.41** and should be 1.0. Target: **brand query position ≤2.0 within 6 weeks.**
- **Fail-check:** Brand still >2.0 after 6 weeks → the cause is external (competing entities), not on-site markup. Escalate to off-site brand work (P2-4). Separately, if `SearchAction` is retained and no sitelinks searchbox appears, remove the property — an unhonoured declaration adds noise to the graph.

#### P0-4 · Remove the duplicate entry in `llms.txt`
- **Evidence:** `/en/tools/headline-analyzer/` is listed **twice** — once as "SEO Headline Analyzer & Title Checker" (line 44) and once as "SEO Title & Meta Tag Checker" (line 45). Both point to the same URL.
- **Why it matters:** `llms.txt` is a GEO ingestion surface. Duplicate entries with conflicting descriptions of the same URL dilute the signal an LLM extracts about what that page *is* — directly undermining the title-differentiation work already shipped for this exact page.
- **Do:** Merge into a single entry that carries both intents in one description. Source: `public/llms.txt` lines 44–45.
- **Expected outcome:** One canonical description per URL. Cleaner entity signal for the site's highest-impression page (81.57% of all site impressions).
- **Fail-check:** Not separately measurable — bundle with P3-2's AI-citation testing.

#### P0-5 · Lead with "Headline", not "Title", on the flagship page
- **Evidence:** `seo headline checker` converts at **3.42%** (13 clicks / 380 impr); `seo title checker` converts at **0.08%** (3 clicks / 3,938 impr) — a **43× difference** at near-identical intent and a *better* position for the losing term. Confirmed by `title seo checker` (2 clicks) vs `title checker seo` (0 clicks). The live title is `Free SEO Title Checker + Headline CTR Scorer [2026]` (`src/i18n/en/tools/headlineAnalyzer.json`) — it leads with the term that does not convert.
- **Why it matters:** This is the highest-leverage copy change available anywhere on the site, because it acts on the page holding 81.57% of impressions. It costs one string edit per locale.
- **Do:** Rewrite the `<title>` to lead with the converting word, e.g. `Free Headline Analyzer + SEO Title Checker [Pixel-Perfect]` — keep ≤60 chars / 580px. Lead the meta description with a concrete hook rather than the category name. Mirror the word order in `src/i18n/fa/tools/headlineAnalyzer.json` and `src/i18n/ar/tools/headlineAnalyzer.json`. **Do not** re-introduce the word "webnewstips" or otherwise mimic a competitor brand (§5.1).
- **Expected outcome:** Page CTR moves from 0.12% toward **0.5–0.9%** within 6 weeks. At ~25,000 impressions that is **+95 to +195 clicks/quarter** — the largest single-action gain available.
- **Fail-check:** CTR still <0.3% after 6 weeks → the ceiling is ranking depth or authority, not the snippet. Escalate to P1-5 (consolidation) and P2-1 (depth).

---

### P1 — High impact (weeks 2–4)

#### P1-1 · Re-point internal links away from legacy and non-slash URLs
- **Evidence:** `/en/tools/seo-title-checker` (± slash) still earns **242 combined impressions** despite the 301 being live. `/en/tools/headline-analyzer` (non-slash) still earns 230 impressions at position 57.14 vs. 13.97 for the slash form.
- **Why it matters:** A 301 passes most equity but not all, and Google keeps both URLs in the index until it observes consistent internal signals. Stale internal links are what keep the legacy URLs alive. The redirect is correct; the *references* are not.
- **Do:** Grep the entire source tree for internal links and content references pointing at `seo-title-checker`, `seo-title-analyzer`, `modern-web-development`, and any non-trailing-slash internal `href`. Re-point them all to the canonical trailing-slash targets. Confirm the sitemap contains no legacy entries (currently clean — keep it that way).
- **Expected outcome:** Legacy URLs drop out of the index within one crawl cycle. The `headline-analyzer` duplicate impression stream (230 impr) consolidates into the canonical URL. **Net effect: full link equity on the site's #1 page, removing the 43-position split.**
- **Fail-check:** Legacy URLs still show impressions in the next GSC export → some reference was missed; re-grep including `dist/` and any content frontmatter.

#### P1-2 · Diagnose and fix the two page-1 zero-click brand queries
- **Evidence:** `remido` — **position 5.05, 223 impressions, 0 clicks.** `ويب سي` (the Persian transliteration of the brand) — **position 4.93, 218 impressions, 0 clicks.** At positions 4–5 the expected CTR is 2–8%. Zero is anomalous.
- **Why it matters:** These are the site's own brand assets ranking on page 1 and capturing nothing. The most likely causes are (a) the wrong page ranking for the query, (b) a title that does not match the searcher's intent, or (c) a third-party result occupying the visual space. All three are fixable and all three indicate a snippet/intent mismatch rather than an authority problem.
- **Do:** In GSC, inspect the exact URL Google associates with each query. Then align that page's title and opening paragraph to the query intent. For `remido`, confirm `/en/portfolio/remido/` (currently 0 clicks / 189 impressions at pos 4.36) and `/ar/portfolio/remido/` are the ranking URLs and that their titles state the brand name plainly. For `ويب سي`, ensure a Persian page explicitly contains the transliterated brand string.
- **Expected outcome:** CTR moves from 0% toward the 2–4% band for position 4–5. **Combined realistic gain: 9–18 clicks/quarter from 441 impressions currently yielding zero.**
- **Fail-check:** Still 0 clicks after 4 weeks → a competitor or rich result owns the SERP. Reassess whether the query is worth pursuing.

#### P1-3 · Fix the remaining over-length titles (batch)
- **Evidence:** measured in the built output:

| Page | Title length | Issue |
|---|---|---|
| `/fa/services/local-seo/` | **91 chars** | Truncates. 159 impr, pos 37.01, **0 clicks** |
| `/fa/tools/headline-analyzer/` | **72 chars** | Truncates |
| `/ar/` | **103 chars** | Truncates mid-phrase (see P0-2) |

- **Why it matters:** Persian and Arabic glyphs have different average character widths than Latin text, so truncation behaviour differs from the English 60-character rule. Over-length RTL titles lose the trailing clause — which is typically where the differentiator sits.
- **Do:** Batch-audit all title tags across all three locales against a **pixel-width** measure (not character count) and trim to the safe band. Keep H1s expressive; discipline the `<title>`.
- **Expected outcome:** No truncated titles in SERP for the top-20 pages by impressions. `/fa/services/local-seo/` is the priority: 159 impressions at position 37 with 0 clicks — a snippet fix is the only lever available short of a full content rebuild.
- **Fail-check:** SERP still shows `…` on monitored URLs after 4 weeks → the measuring tool and Google's rendering disagree; measure against actual SERP captures instead.

#### P1-4 · Investigate the `Translated results` appearance (position 92.88)
- **Evidence:** `Translated results` — **170 impressions, 0 clicks, average position 92.88.** This is the only search-appearance type the site qualifies for.
- **Why it matters:** Google is auto-translating pages and ranking them at position ~93. This is a signal that locale targeting is weak enough that Google prefers its own machine translation over the site's native content — despite the site publishing genuine native fa/ar content. It is a direct index of the locale-authority problem.
- **Do:** Determine which URLs and which source language produce the translated results (GSC → Search Appearance → Translated results, then cross-reference the Pages report). Confirm hreflang is emitted correctly on those specific URLs. If Google is translating *into* fa/ar, the native versions need stronger locale signals: local currency, local phone/address, local case studies, local spelling conventions.
- **Expected outcome:** Translated-result impressions decline as native locale pages absorb that intent. Success indicator: **`Translated results` average position improves from 92.88 into the 30s**, or the appearance type disappears entirely (either outcome is a win — it means native content won).
- **Fail-check:** Position unchanged after 8 weeks → Google does not consider the native locale content differentiated enough from the English source. This is the core symptom that P2-2 addresses.

#### P1-5 · Consolidate the three SERP-preview tools into one
- **Evidence:** `headline-analyzer` (25,973 impr, pos 14.0) / `serp-preview` (12 impr, pos 51.2) / `meta-generator` (10 impr, pos 25.4) all target the same intent (§2.6). The flagship page cannot break position 14 while its own sibling URLs split the same signal.
- **Why it matters:** Cannibalization is one of the few *directly fixable* causes of a ranking ceiling. Unlike authority or domain strength, this is entirely within your control.
- **Do:** Make `headline-analyzer` the canonical destination. 301 `/{lang}/tools/serp-preview/` → `/{lang}/tools/headline-analyzer/` and fold its desktop+mobile truncation preview in as a section (it is a genuine differentiator worth keeping). Narrow `meta-generator` to meta-description generation only and differentiate its copy so it stops competing. Add a short "Headline Analyzer vs SERP Preview Tool" comparison block so the merged page covers both query shapes. Update `public/_redirects`, `worker.ts`, and `public/llms.txt` consistently.
- **Expected outcome:** Consolidated equity moves `headline-analyzer` from pos 14 → **8–10** within 8 weeks. Combined with P0-5, **+150 to +250 clicks/quarter** — but note these two overlap on the same impression pool, so do not add them together (§6).
- **Fail-check:** Position unchanged after 8 weeks → the ceiling is domain authority, not cannibalization. Stop consolidating and invest in P2-1 depth instead.

#### P1-6 · Rescue or retire the invisible commercial pages
- **Evidence:** `/en/service-areas/dubai/` **0 impressions**; `/en/service-areas/riyadh/` **pos 99.5**; `/fa/service-areas/qazvin/` pos 60.4; 7 tools and 7 EN blog posts with zero impressions (§2.7). Separately, `ecommerce website design tehran` (85 impr) + `ecommerce web design tehran` (80) + `online store development tehran` (43) + `ecommerce development tehran` (28) + `web design agency tehran` (23) = **259 impressions, 0 clicks, and no dedicated page exists.**
- **Why it matters:** These are the pages that should be producing leads. Dubai at zero impressions is a failure of the highest-value page on the site.
- **Do:** (a) **First** run GSC URL Inspection on the zero-impression commercial pages — confirm whether they are unindexed or merely unranked, because the fix differs completely. (b) Publish an EN Tehran e-commerce page (with `fa`/`ar` mirrors) targeting the 259-impression cluster, linked from portfolio items and the e-commerce service page. (c) Triage the 7 zero-impression tools: give each a differentiated title + supporting guide + 3 internal links, or `noindex` it and drop it from the tools hub and sitemap — do not delete (they remain useful for direct and `llms.txt` traffic).
- **Expected outcome:** Dubai/Riyadh either begin registering impressions (if unindexed) or move pos 40–60 → 15–25 (if unranked). Tehran e-commerce page enters at pos 15–25 and matures to 8–12. **+25 to +65 clicks/quarter** at high commercial intent, plus freed crawl budget.
- **Fail-check:** Zero-impression count does not fall after 6 weeks → the problem is internal-link depth, not the pages themselves; check click-depth from the homepage.

---

### P2 — Structural (month 2–3)

#### P2-1 · Build genuine depth on the 8 pages stuck at position 60–90
- **Evidence:** `/en/services/web-design/` (87.91), `/fa/services/seo/` (88.65), `/fa/services/content-creation/` (87.72), `/fa/tools/` (80.31), `/fa/service-areas/tehran/` (76.66), `/fa/services/speed-optimization/` (63.44), `/fa/service-areas/qazvin/` (60.43). Query `طراحی سایت در قزوین` at 65.19.
- **Why it matters:** Position 60–90 is Google's verdict that the page does not answer the query. No on-page tweak changes that verdict. These pages need to become the most complete resource on their specific topic.
- **Do:** For each page, add what competitors lack: original pricing tables, named local case studies with measurable results, process documentation, before/after performance data, and first-hand proof. Link each service page from the matching-locale blog posts and portfolio items — the portfolio entries that already earn clicks (`ramzarz-negaran`, `remido`, `zeytoun-masoud`) should link to their relevant service and area pages.
- **Expected outcome:** Position movement from the 60–90 band into the 20–40 band within 3 months, and the **first clicks from 8 pages currently at ~660 combined impressions / 0–1 clicks.** Target: **20–40 clicks/quarter.**
- **Fail-check:** No movement in 3 months → the query intent does not match the page type. Reconsider whether the query needs a different page format entirely (e.g. a pricing page rather than a service page).

#### P2-2 · Differentiate the three locales — break the 1:1 translation symmetry
- **Evidence:** `/en/` 110 pages → 83 clicks / 28,541 impr. `/fa/` 115 pages → 38 clicks / 2,636 impr. `/ar/` 63 pages → **3 clicks / 837 impr.** Persian has *more* pages than English and 9.2% of its visibility. Arabic is effectively invisible. The `/fa/` homepage ranks 43.72 while `/en/` ranks 5.08.
- **Why it matters:** Identical translated content across locales gives Google no reason to prefer any locale version and gives it no local relevance signal. This is the root cause behind both the `/ar/` invisibility and the `Translated results` at position 92.88.
- **Do:** Keep hreflang (it is correct), but differentiate the *substance* per locale. Persian pages get Iranian pricing in Rial/Toman, Iranian case studies, Iranian payment gateways, and local spelling. Arabic pages get GCC pricing, Vision 2030 and GCC gateway references, and Gulf-market case studies. English pages get USD benchmarks. Start with the five highest-value money pages identified in §2.5.
- **Expected outcome:** `/ar/` moves from 3 clicks to **10–20 clicks/quarter**; `/fa/` improves from 38 to **60–80 clicks/quarter** as its better-CTR content (1.69% vs 0.25% for the US) gains position. Combined target: **+35–60 clicks/quarter.**
- **Fail-check:** Locale CTRs stay flat after 3 months → the differentiation is cosmetic; the pages need genuinely different information architecture, not reworded copy.

#### P2-3 · Deploy the pricing-content formula across all locales
- **Evidence:** `/fa/blog/website-speed-optimization-pricing-guide-2026/` earns **13 clicks at 7.34% CTR from position 14.28.** That single page produces **10.5% of all site clicks** and outperforms the position-5 tool page by 61×. Supporting evidence: `هزینه افزایش سرعت سایت` (9.52% CTR), `سئو سایت در دبی` (12.50%), `محاسبه آنلاین هزینه طراحی سایت` (8.33%).
- **Why it matters:** This is the only pattern in the dataset with *proven* above-benchmark CTR. It works because price-transparent content satisfies commercial intent completely and pre-qualifies the click. It is currently deployed on a handful of pages.
- **Do:** Publish or refresh pricing-intent content per locale, paired with the existing cost calculator tool. Every pricing page should carry a concrete price table, the factors that move the price, and a clear next step. Where prices are genuinely fixed and published, mark them up with `Offer`/`PriceSpecification` — **only where the price is real and honoured.**
- **Expected outcome:** New pricing pages reach the 3–7% CTR band (vs. the 0.39% site average). Target: **30–50 clicks/quarter** from 4–6 new or refreshed pages. This is the highest-confidence growth lever available.
- **Fail-check:** New pricing pages get impressions but <2% CTR → the price presentation is too vague; publish actual numbers rather than "contact us".

#### P2-4 · Strengthen off-site brand and entity signals
- **Evidence:** Brand query `webabc` sits at **position 3.41** (should be 1.0) with 44.19% CTR. `ويب سي` sits at 4.93 with 0 clicks. The schema `sameAs` profile set is thin.
- **Why it matters:** GEO/AEO citation depends on a consistent, corroborated entity footprint. Answer engines and knowledge graphs need multiple independent sources agreeing on what the entity is. On-site markup alone cannot fix a position-3.4 brand query.
- **Do:** Build consistent, verifiable brand presence across independent sources: developer platforms, professional networks, business directories, and industry publications. Keep name, address, and phone identical everywhere. Pursue digital PR and original-data publication — these are the levers that make an entity citable.
- **Expected outcome:** Brand query reaches **position ≤2.0 within 2–3 months**; brand clicks grow beyond the current 38/quarter. Improved entity corroboration raises the odds of AI-engine citation (P3-2).
- **Fail-check:** Brand position unchanged after 3 months → a competing entity owns the name; assess whether to differentiate the brand string.

---

### P3 — AEO / GEO engineering (ongoing)

#### P3-1 · Add AEO citation capsules
- **Evidence:** Zero occurrences of `Speakable`, `QAPage`, or `ClaimReview` in the entire source tree. The site has strong `FAQPage` and `BlogPosting` markup and a `TLDR`/`keyTakeaways` block on posts — but no markup that explicitly designates *which sentence* an answer engine should quote.
- **Why it matters:** Answer engines extract passages, not pages. Explicitly marking the answer capsule — a self-contained 40–60 word direct answer immediately under each question-style H2 — is what makes extraction reliable and attribution likely.
- **Do:** For each key question section, open with a definition-first 40–60 word passage that stands alone without surrounding context, and contains at least one specific, sourced figure. Then apply `Speakable` markup to those designated answer blocks. Add `QAPage` only where genuine user-submitted Q&A exists — **do not fabricate Q&A to obtain markup.**
- **Expected outcome:** Measurable via AI-citation testing (P3-2). Leading indicator: increased impression share on question-format queries (the site already ranks for 120 title/headline queries; extend to question intents).
- **Fail-check:** No citation improvement after 3 months → the capsules are too generic; they need primary data competitors do not have.

#### P3-2 · Establish AI-citation monitoring with fixed prompts
- **Evidence:** `robots.txt` explicitly allows all major AI crawlers and `llms-full.txt` (365,527 bytes) is live — the site is *technically* fully open to AI ingestion. But there is no measurement of whether that ingestion produces citations.
- **Why it matters:** GEO work is unverifiable without a baseline. Without fixed prompts, there is no way to distinguish "the work failed" from "we never measured."
- **Do:** Define 10–15 fixed, representative prompts (the commercial and informational queries from §2.1), and run them monthly across the major AI answer engines, recording whether `webabc.ir` is cited. Track citation rate as a KPI alongside GSC clicks.
- **Expected outcome:** A citation baseline within month 1, then a measurable trend. Target: **cited for ≥3 of 15 prompts within 6 months.**
- **Fail-check:** Zero citations after 6 months despite technical access → the content lacks the primary data and authority signals that make a source quotable. Return to P2-1 and P2-4.

#### P3-3 · Monthly GSC hygiene
- **Do:** Export Queries and Pages monthly. Recompute the zero-click list (impressions ≥200, clicks = 0) and confirm the 60 slash-duplicate groups decay to a single canonical URL per group. Track the `seo title checker for blog by webnewstips com` query separately (see §5.1). Confirm the `headline-analyzer` page's impression concentration falls below 60% as other pages gain visibility.
- **Expected outcome:** Duplicate groups trend toward zero; the headline-analyzer concentration drops from 81.57% as the portfolio diversifies. A single-page dependency below 60% is the target.
- **Fail-check:** Concentration unchanged after 3 months → no page other than headline-analyzer is gaining traction; the content strategy in P2 is not producing.

#### P3-4 · Quarterly content-decay refresh
- **Do:** Identify posts with declining impressions or positions, refresh the content, update `updatedDate`, and let the existing `resolve-sitemap-lastmod.mjs` propagate accurate `lastmod` values into the sitemap. The manifest pipeline already exists and works — use it.
- **Expected outcome:** Refreshed pages recover position within 4–6 weeks. Keeps the 303-URL sitemap signalling genuine freshness rather than churning dates.
- **Fail-check:** `lastmod` changes without content changes → Google will discount the signal. Only refresh dates when content genuinely changes.

---

## 5. Special cases requiring judgment

### 5.1 The `seo title checker for blog by webnewstips com` query — do not chase it
- **Scale:** 10,157 impressions, position 5.55, **0 clicks.** It is 34.55% of all query impressions and the primary driver of the August impression spike.
- **Diagnosis:** The query contains an explicit third-party brand (`webnewstips com`). It is a **navigational query for a competitor's product.** Google is showing webabc.ir as a near-match because the site's tool covers the same function — but the searcher wants webnewstips, so they scroll past.
- **Recommendation:** **Do not optimise for this query.** It cannot convert at scale, and chasing it would mean mimicking a competitor's brand in your own titles — which invites a brand-confusion problem and undermines the differentiation already shipped in commit `ad2687c`.
- **What to do instead:** Treat the 10,157 impressions as **noise to be excluded from trend analysis.** Report CTR both with and without this query so real progress is visible. Monitor that it decays as the differentiated title takes effect.
- **Expected outcome:** Impressions for this query decline as Google re-evaluates intent match. Site CTR *appears* to rise sharply even if nothing else changes — which is precisely why it must be segmented out, not celebrated.

### 5.2 The US market — 59% of impressions, 0.25% CTR
- **Evidence:** United States — **46 clicks from 18,708 impressions (0.25% CTR) at position 12.96.** Meanwhile Iran delivers **52 clicks from 3,084 impressions (1.69% CTR)** at a *worse* position (27.40). The UK (1,793 impr), Germany (1,160), Switzerland (407), Austria (400), and France (324) all earn **zero clicks**.
- **Diagnosis:** The English tool content attracts US search traffic that it then fails to convert. Persian content converts **6.8× better per impression** at a worse average position.
- **Recommendation:** This is a **snippet and intent-fit problem, not a ranking problem.** The US impressions come from tool-intent queries where the site competes with established tools. Two options: (a) sharpen the English tool snippets to compete on specificity, or (b) accept that English tool traffic is a low-value channel and redirect effort to Persian/Arabic commercial content where CTR is proven.
- **Expected outcome:** If pursuing (a): US CTR moves from 0.25% toward 0.6–1.0%, worth **+65–140 clicks/quarter** at constant impressions — the single largest available volume gain. If pursuing (b): reallocate to P2-3 and P2-2.
- **Recommendation:** Pursue **(b) first** — the CTR evidence for Persian commercial content is direct and already proven, while the US tool market is competitive and the current 0.25% CTR shows the site is not winning there.

### 5.3 Device asymmetry
- **Evidence:** Desktop 81 clicks / 18,700 impr (0.43%) at pos 18.34. Mobile 43 / 12,768 (0.34%) at pos **14.50**. Tablet 0 / 93.
- **Diagnosis:** Mobile ranks **4 positions better** than desktop but converts **21% worse**. Better position with worse CTR means the mobile SERP entry is less compelling — likely truncation or layout on mobile.
- **Do:** Check mobile title truncation specifically (mobile SERPs truncate more aggressively than desktop). Verify the mobile snippet renders the differentiator before the cut.
- **Expected outcome:** Mobile CTR closes the gap to desktop (0.34% → 0.45%+), worth **+14–20 clicks/quarter** at constant impressions.
- **Fail-check:** Mobile CTR unchanged after the title work → the issue is page experience, not the snippet.

---

## 6. Measurement framework

### Primary KPIs (track monthly)

| KPI | Baseline (2026-06-19 → 09-18) | 3-month target | 6-month target |
|---|---|---|---|
| Total clicks / quarter | 124 | 200 | 320 |
| CTR (excluding webnewstips query) | ~0.85% | 1.2% | 1.8% |
| Zero-click queries (≥200 impr) | 9 | 5 | 2 |
| Slash-duplicate groups | 60 | 15 | 0 |
| headline-analyzer impression share | 81.57% | 65% | 55% |
| Brand query `webabc` position | 3.41 | 2.0 | 1.0 |
| Pages at position 60–90 | 8 | 4 | 1 |
| `/ar/` clicks per quarter | 3 | 12 | 25 |
| AI-engine citations (of 15 prompts) | unmeasured | baseline | 3 |

### Opportunity sizing — how much is actually available

Applying standard position→CTR benchmarks (pos 3 ≈ 11%, 5 ≈ 5%, 8 ≈ 2%, 10 ≈ 1.2%, 14 ≈ 0.5%, 20 ≈ 0.2%) to the striking-distance pool (163 queries at positions 4–20, 20,615 impressions, 15 clicks today):

| Scenario | Impr pool | Clicks today | Projected @ pos 8 | Projected @ pos 10 |
|---|---|---|---|---|
| All striking-distance queries | 20,615 | 15 | +397 | +232 |
| Excluding the `webnewstips` query | 10,458 | 15 | **+194** | +110 |
| Excluding all competitor-brand queries | 10,114 | 15 | **+187** | +106 |

**The headline "+397" is not achievable** — it is inflated by the 10,157-impression competitor query that cannot convert (§5.1). **The defensible number is +187 to +194 clicks/quarter** from the striking-distance pool alone.

**A note on the targets in the KPI table above.** They are deliberately conservative (124 → 200 at 3 months). A second modelling pass, which includes the P0-5 flagship title change and the P1-5 consolidation, produces a 3-month range of **320–450 clicks**. The difference is entirely explained by how much credit you give P0-5. Recommended posture: **plan against 200, monitor against 320.** If the flagship CTR has not moved by week 6, the conservative number is the right one.

**Do not sum the per-action estimates.** P0-5 (+95–195) and P1-5 (+150–250) both act on the same 25,973-impression pool, as does P2-3 partially. Summing them double-counts the same impressions.

### Secondary diagnostics
- **Segment out** the `webnewstips` query from all CTR reporting. Reporting CTR without segmentation will show a large artificial improvement as that query decays.
- **Always use weighted averages** for position and CTR. The 416-row query tail makes simple averages meaningless (35.34 vs 16.84).
- **Never use the Queries sheet for site-level CTR** — it under-counts clicks by 41.1%.
- **Track impressions and CTR together.** This site has already demonstrated that impressions can grow 1,947% while CTR falls 67%. Impressions alone are not a success metric here.

### Sequencing
The dependency order matters:
1. **P0** fixes (title/description rewrites, `WebSite` schema) must ship first — they are the cheapest and they unblock measurement of everything else. **P0-5 (the "Headline" word-order change) should ship first of all** — one string edit per locale against 81.57% of impressions.
2. **P1** internal-link and snippet work compounds on P0.
3. **P2** content depth is the only thing that moves positions 60–90, and it takes 2–3 months to register.
4. **P3** AEO/GEO work is unverifiable until the P3-2 measurement harness exists — build the harness before doing the optimisation.

---

## 7. Do NOT do

- **Do not chase `seo title checker for blog by webnewstips com`.** It is a competitor's navigational query. Chasing it means imitating a competitor's brand in your titles. See §5.1.
- **Do not re-implement the already-shipped fixes in §3.** BreadcrumbList, FAQPage deduplication, trailing-slash 301s, `llms-full.txt`, and the headline-analyzer title are all verified live.
- **Do not add `FAQPage` schema expecting rich results.** It is correctly retained as entity markup only. FAQ rich results were retired; the markup still helps entity understanding, but it will not produce SERP features.
- **Do not add `HowTo` schema.** Deprecated — it produces no rich result and adds crawl weight.
- **Do not fabricate reviews, ratings, or prices.** The existing gating of `Review`/`AggregateRating` behind genuine reviews is correct discipline. Fabricated ratings are a manual-action risk and destroy the entity trust that GEO depends on.
- **Do not mass-publish AI-generated content.** The site's author boxes and first-hand case data are genuine E-E-A-T assets. Diluting them with synthetic volume would damage the exact signals that make the content citable.
- **Do not add location pages beyond the existing 6 service areas.** Eight area/service pages already sit at position 60–90. More thin pages will not help; depth on the existing ones will.
- **Do not convert the root geo-redirect from 302 to 301.** It is correctly 302 (verified live). A 301 would permanently pin crawlers and browsers to a single locale.
- **Do not report impression growth as success.** The August spike was a liability.
- **Do not sum the per-action click estimates.** P0-5, P1-5 and part of P2-3 all act on the same 25,973-impression headline-analyzer pool. Summing them double-counts the same impressions (§6).
- **Do not assume "zero impressions" means "ranking badly".** It may mean *not indexed*. Run GSC URL Inspection on any zero-impression commercial page before rewriting it (§2.7, P1-6).
- **Do not delete the low-value tools.** `noindex` and de-link them if they earn nothing, but keep them reachable — they are legitimate user utilities and are referenced from `llms.txt` (P1-6).

---

## 8. Summary — the honest position

**What the data says:** The site has a solid technical foundation and a genuine content asset (the headline-analyzer tool, plus proven pricing content). It is not indexed badly, it is not slow, and its structured data is largely correct.

**What is actually broken:**
1. **Concentration risk** — 81.57% of impressions come from one page with a 0.12% CTR. The site's visibility rests on a single asset that converts nothing.
2. **Snippet failure at scale** — 95.67% of queries and 86.51% of pages earn zero clicks. Pages rank (positions 5, 10, 16) and still get nothing. This is copy, not crawl.
3. **Depth failure** — 8 commercial pages sit at position 60–90. These need substance, not tweaks.
4. **Locale failure** — 63 Arabic pages produce 3 clicks. 115 Persian pages produce 9.2% of English visibility. The locales are translated but not localised.
5. **One fragmented schema node** — `WebSite` exists on only 3 of 303 URLs and is split into three per-language `@id` values instead of one site entity (P0-3) — plus a set of over-length RTL titles that truncate mid-phrase.
6. **Self-inflicted cannibalization** — three tools split one intent, and the flagship title leads with the word that converts 43× *worse* than its synonym (§2.1, §2.6, P0-5, P1-5). Both are copy-level fixes on the page holding 81.57% of impressions.
7. **Invisible commercial assets** — `/en/service-areas/dubai/` at 0 impressions, Riyadh at position 99.5, and 14 tools/posts that have never appeared in search at all (§2.7, P1-6). The pages that should generate leads are the ones nobody can find.

**The single highest-confidence growth lever** is the proven pricing-content formula (§2.5, P2-3): a Persian pricing page earns 7.34% CTR — 61× the site's flagship tool page — and produces 10.5% of all site clicks. That formula is deployed on a handful of pages and should be on dozens.

**The single cheapest high-leverage action**, however, is **P0-5**: change one title string per locale so the flagship page leads with "Headline" instead of "Title". It acts on 81.57% of the site's impressions, costs three edits, and rests on a measured 43× CTR differential. Do it this week, before anything else.

**The single largest volume opportunity** is the US market (18,708 impressions at 0.25% CTR), but it requires competing against established tools. The Persian/Arabic commercial path has direct CTR evidence behind it and is the better-sequenced bet.

**The most important measurement discipline:** segment out the webnewstips query, use weighted averages, and never treat impressions as success. This dataset contains a 1,947% impression increase that was entirely a liability.

---

## Appendix A — Top 25 queries by impressions

| # | Query | Impr | Pos | CTR | Clicks |
|---|---|---|---|---|---|
| 1 | seo title checker for blog by webnewstips com | 10,157 | 5.55 | 0.00% | 0 |
| 2 | seo title checker | 3,938 | 16.80 | 0.08% | 3 |
| 3 | title checker seo | 2,803 | 18.51 | 0.00% | 0 |
| 4 | seo title check | 2,055 | 27.00 | 0.00% | 0 |
| 5 | title seo check | 1,077 | 21.01 | 0.00% | 0 |
| 6 | check seo title | 1,006 | 22.54 | 0.10% | 1 |
| 7 | title checker | 522 | 16.56 | 0.38% | 2 |
| 8 | headline checker | 382 | 29.13 | 0.00% | 0 |
| 9 | seo headline checker | 380 | 21.27 | **3.42%** | 13 |
| 10 | title tag checker | 372 | 20.52 | 0.00% | 0 |
| 11 | title seo checker | 333 | 22.47 | 0.60% | 2 |
| 12 | remido | 223 | 5.05 | 0.00% | 0 |
| 13 | ويب سي | 218 | 4.93 | 0.00% | 0 |
| 14 | طراحی سایت در عمان | 207 | 21.19 | 0.00% | 0 |
| 15 | طراحی سایت در قزوین | 198 | 65.19 | 0.51% | 1 |
| 16 | title analyzer | 181 | 26.11 | 0.00% | 0 |
| 17 | check title seo | 178 | 16.85 | 0.00% | 0 |
| 18 | title tag preview | 152 | 17.70 | 0.00% | 0 |
| 19 | خدمات سئو محلی | 143 | 35.20 | 0.00% | 0 |
| 20 | title analysis | 139 | 21.85 | 0.00% | 0 |
| 21 | blog title checker | 138 | 10.25 | 0.00% | 0 |
| 22 | رمز ارز نگاران | 128 | 6.89 | 1.56% | 2 |
| 23 | seo headline | 126 | 19.08 | 0.00% | 0 |
| 24 | moz title tag checker | 123 | 15.26 | 0.00% | 0 |
| 25 | title tag preview tool | 103 | 19.63 | 0.00% | 0 |

## Appendix B — Zero-click pages with ≥50 impressions

21 pages, 2,270 combined impressions, 0 clicks.

| Page | Impr | Pos |
|---|---|---|
| `/ar/` | 232 | 5.01 |
| `/en/tools/headline-analyzer` (non-slash) | 230 | 57.14 |
| `/ar/portfolio/remido/` | 189 | 4.36 |
| `/en/services/web-design/` | 184 | 87.91 |
| `/en/service-areas/tehran/` | 166 | 16.67 |
| `/fa/services/local-seo/` | 159 | 37.01 |
| `/fa/portfolio/soheil-accessory/` | 122 | 6.38 |
| `/fa/service-areas/tehran/` | 89 | 76.66 |
| `/fa/blog/website-development-cost-calculator-guide-2026/` | 87 | 29.43 |
| `/fa/blog/dubai-uae-web-design-seo-guide-2026/` | 84 | 32.76 |
| `/fa/blog/seo-checklist-2026/` | 84 | 36.55 |
| `/en/portfolio/` | 83 | 37.49 |
| `/en/service-areas/` | 81 | 23.16 |
| `/fa/portfolio/mehromah-qazvin/` | 69 | 10.52 |
| `/en/services/local-seo/` | 69 | 14.80 |
| `/en/service-areas` (non-slash) | 62 | 53.39 |
| `/en/tools/utm-builder/` | 61 | 67.92 |
| `/en/tools/keyword-density-analyzer/` | 58 | 20.31 |
| `/en/about/` | 56 | 15.34 |
| `/en/portfolio/soheil-accessory/` | 54 | 5.39 |
| `/en/blog/seo-best-practices-2025/` | 51 | 22.53 |

## Appendix C — Method and provenance

- **Data:** `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (7 sheets) parsed directly from OOXML; totals cross-checked across `Chart` / `Queries` / `Pages` / `Countries` / `Devices`.
- **Clustering:** regex on intent terms; striking-distance filter = position 4–20 with ≥50 impressions; opportunity model uses the position→CTR benchmarks stated in §6.
- **Code claims:** verified by reading source (`src/layouts/`, `src/components/astro/`, `src/i18n/`, `src/pages/`, `src/content/`, `public/robots.txt`, `public/llms*.txt`), the built output in `dist/`, and live HTTP responses — not inherited from the earlier 09-21 audit.
- **Merge note:** this document consolidates two independent analysis passes over the same export. The second pass contributed §1.6 (intent clusters), §2.6 (tool cannibalization), §2.7 (zero-impression inventory), the word-order finding in §2.1, actions **P0-5**, **P1-5**, **P1-6**, the opportunity-sizing model in §6, and Appendices A–C. Where the two passes disagreed on targets, §6 states both and recommends the conservative one.
- **Not verifiable from this export:** index coverage. There is no Coverage/Indexing sheet, so every indexing statement here is inferred from impression patterns and must be confirmed via GSC URL Inspection before acting.

*Analysis derived from `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (GSC, Web, last 3 months, 2026-06-19 → 2026-09-18), verified against the local build output and live HTTP responses on 2026-09-21. No source code was modified.*

