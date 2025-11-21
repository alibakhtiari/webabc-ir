import Portfolio from "@/views/Portfolio";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.portfolio?.title || "Portfolio | WebABC",
        description: t.portfolio?.description || "Our Recent Projects and Case Studies",
        alternates: {
            languages: {
                'en': '/en/portfolio',
                'fa': '/fa/portfolio',
                'ar': '/ar/portfolio',
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
    return <Portfolio />;
}
