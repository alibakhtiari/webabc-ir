import LocalSeo from "@/views/LocalSeo";
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
            title: t.localSeo?.localSeoTitle || "Local SEO Services | WebABC",
            description: t.localSeo?.localSeoDescription || "Boost Your Local Visibility",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/local-seo`,
            languages: {
                'en': '/en/local-seo',
                'fa': '/fa/local-seo',
                'ar': '/ar/local-seo',
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
    return <LocalSeo />;
}
