
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

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
  const { language, t } = useLanguage();
  const [displayItems, setDisplayItems] = useState<PortfolioItem[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const stickyThreshold = useRef<number>(0);
  
  // Handle scroll for sticky filter
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      
      if (!stickyThreshold.current) {
        stickyThreshold.current = filterRef.current.offsetTop;
      }
      
      setIsSticky(window.scrollY > stickyThreshold.current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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

  // Get appropriate category translations
  const getCategoryLabel = (category: string) => {
    if (category === 'all') return t('portfolio.allProjects');
    if (category === 'Web Design') return t('portfolio.webDesign');
    if (category === 'SEO') return t('portfolio.seoProjects');
    if (category === 'Local SEO') return t('portfolio.localSeo');
    if (category === 'E-commerce') return t('portfolio.ecommerce');
    return category;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Category filters */}
      <div 
        ref={filterRef}
        className={cn(
          "transition-all duration-300 ease-in-out z-20 bg-white py-4 w-full",
          isSticky ? "sticky top-16 shadow-md" : ""
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors",
                  activeCategory === category 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getCategoryLabel(category)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to={`/portfolio/${item.id}`} 
                  className="group block"
                >
                  <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full">
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
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">{t('common.noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGallery;
