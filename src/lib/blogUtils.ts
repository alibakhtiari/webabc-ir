import * as matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  content: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

// Simulated blog posts (in production, these would be loaded from the file system)
const blogPosts: Record<string, Record<string, string>> = {
  en: {
    'seo-best-practices-2025': '/blog/en/seo-best-practices-2025.md',
    'web-design-trends-2025': '/blog/en/web-design-trends-2025.md',
    'digital-marketing-strategies': '/blog/en/digital-marketing-strategies.md',
  },
  ar: {
    'seo-best-practices-2025': '/blog/ar/seo-best-practices-2025.md',
    'web-design-trends-2025': '/blog/ar/web-design-trends-2025.md',
  },
  fa: {
    'seo-best-practices-2025': '/blog/fa/seo-best-practices-2025.md',
    'web-design-trends-2025': '/blog/fa/web-design-trends-2025.md',
  },
};

export async function getBlogPost(slug: string, language: string): Promise<BlogPost | null> {
  try {
    const filePath = blogPosts[language]?.[slug];
    if (!filePath) return null;

    const response = await fetch(filePath);
    if (!response.ok) return null;

    const markdown = await response.text();
    const { data, content } = matter(markdown);

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
    };
  } catch (error) {
    console.error(`Error loading blog post: ${slug}`, error);
    return null;
  }
}

export async function getAllBlogPosts(language: string): Promise<BlogMetadata[]> {
  const posts = blogPosts[language] || {};
  const metadata: BlogMetadata[] = [];

  for (const [slug, filePath] of Object.entries(posts)) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) continue;

      const markdown = await response.text();
      const { data } = matter(markdown);

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

export function getCategories(posts: BlogMetadata[]): string[] {
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function filterPostsByCategory(posts: BlogMetadata[], category: string): BlogMetadata[] {
  if (!category) return posts;
  return posts.filter(post => post.category === category);
}

export function filterPostsByTag(posts: BlogMetadata[], tag: string): BlogMetadata[] {
  if (!tag) return posts;
  return posts.filter(post => post.tags.includes(tag));
}
