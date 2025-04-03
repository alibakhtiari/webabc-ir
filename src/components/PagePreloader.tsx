
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Routes to preload after initial page load
const ROUTES_TO_PRELOAD = [
  '/services',
  '/portfolio',
  '/about',
  '/contact',
  '/case-studies',
  '/seo-services',
  '/web-development-services',
  '/wordpress-woocommerce-development'
];

const PagePreloader: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run preloading once on initial page load
    if (location.pathname === '/' || window.performance.navigation.type === 1) {
      setTimeout(() => {
        ROUTES_TO_PRELOAD.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          link.as = 'document';
          document.head.appendChild(link);
          console.log(`Prefetching: ${route}`);
        });
      }, 1000); // Wait for 1 second after initial page load
    }
  }, []); // Empty dependency array ensures this runs only once

  return null; // This component doesn't render anything
};

export default PagePreloader;
