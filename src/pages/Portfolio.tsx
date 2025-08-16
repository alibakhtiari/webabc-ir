
import React, { lazy, Suspense, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { portfolioItems } from '@/lib/portfolioData';
import { useLanguage } from '@/contexts/LanguageContext';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import '@/animations.css';

// Lazy loading components
const PortfolioGallery = lazy(() => import('@/components/PortfolioGallery'));
const LoadingSpinner = lazy(() => import('@/components/LoadingSpinner'));

const Portfolio = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location]);

  // Schema markup for portfolio page
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${window.location.origin}/${language}` },
    { name: t('common.portfolio'), item: `${window.location.origin}/${language}/portfolio` }
  ]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('portfolio.title'),
    "description": t('portfolio.description'),
    "inLanguage": language,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": portfolioItems
        .filter(item => !item.language || item.language === language)
        .map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${window.location.origin}/${language}/portfolio/${item.id}`,
          "name": item.title,
          "description": item.description,
          "image": item.image
        }))
    }
  };

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={t('seo.portfolioTitle')}
        description={t('seo.portfolioDescription')}
        keywords={t('seo.keywords')}
      />
      <SchemaMarkup schema={[portfolioSchema, breadcrumbSchema]} />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-white animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp delay-200">
                {t('portfolio.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fadeInUp delay-300">
                {t('portfolio.description')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Portfolio Gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <PortfolioGallery items={portfolioItems} />
            </Suspense>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 animate-fadeInUp">
                {t('contact.getInTouch')}
              </h2>
              <p className="text-xl mb-8 opacity-90 animate-fadeInUp delay-200">
                {t('services.ctaDescription')}
              </p>
              <div className="animate-fadeInUp delay-300">
                <Link 
                  to={`/${language}/contact`}
                  className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all"
                >
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
