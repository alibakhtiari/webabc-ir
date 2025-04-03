
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';

const PagePreloader: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Routes to preload after initial page load
  const ROUTES_TO_PRELOAD = [
    'services',
    'portfolio',
    'about',
    'contact',
    'case-studies',
    'seo-services',
    'web-development-services',
    'wordpress-woocommerce-development'
  ];

  useEffect(() => {
    // Only run preloading once on initial page load
    if (location.pathname === `/${language}` || window.performance.navigation.type === 1) {
      setTimeout(() => {
        // Preload for current language
        ROUTES_TO_PRELOAD.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = `/${language}/${route}`;
          link.as = 'document';
          document.head.appendChild(link);
          console.log(`Prefetching: /${language}/${route}`);
        });
      }, 1000); // Wait for 1 second after initial page load
    }
  }, [language]); // Re-run when language changes

  return null; // This component doesn't render anything
};

export default PagePreloader;
