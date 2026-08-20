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
- **Edge Security Headers**: Pre-configured in `public/_headers` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **Client-Side SEO Utilities**: 24 free interactive tools (Robots Generator, Keyword Density Analyzer, SEO Title Checker, JSON Formatter, Cost Calculator, etc.).

## 📦 Tech Stack

- **Framework**: Astro v5 (`astro@^7.2.0`, Static Output / SSG)
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/typography`, `tailwind-merge`)
- **Deployment**: Cloudflare Pages & Workers (`wrangler`)
- **Language**: TypeScript (`^5.9.3`)
- **Tooling & Utilities**: `qrcode`, `resend`, `sharp`

## 🛠 Development & Commands

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
- `npm run build`: Build static production site in `dist/`.
- `npm run preview`: Preview production build locally.
- `npm run deploy`: Build and deploy to Cloudflare Pages.
- `npm run lint`: Lint TypeScript and source files with ESLint.

## 🔧 Configuration

- **Alternate Links**: The global `<Layout />` dynamically injects bi-directional self-referential canonicals and `hreflang` alternate links across all 3 languages.
- **Sitemap**: Automatically generated using `@astrojs/sitemap` matching all static routes.

## 📝 Content Management

- **Portfolios & Blogs**: Managed as MDX collections inside `src/content/`.
- **Service Areas & Locations**: Managed via localized dictionary files in `src/i18n/[lang]/service-areas.json`.
- **Translations**: Standard JSON namespaces inside `src/i18n/[lang]/`.

---

Built with ❤️ by [Ali Bakhtiari](https://aliib.ir/) & WebABC Team
