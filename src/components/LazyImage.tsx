"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  blur?: boolean;
}

const LazyImage = ({
  src,
  alt,
  className,
  width,
  height,
  placeholder = '/placeholder.svg',
  blur = true
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={cn(
        "transition-all duration-500",
        blur && !isLoaded && "blur-sm scale-105",
        isLoaded && "blur-0 scale-100",
        className
      )}
    />
  );
};

export default LazyImage;
