
import { useState, useEffect } from 'react';
import { SupportedLanguage } from '@/types/language';

/**
 * Hook to detect user's preferred language
 * 
 * @returns Detected language code
 */
export const useLanguageDetection = (): SupportedLanguage => {
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>('fa');

  useEffect(() => {
    // Get language from local storage first
    const storedLanguage = localStorage.getItem('language') as SupportedLanguage;
    if (storedLanguage && ['fa', 'en', 'ar'].includes(storedLanguage)) {
      setDetectedLanguage(storedLanguage);
      return;
    }

    // Detect from browser if not in storage
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    if (['fa', 'en', 'ar'].includes(browserLang)) {
      setDetectedLanguage(browserLang);
    } else {
      setDetectedLanguage('fa'); // Default to Persian
    }
  }, []);

  return detectedLanguage;
};
