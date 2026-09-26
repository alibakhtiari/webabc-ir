# i18n / hreflang Audit — webabc.ir

**Locales:** `en` (LTR, default/x-default) · `fa` (RTL) · `ar` (RTL)

---

## 1. hreflang emission — correct ✅

`src/layouts/Layout.astro:264-279`:

```astro
{!noindex && (
  <>
    <link rel="canonical" href={canonicalUrl} />
    <link rel="alternate" hreflang="en" href={`${siteUrl}/en${slug ? `/${slug}/` : '/'}`} />
    <link rel="alternate" hreflang="fa" href={`${siteUrl}/fa${slug ? `/${slug}/` : '/'}`} />
    <link rel="alternate" hreflang="ar" href={`${siteUrl}/ar${slug ? `/${slug}/` : '/'}`} />
    <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en${slug ? `/${slug}/` : '/'}`} />
  </>
)}
```

**Live-verified on `/en/tools/headline-analyzer/`:**
```
hreflang="en" hreflang="fa" hreflang="ar" hreflang="x-default"
canonical: https://webabc.ir/en/tools/headline-analyzer/
```

| Check | Status |
|---|---|
| All three languages listed on every indexable page | ✅ |
| `x-default` present → `/en/` | ✅ |
| Self-referencing hreflang (each page lists itself) | ✅ |
| Canonical is self-referencing | ✅ |
| hreflang **suppressed** when `noindex` | ✅ correct — hreflang must not appear on noindexed pages |
| Slugs identical across languages (so alternates resolve) | ✅ enforced by content collection structure |

**Slug construction** is driven by the `slug` prop:
- Blog: `slug={\`blog/${slug}\`}` → `/en/blog/X/` ↔ `/fa/blog/X/` ↔ `/ar/blog/X/` ✅
- Tools: `slug={\`tools/${cleanSlug}\`}` → ✅
- Services, service-areas, portfolio: same pattern ✅

---

## 2. Sitemap mirrors hreflang ✅

`astro.config.mjs` serialize step:

```js
item.links = [
  ...LANGS.map((l) => ({ lang: LANG_HREF[l], url: altHref(l) })),
  { lang: 'x-default', url: altHref('en') },
];
```

- **1,224 `xhtml:link` alternate entries** across 306 URLs = exactly 4 per URL ✅
- Reciprocity holds: if A links to B, B links to A (generated from the same template) ✅

**On-page hreflang and sitemap hreflang agree** — the two implementations are independent (hand-written in `Layout.astro`, generated in `astro.config.mjs`) but currently produce identical output. They are a **drift risk**: a change to one that is not mirrored in the other creates a conflict Google will log in GSC. Worth a build-time assertion.

---

## 3. Language/direction metadata ✅

| Signal | en | fa | ar |
|---|---|---|---|
| `<html lang>` | `en` | `fa` | `ar` |
| `<html dir>` | `ltr` | `rtl` | `rtl` |
| `hreflang` | `en` | `fa` | `ar` |
| `WebSite.inLanguage` | `en-US` | `fa-IR` | `ar-SA` |
| `BlogPosting.inLanguage` | `en-US` | `fa-IR` | `ar-SA` |
| `FAQPage.inLanguage` | `en-US` | `fa-IR` | `ar-SA` |
| `WebApplication.inLanguage` | `en-US` | `fa-IR` | `ar-SA` |
| `og:locale` | `en_US` | `fa_IR` | `ar_SA` |
| `og:locale:alternate` | `fa_IR, ar_SA` | `en_US, ar_SA` | `en_US, fa_IR` |

✅ Complete and consistent across every schema node and social tag.

**One nuance:** `WebSite.inLanguage` uses region subtags (`en-US`, `fa-IR`, `ar-SA`) while the `<html lang>` uses bare codes (`en`, `fa`, `ar`) and hreflang uses bare codes. All three forms are valid in their respective contexts (hreflang prefers the bare ISO 639-1 for language-only targeting). **No action needed** — this is correct.

**Minor:** `ar-SA` implies Saudi Arabia as the Arabic default while the org address is Iran and `og:locale` is `ar_SA`. Acceptable (Modern Standard Arabic has no single country), and the content targets the GCC explicitly. No change needed.

---

## 4. Root geo-redirect interaction — correct, but must be watched

`worker.ts` step 3:

```ts
if (url.pathname === '/' || url.pathname === '') {
  const country = request.cf?.country || 'US';
  let targetLang = 'en';
  if (PERSIAN_COUNTRIES.includes(country)) targetLang = 'fa';
  else if (ARABIC_COUNTRIES.includes(country)) targetLang = 'ar';
  return Response.redirect(`${url.origin}/${targetLang}/`, 302);   // ← 302, not 301
}
```

**Live-verified 2026-09-22:** `GET /` → `HTTP/2 302`, `location: https://webabc.ir/fa/` (this request geolocated to a Persian country; default is `en`).

| Concern | Status |
|---|---|
| 302 not 301 (target varies by IP) | ✅ correct — a 301 would permanently cache one locale per visitor and is what Google advises against for locale routing |
| Matches `x-default` → `/en/` for Googlebot (US) | ✅ |
| `/` excluded from sitemap so Google never submits a redirecting URL | ✅ (see `03-technical.md` §3 for the counter-argument) |
| Locale `/en/`, `/fa/`, `/ar/` all in sitemap | ✅ 102 URLs each |

**⚠️ Regression guard:** if anyone changes this to `301`, it becomes a site-level defect. There is a good inline comment explaining why — keep it.

---

## 5. RTL implementation ✅

- `fa` and `ar` render `dir="rtl"` ✅
- Arabic served **external Google Fonts** (`IBM Plex Sans Arabic`, `Cairo`); en/fa served **self-hosted** preloaded `woff2` (`/fonts/ltr.woff2`, `/fonts/rtl.woff2`) ✅

**Asymmetry worth noting for performance:** `ar` makes two third-party render-relevant requests to `fonts.googleapis.com`/`fonts.gstatic.com` while en and fa get a same-origin preload. That costs the Arabic locale real LCP vs the other two, and introduces a third-party dependency on a site that otherwise has zero third-party script.

**Recommendation:** self-host the Arabic fonts with the same `preload as="font"` pattern used for `ltr.woff2`/`rtl.woff2`. Removes 2 external origins, matches the existing convention, improves `/ar/` LCP.

*(`preconnect` is present, so the cost is mitigated — this is Medium, not High.)*

---

## 6. Locale parity metrics

| Metric | en | fa | ar | Parity |
|---|---:|---:|---:|---|
| Blog posts | 36 | 36 | 36 | ✅ |
| Portfolio items | 17 | 17 | 17 | ✅ |
| Sitemap URLs | 102 | 102 | 102 | ✅ |
| Posts with FAQ | 36 | 36 | 36 | ✅ |
| Posts with TLDR | 36 | 36 | 36 | ✅ |
| Posts with `updatedDate` | 32 | 32 | 32 | ✅ |
| Titles >60 chars | 4 | **8** | **6** | ⚠️ RTL worse |
| Descriptions <120 chars | 1 | 2 | **5** | ⚠️ AR worst |
| `llms.txt` deep links | **69** | 22 | 20 | ❌ see `08-geo-ai-citations.md` |

**Structural parity is perfect. Quality parity is not** — Arabic has the most under-length descriptions, and RTL titles are systematically more likely to truncate (see `02-on-page-serp.md` §2).

---

## 7. Translated-results appearance

| Appearance | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| Translated results | 0 | 170 | 0.00% | 92.88 |

hreflang is emitted correctly (verified §1) and the sitemap mirrors it (§2), so **this is not a markup defect**. Google selects translated-result eligibility independently; position 92.88 means those variants are effectively unranked.

**No markup action.** The lever is content parity quality (see `05-content-blog.md` §6 — locale differentiation).

---

## 8. Score: i18n / hreflang — 91/100

| Evidence | Weight |
|---|---|
| ✅ 4-way hreflang self-referential on every indexable page, suppressed on noindex | base |
| ✅ Sitemap mirrors hreflang: 1,224 alternates = 4 × 306, fully reciprocal | + |
| ✅ Complete `inLanguage` / `og:locale` coverage across all schema nodes | + |
| ✅ Root geo-redirect correctly a 302 with accurate rationale | + |
| ✅ Exact 102/102/102 URL parity across en/fa/ar | + |
| ❌ hreflang implemented twice (Layout + astro.config) with no drift assertion | −4 |
| ❌ Arabic uses third-party Google Fonts while en/fa are self-hosted | −3 |
| ❌ Quality parity gaps: AR descriptions short, RTL titles truncate more | −2 |

---

**Next:** `07-aeo.md` · `08-geo-ai-citations.md` · `09-performance-images.md`
