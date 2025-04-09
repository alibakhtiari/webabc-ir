import React, { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { portfolioItems } from '@/lib/portfolioData';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy loading components
const PortfolioGallery = lazy(() => import('@/components/PortfolioGallery'));

// Fallback component
const GallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="bg-gray-100 rounded-lg h-72"></div>
    ))}
  </div>
);

const Portfolio = () => {
  const { t, language } = useLanguage();

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
      "itemListElement": portfolioItems.map((item, index) => ({
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
    <div className="relative overflow-x-hidden">
      <SEOHead 
        title={t('seo.portfolioTitle')}
        description={t('seo.portfolioDescription')}
        keywords={t('seo.keywords')}
      />
      <SchemaMarkup schema={portfolioSchema} />
      
      <Navbar />
      
      <main className="mt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('portfolio.title')}</h1>
              <p className="text-xl text-gray-600 mb-8">{t('portfolio.description')}</p>
            </div>
          </div>
        </section>
        
        {/* Portfolio Gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-2 rounded-full bg-primary text-white">
                {t('portfolio.allProjects')}
              </button>
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                {t('portfolio.webDesign')}
              </button>
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                {t('portfolio.ecommerce')}
              </button>
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                {t('portfolio.seoProjects')}
              </button>
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                {t('portfolio.mobileApps')}
              </button>
            </div>
            
            <Suspense fallback={<GallerySkeleton />}>
              <PortfolioGallery items={portfolioItems} />
            </Suspense>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{t('contact.getInTouch')}</h2>
              <p className="text-xl mb-8 opacity-90">{t('services.ctaDescription')}</p>
              <Link 
                to={`/${language}/contact`}
                className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all"
              >
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
