"use client";

import { useState, useEffect, useRef, ImgHTMLAttributes, HTMLAttributes } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

// 1. Fix fetchPriority TypeScript error
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

// 2. FIX: Omit 'priority' from ImageProps to silence the deprecation warning
// and redefine it manually below.
interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'priority'> {
  src: string;
  className?: string;
  alt: string;
  imageData?: any;
  priority?: boolean; // Manually define it here
}

const OptimizedImage = ({ src, alt, className, priority, fill, imageData, sizes, ...props }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(!!priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!priority && imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [priority]);

  if (imageData) {
    const { avif, webp, placeholder, original, width, height } = imageData;
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
        {!priority && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-500 will-change-opacity",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
            style={{
              backgroundImage: `url(${placeholder})`,
              filter: 'blur(20px)',
              transform: "scale(1.1)"
            }}
          />
        )}

        <picture>
          <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />
          <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
          <img
            ref={imgRef}
            src={original}
            alt={alt}
            decoding={priority ? "sync" : "async"}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes={sizes}
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

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
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