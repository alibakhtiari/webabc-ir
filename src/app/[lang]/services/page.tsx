import ServicesClient from "./ServicesClient";
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
            title: t.services?.title || "Services | WebABC",
            description: t.services?.description || "Professional Web Design and SEO Services",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/services`,
            languages: {
                'en': '/en/services',
                'fa': '/fa/services',
                'ar': '/ar/services',
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
    return <ServicesClient />;
}
