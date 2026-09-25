# AEO / GEO (AI search readiness) — 82/100

## Present

- **Crawler access:** robots.txt allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, CCBot, Bytespider (`public/robots.txt`). No JS-gating: Astro SSG ships readable HTML.
- **llms.txt** (`public/llms.txt`, 118 lines, discoverable via `rel="llms-txt"` in `Layout.astro:263`): genuine information architecture — company, services, 6 geo hubs, 24 tools, case studies, research guides, plus fa + ar hub sections and contact.
- **Answer-ready templates:** every blog post has TLDR `keyTakeaways`, FAQ Q&A, author box (`rel="author"`), TOC, related service/tool CTAs; tool pages have how-it-works + use-cases + FAQ (`ToolLayout.astro:123-157`); at least the SEO-title guide uses an `AEO Quick Answer` callout block.
- **Entity graph:** Organization knowsAbout lists AEO/GEO explicitly; author Person has sameAs cross-links.

## Gaps (ordered by leverage)

1. **llms.txt is `/en/`-centric (Medium).** Tools/blog deep links point at `/en/` paths; fa/ar sections list hubs only. Add top fa/ar tool + money-post URLs so non-English ingestion has anchors.
2. **No `llms-full.txt` (Medium).** Long-context models ingest one file best. Generate at build (concatenate llms.txt + key service/tool/guide bodies, cap ~500KB), link from llms.txt header.
3. **Question-H2 coverage uneven (Low-Medium).** FAQ exists everywhere, but in-body `##` headings phrased as questions (the unit AI engines extract) vary by post. Normalize on refresh: 3–5 question H2s per guide, each answered in the first 40–60 words.
4. **Off-site brand mentions thin (High effort, high GEO value).** Schema claims GitHub/LinkedIn/X presence; GEO citations follow third-party proof. Digital PR + listings + NAP consistency for the 6 service areas is the durable lever — no on-page shortcut.
5. **Don'ts:** no FAQPage-for-snippets chasing (retired), no fake reviews/ratings, no `QAPage`/`Speakable` theatre without genuine Q&A content.
