
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

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
  const { language, t, languageMeta } = useLanguage();
  const [displayItems, setDisplayItems] = useState<PortfolioItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <button 
          onClick={toggleFilters}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-lg"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>{language === 'en' ? 'Filter Projects' : language === 'ar' ? 'تصفية المشاريع' : 'فیلتر پروژه‌ها'}</span>
          </div>
          <div className="bg-primary text-white px-2 py-0.5 rounded text-xs">
            {getCategoryLabel(activeCategory)}
          </div>
        </button>
      </div>
      
      {/* Category filters */}
      <motion.div 
        className={cn(
          "mb-8 md:block",
          showFilters ? "block" : "hidden"
        )}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showFilters ? 1 : 0,
          height: showFilters ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowFilters(false);
              }}
              className={cn(
                "px-4 py-2 rounded-full transition-all",
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayItems.length > 0 ? (
          displayItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Link 
                to={`/${language}/portfolio/${item.id}`} 
                className="group block h-full"
              >
                <div className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <OptimizedImage 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={600}
                      height={338}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full mb-2">
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
          <div className="col-span-1 md:col-span-3 text-center py-12">
            <div className="bg-gray-50 rounded-xl p-10">
              <p className="text-gray-500 mb-2">{t('common.noResults')}</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-primary hover:underline"
              >
                {language === 'en' ? 'View all projects' : 
                 language === 'ar' ? 'عرض جميع المشاريع' : 
                 'مشاهده همه پروژه‌ها'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioGallery;
