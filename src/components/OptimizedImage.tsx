
import React, { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

// Add TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  lazyBoundary?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  placeholderColor?: string;
  quality?: number;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
  lazyBoundary = '200px',
  objectFit = 'cover',
  sizes = '(max-width: 768px) 100vw, 50vw',
  placeholderColor = 'bg-gray-100',
  quality = 85
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  
  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip for priority images
    
    const imgElement = document.querySelector(`img[data-src="${src}"]`);
    if (!imgElement) return;
    
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: lazyBoundary,
      threshold: 0.1
    });
    
    observer.observe(imgElement);
    
    return () => {
      if (imgElement) observer.unobserve(imgElement);
    };
  }, [src, priority, lazyBoundary]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
    
    // Report to Web Vitals if available
    if (window.performance && priority) {
      const paintMetrics = performance.getEntriesByType('paint');
      const lcp = paintMetrics.find(entry => entry.name === 'largest-contentful-paint');
      if (lcp && window.gtag) {
        window.gtag('event', 'web_vitals', {
          eventCategory: 'Web Vitals',
          eventAction: 'LCP',
          eventValue: Math.round(lcp.startTime)
        });
      }
    }
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
    console.error(`Failed to load image: ${src}`);
  };

  // Add image parameters for optimization (if using a CDN)
  const optimizedSrc = src.startsWith('http') ? `${src}?q=${quality}&w=${width || 'auto'}` : src;
  
  // Create srcSet for responsive images
  const createSrcSet = () => {
    if (!src.startsWith('http')) return undefined;
    
    const widths = [320, 640, 960, 1280, 1920];
    return widths
      .map(w => `${src}?q=${quality}&w=${w} ${w}w`)
      .join(', ');
  };

  return (
    <div className={cn("overflow-hidden relative", className)} style={{ aspectRatio: width && height ? width / height : undefined }}>
      {/* Placeholder */}
      {(!isLoaded || !isInView) && !hasError && (
        <div className={cn("absolute inset-0 animate-pulse flex items-center justify-center", placeholderColor)}>
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className={cn("absolute inset-0 flex items-center justify-center", placeholderColor)}>
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      )}
      
      {/* Image */}
      {(isInView || priority) && (
        <img 
          src={optimizedSrc}
          data-src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          // @ts-ignore - fetchPriority exists in modern browsers
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          srcSet={createSrcSet()}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            hasError ? "hidden" : "block",
            `object-${objectFit}`
          )}
        />
      )}
      
      {/* Preload high priority images */}
      {priority && !isLoaded && (
        <link rel="preload" as="image" href={optimizedSrc} />
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedImage);
