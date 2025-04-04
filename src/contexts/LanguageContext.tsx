
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, isLanguageRootPath, normalizePath } from '../lib/languageUtils';

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
  t: (key: string) => string;
  languageMeta: LanguageMeta;
  getSeoTitle: (title?: string) => string;
  getSeoDescription: (description?: string) => string;
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

  // Translator function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Get SEO title with site name
  const getSeoTitle = (title?: string): string => {
    if (!title) return translations[language].seo.defaultTitle;
    return `${title} | ${translations[language].seo.siteName}`;
  };

  // Get SEO description
  const getSeoDescription = (description?: string): string => {
    return description || translations[language].seo.defaultDescription;
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
        getSeoDescription
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
