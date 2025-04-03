
import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { portfolioItems } from '@/lib/portfolioData';

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
  // Schema markup for portfolio page
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "صفحه اصلی", url: "https://webabc.com" },
    { name: "نمونه کارها", url: "https://webabc.com/portfolio" }
  ]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "نمونه کارهای طراحی سایت و سئو",
    "description": "مجموعه‌ای از پروژه‌های موفق ما در زمینه طراحی سایت و سئو",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": portfolioItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://webabc.com/portfolio/${item.id}`,
        "name": item.title,
        "description": item.description,
        "image": item.image
      }))
    }
  };

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="نمونه کارها | وب آ ب ث" 
        description="مشاهده نمونه کارهای موفق طراحی سایت و سئو توسط تیم وب آ ب ث - پروژه‌های برتر طراحی وب‌سایت و بهینه‌سازی موتورهای جستجو" 
        keywords="نمونه کار طراحی سایت، پروژه‌های سئو، نمونه کار وب‌سایت، طراحی سایت، سئو"
      />
      
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={portfolioSchema} />
      
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6">
            نمونه <span className="text-primary">کارهای موفق</span> ما
          </h1>
          <p className="font-persian text-foreground/80 leading-relaxed mb-8">
            مجموعه‌ای از پروژه‌های موفق ما در زمینه طراحی سایت و سئو. هر پروژه نشان‌دهنده تعهد ما به کیفیت و نتایج قابل اندازه‌گیری است.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Link to={`/portfolio/${item.id}`} key={item.id}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : 'تصویر نمونه کار'}
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
