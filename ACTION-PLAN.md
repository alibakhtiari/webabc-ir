# Action Plan — webabc.ir

Prioritized from the full audit of 2026-08-23. Effort estimates assume familiarity with the Astro codebase.

---

## Critical — fix immediately

### C1. Rewrite the snippet for `/en/tools/headline-analyzer/`
**Effort:** 30 minutes | **Impact:** Highest single lever on the site

The page holds 5,162 impressions in 28 days at average position 14.8 with a 0.04% CTR. Positions and impressions are both climbing; only the click-through is broken.

- Current title: `SEO Headline Checker & Blog Title Analyzer – Free Headline Tester` (67 chars, truncates)
- Rewrite to lead with the query people actually type and cut to ≤60 chars, e.g. `Free SEO Title Checker — Score Any Headline Instantly`
- Rewrite the description to open with the benefit and a no-signup promise rather than a feature list
- Ensure the H1 matches the new title intent

Measure CTR weekly in GSC for four weeks. Even 2% CTR at current impression volume is roughly 100 clicks/month.

### C2. Resolve the headline-analyzer / seo-title-checker cannibalization
**Effort:** 2–4 hours | **Impact:** Unblocks page-one potential for a 1,200+ impression/month query cluster

Both pages target "seo title checker" queries. Google ranks the wrong one, and both sit at position ~21.

Pick one:
- **Merge (recommended):** 301 `/en/tools/seo-title-checker/` → `/en/tools/headline-analyzer/`, fold the SERP-preview functionality in, and rename the URL to match the dominant query. Apply across all three languages.
- **Split cleanly:** headline analyzer = emotional impact, power words, readability; title checker = pixel width, character limits, live SERP preview. Give each a distinct title, H1, description, and FAQ set with zero query overlap, and cross-link them with descriptive anchors.

### C3. Change trailing-slash redirects from 307 to 301 and fix internal links
**Effort:** 1–2 hours | **Impact:** Removes duplicate indexed URLs sitewide

- `https://webabc.ir/en` currently answers `307 Temporary Redirect`. Configure a permanent 301 at the Cloudflare/Astro layer.
- Fix the 103 internal links pointing at non-slash URLs (41 distinct targets; heaviest: `/en/tools/seo-title-checker` ×7, `/en/tools/serp-preview` ×7, `/ar/tools/cost-calculator` ×6, `/ar/tools/schema-generator` ×5).
- Rewrite every URL in `llms.txt` to the trailing-slash form.

Verification: after deploy, confirm `curl -I https://webabc.ir/en` returns 301, then re-crawl for any remaining non-slash internal links.

---

## High — fix within one week

### H1. Truncate Persian and Arabic titles to ≤60 characters
**Effort:** 4–6 hours | **Impact:** Direct CTR recovery in the site's converting market

144 of 190 fa/ar pages exceed 60 characters; median is 92 (fa) and 91 (ar). Start with the pages already ranking in the top 10 with 0% CTR: `/ar/`, `/fa/portfolio/ramzarz-negaran/`, `/fa/service-areas/muscat/`, `/ar/portfolio/remido/`. Worst offenders overall: `/fa/blog/wordpress-vs-custom-development-guide-2026/` (149), `/fa/portfolio/behrad-dc/` (146), `/fa/blog/dubai-uae-web-design-seo-guide-2026/` (140).

### H2. Truncate Persian and Arabic meta descriptions to ≤160 characters
**Effort:** 4–6 hours | **Impact:** Same as H1

171 of 190 fa/ar pages exceed 160; median 256 (fa) and 235 (ar). Longest: `/fa/tools/cost-calculator/` (303), `/ar/portfolio/` (301), `/fa/tools/css-gradient-generator/` (301).

Consider adding a build-time length assertion so this cannot regress.

### H3. Expand `/en/about/ali-bakhtiari/` (and fa/ar equivalents)
**Effort:** 3–4 hours | **Impact:** E-E-A-T across all 84 blog posts

At 111 words this is the second-thinnest page on the site, yet it is the destination of every article byline and every `Person.url` in schema. Add credentials, years of experience, named projects, technologies, any speaking or publication history, and outbound links that corroborate the claims. Target 600+ words.

### H4. Fix the 12 blog URLs with `2025` slugs and `2026` titles
**Effort:** 1–2 hours | **Impact:** Removes a visible staleness signal in the SERP breadcrumb

Affected articles (× en/fa/ar): `seo-best-practices-2025`, `best-seo-tools-2025`, `mobile-first-design-2025`, `web-design-trends-2025`. Either 301 to year-free slugs (`/blog/seo-best-practices/`) or align slug and title. Year-free slugs are preferable for evergreen content that gets refreshed annually.

### H5. Stop double-preloading the LCP hero image
**Effort:** 15 minutes | **Impact:** ~59 KB saved on every homepage load

Remove the WebP preload; keep AVIF only and let `<picture>` handle fallback:
```html
<link rel="preload" as="image" href="/images/homepage-hero.avif" type="image/avif" fetchpriority="high">
```

---

## Medium — fix within one month

### M1. Split the 122 KB inline CSS
**Effort:** 4–8 hours | **Impact:** Faster multi-page sessions, 131 pages drop below 250 KB

There is no external stylesheet; the full 122 KB is inlined into every page (median page weight 249 KB). Extract the non-critical portion into a hashed, long-cached external stylesheet and inline only above-the-fold critical CSS.

### M2. Set long cache headers on hashed static assets
**Effort:** 30 minutes | **Impact:** Eliminates needless revalidation

`/_astro/*` bundles currently serve `Cache-Control: public, max-age=0, must-revalidate`. Content-hashed files should use `max-age=31536000, immutable`.

### M3. Replace the root JavaScript redirect
**Effort:** 1–2 hours | **Impact:** Faster and more reliable language routing

`https://webabc.ir/` serves a JS shim that reads `localStorage` and calls `location.replace()`. It also carries `<meta name="robots" content="noindex">` while the HTTP header says `index, follow`. Move to a server-side redirect (Cloudflare Worker with `Accept-Language` detection, falling back to `/en/`) and remove the contradictory meta tag.

### M4. Add supporting content to the 24 tool pages
**Effort:** 8–12 hours | **Impact:** Ranking surface for a section already earning impressions

Pages average 150–210 words. Add a "how it works" section, a "when to use this" section, and 3–4 genuine FAQ entries per tool. Prioritize tools already showing impressions: headline-analyzer, seo-title-checker, cost-calculator, serp-preview, keyword-density-analyzer, glassmorphism-generator.

### M5. Fix heading hierarchy on blog index pages
**Effort:** 30 minutes

`/en/blog/`, `/fa/blog/`, `/ar/blog/` have zero H2 elements but do have H3s. Promote post-card titles to H2.

### M6. Strengthen contextual internal linking
**Effort:** 4–6 hours | **Impact:** Better crawl priority for money pages

Median inbound internal links is 4 and the distribution is flat. The pages with the fewest inbound links are the trust pages (`/en/about/ali-bakhtiari/` at 2, `/en/faq/` at 2). Add in-content contextual links from blog posts to the relevant service, service-area, and author pages.

### M7. Add `offers` to tool page schema
**Effort:** 1 hour

Add `"offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}` to the `WebApplication` nodes on the 69 tool pages. Explicitly marking the tools as free reinforces the differentiator the CTR problem needs.

### M8. Add `/en/contact/` content
**Effort:** 1 hour

At 51 words this is the thinnest page on the site. Add service areas, response-time expectations, office details, and consultation process.

---

## Low — backlog

- **L1.** Add an RSS/Atom feed — `/rss.xml` and `/en/blog/rss.xml` both 404 today, with 84 posts to syndicate. (1 hour)
- **L2.** Add explicit `width`/`height` to the 5 images missing them. (30 min)
- **L3.** Trace the 0.08 desktop CLS — likely the `font-display: swap` on Lato/IRANSansX. (1–2 hours)
- **L4.** Redirect case-variant paths (`/EN/` currently 404s). (30 min)
- **L5.** Refactor `ProfessionalService` to `Organization` on blog and tool pages, reserving `ProfessionalService` for service and service-area pages. (2 hours)
- **L6.** Take the ~22 KB PSI image-delivery saving on the homepage. (1 hour)
- **L7.** Do not add more `FAQPage` markup expecting rich results — Google restricted them to government and health sites in August 2023. Existing markup can stay for LLM extraction.

---

## Measurement and unmeasured risk

**Set up before starting so the work is attributable:**

1. Add a **Moz API key** (free tier, 2,500 rows/month) or **Bing Webmaster Tools API key**. Backlink authority is currently completely unmeasured, and with on-page work already this strong, off-page authority is the most likely reason positions cluster at 15–45 rather than 1–10.
2. Connect **GA4** — there is no engagement or conversion data at all right now.
3. Note that **CrUX has no field data** for this origin (insufficient Chrome traffic). All Core Web Vitals figures are lab-only until real traffic arrives.
4. **Index coverage is unverified.** The GSC Sitemaps and URL Inspection APIs do not support domain properties via service account. Check the Pages report in the GSC UI to confirm how many of the 285 sitemap URLs are actually indexed.

**Baseline to beat (28 days ending 2026-08-21):** 204 pages with impressions, 222 queries, ~6,700 impressions, fewer than 20 clicks. Homepage is the only page with a healthy CTR (11.63% at position 5.4).

**Expected outcome if Critical + High are completed:** the CTR fixes address roughly 90% of current impressions. A move from ~0.3% sitewide CTR to a still-conservative 2% would be a 6–7× click increase on existing rankings, with no new content and no new links required.
