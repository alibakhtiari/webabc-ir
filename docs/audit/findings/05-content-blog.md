# Content & Blog Audit — webabc.ir

**Method:** all 108 blog MDX frontmatter files parsed (36 en / 36 fa / 36 ar) · body word counts computed from markdown-stripped text · pairwise `difflib` body-similarity across suspected cannibal pairs · GSC reconciliation.

---

## 1. Inventory

| Content type | Count | Parity |
|---|---:|---|
| Blog posts | **108** (36 en + 36 fa + 36 ar) | ✅ exact slug parity |
| Portfolio items | 51 (17 × 3) | ✅ |
| Tools | **21** + hub × 3 languages | ✅ |
| Services | 11 × 3 | ✅ |
| Service areas | 6 (dubai, tehran, muscat, qazvin, abu-dhabi, riyadh) × 3 | ✅ |

**Note:** `README.md` claims "24 interactive tools"; `llms.txt` claims "23 free client-side utilities". The real count is **21** (plus the `/tools/` hub). Copy inconsistency — correct both to 21.

---

## 2. Template discipline — genuinely excellent ✅

| Requirement | en | fa | ar |
|---|---:|---:|---:|
| Posts with `faq` | 36/36 | 36/36 | 36/36 |
| Posts with `keyTakeaways` (TLDR) | 36/36 | 36/36 | 36/36 |
| Posts with `updatedDate` | 32/36 | 32/36 | 32/36 |
| Slug parity across languages | ✅ | ✅ | ✅ |

**100% FAQ + TLDR coverage across three languages** is rare and is the backbone of the site's AEO posture. Every post ships:
- a quotable answer block (`.tldr-takeaways`, also the `speakable` target),
- a Q&A entity block,
- an E-E-A-T author box with `rel="author"` + social profiles,
- a category-mapped service/tool CTA,
- three related-post cards.

Every post also emits `wordCount` computed from markdown-stripped text — accurate, not a character count.

---

## 3. 🔴 CRITICAL — Thin content: median post is 598 words

Word counts for all 36 EN posts (markdown stripped; code fences, JSX, and link markup removed):

| Statistic | Words |
|---|---:|
| Minimum | **322** (`website-maintenance-security-guide-2026`) |
| **Median** | **598** |
| Maximum | 2,529 (`local-seo-services-guide-2026`) |
| **< 900 words** | **22 of 36 (61%)** |
| **< 1,200 words** | **25 of 36 (69%)** |

### The sub-900 list (22 posts)

| Words | Post |
|---:|---|
| 322 | website-maintenance-security-guide-2026 |
| 354 | digital-marketing-roi-guide-2026 |
| 356 | link-building-strategies-guide-2026 |
| 363 | mobile-first-web-design-guide-2026 |
| 363 | technical-seo-audit-guide-2026 |
| 375 | ui-ux-audit-redesign-guide-2026 |
| 375 | website-speed-optimization-guide-2026 |
| 416 | wordpress-vs-custom-development-guide-2026 |
| 418 | website-development-cost-guide-2026 |
| 436 | website-development-cost-calculator-guide-2026 |
| 448 | ecommerce-web-design-guide-2026 |
| 467 | seo-checklist-2026 |
| 507 | website-development-costs |
| 508 | dubai-uae-web-design-seo-guide-2026 |
| 530 | mobile-first-design |
| 552 | free-seo-developer-tools-guide-2026 |
| 557 | oman-web-design-seo-guide-2026 |
| 580 | best-seo-tools |
| 598 | website-speed-optimization-pricing-guide-2026 |
| 608 | wordpress-vs-custom-development |
| 658 | local-seo-middle-east |
| 777 | digital-marketing-strategies |

### Why this is the biggest content risk

These are all titled as **guides, checklists and "complete" resources**:

- `technical-seo-audit-guide-2026` — **363 words** claiming to be a technical SEO audit guide.
- `link-building-strategies-guide-2026` — **356 words**.
- `website-maintenance-security-guide-2026` — **322 words**, the shortest post on the site.
- `seo-checklist-2026` — **467 words** for a "Complete Step-by-Step Audit" (its title promises more than 467 words can deliver).

**Context (May 2026 Core Update + March/June 2026 spam enforcement):** Google's quality baseline targets content that is *presented as comprehensive but does not deliver exhaustive coverage*. A 363-word page titled `…Guide 2026` is precisely the mismatch this update class rewards demoting.

**This also directly explains the GSC pattern:** the pages that *do* convert are the two longest or the most intent-specific:
- `local-seo-services-guide-2026` — 3,294 words (the longest) 
- `website-speed-optimization-pricing-guide-2026` — 598 words but **hyper-specific pricing intent** → 7.34% CTR

**The two things that work are depth and intent specificity. 61% of the corpus has neither.**

### Recommended thresholds (blog skill quality gate)

| Page type | Minimum | Apply to |
|---|---:|---|
| Pillar / "guide" / "complete" | 1,800–2,500 | 22 sub-900 posts with guide-scope titles |
| Standard how-to | 1,200 | mid-tier |
| Specific pricing / tool page | 600 acceptable **if intent is narrow** | speed-pricing passes at 598 |

**Cheapest high-value action:** retitle the shortest posts to match their real scope (e.g. `Technical SEO Audit: 12-Point Checklist` instead of `…Guide 2026`), *or* expand them. Do not leave a 363-word body under a "guide" promise.

---

## 4. 🟠 HIGH — Keyword cannibalization: 7 clusters

Body-similarity was measured with `difflib.SequenceMatcher` on the first 6,000 chars of markdown-stripped text.

**Important nuance:** similarity is **3–7%** across all pairs — the *bodies are genuinely different content*. This is **not duplicate content**. It is **title/intent cannibalization**: multiple URLs competing for the same query because their titles promise the same thing.

### Cluster A — "How much does a website cost" (worst)

| Post | Words | Title |
|---|---:|---|
| `how-much-does-a-website-cost-2026` | 1,533 | **How Much Does a Website Cost in 2026?** |
| `website-development-cost-guide-2026` | 418 | **How Much Does a Website Cost in 2026?** Pricing Breakdown |
| `website-development-costs` | 507 | Understanding Website Pricing – Development & Design Costs |
| `website-development-cost-calculator-guide-2026` | 436 | Website Cost Calculator Guide 2026: Pricing & Formulas |

**Four URLs, two of which share a near-identical H1.** Body similarity 3.8% (A↔B) and 6.4% (C↔B). The descriptions even overlap: *"Demystify the cost of web design and development"* vs *"Demystify web development pricing in 2026"*.

**Recommendation:** consolidate to **two** — one broad cost guide (keep `how-much-does-a-website-cost-2026` at 1,533 words) + one calculator companion. 301 the other two into them and port any unique sections across first.

### Cluster B — WordPress vs custom

| Post | Words | Title |
|---|---:|---|
| `wordpress-vs-custom-development` | 608 | WordPress vs Custom Development – Which is Right for Your Business in 2026? |
| `wordpress-vs-custom-development-guide-2026` | 416 | WordPress vs. Custom Web Development in 2026: An … |

Same topic, same year, nearly identical slugs. Similarity 3.7% (different angles — one is a decision guide, one an architectural comparison). **Differentiate the titles by angle or merge.**

### Cluster C — Title / headline / title-checker (overlaps the money tool)

| Asset | Words/Type | Title |
|---|---:|---|
| `seo-title-optimization-guide-2026` | 952 | How to Write SEO Titles That Boost CTR [2026] |
| `how-to-write-clickable-headlines` | 1,197 | How to Write Clickable Titles and Headlines for SEO in 2026 |
| `best-title-tag-checker-tools-2026` | — | 6 Best Free Title Tag Checker Tools Compared [2026] |
| **`/en/tools/headline-analyzer/`** | tool | Free Headline Analyzer + SEO Title Checker |

**Four assets, two blog posts with 3.4% body similarity but near-identical title intent** (*"How to Write … Titles … CTR … 2026"* vs *"How to Write Clickable Titles and Headlines … 2026"*), plus the tool that owns the cluster.

This is the **same cluster that carries 75% of site impressions** in GSC. The internal competition here directly undermines the one asset that matters most.

**Recommendation:** merge the two "how to write titles" posts into one definitive guide; keep `best-title-tag-checker-tools` (clearly a listicle, different intent); and ensure all three link to `headline-analyzer` with varied anchors.

### Cluster D — Website speed

| Post | Words |
|---|---:|
| `website-speed-optimization-pricing-guide-2026` | 598 |
| `website-speed-optimization-guide-2026` | 375 |

Both start *"Complete guide to website speed optimization costs…"* / *"Master website speed optimization in 2026…"*. Titles overlap heavily; bodies differ (3.0% similarity). **Differentiate:** one is pricing, one is how-to — make that explicit in both titles.

### Cluster E — Local SEO

| Post | Words |
|---|---:|
| `local-seo-services-guide-2026` | **3,294** |
| `local-seo-middle-east` | 658 |
| `qazvin-web-design-seo-guide-2026` | — (geo variant) |

Differentiation exists (global tactics vs Middle East regional), but `local-seo-middle-east` at 658 words is thin next to a 3,294-word sibling targeting overlapping terms. **Either expand it or fold the ME angle into the pillar as a section.**

### Cluster F — Web design trends

| Post | Words |
|---|---:|
| `web-design-trends` | 1,258 |
| `modern-ui-ux-trends` | 1,290 |

Both open *"Explore … design trends in 2026 …"* with 6.6% similarity — the **highest** similarity measured. Different categories (`Web Design` vs `UI/UX Design`) but overlapping query space.

### Cluster G — Mobile first

`mobile-first-design` (530w) and `mobile-first-web-design-guide-2026` (363w) — same topic, one is a rewrite of the other.

**Aggregate:** 7 clusters spanning ~15 posts. **Recommendation:** run the full cannibalization pass across all 108 (fa/ar mirror en exactly, so fixes propagate ×3).

---

## 5. 🟠 Freshness signals look bulk-produced

`date:` distribution across the 36 EN posts:

| Date | Posts |
|---|---:|
| **2026-08-07** | **19** (10 quoted + 9 unquoted) |
| 2026-08-15 | 8 |
| 2026-09-21 | 4 |
| 2026-09-14 | 3 |
| 2026-09-05 | 1 |
| 2025-01-24 | 1 |

`updatedDate:` distribution:

| Date | Posts |
|---|---:|
| **2026-08-18** | **26** |
| 2026-09-21 | 4 |
| 2026-09-14 | 2 |

**19 posts share one publish date; 26 share one update date.**

### Why this matters

Under the May 2026 Core Update and the March/June 2026 spam policies, **mass-produced publication patterns are a quality signal**. A corpus where 53% of posts appear on one day and 72% appear updated on one day reads as a bulk migration or bulk generation event, not an editorial cadence.

**Additional signal:** only **1 post predates 2026-08-07** (2025-01-24). The entire corpus is effectively 6 weeks old. Combined with thin bodies (§3), this is the pattern Google's "scaled content abuse" provisions describe.

**This is the highest structural E-E-A-T risk on the property** — and it is invisible in a pure technical audit.

### Mitigation (honest, not cosmetic)

1. **Do not fabricate earlier dates.** That is worse than the current state.
2. **Establish a real cadence going forward** — stagger future publishes across dates.
3. **Back the freshness claim with evidence:** the `updatedDate` values are already correct where real edits happened. Ensure every future `updatedDate` bump corresponds to an actual content edit.
4. **Prioritise depth expansion (§3)** — genuine, substantial rewrites are the only defensible way to move these pages up, and they justify later `updatedDate` values.
5. The site already publishes `dateModified` correctly and drives sitemap `lastmod` from frontmatter — keep that pipeline; it is working.

---

## 6. Locale differentiation — 1:1 translation symmetry

All 96→108 posts have exact slug parity with identical structure, FAQ count, and TLDR count per language. hreflang is therefore perfectly reciprocal (good).

**But:** the bodies are direct translations — same examples, same pricing, same case references. GSC confirms the consequence:

| Locale signal | Evidence |
|---|---|
| Persian converts | Iran **1.69% CTR** vs US **0.25%** |
| Arabic underperforms | `/ar/` at **position 5.01, 0 clicks / 232 impr** |
| Europe = 0 | UK 1,793 + DE 1,160 + CH 407 + FR 324 = **3,684 impr, 0 clicks** |

**Recommendation:** keep hreflang and slugs, but localise *proof* in the 5 money posts first:
- **fa** → Iranian pricing in toman, Iranian case data (ramzarz-negaran, remido, mehromah-qazvin already earn clicks — reuse them),
- **ar** → GCC gateways, Vision-2030/Saudi + UAE regulatory angles, AED/SAR figures,
- **en** → USD benchmarks, US/EU compliance angles.

**Falsifiability:** `Translated results` appearance stays at 0 clicks / position 92.88 → locale differentiation has not landed.

---

## 7. Category taxonomy defects

| Category | EN posts | In `serviceToolDict`? |
|---|---:|---|
| SEO | 12 | ✅ |
| Web Development | 6 | ✅ |
| Web Design | 4 | ✅ |
| Local SEO | 3 | ✅ |
| WordPress | 2 | ✅ |
| E-Commerce | 2 | ✅ |
| Digital Marketing | 2 | ❌ |
| UI/UX Design | 1 | ❌ |
| Maintenance | 1 | ❌ |
| **Performance** | 1 | ❌ |
| **Speed Optimization** | 1 | ❌ |
| Link Building | 1 | ❌ |

Two defects:
1. **7 posts get an irrelevant fallback CTA** (generic web-design service + headline-analyzer tool) because their category is not a dictionary key.
2. **`Performance` and `Speed Optimization` are the same topic under two names** — a taxonomy split that also breaks category-based internal linking and the `articleSection` entity signal.

**Fix:** merge `Performance` → `Speed Optimization`; add the remaining keys to `serviceToolDict` in `blog/[slug].astro` (and mirror in fa/ar).

---

## 8. Content strengths worth protecting

- ✅ **Best-practice proof point:** the fa speed-pricing post earns **10.5% of all site clicks from 0.6% of impressions** — the pricing-intent formula works.
- ✅ Portfolio results are structured (`results[]` value+label) and already power real clicks (ramzarz-negaran 6.85 pos, 226 impr).
- ✅ Related-posts are category-prioritised, not random — good internal-link relevance.
- ✅ Category→service→tool CTA blocks exist at all (most agencies skip this).
- ✅ Author box with 7 external profiles feeds the `Person.sameAs` graph.

---

## 9. Score: Content Quality — 66/100

| Evidence | Weight |
|---|---|
| ✅ 108 posts, exact 3-language slug parity | base |
| ✅ 100% FAQ + TLDR + author box across all languages | + |
| ✅ Related-post + category CTA internal linking | + |
| ✅ `wordCount` accurately computed from plain text | + |
| ✅ One post proves the pricing-intent formula (7.34% CTR) | + |
| ❌ **61% of EN posts under 900 words under "guide" titles** | −15 |
| ❌ **7 cannibalization clusters (~15 posts)** | −10 |
| ❌ **Bulk date pattern: 19/36 same publish date, 26/36 same update date** | −6 |
| ❌ Taxonomy split + 7 posts with unmapped CTA | −3 |

---

**Next:** `06-i18n-hreflang.md` · `07-aeo.md` · `08-geo-ai-citations.md`
