
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
import { ArrowRight, ArrowLeft, FileText, Globe } from 'lucide-react';

const CaseStudies = () => {
  const { language, t, languageMeta } = useLanguage();
  const location = useLocation();
  const isRTL = languageMeta.direction === 'rtl';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
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
        
        {/* E-commerce Case Study */}
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
                  alt={t('caseStudies.ecommerceCase.imageAlt')}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-1-results.jpg" 
                  alt={t('caseStudies.ecommerceCase.resultsImageAlt')}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* WordPress Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-2.jpg" 
                  alt={t('caseStudies.wordpressCase.imageAlt')}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-2-results.jpg" 
                  alt={t('caseStudies.wordpressCase.resultsImageAlt')}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('caseStudies.wordpressCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('caseStudies.wordpressCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.wordpressCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.wordpressCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('caseStudies.wordpressCase.results1')}</li>
                    <li>{t('caseStudies.wordpressCase.results2')}</li>
                    <li>{t('caseStudies.wordpressCase.results3')}</li>
                  </ul>
                </div>
              </div>
              
              <Testimonial 
                name={language === 'en' ? "Sara Johnson" : language === 'ar' ? "سارة جونسون" : "سارا جانسون"}
                company={language === 'en' ? "Marketing Director at Beauty Brand" : language === 'ar' ? "مديرة التسويق في علامة الجمال" : "مدیر بازاریابی برند زیبایی"}
                image="/images/testimonial-2.jpg"
                quote={t('caseStudies.wordpressCase.testimonial')}
                rating={5}
              />
            </div>
          </div>
        </div>
        
        {/* Local SEO Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('caseStudies.localSeoCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('caseStudies.localSeoCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.localSeoCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.localSeoCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('caseStudies.localSeoCase.results1')}</li>
                    <li>{t('caseStudies.localSeoCase.results2')}</li>
                    <li>{t('caseStudies.localSeoCase.results3')}</li>
                    <li>{t('caseStudies.localSeoCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Testimonial 
                name={language === 'en' ? "Ahmed Hassan" : language === 'ar' ? "أحمد حسن" : "احمد حسن"}
                company={language === 'en' ? "Owner of Royal Dental Clinic" : language === 'ar' ? "مالك عيادة رويال للأسنان" : "صاحب کلینیک دندانپزشکی رویال"}
                image="/images/testimonial-3.jpg"
                quote={t('caseStudies.localSeoCase.testimonial')}
                rating={5}
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-3.jpg" 
                  alt={t('caseStudies.localSeoCase.imageAlt')}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-3-results.jpg" 
                  alt={t('caseStudies.localSeoCase.resultsImageAlt')}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Web Development Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-4.jpg" 
                  alt={t('caseStudies.webDevCase.imageAlt')}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-4-results.jpg" 
                  alt={t('caseStudies.webDevCase.resultsImageAlt')}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('caseStudies.webDevCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('caseStudies.webDevCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.webDevCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('caseStudies.webDevCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('caseStudies.webDevCase.results1')}</li>
                    <li>{t('caseStudies.webDevCase.results2')}</li>
                    <li>{t('caseStudies.webDevCase.results3')}</li>
                    <li>{t('caseStudies.webDevCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Testimonial 
                name={language === 'en' ? "Maria Rodriguez" : language === 'ar' ? "ماريا رودريغيز" : "ماریا رودریگز"}
                company={language === 'en' ? "CEO of FintechPro" : language === 'ar' ? "الرئيس التنفيذي لشركة فينتيك برو" : "مدیرعامل فینتک‌پرو"}
                image="/images/testimonial-4.jpg"
                quote={t('caseStudies.webDevCase.testimonial')}
                rating={5}
              />
            </div>
          </div>
        </div>
        
        {/* Download Case Studies */}
        <div className="text-center mt-12">
          <p className="font-persian text-lg mb-4">{t('caseStudies.downloadHint')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
              <FileText className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('caseStudies.downloadFull')}
            </a>
            <a href="#" className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
              <Globe className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('caseStudies.contactForMore')}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
