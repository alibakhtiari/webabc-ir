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

    blog: 'blog',

    notFound: 'notFound',
    consultation: 'consultation',
    localSeo: 'local-seo',
    webDevelopmentServices: 'web-development-services',
    webDesign: 'web-design',
    'service-areas': 'service-areas',
    tools: 'tools',
    faq: 'faq',
    seoService: 'seo-service',
    contentCreation: 'content-creation',
    linkBuilding: 'link-building',
    'modern-web': 'modern-web',

    // Tools Namespaces
    serpPreview: 'tools/serpPreview',
    keywordResearch: 'tools/keywordResearch',
    faqGenerator: 'tools/faqGenerator',
    headlineAnalyzer: 'tools/headlineAnalyzer',
    readabilityChecker: 'tools/readabilityChecker',
    loremGenerator: 'tools/loremGenerator',
    costCalculator: 'tools/costCalculator',
    privacyGenerator: 'tools/privacyGenerator',
    glassGen: 'tools/glassGen',
    metaGenerator: 'tools/metaGenerator',
    paaScraper: 'tools/paaScraper',
    utmBuilder: 'tools/utmBuilder',
    qrGenerator: 'tools/qrGenerator',
    slugGenerator: 'tools/slugGenerator',
    socialPreview: 'tools/socialPreview',
    gradientGen: 'tools/gradientGen',

    // New Services
    maintenance: 'maintenance',
    speedOptimization: 'speed-optimization',
    uiUxAudit: 'ui-ux-audit',
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
