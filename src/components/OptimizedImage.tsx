"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

// Type definition for the generated JSON structure
interface ImageVariant {
  src: string;
  width: number;
}

interface ImageData {
  avif: ImageVariant[];
  webp: ImageVariant[];
  placeholder: string;
  original: string;
  width: number;
  height: number;
}

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  className?: string;
  alt: string;
  imageData?: ImageData | any; // Allow loose typing if needed, but prefer ImageData
}

const OptimizedImage = ({ src, alt, className, priority, fill, imageData, sizes, ...props }: OptimizedImageProps) => {
  // If priority is set, initialized state is true immediately.
  const [isLoaded, setIsLoaded] = useState(!!priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only add listener if NOT priority and not yet loaded
    if (priority) return;

    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [priority]);

  // Use prop if available
  const optimizedData = imageData as ImageData;

  if (optimizedData) {
    const { avif, webp, placeholder, original, width, height } = optimizedData;

    // Create source sets
    const avifSrcSet = avif.map((v) => `${v.src} ${v.width}w`).join(', ');
    const webpSrcSet = webp.map((v) => `${v.src} ${v.width}w`).join(', ');

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          fill ? "absolute inset-0 h-full w-full" : "",
          className
        )}
        // Reserve space to prevent layout shift (CLS) if not 'fill'
        style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        {/* Placeholder: Only render if NOT priority to avoid LCP dirtying */}
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
              transform: "scale(1.1)" // Prevent blur edges showing white
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
            // Pass sizes to img as well for fallback consistency
            sizes={sizes}
            className={cn(
              "object-cover",
              !priority && "transition-opacity duration-500",
              fill ? "absolute inset-0 h-full w-full" : "w-full h-auto",
              (isLoaded || priority) ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            {...props as any}
          />
        </picture>
      </div>
    );
  }

  // Fallback for unoptimized images (using Next/Image)
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
          // Ensure we don't fade in tiny data-uri placeholders
          if (target.src.indexOf('data:') !== 0) setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;