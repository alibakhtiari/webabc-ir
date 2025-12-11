import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./PortfolioDetailClient";
import { portfolioItems } from "@/lib/portfolioData";
import { SupportedLanguage } from "@/types/language";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";

import { languages } from "@/types/language";

// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const params = [];

    for (const lang of Object.keys(languages)) {
        for (const item of portfolioItems) {
            params.push({
                lang: lang,
                id: item.id,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, id: string }> }): Promise<Metadata> {
    const { lang, id } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    const project = portfolioItems.find(item => item.id === id);

    if (!project) {
        return {
            title: "Project Not Found | WebABC",
        };
    }

    return {
        ...constructMetadata({
            title: `${project.title} | ${t.portfolio?.title || "Portfolio"}`,
            description: project.description,
            image: project.image,
        }),
        alternates: {
            languages: {
                'en': `/en/portfolio/${id}`,
                'fa': `/fa/portfolio/${id}`,
                'ar': `/ar/portfolio/${id}`,
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string, id: string }>;
}) {
    const { lang, id } = await params;

    // Validate that project exists
    const project = portfolioItems.find(item => item.id === id);
    if (!project) {
        notFound();
    }

    return <PortfolioDetailClient />;
}
