import { SupportedLanguage } from '@/types/language';

// Define the translations object with proper typing
// We keep this interface for type safety in components
export interface TranslationsType {
  [language: string]: {
    [category: string]: any;
  };
}

/**
 * @deprecated Use getDictionary(locale) instead. This object is empty/stubbed to prevent build errors during migration.
 */
export const translations: TranslationsType = {
  en: {},
  fa: {},
  ar: {}
};

/**
 * @deprecated Use server-side dictionary or client-side context instead.
 */
export const getTranslation = (lang: SupportedLanguage, key: string): any => {
  console.warn('getTranslation is deprecated. Use dictionary pattern.');
  return key;
};

export default translations;
