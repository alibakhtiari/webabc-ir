import SeoService from "@/views/SeoService";
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
            title: t.seo?.title || "SEO Services | WebABC",
            description: t.seo?.subtitle || "Expert SEO Services",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/seo-services`,
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
