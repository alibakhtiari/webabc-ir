
import { SupportedLanguage } from '@/types/language';
import { getPageNameFromPath } from './languageUtils';

/**
 * Get translated string from key
 * 
 * @param key Translation key in dot notation (category.key)
 * @param language Current language
 * @param dictionary The translation dictionary object for the current language
 * @param options Additional options like fallback text
 * @returns Translated string
 */
export const getTranslatedString = (
  key: string,
  language: SupportedLanguage,
  dictionary: any,
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

    // Check if the category exists in dictionary
    if (!dictionary || !dictionary[category]) {
      // dictionary is now only for the *current* language, so we don't check dictionary[language]
      // assuming dictionary is the specific language slice.
      // Wait, the previous logic accessed translations[language][category].
      // New logic: dictionary usually represents translations[language].

      console.warn(`Translation category not found: ${category} in ${language} dictionary`);
      return options?.fallback || key;
    }

    // Navigate through path to get the translation
    let result = dictionary[category];
    for (const pathPart of path) {
      if (!result || typeof result !== 'object' || !(pathPart in result)) {
        console.warn(`Translation path not found: ${key} in ${language}`);
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
 * @param dictionary Translation dictionary
 * @param title Optional title override
 * @returns Formatted SEO title
 */
export const getSeoTitle = (
  language: SupportedLanguage,
  pathname: string,
  dictionary: any,
  title?: string
): string => {
  if (!title) {
    const pageName = getPageNameFromPath(pathname);
    const pageTitle = getTranslatedString(`seo.${pageName}Title`, language, dictionary, {
      fallback: getTranslatedString('seo.defaultTitle', language, dictionary)
    });
    return pageTitle;
  }
  return `${title} | ${getTranslatedString('seo.siteName', language, dictionary)}`;
};

/**
 * Get SEO description
 * 
 * @param language Current language
 * @param pathname Current path
 * @param dictionary Translation dictionary
 * @param description Optional description override
 * @returns SEO description
 */
export const getSeoDescription = (
  language: SupportedLanguage,
  pathname: string,
  dictionary: any,
  description?: string
): string => {
  if (!description) {
    const pageName = getPageNameFromPath(pathname);
    return getTranslatedString(`seo.${pageName}Description`, language, dictionary, {
      fallback: getTranslatedString('seo.defaultDescription', language, dictionary)
    });
  }
  return description;
};

