import 'server-only';
import { SupportedLanguage } from '@/types/language';

// Define namespaces and their corresponding filenames
const namespaces = {
    common: 'common',
    seo: 'seo',
    services: 'services',
    wordpress: 'wordpress',
    about: 'about',
    portfolio: 'portfolio',
    contact: 'contact',
    home: 'home',
    benefits: 'benefits',
    cta: 'cta',
    resources: 'resources',
    blog: 'blog',
    caseStudies: 'caseStudies',
    notFound: 'notFound',
    consultation: 'consultation',
    localSeo: 'local-seo',
    webDevelopmentServices: 'web-development-services',
    webDesign: 'web-design',
    'service-areas': 'service-areas',
    tools: 'tools',
    faq: 'faq',
    seoService: 'seo-service',
} as const;

type NamespaceKey = keyof typeof namespaces;

// Helper to load all namespaces for a specific locale
const loadLocaleDictionary = async (locale: string) => {
    const entries = await Promise.all(
        Object.entries(namespaces).map(async ([key, filename]) => {
            const module = await import(`./${locale}/${filename}.json`);
            return [key, module.default];
        })
    );
    return Object.fromEntries(entries);
};

const dictionaries: Record<SupportedLanguage, () => Promise<any>> = {
    en: () => loadLocaleDictionary('en'),
    fa: () => loadLocaleDictionary('fa'),
    ar: () => loadLocaleDictionary('ar'),
};

export const getDictionary = async (locale: SupportedLanguage) => {
    const dictionaryLoader = dictionaries[locale] || dictionaries.fa;
    return dictionaryLoader();
};
