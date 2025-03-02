
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn(
      "text-primary font-bold flex items-center animate-fade-in", 
      sizeClasses[size], 
      className
    )}>
      <span className="ml-2">وب</span>
      <div className="px-2 py-1 bg-primary/10 rounded-lg mx-1 flex items-center justify-center">
        <span>آ</span>
      </div>
      <div className="px-2 py-1 bg-primary/20 rounded-lg mx-1 flex items-center justify-center">
        <span>ب</span>
      </div>
      <div className="px-2 py-1 bg-primary/30 rounded-lg mx-1 flex items-center justify-center">
        <span>ث</span>
      </div>
    </div>
  );
};

export default Logo;
