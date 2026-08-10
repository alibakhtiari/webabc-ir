# WebABC — High-Performance Multilingual Web & SEO Platform

A modern, fast, multilingual digital marketing and web development agency website built with Astro v5, deployed on Cloudflare Pages.

## 🌍 Supported Languages

- **Persian / Farsi (`fa`)** — Default locale (RTL)
- **English (`en`)** — LTR
- **Arabic (`ar`)** — RTL

## 🚀 Key Features & SEO / GEO / AEO Architecture

- **Zero-JS Static Delivery**: Utilizing Astro's Islands Architecture to eliminate runtime framework overhead.
- **Multilingual i18n**: Bidirectional routing and static generation mapping (`/en`, `/fa`, `/ar`).
- **Semantic Schema Graphs**:
  - `BlogPosting` JSON-LD with full `datePublished`, `dateModified`, `wordCount`, and `inLanguage` attributes.
  - `Person` schema with `sameAs` authority profiles (LinkedIn, GitHub, X).
  - `WebApplication` schema across all 24 interactive tools.
  - `Service` & `ProfessionalService` schemas across location-based service area landing pages.
- **AI Engine Optimization (GEO/AEO)**:
  - Quotable key takeaway callouts (`<TLDR />`) and question-based `FAQPage` schemas for AI engine citability (ChatGPT, Perplexity, Google AI Overviews).
  - Explicit AI crawler permissions in `public/robots.txt` (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.).
  - Structured `/llms.txt` listing all site pages and key entity offerings.
- **Instant Search Engine Indexing**:
  - `IndexNow` integration (`scripts/indexnow.mjs`) automatically pings Bing, Yandex, and Seznam upon deployment.
  - Git-based sitemap `lastmod` generator (`scripts/resolve-sitemap-lastmod.mjs`) for content-accurate re-indexing.
- **Edge Security Headers**: Pre-configured in `public/_headers` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **Client-Side SEO Utilities**: 24 free interactive tools (Robots Generator, Keyword Density Analyzer, SEO Title Checker, JSON Formatter, Cost Calculator, etc.).

## 📦 Tech Stack

- **Framework**: Astro v5 (Static Output / SSG)
- **Deployment**: Cloudflare Pages / Workers
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)

## 🛠 Development & Scripts

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/alibakhtiari/webabc-ir.git
cd webabc-ir
npm install
npm run dev
```

Visit `http://localhost:4321` to view the site locally.

### Key Commands

- `npm run dev`: Start local development server.
- `npm run build`: Prebuild assets and generate static production site in `dist/`.
- `npm run preview`: Preview production build locally.
- `npm run indexnow`: Manually trigger IndexNow URL submission for Bing and Yandex.
- `npm run translations:check`: Validate key consistency across translation files.
- `npm run check:404`: Verify 404 page routes across all locales.
- `npm run check:links`: Check for internal broken link references.
- `npm run test`: Full CI test suite (translations check, build, 404 check, link validation).
- `npm run deploy`: Build, deploy to Cloudflare Pages, and submit URLs to IndexNow.

## 🔧 Configuration

- **Alternate Links**: The global `<Layout />` dynamically injects bi-directional self-referential canonicals and `hreflang` alternate links across all 3 languages.
- **Sitemap**: Automatically generated using `@astrojs/sitemap` matching all static routes with content-accurate `lastmod` dates.

## 📝 Content Management

- **Portfolios & Blogs**: Managed as MDX collections inside `src/content/`.
- **Service Areas & Locations**: Managed via localized dictionary files in `src/i18n/[lang]/service-areas.json`.
- **Translations**: Standard JSON namespaces inside `src/i18n/[lang]/`.

---

Built with ❤️ by [Ali Bakhtiari](https://aliib.ir/) & WebABC Team

