# GEO (Generative Engine Optimization / AI Citation) Audit — webabc.ir

**Question:** may AI engines crawl this site, can they ingest it efficiently, and is there enough entity/mention signal for them to *cite* it?

**Scope:** AI crawler permissions, `llms.txt` / `llms-full.txt`, corpus composition, entity authority, off-site brand footprint, citation testing.

---

## 1. ✅ AI crawler permissions — better than most sites

`public/robots.txt` (verified live, 596 B):

```
User-agent: GPTBot            Allow: /
User-agent: OAI-SearchBot     Allow: /
User-agent: ChatGPT-User      Allow: /
User-agent: ClaudeBot         Allow: /
User-agent: Claude-SearchBot  Allow: /
User-agent: Claude-User       Allow: /
User-agent: PerplexityBot     Allow: /
User-agent: Google-Extended    Allow: /
User-agent: CCBot             Allow: /
User-agent: Bytespider        Allow: /

Sitemap: https://webabc.ir/sitemap-index.xml
```

| Engine | Crawler(s) | Status |
|---|---|---|
| OpenAI / ChatGPT | `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` | ✅ allowed — all three roles covered (training / search / user-fetch) |
| Anthropic / Claude | `ClaudeBot`, `Claude-SearchBot`, `Claude-User` | ✅ allowed — all three roles covered |
| Perplexity | `PerplexityBot` | ✅ allowed |
| Google AI | `Google-Extended` | ✅ allowed |
| Meta training | — | ⚠️ `Meta-ExternalAgent` not listed (falls under `*` → allowed anyway) |
| Training corpora | `CCBot`, `Bytespider` | ✅ explicitly allowed — a deliberate opt-in |

The grouped-AI-block + wildcard structure is unambiguous and the comment states intent. **No changes needed.**

**Trivia:** `Disallow: /private/` matches no existing route (harmless dead rule); `Disallow: /api/` correctly covers the POST-only contact endpoint.

---

## 2. ✅ `llms.txt` — a genuine IA map, not a token

**166 lines**, sections:

```
# WebABC
> (entity definition: what it is, where it operates, languages, tech)
> Full-text corpus …: /llms-full.txt
## When to Use This (Agent Guidance)
   ### Jobs WebABC Excels At
   ### When to Pick WebABC Over Alternatives
   ### When NOT to Use / Prerequisite Conditions   ← honest negative scope
   ### Agent Invocation & Consumption Instructions
## Company & Overview
## Core Services
## Geographic Service Areas (GEO / Localized Hubs)
## Interactive Tools (Free Developer & SEO Utilities)
## Case Studies & Portfolio
## Research, Guides & Insights (Blog)
## Persian Corpus & Regional Hubs (fa)
## Arabic Corpus & GCC Hubs (ar)
## Direct Contact & Support
```

**Strong points:**

- ✅ **`When NOT to Use` with explicit prerequisites** — negative scope is rare and materially improves retrieval precision. An agent told *"not suitable for <$500 DIY brochure projects"* will not mis-fire the brand into an irrelevant answer.
- ✅ **`Agent Invocation & Consumption Instructions`** documents `Accept: text/markdown`, `/llms-full.txt`, the cost calculator, and the contact route — an actionable handoff, not a description.
- ✅ Cross-references `/llms-full.txt` in the header block.
- ✅ Dedicated fa and ar sections — the corpus is not English-only.

**`llms.txt` header `rel` tag:** ✅ `<link rel="llms-txt" href="/llms.txt" />` on every page.

---

## 3. 🔴 The link graph is English-heavy — 61% / 19% / 18%

| Locale | Deep links in `llms.txt` | Share |
|---|---:|---:|
| **en** | **69** | **61%** |
| fa | 22 | 19% |
| ar | 20 | 18% |

**The site publishes 36 posts per language — exactly equal content — but exposes 3.5× as many English links as Persian or Arabic.**

`llms-full.txt` is better balanced (en 190 / fa 96 / ar 97 path mentions) but still English-weighted.

### Why this is a real GEO defect

The GSC data shows the opposite market reality:

| Market | Impr | CTR |
|---|---:|---:|
| Iran | 3,084 | **1.69%** ← the only market that converts |
| United States | 18,708 | 0.25% |
| UK + DE + CH + FR | 3,684 | **0.00%** |

**Persian content is the site's highest-converting asset, and it gets 19% of the exposure in the file AI engines read to decide what this site is about.** An agent reading `llms.txt` sees an English-language agency with a small Persian appendix — the opposite of the truth.

**Fix:** rebalance the `## Persian Corpus` and `## Arabic Corpus` sections to expose the fa/ar money posts, tools and service pages at parity with the English section — **72 blog deep links total (24/24/24)**, plus tools and service pages in all three.

**Falsifiability:** after rebalancing, test fa/ar prompts in ChatGPT/Perplexity and check whether Persian-language answers about the site's services appear at all (today: expect none).

---

## 4. ✅ `/llms-full.txt` — real, large, and live

| Check | Value |
|---|---|
| Exists in `public/` | ✅ 421 KB |
| Live | ✅ `200`, 431,274 B |
| Regenerated at build | ✅ `npm run llms` → `scripts/generate-llms-full.mjs` |
| Referenced from `llms.txt` | ✅ header block |
| Content | `llms.txt` index + bodies of key pricing/service guides, capped ~500 KB |
| Composition | en 190 / fa 96 / ar 97 path mentions |

At ~424 KB it sits just under the stated 500 KB cap. **Two observations:**

1. **It will hit the cap soon.** Add a build-time warning at, say, 480 KB so the cap does not silently start truncating content.
2. **Composition tracks the `llms.txt` imbalance** (§3) — the same rebalance should be applied by `generate-llms-full.mjs`.

> **Correction:** the previous audit reported *"no `llms-full.txt`"* — it exists and is served. See `10-corrections.md`.

---

## 5. ✅ Entity definition quality — strong

The `llms.txt` blockquote definition:

> WebABC (https://webabc.ir) is a premier web design, full-stack custom development, performance SEO, and AI engine optimization (AEO/GEO) agency serving clients across the Middle East (Dubai, Tehran, Muscat, Riyadh, Abu Dhabi, Qazvin) and internationally. Built on Astro for ultra-fast performance, zero-JS baseline rendering, and optimal AI crawling readability. Published in English (`/en`), Persian (`/fa`), and Arabic (`/ar`).

This is a well-formed entity statement: **what it is → where it operates → how it is built → what languages.** Machines can parse it into a coherent entity.

Reinforced in structured data — `Organization.knowsAbout` explicitly claims:

```
'Search Engine Optimization (SEO)',
'Technical SEO & Core Web Vitals',
'Answer Engine Optimization (AEO)',
'Generative Engine Optimization (GEO)',
…
```

The site claims GEO as a *domain of expertise* in its own entity graph. **That claim should be backed by citation performance** — right now it is unverified (§7).

---

## 6. ⚠️ Off-site brand footprint — the actual GEO bottleneck

`Organization.sameAs`:
```
https://github.com/alibakhtiari
https://www.linkedin.com/in/alibakhtiarii/
https://x.com/aliib1991
https://aliib.ir
```

`BlogPosting.author` (Person) `sameAs` adds Instagram, Facebook, `alibakhtiari.ir`.

### Assessment

**The entity graph is internally consistent but externally thin**, and there is a subtle mismatch: **3 of the 4 Organization `sameAs` profiles are the founder's personal profiles, not agency profiles.** Only `aliib.ir` reads as an organisation.

**GEO's primary lever is off-site corroboration.** AI engines decide whether to cite a source partly by whether *other* sources corroborate the entity. On-site schema cannot substitute for that.

**What is missing (in value order):**
1. **Agency-level profiles** — a company LinkedIn and company X distinct from the founder's.
2. **Citable third-party mentions** — directories, industry roundups, tool listings. The site ships 21 free tools, which is a natural link/citation asset that is currently under-exploited: `best-title-tag-checker-tools-2026` style listicles on *other* sites are what would move this.
3. **GitHub as an entity signal** — the profile exists but there is no public repository tied to the free tools (they are client-side but not open-sourced). Publishing them would create a corroborating artifact.

**This is the one GEO item that cannot be fixed in the codebase** — it is digital PR. Everything else in this file is.

---

## 7. ⚠️ Citation readiness is untested

**No baseline exists for the single metric GEO is judged on:** *does an AI engine cite this site?*

**Recommendation — stand up a monthly citation test** (no tooling cost):

1. Fix 5 prompts the site should win:
   - `best free seo title checker 2026`
   - `how much does a website cost in 2026`
   - `technical seo audit checklist`
   - `web design agency qazvin` / `طراحی سایت در قزوین`
   - `best headline analyzer tool`
2. Run them in ChatGPT (Search), Perplexity, Google AI Overviews, Gemini.
3. Record: mentioned? linked? which URL? position in answer?
4. Re-run monthly; the number that must move is **citations, not impressions**.

**Leading indicator (GROW):** citation count on these 5 fixed prompts. GSC impressions tell you nothing about GEO.

---

## 8. Structured-data support for citation

| Feature | Status |
|---|---|
| `FAQPage` with `Question`/`Answer` on all posts and tools | ✅ — correct as *entity* markup |
| `BlogPosting` with `headline`, `dateModified`, `wordCount`, `inLanguage` | ✅ |
| `BreadcrumbList` for source hierarchy | ✅ |
| `speakable` utterance hints | ✅ selectors resolve |
| `Person` author with 7 `sameAs` | ✅ |
| `WebSite` + `Organization` binding | ✅ |
| Dangling `#webpage` `isPartOf` | ❌ fix (see `04-schema.md` §4.1) |
| `QAPage` | ✅ correctly **not** used (editorial, not user Q&A) |
| `HowTo` | ✅ correctly **not** used (deprecated 2023) |
| Fabricated `AggregateRating` | ✅ correctly gated behind real data |

**Keep `FAQPage`.** Google retired FAQ *rich results* (May 2026), but the `Question`/`Answer` structure remains useful entity markup for AI retrieval. **Do not remove it, and do not chase FAQ snippets.**

---

## 9. 🔴 Markdown duplicates undermine GEO specifically

The 205 `index.md` files served `200` + `index, follow` with **no canonical** (see `03-technical.md` §7) matter more for GEO than for classic SEO:

- RAG pipelines fetch `.md` directly — good.
- But two indexable representations of the same content with no canonical means **engines can ingest either, and citation can split** across `…/post/` and `…/post/index.md`.
- Split citation = diluted attribution and inconsistent source linking.

**Fix:** `X-Robots-Tag: noindex` + `Link: <html-url>; rel="canonical"` on `.md` responses, keeping the *negotiated* markdown on the HTML URL (correctly `Vary: Accept`) fully available.

---

## 10. Score: GEO — 80/100

| Evidence | Weight |
|---|---|
| ✅ Explicit 10-block AI crawler allowlist covering OpenAI/Anthropic/Perplexity/Google/CC/ByteDance | base |
| ✅ `llms.txt` with honest negative scope + actionable agent invocation instructions | + |
| ✅ `llms-full.txt` 424 KB, build-generated, live, cross-referenced | + |
| ✅ Zero-JS HTML — no rendering step required for ingestion | + |
| ✅ Strong entity definition (what / where / how / languages) | + |
| ✅ Correct schema posture: FAQPage entity-only, no HowTo, ratings gated | + |
| ❌ **Link graph 61% en despite Persian being the only converting market** | −8 |
| ❌ **Thin off-site footprint: Organization `sameAs` = 3 personal + 1 site** | −5 |
| ❌ **Zero citation testing in place** | −4 |
| ❌ Markdown duplicates split citation attribution | −3 |

---

**Next:** `09-performance-images.md` · `10-corrections.md`
