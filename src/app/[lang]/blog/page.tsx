import BlogClient from "./BlogClient";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";

// import { getAllBlogPosts } from "@/lib/blogData"; // Removed
import { languages } from "@/types/language";

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return {
        ...constructMetadata({
            title: t.blog?.title || "Blog | WebABC",
            description: t.blog?.blogDescription || "Latest News and Articles",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/blog`,
            languages: {
                'en': '/en/blog',
                'fa': '/fa/blog',
                'ar': '/ar/blog',
            },
        },
    };
}

import { getAllItems } from "@/lib/mdData";
import { BlogPost } from "@/types/blog";

// ... existing imports

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const posts = await getAllItems<BlogPost>('blog', lang);

    // Sort by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return <BlogClient initialPosts={sortedPosts} />;
}
