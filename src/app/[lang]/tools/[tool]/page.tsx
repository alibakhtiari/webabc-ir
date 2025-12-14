import { Metadata } from 'next';
import { languages, SupportedLanguage } from '@/types/language';
import { getDictionary } from '@/i18n/get-dictionary';
import { constructMetadata } from '@/lib/metadata';
import ToolRenderer from './ToolRenderer';

const TOOLS = [
    'headline-analyzer',
    'lorem-generator',
    'meta-generator',
    'paa-scraper',
    'readability-checker',
    'serp-preview',
    'utm-builder',
    'faq-generator',
    'keyword-research'
];

export async function generateStaticParams() {
    const params = [];
    for (const lang of Object.keys(languages)) {
        for (const tool of TOOLS) {
            params.push({ lang, tool });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; tool: string }> }): Promise<Metadata> {
    const { lang, tool } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    // Helper to get tool title from dictionary safely
    // Note: This relies on the keys in your translation files matching the tool names/keys 
    // mapped in your ToolsClient.tsx or similar.
    // Adjust key mapping if dictionary keys differ from slugs.
    const toolKeyMap: Record<string, string> = {
        'headline-analyzer': 'headlineAnalyzer',
        'lorem-generator': 'loremGenerator',
        'meta-generator': 'metaGenerator',
        'paa-scraper': 'paaScraper',
        'readability-checker': 'readabilityChecker',
        'serp-preview': 'serpPreview',
        'utm-builder': 'utmBuilder'
    };

    const key = toolKeyMap[tool] || tool;
    // @ts-ignore
    const title = t.tools?.[key]?.title || "Tool | WebABC";
    // @ts-ignore
    const description = t.tools?.[key]?.description || "WebABC SEO Tool";

    return {
        ...constructMetadata({
            title: `${title} | WebABC Tools`,
            description: description,
        }),
        alternates: {
            canonical: `https://webabc.ir/${lang}/tools/${tool}`,
            languages: {
                'en': `/en/tools/${tool}`,
                'fa': `/fa/tools/${tool}`,
                'ar': `/ar/tools/${tool}`,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string; tool: string }> }) {
    const { tool } = await params;
    return <ToolRenderer tool={tool} />;
}
