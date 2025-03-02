
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PortfolioGallery from '@/components/PortfolioGallery';

const portfolioItems = [
  {
    id: '1',
    title: 'فروشگاه آنلاین لوازم خانگی',
    category: 'فروشگاه آنلاین',
    image: '/images/portfolio-1.jpg',
    description: 'طراحی و توسعه فروشگاه آنلاین با افزایش 150% در فروش پس از بهینه‌سازی سئو'
  },
  {
    id: '2',
    title: 'وب‌سایت شرکت معماری',
    category: 'سایت شرکتی',
    image: '/images/portfolio-2.jpg',
    description: 'طراحی سایت شرکتی با رابط کاربری مدرن و سازگار با موبایل'
  },
  {
    id: '3',
    title: 'پلتفرم آموزش آنلاین',
    category: 'آموزشی',
    image: '/images/portfolio-3.jpg',
    description: 'توسعه پلتفرم LMS با قابلیت برگزاری کلاس‌های آنلاین و آزمون'
  },
  // Placeholder for more portfolio items
];

const Portfolio = () => {
  // Schema markup for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "صفحه اصلی",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "نمونه کارها",
        "item": "https://yourwebsite.com/portfolio"
      }
    ]
  };

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="نمونه کارها | وب آ ب ث" 
        description="مشاهده نمونه کارهای موفق طراحی سایت و سئو توسط تیم وب آ ب ث - پروژه‌های برتر طراحی وب‌سایت و بهینه‌سازی موتورهای جستجو" 
      />
      
      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
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
        
        <PortfolioGallery items={portfolioItems} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
