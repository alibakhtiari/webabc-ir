import Home from "@/views/Home";
import { SupportedLanguage } from "@/types/language";

import { Metadata } from "next";
import { translations } from "@/i18n";

// Force dynamic rendering to avoid SSR issues during build
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.home?.title || "WebABC",
        description: t.home?.description || "Web Design and Development Services",
        alternates: {
            languages: {
                'en': '/en',
                'fa': '/fa',
                'ar': '/ar',
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
    return <Home />;
}
