import PortfolioClient from "./PortfolioClient";
import { getAllPortfolioItems } from "@/lib/mdPortfolioData";
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
            title: t.portfolio?.title || "Portfolio | WebABC",
            description: t.portfolio?.description || "Our Recent Projects and Case Studies",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/portfolio`,
            languages: {
                'en': '/en/portfolio',
                'fa': '/fa/portfolio',
                'ar': '/ar/portfolio',
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
    const items = await getAllPortfolioItems(lang);
    return <PortfolioClient items={items} />;
}
