
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn("text-primary font-bold flex items-center", className)}>
      <span className={cn("animate-fade-in", sizeClasses[size])}>Web</span>
      <div className="px-2 py-1 bg-primary/10 rounded-lg mx-1 flex items-center justify-center animate-fade-up" style={{ animationDelay: '100ms' }}>
        <span className={sizeClasses[size]}>A</span>
      </div>
      <div className="px-2 py-1 bg-primary/20 rounded-lg mx-1 flex items-center justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
        <span className={sizeClasses[size]}>B</span>
      </div>
      <div className="px-2 py-1 bg-primary/30 rounded-lg mx-1 flex items-center justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
        <span className={sizeClasses[size]}>C</span>
      </div>
    </div>
  );
};

export default Logo;
