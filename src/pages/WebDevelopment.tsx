
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import CTASection from '@/components/CTASection';
import { Layout, Code, Database, Shield, Smartphone, Server } from 'lucide-react';

const WebDevelopment = () => {
  const { t, languageMeta } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir={languageMeta.direction}>
      <SEOHead 
        title={t('seo.webDevTitle')} 
        description={t('seo.webDevDescription')}
      />

      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${languageMeta.fontFamily}`}>
                {t('services.webDevelopmentTitle')}
              </h1>
              <p className={`text-xl text-gray-600 ${languageMeta.fontFamily}`}>
                {t('services.webDevelopmentDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl font-bold mb-12 text-center ${languageMeta.fontFamily}`}>
              {t('services.ourServices')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend Development */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <Layout className="w-12 h-12 text-primary" />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${languageMeta.fontFamily}`}>
                  {t('services.frontendDev')}
                </h3>
                <p className={`text-gray-600 mb-6 ${languageMeta.fontFamily}`}>
                  {t('services.frontendDesc')}
                </p>
                <div className="space-y-3">
                  {['uiuxDesign', 'reactNextjs', 'responsiveDesign', 'webVitals', 'animations', 'apiIntegration'].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className={`text-gray-700 ${languageMeta.fontFamily}`}>
                        {t(`services.feature.${feature}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Development */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <Server className="w-12 h-12 text-primary" />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${languageMeta.fontFamily}`}>
                  {t('services.backendDev')}
                </h3>
                <p className={`text-gray-600 mb-6 ${languageMeta.fontFamily}`}>
                  {t('services.backendDesc')}
                </p>
                <div className="space-y-3">
                  {['restApi', 'python', 'nodejs', 'database', 'auth', 'cloudIntegration'].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className={`text-gray-700 ${languageMeta.fontFamily}`}>
                        {t(`services.feature.${feature}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default WebDevelopment;
