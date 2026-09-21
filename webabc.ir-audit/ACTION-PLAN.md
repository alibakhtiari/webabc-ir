# ACTION PLAN — webabc.ir (SEO / AEO / GEO)

Source: `FULL-AUDIT-REPORT.md` + GSC workbook `webabc.ir-Performance-on-Search-2026-09-21.xlsx`.
Order = dependency-sequenced. Each item states its falsifiability check ("know it failed if…").

## Phase 1 — Critical (Week 1): stop the CTR bleed

### 1.1 Differentiate the headline-analyzer title (targets 10k-impr zero-click query)
- **Why:** `seo title checker for blog by webnewstips com` — 10,157 impr, pos 5.5, 0 clicks. Current title `SEO Title Checker for Blog & SERP Preview [Free Score]` (`src/i18n/en/tools/headlineAnalyzer.json`) collides with the brand owner's tool name.
- **Do:** rewrite EN title to something unownable, e.g. `Free SEO Title Checker + Headline CTR Scorer — Pixel-Accurate SERP Preview [2026]`. Keep ≤60 chars / 580px. Mirror the differentiation in fa/ar dictionaries. Update meta description with a hook: "No signup. Checks H1 + title tag + pixel width in one page."
- **Files:** `src/i18n/{en,fa,ar}/tools/headlineAnalyzer.json`, companion guide `src/content/blog/en/seo-title-optimization-guide-2026.mdx` internal link anchor.
- **Fail check:** query still 0 clicks after 4 weeks → title still colliding; try a second variant.

### 1.2 Snippet hooks for the zero-click cluster
- **Why:** `seo title checker` (3,938 impr pos 16.8), `title checker seo` (2,803 pos 18.5), `seo title check` (2,055 pos 27), `check seo title` (1,006 pos 22.5) — all page 2–3, ~0 clicks.
- **Do:** add a 40–60-char meta-description rewrite + publish/update date freshness on headline-analyzer; add jump-links (`#meta-title-input`, scoring guide H2s already exist at `headline-analyzer.astro:477+`) so Google can render sitelinks.
- **Fail check:** impressions grow but CTR stays <0.5% → description hook wrong, iterate.

### 1.3 Finish the `seo-title-checker` merge
- **Why:** legacy URLs still earn 242 combined impressions (`/en/tools/seo-title-checker` ± slash). Redirects exist (`public/_redirects:17-22`, `worker.ts`); equity leaks via stale internal links.
- **Do:** grep all internal links pointing at `seo-title-checker` / `seo-title-analyzer` slugs and re-point to `headline-analyzer/`; confirm no sitemap entry references them (sitemap currently clean — keep it so).
- **Fail check:** legacy URLs still show impressions in next GSC export.

## Phase 2 — High impact (Weeks 2–3): schema + striking distance

### 2.1 Add BreadcrumbList JSON-LD (blog + tools)
- **Why:** zero BreadcrumbList entities site-wide (verified by grep). Cheap eligibility win.
- **Do:** emit BreadcrumbList in `src/pages/[lang]/blog/[slug].astro` (Home → Blog → Post) and `src/layouts/ToolLayout.astro` (Home → Tools → Tool), with `@id`anchored URLs matching canonicals.
- **Fail check:** Rich Results Test shows no Breadcrumb enhancement after deploy.

### 2.2 Deduplicate FAQPage on tool pages
- **Why:** live headline-analyzer HTML contains `FAQPage` × 2 (head-slot schema from `ToolLayout.astro:89-97` + component-rendered schema). Duplicate entities risk Google ignoring both.
- **Do:** keep single source — emit in `ToolLayout` only, make `ToolFAQ.astro` render UI without JSON-LD (mirror how `FAQ.astro` already emits its own; pick one pattern per template and delete the other).
- **Fail check:** `curl | grep -c FAQPage` still >1 per tool URL.

### 2.3 Add WebSite + SearchAction node
- **Why:** missing site-level entity that binds the Organization graph.
- **Do:** extend `createOrganizationSchema` in `src/layouts/Layout.astro:12-92` or add a `@graph` sibling with `WebSite(url, inLanguage ×3)` + `SearchAction` if/when site search exists; otherwise WebSite alone.
- **Fail check:** Schema validator shows Organization without parent WebSite.

### 2.4 Strike the striking-distance pages
| Page | Impr | Pos | Action |
|---|---|---|---|
| `/fa/blog/website-speed-optimization-pricing-guide-2026/` | 177 | 14.3 | Already 7.3% CTR — add English/internal links, update date, expand FAQ by 2 Qs |
| `/en/service-areas/tehran/` | 166 | 16.7 | 0 clicks — rewrite title/description, add local proof (portfolio links) |
| `/fa/services/local-seo/` | 159 | 37.0 | needs links from fa blog local-seo posts + GBP/NAP pass |
| `/fa/service-areas/muscat/` | 146 | 10.6 | bottom of page 1 — CTR-hook description, 2 new FAQs |
| `/en/services/web-design/` | 184 | 87.9 | page 9 — depth + internal links from cost/design posts, not a title tweak |
- **Fail check:** no position movement in 6 weeks → intent mismatch, reconsider page type (SXO).

### 2.5 Own the brand query
- **Why:** `webabc` pos 3.41, `ويب سي` pos 4.9. Brand should be 1.0.
- **Do:** verify no competing `webabc` entity (GitHub/LinkedIn listed in schema `sameAs` is good); strengthen homepage internal links with exact "WebABC" anchor from footer/blog author boxes (already present — check anchor dilution); request GSC URL inspection on `/en/`.
- **Fail check:** brand still >2.0 after 4 weeks → external brand competition, escalate to PR/listings.

## Phase 3 — Content & authority (Month 2)

### 3.1 Differentiate locales (break 1:1 translation symmetry)
- 96 posts have exact slug parity. Keep hreflang, but localize proof: fa posts get Iranian pricing/case data (ramzarz-negaran already ranks — reuse), ar posts get GCC gateways/vision-2030 angles, en posts get USD benchmarks. Start with the 5 money posts (cost-calculator guides, speed-pricing, wordpress-cost).
- **Fail check:** translated-results appearance stays at 0 clicks / pos 90+.

### 3.2 Fix title truncation at scale
- EN/FA/AR frontmatter titles routinely 64–90 chars (measured across all 96). Batch-shorten money-page titles to ≤60 chars; keep H1 expressive, `<title>` disciplined.
- **Fail check:** SERP still shows `…` truncation on top-10 URLs.

### 3.3 Replicate the pricing-content formula
- The fa speed-pricing post (13 clicks, best CTR) proves pricing intent converts. Publish/refresh: cost-calculator companion posts per locale with calculator embeds + `Offer`/`PriceSpecification` schema where honest.
- **Fail check:** new pricing posts get impressions but <2% CTR.

### 3.4 Service-area link-up
- qazvin/dubai/muscat/tehran pages need inbound links from matching-locale blog posts + portfolio items (ramzarz-negaran, remido, zeytoun-masoud already earn clicks — link them to areas). Add LocalBusiness-appropriate NAP consistency pass.
- **Fail check:** area pages still pos >30 next quarter.

## Phase 4 — AEO/GEO + monitoring (ongoing)

### 4.1 llms.txt v2
- Add fa/ar deep links for top tools + money posts; add `llms-full.txt` generator (concatenate key pages, cap ~500KB); reference it from `llms.txt` header + `Layout.astro:263` (`rel="llms-txt"` already emitted — extend with full variant).
- **Fail check:** Perplexity/ChatGPT citations never mention webabc.ir for "seo title checker" — test monthly with fixed prompts.

### 4.2 Citation hygiene
- Keep `FAQPage` as entity markup only (no FAQ-snippet chasing — retired May 2026). Convert key answer blocks to definition-first 40–60-word passages with sourced stats; add `speakable`/`QAPage` only where genuine Q&A exists.
- Never fabricate reviews/ratings — portfolio gating (`content.config.ts:57-71`) is correct; keep it.

### 4.3 GSC hygiene cadence
- Monthly: export Queries/Pages, recompute zero-click list (impr≥200, clicks=0), confirm slash-duplicates decay to one canonical per group (301s verified 2026-09-21 — no code change needed).
- Quarterly: refresh declining posts (GSC decay > freshness age), update `updatedDate` + sitemap lastmod (auto via `resolve-sitemap-lastmod.mjs`).

### 4.4 Do NOT do
- No new `FAQPage` for SERP benefit; no `HowTo` schema (deprecated 2023); no location-page spam beyond the 6 existing areas; no AI-content mass publishing without E-E-A-T proof (author boxes + first-hand data already in place — protect them).
