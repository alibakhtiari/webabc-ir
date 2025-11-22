# Website Verification & Optimization Plan

## 1. Sitemap Verification
**Objective:** Ensure all pages listed in sitemaps are accessible and return 200 OK status.

**Target URLs:**
- **English (`/en`)**:
  - `/en` (Home)
  - `/en/about`
  - `/en/services`
  - `/en/portfolio`
  - `/en/blog`
  - `/en/contact`
  - `/en/faq`
  - `/en/resources`
  - `/en/tools`
  - `/en/service-areas`
  - `/en/local-seo`
  - `/en/seo-services`
  - `/en/web-development-services`
  - `/en/wordpress-woocommerce-development`
- **Persian (`/fa`)** & **Arabic (`/ar`)**: Same structure as above.

**Action:**
- automated script or manual check to visit each URL.
- Verify no 404s or 500s.

## 2. Translation & Metadata Verification
**Objective:** Confirm that titles, meta descriptions, and page content match the requested language.

**Checks:**
- **Title Tag:** Must be in the correct language.
- **Meta Description:** Must be in the correct language.
- **H1 Heading:** Must be in the correct language.
- **UI Elements:** Buttons, navigation, footer must be translated.

**Specific Fixes Applied (Verification Needed):**
- `/fa/service-areas`: Verify title is Persian.
- `/fa/local-seo`: Verify title is Persian.
- `/fa/web-development-services`: Verify title is Persian.

## 3. SEO Optimization Audit
**Objective:** Ensure technical SEO elements are correctly implemented.

**Checks:**
- **Hreflang Tags:** Ensure `x-default`, `en`, `fa`, `ar` links are present and correct on every page.
- **Canonical Tags:** Ensure self-referencing canonicals are correct.
- **Schema Markup:** Validate JSON-LD for:
  - `Organization` (Global)
  - `WebPage` / `Service` / `AboutPage` (Per page)
  - `BreadcrumbList` (All pages)
  - `FAQPage` (FAQ page)
  - `BlogPosting` (Blog posts)
- **Images:** Check `alt` text is present and localized.

## 4. Content Quality & Optimization
**Objective:** Enhance content for better engagement and ranking.

**Action Items:**
- **Keyword Usage:** Check if primary keywords are in Title, H1, and first 100 words.
- **Internal Linking:** Ensure pages link to relevant services and blog posts.
- **Call to Action (CTA):** Verify every page has a clear, translated CTA.
- **Formatting:** Check for proper use of H2/H3 tags, bullet points, and short paragraphs.

## 5. Execution Steps
1.  **Run Dev Server:** `npm run dev`
2.  **Manual Spot Check:** Visit key pages in browser.
3.  **Automated Scan (Optional):** Use a crawler or script to fetch headers.
