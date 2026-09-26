# Blog Rewrite Contract — webabc.ir

**Scope:** deep rewrite of all 36 EN posts, mirrored to `fa` and `ar` (108 files).
**Target:** blog-skill quality thresholds. Audit finding this addresses: `docs/audit/findings/05-content-blog.md` §3 (median 571 words, 23/36 EN posts under 900 words under "Guide" titles).

Every rewrite agent — human or subagent — must follow this document exactly. It is the single source of truth for the job.

---

## 1. Files and invariants

| Invariant | Rule |
|---|---|
| **Filename / slug** | **NEVER change.** `src/content/blog/{lang}/{slug}.mdx`. en/fa/ar filenames are byte-identical across the three locales; changing one breaks hreflang, the sitemap and every internal link. |
| **`category`** | Keep exactly as-is. It drives `articleSection` schema and the `serviceToolDict` CTA mapping. |
| **`image`** | Keep the value **exactly as this file has it today** — do not "harmonise" it with the other locales. Four posts legitimately differ between locales (quoting style and, for the trends pair, cover choice). A wrong path is a broken OG image. |
| **`imageAlt`** | Keep, or improve if the body changed meaning. Must stay descriptive. |
| **`author`** | Keep exactly as-is. `fa`/`ar` mix the Latin and native-script forms on purpose — it is an alias set consumed by `blog/[slug].astro`, so "fixing" it breaks author disambiguation. |
| **`tags`** | Keep, extend if new sections introduce a genuinely new facet. Never delete all of them. |
| **Internal links** | Keep every existing internal link. You may add more. Never reduce the count. |
| **Language** | `en` posts are rewritten in English. `fa`/`ar` are **translations of the new EN body**, not independent rewrites. |

---

## 2. Frontmatter schema (build breaks if violated)

From `src/content.config.ts`. Fields marked **required** must be present and non-empty.

```
title         string   REQUIRED
description   string   REQUIRED
date          string   REQUIRED   ← DO NOT CHANGE (publish date; changing it backdates/misleads)
updatedDate   string   optional   ← SET TO 2026-09-23 (a real rewrite is a real edit)
category      string   REQUIRED   ← unchanged
tags          string[] optional
author        string   optional   ← unchanged
image         string   REQUIRED   ← unchanged
imageAlt      string   optional
readTime      number   optional   ← RECOMPUTE: Math.max(1, Math.round(words / 200))
keyTakeaways  string[] optional   ← MUST remain present, 4-5 items
faq           {question,answer}[] optional  ← MUST remain present, 3-5 items
```

**Never remove `keyTakeaways` or `faq`.** They are 100% coverage today across all 108 posts and they back the `speakable` and `FAQPage` schema. Losing them is a regression.

### Title and description limits

| Field | EN / FA | AR | Why |
|---|---|---|---|
| `title` | **≤ 60 characters** | ≤ 60 chars (judge by pixel width, RTL truncates earlier) | Truncation with `…` cuts the value proposition |
| `description` | **150–160 characters** | 150–160 | Below 120 Google pads badly; above 160 it truncates |

Currently over limit: **en 4, fa 8, ar 6** titles. Fix every one you touch.

---

## 3. Length target

| Current EN word count | Target for the rewrite |
|---|---|
| **< 1,400 words** (31 posts) | **1,500–2,400 words.** This is a genuine expansion. |
| **≥ 1,400 words** (5 posts) | **Do NOT pad.** Restructure for answer-first formatting, fix title/meta, expand only sections that are genuinely thin. Target band 1,500–2,500. |

**Hard minimum: 1,500 words for any post currently under 1,400.**

> **Anti-padding rule.** Length is a *proxy* for depth, not the goal. If you cannot add a section that a practitioner would actually find useful, do not add it — instead improve the sections that exist. A bloated post with filler is a *worse* outcome than a tight 1,400-word post, and the May 2026 quality baseline rewards depth of coverage, not word count.

Word counting excludes code fences, JSX, and link markup (matches the site's `wordCount` schema computation).

---

## 4. Structure rules

### Heading hierarchy
- `H1` = the post `title` only (rendered by the template — **never write an H1 in the body**).
  *(The corpus currently has **zero** stray body H1s. `# Allow AI Search Retrieval Engines`
  in `ai-search-optimization-guide-2026` is a robots.txt comment **inside a code fence** —
  verified: stripping fences first leaves no `^# ` matches. Do not "fix" code comments.)*
- Body starts at `## ` (H2). Never skip H2 → H4.

### Heading convention — match the file, do not convert it
The corpus already mixes two conventions and **both are correct here**:

- **Numbered H2s** (`## 1. Core Pillars…`) — keep the convention. After any section is
  added or removed, **renumber so the sequence is contiguous and sequential.** A gap or a
  duplicate number is a visible quality tell.
- **Question H2s** (`## What is Generative Engine Optimization?`) — keep the convention.
  These are the better format for AI citation, so never flatten them into numbered headings.

Inspect the file first and follow whatever it already does. `### ` for sub-sections under an H2.

### Answer-first formatting (the AEO requirement)
**Every H2 must open with a direct answer of roughly 40–60 words** that fully answers the heading as a question — readable and quotable on its own, before any list, table or elaboration.

After that opener, the section should hold a **self-contained 120–180 word passage** that could be lifted by an AI engine with the citation still making sense.

This is the single highest-value structural change in the whole job: it is what converts a post from "listed" to "quoted with attribution".

### Paragraph and list limits
- Paragraph **≤ 150 words**. Split longer ones.
- Use `**bold lead-ins**` and short lists — the existing posts already do this; keep the density.
- **No horizontal-rule soup.** At most one `---` in the body, and only as a real scene break.

### Section plan (how to find the extra depth)
For a post at ~400 words aiming at 1,800, add depth in this order — all of it requires **no invented statistics**:

1. **Definitions** — "What X actually is", scoped precisely.
2. **Decision frameworks** — when to choose A vs B, with the criteria spelled out.
3. **Step-by-step procedure** — numbered, actionable, in the order a person would do it.
4. **Checklists** — the audit showed checklists and pricing intent are the two formats that convert on this site.
5. **Failure modes** — the common mistakes, and what each one costs.
6. **Worked examples** — concrete scenarios (fictional-but-plausible businesses are fine; **do not present them as real client results**).
7. **Comparison tables** — options side by side on real, non-invented dimensions.
8. **FAQ expansion** — 2–4 genuinely new questions, added to the `faq` frontmatter *and* answered in the body.

---

## 5. HARD RULES (violations block the deliverable)

| # | Rule |
|---|---|
| 1 | **Fabricate zero statistics.** Do not introduce any new percentage, study, survey, "X% of marketers…", revenue figure or benchmark unless it already exists in the post you are editing. Expand with structure and explanation instead. If you cannot write a section without a number you cannot verify, write a different section. |
| 2 | **Do not invent client results.** Real case studies already in the posts (Behrad DC, Mehromah, Ramzarz Negaran, London Rug Cleaning, Behrad Dental) may be kept. Never create new ones. |
| 3 | **Do not change `date`.** Only `updatedDate` moves, to `2026-09-23`. |
| 4 | **Do not change the filename.** |
| 5 | **Do not drop `faq` or `keyTakeaways`.** |
| 6 | **Do not emit an H1** in the body. |
| 7 | **Do not remove internal links.** |
| 8 | **Do not add a second `<title>`-length blowout** — titles ≤ 60 chars. |
| 9 | **Preserve MDX validity.** Unclosed JSX, a stray `<` or `{` outside code fences breaks `astro build`. Test your own file. |
| 10 | **Never fabricate `AggregateRating`/`Review`** — not applicable to blog posts, but do not add star ratings to prose either. |

---

## 6. Translation rules (`fa`, `ar`)

The `fa` and `ar` files are **translations of the rewritten EN file**, not independent rewrites.

| Rule | Detail |
|---|---|
| **Slug** | identical to EN — never change |
| **Section order & count** | identical to EN |
| **H2 numbering** | identical (`## 1.` … `## N.`) |
| **`faq` count** | identical to EN |
| **`keyTakeaways` count** | identical to EN (translate, do not summarise away) |
| **Internal link paths** | identical — `/en/…` becomes `/fa/…` or `/ar/…` (swap the locale segment only) |
| **`image`, `imageAlt`, `category`, `author`, `date`** | `image` and `date` byte-identical; `category` byte-identical (it is an English enum used for CTA mapping — **do not translate it**); `imageAlt` and `author` translated/localised |
| **`title`, `description`** | localised **and** ≤ 60 / 150–160 chars |
| **Numbers, dates, currency** | localise: `fa` uses Persian digits and تومان where the EN discusses pricing; `ar` uses Arabic-Indic digits where natural and درهم/ريال for GCC framing |
| **Register** | `fa`: formal (نوشتاری), no colloquialisms. `ar`: Modern Standard Arabic (فصحى), not dialect |
| **Real-world examples** | swap for locale-relevant ones where the EN example is US-only — but never invent client results (§5 rule 2) |

---

## 7. Self-check before you submit a file

Agents working **in parallel must NOT run `npm run build` or `npm test`** — concurrent
builds collide on `dist/`. The coordinator runs both once, after every agent has landed.

What each agent validates on its own files:

```bash
cd /Users/alib/webabc-ir
python3 - <<'EOF'
import re,glob,sys
bad=[]
for f in sys.argv[1:]:
    raw=open(f,encoding='utf-8').read()
    e=raw.find('\n---',3); fm=raw[:e]; b=raw[e+4:] if e>0 else ''
    t=re.search(r"^title:\s*(.+)$",fm,re.M)
    d=re.search(r"^description:\s*(.+)$",fm,re.M)
    t=t.group(1).strip().strip("'\"") if t else ''
    d=d.group(1).strip().strip("'\"") if d else ''
    body=re.sub(r'```.*?```','',b,flags=re.S); body=re.sub(r'<[^>]+>','',body)
    body=re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',body); body=re.sub(r'[#*`\-]>','',body)
    w=len(body.split())
    if w<1500 and 'DO_NOT_PAD' not in f: bad.append(f'{f}: {w} words (<1500)')
    if len(t)>60: bad.append(f'{f}: title {len(t)}ch (>60)')
    if not (150<=len(d)<=160): bad.append(f'{f}: desc {len(d)}ch (want 150-160)')
    if not re.search(r'^updatedDate:\s*2026-09-23',fm,re.M): bad.append(f'{f}: updatedDate not 2026-09-23')
    if 'keyTakeaways:' not in fm: bad.append(f'{f}: keyTakeaways MISSING')
    if re.search(r'^faq:',fm,re.M) is None: bad.append(f'{f}: faq MISSING')
    if re.search(r'^image:',fm,re.M) is None: bad.append(f'{f}: image MISSING')
    if re.search(r'^category:',fm,re.M) is None: bad.append(f'{f}: category MISSING')
    if re.search(r'^date:',fm,re.M) is None: bad.append(f'{f}: date MISSING')
    # H1 check must ignore code fences (robots.txt comments look like "# ")
    nofence=re.sub(r'```.*?```','',b,flags=re.S)
    if re.search(r'^# ',nofence,re.M): bad.append(f'{f}: stray H1 in body')
print('\n'.join(bad) if bad else 'ALL CHECKS PASS')
EOF
```

**Posts already ≥1,400 words are PAD-EXEMPT** — do not inflate them to hit 1,500. Six of them:
`ai-search-optimization-guide-2026`, `wordpress-seo-optimization-guide-2026`,
`how-much-does-a-website-cost-2026`, `best-title-tag-checker-tools-2026`,
`wordpress-website-cost-guide-2026`, `local-seo-services-guide-2026`.
For these, apply §4 answer-first formatting + §2 title/description limits and report the
word count you left them at instead of padding.

Then the coordinator runs:

```bash
cd /Users/alib/webabc-ir && npm run build && npm test
```

**A rewrite that does not build is not a rewrite.**

---

## 8. Anti-AI-slop requirements

The blog skill's reviewer scores for AI tells. Avoid:

- Triadic lists of abstract nouns ("faster, smarter, better")
- "In today's fast-paced digital landscape" type openers — **no throat-clearing**
- Every paragraph starting with the same construction
- Hedge stacking ("it's important to note that…", "arguably…")
- Empty intensifiers ("crucial", "game-changing", "revolutionary") with nothing behind them
- A closing paragraph that merely restates the opening
- Bold-label-only paragraphs where the label says nothing

Write like the practitioner who has actually run the procedure being described. Concrete verbs, specific sequencing, real constraints.

---

**Back to:** `docs/audit/ACTION-PLAN.md` (Phase 2.2 — now recorded under Completed)
