
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ServiceIconProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}

const ServiceIcon = ({ icon: Icon, title, className }: ServiceIconProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <span className="font-persian font-medium text-sm">{title}</span>
    </div>
  );
};

export default ServiceIcon;
