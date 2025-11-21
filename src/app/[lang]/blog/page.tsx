import BlogPage from "@/views/BlogPage";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.blog?.title || "Blog | WebABC",
        description: t.blog?.blogDescription || "Latest News and Articles",
        alternates: {
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
    return <BlogPage />;
}
