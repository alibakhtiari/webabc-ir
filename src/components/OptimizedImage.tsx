"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

// 1. Add this Type Declaration to avoid TypeScript errors with fetchPriority
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  className?: string;
  alt: string;
  imageData?: any;
}

const OptimizedImage = ({ src, alt, className, priority, fill, imageData, ...props }: OptimizedImageProps) => {
  // If priority is true, we consider it loaded immediately to skip animations
  const [isLoaded, setIsLoaded] = useState(!!priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If priority is true, ensure we stay loaded
    if (priority) setIsLoaded(true);
  }, [priority]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  // Use prop if available, otherwise fallback (which likely means no optim data)
  const optimizedData = imageData;

  if (optimizedData) {
    const { avif, webp, placeholder, original, width, height } = optimizedData;
    const avifSrcSet = avif.map((v: any) => `${v.src} ${v.width}w`).join(', ');
    const webpSrcSet = webp.map((v: any) => `${v.src} ${v.width}w`).join(', ');

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          fill ? "absolute inset-0 h-full w-full" : "",
          className
        )}
        style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        {/* Only render blur placeholder if NOT priority */}
        {!priority && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-500 will-change-opacity",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
            style={{ backgroundImage: `url(${placeholder})`, filter: 'blur(20px)', transform: "scale(1.1)" }}
          />
        )}

        <picture>
          <source srcSet={avifSrcSet} type="image/avif" sizes={props.sizes} />
          <source srcSet={webpSrcSet} type="image/webp" sizes={props.sizes} />
          <img
            ref={imgRef}
            src={original}
            alt={alt}
            decoding={priority ? "sync" : "async"}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            // conditionally apply transition class. If priority, pure opacity-100, no transition.
            className={cn(
              "object-cover",
              !priority && "transition-opacity duration-500",
              fill ? "absolute inset-0 h-full w-full" : "w-full h-auto",
              (isLoaded || priority) ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            {...props}
          />
        </picture>
      </div>
    );
  }

  // Fallback for unoptimized images
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={cn(
          !priority && "transition-opacity duration-500",
          (isLoaded || priority) ? "opacity-100" : "opacity-0"
        )}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src.indexOf('data:') !== 0) setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
