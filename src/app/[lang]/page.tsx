import Home from "@/views/Home";
import { SupportedLanguage, languages } from "@/types/language";

import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";

// Force dynamic rendering to avoid SSR issues during build
// export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return {
        ...constructMetadata({
            title: t.home?.title || "WebABC",
            description: t.home?.description || "Web Design and Development Services",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}`,
            languages: {
                'en': '/en',
                'fa': '/fa',
                'ar': '/ar',
            },
        },
    };

}

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return <Home />;
}
