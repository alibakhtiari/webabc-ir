
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
import { MapPin, Star, ArrowUpRight, Users, Building, LineChart } from 'lucide-react';

const LocalSeo = () => {
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
    "name": t('seo.localSeoTitle'),
    "description": t('seo.localSeoDescription'),
    "provider": {
      "@type": "Organization",
      "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
      "url": `${window.location.origin}/${language}`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "serviceType": "Local Search Engine Optimization"
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${window.location.origin}/${language}` },
    { name: t('common.services'), item: `${window.location.origin}/${language}/services` },
    { name: t('seo.localSeoTitle'), item: `${window.location.origin}/${language}/local-seo` }
  ]);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={t('seo.localSeoTitle')}
        description={t('seo.localSeoDescription')}
        keywords="local seo, google business profile, local rankings, local citations, review management, maps"
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
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {t('common.services')}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('seo.localSeoTitle')}</h1>
                <p className="text-xl text-gray-700 mb-8">{t('seo.localSeoDescription')}</p>
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
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                    alt="Local SEO Services"
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

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Why Local SEO Matters</h2>
              <p className="text-xl text-gray-600">
                Local SEO helps businesses connect with nearby customers exactly when they're looking for your products or services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard 
                icon={<MapPin className="w-6 h-6" />}
                title="Increased Local Visibility"
                description="Appear in the Google Map Pack and local search results when nearby customers are searching for your services."
              />
              <BenefitCard 
                icon={<Users className="w-6 h-6" />}
                title="Targeted Traffic"
                description="Drive high-intent local customers directly to your business when they're ready to purchase."
              />
              <BenefitCard 
                icon={<Star className="w-6 h-6" />}
                title="Improved Reputation"
                description="Build trust through positive reviews and consistent local citation information."
              />
              <BenefitCard 
                icon={<Building className="w-6 h-6" />}
                title="Beat Local Competition"
                description="Stand out among local competitors with strategic local search optimization."
              />
              <BenefitCard 
                icon={<LineChart className="w-6 h-6" />}
                title="Measurable ROI"
                description="Track increases in store visits, calls, and local sales directly from local SEO efforts."
              />
              <BenefitCard 
                icon={<ArrowUpRight className="w-6 h-6" />}
                title="Mobile Search Optimized"
                description="Capture the growing 'near me' mobile searches that lead to immediate visits."
              />
            </div>
          </div>
        </section>

        {/* Our Local SEO Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Local SEO Services</h2>
              <p className="text-xl text-gray-600">
                Comprehensive local search optimization to help your business dominate the local market.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ServiceCard
                title="Google Business Profile Optimization"
                description="We optimize your Google Business Profile with accurate information, engaging posts, and strategic category selection to improve your local search visibility."
                icon={<MapPin className="w-10 h-10" />}
                color="bg-blue-500"
              />

              <ServiceCard
                title="Local Citation Building"
                description="We create and maintain consistent business listings across authoritative directories and local websites to strengthen your local search presence."
                icon={<Building className="w-10 h-10" />}
                color="bg-green-500"
              />

              <ServiceCard
                title="Review Management"
                description="We implement a strategic approach to gather positive reviews, respond professionally to all reviews, and leverage them to improve your local reputation."
                icon={<Star className="w-10 h-10" />}
                color="bg-yellow-500"
              />

              <ServiceCard
                title="Local Content Strategy"
                description="We create location-specific content that resonates with local audiences and improves your relevance for local search queries."
                icon={<ArrowUpRight className="w-10 h-10" />}
                color="bg-purple-500"
              />
            </div>
          </div>
        </section>

        {/* Case Study Highlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Local SEO Success Story
            </motion.h2>

            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold mb-4">{t('portfolio.caseStudies.localSeoCase.title')}</h3>
                  <p className="text-gray-600 mb-6">{t('portfolio.caseStudies.localSeoCase.challenge')}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t('portfolio.challenge')}</h4>
                      <p className="text-gray-600">{t('portfolio.caseStudies.localSeoCase.challenge')}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t('portfolio.solution')}</h4>
                      <p className="text-gray-600">{t('portfolio.caseStudies.localSeoCase.solution')}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t('portfolio.results')}</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{t('portfolio.caseStudies.localSeoCase.results1')}</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{t('portfolio.caseStudies.localSeoCase.results2')}</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{t('portfolio.caseStudies.localSeoCase.results3')}</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{t('portfolio.caseStudies.localSeoCase.results4')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <p className="italic text-gray-600 mb-4">{t('portfolio.caseStudies.localSeoCase.testimonial')}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        S
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">Dr. Smith</div>
                        <div className="text-sm text-gray-500">SmileBright Dental</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                    alt={t('portfolio.caseStudies.localSeoCase.imageAlt')}
                    className="w-full h-full object-cover"
                    width={600}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60">
                    <div className="absolute bottom-8 right-8 text-white">
                      <div className="text-4xl font-bold mb-2">+400%</div>
                      <div className="text-xl">Appointment Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local SEO Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Local SEO Process
            </motion.h2>

            <div className="flex flex-col space-y-6">
              <ProcessStep 
                number="1"
                title="Local Audit & Analysis"
                description="We analyze your current local presence, competition, and identify opportunities for improvement."
              />
              <ProcessStep 
                number="2"
                title="Google Business Profile Optimization"
                description="We fully optimize your GBP listing with accurate information, photos, and strategic categorization."
              />
              <ProcessStep 
                number="3"
                title="Local Citation Building"
                description="We create consistent NAP (Name, Address, Phone) citations across authoritative directories."
              />
              <ProcessStep 
                number="4"
                title="Review Management & Generation"
                description="We implement systems to generate reviews and respond professionally to all customer feedback."
              />
              <ProcessStep 
                number="5"
                title="Local Content Development"
                description="We create location-specific content to boost your local relevance and engagement."
              />
              <ProcessStep 
                number="6"
                title="Performance Tracking & Reporting"
                description="We monitor rankings, traffic, and conversions while making data-driven adjustments."
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem
                question="How long does it take to see results from Local SEO?"
                answer="While every business is different, most clients begin to see improvements in local search visibility within 1-3 months. Significant ranking improvements and increased customer actions typically occur within 3-6 months of implementing a comprehensive Local SEO strategy."
              />
              <FaqItem
                question="Do I need a physical business address for Local SEO?"
                answer="While having a physical address is advantageous, service-area businesses can still benefit from Local SEO. Google Business Profile allows service-area businesses to hide their physical address while still appearing in local searches relevant to their service areas."
              />
              <FaqItem
                question="How important are reviews for Local SEO?"
                answer="Reviews are extremely important for Local SEO. They directly influence your local search rankings, build trust with potential customers, and improve click-through rates. Our strategy includes ethical review generation and management to help improve both your rankings and reputation."
              />
              <FaqItem
                question="Can you help with businesses that serve multiple locations?"
                answer="Absolutely! We develop strategic approaches for businesses serving multiple locations, whether you have physical offices in each location or service different geographic areas. Our solutions include location-specific pages, proper Google Business Profile setup, and targeted local content strategies."
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
              Ready to Dominate Local Search?
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Get started with a free local SEO audit and consultation. We'll analyze your current local presence and show you exactly how we can help you outrank your competitors.
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

// Benefit Card Component
const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`w-16 h-16 ${color} bg-opacity-20 rounded-xl flex items-center justify-center text-${color.split('-')[1]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <motion.div 
      className="flex bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-xl font-bold">
        {number}
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
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

export default LocalSeo;
