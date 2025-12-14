import { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/mdData';
import { BlogPost } from '@/types/blog';

const BASE_URL = 'https://webabc.ir';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Define static routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/services/seo',
        '/services/web-development',
        '/services/local-seo',
        '/services/wordpress-development',
        '/services/web-design',
        '/contact',
        '/portfolio',
        '/service-areas',
        '/faq'
    ].flatMap(route =>
        ['en', 'fa', 'ar'].map(lang => ({
            url: `${BASE_URL}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    // 2. Fetch dynamic blog routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    for (const lang of ['en', 'fa', 'ar']) {
        const posts = await getAllItems<BlogPost>('blog', lang);
        const routes = posts.map(post => ({
            url: `${BASE_URL}/${lang}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
        blogRoutes = [...blogRoutes, ...routes];
    }

    return [...staticRoutes, ...blogRoutes];
}
