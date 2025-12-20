import { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/mdData';
import { BlogPost } from '@/types/blog';
import { PortfolioItem } from '@/types/portfolio';

const BASE_URL = 'https://webabc.ir';
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const languages = ['en', 'fa', 'ar'];
    // 1. Static Routes
    const staticRoutes = [
        '', '/about', '/services', '/contact', '/portfolio', '/service-areas', '/faq', '/tools',
        '/services/seo', '/services/web-development', '/services/local-seo',
        '/services/wordpress-development', '/services/web-design'
    ].flatMap(route =>
        languages.map(lang => ({
            url: `${BASE_URL}/${lang}${route}`,
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    // 2. Dynamic Blog Routes
    let dynamicRoutes: MetadataRoute.Sitemap = [];

    for (const lang of languages) {
        // Blogs
        const posts = await getAllItems<BlogPost>('blog', lang);
        dynamicRoutes.push(...posts.map(post => ({
            url: `${BASE_URL}/${lang}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        })));

        // Portfolio
        const portfolios = await getAllItems<PortfolioItem>('portfolio', lang);
        dynamicRoutes.push(...portfolios.map(item => ({
            url: `${BASE_URL}/${lang}/portfolio/${item.slug}`,
            // lastModified: new Date(), // Generally static unless updated
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })));
    }

    // 3. Tools & Locations (Manually list these if they aren't in a DB/MD file)
    const tools = ['headline-analyzer', 'lorem-generator', 'meta-generator', 'paa-scraper', 'readability-checker', 'serp-preview', 'utm-builder', 'faq-generator'];
    const locations = ['dubai', 'tehran', 'muscat', 'qazvin']; // Add all location slugs

    const miscRoutes = languages.flatMap(lang => [
        ...tools.map(tool => ({
            url: `${BASE_URL}/${lang}/tools/${tool}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
        ...locations.map(loc => ({
            url: `${BASE_URL}/${lang}/service-areas/${loc}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    ]);

    return [...staticRoutes, ...dynamicRoutes, ...miscRoutes];
}
