# Product Requirement Document (PRD)

## Project: WebABC Migration, Expansion, and SEO/AEO/GEO Optimization Strategy

---

## 1. Executive Summary & Objectives

This document establishes the product requirements for migrating **WebABC** from Next.js to **Astro**. The goal is to eliminate runtime framework overhead, maximize static performance, expand organic search visibility across multi-lingual paths (`/en`, `/fa`, `/ar`), and prepare the site for the next generation of discovery architectures (Search Engine, Answer Engine, and Generative Engine Optimization).

### Key Performance Indicators (KPIs)

- **Performance:** 100/100 Mobile & Desktop Core Web Vitals (LCP < 1.5s, INP < 50ms, CLS = 0).
- **SEO Visibility:** Zero organic traffic drop post-migration; 25% increase in indexing speed by search crawlers.
- **AEO/GEO Reach:** Increase selection rate in LLM citations (Google AI Overviews, Perplexity, OpenAI Search) for niche queries.
- **Engagement:** Increase Average Session Duration by 40% via interactive, zero-latency web tools.

---

## 2. Technical Scope & Migration Framework

### Architecture Philosophy

The site will move away from a monolithic JavaScript framework runtime. By utilizing Astro’s **Islands Architecture**, the client-side footprint will be kept close to 0 KB by default. Interactive tools will be treated as isolated, progressive islands.

```
       +-------------------------------------------------------+
       |                  Astro Layout Shell                   |
       |  (Pure Semantic HTML, Meta Tags, Global Tailwind CSS) |
       +-------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
+---------------------------------+               +---------------------------------+
|      Static Content Content     |               |     Client-Side Active Island   |
| (Markdown Blogs, Geo-Locations, |               |   (Isolated Client-Side Tool    |
|       Service Listings)         |               |    Pre-rendered, Hydra-free)    |
+---------------------------------+               +---------------------------------+
|         0 KB JavaScript         |               |    Lightweight Vanilla/UI Component|
+---------------------------------+               +---------------------------------+

```

### Infrastructure Mapping

- **Hosting Deployment:** Cloudflare Pages.
- **Dynamic Actions:** Cloudflare Worker Pages Adapter via standard `functions/api/`.
- **Content Processing:** Astro native Markdown compiler (`.md`) configured with custom remark plugins for enhanced semantic elements.

---

## 3. SEO / AEO / GEO Optimization Specifications

To capture standard search traffic along with AI search engines, the system architecture must explicitly support optimizations for standard crawlers, semantic answer engines, and LLM context collection windowing.

### 3.1 Standard & Generative Engine Visibility Matrix

| Feature Specification  | Standard SEO Focus                                               | AEO / GEO Focus (AI Overviews, Perplexity)                                               |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Document Semantics** | Semantic tags (`<article>`, `<section>`, `<nav>`) for DOM trees. | Clear, unambiguous question-and-answer patterns right above long-form analysis.          |
| **Metadata Injection** | High CTR titles, accurate descriptions, open graph tags.         | Directly target explicit answer schemas; pass direct reference citations.                |
| **Structural Schema**  | Breadcrumbs, WebSite definitions.                                | Extensive `JSON-LD` schemas for `Service`, `LocalBusiness`, and `HowTo`.                 |
| **Data Accessibility** | Quick mobile loading, optimized asset files.                     | Structured Markdown tables and ordered listings that LLM citation models scrape cleanly. |

### 3.2 Semantic Schema Protocol

Every newly generated section will automatically parse specialized structural graph representations injected dynamically inside the layout layout templates:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://webabc.ir/#website",
      "url": "https://webabc.ir/",
      "name": "WebABC"
    },
    {
      "@type": "WebApplication",
      "@id": "https://webabc.ir/en/tools/seo-title-checker/#webapp",
      "name": "SEO Title & Meta Checker",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5 support"
    }
  ]
}
```

### 3.3 Internationalization (i18n) & Alternate Routing

Based on target data structures, multi-lingual matching directories (`/en`, `/fa`, `/ar`) require exact automated bidirectional mappings:

- Astro routing must map explicit fallback strings.
- Injection of strict header link components inside every path root:

```html
<link
  rel="alternate"
  hreflang="en"
  href="https://webabc.ir/en/tools/headline-analyzer"
/>
<link
  rel="alternate"
  hreflang="fa"
  href="https://webabc.ir/fa/tools/headline-analyzer"
/>
<link
  rel="alternate"
  hreflang="x-default"
  href="https://webabc.ir/en/tools/headline-analyzer"
/>
```

---

## 4. Content Architecture & Expansion Requirements

To capitalize on organic trends found within performance profiles (e.g., target services, localization, client case-studies like _Ramzarz Negaran_), three layout content types will be added:

### 4.1 Niche Location Layouts

Target paths include strategic international operations: `/en/locations/dubai`, `/en/locations/muscat`, and `/fa/locations/tehran`.

- **AEO Trigger:** Clear information boxes containing explicit target parameters (Address, Service Availability, Regional Tech Regulations).
- **GEO Enrichment:** Dynamic maps constructed entirely out of clean web component wrappers alongside text descriptions summarizing physical accessibility and operational parameters.

### 4.2 Corporate Service Frameworks

Detailed content paths outlining standard delivery parameters (e.g., UI/UX Consulting, Performance Optimization, Custom Markdown Engine Setups).

- **Required Design Modules:**
- **Core Capability Matrices:** Explicit breakdown tables for direct comparison.
- **Direct Proof Assertions:** Explicit link structures connecting directly to case study portfolios (such as existing profiles for specialized corporate assignments).

### 4.3 Long-form Authority Blog Posts

Clean structural architectures parsing static Markdown fields natively with Astro.

- **Design Rule:** Strict restriction on block layouts. Long texts must be separated every 300 words with explicit takeaways or summarizing markdown bullet blocks to match high-priority vector-index retrieval targets used by modern search crawlers.

---

## 5. Client-Side Free Tools Specification (Zero-API / Zero-Backend)

To build strong inbound internal linkage architectures and target existing top-performing search impressions (like `seo title checker` and `headline analyzer`), the website will ship four completely client-side utility apps.

These will run without servers, databases, or third-party execution endpoints, maintaining ultra-low execution latency.

### 5.1 Tool 1: SEO Title & Meta Tag Previewer

- **User Value Proposition:** Validates and visually renders pixel widths for search engine view frames across desktop and mobile form factors.
- **Functional Mechanics:**
- Tracks input lengths against strict visual layout truncation limits (e.g., 60 characters or 600px limits for title values).
- Generates live, visual CSS representations mimicking Google and AI Overview layouts.

### 5.2 Tool 2: Semantic Keyword Density Analyzer

- **User Value Proposition:** Analyzes text structures to identify over-optimization markers before publication.
- **Functional Mechanics:**
- Normalizes pasted strings via client-side regex arrays (stripping down connecting prepositions and stop words based on active language selection).
- Displays clear sorted maps tracking single-word and phrase recurrences down to exact density percent weights.

### 5.3 Tool 3: Clientside JSON Formatter & Validator

- **User Value Proposition:** Safely parses, maps, formats, and structuralizes raw JSON payloads without data traversing structural servers.
- **Functional Mechanics:**
- Executes native browser `JSON.parse` commands mapping error catch statements into clean editor highlights.
- Applies clear, configurable visual tab formatting rules with instant copy-to-clipboard functionalities.

### 5.4 Tool 4: Comprehensive Robots.txt & Sitemap Graph Builder

- **User Value Proposition:** Creates standardized directives for web crawlers using a step-by-step interactive setup.
- **Functional Mechanics:**
- Collects custom parameters via a sequence of client form selectors (handling standard user-agent rules, crawl-delays, and targeted sitemap paths).
- Generates instantly downloadable `.txt` files directly out of state memory strings via explicit client data-blob generation methods.

---

## 6. Migration Risk Mitigation & Launch Protocol

### 6.1 Routing & Redirection Engine

To avoid any traffic loss from existing assets during the transition, a strict redirect verification matrix must be applied at the edge layer:

- A explicit `_redirects` routing config mapping table will be compiled for the Cloudflare Pages environment.
- Every existing tracking link must be mapped explicitly to maintain its canonical target structure:

```text
# /public/_redirects
/en/tools/headline-analyzer  /en/tools/headline-analyzer  200
/fa/tools/slug-generator      /fa/tools/slug-generator      200

```

### 6.2 Pre-Launch Validation Criteria

Before migrating traffic to the new setup, the build environment must meet the following automated validation targets:

```
[Build Compilation]
       │
       ▼
[Check HTML Output] ──► Validate absolute self-referential <link rel="canonical"> tags exist.
       │
       ▼
[Check Multi-lingual] ──► Validate perfect multi-lingual bidirectional <link rel="alternate" hreflang> logic matches.
       │
       ▼
[Run Lighthouse CI] ──► Block release pipeline if performance scoring falls below 95 on mobile targets.
       │
       ▼
[Deploy to Edge]

```
