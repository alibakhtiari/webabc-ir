
import { SupportedLanguage } from '@/contexts/LanguageContext';

/**
 * Generates language alternate URLs for SEO
 * 
 * @param path The current path without language prefix
 * @param currentLanguage The current language
 * @returns An array of language alternate objects with lang and URL
 */
export const generateLanguageAlternates = (
  path: string,
  currentLanguage: SupportedLanguage
): Array<{ lang: string, url: string }> => {
  const languages: SupportedLanguage[] = ['fa', 'en', 'ar'];
  const baseUrl = window.location.origin;
  
  return languages.map(lang => ({
    lang,
    url: `${baseUrl}/${lang}${path}`
  }));
};

/**
 * Gets the current path without the language prefix
 * 
 * @param pathname The current pathname from location
 * @returns The path without language prefix
 */
export const getPathWithoutLanguage = (pathname: string): string => {
  // Check if pathname starts with a language code
  if (/^\/(fa|en|ar)(\/|$)/.test(pathname)) {
    return pathname.substring(3) || '/';
  }
  return pathname;
};

/**
 * Ensures a path starts with a forward slash
 * 
 * @param path The path to normalize
 * @returns The path with a leading forward slash
 */
export const normalizePath = (path: string): string => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Checks if the current path is the root of the language section
 * 
 * @param pathname The current pathname
 * @returns Boolean indicating if it's a language root path
 */
export const isLanguageRootPath = (pathname: string): boolean => {
  return /^\/(fa|en|ar)$/.test(pathname);
};

/**
 * Gets the appropriate translation key based on current language and page
 * 
 * @param baseKey The base translation key
 * @param language The current language
 * @param pagePath The current page path
 * @returns The appropriate translation key
 */
export const getContextualTranslationKey = (
  baseKey: string,
  language: SupportedLanguage,
  pagePath: string
): string => {
  // Extract the page name from the path (e.g., '/contact' -> 'contact')
  const pageMatch = pagePath.match(/\/([^\/]+)$/);
  const pageName = pageMatch ? pageMatch[1] : '';
  
  // If we have a specific page translation, try to use it
  if (pageName && baseKey.startsWith('page.')) {
    return `page.${pageName}.${baseKey.substring(5)}`;
  }
  
  return baseKey;
};

/**
 * Extracts page name from path for context-specific translations
 * 
 * @param path The current path
 * @returns The page name or empty string
 */
export const getPageNameFromPath = (path: string): string => {
  if (!path || path === '/') return 'home';
  
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const segments = cleanPath.split('/').filter(Boolean);
  
  // If there are no segments after language code, it's the homepage
  if (segments.length === 0) return 'home';
  
  // Get the last segment as the page name
  return segments[segments.length - 1];
};

/**
 * Generates a canonical URL for the current page
 * 
 * @param language The current language
 * @param path The current path without language prefix
 * @returns The canonical URL
 */
export const getCanonicalUrl = (
  language: SupportedLanguage,
  path: string
): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/${language}${path}`;
};
