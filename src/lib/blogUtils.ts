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
  keyTakeaways?: string[];
  faq?: { question: string; answer: string }[];
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
