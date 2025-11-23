
import { SupportedLanguage } from '@/contexts/LanguageContext';

/**
 * Create organization schema for SEO
 */
interface ContactPoint {
  telephone?: string;
  contactType?: string;
  [key: string]: unknown;
}

export const createOrganizationSchema = (
  url: string,
  logo: string,
  contactPoints: ContactPoint[] = [],
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url,
    logo,
    name: language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب اِی‌بی‌سی',
    description: language === 'en'
      ? 'Professional web development and SEO services company'
      : language === 'ar'
        ? 'شركة خدمات تطوير الويب واحترافية تحسين محركات البحث'
        : 'شرکت خدمات توسعه وب و سئو حرفه‌ای',
    contactPoint: contactPoints,
    sameAs: [
      'https://facebook.com/webabc',
      'https://twitter.com/webabc',
      'https://instagram.com/webabc',
      'https://linkedin.com/company/webabc'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: language === 'en' ? 'Iran' : language === 'ar' ? 'إيران' : 'ایران',
      addressLocality: language === 'en' ? 'Tehran' : language === 'ar' ? 'طهران' : 'تهران',
      addressRegion: language === 'en' ? 'Tehran Province' : language === 'ar' ? 'محافظة طهران' : 'استان تهران',
      postalCode: '1234567890',
      streetAddress: language === 'en' ? 'Valiasr St.' : language === 'ar' ? 'شارع ولي عصر' : 'خیابان ولیعصر'
    },
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};


/**
 * Create LocalBusiness schema for local SEO
 */
export const createLocalBusinessSchema = (
  url: string,
  logo: string,
  image: string,
  contactPoints: ContactPoint[] = [],
  priceRange: string = '$$',
  language: SupportedLanguage = 'en'
) => {
  const orgSchema = createOrganizationSchema(url, logo, contactPoints, language);

  return {
    ...orgSchema,
    '@type': 'LocalBusiness',
    image,
    priceRange,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  };
};

/**
 * Create service schema for SEO
 */
export const createServiceSchema = (
  name: string,
  description: string,
  url: string,
  image: string,
  provider: string = 'WebABC',
  areaServed: string = 'Worldwide',
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: language === 'en' ? provider : language === 'ar' ? 'ويب إيه بي سي' : 'وب اِی‌بی‌سی',
      url: url.split('/').slice(0, 3).join('/')
    },
    areaServed,
    image,
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};

/**
 * Create service list schema for multiple services
 */
export const createServiceListSchema = (
  services: Array<{ name: string, description: string, url: string }>,
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
      }
    })),
    numberOfItems: services.length,
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};

/**
 * Create person schema for about page
 */
export const createPersonSchema = (
  name: string,
  jobTitle: string,
  description: string,
  image: string,
  url: string,
  sameAs: string[] = [],
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image,
    url,
    sameAs,
    worksFor: {
      '@type': 'Organization',
      name: language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب اِی‌بی‌سی',
      url: url.split('/').slice(0, 3).join('/')
    },
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};

/**
 * Create FAQ schema for services and other pages
 */
export const createFAQSchema = (
  faqs: Array<{ question: string, answer: string }>,
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};

/**
 * Create WebSite schema for better search engine understanding
 */
export const createWebSiteSchema = (
  url: string,
  name: string,
  description: string,
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

/**
 * Create WebPage schema for individual pages
 */
export const createWebPageSchema = (
  name: string,
  description: string,
  url: string,
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};

/**
 * Create breadcrumb schema for navigation
 */
export const createBreadcrumbSchema = (
  items: Array<{ name: string, item: string }>,
  language: SupportedLanguage = 'en'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    })),
    inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
  };
};
