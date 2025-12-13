import { BlogPost, BlogMetadata } from '@/types/blog';

export type { BlogPost, BlogMetadata };
// Fetching functions moved to blogData.ts


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
