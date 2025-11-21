import SeoService from "@/views/SeoService";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.seo?.title || "SEO Services | WebABC",
        description: t.seo?.subtitle || "Expert SEO Services",
        alternates: {
            languages: {
                'en': '/en/seo-services',
                'fa': '/fa/seo-services',
                'ar': '/ar/seo-services',
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
    return <SeoService />;
}
