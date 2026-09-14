# webabc.ir — SEO / AEO / GEO Audit (multilingual: en / fa / ar)

**Date:** 2026-09-14 (UTC)
**Scope:** codebase `/Users/alib/webabc-ir` (Astro 7 static + Cloudflare Workers) + live verification `https://webabc.ir`
**Skills applied:** `seo-audit`, `seo-technical`, `seo-content`, `seo-schema`, `seo-geo`, `seo-hreflang`
**Method:** static code read (no edits) + 3 parallel codebase agents + live `webfetch` of `/en/`, `/fa/`, `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/llms.txt`

> All `file:line` citations are repo-relative. Live HTML quoted was fetched 2026-09-14 and matches the code cited.

---

## Executive summary

This is a **well-built multilingual SEO foundation** — static HTML, correct canonicals, full hreflang mesh (head + sitemap), AI-crawler-friendly robots, per-language localized titles/metas, and broad JSON-LD coverage. No index-blocking Critical.

**SEO Health Score: ~79/100**

| Category (weight) | Score | Verdict |
|---|---|---|
| Technical SEO (22%) | 82/100 | pass — strong; redirects/headers need live proof |
| Content Quality + E-E-A-T (23%) | 74/100 | warn — 1 missing translation + thin fa/ar on flagship posts |
| On-Page (titles/meta/OG) (20%) | 78/100 | warn — OG/RSS discovery gaps |
| Schema / Structured Data (10%) | 76/100 | warn — dangling IDs + duplicates + `price:0` |
| Performance / CWV proxy (10%) | 88/100 | pass — static, light HTML; ar fonts + no srcset only gaps |
| AI Search Readiness GEO/AEO (10%) | 81/100 | pass — excellent crawler access + SSR; citability polish left |
| Images (5%) | 68/100 | warn — `imageAlt` stripped, title-stuffed alt, no per-lang OG |

**Top 5 critical / high items (do first):**

1. **Verify `_redirects` + `_headers` actually fire in prod** — deploy is Workers (`wrangler.toml:8-12`, `package.json:10`), but ~30 redirects live only in `public/_redirects:1-82` (Pages convention). Only `seo-title-checker` is re-implemented in `worker.ts:125-141`. Live-check `curl -I` for `/sitemap.xml`, `/en/services/modern-web-development`, asset `Cache-Control`. If dead, port rules into `worker.ts`. — **High**
2. **Fix 404 head signals** — `src/pages/404.astro:35` has no `slug` → canonical falls back to `/{lang}/` (`Layout.astro:121`); `src/pages/[lang]/404.astro:51` emits hreflang mesh to noindexed `/404` URLs. Suppress `canonical`+`hreflang` when `noindex`. — **High**
3. **Add the one missing translation** — `src/content/blog/en/how-much-does-a-website-cost-2026.mdx` has no `fa`/`ar` counterpart (counts en:32 fa:31 ar:31). Head+sitemap assume 1:1 slugs (`Layout.astro:207-210`, `astro.config.mjs:77-78`), so this creates hreflang→404. Either translate or remove its alternates. — **High**
4. **Fix `imageAlt` schema strip** — frontmatter has `imageAlt` (e.g. `src/content/blog/en/seo-checklist-2026.mdx:9`) but `src/content.config.ts:10-20,38-51` has no `imageAlt` key → zod strips it; templates fall back to `alt={title}` (`blog/[slug].astro:410-418`, `portfolio/[slug].astro:741-748`). Add `imageAlt: z.string().optional()` to both collections and wire it through. — **High**
5. **Wire real OG images** — `src/generated/og-images.json` is `{}` (3 bytes) so `Layout.astro:127-131` never hits; services/tools/portfolio fall back to `/images/og-image.webp` despite `public/images/og/services/*.webp`, `service-areas/*.webp`, `portfolio/*` existing and `ogImageMap` in `src/config/services.ts:338-350`. Blog is the only type passing explicit `ogImage` (`blog/[slug].astro:373`). Populate generator or map. + add `og:image:width/height/alt/type`, `og:locale:alternate`, `twitter:image:alt` (all missing live). — **High**

**Top 5 quick wins (<1h each):**

- Add `<link rel="alternate" type="application/rss+xml" hreflang>` discovery — feeds exist (`[lang]/rss.xml.ts:5-9`, `dist/en|fa|ar/rss.xml` confirmed) but head has zero RSS link (grep zero).
- Add `og:locale:alternate` (2 others) + `og:image:width/height/alt` + `twitter:image:alt` in `Layout.astro:187-203`.
- Add `CCBot`/`Bytespider` decision to `public/robots.txt:1-32` (currently 8 AI agents allowed, CCBot absent).
- Fix `services/index.astro:39,49,58...` schema URLs missing trailing slash vs `trailingSlash:'always'` (`astro.config.mjs:56`).
- Fix dangling `isPartOf https://webabc.ir/#website` (`serviceSchema.ts:30`, `about.astro:39`) → point at per-lang `/${lang}/#website` (`[lang]/index.astro:32`).

---

## 1. Technical SEO — 82/100

### What works (verified live + code)

- **Canonical self-ref + trailing slash:** `Layout.astro:121-122,206`, `astro.config.mjs:56`, `worker.ts:143-157` 301 normalization. Live `/en/` returns `<link rel="canonical" href="https://webabc.ir/en/">`. ✅
- **Hreflang mesh + x-default (head):** `Layout.astro:207-210` emits `en/fa/ar/x-default(en)`. Live `/en/` confirmed all 4 links. ✅
- **Hreflang in sitemap:** `astro.config.mjs:76-83` adds `xhtml:link` per URL; `dist/sitemap-0.xml` verified. Root `/` + `/404` excluded (`astro.config.mjs:63`). ✅
- **robots.txt:** `public/robots.txt:1-32` → live identical: `Allow:/`, `Disallow:/private/,/api/`, explicit `Allow` for `GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/Claude-SearchBot/Claude-User/PerplexityBot/Google-Extended`, `Sitemap: .../sitemap-index.xml`. ✅
- **Sitemap chain:** live `/sitemap-index.xml` → single `sitemap-0.xml` (`lastmod 2026-08-08`). ✅
- **Redirects that are correct in code:** `www→apex 301` (`worker.ts:112-115`), legacy `seo-title-checker→headline-analyzer` single-hop 301 (`worker.ts:125-141`), `/→/{lang}/ 302` geo by `cf.country` (`worker.ts:163-169`, correctly 302 not 301 per comment `159-162`), non-canonical host → `noindex` (`worker.ts:171-187`). ✅
- **JS/SSR:** `output:'static'` (`astro.config.mjs:43`), zero hydration islands (`client:load|only|visible|idle` = zero hits), tools are SSR shell + progressive enhancement (`ToolLayout.astro:99-160`, e.g. `qr-generator.astro:54-157` static + `160-201` inline wiring). `<ClientRouter fallback=swap>` (`Layout.astro:268`) is view-transitions only. Far under Googlebot 2MB cap: `dist/en/index.html 129K`, largest `fa/portfolio/index.html 208K`; `inlineStylesheets:'auto'` ships 120KB CSS as `/_astro/*` hashed (`astro.config.mjs:48-54`); zero `data:image` in src. ✅
- **Root `/` shim:** `index.astro:16` `noindex` + `22-25` hreflang + `26-35` `localStorage` JS + `noscript meta-refresh`; prod worker intercepts first with 302 — correct pattern, shim never served in prod. ✅

### Issues

| # | Severity | Issue | Evidence | Fix |
|---|---|---|---|---|
| T1 | High | `_redirects` (~30 rules) may be dead on Workers deploy | `public/_redirects:1-82` (`seo-title-analyzer×3`, `modern-web-development×3`, `/sitemap.xml→/sitemap-index.xml:35`, legacy `/portfolio/{1,2,4,5,7,10}`, `/blog/*-2025`, `/en/dubai`) vs `worker.ts` implements only `seo-title-checker`; deploy `wrangler deploy` (`package.json:10`) not Pages | `curl -I` each rule live; port survivors into `worker.ts` before slash normalization |
| T2 | High | `_headers` (CSP/HSTS/cache) may not apply under `run_worker_first` | `public/_headers:1-24` copied to `dist/` but `worker.ts:107-188` sets no security headers itself, passes `ASSETS.fetch` through | `curl -I /en/`, `/images/...`, `/_astro/...` live; if missing, set headers in worker response |
| T3 | High | 404 emits wrong canonical + hreflang-to-noindex | `404.astro:35` no `slug` → canonical `/{detectedLang}/`; `[lang]/404.astro:51` canonical `/{lang}/404/` + hreflang mesh to noindexed URLs | In `Layout.astro`, when `noindex` suppress `<link rel=canonical>` + hreflang block |
| T4 | High | CSP would block Turnstile if enforced | `public/_headers:8` `script-src 'self' 'unsafe-inline'` vs `contact.astro:261` `src=https://challenges.cloudflare.com/turnstile...` | Add `https://challenges.cloudflare.com` to `script-src` + `frame-src`, or confirm CSP not enforced (then fix `_headers` lie) |
| T5 | Medium | Default-lang inconsistency | Worker/root default `en` vs `Layout.astro:115` + `get-dictionary.ts:88` fallback `fa` | Pick one (recommend `en` = x-default) and align all three |
| T6 | Medium | Sitemap `lastmod` stale + orphan keys | `sitemap-lastmod.json:1-3` `_generated 2026-08-09`, `_fallback 2025-01-01`; stale vs `updatedDate 2026-09-14` posts; contains `-2025` slugs that no longer exist (`best-seo-tools-2025` etc. vs current `best-seo-tools.mdx`); generator `scripts/resolve-sitemap-lastmod.mjs` missing (`scripts/` absent, no npm script) | Restore script, prune renames, rebuild; document in `package.json` |
| T7 | Medium | Tool-detail pages get no sitemap `<image:image>` | `getImageForPage` handles `blog/services/service-areas/portfolio` + tools **index only** (`astro.config.mjs:35-37`) | Extend to `tools/{slug}` or drop tools-index special-case |
| T8 | Medium | `robots-generator` tool defaults to wrong sitemap URL | `robots-generator.astro:115` defaults `Sitemap:.../sitemap.xml`, canonical is `sitemap-index.xml` (relies on `_redirects:35` which may be dead per T1) | Change default to `sitemap-index.xml` |
| T9 | Medium | Catch-all 404 status unverified | Worker forces 404 only when pathname ends `/404` (`worker.ts:174-185`); unknown slug serves static `404.html` — status depends on ASSETS layer | `curl -I https://webabc.ir/en/nope/` must be real 404, not 200 |
| T10 | Low | No `Accept-Language` handling; geo-only locale detect | `worker.ts:163-169` geo only (`IR/AF/TJ→fa`, 19 Arab CCs→`ar`); `index.astro:31-35` localStorage shim | Acceptable; optionally add `Accept-Language` as secondary signal for diaspora/VPN users |
| T11 | Low | Dead i18n stub | `src/i18n/index.ts:14-26` `translations={en:{},fa:{},ar:{}}` + warn | Delete or document as deprecated |

---

## 2. On-Page (titles / meta / OG / Twitter) — 78/100

Live `/en/` head (fetched) is representative and correct as far as it goes:

```html
<title>WebABC | Professional SEO and Web Design Services</title>
<meta name="description" content="WebABC is a premier digital agency ... Middle East.">
<link rel="canonical" href="https://webabc.ir/en/">
<link rel="alternate" hreflang="en|fa|ar|x-default" href="https://webabc.ir/{en,fa,ar,en}/">
<meta property="og:type/url/title/description/image/site_name/locale" ...>
<meta name="twitter:card/url/title/description/image" ...>
```

- **Titles/descriptions localized, not duplicated:** home (`en/fa/ar/home.json:2-3`), seo service (`seo-service.json:2-3`), blog `seo-checklist-2026` (`en/fa/ar:2-3`, fa adds `۱۴۰۵/Neshan/Balad` localization), portfolio `tahami-clinic` (`en/fa/ar:2,6`), service-areas (e.g. `service-areas.json:36-38` Muscat per lang), tools (`tools.json` + per-tool e.g. `serpPreview.json`). Plumbing `Layout.astro:177-178,188-191,199-203,206-210` correct. ✅
- **`html lang/dir`:** `Layout.astro:151` + `language.ts:21,35` (`fa/ar rtl`, `en ltr`). Live `/en/` = `lang="en" dir="ltr"`; `/fa/` body text verified Persian. ✅
- **Article meta on blog:** `ogType="article"` + `article:published_time/modified_time/author/section` (`blog/[slug].astro:368-401`), `<link rel=image_src>` (`377-381`). ✅
- **H1:** exactly one per template (Hero `46-50`, ToolLayout `106-110`, blog `440-444`, portfolio `404-406`, about `79-83`, etc.); MDX bodies start at `##`; no skipped levels. ✅
- **Viewport/charset/favicon/manifest/theme-color:** `Layout.astro:153-154,212-217`. ✅

### Gaps

| # | Severity | Gap | Evidence |
|---|---|---|---|
| O1 | Medium | No `og:locale:alternate` (should list other 2 locales) | `Layout.astro:193-196` only `og:locale`; live confirms |
| O2 | Medium | No `og:image:width/height/alt/type` | `Layout.astro:187-196` only `og:image`; live confirms bare URL |
| O3 | Medium | No `twitter:image:alt` | `Layout.astro:199-203` |
| O4 | Medium | No RSS discovery `<link rel=alternate type=application/rss+xml>` | Grep zero; feeds exist (`rss.xml.ts:5-9`, `dist/en\|fa\|ar/rss.xml`, `<language>en-us/fa-ir/ar-sa:43`) |
| O5 | Low | Manifest `start_url:/en/`, `lang:en/dir:ltr` biases fa/ar; icons only 192/256, no 512/SVG/mask | `manifest.json:1-66`, `Layout.astro:216` |
| O6 | Low | `Breadcrumbs.astro:32` hardcodes `font-persian` for all langs | Cosmetic; switch to `fontClass` per lang like Hero/blog templates |
| O7 | Info | `ogImageMap` lang-agnostic by design (`services.ts:338-350`); `getImageForPage` strips lang (`astro.config.mjs:13-39`); blog passes same `/images/blog/<slug>.webp` for all langs | Acceptable for now, but fa/ar OG cards show same Latin-biased image; see §6 for per-lang OG recommendation |

---

## 3. Hreflang / international — validation

Method: `seo-hreflang` §§1-8 against head + sitemap + file inventory.

| Check | Status | Evidence |
|---|---|---|
| Self-referencing tag | ✅ | Every `Layout` page emits own lang URL (`207-210`); live `/en/` self-links |
| Return tags (full mesh) | ✅ today | Head emits all 3 + sitemap `xhtml:link` all 3 (`astro.config.mjs:76-83`); `Navbar.astro:439,529,729` switcher preserves slug |
| x-default | ✅ | Points to `en` (`Layout.astro:210`, sitemap `82`); consistent with worker default `en` |
| Language codes | ✅ | `en/fa/ar` — valid ISO 639-1 |
| Region codes | n/a | Language-only (no `en-US` style) — correct choice for language site |
| Canonical alignment | ✅ except 404 | Self-canonical everywhere incl. per-type slug wiring (`services/[slug]:68`, `portfolio:381`, `blog:372`, `service-areas:316`, tools via `ToolLayout:45,81`); breaks only on 404 (T3) |
| Protocol consistency | ✅ | All `https://webabc.ir` hardcoded (`Layout.astro:120-131`) |
| Trailing slash | ✅ | `always` + worker 301; schema URLs except `services/index` comply |
| 1:1 slug invariant | ⚠️ 1 break | Code assumes every slug exists in all 3 langs; true except `how-much-does-a-website-cost-2026` (en-only). Any future untranslated post repeats this — add CI check `diff <(ls blog/en) <(ls blog/fa)` etc. |
| Sitemap vs HTML duplication | ✅ acceptable | Both methods used; Google supports this, sitemap preferred at scale — keep |

**Cultural / locale spot-check (fa/ar):** titles, descriptions, hero, FAQs, author bio/role, dates (`fa-IR`/`ar-SA` in `blog/[slug].astro:42-52`), numbers localized in fa portfolio (`+۳۴۰٪`). One stale string: `fa/tahami-clinic` description says `۲۸۰٪` vs results `+۳۴۰٪` (`fa:23`). Fa service-area titles trend keyword-stuffed vs en (`service-areas.json:36-38` — e.g. fa Muscat `طراحی سایت در عمان | طراحی سایت در مسقط...` vs en `Web Design & SEO Services in Muscat...`) — works for exact-match but watch click-through; A/B titles if CTR lags in GSC.

---

## 4. Content + E-E-A-T — 74/100

### Collections & parity

- `blog` + `portfolio` only collections (`content.config.ts:83`); services/service-areas/tools from `config/*` + `i18n/*.json` (all 30 top-level + 20 `tools/*.json` files parity en/fa/ar, `diff` empty). ✅
- **File-count parity:** portfolio 17/17/17 ✅; blog 32/31/31 — single gap `how-much-does-a-website-cost-2026.mdx` (en-only). ⚠️
- **Body-depth parity gaps (words excl. frontmatter):**
  - `wordpress-seo-optimization-guide-2026`: en 1529 vs fa 334 vs ar 295 (~20% — fa/ar truncated at checklist item 4). **Flagship thin-translation risk.**
  - `ai-search-optimization-guide-2026`: en 2033 / fa 2017 / ar 1565 (ar thinner).
  - Counterexample `seo-checklist-2026`: en 697 / fa 953 / ar 541 (fa deepest — not systematic, points to per-post resourcing not pipeline).
  - Portfolio bodies: `tahami` strong all langs (~1000w); `mehromah` en 377/fa 393/ar 220; `mahsun-visa` en 286/fa 276/ar 113 — ar portfolio systematically ~40-50%.
  - Service-areas: `abu-dhabi`/`riyadh` shortest all langs (riyadh en 4 services/3 benefits vs 5/5 elsewhere); `ar tehran/qazvin/dubai longDesc 131/120/163ch` (~1 paragraph); only `qazvin` has per-location `faqs` (en 2 / fa 4 / ar 0 — ar key missing entirely); other 5 locations `faqs:0`, relying on 3 generic FAQs → high template similarity across 18 URLs; `abu-dhabi/riyadh` fall back to single generic guide with zero caseStudies (`service-areas/[slug].astro:289-309`).
- **Totals mask gaps:** `blog wc -w en 37331 / fa 35511 / ar 30479` looks close; per-post audit above is the real signal.

### E-E-A-T (Who/How/Why + Trust-heavy weights)

- **Who:** bylines with `rel="author"` (`blog/[slug].astro:449-475`), author box with photo + localized bio/role (`548-712`, `149-167`), `Person` schema with 7 `sameAs` (`blog/[slug]:102-122`, `ali-bakhtiari.astro:141-172`). ✅
- **How:** methodology/bio pages (`about/ali-bakhtiari.astro:49-140` EN/FA/AR), process steps on contact (`contact.astro:222-253`), case-study specs + results. ✅
- **Why:** helping-first content (guides, free tools, calculators) — no word-count-churn signals. ✅
- **Trust:** HTTPS/HSTS (`_headers`), contact NAP (2× tel, email, Qazvin STP address `contact.astro:158-253`), about/mission/stats, privacy policy per lang. Gaps: **footer address fa-only** (`Footer.astro:119-146`, en/ar omit); **dead legal links** — footer references `termsOfService/cookiePolicy` (`common.json:66-67`) but no `terms*`/`cookie*` routes exist; **privacy `lastUpdated` = runtime `new Date()`** (`privacy.astro:65-68`) — changes daily, poisons caching/lastmod; testimonials correctly absent when no real reviews (no fabrication per `content.config.ts:52-54`, `portfolio/[slug]:760-774` conditional). ⚠️

---

## 5. Schema — 76/100

### Inventory (all `application/ld+json`, JSON-LD preferred ✅)

| Page type | Schema | Location |
|---|---|---|
| Global (every page) | `ProfessionalService #organization` (tel, email, geo, hours, areaServed 6 cities, knowsAbout incl. AEO/GEO) | `Layout.astro:11-91,249` |
| Home | `WebSite #website` + `SearchAction` | `[lang]/index.astro:29-51` |
| Blog post | `BlogPosting` (headline, image absolute, dates, author Person\|Org, publisher, keywords, section, wordCount, inLanguage) | `blog/[slug].astro:93-141` |
| Blog index | `Blog` + 10× `BlogPosting` | `blog/index.astro:43-70` |
| Service detail | `@graph[WebPage, Service, BreadcrumbList]` | `serviceSchema.ts:19-110` via `services/[slug].astro:58-70` |
| Services index | `ItemList` of `Service` | `services/index.astro:25+` |
| Portfolio detail | `@graph[CreativeWork+CaseStudy, Review/AggregateRating if real, FAQPage if faqs]` | `portfolio/[slug].astro:90-157` |
| Service-area | `Service+ProfessionalService` + provider + areaServed City + geo + Offer catalog | `service-areas/[slug].astro:83-130` |
| About / Contact / FAQ / Person / 404 | `AboutPage` / `ContactPage` / `FAQPage` / `Person` / `WebPage` graphs | `about.astro:27-66`, `contact.astro:21-54`, `faq.astro:30-42`, `ali-bakhtiari.astro:141-172`, `[lang]/404.astro:30-40` |
| Tools | `WebApplication` + optional `FAQPage` | `ToolLayout.astro:57-97`, per-tool `faqSchema` (15+ files) |
| Components | `BreadcrumbList` (absolute URLs), `FAQPage` (`#faq isPartOf #webpage`) | `Breadcrumbs.astro:11-29`, `FAQ.astro:18-35` |

### Validation issues

| # | Severity | Issue | Fix |
|---|---|---|---|
| S1 | Medium | Dangling `isPartOf https://webabc.ir/#website` — no such node; only per-lang `/{lang}/#website` exists | Point `serviceSchema.ts:30`, `about.astro:39` at the page's own lang website node |
| S2 | Medium | Duplicate `BreadcrumbList` — component + page-level both emit (`Breadcrumbs.astro:29` + `serviceSchema.ts:85-108`, `about.astro:47-64`, `contact.astro:35-53`) | Keep component version; drop page-level copies (service-areas authors already avoided the FAQ dup — do same for breadcrumbs) |
| S3 | Medium | Duplicate `FAQPage` risk on blog — frontmatter `faq`→`<FAQ>` (`blog/[slug]:715-721`) **plus** raw inline `<script ld+json>` in `local-seo-services-guide-2026.mdx` + `ai-search-optimization-guide-2026.mdx` (2+ posts × 3 langs) | Remove inline scripts; single-source through `<FAQ>` |
| S4 | Medium | `offers price:'0'` on every Service + WebApplication (`serviceSchema.ts:68`, `ToolLayout.astro:69`) claims “free” for paid services | Use `priceRange`/`priceSpecification` or omit `offers` |
| S5 | Medium | `areaServed` inconsistency — Layout lists 6 cities, Service pages generic Iran+Global (`serviceSchema.ts:56-65`) | Align: Service pages should reference their city where applicable |
| S6 | Low | `services/index` schema URLs lack trailing slash vs canonical `.../seo/` | Append `/` (`services/index.astro:39,49,58...`) |
| S7 | Low | `Blog keywords:''` when no tags; `publisher.logo ${origin}/webabc.webp` unverified (public root has `logo.webp`) | Guard empty keywords; verify/rename logo file |
| S8 | Low | `privacy.astro:1-132` has **zero** JSON-LD | Add `WebPage` breadcrumb parity (low value, backlog) |
| S9 | Low | `sameAs` drift: Layout 4 vs blog-Person 7 (adds Instagram/Facebook/alibakhtiari.ir) vs footer 3 | Single-source `sameAs` const; decide Instagram/Facebook inclusion once |
| S10 | Info | `ProfessionalService` chosen over `LocalBusiness` — eligible hours/geo present but LocalBusiness rich features not claimed | Conscious choice for agency; revisit if GBP/local-pack becomes priority |
| S11 | Info | `FAQPage` kept on tools/FAQ (`ToolLayout`, `faq.astro`, `FAQ.astro`) — Google retired FAQ rich results 2026-05-07, no SERP benefit | Per `seo-schema`: keep at Info, do **not** remove — still useful for AI extraction; never add `HowTo` (ret. 2023) |

---

## 6. Images + OG — 68/100

- **Delivery good:** `OptimizedImage.astro:10-32` requires `alt`, renders `avif→webp→img`; `Hero.astro:77-86` `formats:[avif,webp]`; LCP correct (`HeroSection 105-115` hero eager+high, blog cover `1200x630` eager+high `410-418`, portfolio hero eager `741-747`, indexes lazy). No `srcset/sizes` (single file) — fine at current weights, add if LCP regresses. `scripts/generate-avif.mjs` referenced but `scripts/` absent — yet `.avif` siblings exist; restore or re-document script. ⚠️
- **Alt-text real problem:** `imageAlt` frontmatter exists and is localized but **stripped by zod** (§4 fix); renders fall back to `alt={title}` (title-stuffed, not descriptive) across blog/portfolio indexes + detail; hardcoded English alts leak onto fa/ar (`ali-bakhtiari.astro:195-202`, `blog/[slug]:567` logo, `social-media-preview:168,218,262`, `base64-encoder:131`); one inline MDX `<img>` bypasses component entirely (`wordpress-seo-...mdx:45`). Fix order: (1) add `imageAlt` to schema, (2) use `post.data.imageAlt || post.data.title`, (3) localize the 5 hardcoded strings via dictionaries.
- **OG images:** single global fallback today. `og-images.json` empty → all non-blog pages `og:image = /images/og-image.webp` (English-biased) despite per-service crops existing (`services.ts:338-350`, `public/images/og/{services,service-areas,portfolio}/*`). Blog passes same image all langs. Recommendation: populate `og-images.json` (or use `ogImageMap` + `getImageForPage` directly in `Layout`) so `services/{slug}`, `service-areas/{slug}`, `portfolio/{slug}` resolve their crops; long-term generate per-lang OG crops (fa/ar typography) — currently all OG crops are Latin-biased.
- **Sitemap images:** `getImageForPage` assumes `/images/blog/<slug>.webp` for all posts; `public/images/blog/` has 63 files (avif+webp+png mix) for 94 posts with renames (`clickable-headlines` vs `how-to-write-clickable-headlines`, `best-seo-tools.png` source) — spot-check `<image:loc>` 200s or loosen to “emit only if file exists”.

---

## 7. Performance (lab proxy, no CrUX) — 88/100

- Static output, hashed CSS/JS (`/_astro/*` immutable 1y per `_headers:12-19` — pending T2 verification), `*.html max-age=3600` (`_headers:22-23`), fonts self-hosted en/fa (`ltr/rtl.woff2` 23/30K, preloaded `Layout.astro:167-174`). ✅
- **Ar font gap:** `ar` loads Google Fonts (`IBM Plex Sans Arabic + Cairo`, `Layout.astro:159-164` preconnect) — extra 3P render-blocking vs en/fa self-hosted. Self-host ar fonts to match. — Medium
- Third-party scripts: only Turnstile on contact (`contact.astro:261`) — see CSP clash T4. No analytics bloat observed in `<head>`. ✅
- INP/CLS: no hydration islands, no `width/height` enforcement on all `OptimizedImage` callers (CLS risk on slow networks) — add dimensions where known (covers are `1200x630`). — Low

---

## 8. AI Search Readiness (GEO / AEO) — 81/100

Framed per `seo-geo`: Google treats GEO as SEO fundamentals applied to AI surfaces — this site already does most of them.

| GEO pillar (weight) | Score | Evidence |
|---|---|---|
| Citability 25% | 75 | FAQ/Q&A strong (every tool + services + portfolio-case + home FAQ `H2`); `TLDR.astro:16-56` takeaways; `TableOfContents.astro:55-77`; definitions present but no `<dl>/blockquote` pattern; only 1 `<table>` (`keyword-density-analyzer:146-163`); FAQ answers `hidden` (`FAQ.astro:68-69`) — in DOM but weaker for naive extractors vs open `ToolFAQ` cards |
| Structure 20% | 85 | Clean H1→H2→H3, question-based headings, short paragraphs, lists; TOC + takeaways wired (`blog/[slug]:536-545`) |
| Multi-modal 15% | 70 | Text+images everywhere, hero/cover crops, QR canvas tool, calculators; no video embeds, no charts/infographics components |
| Authority/brand 20% | 75 | Author Person + credentials + dates + sources; `updatedDate` mostly `2026-08-18`, few `2026-09-14`; recency good (<1mo). Weak: no Wikipedia/Wikidata entity, no YouTube/Reddit presence in `sameAs`; `sameAs` drift (§5 S9) |
| Technical access 20% | 95 | SSR static, zero JS-gating, all AI crawlers `Allow` (8 agents), `llms.txt` 92 lines live, RSL/ai.txt absent (optional per Google — `llms.txt` ignored by Google Search, may help other crawlers) |

**Quick GEO wins:**

1. Un-hide or duplicate one 134-167-word self-contained answer block (“What is X?” in first 60 words) per money page — 47% of AI citations come from first 30% of page.
2. Add `<link rel="llms-txt" href="/llms.txt">` discovery (optional; helps non-Google crawlers find it).
3. Localize `llms.txt` links — today ~all `/en/...` + 2× `/fa/portfolio/` (`llms.txt:69-70`); add fa/ar service + guide links or split per-lang sections.
4. Consider `CCBot`/`Bytespider` stance explicitly (currently silent = allowed via `*`; document choice).
5. Add publication/refresh cadence note — content <3mo is ~3× more likely cited; the `2026-08-18→09-14` refresh trail is already a strength, keep it.
6. surface `dateModified` visibly on service pages too (today only blog shows updated badge `blog/[slug]:493-511`).

---

## 9. Prioritized action plan

### Critical (index-blocking) — none found. ✅

### High (fix within 1 week)

- [ ] H1 — live-verify `_redirects` + `_headers` (`curl -I`); port rules/headers into `worker.ts` if dead (T1/T2)
- [ ] H2 — suppress canonical+hreflang on `noindex` (404s) (T3)
- [ ] H3 — translate or de-alternate `how-much-does-a-website-cost-2026` (fa/ar) (§3/§4)
- [ ] H4 — add `imageAlt` to zod + wire through renders (§6)
- [ ] H5 — populate OG resolution (`og-images.json` / `ogImageMap` / `getImageForPage`) + add `og:image:*` + `og:locale:alternate` + `twitter:image:alt` (O1-O3, §6)

### Medium (fix within 1 month)

- [ ] M1 — align CSP with Turnstile or remove false CSP (T4)
- [ ] M2 — unify default lang `en` everywhere (T5) + single-source `sameAs` (S9)
- [ ] M3 — restore sitemap-lastmod pipeline, prune `-2025` orphans (T6); emit tool-detail images (T7); fix generator default sitemap URL (T8)
- [ ] M4 — flesh out thin translations: `wordpress-seo` fa/ar rewrite (not MT stub), ar portfolio bodies, `abu-dhabi`/`riyadh` depth + per-location FAQs, ar `qazvin.faqs` key (§4)
- [ ] M5 — dedup schemas: one `BreadcrumbList` source (S2), remove inline MDX FAQ scripts (S3), fix dangling `#website` (S1), revisit `price:0` (S4), trailing slashes in `services/index` (S6)
- [ ] M6 — self-host ar fonts; add image dimensions; fix footer legal links (terms/cookie or remove) + footer address parity + stable privacy `lastUpdated` (§4/§7)
- [ ] M7 — RSS discovery links; 512px manifest icon; `CCBot` decision; `og:locale:alternate` (§2)
- [ ] M8 — GEO polish: answer-first blocks, `llms.txt` localization + discovery link, visible `dateModified` on services (§8)

### Low / backlog

- [ ] L1 — verify catch-all 404 status (T9); `Accept-Language` secondary signal (T10); delete dead `i18n/index.ts` stub (T11)
- [ ] L2 — `LocalBusiness` vs `ProfessionalService` decision (S10); privacy `WebPage` schema (S8); `Breadcrumbs` font fix (O6); per-lang OG crops (fa/ar typography)
- [ ] L3 — sitemap-image existence guard; `keywords` empty guard; `webabc.webp` verify

---

## 10. What was checked (coverage statement)

- **Layouts/head:** `Layout.astro` (all head tags, schemas, fonts), `ToolLayout.astro` (WebApplication + FAQ wiring) — full read
- **Components:** Breadcrumbs, FAQ, ToolFAQ, Navbar switcher, Hero/HeroSection, OptimizedImage, Footer — targeted read
- **Routing/i18n:** `[lang]` static paths, `language.ts`, `get-dictionary.ts`, `translate.ts`, root + 404 pages, worker geo redirect — full read
- **Config/build:** `astro.config.mjs` (sitemap/hreflang/images/priorities), `wrangler.toml`, `worker.ts`, `public/robots.txt/_headers/_redirects/llms.txt/manifest.json`, `og-images.json`, `sitemap-lastmod.json` — full read
- **Content:** `content.config.ts`, all `i18n/{en,fa,ar}/*.json` inventories + diffs, blog/portfolio file-count diffs, per-post word counts (3 flagship + totals), service-area JSON depth table, tools map (22) — sampled + counted
- **Live:** `/en/` full head, `/fa/` render, `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml` (truncated, structure verified), `/llms.txt` — fetched
- **Not checked (needs prod secrets/access):** CrUX/PSI field CWV, GSC indexation/clicks, GA4 traffic, backlink profile, SERP positions, staged `_headers`/`_redirects` enforcement (flagged T1/T2/T9 for `curl -I` follow-up)

---

## 11. Repro

```bash
# parity
ls src/content/blog/en | wc -l; ls src/content/blog/fa | wc -l; ls src/content/blog/ar | wc -l
diff <(ls src/content/blog/en) <(ls src/content/blog/fa)
diff <(ls src/content/blog/en) <(ls src/content/blog/ar)
# live headers (run against prod)
curl -sI https://webabc.ir/en/ | grep -i -E '^(HTTP|content-security|strict-transport|x-frame|x-content|referrer|permissions|cache-control|x-robots)'
curl -sI https://webabc.ir/sitemap.xml | head -5
curl -sI https://webabc.ir/en/services/modern-web-development | head -5
curl -sI https://webabc.ir/en/nope/ | head -3
curl -s https://webabc.ir/robots.txt
curl -s https://webabc.ir/sitemap-index.xml
```

---

*Report generated from codebase evidence + live fetch. Scores are this audit's heuristics (per `seo-content` honest-scoping rule), not Google-internal signals — validate ranking impact in Search Console.*
