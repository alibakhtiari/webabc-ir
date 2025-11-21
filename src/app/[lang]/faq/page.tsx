import FAQ from "@/views/FAQ";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.faq?.title || "FAQ | WebABC",
        description: t.faq?.description || "Frequently Asked Questions",
        alternates: {
            languages: {
                'en': '/en/faq',
                'fa': '/fa/faq',
                'ar': '/ar/faq',
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
    return <FAQ />;
}
