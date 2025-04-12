
/**
 * Language types and interfaces for the application
 */

// Define supported languages
export type SupportedLanguage = 'fa' | 'en' | 'ar';

export type LanguageMeta = {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
  fontFamily: string;
};

export const languages: Record<SupportedLanguage, LanguageMeta> = {
  fa: {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    direction: 'rtl',
    fontFamily: 'font-persian',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: 'font-sans',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    fontFamily: 'font-arabic',
  },
};

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, options?: { fallback?: string }) => string;
  languageMeta: LanguageMeta;
  getSeoTitle: (title?: string) => string;
  getSeoDescription: (description?: string) => string;
  translations: any; // Importing actual translations type would create circular dependency
}
