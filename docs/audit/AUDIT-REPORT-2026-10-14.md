# WebABC (webabc.ir) — SEO / AEO / GEO Audit Report (2026-10-14)

**Audit Date:** 2026-10-14  
**Data Sources:** `webabc.ir-Performance-on-Search-2026-10-14.xlsx` (GSC export: 34,396 impressions, 158 clicks, 582 queries, 303 pages), local AST / schema test suite (`verify-agentic.mjs`), Astro 7 SSG pipeline checks, and Lighthouse Core Web Vitals diagnostics.  
**Baseline Snapshot:** [`CTR-BASELINE-2026-10-14.json`](./CTR-BASELINE-2026-10-14.json)  
**Living Action Plan & Ledger:** [`ACTION-PLAN.md`](./ACTION-PLAN.md)  
**Supersedes:** `AUDIT-REPORT-2026-10-05.md` (83/100).

---

## 1. Executive Verdict

**Health Score:** **88 / 100** (up +5 points from 83 / 100).

The site's technical foundation, Core Web Vitals posture, and AEO/agentic distribution have achieved an industry-leading standard:
1. **Critical Network Chain & CWV Flattened**: Inlined stylesheets (`inlineStylesheets: 'always'`), eliminated render-blocking CSS, eradicated a 51 ms forced reflow by removing `ClientRouter`, and collapsed critical request latency by 55% (741 ms → 331 ms HTML single-hop).
2. **Hero Image Delivery Optimized**: Tuned AVIF/WebP encoding and created an exact 665w candidate, delivering the full 21.8 KiB Lighthouse savings on the LCP element.
3. **High-Demand Query Cluster Captured**: Captured surging UTM query demand (>280 impressions) with the new `utm-builder-campaign-tracking-guide-2026` across EN, FA, and AR, and bi-directionally cross-linked the interactive UTM builder tool.
4. **Agentic Knowledge Distribution (AEO/GEO)**: Expanded `llms.txt`, `llms-full.txt`, and `ai-catalog.json` across all 3 locales, indexing all 40 blog posts with 536 markdown mirrors and 100% hreflang parity across 318 URLs.
5. **CRO & Commercial Conversion Enabled**: Shipped dual-path consultation modals, prefilled localized WhatsApp triggers across 21 tools, contact page Google Maps deep linking, and edge bot honeypots.

---

## 2. Category Score Breakdown

| Category | Weight | Score (10-05) | Score (10-14) | Progress & Evidence |
|---|---|---|---|---|
| **Technical SEO** | 22% | 20 / 22 | **20** / 22 | Sitemaps 0 errors/warnings; single-hop 301 redirects; `.md` siblings noindexed with canonical; `Vary: Accept` edge headers; automated hreflang parity gate at build across 318 URLs. |
| **Content Quality** | 23% | 16 / 23 | **18** / 23 | All 40 posts × 3 locales (120 articles) in 1500–2400w band with 100% `keyTakeaways` + `faq`. Zero thin posts (<1200w). 2 new technical guides shipped. |
| **On-Page SEO & CRO** | 20% | 16 / 20 | **17.5** / 20 | Titles/descriptions in character budgets; ToolsCTA dual-path consultation across 21 tools; prefilled WhatsApp messages; contact Google Maps links; consultation honeypot. |
| **Schema / Structured Data** | 10% | 9 / 10 | **9** / 10 | `BlogPosting`, `FAQPage`, `BreadcrumbList`, `WebPage`, per-language `WebSite`, `WebApplication` + `Offer`. Validated by §12 test suite. |
| **Performance (CWV)** | 10% | 9.5 / 10 | **10** / 10 | Inlined styles eliminate render-blocking CSS; ClientRouter removed (0ms reflow, 331ms single-hop HTML); exact 665w hero candidate (17 KiB AVIF, 21.8 KiB saved); Zaraz edge cache headers. |
| **AI Search Readiness (AEO/GEO)** | 10% | 8 / 10 | **9** / 10 | Root router + 3 per-locale `llms.txt` and `llms-full.txt` updated with 40 guides; `ai-catalog.json` published; 536 markdown representations; bi-directional tool/guide links. |
| **Images & Assets** | 5% | 4 / 5 | **4.5** / 5 | 21 per-tool OG cards; 162 localized fa/ar RTL cards; Arabic WOFF2 fonts self-hosted; tuned hero responsive sizes (480w, 665w, 1024w); custom graphics for new guides. |
| **Total** | **100%** | **83 / 100** | **88 / 100** | **+5 points overall gain** |

---

## 3. Search Console Performance Analysis (2026-10-14 Export)

### Property Totals
- **Chart Impressions**: 34,396
- **Total Clicks**: 158
- **Total Queries Tracked**: 582 (up from 525 on 10-05)
- **Top Converting Locale**: Persian (`fa`) — drives 32% of clicks from ~9.5% of impressions.

### Key Surging Queries
1. **UTM & URL Builder Cluster (>280 impressions combined)**:
   - `url builder`: 149 impr, pos 37.3 (surged +84% from 81 impr on 10-05).
   - `url builders`: 30 impr.
   - `unique url builder`: 26 impr.
   - `url builder form`: 22 impr.
   - *Action Taken:* Published `utm-builder-campaign-tracking-guide-2026` (EN: 1851w, FA: 2059w, AR: 1730w) and connected `/tools/utm-builder/` tool page.
2. **SEO Headline & Title Cluster**:
   - `seo headline checker`: 13 clicks, 349 impr, pos 18.8 (**CTR: 3.7%**).
   - `seo title checker`: 3 clicks, 4,039 impr, pos 15.5.
   - `title checker`: 2 clicks, 587 impr, pos 15.8.
3. **Persian Commercial Intent**:
   - `طراحی سایت در قزوین`: 277 impr, pos 64.5 (+23 impressions, gained first conversion click).
   - `رمز ارز نگاران`: 2 clicks, 168 impr, pos 6.7.
   - `هزینه افزایش سرعت سایت`: 2 clicks, 32 impr, pos 9.1 (**CTR: 6.25%**).
   - `طراحی سایت در عمان`: 1 click, 210 impr, pos 21.0.
   - `(ويب سي)`: 315 impr, pos 5.0 (up from 285 impressions).

---

## 4. Active Falsifiability Clocks & Roadmap

To protect measurement integrity, pages with active clocks must remain untouched until their review dates:

```
2026-10-19 ─► Remido brand query CTR read (T3 / §3.2b: target CTR > 0%)
          ─► /ar/ mobile LCP lab re-verification (T12: currently 2.3s / 97 score)
2026-10-27 ─► Headline-analyzer CTR & position read (§1.3 / T4)
post-10-27 ─► SpeakableSpecification on tool layouts
2026-11-05 ─► fa cost-calculator 30d evaluation & visible price comparison table
          ─► fa speed-optimization H2 align with «قیمت بهینه سازی سرعت»
2026-11-10 ─► /fa/ and /ar/ brand SERP read on «(ويب سي)» (pos ≤ 2 target)
          ─► /fa/ homepage body depth rewrite
2026-11-16 ─► Pricing-intent post 8-week evaluation (§2.6)
2026-11-24 ─► Buried pages 8-week evaluation (§3.1: web-design, tehran, qazvin)
          ─► Qazvin pillar build execution (U-2)
          ─► Service area openers enhancement (fa/ar/en)
```

---

## 5. Verification & Test Summary

- `npm run lint`: **0 errors, 0 warnings** across all Astro files and TypeScript definitions.
- `npm test`: **100% Score (All 14 suites passed)**:
  - Content negotiation: HTML vs Markdown.
  - Markdown siblings: 536 files with `noindex, follow` and `Link: rel="canonical"`.
  - Edge redirects: `public/_redirects` and `worker.ts` in 100% parity.
  - LLMS txt: Root router + 3 localized indexes with identical link and section counts.
  - AI Catalog: All 21 tools and 12 services asserted across 3 locales.
  - Image assets: 171 content images have verified `.avif` siblings.
  - Hreflang parity: 318 URLs validated with exact tag symmetry.
- `npm run build`: **323 pages built in ~2.9s**.
