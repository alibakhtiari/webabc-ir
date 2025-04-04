
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import Testimonial from '@/components/Testimonial';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCanonicalUrl, generateLanguageAlternates } from '@/lib/languageUtils';
import { useLocation } from 'react-router-dom';

const CaseStudies = () => {
  const { language, t, languageMeta } = useLanguage();
  const location = useLocation();
  
  // Schema markup for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('common.home'),
        "item": `https://yourwebsite.com/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('caseStudies.title'),
        "item": `https://yourwebsite.com/${language}/case-studies`
      }
    ],
    "inLanguage": language
  };

  return (
    <div dir={languageMeta.direction} className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title={t('caseStudies.title')} 
        description={t('caseStudies.subtitle')} 
      />
      
      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {generateLanguageAlternates('/case-studies', language).map(alt => (
          <link 
            key={alt.lang} 
            rel="alternate" 
            hrefLang={alt.lang} 
            href={alt.url} 
          />
        ))}
        <link rel="canonical" href={getCanonicalUrl(language, '/case-studies')} />
      </Helmet>
      
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="text-primary">{t('caseStudies.title')}</span> {t('caseStudies.subtitle')}
          </h1>
          <p className="font-persian text-foreground/80 leading-relaxed mb-8">
            {t('caseStudies.description')}
          </p>
        </div>
        
        {/* Case Study Example */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('caseStudies.ecommerceCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('caseStudies.ecommerceCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.ecommerceCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.ecommerceCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('caseStudies.ecommerceCase.results1')}</li>
                    <li>{t('caseStudies.ecommerceCase.results2')}</li>
                    <li>{t('caseStudies.ecommerceCase.results3')}</li>
                    <li>{t('caseStudies.ecommerceCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Testimonial 
                name={language === 'en' ? "Ali Mohammad" : language === 'ar' ? "علي محمد" : "علی محمدی"}
                company={language === 'en' ? "CEO of Top Home Online Store" : language === 'ar' ? "الرئيس التنفيذي لمتجر المنزل الأفضل عبر الإنترنت" : "مدیرعامل فروشگاه آنلاین خانه برتر"}
                image="/images/testimonial-1.jpg"
                quote={t('caseStudies.ecommerceCase.testimonial')}
                rating={5}
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-1.jpg" 
                  alt={language === 'en' ? "Online store sales growth chart after SEO optimization by WebABC" : language === 'ar' ? "مخطط نمو مبيعات المتجر عبر الإنترنت بعد تحسين محركات البحث بواسطة ويب أ ب ج" : "نمودار افزایش فروش فروشگاه آنلاین پس از بهینه‌سازی سئو توسط وب آ ب ث"}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-1-results.jpg" 
                  alt={language === 'en' ? "Keyword ranking improvement results for online store after SEO implementation by WebABC" : language === 'ar' ? "نتائج تحسين ترتيب الكلمات الرئيسية للمتجر عبر الإنترنت بعد تنفيذ تحسين محركات البحث بواسطة ويب أ ب ج" : "نتایج بهبود رتبه کلمات کلیدی فروشگاه آنلاین پس از اجرای سئو توسط وب آ ب ث"}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* More case studies would go here */}
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
