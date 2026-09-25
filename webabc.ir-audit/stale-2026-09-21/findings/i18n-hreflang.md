# i18n / hreflang — strong, one deployment risk

## Verified

- Every indexable page emits `en / fa / ar / x-default(→en)` alternates (`src/layouts/Layout.astro:244-251`), suppressed on noindex/404. Live tool + blog HTML confirm all four.
- Sitemap mirrors alternates per URL (`astro.config.mjs:74-83`); `og:locale` + alternates correct (`en_US / fa_IR / ar_SA`); RTL fonts self-hosted (`/fonts/rtl.woff2`, `ltr.woff2`); Arabic Google-Fonts path only for `ar`.
- 96-post slug parity keeps alternate mapping 1:1 — no broken hreflang pairs expected.

## Risk

- **Root `/` geo-redirect permanence (High if violated).** `worker.ts` + `_redirects:3-5` implement country-based locale routing off the sitemap-excluded root. This MUST stay a temporary redirect (302/307). A 301 would hard-pin browsers and crawlers to one locale and split brand equity. Verify status code on next deploy; GSC `Translated results` (170 impr / pos 92.9) gives no signal yet, so this is preventive.
