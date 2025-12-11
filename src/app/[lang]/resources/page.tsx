import Resources from "@/views/Resources";
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
            title: t.resources?.title || "Resources | WebABC",
            description: t.resources?.subtitle || "Helpful Resources and Guides",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/resources`,
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
