import FAQClient from "./FAQClient";
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
            title: t.faq?.title || "FAQ | WebABC",
            description: t.faq?.description || "Frequently Asked Questions",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/faq`,
            languages: {
                'en': '/en/faq',
                'fa': '/fa/faq',
                'ar': '/ar/faq',
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
    return <FAQClient />;
}
