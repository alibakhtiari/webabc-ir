# ACTIONABLE SEO ROADMAP & CONSOLIDATED AUDIT LEDGER
**Consolidated Date:** 2026-10-28  
**Scope:** Architecture, Technical SEO, AI/AEO/GEO Readiness, Content Integrity, GSC Watchlists, and Falsifiability Experiment Calendar.  
**Replaces:** `SEO-AUDIT-*.md` and `SEO-AUDIT-*.json` (October 27, 2026 snapshot suite).

---

## 1. Resolved Technical & Architectural Ledger

All actionable defects identified during the multi-dimensional audit have been resolved in the codebase and verified against the strict `npm run lint && npm test && npm run build` pipeline:

| ID | Category | Issue | Resolution | Verification Gate |
|---|---|---|---|---|
| **T-01** | Technical SEO | 24 sitemap `<image:loc>` URLs pointed to non-existent image paths. | `getImageForPage` in `astro.config.mjs` was pre-indexing from frontmatter and checking disk existence before emitting image entries. Missing images now degrade safely or omit entry. | `verify-agentic.mjs §15` (100% of sitemap image locs verified to exist on disk). |
| **T-02** | Editorial Links | 9 dead internal links across `digital-marketing-strategies.mdx` and `core-web-vitals-inp-guide-2026.mdx` across `en`, `fa`, and `ar`. | Repaired destinations to `seo-title-optimization-guide-2026`, `technical-seo-audit-guide-2026`, and `seo-checklist-2026` across all 3 locales atomically. | Full repo grep: 0 dead references. |
| **T-03** | Sitemap Freshness | `scripts/resolve-sitemap-lastmod.mjs` hardcoded August dates for tools, services, and areas. | Implemented `getGitDate` helper in `resolve-sitemap-lastmod.mjs` to resolve authored dates directly from git commit history (e.g. headline-analyzer to `2026-09-27`, tehran area to `2026-09-21`). | `sitemap-lastmod.json` reflects truthful git history. |
| **T-04** | Edge Security | Non-canonical preview hosts (e.g. `*.workers.dev`) served static assets with `index, follow`. | Updated `worker.ts` static handler to assert `url.hostname === CANONICAL_HOST` and stamp `X-Robots-Tag: noindex, nofollow` on non-canonical hosts. | Edge content negotiation & robot isolation. |
| **T-05** | Entity Consistency | Service area schema typed remote service pages as `ProfessionalService` with city-center coordinates. | Changed `@type` to `'Service'` with `areaServed: City` in `src/pages/[lang]/service-areas/[slug].astro`. Removed simulated `geo`/`address` branch coordinates. Updated `serviceSchema.ts` `Country: Global` to `AdministrativeArea: Worldwide`. | Clean Schema.org validation. |
| **T-06** | Entity Consistency | `createOrganizationSchema` received fluctuating page-level descriptions. | Passed stable, localized agency description in `src/layouts/Layout.astro`. | Schema integrity check. |
| **GEO-01** | AEO Accuracy | FAQ generator promised winning retired Google rich results & automatic CTR. | Removed retired feature claims across `faqGenerator.json` (en/fa/ar), `faq-generator.astro`, and `scripts/llms-index.data.json`. Described accurate JSON-LD syntax and HTML accordion generation. | Build & discovery sync. |
| **GEO-03** | Truth in Advertising | Alternate Markdown representations claimed "Local offices ... across Dubai, Riyadh, Abu Dhabi, Muscat, Tehran, and Qazvin". | Corrected to "Regional service coverage and targeted web services..." in `scripts/generate-markdown-representations.mjs`. (Physical HQ is Qazvin; services delivered remotely). | AGENTS.md §3 Honesty Rules. |
| **GEO-04** | Truth in Advertising | People Also Ask tool promised live scraping for any keyword with disabled button. | Rebranded to "People Also Ask Question Explorer", explicitly presenting it as an interactive workflow explorer and content ideation tool in `paaScraper.json` and `scripts/llms-index.data.json`. | Catalog & index parity. |
| **GEO-07** | AEO Discovery | `generate-ai-catalog.mjs` referenced non-existent `$schema` endpoint. | Published `public/schemas/ai-catalog.json` draft-2020-12 JSON Schema matching catalog schema structure. | Schema resolves to static file. |
| **LH-01** | A11y & Performance | Local Lighthouse a11y & contrast issues (aria-pressed vs aria-selected, X/Twitter a11y label, Headline Analyzer dark badge contrast). | Repaired in `ServicesSection.astro`, `AsciiLogoStudio.astro`, `Footer.astro`, `globals.css`, and `headline-analyzer.astro`. | Lighthouse Lab score: 99/100/100/100. |
| **CSP-01** | Best Practices | Zaraz / Google Analytics scripts blocked by strict CSP header. | Added `https://*.google-analytics.com https://*.analytics.google.com` to `connect-src` in `public/_headers`. | Best Practices score restored to 100/100. |

---

## 2. GSC Performance Baseline & Cannibalization Watchlist

The property search query distribution exhibits natural keyword clustering without destructive internal cannibalization (intent cannibalization where two identical intent pages split clicks and depress rankings). However, three distinct intent pairs require scheduled monitoring:

### 1. Cost Calculator vs. Cost Guide
- **URLs:**
  - Interactive Tool: `https://webabc.ir/en/tools/cost-calculator/`
  - Educational Pillar: `https://webabc.ir/en/blog/website-development-cost-guide-2026/`
  - Companion Calculator Guide: `https://webabc.ir/en/blog/website-development-cost-calculator-guide-2026/`
- **Search Intent Distinction:**
  - Tool targets transactional / utility queries (`website cost calculator`, `estimate web design cost`).
  - Guide targets informational / research queries (`how much does a website cost in 2026`, `breakdown of web development costs`).
- **Watchlist Protocol:** Ensure the blog post maintains strong inbound CTA links to the calculator tool without bidding against the tool's exact operational title keywords.

### 2. Speed Optimization Service vs. Pricing Guide
- **URLs:**
  - Service Page: `https://webabc.ir/en/services/speed-optimization/`
  - Commercial Guide: `https://webabc.ir/en/blog/seo-services-pricing-guide-2026/`
- **Search Intent Distinction:**
  - Service page captures client acquisition for Core Web Vitals optimization.
  - Pricing guide captures market research on agency pricing tiers.
- **Watchlist Protocol:** Service page links to pricing transparency guide as proof of fair pricing; pricing guide links to speed service as execution partner.

### 3. SEO Checklist vs. SEO Best Practices
- **URLs:**
  - Actionable Checklist: `https://webabc.ir/en/blog/seo-checklist-2026/`
  - Strategic Best Practices: `https://webabc.ir/en/blog/seo-best-practices/`
- **Status:** Currently in frozen measurement period through **November 13, 2026**. Do not rewrite or modify on-page headings until clock expiration.

---

## 3. Active Falsifiability Experiment Calendar

Per `AGENTS.md §5`, **never edit a page mid-clock**. Editing mid-clock invalidates search measurement data.

```
2026-11-05 ─► Cost calculator & speed CTA measurement read
2026-11-10 ─► Persian brand SERP read (`(ويب سي)` on `/fa/` title; pos ≤ 2 target)
          ─► `/fa/` homepage body depth rewrite
2026-11-13 ─► Core SEO Cluster measurement read (`seo-checklist-2026` / `seo-best-practices`)
2026-11-16 ─► Pricing-intent post 8-week evaluation (`seo-services-pricing-guide-2026`)
          ─► Moz title checker alternatives review
2026-11-24 ─► Buried pages 8-week evaluation (§3.1: web-design, tehran, qazvin)
          ─► Qazvin pillar build execution (U-2)
          ─► Service area openers enhancement (fa/ar)
```

### Calendar Detail & Evaluation Criteria

#### Due 2026-11-05
- **Cost Calculator Intent Evaluation:**
  - Evaluate impression separation between `/en/tools/cost-calculator/` and `/en/blog/website-development-cost-calculator-guide-2026/`.
  - Target: Distinct primary query attribution.
- **Speed Service CTA Read:**
  - Verify speed service consultation conversion triggers from tool CTA.

#### Due 2026-11-10
- **§3.5 Persian Brand SERP Read:**
  - Evaluate position and click volume for query `(ويب سي)` on `/fa/`.
  - Target: Position ≤ 2. If position sits at ~5 with 0 clicks, escalate to off-page directory citations and brand PR rather than further on-page title edits.
- **`/fa/` Homepage Body Depth Review:**
  - Rework first 100 words of Persian homepage to explicitly state agency offerings, Qazvin physical presence, Gulf coverage, and commercial CTAs.

#### Due 2026-11-13
- **Core SEO Cluster Expiration:**
  - Review 8-week performance of `seo-checklist-2026` and `seo-best-practices`.
  - Check whether rankings for primary queries (`seo checklist 2026`, `seo best practices`) maintained independence and improved CTR.

#### Due 2026-11-16
- **§2.6 Pricing-Intent Post Evaluation:**
  - Review `seo-services-pricing-guide-2026` across all 3 locales (`en`/`fa`/`ar`).
  - Target: At least one commercial pricing query reaching position ≤ 20. If all queries remain > 40, cease producing standalone pricing articles due to low regional search volume.
- **Moz Title Alternatives Review:**
  - Check performance of `moz-title-checker-alternatives` supporting the canonical headline analyzer tool page.

#### Due 2026-11-24
- **§3.1 Buried Pages Evaluation:**
  - Evaluate positions for:
    - `/en/services/web-design/` (baseline pos 87.9)
    - `/fa/service-areas/tehran/` (baseline pos 76.7)
    - `/fa/service-areas/qazvin/` (baseline pos 60.4)
  - Falsifiability Target: Position must advance ≥ 20 places. If unchanged, query intent is beyond page relevance.
- **U-2 Qazvin Pillar Build Execution:**
  - Execute expansion of Qazvin local pillar (`طراحی سایت در قزوین` baseline: 254 impressions, PSI 100).
  - Add localized pricing table, industrial park case studies (Mehromah, Caspian), and dedicated local FAQ schema.
  - Target: Position ≤ 20 on `طراحی سایت در قزوین` within 8 weeks post-launch.
- **Service Area Openers (fa/ar):**
  - Enhance openers for Qazvin, Tehran, Dubai, and Muscat to answer cost and timeline queries within 40–60 words per spec §3.

---

## 4. Invariants & Guardrails (Permanent Rules)

1. **Pipeline Order:** Always run `npm run build` (resolves lastmod, OG manifests, llms corpora, ai-catalog, markdown representations, and hreflang gate). Never shortcut to bare `astro build`.
2. **Byte-Identical Slugs:** Blog and page slugs must remain byte-identical across `en`, `fa`, and `ar`.
3. **Root 302 Geo-Redirect:** Root `/` geo-redirect must stay **302**, never 301.
4. **Trailing Slash Canonical:** All non-file URLs end with `/`. Bare paths 301 at the edge.
5. **No Invented Claims:** No fabricated offices in Gulf cities (WebABC operates remotely across the Gulf; physical HQ is Qazvin). No unverified speed or ranking guarantees.
6. **No Bulk Publishes:** Editorial publish dates are staggered; atomic `updatedDate` bumps ship in the same commit as content edits.
