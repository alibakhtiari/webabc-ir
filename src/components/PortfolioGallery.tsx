
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import OptimizedImage from './OptimizedImage';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  className?: string;
}

const PortfolioGallery = ({ items, className }: PortfolioGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full font-persian transition-all",
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            )}
          >
            {category === 'all' ? 'همه' : category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="neo-morphism rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg"
          >
            <div className="aspect-video overflow-hidden">
              <OptimizedImage 
                src={item.image} 
                alt={`نمونه کار ${item.title} - ${item.category} - وب آ ب ث`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-persian font-bold text-lg mb-1">{item.title}</h3>
              <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-persian mb-2">
                {item.category}
              </span>
              <p className="font-persian text-foreground/70 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;
