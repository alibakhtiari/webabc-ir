import BlogPostClient from "./BlogPostClient";
import { SupportedLanguage } from "@/types/language";
import { getAllItems, getItem } from "@/lib/mdData";
import { BlogPost } from "@/types/blog";
import { languages } from "@/types/language";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateStaticParams() {
    const params = [];

    // Loop through all languages and posts to generate paths
    for (const lang of Object.keys(languages)) {
        const posts = await getAllItems<BlogPost>('blog', lang);
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

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const post = await getItem<BlogPost>('blog', slug, lang);

    if (!post) {
        return {
            title: "Post Not Found | WebABC",
        };
    }

    return {
        ...constructMetadata({
            title: post.title,
            description: post.description,
            image: post.image,
        }),
        alternates: {
            canonical: `https://webabc.ir/${lang}/blog/${slug}`,
            languages: {
                'en': `/en/blog/${slug}`,
                'fa': `/fa/blog/${slug}`,
                'ar': `/ar/blog/${slug}`,
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const post = await getItem<BlogPost>('blog', slug, lang);

    if (!post) {
        return <BlogPostClient post={null} />;
    }

    return <BlogPostClient post={post} />;
}
