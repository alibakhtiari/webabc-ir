import LocalSeo from "@/views/LocalSeo";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.localSeo?.localSeoTitle || "Local SEO Services | WebABC",
        description: t.localSeo?.localSeoDescription || "Boost Your Local Visibility",
        alternates: {
            languages: {
                'en': '/en/local-seo',
                'fa': '/fa/local-seo',
                'ar': '/ar/local-seo',
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
    return <LocalSeo />;
}
