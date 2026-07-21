import type { SupportedLanguage } from '@/types/language';

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
    ecommerce: 'ecommerce',
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
    seoTitleChecker: 'tools/seoTitleChecker',
    schemaGenerator: 'tools/schemaGenerator',
    colorContrast: 'tools/colorContrast',
    boxShadow: 'tools/boxShadow',
    base64: 'tools/base64',

    cookieNotice: 'cookie',
    privacyPolicy: 'privacy',
} as const;

type NamespaceKey = keyof typeof namespaces;

// Helper to load all namespaces for a specific locale
const loadLocaleDictionary = async (locale: string) => {
    const entries = await Promise.all(
        Object.entries(namespaces).map(async ([key, filename]) => {
            let module;
            if (filename.startsWith('tools/')) {
                const toolName = filename.replace('tools/', '');
                module = await import(`./${locale}/tools/${toolName}.json`);
            } else {
                module = await import(`./${locale}/${filename}.json`);
            }
            return [key, module.default];
        })
    );
    return Object.fromEntries(entries);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<SupportedLanguage, () => Promise<any>> = {
    en: () => loadLocaleDictionary('en'),
    fa: () => loadLocaleDictionary('fa'),
    ar: () => loadLocaleDictionary('ar'),
};

export const getDictionary = async (locale: SupportedLanguage) => {
    const dictionaryLoader = dictionaries[locale] || dictionaries.fa;
    return dictionaryLoader();
};
