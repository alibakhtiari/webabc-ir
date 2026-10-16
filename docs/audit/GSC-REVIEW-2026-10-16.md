# GSC evidence review and SEO/AEO/GEO corrections — 2026-10-16

## Evidence and limits

Source: `webabc.ir-Performance-on-Search-2026-10-14.xlsx`, newest workbook in repository. Export covers **2026-07-12 through 2026-10-11**, not October 14 or 16. Full recomputation, source SHA-256, page variants and weighted positions: [GSC-REVIEW-2026-10-16.json](./GSC-REVIEW-2026-10-16.json).

This review uses SEO, blog, blog-geo and spreadsheet skills. It supersedes the October 14 report's performance interpretation, not its historical implementation record. No new overall health score: neither GSC nor build tests measure citation probability. No fresh PSI run, field CWV measurement, live indexing inspection, query-to-page attribution, conversion measurement or AI-engine citation test was performed.

| Scope | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Chart, entire export | 158 | 34,396 | 0.459% |
| Queries, all visible rows | 92 | 31,695 | 0.290% |
| Queries, excluding competitor-branded query | 92 | 21,537 | 0.427% |
| Pages, slash variants combined | 158 | 35,040 | 0.451% |

Competitor query `seo title checker for blog by webnewstips com`: 0 clicks / 10,158 impressions. Exclusion belongs **only to Queries**. Previous 0.65% calculation mixed Chart clicks with a query-adjusted denominator; corrected in `CTR-BASELINE-2026-10-14.json`. Do not label 0.427% as property CTR. Anonymous queries and independent aggregation prevent cross-sheet reconciliation. Pages has **295 raw rows / 241 normalized URLs**, not 303 raw rows. Average positions across variants are impression-weighted.

## Equal periods show declining exposure

| Chart window | Clicks | Impressions | CTR | Weighted average position |
|---|---:|---:|---:|---:|
| August 17–September 13 (28 days) | 78 | 24,572 | 0.317% | 15.33 |
| September 14–October 11 (28 days) | 59 | 6,299 | 0.937% | 21.82 |

Clicks fell **24.4%**, impressions **74.4%**. Higher CTR alongside lower exposure and worse average position is not proof of SEO improvement. Changed query mix may explain part of this; the workbook cannot isolate daily page/query causes. The latest 28-day window includes days before several October releases, so it cannot measure their full effect. Do not infer an algorithm penalty or credit recent performance changes from these aggregates.

## Priorities grounded in actual page evidence

Page metrics below cover the full 92-day export; they are not recent 28-day measurements. Query rows are separate evidence, not attributed to pages without the API.

| Priority | Observed opportunity | Dependency / action | Failure check and leading indicator |
|---|---|---|---|
| High, clocked | EN headline analyzer: 32 clicks / 26,677 impressions, position 13.92 | Preserve until October 27; then inspect page-query data and daily volume before judging title | If exposure remains low, diagnose distribution before rewriting. Monitor daily impressions and query mix. |
| High, clocked | FA cost calculator: 2 / 156, position 60.50; WordPress calculator query separately has 140 impressions | Preserve until November 5; then use page-query API before price-table work | Existing target: one calculator query reaches position 20 or better. Monitor page-query impressions first. |
| High, clocked | Qazvin: 1 / 445, position 61.73; Tehran: 1 / 304, position 79.18 | Preserve November 24 measurement; build Qazvin pillar only after read | Existing target: gain at least 20 positions. Monitor comparable queries; clicks are not conversions. |
| Medium, corrected locally | EN SEO best practices: 2 / 673, CTR 0.297%, position 12.61 | Correct unsupported ranking/citation claims across en/fa/ar; preserve URL, title, existing links and section structure | After deployment, check crawl/indexing, then compare 28 days with preceding equal period. If impressions stay below 100, mark inconclusive; if >=100 and CTR remains <=0.297%, review query/snippet fit without claiming causality. |
| Medium, already implemented | EN UTM tool: 0 / 412, position 38.63 | New supporting guide and tool links already shipped; allow exposure rather than adding another article | Inspect page-query impressions after 28 full days live. No supporting-guide success claim from a pre-release workbook. |
| Medium, owner-dependent | AI citations and business outcomes unmeasured | Run five frozen prompts separately in ChatGPT Search, Perplexity, AI Overviews and Gemini; supply GA4 property ID for referral/conversion work | Record engine, prompt, date, mode, mention, citation URL and position. Missing measurements mean unknown, not zero visibility. |

Existing Remido October 19, brand November 10, pricing November 16 and other clocks remain binding. No new posts, shared-template edits, redirects or tool/money-page edits in this batch.

## Local content corrections

`seo-best-practices.mdx` in **en/fa/ar** now:

- Opens with concrete reader task and eight checks.
- Replaces ranking and AI-citation guarantees in takeaways, FAQ and relevant sections with evidence-based limits.
- Links Core Web Vitals and AI-eligibility claims directly to official Google documentation beside explanations.
- Explains that indexed, snippet-eligible content uses ordinary SEO requirements for Google AI features; special AI schema/files are not required.
- Distinguishes lab diagnostics from real-world Core Web Vitals evidence.
- Removes automatic date-refresh advice and unsupported FAQ rich-result promises.
- Preserves publish date, slug, category, author, image, prior internal links and ten H2 sections; sets `updatedDate: 2026-10-16` with substantive edits and recomputes reading time.

Word counts: **EN 2,117; FA 2,236; AR 1,941**. H2 openers remain 40–60 words. Dates in manual blog validators now accept valid ISO modification dates between publication and today, replacing September 23 hardcoding. Added this EN post and its existing links to the manifest: coverage increases from eight to nine posts, **not all posts**.

## AEO/GEO assessment

Google explicitly says no additional optimization or schema is required for AI Overviews or AI Mode. Accessible useful text, relevant evidence, ordinary indexability and visible/schema consistency remain actionable. Source: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), checked October 16.

For the edited guide, source support improves two important reusable explanations, while other sections still rely heavily on a reference list. This is a focused correction, not an assertion that every section is citation-ready. E-E-A-T is a quality framework, not a single ranking factor: [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Performance thresholds: [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

Local `robots.txt` explicitly allows **OAI-SearchBot**, **Claude-SearchBot** and **PerplexityBot**, and wildcard rules allow Googlebot. Separate GPTBot/ClaudeBot rules concern training, not proof of search citations. Live CDN/WAF treatment was not checked. Existing llms.txt, Markdown mirrors and ai-catalog are discovery infrastructure; their presence is not measured citation uplift. ChatGPT Search, Perplexity, Claude, Gemini, Copilot and You.com citation rates remain **unmeasured**. Google AI Overviews and AI Mode should be sampled separately; GSC Web totals do not isolate them.

## Verification and rollout

Prepared locally; not pushed or deployed. Version advances to 1.3.0 for this optimization batch. Full build regenerates lastmod, corpora, catalog and Markdown through the ordered pipeline. Validation: `npm run lint` passed (0 errors, 0 warnings; 85 hints in existing templates/schema); `npm run build` passed (323 pages, 536 Markdown representations, hreflang parity for 318 URLs); `npm test` passed all 14 suites. Both manual blog checks passed for covered EN posts and all three edited translations. Additional assertions verified prior internal-link preservation, unchanged publish metadata/H2 counts, and date-gate rejection of invalid, pre-publication and future dates.

New blog observation window starts on actual deployment, not this local edit. If deployed October 16, review November 13 after 28 full days, allowing GSC lag. If deployed later, shift review accordingly. Freeze these three guide versions during that window; do not treat low volume as failure.

Normal pages must not be submitted through Google's Indexing API: eligibility is limited to JobPosting and livestream video pages. Use sitemap discovery and normal Search Console workflows.
