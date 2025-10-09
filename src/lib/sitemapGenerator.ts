import { getAllBlogPosts } from './blogUtils';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates: {
    lang: string;
    href: string;
  }[];
}

const BASE_URL = 'https://webabc.ir';
const LANGUAGES = ['en', 'ar', 'fa'];

// Static pages with their configurations
const STATIC_PAGES: Omit<SitemapUrl, 'alternates'>[] = [
  { loc: '/', lastmod: '2024-10-04', changefreq: 'weekly', priority: 1.0 },
  { loc: '/services', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.8 },
  { loc: '/portfolio', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.8 },
  { loc: '/seo-services', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.8 },
  { loc: '/local-seo-services', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.7 },
  { loc: '/web-development-services', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.8 },
  { loc: '/wordpress-woocommerce-development', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.7 },
  { loc: '/web-design', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.7 },
  { loc: '/about', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.6 },
  { loc: '/contact', lastmod: '2024-10-04', changefreq: 'monthly', priority: 0.6 },
  { loc: '/blog', lastmod: '2024-10-04', changefreq: 'daily', priority: 0.9 },
];

function generateAlternates(path: string): { lang: string; href: string }[] {
  return [
    ...LANGUAGES.map(lang => ({ lang, href: `${BASE_URL}/${lang}${path}` })),
    { lang: 'x-default', href: `${BASE_URL}/en${path}` }
  ];
}

export async function generateSitemapUrls(): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = [];

  // Add static pages
  for (const page of STATIC_PAGES) {
    urls.push({
      ...page,
      alternates: generateAlternates(page.loc)
    });
  }

  // Add blog posts for each language
  for (const language of LANGUAGES) {
    try {
      const posts = await getAllBlogPosts(language);
      
      for (const post of posts) {
        const blogPath = `/blog/${post.slug}`;
        urls.push({
          loc: blogPath,
          lastmod: post.date,
          changefreq: 'weekly',
          priority: 0.7,
          alternates: generateAlternates(blogPath)
        });
      }
    } catch (error) {
      console.error(`Error loading blog posts for ${language}:`, error);
    }
  }

  return urls;
}

export function generateSitemapXML(urls: SitemapUrl[], language?: string): string {
  const urlEntries = urls.map(url => {
    const fullUrl = language ? `${BASE_URL}/${language}${url.loc}` : `${BASE_URL}${url.loc}`;
    
    return `  <url>
    <loc>${fullUrl}</loc>
    ${url.alternates.map(alt => 
      `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`
    ).join('\n    ')}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${url.lastmod}</lastmod>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

// Function to write sitemap files (for build process)
export async function writeSitemaps(): Promise<void> {
  const urls = await generateSitemapUrls();
  
  // Generate main sitemap (English default)
  const mainSitemap = generateSitemapXML(urls, 'en');
  console.log('Main Sitemap:\n', mainSitemap);
  
  // Generate language-specific sitemaps
  for (const language of LANGUAGES) {
    const langSitemap = generateSitemapXML(urls, language);
    console.log(`\n${language.toUpperCase()} Sitemap:\n`, langSitemap);
  }
}
