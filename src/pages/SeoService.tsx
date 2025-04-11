
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/OptimizedImage';
import { createBreadcrumbSchema } from '@/lib/schema';
import { motion } from 'framer-motion';
import { ChartBar, Search, Globe, FileText, LinkIcon, PieChart } from 'lucide-react';

const SeoService = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location]);

  // Create service schema for SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('seo.title'),
    "description": t('seo.subtitle'),
    "provider": {
      "@type": "Organization",
      "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
      "url": `${window.location.origin}/${language}`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "serviceType": "Search Engine Optimization"
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${window.location.origin}/${language}` },
    { name: t('common.services'), item: `${window.location.origin}/${language}/services` },
    { name: t('seo.title'), item: `${window.location.origin}/${language}/seo-services` }
  ]);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={t('seo.title')}
        description={t('seo.subtitle')}
        keywords="seo, search engine optimization, keyword research, content strategy, link building, technical seo"
      />
      <SchemaMarkup schema={[serviceSchema, breadcrumbSchema]} />
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('seo.title')}</h1>
                <p className="text-xl text-gray-700 mb-8">{t('seo.subtitle')}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                    {t('common.freeConsultation')}
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all">
                    {t('common.viewPortfolio')}
                  </button>
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              {...fadeInUp}
            >
              {t('seo.servicesTitle')}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SeoServiceCard
                icon={<Search className="w-6 h-6" />}
                title={t('seo.onPageSeo')}
                description={t('seo.contentStrategyDesc')}
                features={[
                  t('seo.feature.keywordResearch'),
                  t('seo.feature.qualityContent'),
                  t('seo.feature.titleOptimization'),
                  t('seo.feature.headings')
                ]}
                color="bg-blue-50"
                iconColor="text-blue-600"
              />
              
              <SeoServiceCard
                icon={<Globe className="w-6 h-6" />}
                title={t('seo.technicalSeo')}
                description={t('seo.technicalSeoDesc')}
                features={[
                  t('seo.feature.pageSpeed'),
                  t('seo.feature.technicalErrors'),
                  t('seo.feature.urlStructure'),
                  t('seo.feature.schema')
                ]}
                color="bg-green-50"
                iconColor="text-green-600"
              />
              
              <SeoServiceCard
                icon={<LinkIcon className="w-6 h-6" />}
                title={t('seo.offPageSeo')}
                description={t('seo.offPageSeoDesc')}
                features={[
                  t('seo.feature.linkProfile'),
                  t('seo.feature.linkOpportunities'),
                  t('seo.feature.linkableContent'),
                  t('seo.feature.authorityLinks')
                ]}
                color="bg-purple-50"
                iconColor="text-purple-600"
              />
              
              <SeoServiceCard
                icon={<PieChart className="w-6 h-6" />}
                title={t('seo.localSeo')}
                description={t('seo.localSeoDesc')}
                features={[
                  t('seo.feature.gmb'),
                  t('seo.feature.reviews'),
                  t('seo.feature.localKeywords'),
                  t('seo.feature.nearMe')
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
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              {...fadeInUp}
            >
              Our Results
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <ResultsCard number="250%" text="Average Traffic Increase" />
              <ResultsCard number="85%" text="Clients on First Page" />
              <ResultsCard number="120+" text="SEO Projects Completed" />
              <ResultsCard number="30%" text="Average Conversion Lift" />
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">Featured SEO Case Studies</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard
                  title="E-commerce Traffic Growth"
                  category="E-commerce SEO"
                  image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  result="+250% Organic Traffic"
                />
                <CaseStudyCard
                  title="Local Business Domination"
                  category="Local SEO"
                  image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  result="Top 3 Rankings for Key Terms"
                />
                <CaseStudyCard
                  title="B2B Lead Generation"
                  category="SEO & Content Strategy"
                  image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  result="+180% Inbound Leads"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              {...fadeInUp}
            >
              Our SEO Process
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProcessCard 
                number="01"
                title="Research & Analysis"
                description="We analyze your website, competitors, and target keywords to create a comprehensive SEO strategy."
                color="bg-blue-500"
              />
              <ProcessCard 
                number="02"
                title="Implementation"
                description="Our team implements on-page and technical SEO optimizations based on our research findings."
                color="bg-green-500"
              />
              <ProcessCard 
                number="03"
                title="Monitor & Optimize"
                description="We continuously monitor rankings and traffic, making data-driven adjustments to improve results."
                color="bg-purple-500"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              {...fadeInUp}
            >
              {t('services.faqTitle')}
            </motion.h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem
                question={t('services.faq.costQuestion')}
                answer={t('services.faq.costAnswer')}
              />
              <FaqItem
                question={t('services.faq.timelineQuestion')}
                answer={t('services.faq.timelineAnswer')}
              />
              <FaqItem
                question={t('services.faq.blackhatQuestion')}
                answer={t('services.faq.blackhatAnswer')}
              />
              <FaqItem
                question={t('services.faq.multilingualQuestion')}
                answer={t('services.faq.multilingualAnswer')}
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Improve Your Search Rankings?
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Contact us today for a free website audit and SEO consultation. We'll show you exactly how we can improve your search visibility.
            </motion.p>
            <motion.button 
              className="px-8 py-4 bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition-all font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('common.freeConsultation')}
            </motion.button>
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
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
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
    </motion.div>
  );
};

// Results Card Component
const ResultsCard = ({ number, text }: { number: string, text: string }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-gray-700">{text}</div>
    </motion.div>
  );
};

// Case Study Card Component
const CaseStudyCard = ({ title, category, image, result }: { title: string, category: string, image: string, result: string }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
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
    </motion.div>
  );
};

// Process Card Component
const ProcessCard = ({ number, title, description, color }: { number: string, title: string, description: string, color: string }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
      <div className="mb-4">
        <span className={`text-3xl font-bold ${color.replace('bg-', 'text-')}`}>{number}</span>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div 
      className="border border-gray-200 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button 
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <svg 
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </motion.div>
  );
};

export default SeoService;
