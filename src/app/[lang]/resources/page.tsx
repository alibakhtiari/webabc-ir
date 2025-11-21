import Resources from "@/views/Resources";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.resources?.title || "Resources | WebABC",
        description: t.resources?.subtitle || "Helpful Resources and Guides",
        alternates: {
            languages: {
                'en': '/en/resources',
                'fa': '/fa/resources',
                'ar': '/ar/resources',
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
    return <Resources />;
}
