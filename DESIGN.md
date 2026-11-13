# WebABC Design System & UI Specifications

**Repository**: `webabc-ir`  
**Framework**: Astro 7 + Tailwind CSS v4 + Cloudflare Workers  
**Supported Locales**: `en` (LTR), `fa` (RTL), `ar` (RTL)

---

## 1. Design Philosophy

WebABC is engineered for **sub-second speed, high-conversion CRO, and modern Generative Engine Optimization (GEO/AEO)**:
1. **Performance as an Aesthetic**: No bloated runtime frameworks on static content. Zero client-side hydration for static landing pages. Sub-50ms TTFB at the edge.
2. **First-Class RTL & LTR Symmetrical Parity**: Persian and Arabic interfaces are designed with native typography and inverted directional padding rather than after-thought CSS transforms.
3. **Structured AEO/GEO Readability**: Clean semantic HTML, definition-first `.aeo-quick-answer` capsules, and dual-format text/markdown content negotiation for AI retrieval.

---

## 2. Layout & Grid Standards

- **Maximum Container Width**: Standardized strictly at `max-w-7xl` (`80rem` / `1280px`).
  - Every page wrapper, service content, tool workspace, blog article, and CTA container matches the `max-w-7xl` boundary.
  - Removes all narrower legacy bottlenecks (`max-w-4xl`, `max-w-5xl`, `max-w-6xl`).
- **Responsive Padding**:
  - Horizontal gutters: `px-4 sm:px-6 lg:px-8`.
  - Section vertical rhythm: `py-16 md:py-24`.
- **Zero Horizontal Overflow**: All wide grids, tables, and code snippets use `overflow-x-auto` or `break-words` with rigid viewport guardrails (`320px`, `390px`, `768px`, `1024px`, `1440px`).

---

## 3. Typography & Fonts

Self-hosted in `public/fonts/` with `@font-face` definitions to eliminate render-blocking external requests:

| Locale | Direction | Font Family | Variable / CSS Class |
| :--- | :--- | :--- | :--- |
| **English (`en`)** | LTR | `Lato`, system-ui, sans-serif | `font-sans` |
| **Persian (`fa`)** | RTL | `IRANSansX`, sans-serif | `font-persian` |
| **Arabic (`ar`)** | RTL | `IBM Plex Sans Arabic`, `Cairo`, sans-serif | `font-arabic` |

---

## 4. Color Palette & Design Tokens

Configured in `src/styles/globals.css` with CSS Custom Properties and Tailwind v4 theme:

- **Primary Brand Color**: `#2d59c3` (`hsl(var(--primary))`)
- **Primary Foreground**: `#ffffff`
- **Background (Light)**: `#ffffff`
- **Background (Dark)**: `#020617` / `slate-950`
- **Success / Conversion Green**: `#10b981` (Emerald) — Used for live badges, trust checks, and positive metrics.
- **Warning / Speed Amber**: `#f59e0b` (Amber) — Used for performance highlights and instant calculators.
- **Card Surfaces**:
  - Light mode: `bg-white` with `border-gray-100` / `border-gray-200/80` and `shadow-xs`.
  - Dark mode: `bg-slate-900` with `border-slate-800` and `shadow-lg`.

---

## 5. Key Reusable Components

### Header & Navigation (`Navbar.astro` / `Header.astro`)
- Floating pill design with `rounded-full border border-white/20 bg-white/70 backdrop-blur-xl`.
- Responsive navigation breakpoint:
  - Desktop menu (`lg:flex` / `1024px+`): Displays brand logo, services mega-menu, direct nav items, language switcher, and consultation CTA.
  - Mobile menu (`lg:hidden`): Displays compact language selector and mobile drawer button (`☰`).

### AEO Quick Answer Capsule (`.aeo-quick-answer`)
- High-visibility definition block positioned above the fold on service pages.
- Purpose: Direct answer extraction for Google AI Overviews, Perplexity, and ChatGPT Search.
- Styling: Light primary tint, animated live pulse indicator, high-entropy concise summary.

### Conversion Call to Action (`CTASection.astro`)
- Spans full width of the `max-w-7xl` container matching the footer column bounds.
- Dual-path conversion: Modal consultation form + direct prefilled WhatsApp channel.
