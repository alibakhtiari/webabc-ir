"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/OptimizedImage';
import { createBreadcrumbSchema } from '@/lib/schema';
import { ChartBar, Search, Globe, FileText, LinkIcon, PieChart } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import FAQ from '@/components/FAQ';
import '@/animations.css';

const SeoService = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, [pathname]);

  // Create service schema for SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('seoService.title'),
    "description": t('seoService.subtitle'),
    "provider": {
      "@type": "Organization",
      "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
      "url": `${origin}/${language}`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "serviceType": "Search Engine Optimization"
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${origin}/${language}` },
    { name: t('common.services'), item: `${origin}/${language}/services` },
    { name: t('seoService.title'), item: `${origin}/${language}/seo-services` }
  ]);

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>

      <SchemaMarkup schema={[serviceSchema, breadcrumbSchema]} />
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-8">
              <Breadcrumb />
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 animate-fadeInLeft">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('seoService.title')}</h1>
                <p className="text-xl text-gray-700 mb-8">{t('seoService.subtitle')}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                    {t('common.freeConsultation')}
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all">
                    {t('common.viewPortfolio')}
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 animate-fadeInRight">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                    alt="SEO Services"
                    priority={true}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
              {t('seoService.servicesTitle')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SeoServiceCard
                icon={<Search className="w-6 h-6" />}
                title={t('seoService.onPageSeo')}
                description={t('seoService.contentStrategyDesc')}
                features={[
                  t('seoService.feature.keywordResearch'),
                  t('seoService.feature.qualityContent'),
                  t('seoService.feature.titleOptimization'),
                  t('seoService.feature.headings')
                ]}
                color="bg-blue-50"
                iconColor="text-blue-600"
              />

              <SeoServiceCard
                icon={<Globe className="w-6 h-6" />}
                title={t('seoService.technicalSeo')}
                description={t('seoService.technicalSeoDesc')}
                features={[
                  t('seoService.feature.pageSpeed'),
                  t('seoService.feature.technicalErrors'),
                  t('seoService.feature.urlStructure'),
                  t('seoService.feature.schema')
                ]}
                color="bg-green-50"
                iconColor="text-green-600"
              />

              <SeoServiceCard
                icon={<LinkIcon className="w-6 h-6" />}
                title={t('seoService.offPageSeo')}
                description={t('seoService.offPageSeoDesc')}
                features={[
                  t('seoService.feature.linkProfile'),
                  t('seoService.feature.linkOpportunities'),
                  t('seoService.feature.linkableContent'),
                  t('seoService.feature.authorityLinks')
                ]}
                color="bg-purple-50"
                iconColor="text-purple-600"
              />

              <SeoServiceCard
                icon={<PieChart className="w-6 h-6" />}
                title={t('seoService.localSeo')}
                description={t('seoService.localSeoDesc')}
                features={[
                  t('seoService.feature.gmb'),
                  t('seoService.feature.reviews'),
                  t('seoService.feature.localKeywords'),
                  t('seoService.feature.nearMe')
                ]}
                color="bg-amber-50"
                iconColor="text-amber-600"
              />
            </div>
          </div>
        </section>

        {/* Results & Case Studies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
              {t('seoService.results.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <ResultsCard number="250%" text={t('seoService.results.trafficIncrease')} />
              <ResultsCard number="85%" text={t('seoService.results.firstPage')} />
              <ResultsCard number="120+" text={t('seoService.results.projectsCompleted')} />
              <ResultsCard number="30%" text={t('seoService.results.conversionLift')} />
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">{t('seoService.caseStudies.title')}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard
                  title={t('seoService.caseStudies.ecommerce.title')}
                  category={t('seoService.caseStudies.ecommerce.category')}
                  image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  result={t('seoService.caseStudies.ecommerce.result')}
                />
                <CaseStudyCard
                  title={t('seoService.caseStudies.local.title')}
                  category={t('seoService.caseStudies.local.category')}
                  image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  result={t('seoService.caseStudies.local.result')}
                />
                <CaseStudyCard
                  title={t('seoService.caseStudies.b2b.title')}
                  category={t('seoService.caseStudies.b2b.category')}
                  image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  result={t('seoService.caseStudies.b2b.result')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
              {t('seoService.process.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProcessCard
                number="01"
                title={t('seoService.process.step1.title')}
                description={t('seoService.process.step1.description')}
                color="bg-blue-500"
              />
              <ProcessCard
                number="02"
                title={t('seoService.process.step2.title')}
                description={t('seoService.process.step2.description')}
                color="bg-green-500"
              />
              <ProcessCard
                number="03"
                title={t('seoService.process.step3.title')}
                description={t('seoService.process.step3.description')}
                color="bg-purple-500"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ
          items={[
            { question: t('services.faq.costQuestion'), answer: t('services.faq.costAnswer') },
            { question: t('services.faq.timelineQuestion'), answer: t('services.faq.timelineAnswer') },
            { question: t('services.faq.blackhatQuestion'), answer: t('services.faq.blackhatAnswer') },
            { question: t('services.faq.multilingualQuestion'), answer: t('services.faq.multilingualAnswer') }
          ]}
          title={t('services.faqTitle')}
        />

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 animate-fadeIn">
              {t('seoService.cta.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 animate-fadeIn delay-100">
              {t('seoService.cta.description')}
            </p>
            <button className="px-8 py-4 bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition-all font-bold animate-fadeInUp delay-200">
              {t('common.freeConsultation')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// SEO Service Card Component
const SeoServiceCard = ({ icon, title, description, features, color, iconColor }: {
  icon: React.ReactNode,
  title: string,
  description: string,
  features: string[],
  color: string,
  iconColor: string
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'
        }`}
    >
      <div className={`p-6 ${color}`}>
        <div className={`rounded-full w-12 h-12 flex items-center justify-center ${iconColor} bg-white mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Results Card Component
const ResultsCard = ({ number, text }: { number: string, text: string }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-md p-6 text-center ${isIntersecting ? 'animate-scaleIn' : 'opacity-0'
        }`}
    >
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-gray-700">{text}</div>
    </div>
  );
};

// Case Study Card Component
const CaseStudyCard = ({ title, category, image, result }: { title: string, category: string, image: string, result: string }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'
        }`}
    >
      <div className="relative">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full aspect-video object-cover"
          width={400}
          height={225}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">{category}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex items-center text-green-600">
          <ChartBar className="w-4 h-4 mr-2" />
          <span className="font-medium">{result}</span>
        </div>
      </div>
    </div>
  );
};

// Process Card Component
const ProcessCard = ({ number, title, description, color }: { number: string, title: string, description: string, color: string }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-md p-6 relative overflow-hidden ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'
        }`}
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
      <div className="mb-4">
        <span className={`text-3xl font-bold ${color.replace('bg-', 'text-')}`}>{number}</span>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};



export default SeoService;
