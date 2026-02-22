
import { useState, useEffect } from 'react';
import { SupportedLanguage, languages } from '@/types/language';

/**
 * Hook to detect user's preferred language
 * 
 * @returns Detected language code
 */
const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'fa';

  const isValidLang = (lang: string): lang is SupportedLanguage => {
    return lang in languages;
  };

  try {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && isValidLang(storedLanguage)) {
      return storedLanguage;
    }

    const browserLang = navigator.language.split('-')[0];
    if (isValidLang(browserLang)) {
      return browserLang;
    }
  } catch (e) {
    console.error('Error detecting language:', e);
  }
  return 'fa';
};

export const useLanguageDetection = (): SupportedLanguage => {
  const [detectedLanguage] = useState<SupportedLanguage>(getInitialLanguage);

  return detectedLanguage;
};
