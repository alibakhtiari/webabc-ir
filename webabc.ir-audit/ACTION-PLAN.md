# Action Plan — webabc.ir

**Sequenced by dependency, not by score.** Each item states: what to do, which file proves the finding, and a **falsifiability check** — the observable evidence that would say the fix did not work.

Severity scale: Critical → High → Medium → Low. Phase boundaries are dependencies: Phase 3 items are already queued behind Phases 1–2 because they move on a slower clock (relevance/depth/link equity) than title or code fixes.

---

## Phase 0 — Measurement foundation (do first, ~half a day)

You cannot verify any GROW claim below without these two things.

| # | Action | Why it blocks | Falsifiability check |
|---|---|---|---|
| 0.1 | **Re-export GSC** (same 3-month window) and diff against `webabc.ir-Performance-on-Search-2026-09-21.xlsx` | Establishes the baseline every other check compares to | Export fails or date filter differs → comparison is invalid |
| 0.2 | **Configure PSI/CrUX credentials** at `~/.config/claude-seo/google-api.json` | No CWV data exists anywhere; Performance is currently a proxy estimate | Until field LCP/INP/CLS exist, **no performance claim in this audit may be treated as measured** |
| 0.3 | **Define the 5 fixed GEO test prompts** and record today's answers in ChatGPT Search, Perplexity, Google AI Overviews, Gemini | Nothing measures citations today | If prompts change month to month, the series is not comparable — freeze the list |

**Test prompts (freeze these):**
1. `best free seo title checker 2026`
2. `how much does a website cost in 2026`
3. `technical seo audit checklist`
4. `web design agency qazvin` / `طراحی سایت در قزوین`
5. `best headline analyzer tool`

Record per prompt: mentioned? linked? which URL? position in answer?

---

## Phase 1 — Critical (week 1)

### 1.1 Fix the blank 404 🔴

**Finding:** `03-technical.md` §2 · **Root cause:** `wrangler.toml` has no `not_found_handling`, so `env.ASSETS.fetch()` returns an empty-body 404 that `worker.ts:516-531` passes through.

**Do:**
```toml
[assets]
directory = "./dist"
binding = "ASSETS"
run_worker_first = true
not_found_handling = "404.html"
```
(Alternative — worker-side: when `response.status === 404` and the body is empty, fetch `/404.html`, or `/${lang}/404/` when the path matches `^/(en|fa|ar)/`.)

Also fix while you're in there: the non-slash/non-locale path should serve the right locale's 404 rather than the site-root one.

**Falsifiability check (ACCEPT):**
> `curl -A "<Chrome UA>" -H "Accept: text/html" https://webabc.ir/en/does-not-exist/` returns **status 404** with `content-length > 50000` and `<title>Page Not Found | WebABC</title>`.

---

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

---

### 1.4 Settle the competitor-branded query 🟠

**Finding:** `01-gsc-performance.md` §4.

**Do:** after 1.3, **exclude `seo title checker for blog by webnewstips com` from all CTR targets.** It is 32% of the property's impressions and structurally un-winnable. Report CTR with and without it, every time.

**Falsifiability check:** if after title differentiation it still shows 10k+ impressions at 0 clicks, it is structural — confirm the exclusion is permanent and stop revisiting it.

---

## Phase 2 — High (weeks 2–4)

### 2.1 Rebalance `llms.txt` toward the converting market 🟠

**Finding:** `08-geo-ai-citations.md` §3 · currently **69 en / 22 fa / 20 ar** links while **Iran is the only market converting (1.69% CTR vs US 0.25%)**.

**Do:**
- Expose blog deep links at parity: **24 / 24 / 24** (72 total).
- Expose tools and service pages in all three languages.
- Apply the same rebalance inside `scripts/generate-llms-full.mjs`.
- Add a build-time warning at **480 KB** (file is at 424 KB and capped at 500 KB).

**Falsifiability check:** fa/ar prompts in ChatGPT/Perplexity start producing Persian/Arabic-language answers about the site's services. If they still return nothing after 4 weeks, `llms.txt` exposure was not the binding constraint → move to off-site footprint (2.4).

---

### 2.2 Thin-content triage 🔴

**Finding:** `05-content-blog.md` §3 · median 598 words, 22/36 EN posts under 900, all carrying "Guide"/"Complete" titles.

**Do — two options per post, pick one:**

| Option | When | Work |
|---|---|---|
| **A. Retitle to match reality** | Post is genuinely narrow in scope | e.g. `Technical SEO Audit: 12-Point Checklist` instead of `…Guide 2026`. Cheap, immediate, removes the promise/reality mismatch |
| **B. Expand to the promise** | Post is core to a money topic | Target 1,800–2,500 words for guide-scope, 1,200 minimum for standard how-to |

**Priority order (do these 6 first — they map to the cannibalization clusters, so 2.2 and 2.3 share work):**
1. `technical-seo-audit-guide-2026` (363w)
2. `link-building-strategies-guide-2026` (356w)
3. `website-maintenance-security-guide-2026` (322w)
4. `seo-checklist-2026` (467w — its title promises a "Complete Step-by-Step Audit")
5. `website-speed-optimization-guide-2026` (375w)
6. `wordpress-vs-custom-development-guide-2026` (416w)

**Do NOT backdate anything.** Fabricated earlier dates are worse than the current state.

**Falsifiability check (ACCEPT):**
> Re-count word counts after the pass: **0 posts under 900 words still carrying a `Guide`/`Complete` title.** If word count rises but the posts still earn 0 impressions after 8 weeks, depth was not the binding constraint → the topic has no demand (consider pruning instead).

---

### 2.3 Consolidate 7 cannibalization clusters 🟠

**Finding:** `05-content-blog.md` §4 · bodies are **3–7% similar (genuinely distinct content)** — this is **title/intent cannibalization, not duplicate content**.

| Cluster | Posts | Action |
|---|---|---|
| **A — "How much does a website cost"** (worst: two identical H1s) | `how-much-does-a-website-cost-2026` (1,533w) · `website-development-cost-guide-2026` (418w) · `website-development-costs` (507w) · `website-development-cost-calculator-guide-2026` (436w) | Consolidate to **2**: the broad cost guide + the calculator companion. Port unique sections first, then **301** the other two |
| **B — WordPress vs custom** | `wordpress-vs-custom-development` (608w) · `wordpress-vs-custom-development-guide-2026` (416w) | Differentiate titles by angle (decision guide vs architectural comparison) **or** merge |
| **C — Title/headline** ⚠️ overlaps the money tool | `seo-title-optimization-guide-2026` (952w) · `how-to-write-clickable-headlines` (1,197w) · `best-title-tag-checker-tools-2026` | **Merge the two "how to write titles" posts**; keep the listicle (different intent); all three link to `headline-analyzer` with varied anchors |
| **D — Website speed** | `…pricing-guide-2026` (598w) · `…guide-2026` (375w) | Make pricing-vs-how-to explicit in both titles (bodies already differ) |
| **E — Local SEO** | `local-seo-services-guide-2026` (3,294w) · `local-seo-middle-east` (658w) | Expand the ME post or fold it into the pillar as a section |
| **F — Design trends** | `web-design-trends` (1,258w) · `modern-ui-ux-trends` (1,290w) | Highest measured similarity (6.6%) — differentiate by audience or merge |
| **G — Mobile first** | `mobile-first-design` (530w) · `mobile-first-web-design-guide-2026` (363w) | One is a rewrite of the other — merge |

**Cluster C is the priority** — it is the same query cluster carrying 75% of site impressions, so internal competition there directly undermines the one asset that matters.

**Falsifiability check (ACCEPT):**
> `grep` GSC 8 weeks post-consolidation: no two surviving URLs rank for the same head term. If both survivors still rank, the differentiation failed — merge instead.
> Every 301 must be **single-hop** (no 301 → 301) and the target must be in the sitemap.

---

### 2.4 Establish a real editorial cadence 🟠

**Finding:** `05-content-blog.md` §5 · 19/36 posts share one publish date, 26/36 share one update date, only 1 post predates 2026-08-07.

**Do:**
- Stagger all future publishes across dates — no more bulk days.
- Every `updatedDate` bump must correspond to an **actual content edit** (this is already true where edits happened — keep it that way).
- The frontmatter → sitemap `lastmod` pipeline (`scripts/resolve-sitemap-lastmod.mjs`) is working; do not bypass it.
- The **only** defensible fix for the existing pattern is substantive rewrites (2.2), which legitimately justify later `updatedDate` values.

**Falsifiability check:** next quarter, no single date carries >10% of that quarter's publishes.

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

**Do:** produce 3 new posts using the same shape, in fa first (highest-converting market):
1. `Web Design Cost in Iran 2026 — Real Prices by Project Type` (fa)
2. `SEO Service Pricing 2026 — Monthly Retainer vs Project` (fa → en → ar)
3. `Website Maintenance Cost 2026` (fills the thin `website-maintenance-security` gap)

**Falsifiability check (GROW):** at least 1 of the 3 reaches position ≤20 for a pricing query within 8 weeks. If all 3 sit >40, the market does not have that query demand → stop producing pricing content.

---

## Phase 3 — Depth & links (weeks 4–12, slower clock)

These are **relevance/depth/internal-link** problems. Do **not** sequence them alongside title rewrites and expect the same timeline — that was an error in the previous action plan.

| # | Action | Evidence | Falsifiability check |
|---|---|---|---|
| 3.1 | Pages buried beyond page 2 need depth + internal links, **not** meta rewrites: `/en/services/web-design/` (**pos 87.9**), `/fa/service-areas/tehran/` (76.7), `/fa/service-areas/qazvin/` (60.4), `/en/tools/seo-title-checker` legacy (63.8) | `01-gsc-performance.md` §5 | Position must move ≥20 places in 8 weeks. If it does not, the query is beyond the page's relevance — rebuild or retire the page |
| 3.2 | Snippet rewrites on striking-distance pages: **`/ar/` (pos 5.01, 0 clicks / 232 impr)**, `/fa/portfolio/ramzarz-negaran/` (6.85, 0.88% CTR), `/en/blog/seo-best-practices/` (8.94, 0.57%), `/fa/portfolio/soheil-accessory/` (6.38, 0 clicks) | `02-on-page-serp.md` §4 | CTR on these pages moves **before** position does. Four portfolio pages rank top-10 and convert at 0–1.9% — front-load the outcome metric from `results[]` into the description |
| 3.3 | Off-site entity corroboration — **the one GEO item code cannot fix**: agency-level LinkedIn + X distinct from the founder's; tool listings/roundups for the 21 free tools; consider open-sourcing the client-side tools | `08-geo-ai-citations.md` §6 | `Organization.sameAs` should contain ≥4 **organisation** profiles. Citation rate on the 5 frozen prompts is the real metric |
| 3.4 | Fix `Organization.sameAs`: currently 3 of 4 are the founder's personal profiles | `08-geo-ai-citations.md` §6 | At least 2 entries read as agency, not person |
| 3.5 | Own the Persian brand SERP: `ويب سي` sits at **position 4.93 with 0 clicks across 218 impressions**, and the site *declares* this string as `WebSite.alternateName` for `fa` | `02-on-page-serp.md` §5 | Position ≤2 for `ويب سي` within 6 weeks. If `webabc` itself stays >2.0, this is external brand competition → escalate to listings/PR, not more on-page work |
| 3.6 | Locale differentiation in the 5 money posts: fa → Iranian pricing in toman + existing case data (ramzarz-negaran, remido, mehromah-qazvin already earn clicks); ar → GCC/Vision-2030 + AED/SAR; en → USD benchmarks | `05-content-blog.md` §6 | `Translated results` appearance moves off 0 clicks / position 92.88 |

---

## Phase 4 — Technical debt (low severity, batchable)

| # | Action | Evidence | Check |
|---|---|---|---|
| 4.1 | Homepage sitemap exclusion: keep `/` out (the geo-302 argument holds) but **document the decision** in `astro.config.mjs` so it isn't re-litigated; confirm `/en/`, `/fa/`, `/ar/` are the intended entry points | `03-technical.md` §3 | A comment exists at the `filter` explaining the 302 rationale |
| 4.2 | Resolve dangling `#webpage`: either drop the fragment in `FAQ.astro`, or emit an explicit `WebPage @id = …/#webpage` with `isPartOf → …/#website` and `breadcrumb`, then point `BlogPosting.mainEntityOfPage` at it (preferred — completes the chain) | `04-schema.md` §4.1 | `curl` a blog post; every `@id` referenced by `isPartOf`/`mainEntityOfPage` exists as a node |
| 4.3 | `WebSite.url` varies by language under a single `@id` → per-language `@id`, or drop `url` | `04-schema.md` §6 | One `WebSite` `@id` per language, or none carrying `url` |
| 4.4 | Fix or delete the dead `/*.html` cache rule — `build.format: 'directory'` means no URL ends in `.html` | `09-performance-images.md` §3 | Live HTML `cache-control` matches whatever the file declares. **If you enable an HTML cache, `Vary: Accept` must remain** or markdown/HTML representations can cross-contaminate |
| 4.5 | Per-tool OG images — `getImageForPage` maps every `*/tools/*` → `headline-analyzer.webp`, so 63 sitemap image entries and all social cards for 20 tools are wrong | `09-performance-images.md` §2 | Each tool URL's sitemap `<image:loc>` differs; sharing `cost-calculator` renders its own card |
| 4.6 | Self-host Arabic fonts (`IBM Plex Sans Arabic` + `Cairo`) as `woff2` with the same preload pattern as `ltr.woff2`/`rtl.woff2`; drop both preconnects | `09-performance-images.md` §4 | `curl` an `/ar/` page: zero `fonts.googleapis.com` / `fonts.gstatic.com` references |
| 4.7 | Tool count copy: `README.md` says 24, `llms.txt` says 23, reality is **21** | `05-content-blog.md` §1 | All three say 21 |
| 4.8 | Add a **build-time assertion that on-page hreflang == sitemap hreflang** — they are implemented twice (`Layout.astro` and `astro.config.mjs`) and can drift | `06-i18n-hreflang.md` §2 | Build fails if the two outputs differ |
| 4.9 | Consolidate `_redirects` and `worker.ts` `STATIC_REDIRECTS` to one source of truth (they currently agree — keep it that way) | `03-technical.md` §8 | Single list, or a test asserting equality |
| 4.10 | Homepage image weight ~967 KB — measure with PSI first (0.2), add responsive `srcset`/`sizes` only if LCP is red | `09-performance-images.md` §1 | Field LCP ≤2.5 s before/after; **do not change anything if it's already green** |
| 4.11 | Set up the monthly 5-prompt citation test from Phase 0.3 as a standing check | `08-geo-ai-citations.md` §7 | Citations counted monthly. GSC impressions tell you **nothing** about GEO |

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
Week 1   ─ Phase 1: 404 fix · .md noindex · headline-analyzer title · CTR denominator
Weeks 2-4 ─ Phase 2: llms.txt rebalance · thin-content triage · 7 cannibal merges
           · cadence · CTA map · 3 new pricing posts
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
