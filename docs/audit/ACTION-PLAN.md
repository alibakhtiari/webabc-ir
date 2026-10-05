# Action Plan — webabc.ir

**Sequenced by dependency, not by score.** Each item states: what to do, primary evidence, and an observable **falsifiability check**.

**Rules of engagement:**
- Never edit a page under an unexpired falsifiability clock.
- Record all shipped items in the Completed ledger with exact commit hashes.
- Do not write new blog posts (existing inventory covers search demand; authority and conversion are the constraints).

---

## 1. Completed Ledger

Shipped, verified against code and live tests, and locked. Kept as a permanent ledger so closed items are never reopened or redone.

| # | Item | Evidence it is closed | Shipped in |
|---|---|---|---|
| 0.1 | GSC re-export diffed | `webabc.ir-Performance-on-Search-2026-09-27.xlsx` diffed against 2026-09-21 export in `CTR-BASELINE-2026-09-27.json`: 289 page rows verified with 92-day `daily_series`. | `cb84b05` |
| 1.1 | Locale-aware 404 with real body | `wrangler.toml` sets `not_found_handling = "404.html"`; `worker.ts` swaps in `/{lang}/404/` and serves `MARKDOWN_404_BODY` to agent UAs. | `dfa9a99` |
| 1.2 | `.md` duplicates noindexed | `worker.ts` static-asset branch stamps `X-Robots-Tag: noindex, follow`, `Link: <https://webabc.ir<htmlPath>>; rel="canonical"` and `Vary: Accept` for all 524 `.md` files in `dist`. Gated by §10 test (22 assertions). | `53c5823` |
| 2.1 | Per-locale `llms.txt` + `llms-full.txt` | Root router + 3 canonical indexes at `public/{en,fa,ar}/llms.txt` (93 links / 9 sections each, exact parity). Dedicated corpora at `public/{en,fa,ar}/llms-full.txt` with zero mid-word truncation. Gated by §9 test. | `7e04f2b` |
| 2.2 | Thin-content triage | All 108 posts rewritten to 1500–2400 word band; 0 posts under 900 words across all locales. | `7c8f9e9` · `049701f` · `94b05e3` |
| 2.3 C | Cluster C merged | `seo-title-optimization-guide-2026` absorbed `how-to-write-clickable-headlines` in all 3 locales (12 H2s, 2,392w); retiree 301s in redirects. | `c3bce47` |
| 2.3 A | Cluster A re-checked, not merged | Four distinct titles across locales with distinct angles; overlap rewritten. | `1e45bf9` |
| 2.3 B-G | Clusters B/D/E/F/G verified distinct | Bodies 1.9–4.6% similar with 0 shared topical H2s; distinct titles and search intents confirmed. | `65c7594` |
| 2.5 | Category → CTA mapping | All 11 categories resolve in `serviceToolDict`; speed post moved `Performance` → `Speed Optimization`; 0 posts hit fallback. | `f6ed62e` |
| 2.6 | Pricing-intent post shipped | `seo-services-pricing-guide-2026` published 2026-09-21 in en/fa/ar (2,211/2,399/2,021w, 8 H2s). Clock active to 2026-11-16. | `5206008` |
| 3.4 | `Organization.sameAs` agency handles | LinkedIn company, X, and Instagram handles wired into Organization schema. | `e4f36c4` |
| 4.1 | Root-URL sitemap exclusion | Documented geo-302 rationale at filter in `astro.config.mjs`. | `c192fe1` |
| 4.5 | Per-tool OG images (21 tools) | `public/images/og/tools/` holds 21 sharp-rendered cards (1200×630 SVG→PNG); sitemap lists 63 localized image entries with 0 fallbacks. | `1d4ce44` |
| 4.6 | Arabic fonts self-hosted | `public/fonts/ar/` holds 19 WOFF2 files behind `@font-face`; 0 Google Fonts references remain. | `2f9ecd5` |
| 4.7 | Tool count aligned at 21 | README, `llms.txt`, and tool routes aligned at 21. | `0026ff1` |
| 4.8 | Automated hreflang parity gate | `verify-hreflang-parity.mjs` gates build across 312 URLs; exits 1 on tag or URL drift. | `a17583b` |
| 4.9 | Redirect sources parity asserted | Test §11 asserts all 63 `_redirects` rules and 54 `STATIC_REDIRECTS` match with single 301 hops. | `01a851d` |
| 4.4 | Dead `/*.html` cache rule removed | Directory build format leaves no `.html` URLs; removed dead rule with 0 cache regression. | `9eedf7b` |
| 4.2 | `#webpage` resolved with WebPage node | `FAQ.astro` emits `WebPage` node with `isPartOf → /{lang}/#website`; `BlogPosting.mainEntityOfPage` points to it. Gated by §12 test. | `fefed73` |
| 4.3 | Per-language `WebSite @id` locked | Verified `@id https://webabc.ir/{lang}/#website` with per-language URL locked by §12. | `fefed73` |
| 3.5 | `ويب سي` in `/fa/` title | Homepage title includes `(ويب سي)` parenthetical (52ch) mirroring description + `alternateName`. Clock to 2026-11-10. | `7fa4d15` |
| 3.2 | Outcome metrics front-loaded | `/ar/`, `ramzarz-negaran`, `soheil-accessory`, and `seo-best-practices` descriptions rewritten with verified metrics. | `f89474a` |
| 1.4 | Competitor query exclusion documented | `ctr_exclusion` recorded in baseline JSON (0.39% with vs 0.58% without); applies to Queries sheet only. | `ebba181` |
| 2.4 | Editorial cadence closed as process | Bulk history retained (never backdated); 105 `updatedDate` bumps atomic with edits; staggered publishes enforced. | docs only |
| 3.1 | Buried pages gained depth + links | Web-design Results section + portfolio cards; Tehran location FAQs; 18 mirrored inbound links. Clock to 2026-11-24. | `5c1ed65` |
| 3.6 | Money-post proof localized | Denominations in toman/AED/USD verified; Mahsun & Qazvin proof localized. Clock to 2026-11-24. | `c4bfca5` |
| OG-1 | fa/ar OG cards batch 1 (money pages) | 74 RTL typography cards in IRANYekanXFaNum for home, tools, services, and top portfolio. | `d930956` · `e979d4b` |
| OG-2 | fa/ar OG cards batch 2 (blog + areas) | 88 RTL cards (38 blog + 6 areas × fa/ar) with verbatim English category eyebrows. | `97e5988` · `45ff4e4` |
| OG-3 | IRANYekanX font stack hardened | FONTCONFIG XDG supplement mechanism verified; all 162 cards regenerated with Bold font. | `10e4df4` |
| 1.3 | Headline-analyzer rewrite shipped | EN plan text (61ch/149ch); fa/ar 1:1 mirrors; OG cards regenerated. Clock to 2026-10-27. | `6a0b7bd` |
| 3.2+ | en-tehran + fa-muscat snippets | Tehran proof-led (151ch); Muscat ODYPS hook + 2 FAQs. Top-rated/24h claims removed. | `8c7a203` |
| MET | Portfolio % reconciliation | Meta FAQs for ramzarz, soheil, mahsun, rostateb, and tehran-enamel aligned with page facts. | `71a4eed` |
| 0.1b | 10-05 GSC export diffed | `webabc.ir-Performance-on-Search-2026-10-05.xlsx` snapshotted to `CTR-BASELINE-2026-10-05.json` (525 queries). Verdict: OPTIMIZE. | `06ee87a` |
| U-1 | Service areas hubs retitled (en/fa/ar) | Hub title and description updated across `src/i18n/{en,fa,ar}/service-areas.json` to pure hub-and-spoke role, removing city names to prevent cannibalizing individual city pages. | `144bb14` |
| U-2 | Qazvin strategic decision: Pillar | Decided Pillar over write-off (agency home base, 254 impr, PSI 100). Scheduled for post-11-24 execution. | `79530dc` |
| U-3 | Local-proof depth on `/fa/services/local-seo/` | Added 6 pillars (GBP, Neshan/Balad, NAP, citations, reviews, near-me), Qazvin proof (Mehromah Mall, Caspian/Liya), transparent price bands, and cross-links. | `efcf145` |
| U-4 (T1) | T1 rebaseline figures in baseline JSON | Added root `ctr_exclusion` to `CTR-BASELINE-2026-10-05.json` (0.45% with vs 0.65% without webnewstips: 151/33,387 vs 151/23,229). | `c0dce74` |
| U-4 (T10) | FAQPage claim corrected in README | `README.md:24` updated to reflect Google's 2026-05-07 FAQ rich result retirement while maintaining entity & AEO value. | `c0dce74` |
| U-5 (T9) | Shipped `public/ai-catalog.json` | Generated by `scripts/generate-ai-catalog.mjs`: 21 tools + 12 services in 3 locales; built into pipeline and verified by `verify-agentic.mjs` §13. | `54e3d07` |
| Tooling | Safe dependency updates & lint modernized | Safe minor/patch upgrades applied, TypeScript bumped to `6.0.3`, ESLint replaced with `astro check`, version bumped to `1.1.0`. | `add14c4` |

---

## 2. Active Falsifiability Clocks & Scheduled Roadmap

All future code tasks are sequenced behind explicit falsifiability clocks. **Do not modify these pages before their due date**, as premature edits destroy measurement integrity.

```
2026-10-19 ─► Remido snippet read (§3.2b) + title trim (T3)
          ─► /ar/ title gains «ويب سي» if CTR still 0 (T2)
          ─► /ar/ mobile LCP fix (T12)
2026-10-27 ─► Headline-analyzer CTR & position read (§1.3 / T4)
post-10-27 ─► SpeakableSpecification on tool layouts
2026-11-05 ─► fa cost-calculator retarget 30d evaluation & visible price table
          ─► fa speed-optimization H2 align with «قیمت بهینه سازی سرعت»
2026-11-10 ─► /fa/ homepage brand read («ويب سي», §3.5)
          ─► /fa/ homepage body depth rewrite
2026-11-16 ─► Pricing-intent post 8-week evaluation (§2.6)
          ─► Moz title checker alternatives decision (MU-2)
2026-11-24 ─► Buried pages 8-week evaluation (§3.1: web-design, tehran, qazvin)
          ─► Qazvin pillar build execution (U-2)
          ─► Area page openers enhancement (fa/ar)
```

### Calendar Detail

#### Due 2026-10-19
- **T3 `/en/portfolio/remido/` Title Trim:**
  - *Context:* Current title is 65 rendered characters (over 60 limit). Brand query `remido` earns 224 impressions at pos 4.3 with 0 clicks.
  - *Action:* Trim title to ≤60 characters (e.g. `Remido – Kalimba E-Commerce & Warranty | WebABC Case Study`).
  - *Falsifiability Check:* Evaluate alongside §3.2b description rewrite; CTR on `remido` > 0% within 4 weeks.
- **T2 `/ar/` Homepage Title Brand Addition:**
  - *Context:* `ويب سي` earns 285 impressions at pos 4.9 with 0 clicks on `/ar/`.
  - *Action:* If CTR on `/ar/` is still 0% on 10-19, add `(ويب سي)` verbatim to the Arabic `<title>` (under 60 rendered characters), mirroring `/fa/`.
  - *Falsifiability Check:* Pos ≤ 2 on `ويب سي` by 2026-11-10.
- **T12 `/ar/` Mobile LCP Optimization:**
  - *Context:* PSI Mobile lab score is 3.3s LCP (sole performance defect on property).
  - *Action:* Diagnose specific LCP element on `/ar/` and optimize without touching metadata or text under clock.
  - *Falsifiability Check:* PSI Mobile lab LCP ≤ 2.5s.

#### Due 2026-10-27
- **§1.3 Headline Analyzer Performance Evaluation (T4):**
  - *Context:* Shipped 2026-09-29.
  - *Action:* Read Search Console API for `/en/tools/headline-analyzer/`.
  - *Evaluation Rules:* If daily impressions remain ~4/day following the 09-21 competitor collapse, diagnose distribution; do not label "title failed" into a volume vacuum. If impressions recover to >100/day, evaluate whether CTR moved off 0.12%.
- **Post-10-27 Tool Layout Schema:**
  - *Action:* Add `SpeakableSpecification` JSON-LD to `headline-analyzer` and `cost-calculator` tool layouts across all 3 locales (shared layout cannot be touched mid-clock).

#### Due ~2026-11-05
- **`/fa/tools/cost-calculator/` Enhancement:**
  - *Action:* Evaluate the 2026-10-05 retargeting at WordPress queries (`محاسبه آنلاین هزینه طراحی سایت وردپرس`). Add visible price comparison table and FAQ block matching commercial search intents.
  - *Falsifiability Check:* Any of the 3 calculator queries reaches pos ≤ 20.
- **`/fa/services/speed-optimization/` Alignment:**
  - *Action:* Align one H2 in the speed post/service with `قیمت بهینه سازی سرعت` (102 impressions, pos 26.9).
  - *Falsifiability Check:* Query reaches pos ≤ 15 with ≥ 1 click/week.

#### Due 2026-11-10
- **§3.5 Persian Brand SERP Read:**
  - *Action:* Read position and clicks for `(ويب سي)` on `/fa/`.
  - *Evaluation Rule:* If position ≤ 2, successful. If position sits at ~5 with 0 clicks, external brand competition confirmed; escalate to directory listings and brand PR, not further on-page edits.
- **`/fa/` Homepage Body Depth Rewrite:**
  - *Action:* Rework first 100 words to explicitly declare agency offerings, Qazvin physical presence, Gulf coverage, and commercial CTAs.

#### Due 2026-11-16
- **§2.6 Pricing-Intent Post Evaluation:**
  - *Context:* `seo-services-pricing-guide-2026` shipped 2026-09-21 in en/fa/ar.
  - *Action:* Check whether any pricing query reaches position ≤ 20. If all sit > 40, market lacks that search demand; cease producing pricing content.
- **MU-2 Moz Alternatives Post vs Tool Split:**
  - *Action:* Decide whether to sharpen `moz-title-checker-alternatives` or formally designate `headline-analyzer` as canonical target for Moz-branded title queries.

#### Due 2026-11-24
- **§3.1 Buried Pages Evaluation:**
  - *Action:* Evaluate `/en/services/web-design/` (was pos 87.9), `/fa/service-areas/tehran/` (was 76.7), and `/fa/service-areas/qazvin/` (was 60.4).
  - *Falsifiability Check:* Position must move ≥ 20 places. If flat, query intent is beyond page relevance.
- **U-2 Qazvin Pillar Build Execution:**
  - *Context:* Strategic decision made to build Qazvin into a primary Pillar asset (own home market, 254 impressions on `طراحی سایت در قزوین`, PSI 100).
  - *Action:* Build out local pricing table, localized case studies (Mehromah, Caspian industrial parks), dedicated local FAQ block, and inbound link equity from `/fa/` and `/fa/services/web-development/`.
  - *Falsifiability Check:* Pos ≤ 20 on `طراحی سایت در قزوین` within 8 weeks post-launch.
- **Service Area Openers (fa/ar):**
  - *Action:* Enhance openers for Qazvin, Tehran, Dubai, and Muscat to answer cost and timeline queries in 40–60 words per spec §3.

---

## 3. Open Strategic Decisions

1. **MU-1: UTM Builder Query Fate (`url builder` 81 impr @ pos 41.2):**
   - *Analysis:* `/en/tools/utm-builder/` already holds 23 inbound links, exact-match `<title>`, and meta description. SERP is dominated by dedicated domain builders (`utmbuilder.net`, `utm.io`, Google Campaign URL Builder).
   - *Decision Options:*
     - (a) Differentiate toward an underserved niche (e.g. multi-channel agency bulk UTM builder) with verified query demand.
     - (b) Formally accept positions 30–50 long-tail traffic and make no further code/content changes.
     - *(Recommendation: Option b — do not spend further equity unless impressions pass 200/28d).*

2. **MU-2: Moz Title Checker Query Attribution:**
   - *Analysis:* `moz title checker` (113 impr @ 10.3) and `moz title tag checker` (144 impr @ 15.4) attribute to `/en/tools/headline-analyzer/`, not the dedicated post `moz-title-checker-alternatives`.
   - *Decision Options:*
     - (a) Sharpen the blog post into an objective, data-backed comparison shootout.
     - (b) Accept the tool page as the canonical ranking asset and retain the blog post as supporting content.
     - *(Scheduled for resolution on 2026-11-16).*

---

## 4. Owner-Gated Tasks (Human Dependencies)

These tasks cannot be executed via automated code changes and await owner delivery:

1. **Agency Social Profiles for Entity Corroboration (§3.3):**
   - Deliver agency-level LinkedIn company and X profiles distinct from personal handles.
   - *Action on delivery:* Wire URLs into `Organization.sameAs` across all locales.
2. **5 Frozen GEO Test Prompts Baseline (§0.3 / §4.11):**
   - Manually query the 5 frozen prompts in ChatGPT Search, Perplexity, Google AI Overviews, and Gemini:
     1. `best free seo title checker 2026`
     2. `how much does a website cost in 2026`
     3. `technical seo audit checklist`
     4. `web design agency qazvin` / `طراحی سایت در قزوین`
     5. `best headline analyzer tool`
   - Record: Mentioned? Linked? Which URL? Position in answer?
3. **Portfolio Metric Reconciliation Nuances (MET):**
   - Provide business context on conflicting figures across legacy marketing copy: Remido, Odyps, and Samake (+320% vs +260% vs 140%).
4. **Google Analytics 4 Property ID (T14):**
   - Supply `ga4_property_id` to activate organic traffic and AI-Assistant referral tracking in GSC/GA4 tooling.

---

## 5. Rules of Engagement & Invariants

1. **No New Blog Posts:** 108 existing posts fully cover query demand. Constraint is commercial conversion and authority, not post count.
2. **Never Edit Mid-Clock:** Respect all scheduled falsifiability clocks. Editing a page mid-clock invalidates search measurement.
3. **No Prohibited Schema:** Do not add `SearchAction`, `BreadcrumbList` on homepages, `QAPage`, `HowTo`, or fabricated ratings. Keep `FAQPage` for entity context without claiming SERP rich results.
4. **Permanent Root 302:** Never change root `/` geo-redirect to 301.
5. **Exact Slugs & Hreflang Parity:** Slugs must remain byte-identical across `en`, `fa`, and `ar`. `verify-hreflang-parity.mjs` must gate every build.
6. **No Indexing API Abuse:** Indexing API is strictly reserved for `JobPosting` and livestream video content per Google guidelines.
