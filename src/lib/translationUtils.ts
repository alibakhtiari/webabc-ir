
import { SupportedLanguage } from '@/types/language';
import { translations, getTranslation } from '@/i18n';
import { getPageNameFromPath } from './languageUtils';

/**
 * Get translated string from key
 * 
 * @param key Translation key in dot notation (category.key)
 * @param language Current language
 * @param options Additional options like fallback text
 * @returns Translated string
 */
export const getTranslatedString = (
  key: string,
  language: SupportedLanguage,
  options?: { fallback?: string }
): string => {
  try {
    if (!key) return options?.fallback || 'MISSING_KEY';
    
    // Split the key into category and path parts
    const parts = key.split('.');
    if (parts.length < 2) {
      console.warn(`Invalid translation key format: ${key}. Format should be 'category.key'`);
      return options?.fallback || key;
    }
    
    const category = parts[0];
    const path = parts.slice(1);
    
    // Check if the category exists in translations
    if (!translations[language] || !translations[language][category]) {
      console.warn(`Translation category not found: ${category} in ${language}`);
      
      // Try English fallback for category
      if (language !== 'en' && translations.en && translations.en[category]) {
        let result = translations.en[category];
        for (const pathPart of path) {
          if (!result || typeof result !== 'object' || !(pathPart in result)) {
            break;
          }
          result = result[pathPart];
        }
        
        if (typeof result === 'string') {
          return result;
        }
      }
      
      return options?.fallback || key;
    }
    
    // Navigate through path to get the translation
    let result = translations[language][category];
    for (const pathPart of path) {
      if (!result || typeof result !== 'object' || !(pathPart in result)) {
        console.warn(`Translation path not found: ${key} in ${language}`);
        
        // Try English fallback for specific key
        if (language !== 'en') {
          const englishValue = getTranslation('en', key);
          if (typeof englishValue === 'string') {
            return englishValue;
          }
        }
        
        return options?.fallback || key;
      }
      result = result[pathPart];
    }
    
    if (typeof result !== 'string') {
      console.warn(`Translation for ${key} is not a string:`, result);
      return options?.fallback || key;
    }
    
    return result;
  } catch (error) {
    console.error(`Error translating key: ${key}`, error);
    return options?.fallback || key;
  }
};

/**
 * Get SEO title with site name
 * 
 * @param language Current language
 * @param pathname Current path
 * @param title Optional title override
 * @returns Formatted SEO title
 */
export const getSeoTitle = (
  language: SupportedLanguage, 
  pathname: string,
  title?: string
): string => {
  if (!title) {
    const pageName = getPageNameFromPath(pathname);
    const pageTitle = getTranslatedString(`seo.${pageName}Title`, language, { 
      fallback: getTranslatedString('seo.defaultTitle', language) 
    });
    return pageTitle;
  }
  return `${title} | ${getTranslatedString('seo.siteName', language)}`;
};

/**
 * Get SEO description
 * 
 * @param language Current language
 * @param pathname Current path
 * @param description Optional description override
 * @returns SEO description
 */
export const getSeoDescription = (
  language: SupportedLanguage,
  pathname: string,
  description?: string
): string => {
  if (!description) {
    const pageName = getPageNameFromPath(pathname);
    return getTranslatedString(`seo.${pageName}Description`, language, { 
      fallback: getTranslatedString('seo.defaultDescription', language) 
    });
  }
  return description;
};
