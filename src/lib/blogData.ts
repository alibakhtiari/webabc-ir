import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogMetadata } from './blogUtils';

// Simulated blog posts (mapped to file paths)
const blogPosts: Record<string, Record<string, string>> = {
    en: {
        'seo-best-practices-2025': '/blog/en/seo-best-practices-2025.md',
        'web-design-trends-2025': '/blog/en/web-design-trends-2025.md',
        'digital-marketing-strategies': '/blog/en/digital-marketing-strategies.md',
        'wordpress-vs-custom-development': '/blog/en/wordpress-vs-custom-development.md',
        'mobile-first-design-2025': '/blog/en/mobile-first-design-2025.md',
    },
    ar: {
        'seo-best-practices-2025': '/blog/ar/seo-best-practices-2025.md',
        'web-design-trends-2025': '/blog/ar/web-design-trends-2025.md',
        'wordpress-vs-custom-development': '/blog/ar/wordpress-vs-custom-development.md',
    },
    fa: {
        'seo-best-practices-2025': '/blog/fa/seo-best-practices-2025.md',
        'web-design-trends-2025': '/blog/fa/web-design-trends-2025.md',
        'wordpress-vs-custom-development': '/blog/fa/wordpress-vs-custom-development.md',
    },
};

export async function getBlogPost(slug: string, language: string): Promise<BlogPost | null> {
    // 'use cache';
    try {
        const filePath = blogPosts[language]?.[slug];
        if (!filePath) return null;

        const fullPath = path.join(process.cwd(), 'public', filePath);

        // Check if file exists
        if (!fs.existsSync(fullPath)) return null;

        const markdown = fs.readFileSync(fullPath, 'utf8');
        const parsed = matter(markdown);
        const { data, content } = parsed;

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            category: data.category,
            tags: data.tags || [],
            image: data.image,
            readTime: data.readTime,
            content,
            keyTakeaways: data.keyTakeaways,
            faq: data.faq,
        };
    } catch (error) {
        console.error(`Error loading blog post: ${slug}`, error);
        return null;
    }
}

export async function getAllBlogPosts(language: string): Promise<BlogMetadata[]> {
    // 'use cache';
    const posts = blogPosts[language] || {};
    const metadata: BlogMetadata[] = [];

    for (const [slug, filePath] of Object.entries(posts)) {
        try {
            const fullPath = path.join(process.cwd(), 'public', filePath);

            if (!fs.existsSync(fullPath)) continue;

            const markdown = fs.readFileSync(fullPath, 'utf8');
            const parsed = matter(markdown);
            const { data } = parsed;

            metadata.push({
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                author: data.author,
                category: data.category,
                tags: data.tags || [],
                image: data.image,
                readTime: data.readTime,
            });
        } catch (error) {
            console.error(`Error loading blog post metadata: ${slug}`, error);
        }
    }

    // Sort by date (newest first)
    return metadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
