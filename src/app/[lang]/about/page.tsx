import AboutClient from "./AboutClient";
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
            title: t.about?.title || "About WebABC",
            description: t.about?.subtitle || "Leading in Digital Marketing and Web Development",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/about`,
            languages: {
                'en': '/en/about',
                'fa': '/fa/about',
                'ar': '/ar/about',
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
    return <AboutClient />;
}
