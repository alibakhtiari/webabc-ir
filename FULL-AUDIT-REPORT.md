# Full SEO Audit — webabc.ir

**Audit date:** 2026-08-23
**Pages crawled:** 285 of 285 in sitemap (100% coverage, all HTTP 200)
**Business type:** Digital agency (web design, development, SEO) — multilingual (en/fa/ar), multi-region service-area business
**Stack detected:** Astro static site, served via Cloudflare
**Live data sources used:** Google Search Console (`sc-domain:webabc.ir`), PageSpeed Insights v5 (lab), CrUX (no field data available)

---

## Executive Summary

### SEO Health Score: 82 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 86 | 18.9 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 92 | 9.2 |
| Performance (CWV) | 10% | 88 | 8.8 |
| AI Search Readiness | 10% | 90 | 9.0 |
| Images | 5% | 92 | 4.6 |
| **Total** | **100%** | | **82.4** |

This is a technically excellent site with a serious commercial problem: it earns impressions but almost no clicks. In the last 28 days the site drew roughly 6,700 impressions but recorded fewer than 20 clicks. The technical foundation is not the bottleneck — targeting and snippet quality are.

### Top 5 Critical Issues

1. **Near-zero CTR on the site's only high-impression page.** `/en/tools/headline-analyzer/` took 5,162 impressions in 28 days (77% of all site impressions) and converted 2 clicks — a 0.04% CTR at average position 14.8. Impressions are also accelerating (947 on 2026-08-21 vs ~70/day in June) with clicks flat at zero.
2. **The bulk of those impressions are for a competitor's branded query.** 2,911 impressions come from `seo title checker for blog by webnewstips com` at position 5.8. This is a navigational query for another brand; those searchers will never click webabc.ir. The apparent traffic growth is largely worthless.
3. **Keyword cannibalization between two tool pages.** `/en/tools/headline-analyzer/` and `/en/tools/seo-title-checker/` both target "seo title checker" queries. Google picks the headline analyzer (716 impressions at position 21.1) over the purpose-built page (4 impressions at position 21). Two pages split the signals and neither ranks on page one.
4. **Persian and Arabic titles and descriptions are far over SERP display limits.** Median title length is 92 characters (fa) and 91 (ar) against ~60 usable; median meta description is 256 (fa) and 235 (ar) against ~160. 144 of 190 non-English pages have over-length titles and 171 have over-length descriptions. Google truncates them, so the snippet the searcher sees is cut mid-sentence — a direct CTR tax on the two languages that produce the site's actual clicks (Iran: 33 clicks / 1,825 impressions over 90 days).
5. **Duplicate URL variants are indexed.** Google reports both `/en/tools/seo-title-checker` and `/en/tools/seo-title-checker/`, and both `/fa/service-areas/qazvin` and `/fa/service-areas/qazvin/`, as separate pages. The non-slash form answers with a **307 (temporary)** redirect rather than 301, and 103 internal links across the site point at non-slash URLs.

### Top 5 Quick Wins

1. Rewrite the title and meta description for `/en/tools/headline-analyzer/` around what searchers actually type ("SEO title checker") and add a visible free/instant/no-signup value hook. Positions 5–20 with 5,000+ impressions means even 2% CTR is ~100 clicks/month from work already done.
2. Fix the 103 internal links missing trailing slashes and switch the redirect from 307 to 301. One deploy-level change removes a redirect hop sitewide and collapses the duplicate URLs.
3. Truncate fa/ar titles to ≤60 characters and descriptions to ≤160 — this is a template/frontmatter edit across 190 pages, no new content required.
4. Resolve the tool-page cannibalization: merge the two pages, or split them cleanly (headline analyzer = emotional/power-word scoring; title checker = pixel length and SERP preview) with distinct titles, H1s, and internal anchors.
5. Fix the 12 blog URLs whose slug says `2025` while the title and content say `2026` (e.g. `/en/blog/seo-best-practices-2025/` titled "SEO Best Practices for 2026"). Keep the URLs, drop the year from the slug going forward, or 301 to a year-free slug.

---

## Technical SEO

### What is working

| Check | Result |
|-------|--------|
| HTTPS | Enforced; `http://` and `www.` both 301 to `https://webabc.ir/` |
| HSTS | `max-age=31536000; includeSubDomains; preload` |
| Content-Security-Policy | Present and restrictive (`default-src 'self'`, `object-src 'none'`) |
| Other security headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` all set |
| robots.txt | Valid; `/private/` and `/api/` disallowed; sitemap declared |
| Sitemap | `sitemap-index.xml` → `sitemap-0.xml`, 285 URLs, all with `lastmod`, `changefreq`, `priority`, and 4 `xhtml:link` hreflang alternates each |
| Crawl result | 285/285 returned HTTP 200, zero errors, zero redirects, zero broken internal links |
| Canonicals | 285/285 present and self-referencing; zero mismatches |
| hreflang | 285/285 pages carry en, fa, ar, x-default — fully reciprocal |
| Indexability | `x-robots-tag: index, follow, max-image-preview:large, max-snippet:-1` on every page |
| 404 handling | Unknown paths return a real 404 (no soft-404s) |
| Mobile | Viewport meta on all pages; Lighthouse mobile SEO 10/10, accessibility 100 |
| `.well-known/security.txt` | Present and valid |

### Issues

**HIGH — 307 instead of 301 on trailing-slash normalization.**
`https://webabc.ir/en` returns `307 Temporary Redirect` to `/en/`. A 307 tells Google the redirect may be reversed, so both URLs can stay in the index and link equity is not consolidated cleanly. GSC confirms the duplicate variants are live. Change the redirect to a permanent 301 at the Cloudflare/Astro layer.

**HIGH — 103 internal links miss the trailing slash.**
41 distinct targets, concentrated in the tools section (`/en/tools/seo-title-checker` ×7, `/en/tools/serp-preview` ×7, `/ar/tools/cost-calculator` ×6, and others). Every one of these forces an extra round trip and feeds the duplicate-URL problem. `llms.txt` also uses non-slash URLs throughout.

**MEDIUM — Root URL uses a client-side JavaScript redirect and is `noindex`.**
`https://webabc.ir/` serves a 1.5 KB shim that reads `localStorage` and calls `window.location.replace('/en/')`. The page carries `<meta name="robots" content="noindex, follow">` while the HTTP header on the same response says `index, follow` — contradictory signals — and it canonicalizes to `/en/`. It works (Google renders JS), but a server-side 302 with `Accept-Language` detection, or a plain 301 to `/en/`, is more reliable, faster, and removes the header/meta conflict. Note the root did earn impressions historically, so it is being crawled.

**MEDIUM — Static assets are served with `Cache-Control: public, max-age=0, must-revalidate`.**
This applies even to content-hashed Astro bundles such as `/_astro/ClientRouter.astro_astro_type_script_index_0_lang.1C6u8_SW.js`. Hashed filenames should be `max-age=31536000, immutable`. Repeat visitors are revalidating assets that can never change.

**LOW — Case-sensitive paths.** `/EN/` returns 404 rather than redirecting to `/en/`. Minor, but a cheap catch for mistyped or badly-cased inbound links.

**Not verifiable in this audit:** index coverage counts (`Pages` report) and per-URL indexing status. The Search Console property is a domain property (`sc-domain:webabc.ir`) accessed via service account, and Google's Sitemaps and URL Inspection APIs do not support that combination. Check the Pages report in the GSC UI to confirm how many of the 285 sitemap URLs are actually indexed.

---

## Content Quality

### Volume and depth

| Metric | Value |
|--------|-------|
| Pages | 285 (95 per language, perfect parity across en/fa/ar) |
| Median word count | 1,142 |
| Range | 51 – 6,880 |
| Pages under 300 words | 26 (all tool pages, contact pages, and the author bio) |
| Duplicate titles | 0 |
| Duplicate meta descriptions | 0 |

Content depth on blog and service pages is genuinely good — median 1,142 words with 5 H2 sections is above what most agency sites publish, and language parity across en/fa/ar is complete.

### E-E-A-T assessment

**Strong signals:** named author (Ali Bakhtiari) with `Person` schema including `sameAs` links to GitHub, LinkedIn, X, and a personal domain; `datePublished` and `dateModified` on every blog post; a physical address (Qazvin Science & Technology Park) and phone number in organization schema; 51 portfolio/case-study pages with `CreativeWork/CaseStudy` schema linking out to 12 real live client domains.

**Weakness — the author page is 111 words.** `/en/about/ali-bakhtiari/` is the destination for every article byline and every `Person.url` in schema, and it is the second-thinnest page on the site. For an agency selling SEO expertise this is the single highest-leverage content gap. It should carry credentials, years of experience, notable projects, speaking/publication history, and outbound links that corroborate the claims.

**Weakness — thin tool pages.** The 24 tool pages average roughly 150–210 words (`/en/tools/json-formatter/` at 152, `/en/tools/glassmorphism-generator/` at 162, `/en/tools/lorem-generator/` at 171). The tools themselves are the value, but with this little supporting text there is nothing for Google to rank on beyond the title, and nothing for an LLM to cite. Each needs a short "how it works", "when to use it", and 3–4 FAQ entries.

**Weakness — `/en/contact/` at 51 words** is the thinnest page on the site. Add service areas, response-time expectations, and office details.

### Date and freshness signals

Twelve blog URLs (4 articles × 3 languages) have a `2025` slug with `2026` in the title and content: `seo-best-practices-2025`, `best-seo-tools-2025`, `mobile-first-design-2025`, `web-design-trends-2025`. A searcher seeing a 2025 URL under a 2026 title reads it as stale, and Google surfaces the URL in the breadcrumb.

---

## On-Page SEO

| Check | Result |
|-------|--------|
| Titles present | 285/285 |
| Titles unique | 285/285 |
| Meta descriptions present | 285/285 |
| Meta descriptions unique | 285/285 |
| Exactly one H1 | 285/285 |
| Median H2 count | 5 |
| Open Graph tags | 7 properties on all 285 pages (type, url, title, description, image, site_name, locale) |
| Twitter Card | 7 properties on all 285 pages |
| Median internal links per page | 66 |
| Orphan pages | 0 |
| Empty anchor text | 0 |

### Issues

**HIGH — Title length by language.**

| Language | Median title | Max | Over 60 chars |
|----------|--------------|-----|---------------|
| en | 53 | 81 | 31 / 95 |
| fa | 92 | 149 | 69 / 95 |
| ar | 91 | 134 | 75 / 95 |

Worst offenders: `/fa/blog/wordpress-vs-custom-development-guide-2026/` (149 chars), `/fa/portfolio/behrad-dc/` (146), `/fa/blog/dubai-uae-web-design-seo-guide-2026/` (140). Arabic and Persian glyphs are generally *wider* than Latin at the same character count, so these truncate even harder than the raw numbers suggest.

**HIGH — Meta description length by language.**

| Language | Median description | Max | Over 160 chars |
|----------|--------------------|-----|----------------|
| en | 151 | 177 | 9 / 95 |
| fa | 256 | 303 | 87 / 95 |
| ar | 235 | 301 | 84 / 95 |

Longest: `/fa/tools/cost-calculator/` (303), `/ar/portfolio/` (301), `/fa/tools/css-gradient-generator/` (301). Roughly 40% of each of these descriptions never reaches a searcher.

**HIGH — Cannibalization on "seo title checker".**
Both pages carry near-identical schema (`ProfessionalService`, `WebApplication`, `FAQPage`, `BreadcrumbList`), similar word counts (422 vs 461), and overlapping titles:

- `/en/tools/headline-analyzer/` — "SEO Headline Checker & Blog Title Analyzer – Free Headline Tester" — 716 impressions for `seo title checker`, position 21.1
- `/en/tools/seo-title-checker/` — "SEO Title Checker & Meta Tag Analyzer – Free SERP Preview Tool" — 4 impressions for the same query, position 21

Google is choosing the wrong page and both sit on page 3.

**MEDIUM — Blog index pages skip a heading level.** `/en/blog/`, `/fa/blog/`, and `/ar/blog/` have zero H2 elements but do have H3s. Promote the post-card headings to H2.

**MEDIUM — Internal link distribution is flat.** Median inbound internal links is 4, and the pages with the fewest are the ones that matter most for trust: `/en/about/ali-bakhtiari/` (2), `/en/faq/` (2), and their fa/ar equivalents. Blog posts average 3. There are 66 outbound internal links per page, so the crawl graph is dense, but it is dominated by navigation rather than contextual in-content links.

---

## Schema & Structured Data

### Current implementation

285/285 pages carry valid JSON-LD. Zero parse errors.

| Type | Instances |
|------|-----------|
| ProfessionalService | 285 |
| BreadcrumbList | 321 |
| FAQPage | 213 |
| BlogPosting | 84 |
| WebApplication | 69 |
| CreativeWork + CaseStudy | 48 |
| Service (and Service + ProfessionalService) | 51 |
| WebPage | 33 |
| WebSite / AboutPage / Person / Blog / ContactPage / ItemList | 3 each |

Quality is high. `ProfessionalService` uses a stable `@id` (`https://webabc.ir/#organization`) with `address`, `telephone`, `priceRange`, `sameAs`, and `areaServed` (Muscat, Dubai and others as `City` with `containedInPlace`). `BlogPosting` nodes reference the organization by `@id` for `publisher`, and include `headline`, `author` (full `Person` with `sameAs`), `datePublished`, `dateModified`, `image`, `wordCount`, `inLanguage`, and `mainEntityOfPage`. This is textbook entity linking.

### Opportunities

**MEDIUM — 213 FAQPage instances earn no rich results.** Since August 2023 Google shows FAQ rich results only for authoritative government and health sites. The markup is not harmful and still helps LLM extraction, but it should not be counted as a Google visibility asset. Do not add more FAQPage blocks expecting SERP real estate.

**MEDIUM — No `AggregateRating` or `Review` anywhere.** For an agency with 51 case studies, review markup (backed by genuine, verifiable reviews) is the most valuable missing type.

**LOW — `ProfessionalService` is emitted on all 285 pages including blog posts and tool pages.** Valid, but `Organization` on non-service pages with `ProfessionalService` reserved for service and service-area pages is a cleaner entity model.

**LOW — `SoftwareApplication`/`WebApplication` on tool pages lacks `offers`.** Adding `"offers": {"@type":"Offer","price":"0","priceCurrency":"USD"}` explicitly marks the tools as free, which is exactly the differentiator the CTR problem needs.

---

## Performance

### Lab data (PageSpeed Insights v5, 2026-08-22, `/en/`)

| Metric | Mobile | Desktop | Threshold |
|--------|--------|---------|-----------|
| Performance score | 99 | 99 | ≥90 |
| Accessibility | 100 | 100 | ≥90 |
| Best Practices | 100 | 100 | ≥90 |
| SEO | 100 | 100 | ≥90 |
| LCP | 1.7 s | 0.4 s | ≤2.5 s |
| FCP | 1.1 s | 0.3 s | ≤1.8 s |
| TBT | 0 ms | 0 ms | ≤200 ms |
| CLS | 0 | 0.08 | ≤0.1 |
| Speed Index | 2.5 s | 0.4 s | ≤3.4 s |

**Field data (CrUX): unavailable.** The origin has insufficient Chrome traffic volume to qualify, which is itself a signal of how little real traffic the site receives. Everything above is lab-only.

Server response was fast and consistent across the crawl: median 315 ms, p90 592 ms, max 1,939 ms, all from Cloudflare edge with `zstd` compression and `CF-Cache-Status: HIT`.

### Issues

**MEDIUM — 122 KB of CSS is inlined into every single page.**
There is no external stylesheet at all. Median HTML transfer per page is 249 KB (min 225 KB, max 303 KB), and 131 of 285 pages exceed 250 KB. This is great for a cold first paint and terrible for multi-page sessions: the same 122 KB of CSS is re-downloaded on every navigation instead of being served once from cache. Split into a critical inline block plus a cached external stylesheet, or rely on Astro's `ClientRouter` view transitions (already loaded) to avoid full document reloads.

**MEDIUM — The LCP hero image is preloaded twice, in two formats.**
```html
<link rel="preload" as="image" href="/images/homepage-hero.avif" type="image/avif" fetchpriority="high">
<link rel="preload" as="image" href="/images/homepage-hero.webp" type="image/webp" fetchpriority="high">
```
Both formats are supported by every modern browser, so both get fetched: 38.6 KB AVIF + 59.4 KB WebP = 98 KB where 38.6 KB was needed. Preload only the AVIF and let the `<picture>` element handle the fallback. This matches the PSI finding "Improve image delivery — est. savings of 22–25 KiB".

**LOW — Desktop CLS of 0.08.** Under the 0.1 threshold but not zero, while mobile is a clean 0. Worth tracing; likely the web font swap (`font-display: swap` on Lato/IRANSansX) or a hero element without reserved space.

**LOW — 11 script tags and ~18.5 KB of inline JS per page.** TBT is 0 ms so this is not currently hurting, but it is worth watching.

---

## Images

| Metric | Value |
|--------|-------|
| Total images across 285 pages | 416 |
| Missing alt text | **0** |
| Missing width/height | 5 |
| Using `loading="lazy"` | 147 |
| Formats | AVIF and WebP throughout |

This is the strongest category on the site. Full alt coverage across 416 images is rare. The only actions are adding explicit dimensions to the 5 images missing them (CLS insurance) and taking the ~22 KB PSI image-delivery saving described above.

---

## AI Search Readiness (GEO)

### Strengths

- **`llms.txt` is present and substantial** (10.4 KB) — a properly structured index with a summary blockquote and sectioned links across company, services, service areas, tools, and blog. Note that Google Search ignores llms.txt; the value here is for LLM crawlers that do read it.
- **Every major AI crawler is explicitly allowed** in robots.txt with individually named user-agent groups: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended.
- **`max-snippet:-1` and `max-image-preview:large`** on every page — no snippet-length ceiling for AI Overviews.
- **Passage-level citability is good**: median 5 H2 sections, 213 FAQPage blocks giving direct question-answer pairs, and clean semantic HTML.
- **Entity grounding is solid**: consistent `@id`-linked organization, named author with cross-platform `sameAs`, physical address, `areaServed` cities.

### Issues

**MEDIUM — `llms.txt` links all use non-trailing-slash URLs** (`https://webabc.ir/en/about`, `/en/services/seo`, etc.). Every one resolves through a 307. Rewrite with canonical trailing-slash URLs so LLM crawlers fetch the final URL directly.

**MEDIUM — Brand mention signals are thin.** External outbound links are limited to owned properties (GitHub, LinkedIn, X, wa.me, aliib.ir), client sites, and a handful of documentation references (developers.google.com, web.dev, w3.org). There is no evidence of third-party citation of "WebABC" as an entity. LLM citation follows corroboration across independent sources; this needs off-site work, not on-site markup.

**LOW — No RSS feed.** `/rss.xml` and `/en/blog/rss.xml` both 404. An Atom/RSS feed is a cheap distribution and discovery channel for a blog with 84 posts.

---

## Search Console Data (live, `sc-domain:webabc.ir`)

**Last 28 days (2026-07-25 → 2026-08-21):** 204 pages and 222 queries produced impressions.

Top pages by impressions:

| Page | Impressions | Clicks | CTR | Avg position |
|------|-------------|--------|-----|--------------|
| `/en/tools/headline-analyzer/` | 5,162 | 2 | 0.04% | 14.8 |
| `/ar/` | 134 | 0 | 0% | 5.6 |
| `/ar/services/web-development/` | 121 | 1 | 0.83% | 43.5 |
| `/en/service-areas/tehran/` | 116 | 0 | 0% | 17.6 |
| `/fa/portfolio/ramzarz-negaran/` | 113 | 0 | 0% | 6.7 |
| `/fa/service-areas/muscat/` | 107 | 1 | 0.93% | 10.7 |
| `/fa/service-areas/dubai/` | 105 | 1 | 0.95% | 41.9 |
| `/en/tools/seo-title-checker` | 99 | 1 | 1.01% | 61.1 |
| `/en/` | 43 | 5 | 11.63% | 5.4 |

Two observations:

1. **The homepage is the only page converting.** 11.63% CTR at position 5.4 — that is a healthy snippet. Every other page is at or near 0%.
2. **Pages ranking in the top 10 with 0% CTR** — `/ar/` at position 5.6 with 134 impressions and zero clicks, `/fa/portfolio/ramzarz-negaran/` at 6.7 with 113 and zero — point straight back to the truncated fa/ar titles and descriptions.

**Impression trend (90 days):** a step change from ~70/day through July to 354 (Aug 13), 493 (Aug 14), 631 (Aug 16), 764 (Aug 19), 947 (Aug 21). Average position improved from ~45 to 11.6 over the same window. Clicks did not follow — several of those high-impression days recorded zero clicks. The growth is real but is landing almost entirely on the headline-analyzer page's competitor-brand query.

**Geography (90 days):** USA 4,799 impressions / 2 clicks; Iran 1,825 impressions / 33 clicks; UK 477 / 0; Germany 382 / 0; Canada 375 / 0. Iran is where the site actually converts (1.8% CTR) despite receiving a third of the US impressions — reinforcing that the fa/ar snippet truncation is costing real money.

**Note on the earlier `site_snapshot` call:** the GSC MCP server's default property is `4seasonscarpetclean.co.uk`, not webabc.ir. All figures in this report come from explicit `sc-domain:webabc.ir` queries.

---

## Data Not Available

| Source | Status | Impact |
|--------|--------|--------|
| CrUX field data | No data — insufficient Chrome traffic | Core Web Vitals assessment is lab-only |
| GSC Pages/index coverage | API does not support domain properties with service accounts | Cannot confirm how many of 285 URLs are indexed |
| GSC URL Inspection | Same limitation | Cannot verify per-URL canonical selection |
| GA4 | No credentials configured | No engagement or conversion data |
| Moz / Bing Webmaster | No API keys configured | No DA/PA, referring domains, or anchor-text profile |
| DataForSEO | MCP not connected | No live SERP positions or competitor data |

To close the biggest gap, add a Moz API key (free tier, 2,500 rows/month) or Bing Webmaster Tools key. Given that the site's ranking positions cluster around 15–45 with strong on-page work already done, off-page authority is the most likely remaining constraint — and it is currently unmeasured.
