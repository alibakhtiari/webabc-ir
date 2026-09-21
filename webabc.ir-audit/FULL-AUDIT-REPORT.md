# FULL SEO / AEO / GEO AUDIT — webabc.ir

**Audit date:** 2026-09-21 (UTC)
**Data source:** `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (GSC, Search type Web, Last 3 months) + local codebase inspection + live-URL verification
**Site:** https://webabc.ir — Astro 7 SSG, trilingual (`/en/`, `/fa/`, `/ar/`), Cloudflare Worker deployment (`worker.ts`, `wrangler.toml`)
**Scope:** SEO (technical / on-page / content) + AEO (answer-engine) + GEO (generative-engine / AI-citation readiness)

## Executive summary — SEO Health Score: 78/100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO (titles/meta/CTR) | 20% | 62 | 12.4 |
| Schema / Structured data | 10% | 74 | 7.4 |
| Performance (CWV, estimated — no lab run) | 10% | 85 | 8.5 |
| AI Search Readiness (AEO/GEO) | 10% | 82 | 8.2 |
| Images | 5% | 80 | 4.0 |
| **Total** | | | **≈ 78** |

**GSC headline (last 3 months): 124 clicks / 31,561 impressions / 0.39% CTR, avg. position ~14–18.**
The site is technically sound but commercially invisible: 81% of all impressions come from one page ranking on page 2 with a 0.12% CTR.

### Top 5 critical findings

1. **One page = 81% of visibility, zero yield.** `/en/tools/headline-analyzer/` has 25,743 impressions, position 14.0, 30 clicks (CTR 0.12%). Page-2 ranking + generic snippet = traffic goes to competitors. (`findings/gsc-performance.md`)
2. **Competitor-brand query trap.** `seo title checker for blog by webnewstips com` — 10,157 impressions at position 5.5 (page 1!) with **0 clicks**. Page title `SEO Title Checker for Blog & SERP Preview [Free Score]` is near-identical to webnewstips' tool name; Google shows webabc.ir for their navigational query and users pick the brand owner. Title must be differentiated.
3. **Zero-click keyword cluster on page 2–3.** `title checker seo` (2,803 impr, pos 18.5), `seo title check` (2,055, pos 27), `title seo check` (1,077, pos 21), `seo title checker` (3,938, pos 16.8) — same intent, no clicks. Striking-distance content with no snippet hook.
4. **Brand query not owned.** `webabc` ranks 3.41 (should be 1.0) with 44% CTR. Homepage title `WebABC | Professional SEO and Web Design Services` is fine, but position 3.4 for own brand suggests weak brand signals / competition from `ويب سي` (218 impr, pos 4.9).
5. **60 slash / non-slash duplicate groups in GSC.** Every major URL appears twice (`/en/tools/headline-analyzer` vs `.../`). Edge 301s now work (verified live), so this is historical split link-equity that needs GSC consolidation, not new code — but `seo-title-checker` legacy URLs still earn 242 combined impressions despite the merge redirect; internal links must be re-pointed.

### Top 5 quick wins (≤ 1 day each)

1. Rewrite the headline-analyzer `<title>` + meta description to differentiate from webnewstips and front-load a CTR hook (numbers, year, "free, no signup"). Targets findings 1–3 at once.
2. Add `BreadcrumbList` JSON-LD to blog + tool templates (currently zero BreadcrumbList entities emitted — verified by grep; only `Organization`/`BlogPosting`/`WebApplication`/`FAQPage` exist).
3. Deduplicate double `FAQPage` blocks on tool pages (live HTML contains `FAQPage` × 2 on headline-analyzer).
4. Extend `public/llms.txt` with `/fa/` + `/ar/` tool/blog deep links (currently company + `/en/` heavy) and add `llms-full.txt`.
5. Give headline-analyzer a dedicated OG image (`/images/og/tools/headline-analyzer.webp`) instead of the generic `/images/og-image.webp` fallback — it is the site's #1 SERP/social asset.

---

## 1. GSC performance analysis (full detail in `findings/gsc-performance.md`)

- Totals: 124 clicks / 31,561 impressions / 0.39% CTR. For comparison, a healthy blended CTR at these positions is 1–2%: the site earns ~1/4 of expected clicks.
- Device: Desktop 59% impressions (18,700, CTR 0.43%), Mobile 40% (12,768, CTR 0.34%, better avg. position 14.5 vs 18.3). Mobile ranks better but clicks worse — snippet not mobile-compelling.
- Geography: US 18,708 impr / 46 clicks (CTR 0.25%, pos 13.0) vs Iran 3,084 / 52 clicks (CTR 1.69%, pos 27.4). English tool content is seen in the US but not chosen; Persian content converts better per impression.
- Best converter: `/fa/blog/website-speed-optimization-pricing-guide-2026/` — 13 clicks, 7.34% CTR at pos 14.3. Pricing-intent Persian content works; replicate the formula.
- Service-area pages buried: qazvin (224 impr, pos 60.4), dubai fa (152, pos 42.7), tehran en (166, pos 16.7, 0 clicks). Local intent exists; pages sit on pages 2–6.
- `Translated results` search appearance: 170 impr, 0 clicks, pos 92.9 — hreflang is emitted correctly (verified), but translated-result eligibility needs no action beyond keeping parity.

## 2. Technical SEO — 88/100 (detail: `findings/technical.md`)

What works: Astro SSG (zero-JS baseline, AI-readable), `trailingSlash: 'always'` + edge 301s verified live on 4/4 URLs, canonical + 4-way hreflang (`en/fa/ar/x-default`) on every indexable page, sitemap-index 297 URLs with image entries + hreflang alternates + content-accurate lastmod, `robots.txt` allows all major AI crawlers, security headers (HSTS, CSP, X-Frame-Options) present, noindex reserved for 404s, staging hosts get noindex via `worker.ts`.

Gaps: (a) GSC still holds pre-redirect non-slash duplicates — monitor, don't recode; (b) root `/` geo-redirect in worker (IR/AF/TJ→fa, Arab states→ar, else en) has no `x-default` self-reference issue but must stay 302, never 301; (c) no `llms-full.txt`; (d) `sitemap.xml→sitemap-index.xml` 301 exists in both `_redirects` and worker — keep one source of truth.

## 3. Content & blog — 78/100 (detail: `findings/content-blog.md`)

Inventory: 96 posts (32 en + 32 fa + 32 ar, exact slug parity), 51 portfolio items (17×3), 24 tool routes × 3 langs, 6 service areas × 3, FAQ + `keyTakeaways` (TLDR) on 100% of posts — exemplary template discipline.

Issues: (a) 1:1 translation parity means hreflang-correct but locale-undifferentiated (same prices, examples, currencies across en/fa/ar); (b) EN/FA/AR titles routinely 64–90 chars → WILL truncate at 580px (measured across all 96 frontmatters); (c) cannibalization cluster: tool `headline-analyzer` + blog `seo-title-optimization-guide-2026` + blog `how-to-write-clickable-headlines` all target "seo title checker / headline" intent — the `seo-title-checker`→`headline-analyzer` merge redirect (already in `_redirects:17-22` + `worker.ts`) was the right call, now internal links + titles must finish the job; (d) thin-service risk: `/en/services/web-design/` gets 184 impr at pos 87.9 — page 9, needs depth/links.

## 4. Schema — 74/100 (detail: `findings/schema.md`)

Present: `ProfessionalService` Organization graph (areas served, geo, knowsAbout incl. AEO/GEO) on every page (`Layout.astro:12-92`), `BlogPosting` with author disambiguation (Ali Bakhtiari Person vs Team Organization), `WebApplication` on tools, `FAQPage` on tools + blogs.
Missing/wrong: (a) **no `BreadcrumbList` anywhere** (grep proves it; Breadcrumbs UI component renders without JSON-LD); (b) **duplicate `FAQPage` on tool pages** (2 blocks in live HTML — one from `ToolLayout` head slot, one from FAQ component); (c) no `WebSite` + `SearchAction` node; (d) `FAQPage` kept as entity markup only — correct per May-2026 retirement of FAQ rich results, do NOT chase FAQ snippets; (e) portfolio `Review/AggregateRating` correctly gated behind real reviews (`content.config.ts:57-71`) — keep that discipline.

## 5. i18n / hreflang — strong, one risk (detail: `findings/i18n-hreflang.md`)

`Layout.astro:244-251` emits en/fa/ar + x-default→en on all indexable pages; sitemap mirrors them; `og:locale` alternates correct; RTL fonts self-hosted. Risk: worker geo-redirect on `/` must remain a 302 (temporary) — a 301 would hard-pin crawlers/browsers to one locale. Verify in `worker.ts` before next deploy.

## 6. AEO / GEO — 82/100 (detail: `findings/geo-aeo.md`)

Strong: `robots.txt` explicitly allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended et al.; `public/llms.txt` is a genuine 118-line IA map (services, areas, tools, blog, fa/ar hubs); every blog has TLDR + FAQ + author box + related links; SSG HTML needs no JS to read.
Gaps: (a) llms.txt link graph is `/en/`-centric — fa/ar deep links token-poor; (b) no `llms-full.txt` concatenation for long-context ingestion; (c) question-format H2 coverage uneven across posts; (d) no `QAPage`/`Speakable`/`ClaimReview`-grade citation capsules; brand-mention footprint off-site (GitHub/LinkedIn/X listed in schema) is thin — digital PR is the GEO lever.

## 7. Images & performance — 80/100 (detail: `findings/images-performance.md`)

Self-hosted fonts, content-hashed `/images/*` + `/fonts/*` cached immutable for a year, OG crops per service/area/portfolio via manifest, blog covers at `/images/blog/<slug>.webp`. Gaps: headline-analyzer (the traffic page) falls back to generic OG image; no per-tool OG crops; AVIF exists for hero/logo but blog covers are webp-only; `ToolLayout` hero uses `bg-linear-to` gradient text on H1 (pretty, but verify contrast + no CLS).

---

## Appendix — evidence index

- GSC workbook: `webabc.ir-Performance-on-Search-2026-09-21.xlsx` (sheets Queries/Pages/Countries/Devices/Search appearance/Filters)
- Layout/head/hreflang/schema: `src/layouts/Layout.astro`
- Tool template + schemas: `src/layouts/ToolLayout.astro`, `src/components/astro/ToolFAQ.astro`, `src/components/astro/FAQ.astro`, `src/utils/faqSchema.ts`
- Blog template: `src/pages/[lang]/blog/[slug].astro`
- Sitemap config: `astro.config.mjs`
- Redirects: `public/_redirects`, `worker.ts` (`STATIC_REDIRECTS`), `public/_headers`
- Robots/AI: `public/robots.txt`, `public/llms.txt`
- Content: `src/content/blog/{en,fa,ar}/` (96), `src/content/portfolio/` (51), `src/content.config.ts`
- Live verification: 200 on `/en/` + headline-analyzer; 301 non-slash→slash on 4/4; OG images 200; sitemap 297 URLs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
