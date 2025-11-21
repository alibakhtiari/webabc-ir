import WebDevelopment from "@/views/WebDevelopment";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.webDevelopmentServices?.title || "Web Development Services | WebABC",
        description: t.webDevelopmentServices?.subtitle || "Custom Web Development Solutions",
        alternates: {
            languages: {
                'en': '/en/web-development-services',
                'fa': '/fa/web-development-services',
                'ar': '/ar/web-development-services',
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
    return <WebDevelopment />;
}
