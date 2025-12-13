import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./PortfolioDetailClient";
import { getPortfolioItem, getAllPortfolioItems } from "@/lib/mdPortfolioData";
import { SupportedLanguage } from "@/types/language";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";

import { languages } from "@/types/language";

// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const params = [];

    for (const lang of Object.keys(languages)) {
        const items = await getAllPortfolioItems(lang);
        for (const item of items) {
            params.push({
                lang: lang,
                slug: item.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    const project = await getPortfolioItem(slug, lang);

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
                'en': `/en/portfolio/${slug}`,
                'fa': `/fa/portfolio/${slug}`,
                'ar': `/ar/portfolio/${slug}`,
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string, slug: string }>;
}) {
    const { lang, slug } = await params;

    // Validate that project exists
    const project = await getPortfolioItem(slug, lang);
    if (!project) {
        notFound();
    }

    return <PortfolioDetailClient project={project} />;
}
