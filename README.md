# WebABC - Next.js Multilingual Digital Marketing Website

A modern, multilingual digital marketing and web development agency website built with Next.js 16, deployed on Cloudflare Pages.

## 🌍 Supported Languages

- **English (en)** - Default for international visitors
- **Persian/Farsi (fa)** - Default for visitors from Iran, Afghanistan, Tajikistan
- **Arabic (ar)** - Default for visitors from GCC countries and Middle East

## 🚀 Features

- **Multilingual i18n**: Automatic language detection based on visitor's country (Cloudflare geolocation).
- **Dynamic Routing**: URL-based language switching (`/[lang]/`).
- **SEO Optimized**: Dynamic meta tags, JSON-LD Schema, sitemap, and hreflang support.
- **Performance**: Built with Next.js App Router and Cloudflare Edge.
- **Components**: Modern UI with shadcn/ui and Tailwind CSS.
- **Content**: Markdown-based blog and portfolio system.

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Deployment**: Cloudflare Pages (via `@opennextjs/cloudflare`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React

## 🛠 Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/alibakhtiari/webabc-react.git
cd webabc-react
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app.

### Key Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Build and preview locally with Cloudflare runtime
- `npm run deploy`: Deploy to Cloudflare Pages

## 🔧 Configuration

### Locale Detection

The middleware (`src/middleware.ts`) automatically detects the visitor's country using Cloudflare headers (`cf-ipcountry`) and redirects them to the appropriate language:
- **Persian (fa)**: IR, AF, TJ
- **Arabic (ar)**: GCC & MENA countries
- **English (en)**: All other regions

### Environment Variables

Configure these in your Cloudflare Pages dashboard:
- `NODE_VERSION`: `18` (or higher)
- `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., `https://webabc.ir`)

## 📝 Content Management

- **Blog Posts**: Add markdown files to `public/blog/[lang]/`.
- **Service Areas**: Manage locations in `src/i18n/[lang]/service-areas.json`.
- **Translations**: Update JSON files in `src/i18n/[lang]/`.

## 🤝 Support

For support, email: ali.bakhtiarii@gmail.com

---

Built with ❤️ by WebABC Team
