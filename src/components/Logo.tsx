
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={cn("text-primary font-bold flex items-center", sizeClasses[size], className)}>
      <span className="text-3xl ml-2">وب</span>
      <div className="px-2 py-1 bg-primary/10 rounded-lg mx-1 flex items-center justify-center">
        <span className="text-3xl">آ</span>
      </div>
      <div className="px-2 py-1 bg-primary/20 rounded-lg mx-1 flex items-center justify-center">
        <span className="text-3xl">ب</span>
      </div>
      <div className="px-2 py-1 bg-primary/30 rounded-lg mx-1 flex items-center justify-center">
        <span className="text-3xl">ث</span>
      </div>
    </div>
  );
};

export default Logo;
