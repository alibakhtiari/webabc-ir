# Technical SEO — 88/100

## Verified working (with evidence)

- **SSG + trailing slash:** `astro.config.mjs:43-56` (`output: static`, `trailingSlash: 'always'`). Live: `/en/tools/headline-analyzer` → 301 → `.../`, same for `/en/blog/seo-best-practices`, `/fa/service-areas/qazvin`, `/en`. 4/4 correct.
- **Canonical + hreflang:** `src/layouts/Layout.astro:240-254` emits canonical + en/fa/ar/x-default (x-default→en) on every indexable page; suppressed on noindex/404. Live HTML confirms 4 alternates on tool + blog URLs.
- **Sitemap:** `astro.config.mjs:61-108` — filter excludes root + 404, content-accurate lastmod, hreflang links, image entries per page type, sensible priority/changefreq. Live `sitemap-index.xml` → `sitemap-0.xml` with 297 URLs.
- **robots.txt** (`public/robots.txt`): `Allow: /`, disallows `/private/` + `/api/`, explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, CCBot, Bytespider. Sitemap directive present.
- **Security/caching headers** (`public/_headers`): HSTS preload, CSP, X-Frame-Options SAMEORIGIN, nosniff, referrer-policy, Permissions-Policy; immutable 1-yr cache on `/images/*`, `/fonts/*`, `/_astro/*`; `X-Robots-Tag: index, follow…` global.
- **Redirects:** `public/_redirects` + `worker.ts` `STATIC_REDIRECTS` cover seo-title-analyzer/checker→headline-analyzer, modern-web-development→web-development, legacy service/portfolio/blog slugs, `sitemap.xml`→`sitemap-index.xml`. Non-indexable preview hosts get noindex in worker (`CANONICAL_HOST` gate).
- **Meta/OG/Twitter baseline** (`Layout.astro:199-237`): title, description, robots (max-image-preview:large etc.), OG url/title/desc/image 1200×630 + alt + locale alternates, twitter large-image card, RSS + `rel="llms-txt"` discovery, theme-color.

## Gaps & fixes

1. **GSC slash-duplicates (60 groups) — monitor, don't recode.** 301s are live; the split is historical. Action: monthly GSC check that non-slash impressions decay. (Medium)
2. **Root `/` geo-redirect must stay non-permanent.** `worker.ts` routes IR/AF/TJ→fa, Arab states→ar, else en, and `_redirects:3-5` documents it. A 301 here would pin crawlers to one locale — keep 302 (or 307) and never add `/` to the sitemap (already excluded). Verify on next deploy. (High if violated, else Info)
3. **Dual redirect sources.** Same rules live in `_redirects` and `worker.ts`. Pick worker as truth for the Worker deployment; keep `_redirects` only as fallback documentation to avoid drift. (Low)
4. **`sitemap.xml` 301 chain.** Fine as-is (single hop). Keep the canonical sitemap URL as `sitemap-index.xml` in robots + GSC. (Info)
