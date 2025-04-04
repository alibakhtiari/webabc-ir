
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createServiceSchema } from '@/lib/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  const seoRef = useRef<HTMLDivElement>(null);
  const webdevRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Schema markup for services page
  const serviceSchema = createServiceSchema(
    t('services.title'),
    t('services.description'),
    window.location.href,
    language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب أ ب ج' : 'وب آ ب ث',
    "/og-image.png",
    language
  );

  return (
    <div className="relative overflow-x-hidden">
      <SEOHead 
        title={t('seo.servicesTitle')}
        description={t('seo.servicesDescription')}
        keywords={t('seo.keywords')}
      />
      <SchemaMarkup schema={serviceSchema} />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                {t('common.services')}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('services.title')}
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                {t('services.description')}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#seo-services" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  {t('seo.title')}
                </a>
                <a 
                  href="#webdev-services" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  {t('services.webDevelopmentTitle')}
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Services Section */}
        <section 
          id="seo-services" 
          ref={seoRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                {t('seo.specializedSEO')}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('seo.servicesTitle')}
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                {t('seo.servicesDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🔧',
                  titleKey: 'seo.technicalSeo',
                  descriptionKey: 'seo.technicalSeoDesc',
                  features: [
                    'seo.feature.pageSpeed',
                    'seo.feature.technicalErrors',
                    'seo.feature.urlStructure',
                    'seo.feature.schema',
                    'seo.feature.mobileFriendly',
                    'seo.feature.security'
                  ]
                },
                {
                  icon: '📝',
                  titleKey: 'seo.contentStrategy',
                  descriptionKey: 'seo.contentStrategyDesc',
                  features: [
                    'seo.feature.keywordResearch',
                    'seo.feature.qualityContent',
                    'seo.feature.titleOptimization',
                    'seo.feature.headings',
                    'seo.feature.imageOptimization',
                    'seo.feature.longTermStrategy'
                  ]
                },
                {
                  icon: '📍',
                  titleKey: 'seo.localSeo',
                  descriptionKey: 'seo.localSeoDesc',
                  features: [
                    'seo.feature.gmb',
                    'seo.feature.reviews',
                    'seo.feature.localKeywords',
                    'seo.feature.localLinks',
                    'seo.feature.nearMe',
                    'seo.feature.localReports'
                  ]
                },
                {
                  icon: '🔗',
                  titleKey: 'seo.offPageSeo',
                  descriptionKey: 'seo.offPageSeoDesc',
                  features: [
                    'seo.feature.linkProfile',
                    'seo.feature.linkOpportunities',
                    'seo.feature.linkableContent',
                    'seo.feature.authorityLinks',
                    'seo.feature.toxicLinks',
                    'seo.feature.progressReports'
                  ]
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{t(service.titleKey)}</h3>
                  <p className="text-foreground/70 mb-4 text-sm">{t(service.descriptionKey)}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Web Development Services Section */}
        <section 
          id="webdev-services" 
          ref={webdevRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                {t('services.webDevelopment')}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('services.webDevelopmentTitle')}
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                {t('services.webDevelopmentDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: '🔌',
                  titleKey: 'wordpress.title',
                  descriptionKey: 'services.wordpressDesc',
                  features: [
                    'wordpress.themeCustomization',
                    'wordpress.pluginDevelopment',
                    'wordpress.performanceOptimization',
                    'wordpress.ecommerceSetup',
                    'wordpress.maintenanceSupport',
                    'wordpress.seoOptimization'
                  ]
                },
                {
                  icon: '⚛️',
                  titleKey: 'services.frontendDev',
                  descriptionKey: 'services.frontendDesc',
                  features: [
                    'services.feature.uiuxDesign',
                    'services.feature.reactNextjs',
                    'services.feature.responsiveDesign',
                    'services.feature.webVitals',
                    'services.feature.animations',
                    'services.feature.apiIntegration'
                  ]
                },
                {
                  icon: '🔋',
                  titleKey: 'services.backendDev',
                  descriptionKey: 'services.backendDesc',
                  features: [
                    'services.feature.restApi',
                    'services.feature.python',
                    'services.feature.nodejs',
                    'services.feature.database',
                    'services.feature.auth',
                    'services.feature.cloudIntegration'
                  ]
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{t(service.titleKey)}</h3>
                  <p className="text-foreground/70 mb-6">{t(service.descriptionKey)}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section 
          id="faq" 
          ref={faqRef}
          className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                {t('wordpress.faq')}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('services.faqTitle')}
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                {t('services.faqDescription')}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    questionKey: 'services.faq.costQuestion',
                    answerKey: 'services.faq.costAnswer'
                  },
                  {
                    questionKey: 'services.faq.timelineQuestion',
                    answerKey: 'services.faq.timelineAnswer'
                  },
                  {
                    questionKey: 'services.faq.wordpressQuestion',
                    answerKey: 'services.faq.wordpressAnswer'
                  },
                  {
                    questionKey: 'services.faq.blackhatQuestion',
                    answerKey: 'services.faq.blackhatAnswer'
                  },
                  {
                    questionKey: 'services.faq.multilingualQuestion',
                    answerKey: 'services.faq.multilingualAnswer'
                  },
                  {
                    questionKey: 'services.faq.supportQuestion',
                    answerKey: 'services.faq.supportAnswer'
                  }
                ].map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`faq-${idx}`}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 text-right text-lg font-medium hover:no-underline hover:bg-gray-50 text-foreground">
                      {t(faq.questionKey)}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-foreground/80 leading-relaxed">
                      {t(faq.answerKey)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('services.ctaTitle')}
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                {t('services.ctaDescription')}
              </p>
              
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                {t('common.freeConsultation')}
              </a>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
