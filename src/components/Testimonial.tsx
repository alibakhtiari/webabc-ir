
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface TestimonialProps {
  name: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  className?: string;
}

const Testimonial = ({ 
  name, 
  company, 
  image, 
  quote, 
  rating,
  className 
}: TestimonialProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl glass-morphism transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-primary/20">
          <OptimizedImage 
            src={image} 
            alt={`${name} از شرکت ${company} - مشتری وب آ ب ث`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mr-4">
          <h4 className="font-persian font-bold text-lg">{name}</h4>
          <p className="font-persian text-sm text-foreground/70">{company}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-5 h-5", 
              i < rating ? "fill-primary text-primary" : "text-gray-300"
            )} 
          />
        ))}
      </div>
      
      <blockquote className="font-persian text-foreground/80 italic">
        "{quote}"
      </blockquote>
    </div>
  );
};

export default Testimonial;
