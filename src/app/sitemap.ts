import { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/mdData';
import { BlogPost } from '@/types/blog';
import { PortfolioItem } from '@/types/portfolio';

const BASE_URL = 'https://webabc.ir';
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const languages = ['en', 'fa', 'ar'];

    // Helper to generate the alternates object for a specific path
    const getAlternates = (path: string) => ({
        languages: Object.fromEntries(
            languages.map(l => [l, `${BASE_URL}/${l}${path}`])
        )
    });

    // 1. Static Routes
    const staticPaths = [
        '', '/about', '/services', '/contact', '/portfolio', '/service-areas', '/faq', '/tools', '/blog', '/privacy',
        '/services/seo', '/services/web-development', '/services/local-seo',
        '/services/wordpress-development', '/services/web-design',
        '/services/content-creation', '/services/link-building', '/services/modern-web-development',
        '/services/speed-optimization', '/services/ui-ux-audit', '/services/website-maintenance'
    ];

    const staticRoutes = staticPaths.flatMap(path =>
        languages.map(lang => ({
            url: `${BASE_URL}/${lang}${path}`,
            alternates: getAlternates(path),
            changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
            priority: path === '' ? 1 : 0.8,
        }))
    );

    // 2. Dynamic Blog & Portfolio Routes
    const dynamicRoutes: MetadataRoute.Sitemap = [];

    for (const lang of languages) {
        // Blogs
        const posts = await getAllItems<BlogPost>('blog', lang);
        dynamicRoutes.push(...posts.map(post => ({
            url: `${BASE_URL}/${lang}/blog/${post.slug}`,
            alternates: getAlternates(`/blog/${post.slug}`),
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        })));

        // Portfolio
        const portfolios = await getAllItems<PortfolioItem>('portfolio', lang);
        dynamicRoutes.push(...portfolios.map(item => ({
            url: `${BASE_URL}/${lang}/portfolio/${item.slug}`,
            alternates: getAlternates(`/portfolio/${item.slug}`),
            // lastModified: new Date(), // Generally static unless updated
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })));
    }

    // 3. Tools & Locations
    const tools = [
        'headline-analyzer', 'lorem-generator', 'meta-generator', 'paa-scraper',
        'readability-checker', 'serp-preview', 'utm-builder', 'faq-generator',
        'cost-calculator', 'privacy-policy-generator', 'qr-generator',
        'social-media-preview', 'css-gradient-generator', 'glassmorphism-generator',
        'slug-generator'
    ];
    const locations = ['dubai', 'tehran', 'muscat', 'qazvin']; // Add all location slugs

    const miscRoutes = [
        ...tools.flatMap(tool => languages.map(lang => ({
            url: `${BASE_URL}/${lang}/tools/${tool}`,
            alternates: getAlternates(`/tools/${tool}`),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))),
        ...locations.flatMap(loc => languages.map(lang => ({
            url: `${BASE_URL}/${lang}/service-areas/${loc}`,
            alternates: getAlternates(`/service-areas/${loc}`),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })))
    ];

    return [...staticRoutes, ...dynamicRoutes, ...miscRoutes];
}
