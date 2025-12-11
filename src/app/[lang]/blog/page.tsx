import BlogPage from "@/views/BlogPage";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

import { getAllBlogPosts } from "@/lib/blogData";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.blog?.title || "Blog | WebABC",
        description: t.blog?.blogDescription || "Latest News and Articles",
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

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const posts = await getAllBlogPosts(lang);
    return <BlogPage initialPosts={posts} />;
}
