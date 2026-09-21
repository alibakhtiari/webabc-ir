# Images & performance — 80/100

## Verified

- Self-hosted fonts (`/fonts/ltr.woff2`, `/fonts/rtl.woff2`, preloaded per locale — `Layout.astro:189-197`); content-hashed assets cached immutable 1 yr (`public/_headers`); full-page stylesheet external (not inlined) per `astro.config.mjs:47-54` comment.
- OG image pipeline: per-slug manifest (`og-images.json` via `Layout.astro:128-143`) + per-type crops (`/images/og/services|service-areas|portfolio/…`, sitemap `getImageForPage`), 1200×630 + alt; blog covers `/images/blog/<slug>.webp`; sampled OG/blog images return HTTP 200 webp.
- Blog hero uses `fetchpriority="high"` + eager (`[slug].astro:410-419`); related thumbs lazy.

## Gaps

1. **Headline-analyzer falls back to generic OG image (Medium).** Live meta shows `/images/og-image.webp` — the site's highest-impression URL deserves a dedicated `/images/og/tools/headline-analyzer.webp` crop (also fixes the sitemap `getImageForPage` tools branch, which currently maps ALL tools to one image — `astro.config.mjs:35-37`). Per-tool crops next.
2. **Format coverage (Low).** Hero/logo ship AVIF+WebP; blog covers webp-only. Add AVIF variants for top-10 posts when regenerating crops.
3. **H1 gradient text (Low).** Tool H1 uses `bg-clip-text text-transparent` gradient (`ToolLayout.astro:106-110`). Verify contrast/paint + no layout shift on slow devices; keep, but don't extend to body copy.
4. **CWV field data absent.** No CrUX/PageSpeed run in this audit (no credentials configured). Astro + edge caching + self-hosted fonts predict green, but confirm with one PageSpeed pass on `/en/tools/headline-analyzer/` (mobile + desktop) after the title rewrite.
