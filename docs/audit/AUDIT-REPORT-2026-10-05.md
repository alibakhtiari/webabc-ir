# WebABC (webabc.ir) — SEO / AEO / GEO Audit Report (2026-10-05)

**Audit Date:** 2026-10-05  
**Data Sources:** `webabc.ir-Performance-on-Search-2026-10-05.xlsx` (GSC export, 2026-07-03 → 2026-10-02, 297 page rows, 525 query rows) plus live Google Search Console API (`gsc_query.py` query×page attribution, `gsc_inspect.py` indexation), and PageSpeed Insights API (`pagespeed_check.py`, lab mobile).  
**Baseline Snapshot:** [`CTR-BASELINE-2026-10-05.json`](./CTR-BASELINE-2026-10-05.json)  
**Living Action Plan & Ledger:** [`ACTION-PLAN.md`](./ACTION-PLAN.md)  
**Supersedes:** `FULL-AUDIT-REPORT.md` (2026-09-22 baseline), `sb-audit.md`, `fa-audit.md`, `mu-audit.md`, and `united.md`.

---

## 1. Executive Verdict

**Optimize existing assets. Do not write new blog posts.**

The site experienced an apparent 87% impression drop on 2026-09-21, but query×page attribution reveals **it was concentrated in a single page**:
- `/en/tools/headline-analyzer/` fell 676.6 → 3.7 impressions/day (**-99.5%**), representing **91% of all lost property impressions**.
- The page is technically sound, mobile-crawled, indexed, and healthy (PSI Mobile 98, Desktop 100). The loss was on a competitor-branded query (`seo title checker for blog by webnewstips com`), which structurally carried 0 clicks.
- **Traffic quality improved 4× while volume normalized:** Property-wide CTR moved **0.40% → 1.56%** across the cliff as non-clicking competitor impressions ceased inflating the denominator.

The technical foundation of WebABC is in the top 10% of web properties. The primary constraint is **relevance, authority, and conversion on money and commercial service pages**, not technical markup.

---

## 2. Updated Health Score: 82 / 100 (up from 76)

Scored on standard SEO/AEO/GEO category weights. All scores cite primary evidence:

| Category | Weight | Score | Basis |
|---|---|---|---|
| Technical SEO | 22% | **20** / 22 | Sitemaps 0 errors/0 warnings; 301 single-hop verified; `.md` siblings noindexed with canonical; `Vary: Accept` intact; `webabc.ir`-only canonical host; automated hreflang parity gate at build. |
| Content Quality | 23% | **16** / 23 | 38×3 posts in 1500–2400w band with `keyTakeaways` + `faq`; thin content eliminated. 7 cannibalization clusters verified distinct or resolved. |
| On-Page SEO | 20% | **16** / 20 | Titles/descriptions in character budgets; service areas hubs retitled; Remido titles trimmed across locales; `(ويب سي)` brand string added to both fa and ar home titles. |
| Schema / Structured Data | 10% | **9** / 10 | `BlogPosting`, `FAQPage`, `BreadcrumbList`, `WebPage`, per-language `WebSite`, `WebApplication` + `Offer`. Rich results inspection PASS. |
| Performance | 10% | **9.5** / 10 | Lighthouse lab 97–100, CLS 0, TBT 0–20ms. `/ar/` mobile re-tested live at 2.3s LCP (score 0.94), 97/100 performance. *Field data unavailable (CrUX below traffic threshold).* |
| AI Search Readiness (AEO/GEO) | 10% | **8** / 10 | Root router + 3 per-locale `llms.txt` (93 links each); full `llms-full.txt` corpora; `ai-catalog.json` published; 6 AI bots allowed; markdown negotiation. |
| Images & Assets | 5% | **4** / 5 | 21 per-tool OG cards; 162 localized fa/ar RTL OG cards; Arabic fonts self-hosted in WOFF2 (zero Google Font calls). |
| **Total** | **100%** | **83 / 100** | *(+7 points vs 2026-09-22 baseline)* |

---

## 3. The 2026-09-21 Traffic Cliff Breakdown

Attributed per-page, normalized per day across 28 days pre vs 13 days post:

```
PRE   2026-08-24 → 09-20 (28d)   793 impr/day   3.1 clicks/day   CTR 0.40%
POST  2026-09-21 → 10-03 (13d)   104 impr/day   1.6 clicks/day   CTR 1.56%
                                  ── 13% of impressions, 51% of clicks, 4× CTR ──
```

| Page | Pre / day | Post / day | Δ |
|---|---|---|---|
| `/en/tools/headline-analyzer/` | 676.6 | 3.7 | **-99.5%** |
| `/en/blog/seo-best-practices/` | 13.3 | 7.8 | -5.5 |
| `/ar/portfolio/remido/` | 4.3 | 0.0 | -4.3 |
| `/en/services/web-design/` | 6.6 | 3.5 | -3.2 |
| `/fa/services/local-seo/` | 3.3 | 0.4 | -2.9 |

### Why Headline Analyzer is Not Technically Broken
Live Google Search Console URL Inspection (2026-10-05):
- **Verdict**: PASS ("Submitted and indexed")
- **Crawled**: 2026-10-03 by Googlebot smartphone
- **Robots / Fetch**: SUCCESSFUL, robots allowed
- **Canonical**: User declared matches Google selected
- **Rich Results**: PASS
- **Root Cause**: The ranking loss occurred on competitor query `seo title checker for blog by webnewstips com` (10,158 impressions, 0 clicks). The new title rewrite shipped 2026-09-29 and is currently on its 4-week clock (due 2026-10-27).

---

## 4. Persian (`fa`) Market Diagnosis

The Persian locale is the primary commercial driver of the site:
- **Share:** Represents ~9.5% of impressions (3,228) but **32% of all property clicks (48)**. fa converts at **3× its impression share**.
- **Winning Assets:**
  - `/fa/blog/website-speed-optimization-pricing-guide-2026/`: 235 impr, **18 clicks**, pos 15.2 (best commercial converter).
  - `/fa/portfolio/ramzarz-negaran/`: 269 impr, 3 clicks, pos 6.8 (top-ranking portfolio proof).
  - `/fa/service-areas/muscat/`: 149 impr, 3 clicks, pos 10.5 (Gulf expansion validated).
- **Core Persian Search Intents:**
  1. `طراحی سایت در قزوین` (254 impr, pos 64.6): Local agency head term. Agency physical base is in Qazvin; PageSpeed 100. Strategically locked as a Pillar asset to be executed post-11-24.
  2. `خدمات سئو محلی` (146 impr, pos 35.3): Resolved with 6-pillar depth, pricing bands, and Qazvin proof (shipped in commit `efcf145`).
  3. `محاسبه آنلاین هزینه طراحی سایت وردپرس` / `محاسبه هزینه طراحی سایت` (226 impr combined, pos 34–52): Targets `/fa/tools/cost-calculator/`.
  4. `ويب سي` (285 impr, pos 4.9, 0 clicks): Brand query. Home title reinforced with `(ويب سي)`; currently under clock to 2026-11-10.

---

## 5. Measurement Methodology & Permanent Conventions

1. **Competitor Query Exclusion:** `seo title checker for blog by webnewstips com` is permanently excluded from property CTR evaluation in `CTR-BASELINE-2026-10-05.json` (0.45% property CTR with vs 0.65% without).
2. **Trailing Slash Normalization:** GSC Pages rows for `/path/` and `/path` are summed before evaluation.
3. **CrUX Limitations:** CrUX origin queries return `404 NOT_FOUND` because property traffic is beneath Chrome UX Report threshold. Performance scores are PSI Lighthouse lab tests and must never be represented as field CWV.
4. **Falsifiability Clocks:** Once a page is modified, its clock (typically 4–8 weeks) must fully expire before re-evaluating or making secondary changes.
