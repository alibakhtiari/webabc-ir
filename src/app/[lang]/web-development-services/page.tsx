import WebDevelopment from "@/views/WebDevelopment";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return {
        ...constructMetadata({
            title: t.webDevelopmentServices?.title || "Web Development Services | WebABC",
            description: t.webDevelopmentServices?.subtitle || "Custom Web Development Solutions",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/web-development-services`,
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
