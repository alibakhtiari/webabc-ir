
import { useState, useEffect } from 'react';
import { SupportedLanguage, languages } from '@/types/language';

/**
 * Hook to detect user's preferred language
 * 
 * @returns Detected language code
 */
export const useLanguageDetection = (): SupportedLanguage => {
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>('fa');

  useEffect(() => {
    // Helper to validate language
    const isValidLang = (lang: string): lang is SupportedLanguage => {
      return Object.keys(languages).includes(lang);
    };

    // Get language from local storage first
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && isValidLang(storedLanguage)) {
      setDetectedLanguage(storedLanguage);
      return;
    }

    // Detect from browser if not in storage
    const browserLang = navigator.language.split('-')[0];
    if (isValidLang(browserLang)) {
      setDetectedLanguage(browserLang);
    } else {
      setDetectedLanguage('fa'); // Default to Persian
    }
  }, []);

  return detectedLanguage;
};
