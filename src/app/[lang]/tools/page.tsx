import ToolsClient from "./ToolsClient";
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
            title: t.tools?.title || "Tools | WebABC",
            description: t.tools?.description || "Free SEO and Web Tools",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/tools`,
            languages: {
                'en': '/en/tools',
                'fa': '/fa/tools',
                'ar': '/ar/tools',
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
    return <ToolsClient />;
}
