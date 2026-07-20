# WebABC - Astro Multilingual Website

A modern, fast, multilingual digital marketing and web development agency website built with Astro v5, deployed on Cloudflare Pages.

## 🌍 Supported Languages

- **Persian/Farsi (fa)** - Default locale (RTL)
- **English (en)** - LTR
- **Arabic (ar)** - RTL

## 🚀 Features

- **Zero-JS Static Delivery**: Utilizing Astro's Islands Architecture to eliminate runtime framework overhead.
- **Multilingual i18n**: Bidirectional routing and static generation mapping (`/en`, `/fa`, `/ar`).
- **SEO/AEO/GEO Optimized**: Semantic schema graphs (`WebApplication`, `FAQPage`, etc.), hreflang alternate link tags, and structured AEO sideboards.
- **Client-Side SEO Utilities**: Free non-API utility tools (Robots Generator, Keyword Density Analyzer, SEO Title Checker, JSON Formatter, etc.).
- **Performance**: High performance scoring via native Astro image optimization (`<Image />`) and SVGO build-time processing.
- **Validation**: Strict translation key consistency checker script.

## 📦 Tech Stack

- **Framework**: Astro v5 (Static Output)
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 🛠 Development

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

Visit `http://localhost:4321` to see the site.

### Key Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build static pages to `dist/`.
- `npm run preview`: Preview production build locally.
- `npm run translations:check`: Validate key consistency across translation files.
- `npm run deploy`: Deploy static site to Cloudflare Pages.

## 🔧 Configuration

- **Alternate Links**: The global `<Layout />` dynamically injects bi-directional self-referential canonicals and `hreflang` alternate links.
- **Sitemap**: Automatically built using `@astrojs/sitemap` to match all 163 static routes.

## 📝 Content Management

- **Portfolios / Blogs**: Managed statically inside `src/content/` collections.
- **Service Areas / Locations**: Configured via localized dictionary files in `src/i18n/[lang]/service-areas.json`.
- **Translations**: Standard JSON namespaces inside `src/i18n/[lang]/`.

---

Built with ❤️ by WebABC Team
