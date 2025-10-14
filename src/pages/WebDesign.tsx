
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/OptimizedImage';
import { createBreadcrumbSchema } from '@/lib/schema';

const WebDesign = () => {
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
    "name": t('services.webDevelopmentTitle'),
    "description": t('services.webDevelopmentDescription'),
    "provider": {
      "@type": "Organization",
      "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
      "url": `${window.location.origin}/${language}`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "serviceType": "Web Design and Development"
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('common.home'), item: `${window.location.origin}/${language}` },
    { name: t('common.services'), item: `${window.location.origin}/${language}/services` },
    { name: t('services.webDevelopmentTitle'), item: `${window.location.origin}/${language}/web-design` }
  ]);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'}>
      <SEOHead 
        title={t('services.webDevelopmentTitle')}
        description={t('services.webDevelopmentDescription')}
        keywords="web design, web development, responsive design, UI/UX design, WordPress, React"
      />
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
              <div className="lg:w-1/2 animate-fade-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.webDevelopmentTitle')}</h1>
                <p className="text-xl text-gray-700 mb-8">{t('services.webDevelopmentDescription')}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                    {t('common.freeConsultation')}
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all">
                    {t('common.viewPortfolio')}
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    alt="Web Design and Development"
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

        {/* Services Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
              {t('services.ourServices')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('services.feature.uiuxDesign')}</h3>
                <p className="text-gray-600">
                  Professional UI/UX design that ensures your website is not only beautiful but also user-friendly and effective.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('services.feature.responsiveDesign')}</h3>
                <p className="text-gray-600">
                  Fully responsive websites that look and function perfectly on all devices and screen sizes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('wordpress.themeCustomization')}</h3>
                <p className="text-gray-600">
                  Custom WordPress themes and plugins tailored to your specific business requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('services.feature.reactNextjs')}</h3>
                <p className="text-gray-600">
                  Modern web applications built with React.js and Next.js for superior performance and user experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('wordpress.ecommerceSetup')}</h3>
                <p className="text-gray-600">
                  E-commerce solutions with WooCommerce, Shopify, or custom platforms to sell your products or services online.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('wordpress.seoOptimization')}</h3>
                <p className="text-gray-600">
                  SEO-friendly website architecture and optimization for better search engine visibility and ranking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
              Our Web Design Process
            </h2>

            <div className="relative">
              {/* Timeline bar */}
              <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20"></div>
              
              {/* Timeline steps */}
              <div className="space-y-12">
                <TimelineItem 
                  title="Discovery & Planning" 
                  description="We analyze your requirements, target audience, and business goals to create a comprehensive project plan."
                  index={1}
                  isLeft={true}
                />
                <TimelineItem 
                  title="Wireframing & Prototyping" 
                  description="We create wireframes and interactive prototypes to visualize the user interface and experience."
                  index={2}
                  isLeft={false}
                />
                <TimelineItem 
                  title="Design & Development" 
                  description="Our designers and developers work together to create a visually stunning and technically robust website."
                  index={3}
                  isLeft={true}
                />
                <TimelineItem 
                  title="Testing & Quality Assurance" 
                  description="We rigorously test the website for functionality, compatibility, and performance across all devices."
                  index={4}
                  isLeft={false}
                />
                <TimelineItem 
                  title="Launch & Support" 
                  description="We deploy your website and provide ongoing support and maintenance to keep it running smoothly."
                  index={5}
                  isLeft={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
              Technologies We Use
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <TechItem name="React" icon="⚛️" />
              <TechItem name="Next.js" icon="▲" />
              <TechItem name="WordPress" icon="W" />
              <TechItem name="Tailwind CSS" icon="🎨" />
              <TechItem name="Node.js" icon="🟢" />
              <TechItem name="MongoDB" icon="🍃" />
              <TechItem name="TypeScript" icon="TS" />
              <TechItem name="GraphQL" icon="◢" />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 animate-fade-up">
              {t('services.ctaTitle')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('services.ctaDescription')}
            </p>
            <button className="px-8 py-4 bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition-all font-bold animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('common.freeConsultation')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Timeline item component
const TimelineItem = ({ title, description, index, isLeft }: { title: string, description: string, index: number, isLeft: boolean }) => {
  return (
    <div className="relative flex flex-col lg:flex-row items-start">
      <div className={`lg:w-1/2 ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:order-last'}`}>
        <div className="bg-white p-6 rounded-xl shadow-md animate-fade-up">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="absolute left-0 lg:left-1/2 top-0 flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white -translate-x-1/2 ml-4 lg:ml-0 shadow-md z-10 animate-fade-up">
        {index}
      </div>
      <div className={`lg:w-1/2 ${!isLeft ? 'lg:pr-12 hidden lg:block' : 'lg:pl-12 hidden lg:block'}`}></div>
    </div>
  );
};

// Technology item component
const TechItem = ({ name, icon }: { name: string, icon: string }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-fade-up">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-medium">{name}</div>
    </div>
  );
};

export default WebDesign;
