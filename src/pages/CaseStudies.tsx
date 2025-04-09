
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCanonicalUrl, generateLanguageAlternates } from '@/lib/languageUtils';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileText, Globe } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

// Lazy loaded components
const Navbar = lazy(() => import('@/components/Navbar'));
const Footer = lazy(() => import('@/components/Footer'));
const SEOHead = lazy(() => import('@/components/SEOHead'));
const OptimizedImage = lazy(() => import('@/components/OptimizedImage'));
const Testimonial = lazy(() => import('@/components/Testimonial'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const CaseStudies = () => {
  const { language, t, languageMeta } = useLanguage();
  const location = useLocation();
  const isRTL = languageMeta.direction === 'rtl';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
  // Initialize schema markup for breadcrumbs and case studies
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('common.home'),
        "item": `${window.location.origin}/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('portfolio.caseStudies.title'),
        "item": `${window.location.origin}/${language}/case-studies`
      }
    ],
    "inLanguage": language
  };

  // Case studies schema (collection)
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Article",
          "headline": t('portfolio.caseStudies.ecommerceCase.title'),
          "description": t('portfolio.caseStudies.ecommerceCase.challenge'),
          "image": `${window.location.origin}/images/case-study-1.jpg`,
          "author": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
          },
          "publisher": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Article",
          "headline": t('portfolio.caseStudies.wordpressCase.title'),
          "description": t('portfolio.caseStudies.wordpressCase.challenge'),
          "image": `${window.location.origin}/images/case-study-2.jpg`,
          "author": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
          },
          "publisher": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          }
        }
      }
    ],
    "inLanguage": language
  };

  // Add the other case studies to the schema
  caseStudiesSchema.itemListElement.push(
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Article",
        "headline": t('portfolio.caseStudies.localSeoCase.title'),
        "description": t('portfolio.caseStudies.localSeoCase.challenge'),
        "image": `${window.location.origin}/images/case-study-3.jpg`,
        "author": {
          "@type": "Organization",
          "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
        },
        "publisher": {
          "@type": "Organization",
          "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`
          }
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Article",
        "headline": t('portfolio.caseStudies.webDevCase.title'),
        "description": t('portfolio.caseStudies.webDevCase.challenge'),
        "image": `${window.location.origin}/images/case-study-4.jpg`,
        "author": {
          "@type": "Organization",
          "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
        },
        "publisher": {
          "@type": "Organization",
          "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`
          }
        }
      }
    }
  );

  return (
    <div dir={languageMeta.direction} className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title={t('portfolio.caseStudies.title')} 
        description={t('portfolio.caseStudies.subtitle')}
        keywords={`case studies, success stories, SEO results, web development examples, ${t('seo.keywords')}`}
      />
      
      {/* Schema Markup */}
      <SchemaMarkup schema={[breadcrumbSchema, caseStudiesSchema]} />
      
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
      </Suspense>
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="text-primary">{t('portfolio.caseStudies.title')}</span> {t('portfolio.caseStudies.subtitle')}
          </h1>
          <p className="font-persian text-foreground/80 leading-relaxed mb-8">
            {t('portfolio.caseStudies.description')}
          </p>
        </div>
        
        {/* E-commerce Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('portfolio.caseStudies.ecommerceCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('portfolio.caseStudies.ecommerceCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.ecommerceCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.ecommerceCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('portfolio.caseStudies.ecommerceCase.results1')}</li>
                    <li>{t('portfolio.caseStudies.ecommerceCase.results2')}</li>
                    <li>{t('portfolio.caseStudies.ecommerceCase.results3')}</li>
                    <li>{t('portfolio.caseStudies.ecommerceCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Suspense fallback={<LoadingFallback />}>
                <Testimonial 
                  name={language === 'en' ? "Ali Mohammad" : language === 'ar' ? "علي محمد" : "علی محمدی"}
                  company={language === 'en' ? "CEO of Top Home Online Store" : language === 'ar' ? "الرئيس التنفيذي لمتجر المنزل الأفضل عبر الإنترنت" : "مدیرعامل فروشگاه آنلاین خانه برتر"}
                  image="/images/testimonial-1.jpg"
                  quote={t('portfolio.caseStudies.ecommerceCase.testimonial')}
                  rating={5}
                />
              </Suspense>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-1.jpg" 
                    alt={t('portfolio.caseStudies.ecommerceCase.imageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-1-results.jpg" 
                    alt={t('portfolio.caseStudies.ecommerceCase.resultsImageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        
        {/* WordPress Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-2.jpg" 
                    alt={t('portfolio.caseStudies.wordpressCase.imageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-2-results.jpg" 
                    alt={t('portfolio.caseStudies.wordpressCase.resultsImageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('portfolio.caseStudies.wordpressCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('portfolio.caseStudies.wordpressCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.wordpressCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.wordpressCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('portfolio.caseStudies.wordpressCase.results1')}</li>
                    <li>{t('portfolio.caseStudies.wordpressCase.results2')}</li>
                    <li>{t('portfolio.caseStudies.wordpressCase.results3')}</li>
                  </ul>
                </div>
              </div>
              
              <Suspense fallback={<LoadingFallback />}>
                <Testimonial 
                  name={language === 'en' ? "Sara Johnson" : language === 'ar' ? "سارة جونسون" : "سارا جانسون"}
                  company={language === 'en' ? "Marketing Director at Beauty Brand" : language === 'ar' ? "مديرة التسويق في علامة الجمال" : "مدیر بازاریابی برند زیبایی"}
                  image="/images/testimonial-2.jpg"
                  quote={t('portfolio.caseStudies.wordpressCase.testimonial')}
                  rating={5}
                />
              </Suspense>
            </div>
          </div>
        </div>
        
        {/* Local SEO Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('portfolio.caseStudies.localSeoCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('portfolio.caseStudies.localSeoCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.localSeoCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.localSeoCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('portfolio.caseStudies.localSeoCase.results1')}</li>
                    <li>{t('portfolio.caseStudies.localSeoCase.results2')}</li>
                    <li>{t('portfolio.caseStudies.localSeoCase.results3')}</li>
                    <li>{t('portfolio.caseStudies.localSeoCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Suspense fallback={<LoadingFallback />}>
                <Testimonial 
                  name={language === 'en' ? "Ahmed Hassan" : language === 'ar' ? "أحمد حسن" : "احمد حسن"}
                  company={language === 'en' ? "Owner of Royal Dental Clinic" : language === 'ar' ? "مالك عيادة رويال للأسنان" : "صاحب کلینیک دندانپزشکی رویال"}
                  image="/images/testimonial-3.jpg"
                  quote={t('portfolio.caseStudies.localSeoCase.testimonial')}
                  rating={5}
                />
              </Suspense>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-3.jpg" 
                    alt={t('portfolio.caseStudies.localSeoCase.imageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-3-results.jpg" 
                    alt={t('portfolio.caseStudies.localSeoCase.resultsImageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        
        {/* Web Development Case Study */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-4.jpg" 
                    alt={t('portfolio.caseStudies.webDevCase.imageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                  <OptimizedImage 
                    src="/images/case-study-4-results.jpg" 
                    alt={t('portfolio.caseStudies.webDevCase.resultsImageAlt')}
                    className="w-full h-auto"
                  />
                </Suspense>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                {t('portfolio.caseStudies.webDevCase.category')}
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                {t('portfolio.caseStudies.webDevCase.title')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.challenge')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.webDevCase.challenge')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.solution')}</h3>
                  <p className="font-persian text-foreground/80">
                    {t('portfolio.caseStudies.webDevCase.solution')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">{t('portfolio.caseStudies.results')}</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>{t('portfolio.caseStudies.webDevCase.results1')}</li>
                    <li>{t('portfolio.caseStudies.webDevCase.results2')}</li>
                    <li>{t('portfolio.caseStudies.webDevCase.results3')}</li>
                    <li>{t('portfolio.caseStudies.webDevCase.results4')}</li>
                  </ul>
                </div>
              </div>
              
              <Suspense fallback={<LoadingFallback />}>
                <Testimonial 
                  name={language === 'en' ? "Maria Rodriguez" : language === 'ar' ? "ماريا رودريغيز" : "ماریا رودریگز"}
                  company={language === 'en' ? "CEO of FintechPro" : language === 'ar' ? "الرئيس التنفيذي لشركة فينتيك برو" : "مدیرعامل فینتک‌پرو"}
                  image="/images/testimonial-4.jpg"
                  quote={t('portfolio.caseStudies.webDevCase.testimonial')}
                  rating={5}
                />
              </Suspense>
            </div>
          </div>
        </div>
        
        {/* Download Case Studies */}
        <div className="text-center mt-12">
          <p className="font-persian text-lg mb-4">{t('portfolio.caseStudies.downloadHint')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
              <FileText className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('portfolio.caseStudies.downloadFull')}
            </a>
            <a href="#" className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
              <Globe className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('portfolio.caseStudies.contactForMore')}
            </a>
          </div>
        </div>
      </main>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CaseStudies;
