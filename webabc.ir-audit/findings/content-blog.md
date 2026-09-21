# Content & blog — 78/100

## Inventory (measured 2026-09-21)

- Blog: **96 posts** — 32 en + 32 fa + 32 ar, exact slug parity.
- Portfolio: **51 items** (17×3). Tools: 24 routes × 3 langs. Service areas: 6 (dubai, riyadh, abu-dhabi, muscat, tehran, qazvin) × 3.
- Template discipline is excellent: **100% of posts have `faq` + `keyTakeaways`** (measured by frontmatter scan), author box with `rel="author"`, related-posts (3, same-category-first — `src/pages/[lang]/blog/[slug].astro:169-188`), related service+tool CTA block per category (`:199-365`), TOC component, `article:published/modified_time`, reading-time, tags.
- Word counts sampled (en): 2.4k–12.5k words/post — no thin content at the top of the funnel.

## Issues

1. **1:1 translation symmetry (Medium).** Slug parity + hreflang is correct, but locales share identical proof points. fa money posts should cite Iranian pricing/cases (ramzarz-negaran ranks #6-7 — reuse it), ar posts GCC specifics, en posts USD benchmarks. Start with 5 money posts: both cost-calculator guides, speed-pricing, wordpress-cost, dubai/oman guides.
2. **Title truncation at scale (High).** Frontmatter titles of 64–90 chars measured across en/fa/ar (e.g. en `website-development-cost-calculator-guide-2026` 88 chars, fa `local-seo-services-guide-2026` 90, ar equivalents 75–82). Google truncates ~580px. Rule: `<title>` ≤ 60 chars, H1 may stay expressive.
3. **Cannibalization cluster (High).** `headline-analyzer` tool + `seo-title-optimization-guide-2026` + `how-to-write-clickable-headlines` chase one intent. The `seo-title-checker`→`headline-analyzer` merge redirect was correct (`public/_redirects:17-22`); finish by (a) re-pointing stale internal anchors, (b) differentiating titles: tool = checker/scorer, guide = how-to/pixel-limits, headlines post = CTR copywriting.
4. **Money-page depth gaps (Medium).** `/en/services/web-design/` 184 impr pos 87.9; `/fa/services/local-seo/` 159 pos 37.0. These need inbound links (from the cost/design/local posts that already rank) + proof blocks, not title tweaks.
5. **What's already right:** pricing-intent fa content converts (speed-pricing 7.34% CTR); portfolio items earn brand-adjacent clicks (ramzarz-negaran, remido, zeytoun-masoud); guides carry AEO quick-answer blocks (e.g. `> **AEO Quick Answer:**` in seo-title-optimization guide) — extend this pattern to all how-to posts.
