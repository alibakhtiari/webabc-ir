# Schema / structured data — 74/100

## Present (verified in code + live HTML)

- `ProfessionalService` Organization on every page (`src/layouts/Layout.astro:12-92`): id, logo, phones, email, address + geo (Qazvin), 6 areaServed cities, knowsAbout incl. AEO/GEO, opening hours, sameAs (GitHub/LinkedIn/X/aliib.ir).
- `BlogPosting` per post (`src/pages/[lang]/blog/[slug].astro:93-141`): headline, description, image, datePublished/dateModified, author disambiguation (Ali Bakhtiari → Person with sameAs vs Team → Organization), publisher `@id` → site organization, mainEntityOfPage, keywords, articleSection, wordCount (markup-stripped), inLanguage.
- `WebApplication` per tool (`src/layouts/ToolLayout.astro:57-72`): name, description, category, OS, offers price 0.
- `FAQPage`: tools via `faqSchema` prop (`ToolLayout.astro:89-97` + `src/utils/faqSchema.ts:25`) and blogs via `src/components/astro/FAQ.astro:19-33`.
- Publisher id consistency: blog references `https://webabc.ir/#organization`, Layout builds `${url}/#organization` — match. Good.
- Portfolio `Review`/`AggregateRating` correctly gated behind real review data (`src/content.config.ts:57-71`). Keep this discipline — never fabricate.

## Missing / wrong

1. **No `BreadcrumbList` anywhere (High).** `grep -rn BreadcrumbList src/` returns only blog-copy mentions, zero emitted entities — although a `Breadcrumbs.astro` UI component renders on blog + tool pages. Add JSON-LD to both templates with canonical `@id`s.
2. **Duplicate `FAQPage` on tool pages (High).** Live `/en/tools/headline-analyzer/` contains `FAQPage` × 2 — head-slot schema from `ToolLayout` plus component schema. Consolidate to one emitter per template.
3. **No `WebSite` node (Medium).** Add `WebSite` (+ `inLanguage` ×3) so Organization has a parent entity. Add `SearchAction` only if site search ships — don't fake it.
4. **FAQ rich-result expectations (Info, not an issue).** Google retired FAQ rich results for all sites (May 2026). Keep `FAQPage` as entity/AEO markup; do not report it as a "missing snippet" problem and do not add new FAQPage for SERP benefit.
5. **No `HowTo` — correct.** Deprecated Sept 2023; do not recommend it.
