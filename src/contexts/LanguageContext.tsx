
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, normalizePath, isLanguageRootPath, getPageNameFromPath } from '@/lib/languageUtils';
import { getTranslatedString, getSeoTitle, getSeoDescription } from '@/lib/translationUtils';
import { useLanguageDetection } from '@/hooks/useLanguageDetection';
import { SupportedLanguage, LanguageMeta, languages, LanguageContextType } from '@/types/language';

// Import translation system
import { translations } from '@/i18n';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const initialLanguage = useLanguageDetection();
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

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

  // Translation function wrapper
  const t = (key: string, options?: { fallback?: string }): string => {
    return getTranslatedString(key, language, options);
  };

  // Get SEO title wrapper
  const getContextSeoTitle = (title?: string): string => {
    return getSeoTitle(language, location.pathname, title);
  };

  // Get SEO description wrapper
  const getContextSeoDescription = (description?: string): string => {
    return getSeoDescription(language, location.pathname, description);
  };

  // Apply document direction based on language
  useEffect(() => {
    document.documentElement.dir = languages[language].direction;
    document.documentElement.lang = language;
  }, [language]);

  // Initialize route based on selected language
  useEffect(() => {
    if (isInitialized) return;
    
    // Check if we need to redirect to a language-specific route
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      // Root path "/" - redirect to language home
      navigate(`/${language}`, { replace: true });
      setIsInitialized(true);
    } else if (!Object.keys(languages).includes(pathSegments[0] as SupportedLanguage)) {
      // Path doesn't start with a language code - add the current language
      navigate(`/${language}${location.pathname}`, { replace: true });
      setIsInitialized(true);
    } else if (pathSegments[0] !== language) {
      // URL language is different from state language - update state
      const urlLang = pathSegments[0] as SupportedLanguage;
      if (Object.keys(languages).includes(urlLang)) {
        setLanguageState(urlLang);
        localStorage.setItem('language', urlLang);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, [location.pathname, isInitialized, navigate, language]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        languageMeta: languages[language],
        getSeoTitle: getContextSeoTitle,
        getSeoDescription: getContextSeoDescription,
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

// Re-export types for convenience
export type { SupportedLanguage, LanguageMeta };
export { languages };
