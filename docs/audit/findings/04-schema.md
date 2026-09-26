# Structured Data / Schema Audit — webabc.ir

**Method:** source inspection (`Layout.astro`, `ToolLayout.astro`, `Breadcrumbs.astro`, `FAQ.astro`, `ToolFAQ.astro`, `blog/[slug].astro`, `content.config.ts`) + **live JSON-LD extraction** from rendered HTML on 2026-09-22.

> ⚠️ **This section corrects the previous audit.** The earlier report claimed *"no `BreadcrumbList` anywhere (grep proves it)"* and *"duplicate `FAQPage` ×2 on tool pages"*. Both are **false** against the current codebase — see `10-corrections.md`.

---

## 1. Live schema inventory (verified by fetching real pages)

### `/en/tools/headline-analyzer/` — 5 JSON-LD blocks

| `@type` | Count | Source |
|---|---:|---|
| `["Organization","ProfessionalService"]` | 1 | `Layout.astro` |
| `WebSite` | 1 | `Layout.astro` |
| `WebApplication` | 1 | `ToolLayout.astro` |
| `BreadcrumbList` | 1 | `Breadcrumbs.astro` |
| `FAQPage` | **1** ← not 2 | `ToolFAQ.astro` |
| `ListItem` | 3 | (inside BreadcrumbList) |
| `Question` / `Answer` | 9 / 9 | (inside FAQPage) |
| `Offer` | 1 | (inside WebApplication) |

### `/en/blog/seo-checklist-2026/` — 5 JSON-LD blocks

| `@type` | Count |
|---|---:|
| `Organization` (array form) | 1 |
| `WebSite` | 1 |
| `BlogPosting` | 1 |
| `BreadcrumbList` | 1 |
| `FAQPage` | 1 |
| `Person` | 1 |
| `WebPage` | 1 |
| `SpeakableSpecification` | 1 |
| `Question` / `Answer` | 3 / 3 |

### `/en/` (homepage) — 3 JSON-LD blocks

`Organization` · `WebSite` · `FAQPage` — **no `BreadcrumbList`**, which is correct (a homepage breadcrumb is a self-reference).

---

## 2. Entity graph integrity

```
Organization  @id = https://webabc.ir/#organization
     ▲                  ▲                      ▲
     │ publisher        │ publisher            │ isPartOf (intended)
     │                  │                      │
  WebSite           BlogPosting            FAQPage
  @id = …/#website                          @id = …/#faq
                                                  │
                                                  └── isPartOf → …/#webpage  ❌ DANGLING
```

| Link | Status |
|---|---|
| `WebSite.publisher` → `Organization @id` | ✅ resolves |
| `BlogPosting.publisher` → `Organization @id` | ✅ resolves |
| `BlogPosting.mainEntityOfPage @id` = page URL | ✅ (but see §3) |
| `FAQPage.isPartOf @id` = `…/#webpage` | ❌ **no node declares that `@id`** |

### 🟠 Finding 4.1 — dangling `#webpage` reference

`FAQ.astro`:

```js
isPartOf: { '@id': `${pageUrl}#webpage` },
```

The only `WebPage` node on the page comes from `BlogPosting.mainEntityOfPage`:

```json
{"@type":"WebPage","@id":"https://webabc.ir/en/blog/seo-checklist-2026/"}
```

The fragment differs (`…/` vs `…/#webpage`), so the reference **does not resolve**. Verified live: `#webpage` appears exactly once (the reference), never as a node `@id`.

**Fix (either):**
- Change `FAQ.astro` to `isPartOf: { '@id': pageUrl }`, **or**
- Emit an explicit `WebPage` node with `@id: ${pageUrl}#webpage`, `isPartOf: { @id: '…/#website' }`, `url`, `inLanguage`, `breadcrumb: { @id: … }` — and point `BlogPosting.mainEntityOfPage` at it.

The second is the fuller graph and binds breadcrumb → page → website properly.

**Severity: Low–Medium.** Google tolerates unresolved `@id` links, but a declared relationship that does not resolve is worse than no relationship.

---

## 3. What is implemented — and implemented well

### `Organization` + `ProfessionalService` (`Layout.astro:12-101`)
- `@id`, `url`, `logo`, `image`, `name`, `legalName`, `description`
- `telephone` ×2, `email`, `contactPoint[]` ×2 with `availableLanguage`
- `address` (Qazvin Science & Technology Park, postal code, `addressCountry: IR`)
- `geo` (36.3156, 50.0381)
- `areaServed` — Muscat, Dubai, Abu Dhabi, Riyadh, Tehran, Qazvin (with `containedInPlace` country)
- `knowsAbout` — **explicitly includes "Answer Engine Optimization (AEO)" and "Generative Engine Optimization (GEO)"** ✅ a real entity claim for AI retrieval
- `openingHoursSpecification` (Sat–Thu 09:00–18:00, correct for the region)
- `sameAs`: GitHub, LinkedIn, X, aliib.ir

✅ **Emitted as `@type: ["Organization","ProfessionalService"]` (array)** — valid JSON-LD, correctly multi-typed.

### `WebSite` (`Layout.astro:103-115`)
```js
{ '@type':'WebSite', '@id':`${url}/#website`, url:`${url}/${lang}/`,
  name:'WebABC', alternateName:<localized>, inLanguage:'en-US'|'fa-IR'|'ar-SA',
  publisher:{ '@id':`${url}/#organization` } }
```
✅ Present on **every** page (previous audit claimed it missing — it was added in commit `b93df60`).

**No `SearchAction`.** This is **correct**: the site has no on-site search UI. Emitting a `SearchAction` pointing at a nonexistent search results page would be invalid markup. **Do not add one.**

`WebSite.url` is per-language while `@id` is site-wide — a minor inconsistency (the `@id` implies one entity, the `url` varies). Harmless; optionally give each language its own `WebSite @id` or drop `url`.

### `BlogPosting` (`blog/[slug].astro:93-145`)
✅ `headline`, `description`, `image`, `datePublished`, `dateModified`, `keywords`, `articleSection`, `wordCount`, `inLanguage`
✅ **Author disambiguation** — real author → `Person` with `sameAs` ×7 (LinkedIn, GitHub, Instagram, Facebook, X, alibakhtiari.ir, aliib.ir) + `url` to the author page + `image`; otherwise `Organization` with localized team name.
✅ `wordCount` computed from **markdown-stripped** plain text (code fences, JSX, link syntax removed) — an unusually careful implementation.
✅ `speakable` present — see §5.

### `BreadcrumbList` (`Breadcrumbs.astro:12-30`)
✅ **Emitted.** `itemListElement` with `position` 1-based, `name`, and absolute `item` URLs normalised to trailing slash.

Rendered by: `ToolLayout`, `Hero` (→ services, service-areas), `ServiceHero` (→ services), plus direct use in `blog/[slug]`, `blog/index`, `portfolio/[slug]`, `portfolio/index`, `tools/index`, `service-areas/index`, `about`, `about/ali-bakhtiari`, `contact`, `privacy`.

The visible `<nav>` and the JSON-LD are generated from the **same `items` array** — markup and UI cannot drift apart. Good pattern.

### `FAQPage` — single emitter per template ✅
- Blog: `FAQ.astro` emits once, with `@id` and `inLanguage`.
- Tools: `ToolFAQ.astro` emits once, **only when visible items render**.

`ToolLayout.astro` carries an explicit guard comment:
```astro
<!-- FAQPage is emitted once by <ToolFAQ /> below (only when FAQ items render).
     Do NOT re-add a faqSchema head script here — it would duplicate FAQPage. -->
```
The duplicate was found and fixed (commit `c57568a`). **Verified live: exactly 1 `FAQPage`.**

### `WebApplication` (`ToolLayout.astro`)
✅ `@id`, `name`, `description`, `applicationCategory`, `operatingSystem`, `browserRequirements`, `inLanguage`, `offers` (`price: '0'`, `priceCurrency: 'USD'`) — correct for free tools.

### Review / rating gating (`content.config.ts:57-71`)
```js
reviews: z.array(z.object({ author, text, rating? })).optional(),
rating:  z.object({ ratingValue, reviewCount }).optional(),
```
✅ JSON-LD for `Review`/`AggregateRating` is emitted **only when real frontmatter exists**. The schema comment explicitly says *"never fabricate ratings."*

**This is the correct discipline — preserve it.** With Google's March/June 2026 spam enforcement, self-serving fake `AggregateRating` is an explicit policy target.

---

## 4. Deprecation compliance

| Schema | Status | Verdict |
|---|---|---|
| `HowTo` | Deprecated Sept 2023 | ✅ **not used anywhere** |
| `FAQPage` rich results | Retired for all sites (May 2026) | ✅ retained as **entity markup only** |
| `QAPage` | For genuine user Q&A | ⚠️ not used — correct, since FAQs are editorial, not user-submitted |
| `AggregateRating` | Spam-sensitive | ✅ gated behind real data |
| FID in any CWV reference | Superseded by INP | ✅ no FID references found |

**Do NOT remove existing `FAQPage`.** Per the current quality gate: flag it at *Info*, not *Critical*; it still carries value as an entity/answer-structure signal for AI engines even though Google no longer shows FAQ rich results. **Do not chase FAQ snippets.**

---

## 5. `speakable` — selectors verified resolvable ✅

```js
speakable: {
  '@type': 'SpeakableSpecification',
  cssSelector: ['.tldr-takeaways', '.prose > p:first-of-type'],
}
```

| Selector | Resolves? | Evidence |
|---|---|---|
| `.tldr-takeaways` | ✅ | `TLDR.astro` root element: `class="tldr-takeaways relative mb-8 …"` |
| `.prose > p:first-of-type` | ✅ | `<article class="prose prose-lg …">` wraps `<Content>` |

Both selectors match real DOM. `speakable` is Google- deprecated as a rich-result feature but still read by answer engines as an utterance hint — harmless and mildly useful for AEO.

---

## 6. Gaps (ordered by value)

| # | Gap | Severity | Recommendation |
|---|---|---|---|
| 1 | Dangling `#webpage` `isPartOf` reference | Medium | Emit a real `WebPage` node or drop the fragment |
| 2 | No `WebPage` node with `breadcrumb` / `isPartOf` linkage | Medium | Add it — completes Organization → WebSite → WebPage → BreadcrumbList chain |
| 3 | `WebSite.url` varies by language under a single `@id` | Low | Per-language `@id`, or drop `url` |
| 4 | `Organization.sameAs` only 4 profiles; the Person author carries 7 | Low | Consider adding an Organization-level profile set (agency LinkedIn/X) distinct from the founder's |
| 5 | No `WebSite.SearchAction` | **None** | Correctly omitted — no site search exists. Leave it. |
| 6 | `BreadcrumbList` absent on homepage | **None** | Correct — self-referential breadcrumbs are noise |

---

## 7. Score: Schema / Structured Data — 88/100

| Evidence | Weight |
|---|---|
| ✅ Full entity graph: Organization+ProfessionalService, WebSite, BlogPosting, BreadcrumbList, FAQPage, WebApplication | base |
| ✅ Consistent `@id` references across Organization ↔ WebSite ↔ BlogPosting | + |
| ✅ Author `Person` disambiguation with 7 `sameAs` + author page | + |
| ✅ `speakable` selectors verified to resolve | + |
| ✅ Review/rating gated behind real data — correct spam posture | + |
| ✅ Zero deprecated types (no `HowTo`); FAQPage correctly entity-only | + |
| ✅ Exactly one `FAQPage` per page (previous duplicate defect fixed) | + |
| ❌ Dangling `#webpage` reference + no explicit `WebPage` node | −6 |
| ❌ Minor `WebSite.url`/`@id` language inconsistency | −3 |
| ❌ Thin Organization-level `sameAs` vs Person | −3 |

---

**Next:** `05-content-blog.md` · `06-i18n-hreflang.md` · `10-corrections.md`
