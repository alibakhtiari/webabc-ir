# On-Page SEO & SERP Snippet Audit — webabc.ir

**Method:** live `<title>` / `<meta name="description">` extraction across 11 key URLs (2026-09-22) + all 108 blog frontmatter files parsed + GSC CTR reconciliation.

---

## 1. Live title & description health

| URL | Title (chars) | Desc (chars) | Verdict |
|---|---|---|---|
| `/en/` | WebABC \| Professional SEO and Web Design Services (49) | 155 | ✅ |
| `/fa/` | وب اِی‌بی‌سی \| خدمات حرفه‌ای سئو و طراحی وب (43) | 149 | ✅ |
| `/ar/` | ويب إيه بي سي \| تصميم مواقع وسئو في دبي والرياض ومسقط (53) | 161 | ⚠️ desc over 160 |
| `/en/tools/headline-analyzer/` | Free Headline Analyzer + SEO Title Checker [Pixel-Perfect] (58) | 154 | ✅ |
| `/en/services/web-design/` | Custom Web Design & Development in Dubai & UAE \| WebABC (**63**) | 158 | ⚠️ title over 60 |
| `/en/service-areas/tehran/` | Web Design Agency Tehran \| Ecommerce & SEO (46) | 132 | ✅ |
| `/fa/service-areas/qazvin/` | طراحی سایت در قزوین \| طراحی سایت قزوین و سئو سایت در قزوین (58) | 115 | ⚠️ keyword ×3, desc short |
| `/en/blog/seo-checklist-2026/` | SEO Checklist 2026: Complete Step-by-Step Audit & Ranking (**61**) | 119 | ⚠️ title over 60, desc short |
| `/fa/blog/website-speed-optimization-pricing-guide-2026/` | هزینه سرعت سایت و Core Web Vitals در ۲۰۲۶ (41) | 138 | ✅ **best on site** |
| `/en/portfolio/` | Our Portfolio - Web Design & SEO Case Studies \| WebABC (58) | 115 | ⚠️ desc short |
| `/en/tools/cost-calculator/` | Website Cost Calculator & Price Estimator – Free Web Design (**63**) | 153 | ⚠️ title over 60 |

**Note on Persian/Arabic titles:** character count is misleading for RTL scripts — glyph width is closer to Latin uppercase than lowercase. A 58-character Persian title occupies *more* horizontal space than a 60-character Latin title and truncates earlier. Judge fa/ar titles by **pixel width (~580px)**, not character count.

---

## 2. Blog frontmatter (all 108 posts parsed)

| Metric | en | fa | ar |
|---|---:|---:|---:|
| Posts | 36 | 36 | 36 |
| `title` > 60 chars | **4** | **8** | **6** |
| `description` > 160 chars | 0 | 0 | **1** |
| `description` < 120 chars | 1 | 2 | **5** |
| Missing `faq` | 0 | 0 | 0 |
| Missing `keyTakeaways` | 0 | 0 | 0 |
| Missing `updatedDate` | 4 | 4 | 4 |

**Template discipline is genuinely strong** — 100% FAQ and TLDR coverage across three languages is rare. The defects are concentrated in title width.

### Worst offenders (title length)

**EN (4):**
- 75ch — `WordPress vs Custom Development – Which is Right for Your Business in 2026?`
- 69ch — `Qazvin Web Design & Local SEO Guide 2026: Industrial & Corporate Hubs`
- 64ch — `Generative Engine Optimization (GEO) Guide 2026: AI Search & AEO`
- 62ch — `SEO Services Pricing Guide 2026: Cost Breakdown & ROI Packages`

**FA (8)** — longest 87ch: `وردپرس در مقابل توسعه اختصاصی – کدام برای کسب‌وکار شما در سال ۱۴۰۵ / ۲۰۲۶ مناسب است`
**AR (6)** — longest 82ch: `اتجاهات تصميم الويب الحديثة لعام 2026 …`

**Every one of these will truncate with `…` in the SERP**, cutting off the year and the value proposition.

---

## 3. The Critical finding: 75% of impressions, 0.04% CTR

Recomputed from the workbook (see `01-gsc-performance.md` §3):

> **23 title/headline queries → 23,814 impressions → 9 clicks → 0.04% CTR**
> = 75.4% of all site impressions

### Root cause chain (THINK → CONNECT-system)

1. **Query–snippet mismatch.** `seo headline checker` converts **3.42% at position 21.27**; `seo title checker` converts **0.08% at position 16.80**. Same page, same approximate position, **43× CTR difference**. The word in the query is not the word leading the title.
2. **Competitor-brand collision.** `seo title checker for blog by webnewstips com` = 10,157 impr / 0 clicks at position 5.55. Current title `Free Headline Analyzer + SEO Title Checker [Pixel-Perfect]` still leads with the competitor-adjacent phrase structure.
3. **No differentiated second-line hook.** Description is competent (154ch) but carries no number, no proof, no freshness marker — nothing that out-competes the incumbent on a page of results.

### Recommended title rewrite (EN)

```
Current (58ch): Free Headline Analyzer + SEO Title Checker [Pixel-Perfect]
Proposed (~59ch): Headline & Title Checker — Score CTR + See Exact Google Width
```

**Why this shape:** leads with the *pair* of intents, uses "Score CTR" as the action verb, and "exact Google width" is an unownable specificity no competitor brand can claim. It avoids reproducing webnewstips' product name while still matching `headline checker` / `title checker` / `title tag preview`.

**Meta description hook (154ch):**
```
Score any headline or title tag for CTR, then see the exact pixel width Google
will show — desktop and mobile. No signup, no watermark, free in 2026.
```

**Mirror the differentiation into** `src/i18n/{fa,ar}/tools/headlineAnalyzer.json` (both already carry good localized descriptions — keep the structure, swap the leading noun).

### Falsifiability check (ACCEPT)

> **Failed if:** after 4 weeks, `seo title checker for blog by webnewstips com` still shows ≥8k impressions at 0 clicks *and* blended page CTR is still <0.5%.
> **Leading indicator (GROW):** headline-analyzer page CTR should move before position does. If CTR rises but position does not, the title change worked and you now need links.

---

## 4. Striking-distance snippet rewrites (High)

| Page | Impr | Pos | Problem | Fix |
|---|---:|---:|---|---|
| `/ar/` | 232 | **5.01** | Top-5, zero clicks across 232 impr | Rewrite AR description with a concrete offer; it is the highest-ROI snippet on the site |
| `/fa/portfolio/ramzarz-negaran/` | 226 | 6.85 | 0.88% CTR at pos 6.8 | Front-load the result metric from `results[]` into the description |
| `/en/blog/seo-best-practices/` | 351 | 8.94 | Page 1, 0.57% CTR | Add year + step-count to description |
| `/fa/portfolio/soheil-accessory/` | 122 | 6.38 | Top-7, zero clicks | Same: result-first description |
| `/en/service-areas/tehran/` | 166 | 16.67 | Page 2, zero clicks | Description (132ch) is generic — add locality proof + free-quote offer |
| `/fa/service-areas/muscat/` | 146 | 10.58 | Bottom page 1 | CTR-hook description + 2 new FAQs |

**Four portfolio pages rank in the top 10 and convert at 0–1.9%.** Portfolio SERP snippets should lead with the outcome number, not the project name.

---

## 5. Brand query ownership

| Query | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| `webabc` | 38 | 86 | 44.19% | **3.41** |
| `ويب سي` | 0 | 218 | 0.00% | **4.93** |
| `remido` | 0 | 223 | 0.00% | 5.05 |

Three observations:

1. **`webabc` at position 3.41 with 44% CTR** — acceptable but should be 1.0. Losing positions 1–3 on your own brand means something else owns the SERP above you.
2. **`ويب سي` (the Persian brand transliteration, which the site itself declares as `WebSite.alternateName` for `fa`) ranks 4.93 with 0 clicks across 218 impressions.** The site *claims* this entity in structured data but does not *own* the SERP for it. This is a direct, closable gap: the alternateName is in the schema, so reinforce it in on-page Persian copy, footer anchors, and the `/fa/` title.
3. **`remido`** — a portfolio client name at position 5.05 with 0 clicks across 223 impressions. Not yours to win; ignore.

**Falsifiability:** `webabc` still >2.0 after 4 weeks → external brand competition; escalate to listings/PR rather than more on-page work.

---

## 6. Internal link hygiene — the `seo-title-checker` merge

**Status: redirects are correct and live.** Verified 2026-09-22:

```
/en/tools/seo-title-checker  → 301 → /en/tools/headline-analyzer/
/en/tools/serp-preview       → 301 → /en/tools/headline-analyzer/
/en/tools/seo-title-analyzer → 301 → /en/tools/headline-analyzer/
/en/tools/headline-analyzer  → 301 → /en/tools/headline-analyzer/
```

**Sitemap is clean** — no legacy tool slugs present (verified: 0 matches in `dist/sitemap-0.xml`).

Remaining work is **not** code: the legacy URLs still earn 242 combined impressions in GSC (`/en/tools/seo-title-checker/` 115 + `/en/tools/seo-title-checker` 127). Those are historical rows. Re-export in 4 weeks; if they persist, something still links to them externally.

---

## 7. Category → CTA mapping defect (Medium)

`src/pages/[lang]/blog/[slug].astro` maps post category → service page + tool CTA via `serviceToolDict`. Its keys are:

```
SEO · Local SEO · WordPress · Web Design · Web Development · E-Commerce
```

Actual categories used across the 36 EN posts:

| Category | Posts | Mapped? |
|---|---:|---|
| SEO | 12 | ✅ |
| Web Development | 6 | ✅ |
| Web Design | 4 | ✅ |
| Local SEO | 3 | ✅ |
| WordPress | 2 | ✅ |
| E-Commerce | 2 | ✅ |
| Digital Marketing | 2 | ❌ → generic fallback |
| UI/UX Design | 1 | ❌ → generic fallback |
| Maintenance | 1 | ❌ → generic fallback |
| **Performance** | 1 | ❌ → generic fallback |
| **Speed Optimization** | 1 | ❌ → generic fallback |
| Link Building | 1 | ❌ → generic fallback |

**7 of 36 posts receive an irrelevant CTA pair** (default → web-design service + headline-analyzer tool), because their category is not a key in the dictionary.

**Two additional defects:**
- `Performance` and `Speed Optimization` are **the same topic under two names** — a taxonomy split that also breaks internal-link relevance.
- `Maintenance` vs the service slug `website-maintenance` — naming mismatch between content taxonomy and service taxonomy.

**Fix:** add the six missing keys to `serviceToolDict`, and merge `Performance` → `Speed Optimization` (or vice versa) across all three languages.

---

## 8. Score: On-Page SEO — 68/100

| Evidence | Weight |
|---|---|
| ✅ Titles/descriptions present and mostly within limits on all sampled URLs | + |
| ✅ 100% FAQ + TLDR coverage on 108 posts | + |
| ✅ Brand query converts at 44% CTR | + |
| ✅ Best content converts 7.34% — proves the mechanism works | + |
| ❌ 75% of impressions at 0.04% CTR (zero-click cluster) | −18 |
| ❌ Brand at 3.41 instead of 1.0; `ويب سي` at 4.93 unowned | −5 |
| ❌ 18/108 blog titles >60 chars (will truncate) | −6 |
| ❌ 8 descriptions outside 120–160ch band | −3 |

---

**Next:** `03-technical.md` · `04-schema.md` · `05-content-blog.md`
