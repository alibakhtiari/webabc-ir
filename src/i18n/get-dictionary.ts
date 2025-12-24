import 'server-only';
import { SupportedLanguage } from '@/types/language';

// Define namespaces and their corresponding filenames
const namespaces = {
    common: 'common',
    seo: 'seo',
    services: 'services',
    wordpress: 'wordpress',
    'modern-web': 'modern-web',
    maintenance: 'maintenance',
    speedOptimization: 'speed-optimization',
    uiUxAudit: 'ui-ux-audit',
    webDesign: 'web-design',
    localSeo: 'local-seo',
    linkBuilding: 'link-building',
    contentCreation: 'content-creation',
    webDevelopmentServices: 'web-development-services',
    'service-areas': 'service-areas',
    seoService: 'seo-service',
    tools: 'tools',
    faq: 'faq',

    about: 'about',
    portfolio: 'portfolio',
    contact: 'contact',
    home: 'home',
    benefits: 'benefits',
    cta: 'cta',

    blog: 'blog',

    notFound: 'notFound',
    consultation: 'consultation',

    // Tools Namespaces
    serpPreview: 'tools/serpPreview',
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
