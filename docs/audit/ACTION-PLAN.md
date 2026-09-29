# Action Plan — webabc.ir

**Sequenced by dependency, not by score.** Each item states: what to do, which file proves the finding, and a **falsifiability check** — the observable evidence that would say the fix did not work.

Severity scale: Critical → High → Medium → Low. Phase boundaries are dependencies: Phase 3 items are already queued behind Phases 1–2 because they move on a slower clock (relevance/depth/link equity) than title or code fixes.

---

## Completed

Shipped and verified against the code. Kept as a ledger so closed items are not reopened or redone.

| # | Item | Evidence it is closed | Shipped in |
|---|---|---|---|
| 0.1 | GSC re-export diffed | `webabc.ir-Performance-on-Search-2026-09-27.xlsx` (2026-06-25 → 2026-09-24, 3-month filter) diffed against the 2026-09-21 export into `docs/audit/CTR-BASELINE-2026-09-27.json`: 289 page rows, `kind` rules re-verified 289/289 against the prior file, plus a 92-day `daily_series`. The rolling window moved forward 6 days so the diff is **not** same-window, and the Pages sum exceeds the Chart total by 500 impressions — both recorded in the file's `note` | `cb84b05` |
| 1.1 | Locale-aware 404 with a real body | `wrangler.toml` sets `not_found_handling = "404.html"`; `worker.ts` swaps in `/{lang}/404/` for locale-prefixed paths and serves `MARKDOWN_404_BODY` to agent UAs | `dfa9a99` |
| 1.2 | `.md` duplicates noindexed | `worker.ts` step 4 now special-cases `.md`: `X-Robots-Tag: noindex, follow`, `Link: <https://webabc.ir<htmlPath>>; rel="canonical"` resolved by a new `htmlPathFor()` (inverse of `markdownPath()`), plus `Vary: Accept`. Covers all **524** representations in `dist` (313 `/index.md` + 211 bare) — the finding's *205* predates the rewrites. Only `404.md` lacks a directory twin; it is noindexed with **no** canonical, because `/404/` answers 404. Negotiated markdown on the HTML URL is untouched; §10 asserts 22 cases including three negatives proving the rule did not spill onto `llms.txt` or the HTML-URL representation | `53c5823` |
| 2.1 | Per-locale `llms.txt` + `llms-full.txt` | `public/llms.txt` is now a **language router** — `## Available Languages` pointing at all three canonical indexes, plus a curated 25-URL `## Core Global Content (English)` and the full agent guidance, so the original five §9 assertions still hold. Canonical indexes at `public/{en,fa,ar}/llms.txt`, each **93 links / 9 sections** (identical counts); parity is structural, `scripts/generate-llms-index.mjs` throws rather than ship an unbalanced index. fa/ar gained the 10 services and 5 service-areas they were missing (services 12/12/12, areas 7/7/7 now) and carry translated guidance in `src/i18n/{fa,ar}/llms-guidance.md`, all from `scripts/llms-index.data.json`. Corpus split per locale as `public/{en,fa,ar}/llms-full.txt` (217/236/221 KB) with root kept as an English fallback (202 KB) so existing recovery links still resolve. Discovery: locale-aware `<link rel="describedby">` in `Layout.astro`, `Link: </{lang}/llms.txt>; rel="describedby"` on HTML from `worker.ts`, and `text/plain; charset=utf-8` pinned on `.txt` — served in one hop with no geo variation (`STATIC_REDIRECTS` holds no `.txt` keys and the geo rule fires only on exact `/`). Fixes two defects the old file had: it shipped **512,002 bytes (2 over cap)** from a dangling UTF-8 lead byte, and silently dropped 2 of 12 curated posts mid-Arabic-word — whole-post exclusion now reports what it omits, and all four files fit with **0 omitted**, under the new 480 KB warning | `7e04f2b` |
| 2.2 | Thin-content triage | all 108 posts rewritten to the `docs/BLOG-REWRITE-SPEC.md` band — **0 posts under 900 words** in any locale (was 22/36 EN); minimum rose 323 → 1,532 | `7c8f9e9` · `049701f` · `94b05e3` |
| 2.3 C | Cluster C merged | `seo-title-optimization-guide-2026` absorbs `how-to-write-clickable-headlines` in all 3 locales — 12 H2s, block-identical across locales, 2,392/2,360/2,372w. Retiree 301s in both redirect sources, is absent from every sitemap, and `blog-links-baseline.json` asserts the union of both posts' 8 links survived | `c3bce47` |
| 2.3 A | Cluster A re-checked, **not** merged | the 4→2 premise was written when the posts were 418–1,533w with two identical H1s; after §2.2 they are 1,783–2,378w with 4 unique titles in every locale and matching H2 counts (6/9/10/10) across locales. Merging would have cost ~4,364 words to fix a collision that was already gone — so the one genuine overlap was rewritten instead | `1e45bf9` |
| 2.3 B/D/E/F/G | 5 clusters re-checked, **no action** | re-measured after §2.2: bodies **1.9–4.6%** similar with **0 shared topical H2s** across all 10 posts (F shares only the boilerplate `Conclusion` / `References`); the prescribed fixes were already in the titles in all 3 locales (B *Business Decision Guide* vs *Architecture Guide*, D pricing vs step-by-step); G's *"one is a rewrite of the other"* predates §2.2 — now a conceptual primer against a technical build guide; F's recorded *"different categories (`Web Design` vs `UI/UX Design`)"* premise was **never true**, `modern-ui-ux-trends` is `Web Design` in all 10 of its commits. Demand across all 5 clusters: **43 impressions / 1 click** in 92 days vs 33,178 site-wide (F and G earn 0 queries). Each merge would need a **30–45% cut** to fit `verify-blog-spec.py:27` (`w > 2400` is a hard failure). Re-open trigger: next export ~2026-10-08, only if queries gain volume **and** both URLs still split positions | `65c7594` |
| 2.5 | Category → CTA mapping | all 11 categories resolve in `serviceToolDict`; `website-speed-optimization-pricing-guide-2026` moved `Performance` → `Speed Optimization`; **0 of 39 posts hit the fallback** | `f6ed62e` |
| 2.6 | Pricing-intent post | `seo-services-pricing-guide-2026` ("SEO Services Pricing Guide 2026: Costs, ROI & Packages") shipped 2026-09-21 in all 3 locales — 2,211/2,399/2,021w, 8 numbered H2s, `H3=5 · kt=9 · faq=5 · links=7` identical across locales, openers 40–60, both committed gates green. No *second* pricing post is warranted: all 4 zero-click pricing queries ≥10 impressions already have a dedicated asset (175 impressions total). 8-week falsifiability clock runs to **2026-11-16** | `5206008` |
| 3.4 | `Organization.sameAs` is agency-owned | LinkedIn company, X and Instagram agency handles plus the repo's GitHub. The 3 displaced personal URLs were not dropped — they still sit on the Person schema (7 entries) | `e4f36c4` |
| 4.1 | Root-URL sitemap exclusion documented | the geo-302 rationale now sits at the `filter` in `astro.config.mjs` | `c192fe1` |
| 4.5 | Per-tool OG images | `public/images/og/tools/` holds all **21** cards (1200×630, 39–54 KB), drawn as SVG and rasterised with the `sharp` already in devDependencies instead of the GPT-image model whose OAuth token had expired — so no model, no React/shadcn, and no request-time rendering. `scripts/generate-og-tool-images.mjs` reads each title/description from the same `t()` call the page makes (via the namespace map in `get-dictionary.ts`) and the category from `tools.ts`, so a card cannot drift from its page; it measures its own render and shrinks the title until the line fits inside the frame. Manifest registers 21 `tools/*` entries, the sitemap carries **63 `/tools/` image entries across 21 distinct files (3 locales each) with 0 falling back to `og-image.webp`**, and the build is byte-for-byte what it was — the cards are committed assets, not build output | `1d4ce44` |
| 4.6 | Arabic fonts self-hosted | `public/fonts/ar/` holds 19 woff2 files (289.5 KB) behind 28 `@font-face` rules; both Google preconnects and the render-blocking remote stylesheet are gone — **0 references** to `fonts.googleapis.com` / `fonts.gstatic.com` remain | `2f9ecd5` |
| 4.7 | Tool count aligned at 21 | README, `llms.txt`, and the 21 tool routes all agree on 21 | `0026ff1` |
| 4.8 | Hreflang parity asserted at build | `verify-hreflang-parity.mjs` runs as the last step of `npm run build` across 312 URLs; drift test exits 1 with a URL + tag diff, restore exits 0 | `a17583b` |
| 4.9 | Redirect sources kept in agreement by test | §11 parses all 63 `public/_redirects` rules and asserts each resolves through the worker in one 301 hop to the same target, with all 54 `STATIC_REDIRECTS` entries mirrored in the file | `01a851d` |
| 4.4 | Dead `/*.html` cache rule deleted | `build.format: 'directory'` means no served URL ends in `.html`; live HTML `cache-control` verified identical before/after (platform default, no `Cache-Control` in code) | `9eedf7b` |
| 4.2 | Dangling `#webpage` resolved with a real `WebPage` node | `FAQ.astro` emits the node (`url` + `inLanguage` + `isPartOf → /{lang}/#website` + conditional `breadcrumb`); `BlogPosting.mainEntityOfPage` points at it; identities from `src/utils/schemaIds.ts`; §12 sweeps 114/114 blog files | `fefed73` |
| 4.3 | Per-language `WebSite @id` — already true, now locked | no code change (premise predates the per-language `createWebsiteSchema`); verified live on en/fa/ar homepages, §12 fails on regression | `fefed73` |
| 3.5 | `ويب سي` reinforced in the `/fa/` title | About carried the string in `<title>` while the homepage did not; the homepage title now carries the `(ويب سي)` parenthetical verbatim (52ch), mirroring description + `alternateName`. Clock 2026-09-29 → 2026-11-10; `webabc` >2.0 alongside means external competition → listings/PR | `7fa4d15` |
| 3.2 | Outcome metrics front-loaded into 4 snippets | `/ar/` offer-led (114ch), ramzarz rank-1 (111ch), soheil +210%/96 (98ch), best-practices 8 steps (129ch); titles untouched. Metric conflicts (+320%/+260%/140%) parked as follow-ups, not mixed in | `f89474a` |
| 1.4 | webnewstips exclusion recorded | `ctr_exclusion` + `note` in the baseline JSON: 0.39% with vs 0.58% without; applies at Queries sheet, never page rows | `ebba181` |
| 2.4 | Editorial cadence closed as process | bulk history retained (no backdating); 105 bumps rewrite-justified and atomic; new publishes staggered; lastmod pipeline verified; standing rule + quarterly check recorded | docs only |
| 3.1 | Buried pages gain depth + links | web-design Results section + orphaned features render; Tehran 3 location FAQs; 18 mirrored inbound links; checker legacy verified retired | `5c1ed65` |
| 3.6 | Money-post proof localized per locale | denominations + Mahsun + Qazvin already per-locale from §2.2/§3.1; new Gulf-QA sentences + Dubai/Riyadh links in cost-guide §5 ×3 | `c4bfca5` |
| OG-1 | fa/ar OG cards batch 1 (money pages) | 74 RTL typography cards (home + 21 tools + 11 services + top-4 portfolio × fa/ar) in IRANYekanXFaNum, mirrored tool-card system, self-guarded generation; locale-first `og:image` in Layout + sitemap, English art untouched | `d930956` + `e979d4b` |
| OG-2 | fa/ar OG cards batch 2 (blog + areas) | 88 RTL cards (38 blog with verbatim-English category eyebrows + 6 areas × fa/ar); blog pages prefer locale cards over covers (covers stay in-article); sitemap locale-first with shared fallback; unquoted-YAML frontmatter blind spot fixed | `97e5988` + `45ff4e4` |
| 1.3 | Headline-analyzer rewrite shipped | EN plan text verbatim (61ch/149ch); fa/ar 1:1 mirrors, all claims evidenced; fa/ar OG cards regenerated. Clock 2026-09-29 → 2026-10-27 | `6a0b7bd` |
| 3.2+ | en-tehran + fa-muscat snippets + honesty fixes | tehran proof-led 151ch (top-rated/24h claims removed); muscat ODYPS hook + 2 FAQs; Omani-gateway clause removed (SEK/EUR evidence) | `8c7a203` |
| MET | Portfolio % reconciliation (5 cases × 3) | page-results rule: ramzarz/soheil/mahsun/rostateb/tehran-enamel meta FAQs rewritten to page values. Backlog: remido/odyps/samake meta-vs-page deltas (different-metric nuances need human labels); escalated: reality of +320%/+260%/140%, Rank-1 re-check | `71a4eed` |

---

## Phase 0 — Measurement foundation (do first, ~half a day)

You cannot verify any GROW claim below without these two things.

| # | Action | Why it blocks | Falsifiability check |
|---|---|---|---|
| 0.1 | ~~**Re-export GSC** (same 3-month window) and diff against `webabc.ir-Performance-on-Search-2026-09-21.xlsx`~~ — **shipped `cb84b05`**, see the ledger | Establishes the baseline every other check compares to | Done: diffed into `docs/audit/CTR-BASELINE-2026-09-27.json`. The rolling 3-month window moved forward 6 days, so treat the diff as a shifted-window comparison, not a same-window one |
| 0.2 | **Configure PSI/CrUX credentials** at `~/.config/claude-seo/google-api.json` | No CWV data exists anywhere; Performance is currently a proxy estimate | Until field LCP/INP/CLS exist, **no performance claim in this audit may be treated as measured** — **declined by owner 2026-09-29, closed with §4.10** |
| 0.3 | **Define the 5 fixed GEO test prompts** and record today's answers in ChatGPT Search, Perplexity, Google AI Overviews, Gemini | Nothing measures citations today | If prompts change month to month, the series is not comparable — freeze the list — **parked by owner 2026-09-29 ("not now"); re-offer later, with §4.11** |

**Test prompts (freeze these):**
1. `best free seo title checker 2026`
2. `how much does a website cost in 2026`
3. `technical seo audit checklist`
4. `web design agency qazvin` / `طراحی سایت در قزوین`
5. `best headline analyzer tool`

Record per prompt: mentioned? linked? which URL? position in answer?

---

## Phase 1 — Critical (week 1)

### 1.2 Stop indexing 205 markdown duplicates 🟠

**Finding:** `03-technical.md` §7 · **Root cause:** `worker.ts` step 4 returns `.md` assets raw; the site-wide `_headers` `/*` rule stamps `X-Robots-Tag: index, follow`.

**Do:** special-case `.md` in the static-asset branch:
```ts
if (/\.md$/i.test(url.pathname)) {
  const headers = new Headers(assetRes.headers);
  headers.set('X-Robots-Tag', 'noindex, follow');
  headers.set('Link', `<${htmlUrlFor(url.pathname)}>; rel="canonical"`);
  headers.set('Vary', 'Accept');
  return new Response(assetRes.body, { status: assetRes.status, headers });
}
```
**Keep** the *negotiated* markdown on the HTML URL (correctly `Vary: Accept`) fully available. Only the separate `.md` URL gets noindexed.

**Shipped:** `htmlPathFor()` (the inverse of the existing `markdownPath()`) resolves both shapes — `dist` holds **313 `/index.md` + 211 bare `.md` files, 524 total**, so the *205* in the finding is stale, not wrong in kind; only `404.md` has no directory twin. The branch emits `noindex, follow` + `Link: rel="canonical"` to `https://webabc.ir<htmlPath>` + `Vary: Accept`. One deliberate deviation: `/404.md` maps to `/404/`, which **answers 404**, so it is noindexed but declares **no** canonical rather than pointing one at a 4xx. Negotiated markdown on the HTML URL is byte-for-byte unaffected. Gated by a new §10 (22 assertions) covering both `.md` shapes, `/index.md`, the 404 exemption, and three negative cases proving the rule did not spill onto `llms.txt` or the HTML-URL representation.

**Falsifiability check:**
> `curl -D- …/index.md` shows `x-robots-tag: noindex` **and** a `link: …; rel="canonical"` header. Search Console → URL Inspection on a `.md` URL reports "noindex".

**Alternative (also acceptable):** keep `.md` at 200 but *must* emit the `Link: rel="canonical"` header. Shipping neither is not.

---

### 1.3 Rewrite the headline-analyzer title + description 🔴

**Finding:** `01-gsc-performance.md` §3 · `02-on-page-serp.md` §3.

**This is the highest-value single edit on the site** — it targets 75% of all impressions.

**Do (EN):**
```
Current (58ch): Free Headline Analyzer + SEO Title Checker [Pixel-Perfect]
Proposed (~59ch): Headline & Title Checker — Score CTR + See Exact Google Width
```
```
Description (~154ch):
Score any headline or title tag for CTR, then see the exact pixel width Google
will show — desktop and mobile. No signup, no watermark, free in 2026.
```
Mirror the leading-noun swap into `src/i18n/fa/tools/headlineAnalyzer.json` and `src/i18n/ar/tools/headlineAnalyzer.json`.

**Why this shape:** leads with *both* intents, "Score CTR" is the action verb, "exact Google width" is unownable specificity no competitor brand can claim, and it stops reproducing webnewstips' product-name phrasing.

**Falsifiability checks:**
- **Leading (GROW, days–weeks):** headline-analyzer page CTR moves off 0.12% **before** position moves off 13.97.
- **Failed (ACCEPT):** after 4 weeks, `seo title checker for blog by webnewstips com` still ≥8k impressions at 0 clicks **and** page CTR still <0.5% → the title change did not land; re-test a different leading noun.
- If CTR rises but position does not: title worked, you now need links (→ Phase 3).

**Shipped `6a0b7bd` 2026-09-29 (freeze lifted by owner):** EN ships the plan text verbatim (61ch/149ch); fa/ar mirror the leading-noun swap 1:1 — pixel width, desktop/mobile, no-signup all evidenced in-tool, no new facts. fa/ar OG cards regenerated. Clock runs 2026-09-29 → 2026-10-27.

---

### 1.4 Settle the competitor-branded query 🟠

**Finding:** `01-gsc-performance.md` §4.

**Do:** after 1.3, **exclude `seo title checker for blog by webnewstips com` from all CTR targets.** It is 32% of the property's impressions and structurally un-winnable. Report CTR with and without it, every time.

**Falsifiability check:** if after title differentiation it still shows 10k+ impressions at 0 clicks, it is structural — confirm the exclusion is permanent and stop revisiting it.

**Closed 2026-09-29 (`ebba181`, reporting convention — no page rows touched):** the baseline JSON carries no query-level rows, so the exclusion is recorded where it applies — `CTR-BASELINE-2026-09-27.json:note` + machine-readable `ctr_exclusion`: 2026-09-21 with 0.39% (124/31,561) vs without 0.58% (124/21,404); exclusion applies at the Queries sheet of each xlsx export, never to a page row (the query has no page dimension).

---

## Phase 2 — High (weeks 2–4)

### 2.1 Rebalance `llms.txt` toward the converting market 🟠

**Finding:** `08-geo-ai-citations.md` §3 · originally **69 en / 22 fa / 20 ar** links while **Iran is the only market converting (1.69% CTR vs US 0.25%)**.

> **Two premises were stale by the time this was actioned.** The *69/22/20* split predates `67ad675`, which had already listed all 21 tools for fa and ar — the file actually read **87 / 67 / 65**, so fa/ar exposure was largely there and the real gap was structural: fa and ar sat in two flat append-only sections missing 10 services and 5 service-areas each. And *424 KB* described neither file: `llms-full.txt` was **512,002 bytes**, 2 over its own cap, because the truncation loop backed off continuation bytes but left the UTF-8 lead byte dangling — and it had silently dropped 2 of 12 curated posts, the tail cut mid-word in Arabic.

**Do:**
- Expose blog deep links at parity: **24 / 24 / 24** (72 total) → shipped at **39 / 39 / 39**.
- Expose tools and service pages in all three languages → services **12 / 12 / 12**, service areas **7 / 7 / 7**, tools **22 / 22 / 22**.
- Apply the same rebalance inside `scripts/generate-llms-full.mjs` → now emits one single-language corpus per locale.
- Add a build-time warning at **480 KB** → added; no file trips it (largest is 236 KB).

**Shipped:** `scripts/generate-llms-index.mjs` builds a root language router plus three canonical indexes — **93 links / 9 sections each**, identical counts — from `scripts/llms-index.data.json`, and throws rather than ship an unbalanced index; `src/i18n/{fa,ar}/llms-guidance.md` carry the translated agent guidance (English extracted verbatim to `src/i18n/en/`). `scripts/generate-llms-full.mjs` writes `/{lang}/llms-full.txt` for all three locales plus an English root fallback, excludes whole posts instead of cutting mid-word (**0 omitted now, 2 before**), and warns above 480 KB. `worker.ts` pins `text/plain; charset=utf-8` on `.txt` and advertises `Link: </{lang}/llms.txt>; rel="describedby"` on HTML; `Layout.astro` emits the locale-aware `<link rel="describedby">`. Gated by the rewritten §9 in `scripts/verify-agentic.mjs`, which now asserts router shape, per-locale parity, corpus caps, direct 200 + charset on all three `.txt` files, and the discovery headers.

**Falsifiability check:** fa/ar prompts in ChatGPT/Perplexity start producing Persian/Arabic-language answers about the site's services. If they still return nothing after 4 weeks (**2026-09-28 → 2026-10-26**), `llms.txt` exposure was not the binding constraint → move to off-site footprint (2.4).

**Decision 2026-09-29 (owner): keep 93 links/locale, thread closed.** Full tool/service/area/blog parity is the point of the indexes; curation to ≤50 would delete in-scope surface. No further action.

---

### 2.3 Consolidate 7 cannibalization clusters 🟠

**Finding:** `05-content-blog.md` §4 · bodies are **3–7% similar (genuinely distinct content)** — this is **title/intent cannibalization, not duplicate content**.

| Cluster | Posts | Action |
|---|---|---|
| **A — "How much does a website cost"** (worst: two identical H1s) | `how-much-does-a-website-cost-2026` (1,533w) · `website-development-cost-guide-2026` (418w) · `website-development-costs` (507w) · `website-development-cost-calculator-guide-2026` (436w) | **Re-checked 2026-09-27 → no merge.** The §2.2 rewrites already did this: they are now 1,783/2,378/1,986/1,969w with four distinct titles in every locale and matching H2 counts across locales. The remaining overlap was a near-identical hidden-costs opener, which was rewritten instead — see the ledger, `1e45bf9` |
| **B — WordPress vs custom** | `wordpress-vs-custom-development` (608w) · `wordpress-vs-custom-development-guide-2026` (416w) | **Re-checked 2026-09-27 → no action.** The prescribed angle split is already in the titles in all 3 locales: *Business Decision Guide* vs *Architecture Guide* (fa `راهنمای تصمیم کسب‌وکار` vs `راهنمای معماری`, ar `دليل قرار العمل` vs `مقارنة 2026`). Bodies 1.9/3.6/3.6% similar, **0 of 10 shared H2s**. Demand: **1 query, 4 impressions, 0 clicks** — and that query (`wordpress seo company near me`) belongs to a service page, not these posts |
| **C — Title/headline** ⚠️ overlaps the money tool | `seo-title-optimization-guide-2026` (952w) · `how-to-write-clickable-headlines` (1,197w) · `best-title-tag-checker-tools-2026` | **Shipped `c3bce47`.** The guide absorbed the headline post in all 3 locales (now 12 sections, 2,392/2,360/2,372w) and the headline post 301s to it. GSC settled which one survives: 24 impressions vs 12. The listicle stayed (different intent); all three still link to `headline-analyzer` with varied anchors |
| **D — Website speed** | `…pricing-guide-2026` (598w) · `…guide-2026` (375w) | **Re-checked 2026-09-27 → no action.** The prescribed pricing-vs-how-to split is already in both titles in all 3 locales: *Pricing 2026: Core Web Vitals ROI* vs *Optimization Guide 2026: Step-by-Step* (fa `هزینه` vs `گام‌به‌گام`, ar `أسعار` vs `خطوات عملية`). Bodies 3.4/2.7/2.8%, **0 of 8 shared H2s**. The pricing post is the **site's best click earner (17 clicks)** against the how-to's 16 impressions — Google has already picked one |
| **E — Local SEO** | `local-seo-services-guide-2026` (3,294w) · `local-seo-middle-east` (658w) | **Re-checked 2026-09-27 → no merge.** Premise stale: the ME post is now 1,945–2,087w, not 658w, and carries the **lowest body similarity measured (1.8%)**. Titles split by geography (global Maps/3-Pack vs Middle East; fa names Dubai, Riyadh, Tehran, Muscat). Demand: 7 queries, 34 impressions, 1 click — and the pillar itself earns **0 rows**, so folding would delete the only URL targeting that geography for no gain |
| **F — Design trends** | `web-design-trends` (1,258w) · `modern-ui-ux-trends` (1,290w) | **Re-checked 2026-09-27 → no action.** Audiences already split by content: visual/layout direction (AI workflows, brutalism vs minimalism, bento grids, variable fonts) vs interaction/accessibility (glassmorphism, micro-interactions, dark mode, contrast). Bodies 3.3/4.6/4.5% — the highest measured — but the only shared H2s are boilerplate `Conclusion` / `References`. Demand: **0 queries, 0 impressions**. The finding's *"different categories (`Web Design` vs `UI/UX Design`)"* premise was **never true** — `modern-ui-ux-trends` has been `Web Design` in all 10 of its commits, so there is no category to restore |
| **G — Mobile first** | `mobile-first-design` (530w) · `mobile-first-web-design-guide-2026` (363w) | **Re-checked 2026-09-27 → no merge.** *"One is a rewrite of the other"* predates the §2.2 rewrites: it is now a conceptual primer (What is / vs Responsive / Principles / Workflow) against a technical build guide (Architectural Pillars / Fluid Typography / Touch Targets / Responsive Images). Bodies 2.4/2.5/3.4%, **0 of 10 shared H2s**. Demand: **0 queries, 1 impression** |

**Cluster C is the priority** — it is the same query cluster carrying 75% of site impressions, so internal competition there directly undermines the one asset that matters.

**Falsifiability check (ACCEPT):**
> `grep` GSC 8 weeks post-consolidation: no two surviving URLs rank for the same head term. If both survivors still rank, the differentiation failed — merge instead.
> Every 301 must be **single-hop** (no 301 → 301) and the target must be in the sitemap.

**All 7 clusters resolved 2026-09-27:** C shipped (`c3bce47`), A re-checked → no merge (`1e45bf9`), B/D/E/F/G re-checked → no action above.

**Why nothing further is justified:** across the 10 posts in B/D/E/F/G the combined query demand over the 92-day export is **43 impressions and 1 click** against 33,178 site-wide — B 4 · D 5 · E 34 · F 0 · G 1. Merging is separately gated: every pair sums to 3,436–4,397w, so each merge would need a **30–45% content cut** to satisfy `verify-blog-spec.py:27`, where `w > 2400` is a hard failure. Retitling pages that earn 0–5 impressions cannot move a measurable number.

**Re-open trigger — next GSC export (~2026-10-08):** re-open a cluster only if its queries gain volume **and** both URLs still earn impressions at overlapping positions. Volume alone, or a rewrite that touches both posts, is not sufficient.

> **Note on the ACCEPT check above — it cannot be run against this export.** The `Queries` sheet has no page dimension (Query / Clicks / Impressions / CTR / Position only, 453 rows, site-wide), so a query cannot be attributed to a URL without API access, which is Phase 0.2. Substituted evidence: body similarity (`difflib.SequenceMatcher` over the first 6,000 chars of markdown-stripped text), shared-H2 set intersection, and per-page impressions from the `Pages` sheet.

---

### 2.4 Establish a real editorial cadence 🟠

**Finding:** `05-content-blog.md` §5 · 19/36 posts share one publish date, 26/36 share one update date, only 1 post predates 2026-08-07.

**Do:**
- Stagger all future publishes across dates — no more bulk days.
- Every `updatedDate` bump must correspond to an **actual content edit** (this is already true where edits happened — keep it that way).
- The frontmatter → sitemap `lastmod` pipeline (`scripts/resolve-sitemap-lastmod.mjs`) is working; do not bypass it.
- The **only** defensible fix for the existing pattern is substantive rewrites (2.2), which legitimately justify later `updatedDate` values.

**Falsifiability check:** next quarter, no single date carries >10% of that quarter's publishes.

**Closed 2026-09-29 (docs/process — history deliberately retained, never backdate):** bulk `date:` history stands (40 × 2026-08-07, 24 × 2026-08-15); all 105 `updatedDate: 2026-09-23` bumps arrived atomically inside the §2.2 rewrite commits (e.g. 75+/24− on `technical-seo-audit-guide-2026` in `7c8f9e9`); the 9 files without `updatedDate` are new publishes (09-19/22/24), which is correct, and post-audit publishes are staggered singles. Pipeline verified: `extractDate` prefers `updatedDate` → `date`, `sitemap-lastmod.json` matches frontmatter 3/3 probed. **Standing rule:** stagger future publishes; every `updatedDate` bump ships in the same commit as its content edit; never bypass `resolve-sitemap-lastmod.mjs`.

---

### 2.5 Fix category → CTA mapping 🟡

**Finding:** `05-content-blog.md` §7 · `serviceToolDict` keys are `SEO · Local SEO · WordPress · Web Design · Web Development · E-Commerce`; six actual categories are unmapped, so **7 posts get a generic fallback CTA**.

**Do:**
- Add: `Digital Marketing`, `UI/UX Design`, `Maintenance`, `Speed Optimization`, `Link Building`, (`Performance` if not merged).
- **Merge `Performance` → `Speed Optimization`** across all three languages (same topic, two names).
- Mirror in `src/pages/[lang]/blog/[slug].astro` for fa/ar.

**Falsifiability check:** every post's rendered CTA service-URL is topically related to its category. Sample 10 posts; 0 unrelated pairs.

---

### 2.6 Replicate the pricing-intent formula 🟠

**Finding:** `01-gsc-performance.md` §5 · `/fa/blog/website-speed-optimization-pricing-guide-2026/` = **13 clicks, 7.34% CTR from position 14.28** — 61× the headline-analyzer's CTR.

**The site already knows what works: narrow pricing intent + specific numbers.** The two assets that perform are depth (`local-seo-services-guide-2026`, 3,294w) and intent specificity (speed pricing).

**Do:** produce a pricing post using the same shape, in fa first (highest-converting market). The three topics originally sketched here were **deliberately not written as-is** — `Web Design Cost in Iran` and `SEO Service Pricing` would have collided with the existing cost posts in cluster A, which is exactly the cannibalization item 2.3 exists to remove.

Three posts were shipped instead (`e8946ed`), each from query evidence that already earns impressions with zero clicks:

| Post | `date` | Query evidence (2026-09-21 export) |
|---|---|---|
| `keyword-density-analyzer-script` | 2026-09-19 | 6 keyword-density queries, **55 impressions, 0 clicks**, positions 14–54; exact match `keyword density analyzer script` 29 @ 14.14. Tool page: 58 impressions @ 20.31, 0 clicks |
| `moz-title-checker-alternatives` | 2026-09-22 | 281 impressions across 3 Moz-branded queries, positions 10–16, **0 clicks** |
| `web-development-guide-2026` | 2026-09-24 | 118 Arabic impressions across 3 queries, positions 37–45, **0 clicks** |

**Shipped** (`5206008`, 2026-09-21): the genuinely *pricing*-intent post this item exists to test — `seo-services-pricing-guide-2026`, *"SEO Services Pricing Guide 2026: Costs, ROI & Packages"* — landed in all 3 locales (2,211/2,399/2,021w, 8 numbered H2s, `H3=5 · kt=9 · faq=5 · links=7` identical across locales, openers 40–60, both committed gates green). It was written in fa first as specified. Its `date` of 2026-09-21 is what starts the clock below.

The 2026-09-27 export rules out a **second** pricing post: every zero-click pricing query with ≥10 impressions already has a dedicated asset — `محاسبه آنلاین هزینه طراحی سایت وردپرس` 113 @ 42.4 → `wordpress-website-cost-guide-2026`, `تعرفه افزایش سرعت سایت` 22 @ 11.4 → `website-speed-optimization-pricing-guide-2026`, `محاسبه هزینه طراحی سایت` 21 @ 33.4 → `website-development-cost-calculator-guide-2026`, `web development pricing` 19 @ 25.0 → cluster A. That is 175 impressions across 4 queries, and writing another post would have cannibalised the one under test.

**Falsifiability check (GROW):** the pricing post reaches position ≤20 for a pricing query within 8 weeks of publishing. If it sits >40, the market does not have that query demand → stop producing pricing content.

**Clock started 2026-09-21 → evaluate 2026-11-16.** In the 2026-09-27 export the post shows 0 impressions — 6 days after publishing and inside GSC's 2–3 day lag, so that is *unmeasurable*, not failed. The comparable post that has settled, `website-speed-optimization-pricing-guide-2026`, sits at **position 8.8 with 17 clicks from 229 impressions**, which is the shape this item predicted.

---

## Phase 3 — Depth & links (weeks 4–12, slower clock)

These are **relevance/depth/internal-link** problems. Do **not** sequence them alongside title rewrites and expect the same timeline — that was an error in the previous action plan.

| # | Action | Evidence | Falsifiability check |
|---|---|---|---|
| 3.1 | Pages buried beyond page 2 need depth + internal links, **not** meta rewrites: `/en/services/web-design/` (**pos 87.9**), `/fa/service-areas/tehran/` (76.7), `/fa/service-areas/qazvin/` (60.4), `/en/tools/seo-title-checker` legacy (63.8) | `01-gsc-performance.md` §5 | Position must move ≥20 places in 8 weeks. If it does not, the query is beyond the page's relevance — rebuild or retire the page. **Shipped `5c1ed65` (+`d64f3c7` regenerations):** web-design page gains a per-locale Client Results section (3 portfolio cards, verbatim `results:` metrics, all linking out) + the 2 orphaned features now render; Tehran gains 3 location FAQs from its own block facts (fa only, template merge untouched); Qazvin gets links not depth (already deepest). 18 mirrored inbound links (6 slugs × 3 locales, locale-parallel, non-opener paragraphs). seo-title-checker confirmed retired in both redirect sources with 0 sitemap hits — no rebuild; its GSC rows are pre-redirect history decaying. Corpus + sitemap regens committed alongside. Falsifiability clock 2026-09-29 → 2026-11-24 |
| 3.2 | Snippet rewrites on striking-distance pages: **`/ar/` (pos 5.01, 0 clicks / 232 impr)**, `/fa/portfolio/ramzarz-negaran/` (6.85, 0.88% CTR), `/en/blog/seo-best-practices/` (8.94, 0.57%), `/fa/portfolio/soheil-accessory/` (6.38, 0 clicks) | `02-on-page-serp.md` §4 | CTR on these pages moves **before** position does. Four portfolio pages rank top-10 and convert at 0–1.9% — front-load the outcome metric from `results[]` into the description. **Shipped `f89474a`:** all four descriptions rewritten, titles untouched — `/ar/` leads with free-consultation + calculator offer (21 tools / 10+ yr, 114ch); ramzarz-negaran leads with `results[]` rank-1 «ماینر قانونی» (111ch, the +320% in `portfolio-meta.ts` deliberately unused — granularity conflict, follow-up); soheil-accessory leads with `results[]` +210% mobile / 96 speed (98ch, meta +260% and blog 140% untouched — conflict follow-up); seo-best-practices gains countable 8 steps (129ch) |
| 3.3 | Off-site entity corroboration — **the one GEO item code cannot fix**: agency-level LinkedIn + X distinct from the founder's; tool listings/roundups for the 21 free tools; consider open-sourcing the client-side tools | `08-geo-ai-citations.md` §6 | `Organization.sameAs` should contain ≥4 **organisation** profiles. Citation rate on the 5 frozen prompts is the real metric — **owner creates agency profiles 2026-09-29; wire URLs into `sameAs` on delivery** |
| 3.5 | Own the Persian brand SERP: `ويب سي` sits at **position 4.93 with 0 clicks across 218 impressions**, and the site *declares* this string as `WebSite.alternateName` for `fa` | `02-on-page-serp.md` §5 | Position ≤2 for `ويب سي` within 6 weeks. If `webabc` itself stays >2.0, this is external brand competition → escalate to listings/PR, not more on-page work. **Shipped `7fa4d15`:** the one remaining honest gap was the `/fa/` `<title>` (About carried the string, the homepage did not) — the homepage title now carries the `(ويب سي)` parenthetical verbatim (52ch), mirroring description + `alternateName`. Clock runs 2026-09-29 → 2026-11-10 |
| 3.6 | Locale differentiation in the 5 money posts: fa → Iranian pricing in toman + existing case data (ramzarz-negaran, remido, mehromah-qazvin already earn clicks); ar → GCC/Vision-2030 + AED/SAR; en → USD benchmarks | `05-content-blog.md` §6 | `Translated results` appearance moves off 0 clicks / position 92.88. **Shipped `c4bfca5` (bounded — §2.2 had already localized most of it):** per-locale denominations verified in place (USD/toman/AED per locale, incl. the honest USD-with-toman-at-project-rate note in fa speed-pricing); Mahsun ROI case already in all 3 locales of roi-guide with locale metrics; Qazvin speed proof in all 3 locales of speed-pricing via §3.1. New: cost-guide §5 closes with a Gulf-client bilingual-QA sentence + locale-parallel Dubai/Riyadh links in all 3 locales. Deliberately omitted: Vision-2030 qualitative framing (no repo facts — honesty rule) and any new figures (band ceiling). Falsifiability clock 2026-09-29 → 2026-11-24 |

---

## Phase 4 — Technical debt (low severity, batchable)

| # | Action | Evidence | Check |
|---|---|---|---|
| 4.2 | Resolve dangling `#webpage`: either drop the fragment in `FAQ.astro`, or emit an explicit `WebPage @id = …/#webpage` with `isPartOf → …/#website` and `breadcrumb`, then point `BlogPosting.mainEntityOfPage` at it (preferred — completes the chain) | `04-schema.md` §4.1 | `curl` a blog post; every `@id` referenced by `isPartOf`/`mainEntityOfPage` exists as a node. **Shipped `fefed73` (preferred fix, one deviation):** `FAQ.astro` emits the `WebPage` node itself (`…/#webpage` + `url` + `inLanguage` + `isPartOf → …/#website`), so the ref resolves on all 5 page types rendering it, and `BlogPosting.mainEntityOfPage` points at it. The `breadcrumb` link is conditional (new optional prop, passed only by blog) because only blog renders `Breadcrumbs.astro` — unconditional would dangle on the other four types. `Breadcrumbs.astro` declares `@id …/#breadcrumb`; all identities come from the new `src/utils/schemaIds.ts`. §12 asserts generic ref-integrity on a post + a service page, the exact chain, and sweeps all 114 blog files |
| 4.3 | `WebSite.url` varies by language under a single `@id` → per-language `@id`, or drop `url` | `04-schema.md` §6 | One `WebSite` `@id` per language, or none carrying `url`. **No code change — premise stale:** `createWebsiteSchema` already emits `@id https://webabc.ir/{lang}/#website` with matching per-language `url`, and every `isPartOf → #website` in the repo (about, contact, 404, serviceSchema, new WebPage nodes) already targets the per-language form. Verified live on all 3 homepages and locked by §12, which fails if any homepage regresses |
| 4.4 | Fix or delete the dead `/*.html` cache rule — `build.format: 'directory'` means no URL ends in `.html` | `09-performance-images.md` §3 | Live HTML `cache-control` matches whatever the file declares. **If you enable an HTML cache, `Vary: Accept` must remain** or markdown/HTML representations can cross-contaminate. **Shipped `9eedf7b`: rule deleted.** The only `.html` artifact is `dist/404.html` — direct `/404.html` answers 307 before headers matter, and 404 bodies served at other paths match on the request path, not the file name, so the rule cached nothing real. Live HTML `cache-control: public, max-age=0, must-revalidate` is the platform default (no `Cache-Control` anywhere in `worker.ts`/`src/`), confirmed identical before removal |
| 4.9 | Consolidate `_redirects` and `worker.ts` `STATIC_REDIRECTS` to one source of truth (they currently agree — keep it that way) | `03-technical.md` §8 | Single list, or a test asserting equality. **Shipped `01a851d`: the test is the source of truth.** §11 asserts all 63 file rules resolve through the worker in one 301 hop to the same target (slash-form legacy sources via the `barePath` lookup, the 3 bare headline-analyzer rules via the explicit 301 branch — the only normalised gap, deliberately in code not the map, since a map entry would self-redirect the slash form), every status stays 301, and all 54 map entries (now exported, behaviour-neutral) mirror a file rule |
| 4.10 | Homepage image weight ~967 KB — measure with PSI first (0.2), add responsive `srcset`/`sizes` only if LCP is red | `09-performance-images.md` §1 | Field LCP ≤2.5 s before/after; **do not change anything if it's already green** — **closed unmeasured with §0.2 2026-09-29 (credentials declined; proxy estimates stand)** |
| 4.11 | Set up the monthly 5-prompt citation test from Phase 0.3 as a standing check | `08-geo-ai-citations.md` §7 | Citations counted monthly. GSC impressions tell you **nothing** about GEO — **parked with §0.3 2026-09-29** |

**Do NOT do these** (correctly omitted — listed so nobody "improves" them):
- ❌ Add `WebSite.SearchAction` — there is no site search.
- ❌ Add `BreadcrumbList` to the homepage — self-referential noise.
- ❌ Add `QAPage` — FAQs are editorial, not user-submitted.
- ❌ Add `HowTo` — deprecated 2023.
- ❌ Remove `FAQPage` — Google retired the *rich result*, not the entity value.
- ❌ Add fabricated `AggregateRating`/`Review` — gated behind real data on purpose.
- ❌ Change the root geo-redirect from **302** to 301 — would permanently cache one locale per visitor.

---

## Sequencing summary

```
Week 0   ─ Phase 0: baseline + CrUX + freeze 5 GEO prompts
Week 1   ─ Phase 1: .md noindex · headline-analyzer title · CTR denominator
Weeks 2-4 ─ Phase 2: llms.txt rebalance · 7 cannibal merges · cadence · CTA map
           · one pricing-intent post (2.6)
Weeks 4-12 ─ Phase 3: buried pages · snippet rewrites · off-site footprint
           · Persian brand SERP · locale differentiation
Ongoing  ─ Phase 4: technical debt batch · monthly citation test
```

**Leading indicators (what should move first):**
1. Headline-analyzer page CTR off 0.12% → days/weeks
2. `/ar/` and portfolio top-10 CTR → days/weeks
3. Position on the tool cluster → weeks/months
4. Citations on the 5 frozen prompts → months

**If indicator 1 moves and 3 does not: the title worked and you now need links (Phase 3.3).**

---

**Back to:** `FULL-AUDIT-REPORT.md`
