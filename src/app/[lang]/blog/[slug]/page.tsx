import BlogPostPage from "@/views/BlogPostPage";
import { SupportedLanguage } from "@/types/language";
import { getAllBlogPosts, getBlogPost } from "@/lib/blogData";
import { languages } from "@/types/language";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const params = [];

    // Loop through all languages and posts to generate paths
    for (const lang of Object.keys(languages)) {
        const posts = await getAllBlogPosts(lang);
        for (const post of posts) {
            params.push({
                lang: lang,
                slug: post.slug,
            });
        }
    }

    return params;
}

// ... existing code ...

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const post = await getBlogPost(slug, lang);

    if (!post) {
        // Option 1: Pass null to view and let it handle 404
        return <BlogPostPage post={null} />;
        // Option 2: Use notFound()
        // notFound(); 
    }

    return <BlogPostPage post={post} />;
}
