
import { SupportedLanguage } from '@/types/language';

// Common translations
import enCommon from './en/common.json';
import faCommon from './fa/common.json';
import arCommon from './ar/common.json';

// SEO translations
import enSeo from './en/seo.json';
import faSeo from './fa/seo.json';
import arSeo from './ar/seo.json';

// Services translations
import enServices from './en/services.json';
import faServices from './fa/services.json';
import arServices from './ar/services.json';

// WordPress translations
import enWordpress from './en/wordpress.json';
import faWordpress from './fa/wordpress.json';
import arWordpress from './ar/wordpress.json';

// About translations
import enAbout from './en/about.json';
import faAbout from './fa/about.json';
import arAbout from './ar/about.json';

// Portfolio & Case Studies translations
import enPortfolio from './en/portfolio.json';
import faPortfolio from './fa/portfolio.json';
import arPortfolio from './ar/portfolio.json';

// Contact translations
import enContact from './en/contact.json';
import faContact from './fa/contact.json';
import arContact from './ar/contact.json';

// Home translations
import enHome from './en/home.json';
import faHome from './fa/home.json';
import arHome from './ar/home.json';

// Benefits translations
import enBenefits from './en/benefits.json';
import faBenefits from './fa/benefits.json';
import arBenefits from './ar/benefits.json';

// CTA translations
import enCta from './en/cta.json';
import faCta from './fa/cta.json';
import arCta from './ar/cta.json';

// Resources translations
import enResources from './en/resources.json';
import faResources from './fa/resources.json';
import arResources from './ar/resources.json';

// Blog translations
import enBlog from './en/blog.json';
import faBlog from './fa/blog.json';
import arBlog from './ar/blog.json';

// Case Studies translations
import enCaseStudies from './en/caseStudies.json';
import faCaseStudies from './fa/caseStudies.json';
import arCaseStudies from './ar/caseStudies.json';

// Define the translations object with proper typing
export interface TranslationsType {
  [language: string]: {
    [category: string]: any;
  };
}

// Merge all translations
export const translations: TranslationsType = {
  en: {
    common: enCommon,
    seo: enSeo,
    services: enServices,
    wordpress: enWordpress,
    about: enAbout,
    portfolio: enPortfolio,
    contact: enContact,
    home: enHome,
    benefits: enBenefits,
    cta: enCta,
    resources: enResources,
    blog: enBlog,
    caseStudies: enCaseStudies
  },
  fa: {
    common: faCommon,
    seo: faSeo,
    services: faServices,
    wordpress: faWordpress,
    about: faAbout,
    portfolio: faPortfolio,
    contact: faContact,
    home: faHome,
    benefits: faBenefits,
    cta: faCta,
    resources: faResources,
    blog: faBlog,
    caseStudies: faCaseStudies
  },
  ar: {
    common: arCommon,
    seo: arSeo,
    services: arServices,
    wordpress: arWordpress,
    about: arAbout,
    portfolio: arPortfolio,
    contact: arContact,
    home: arHome,
    benefits: arBenefits,
    cta: arCta,
    resources: arResources,
    blog: arBlog,
    caseStudies: arCaseStudies
  }
};

/**
 * Helper function to get a translation
 * @param lang Language code
 * @param key Translation key in dot notation (category.key)
 * @returns The translated string or the key if not found
 */
export const getTranslation = (lang: SupportedLanguage, key: string): any => {
  const keys = key.split('.');
  
  if (keys.length < 2) {
    console.warn(`Invalid translation key: ${key}`);
    return key;
  }
  
  const category = keys[0];
  const path = keys.slice(1);
  
  if (!translations[lang] || !translations[lang][category]) {
    console.warn(`Translation category not found: ${category} in ${lang}`);
    return key;
  }
  
  let result = translations[lang][category];
  for (const pathPart of path) {
    if (!result || typeof result !== 'object' || !(pathPart in result)) {
      console.warn(`Translation path not found: ${key} in ${lang}`);
      return key;
    }
    result = result[pathPart];
  }
  
  return result;
};

// Export everything for easy importing
export default translations;
