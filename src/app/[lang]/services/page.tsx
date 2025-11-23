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
        title: t.services?.title || "Services | WebABC",
        description: t.services?.description || "Professional Web Design and SEO Services",
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/services`,
            languages: {
                'en': '/en/services',
                'fa': '/fa/services',
                'ar': '/ar/services',
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
