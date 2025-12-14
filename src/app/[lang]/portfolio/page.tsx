import PortfolioClient from "./PortfolioClient";
import { getAllItems } from "@/lib/mdData";
import { PortfolioItem } from "@/types/portfolio";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";



import { languages } from "@/types/language";

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

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
    const items = await getAllItems<PortfolioItem>('portfolio', lang);
    return <PortfolioClient items={items} />;
}
