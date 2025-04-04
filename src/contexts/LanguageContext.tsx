
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, isLanguageRootPath, normalizePath, getPageNameFromPath } from '../lib/languageUtils';

// Import all language files
import faTranslations from '../i18n/fa.json';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

// Define supported languages
export type SupportedLanguage = 'fa' | 'en' | 'ar';

export type LanguageMeta = {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
};

export const languages: Record<SupportedLanguage, LanguageMeta> = {
  fa: {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    direction: 'rtl',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
};

// Combine all translations
const translations: Record<SupportedLanguage, any> = {
  fa: faTranslations,
  en: enTranslations,
  ar: arTranslations,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, options?: { fallback?: string }) => string;
  languageMeta: LanguageMeta;
  getSeoTitle: (title?: string) => string;
  getSeoDescription: (description?: string) => string;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect user's preferred language
const detectUserLanguage = (): SupportedLanguage => {
  const storedLanguage = localStorage.getItem('language') as SupportedLanguage;
  if (storedLanguage && Object.keys(languages).includes(storedLanguage)) {
    return storedLanguage;
  }

  // Detect from browser
  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  return Object.keys(languages).includes(browserLang) ? browserLang : 'fa';
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectUserLanguage());
  const navigate = useNavigate();
  const location = useLocation();

  // Handle language change
  const setLanguage = (lang: SupportedLanguage) => {
    if (lang === language) return;
    
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    
    // Update URL to reflect language change
    const pathWithoutLang = getPathWithoutLanguage(location.pathname);
    const newPath = normalizePath(`/${lang}${pathWithoutLang}`);
    navigate(newPath);
  };

  // Try to get a value from nested objects using a dot-separated path
  const getNestedValue = (obj: any, path: string[]): any => {
    let value = obj;
    for (const key of path) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
  };

  // Translator function with page-specific context
  const t = (key: string, options?: { fallback?: string }): string => {
    const keys = key.split('.');
    const currentTranslation = translations[language];
    const pageName = getPageNameFromPath(location.pathname);
    
    // Try page-specific translation first
    if (!key.startsWith('common.') && !key.startsWith('page.') && pageName) {
      const pageSpecificKey = `page.${pageName}.${key}`;
      const pageSpecificValue = getNestedValue(currentTranslation, pageSpecificKey.split('.'));
      if (typeof pageSpecificValue === 'string') {
        return pageSpecificValue;
      }
    }
    
    // Try direct translation
    const directValue = getNestedValue(currentTranslation, keys);
    if (typeof directValue === 'string') {
      return directValue;
    }
    
    // Try English fallback
    if (language !== 'en') {
      const englishValue = getNestedValue(translations.en, keys);
      if (typeof englishValue === 'string') {
        console.info(`Using English fallback for: ${key}`);
        return englishValue;
      }
    }

    // Check if a custom fallback was provided
    if (options?.fallback) {
      return options.fallback;
    }
    
    // Log the missing key and return the original key as fallback
    console.warn(`Translation key not found: ${key} in ${language}`);
    return key;
  };

  // Get SEO title with site name
  const getSeoTitle = (title?: string): string => {
    if (!title) {
      const pageName = getPageNameFromPath(location.pathname);
      const pageTitle = t(`${pageName}.title`, { fallback: t('seo.defaultTitle') });
      return pageTitle;
    }
    return `${title} | ${t('seo.siteName')}`;
  };

  // Get SEO description
  const getSeoDescription = (description?: string): string => {
    if (!description) {
      const pageName = getPageNameFromPath(location.pathname);
      return t(`${pageName}.description`, { fallback: t('seo.defaultDescription') });
    }
    return description;
  };

  // Apply document direction based on language
  useEffect(() => {
    document.documentElement.dir = languages[language].direction;
    document.documentElement.lang = language;
  }, [language]);

  // Initialize route based on selected language
  useEffect(() => {
    // Check if we need to redirect to a language-specific route
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      // Root path "/" - redirect to language home
      navigate(`/${language}`, { replace: true });
    } else if (!Object.keys(languages).includes(pathSegments[0] as SupportedLanguage)) {
      // Path doesn't start with a language code - add the current language
      navigate(`/${language}${location.pathname}`, { replace: true });
    } else if (pathSegments[0] !== language) {
      // URL language is different from state language - update state
      const urlLang = pathSegments[0] as SupportedLanguage;
      if (Object.keys(languages).includes(urlLang)) {
        setLanguageState(urlLang);
        localStorage.setItem('language', urlLang);
      }
    }
  }, [location.pathname]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        languageMeta: languages[language],
        getSeoTitle,
        getSeoDescription,
        translations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
