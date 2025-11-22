import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/views/PortfolioDetail";
import { portfolioItems } from "@/lib/portfolioData";
import { SupportedLanguage } from "@/types/language";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, id: string }> }): Promise<Metadata> {
    const { lang, id } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    const project = portfolioItems.find(item => item.id === id);

    if (!project) {
        return {
            title: "Project Not Found | WebABC",
        };
    }

    return {
        title: `${project.title} | ${t.portfolio?.title || "Portfolio"}`,
        description: project.description,
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

    return <PortfolioDetail />;
}
