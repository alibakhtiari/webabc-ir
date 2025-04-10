
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  language?: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  className?: string;
}

const PortfolioGallery = ({ items, className }: PortfolioGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { language } = useLanguage();
  const [displayItems, setDisplayItems] = useState<PortfolioItem[]>([]);
  
  // Filter items by language and then by category
  useEffect(() => {
    // First filter by language, default to English if a specific language version isn't available
    const languageItems = items.filter(item => 
      !item.language || item.language === language
    );
    
    // Then filter by category if needed
    if (activeCategory === 'all') {
      setDisplayItems(languageItems);
    } else {
      setDisplayItems(languageItems.filter(item => item.category === activeCategory));
    }
  }, [items, activeCategory, language]);

  // Get unique categories from the language-filtered items
  const filteredItems = items.filter(item => !item.language || item.language === language);
  const categories = ['all', ...Array.from(new Set(filteredItems.map(item => item.category)))];

  return (
    <div className={cn("w-full", className)}>
      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full transition-colors",
              activeCategory === category 
                ? "bg-primary text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            )}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayItems.map((item) => (
          <Link 
            to={`/portfolio/${item.id}`} 
            key={item.id}
            className="group"
          >
            <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <OptimizedImage 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={600}
                  height={338}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;
