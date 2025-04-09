
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, isLanguageRootPath, normalizePath, getPageNameFromPath } from '../lib/languageUtils';

// Import translation system
import { translations, getTranslation } from '../i18n';

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

  // Translator function with page-specific context
  const t = (key: string, options?: { fallback?: string }): string => {
    try {
      // Try to get the translation value
      const value = getTranslation(language, key);
      
      if (typeof value === 'string') {
        return value;
      }
      
      // Try English fallback
      if (language !== 'en') {
        const englishValue = getTranslation('en', key);
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
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return options?.fallback || key;
    }
  };

  // Get SEO title with site name
  const getSeoTitle = (title?: string): string => {
    if (!title) {
      const pageName = getPageNameFromPath(location.pathname);
      const pageTitle = t(`seo.${pageName}Title`, { fallback: t('seo.defaultTitle') });
      return pageTitle;
    }
    return `${title} | ${t('seo.siteName')}`;
  };

  // Get SEO description
  const getSeoDescription = (description?: string): string => {
    if (!description) {
      const pageName = getPageNameFromPath(location.pathname);
      return t(`seo.${pageName}Description`, { fallback: t('seo.defaultDescription') });
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
