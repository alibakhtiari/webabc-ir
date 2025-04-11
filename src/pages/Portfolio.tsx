
import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { portfolioItems } from '@/lib/portfolioData';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Filter, ArrowRight } from 'lucide-react';

// Lazy loading components
const PortfolioGallery = lazy(() => import('@/components/PortfolioGallery'));
const LoadingSpinner = lazy(() => import('@/components/LoadingSpinner'));

const Portfolio = () => {
  const { t, language, languageMeta } = useLanguage();
  const location = useLocation();
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && heroSectionRef.current) {
        const heroSectionBottom = heroSectionRef.current.getBoundingClientRect().bottom;
        setIsFilterSticky(heroSectionBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter portfolio items by language
  const languageFilteredItems = portfolioItems.filter(
    item => !item.language || item.language === language
  );
  
  // Get unique categories
  const categories = Array.from(
    new Set(languageFilteredItems.map(item => item.category))
  );

  // Schema markup for portfolio page
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${window.location.origin}/${language}` },
    { name: t('portfolio.title'), item: `${window.location.origin}/${language}/portfolio` }
  ]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('portfolio.title'),
    "description": t('portfolio.description'),
    "inLanguage": language,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": languageFilteredItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${window.location.origin}/${language}/portfolio/${item.id}`,
        "name": item.title,
        "description": item.description,
        "image": item.image
      }))
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div dir={languageMeta.direction} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={t('seo.portfolioTitle')}
        description={t('seo.portfolioDescription')}
        keywords={t('seo.keywords')}
      />
      <SchemaMarkup schema={[portfolioSchema, breadcrumbSchema]} />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <motion.section 
          ref={heroSectionRef}
          className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t('portfolio.title')}
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('portfolio.title')}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('portfolio.description')}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                {categories.slice(0, 3).map((category, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                  >
                    <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                    <span>{category}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Filter Section (Sticky after scroll) */}
        <div 
          ref={filterRef}
          className={`bg-background z-50 transition-all duration-300 py-4 border-b w-full ${
            isFilterSticky 
              ? 'sticky top-0 shadow-md' 
              : ''
          }`}
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between px-4">
              {isFilterSticky && (
                <h3 className="font-medium text-lg hidden md:block">
                  {t('portfolio.title')}
                </h3>
              )}
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Filter Projects' : 
                   language === 'ar' ? 'تصفية المشاريع' : 
                   'فیلتر پروژه‌ها'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Portfolio Gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <PortfolioGallery items={portfolioItems} />
            </Suspense>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-24 bg-white/5"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {t('contact.getInTouch')}
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-8 opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t('services.ctaDescription')}
              </motion.p>
              
              <motion.a
                href={`/${language}/contact`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all"
              >
                <span>{t('common.contactUs')}</span>
                {languageMeta.direction === 'rtl' ? (
                  <ArrowRight className="mr-2 h-4 w-4" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
