
/**
 * Utility functions for page speed optimizations
 */

/**
 * Preconnect to important domains
 * This creates connections before resources are needed
 */
export const addResourceHints = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Also add DNS prefetch as fallback for browsers not supporting preconnect
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  });
};

/**
 * Lazy load images as they come into viewport
 * This improves initial page load time
 */
export const setupLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img:not([loading])').forEach(img => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  } else {
    // Implement IntersectionObserver-based lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
};

/**
 * Add browser hints for faster navigation
 */
export const addNavigationHints = (routes: string[]) => {
  if ('connection' in navigator && (navigator as any).connection.effectiveType === '4g') {
    // Only prefetch on fast connections
    routes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'document';
      link.href = route;
      document.head.appendChild(link);
    });
  }
};

/**
 * Initialize all page speed optimizations
 */
export const initPageSpeedOptimizations = () => {
  window.addEventListener('load', () => {
    // Run optimizations after page load
    addResourceHints();
    setupLazyLoading();
  });
};
