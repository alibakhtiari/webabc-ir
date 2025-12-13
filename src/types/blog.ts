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
