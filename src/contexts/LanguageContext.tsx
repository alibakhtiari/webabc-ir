"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getPathWithoutLanguage, normalizePath, isLanguageRootPath, getPageNameFromPath } from '@/lib/languageUtils';
import { getTranslatedString, getSeoTitle, getSeoDescription } from '@/lib/translationUtils';
import { useLanguageDetection } from '@/hooks/useLanguageDetection';
import { SupportedLanguage, LanguageMeta, languages, LanguageContextType } from '@/types/language';


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define a generic Dictionary type or import the return type from get-dictionary
export type TranslationDictionary = Record<string, unknown>;

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
  dictionary: TranslationDictionary;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, defaultLanguage, dictionary }) => {

  const initialLanguage = useLanguageDetection();
  const [language, setLanguageState] = useState<SupportedLanguage>(defaultLanguage || initialLanguage || 'fa');
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only update to detected language if we are on the root path and haven't initialized
    if (!pathname || pathname === '/') {
      if (initialLanguage && initialLanguage !== language) {
        requestAnimationFrame(() => setLanguageState(initialLanguage));
      }
    }
    requestAnimationFrame(() => setIsInitialized(true));
  }, [initialLanguage, pathname, language]);

  // Sync language state with URL defaultLanguage if URL changes
  useEffect(() => {
    if (defaultLanguage && defaultLanguage !== language) {
      requestAnimationFrame(() => setLanguageState(defaultLanguage));
    }
  }, [defaultLanguage, language]);

  // Handle language change
  const setLanguage = (lang: SupportedLanguage) => {
    if (lang === language) return;

    localStorage.setItem('language', lang);
    setLanguageState(lang);

    // Update URL to reflect language change
    const pathWithoutLang = getPathWithoutLanguage(pathname || '');
    const newPath = normalizePath(`/${lang}${pathWithoutLang}`);
    router.push(newPath);
  };

  // Translation function wrapper
  const t = (key: string, options?: { fallback?: string }): string => {
    return getTranslatedString(key, language, dictionary, options);
  };

  // Get SEO title wrapper
  const getContextSeoTitle = (title?: string): string => {
    return getSeoTitle(language, pathname || '', dictionary, title);
  };

  // Get SEO description wrapper
  const getContextSeoDescription = (description?: string): string => {
    return getSeoDescription(language, pathname || '', dictionary, description);
  };

  // Apply document direction based on language
  useEffect(() => {
    document.documentElement.dir = languages[language].direction;
    document.documentElement.lang = language;
  }, [language]);

  // Initialize route based on selected language
  useEffect(() => {
    if (isInitialized || !pathname) return;

    // Check if we need to redirect to a language-specific route
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) {
      // Root path "/" - redirect to language home
      router.replace(`/${language}`);
      requestAnimationFrame(() => setIsInitialized(true));
    } else if (!Object.keys(languages).includes(pathSegments[0] as SupportedLanguage)) {
      // Path doesn't start with a language code - add the current language
      router.replace(`/${language}${pathname}`);
      requestAnimationFrame(() => setIsInitialized(true));
    } else if (pathSegments[0] !== language) {
      // URL language is different from state language - update state
      const urlLang = pathSegments[0] as SupportedLanguage;
      if (Object.keys(languages).includes(urlLang)) {
        requestAnimationFrame(() => setLanguageState(urlLang));
        localStorage.setItem('language', urlLang);
        requestAnimationFrame(() => setIsInitialized(true));
      }
    } else {
      requestAnimationFrame(() => setIsInitialized(true));
    }
  }, [pathname, isInitialized, router, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languageMeta: languages[language] || languages.fa,
        getSeoTitle: getContextSeoTitle,
        getSeoDescription: getContextSeoDescription,
        translations: dictionary // exposing the dictionary directly
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
