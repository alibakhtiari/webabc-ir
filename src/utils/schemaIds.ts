/**
 * Single source of truth for JSON-LD identity construction.
 *
 * `FAQ.astro`, `Breadcrumbs.astro` and the blog page template each derive the
 * same page URL from `Astro.url` independently. Before this module they each
 * inlined their own trailing-slash normalisation, so a one-character drift in
 * any copy would silently fork an `@id` and recreate the dangling-reference
 * class §4.2 fixes. Import from here instead of re-deriving.
 */
export const SITE_ORIGIN = 'https://webabc.ir';

/** Canonical page URL: origin + pathname with enforced trailing slash. */
export function canonicalPageUrl(pathname: string): string {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${SITE_ORIGIN}${withSlash}`;
}

/** The page's WebPage node identity (`…/#webpage`). */
export function webpageId(pageUrl: string): string {
  return `${pageUrl}#webpage`;
}

/** The page's BreadcrumbList identity (`…/#breadcrumb`). Only resolvable on
 *  pages that actually render `Breadcrumbs.astro` (today: blog posts). */
export function breadcrumbId(pageUrl: string): string {
  return `${pageUrl}#breadcrumb`;
}

/** Per-language WebSite identity — matches `createWebsiteSchema` in Layout. */
export function websiteId(lang: string): string {
  return `${SITE_ORIGIN}/${lang}/#website`;
}
