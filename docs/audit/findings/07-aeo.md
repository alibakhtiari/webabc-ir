# AEO (Answer Engine Optimization) Audit — webabc.ir

**Question:** when someone asks ChatGPT, Perplexity, Google AI Overviews, Gemini or Claude a question this site answers, can the engine extract a clean, quotable, attributed answer — and can a human reach it afterwards?

**Scope:** answer-first formatting, quotable blocks, content negotiation, structured answer entities, page recovery.

---

## 1. Score card

| AEO surface | Status |
|---|---|
| Machine-readable content without JS | ✅ Strong |
| Content negotiation (`Accept: text/markdown`) | ✅ Strong — genuinely built |
| Quotable summary block (TLDR) on every post | ✅ Strong |
| Q&A entity markup | ✅ Strong (correctly entity-only) |
| `speakable` utterance hints | ✅ Selectors verified |
| Breadcrumb / page hierarchy | ✅ Present |
| Answer extraction from headings | ⚠️ Uneven |
| Human handoff after agent retrieval | 🔴 **Broken — blank 404** |
| Markdown duplicate control | 🔴 **205 indexable, no canonical** |

---

## 2. ✅ Zero-JS static HTML — the foundation

Astro SSG means the answer text is in the raw response. Verified: a tool page (155 KB), a blog post (140 KB) and the homepage (134 KB) all render full content with no client-side hydration required to read it.

There is **1 JS file (13,828 B brotli)** for the whole site — theme toggling, service worker, FAQ accordion. None of it gates content visibility in the served HTML.

**This is the single most important AEO property and it is already correct.** Most agency sites fail here first.

---

## 3. ✅ Content negotiation — a real differentiator

Not a stub. Verified live:

| Test | Result |
|---|---|
| `curl -H "Accept: text/markdown" https://webabc.ir/en/blog/seo-checklist-2026/` | ✅ `200`, `text/markdown`, 5,067 B |
| Direct `…/index.md` | ✅ `200`, 5,067 B |
| `<link rel="alternate" type="text/markdown" href="…/index.md">` in `<head>` | ✅ |
| `Link: </404.md>; rel="alternate"; type="text/markdown"` response header | ✅ |
| `Vary: Accept` on the negotiated response | ✅ |
| `406 Not Acceptable` when the client sets `q=0` on both types | ✅ |
| `X-Robots-Tag: noindex, nofollow` on non-canonical hosts | ✅ |
| Markdown siblings actually generated | ✅ 205 files in `dist/` |

`llms.txt` documents the contract explicitly:

> **Markdown Negotiation**: Request `Accept: text/markdown` on any URL across `https://webabc.ir` to consume token-efficient Markdown instead of full HTML.

**Two defects against an otherwise excellent implementation:**

1. 🔴 The **direct `.md` URL** is served `index, follow` with **no canonical and no `Vary`** → 205 indexable duplicates (see `03-technical.md` §7).
2. The **negotiated** path is correct; keep it. Only the separate `.md` URL needs `noindex` + a `Link: rel="canonical"` header.

---

## 4. ✅ `is-agentic-site-type` + llms link tags

```html
<meta name="is-agentic-site-type" content="business" />
<link rel="llms-txt" href="/llms.txt" />
<link rel="alternate" type="text/markdown" href="…/index.md" />
<link rel="alternate" type="application/rss+xml" … />
```

All three discovery mechanisms are declared in `<head>` on every page. Rare — most sites ship at most an RSS tag.

---

## 5. ✅ Quotable answer blocks — 100% coverage

Every one of the 108 posts ships a `keyTakeaways` TLDR block:

```html
<div class="tldr-takeaways …">
  <h2>… Key Takeaways …</h2>
  <ul> <li>…</li> … </ul>
</div>
```

Verified: **0 posts missing `keyTakeaways` in en, fa, or ar.**

**Why this works for AEO:** the block is a `<ul>` of standalone statements directly under an `<h2>`. Each `<li>` is independently extractable — an engine can lift a single takeaway without pulling surrounding context. This is the correct structure for citation.

Every post also ships `faq` — **0 missing across all three languages** — giving a second, differently-shaped quotable unit.

---

## 6. ✅ `speakable` — selectors resolve ✅

```js
speakable: {
  '@type': 'SpeakableSpecification',
  cssSelector: ['.tldr-takeaways', '.prose > p:first-of-type'],
}
```

| Selector | Verified |
|---|---|
| `.tldr-takeaways` | ✅ root class of `TLDR.astro` |
| `.prose > p:first-of-type` | ✅ `<article class="prose prose-lg …">` wraps `<Content>` |

Both match live DOM. `speakable` no longer drives a Google feature, but answer engines read it as an utterance hint. Harmless, mildly useful.

---

## 7. ⚠️ Answer-first formatting — uneven (the main AEO gap)

The blog skill's answer-first standard: **every H2 opens with a ~50-word direct answer, followed by a self-contained 120–180-word citable passage.**

**Not measurable from frontmatter alone** — it requires reading body prose, and it correlates strongly with the depth problem in `05-content-blog.md` §3:

- 61% of EN posts are **under 900 words total**. A post with 363 words cannot contain multiple self-contained 120–180-word citable passages — there is not enough body for it.
- `technical-seo-audit-guide-2026` (363w), `link-building-strategies-guide-2026` (356w), `website-maintenance-security-guide-2026` (322w) can each support at most **2–3** such passages site-wide.

**Consequence:** the TLDR block gives engines a bullet list to quote, but the *body* often lacks the depth needed for a **substantive** citation (the kind where an engine attributes a claim and links the source). The site is optimised for *being listed* more than for *being quoted with attribution*.

**Recommendation:** apply the answer-first pass to the highest-value posts first — the 7 cannibalization clusters' surviving URLs, plus the 5 money posts. Target: every H2 opens with a direct answer sentence; each section holds 120–180 words of self-contained prose.

**Falsifiability (GROW):** monthly, test 5 fixed prompts the site should answer (`how much does a website cost 2026`, `seo title checker free`, `technical seo audit checklist`, …). Track whether answers mention and link `webabc.ir`.

---

## 8. 🔴 Broken human handoff — blank 404

The AEO loop has three stages: **retrieve → cite → hand off to the human.** Stage 3 is broken.

| Audience hitting a broken URL | Response |
|---|---|
| Agent / curl / bot UA | ✅ 923 B markdown recovery doc with links to `/en/`, `llms.txt`, `llms-full.txt`, sitemap |
| **Real browser** | 🔴 **404 with `content-length: 0` — blank white page** |

Root cause: `wrangler.toml` has no `not_found_handling`, so `env.ASSETS.fetch()` returns an empty-body 404 and `worker.ts` passes it through (see `03-technical.md` §2 for the full trace and both fixes).

**Why it matters for AEO specifically:** an engine that cites a deep link, or a user following a citation from an AI answer to a URL that has since moved, lands on nothing — no nav, no related content, no route back. **The site carefully writes recovery documents for machines and gives humans a blank screen.**

**Fix:** `not_found_handling = "404.html"` in `wrangler.toml` (preferred), or serve `dist/404.html` in the worker's browser branch when the assets 404 body is empty.

---

## 9. ⚠️ Entity hierarchy for answer attribution

Present and resolving:

| Link | Status |
|---|---|
| `BlogPosting` → `Organization` (`publisher @id`) | ✅ |
| `WebSite` → `Organization` | ✅ |
| `BreadcrumbList` on blog + tools + services + areas | ✅ |
| `FAQPage` single emitter, `Question`/`Answer` pairs | ✅ |
| `FAQPage.isPartOf` → `…/#webpage` | ❌ **dangling** (see `04-schema.md` §4.1) |

The dangling reference means the FAQ entity does not formally attach to a page node. Fix by emitting an explicit `WebPage @id = …/#webpage` (which also completes the breadcrumb → page → website chain).

**Note — do NOT add `QAPage`.** The FAQs are editorial, not user-submitted. `QAPage` is for genuine user Q&A; misusing it is a structured-data spam pattern.

---

## 10. Attribution and freshness — the E-E-A-T side

Answer engines weight *who is speaking*. Verified strengths:

- ✅ `Person` author with 7 `sameAs` profiles + author page URL + image
- ✅ Visible author box with `rel="author"` on every post
- ✅ `datePublished` / `dateModified` exposed in schema **and** as visible UI
- ✅ `wordCount` accurately computed from plain text
- ✅ Portfolio `Review`/`AggregateRating` gated behind real data — no fabricated ratings

**Risk:** `05-content-blog.md` §5 — 19/36 posts share one publish date and 26/36 share one update date, and only 1 post predates 2026-08-07. **A corpus that appears to have been created in a single week is weak evidence of sustained expertise**, which is exactly what answer engines assess when choosing a source.

---

## 11. Score: AEO — 82/100

| Evidence | Weight |
|---|---|
| ✅ Zero-JS static HTML — content readable without execution | base |
| ✅ Full `Accept: text/markdown` negotiation + 205 markdown siblings + `Vary` + 406 handling | + |
| ✅ 100% TLDR + FAQ coverage on 108 posts across 3 languages | + |
| ✅ `rel="llms-txt"`, `is-agentic-site-type`, markdown alternate all in `<head>` | + |
| ✅ `speakable` selectors verified to resolve | + |
| ✅ Author Person graph with 7 profiles, visible author box, accurate dates | + |
| ❌ **Blank 404 for humans — broken citation handoff** | −7 |
| ❌ **205 indexable `.md` duplicates without canonical** | −5 |
| ❌ Answer-first body formatting uneven; 61% of posts too thin to host citable passages | −4 |
| ❌ Dangling `#webpage` breaks FAQ → page attachment | −2 |

---

**Next:** `08-geo-ai-citations.md` · `09-performance-images.md`
