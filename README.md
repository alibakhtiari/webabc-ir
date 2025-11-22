# WebABC - Next.js Multilingual Digital Marketing Website

A modern, multilingual digital marketing and web development agency website built with Next.js 16, deployed on Cloudflare Pages.

## 🌍 Supported Languages

- **English (en)** - Default for international visitors
- **Persian/Farsi (fa)** - Default for visitors from Iran, Afghanistan, Tajikistan
- **Arabic (ar)** - Default for visitors from GCC countries and Middle East

## 🚀 Features

- **Multilingual i18n**: Automatic language detection based on visitor's country (Cloudflare geolocation)
- **Dynamic Routing**: All pages support dynamic language switching with `/[lang]/` prefix
- **SEO Optimized**: 
  - Dynamic meta tags for each language
  - JSON-LD Schema markup for organization, services, articles
  - Sitemap and robots.txt support
  - Proper hreflang tags
- **Portfolio System**: Dynamic portfolio pages with case studies
- **Service Areas**: Location-specific pages with geolocation support
- **Blog**: Markdown-based multilingual blog system
- **Contact Forms**: Integrated contact and consultation request forms
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Cloudflare Workers (Edge)
- **Deployment**: Cloudflare Pages via @opennextjs/cloudflare
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React

## 🛠 Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/alibakhtiari/webabc-react.git

# Navigate to project directory
cd webabc-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server locally
npm run lint      # Run ESLint
npm run preview   # Build and preview on Cloudflare Workers locally
npm run deploy    # Build and deploy to Cloudflare Pages
```

## 📁 Project Structure

```
├── src/
│   ├── app/[lang]/          # Next.js App Router pages (multilingual)
│   ├── components/          # Reusable React components
│   ├── contexts/            # React contexts (LanguageContext)
│   ├── i18n/                # Translation files (en, fa, ar)
│   ├── lib/                 # Utility functions and data
│   └── views/               # Page-level view components
├── functions/               # Cloudflare Pages Functions
│   └── _middleware.js       # Geolocation-based routing
├── public/                  # Static assets
├── open-next.config.ts      # OpenNext Cloudflare configuration
├── next.config.ts           # Next.js configuration
└── wrangler.toml            # Cloudflare Workers configuration
```

## 🌐 Deployment

This project is configured for deployment on Cloudflare Pages using OpenNext.

### Deploy to Cloudflare Pages

```bash
# Build and deploy
npm run deploy
```

### Environment Variables

Set these in your Cloudflare Pages dashboard:
- `NODE_VERSION`: `18` (or higher)

## 🗺 Adding New Service Area Locations

To add more cities/locations to the Service Areas page:

### 1. Update Translation Files

Edit the following files for each language:
- **English**: `src/i18n/en/service-areas.json`
- **Arabic**: `src/i18n/ar/service-areas.json`
- **Persian**: `src/i18n/fa/service-areas.json`

### 2. Add Location Entry

Find the `"locations"` array and add a new object:

```json
{
  "name": "City Name",
  "slug": "city-slug",
  "country": "Country Name",
  "description": "Brief description of services in this city",
  "longDescription": "Detailed description for the location page",
  "services": [
    "Service 1",
    "Service 2",
    "Service 3"
  ],
  "image": "/images/locations/city-name.jpg",
  "benefits": [
    "Benefit 1",
    "Benefit 2"
  ],
  "stats": {
    "projects": "50+",
    "clients": "35+",
    "experience": "5+"
  }
}
```

### 3. Add Location Image

Place images in `public/images/locations/` folder:
- Recommended size: 1200x800 pixels
- Format: JPG or WebP
- Filename: `city-name.jpg`

### 4. Example Locations

#### English (Abu Dhabi):
```json
{
  "name": "Abu Dhabi",
  "slug": "abu-dhabi",
  "country": "UAE",
  "description": "Offering world-class web development and digital marketing services to businesses in Abu Dhabi.",
  "services": [
    "Web Design & Development",
    "SEO Optimization",
    "Mobile Applications",
    "E-commerce Solutions"
  ],
  "image": "/images/locations/abu-dhabi.jpg"
}
```

#### Persian (Isfahan):
```json
{
  "name": "اصفهان",
  "slug": "isfahan",
  "country": "ایران",
  "description": "ارائه خدمات حرفه‌ای طراحی وب و دیجیتال مارکتینگ به کسب‌وکارها در اصفهان.",
  "services": [
    "طراحی و توسعه وب",
    "بهینه‌سازی سئو",
    "توسعه اپلیکیشن موبایل",
    "راهکارهای تجارت الکترونیک"
  ],
  "image": "/images/locations/isfahan.jpg"
}
```

### Current Locations

**English**: Muscat (Oman), Dubai (UAE)  
**Persian**: Tehran (Iran), Qazvin (Iran)  
**Arabic**: مسقط (Muscat), دبي (Dubai)

## 📝 Adding Blog Posts

1. Create markdown files in `public/blog/[lang]/` directory
2. Add frontmatter with metadata:
```markdown
---
title: "Post Title"
date: "2024-01-01"
author: "Author Name"
excerpt: "Brief description"
---

Your content here...
```

## 🔧 Configuration

### Locale Detection

The middleware (`functions/_middleware.js`) automatically detects visitor country and redirects:
- Persian countries (IR, AF, TJ) → `/fa`
- Arabian countries (GCC + MENA) → `/ar`
- All other countries → `/fa` (default)

### Modifying Default Language

To change the default language, update `defaultLocale` in:
- `functions/_middleware.js`

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Translation Not Showing

1. Check if the translation key exists in all language files
2. Verify JSON syntax (no trailing commas)
3. Clear browser cache and reload

## 📄 License

This project is proprietary and confidential.

## 🤝 Support

For support, email: ali.bakhtiarii@gmail.com

---

Built with ❤️ by WebABC Team
