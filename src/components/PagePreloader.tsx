
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { getPathWithoutLanguage } from '@/lib/languageUtils';
import { initPageSpeedOptimizations, addNavigationHints } from '@/lib/pagespeedOptimizations';

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
    // Initialize page speed optimizations
    initPageSpeedOptimizations();

    // Only run preloading once on initial page load
    if (location.pathname === `/${language}` || window.performance.navigation.type === 1) {
      setTimeout(() => {
        // Generate full paths with language prefix
        const routesToPreload = ROUTES_TO_PRELOAD.map(route => `/${language}/${route}`);

        // Add navigation hints
        addNavigationHints(routesToPreload);

      }, 1000); // Wait for 1 second after initial page load
    }

    // Preload next/previous page based on current path
    const currentPath = getPathWithoutLanguage(location.pathname);
    const currentPathIndex = ROUTES_TO_PRELOAD.findIndex(route => currentPath.includes(route));

    if (currentPathIndex !== -1) {
      // Preload next page if exists
      if (currentPathIndex < ROUTES_TO_PRELOAD.length - 1) {
        const nextRoute = `/${language}/${ROUTES_TO_PRELOAD[currentPathIndex + 1]}`;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = nextRoute;
        document.head.appendChild(link);
      }
    }
  }, [language, location.pathname]); // Re-run when language or path changes

  return null; // This component doesn't render anything
};

export default PagePreloader;
