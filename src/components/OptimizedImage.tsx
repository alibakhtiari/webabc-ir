"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import imageMap from '@/generated/images-map.json';

const imageMapData = imageMap as Record<string, any>;

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
}

const OptimizedImage = ({ src, alt, className, priority, fill, ...props }: OptimizedImageProps) => {

  const [isLoaded, setIsLoaded] = useState(!!priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // 2. FIX: Check priority when resetting state
  useEffect(() => {
    setIsLoaded(!!priority);
  }, [src, priority]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  const optimizedData = imageMapData[normalizedSrc];

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
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500 will-change-opacity",
            (isLoaded || priority) ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundImage: `url(${placeholder})`, filter: 'blur(20px)', transform: "scale(1.1)" }}
        />

        <picture>
          <source srcSet={avifSrcSet} type="image/avif" sizes={props.sizes} />
          <source srcSet={webpSrcSet} type="image/webp" sizes={props.sizes} />
          <img
            ref={imgRef}
            src={original}
            alt={alt}
            decoding="async"
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            loading={priority ? "eager" : "lazy"}
            // 3. FIX: Add fetchPriority="high" specifically here
            fetchPriority={priority ? "high" : "auto"}
            className={cn(
              "object-cover transition-opacity duration-500",
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
        className={cn("transition-opacity duration-500", (isLoaded || priority) ? "opacity-100" : "opacity-0")}
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
