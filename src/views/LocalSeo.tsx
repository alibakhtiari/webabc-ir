"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createServiceSchema } from '@/lib/schema';
import { Globe, Target, Search, MapPin, FileCheck, BarChart } from 'lucide-react';

const LocalSeo = () => {
  const { t, languageMeta, language } = useLanguage();

  const serviceSchema = createServiceSchema(
    t('localSeo.localSeoTitle'),
    t('localSeo.localSeoDescription'),
    `https://webabc.com/${language}/local-seo`,
    "https://webabc.com/images/local-seo.jpg",
    "WebABC",
    "Worldwide",
    language
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={t('localSeo.localSeoTitle')}
        description={t('localSeo.localSeoDescription')}
      />
      <SchemaMarkup schema={serviceSchema} />

      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Breadcrumb />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('localSeo.localSeoTitle')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('localSeo.localSeoDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.gmb'),
                  description: t('localSeo.feature.gmb')
                },
                {
                  icon: <Target className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.localKeywords'),
                  description: t('localSeo.feature.localKeywords')
                },
                {
                  icon: <Search className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.nearMe'),
                  description: t('localSeo.feature.nearMe')
                },
                {
                  icon: <MapPin className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.localLinks'),
                  description: t('localSeo.feature.localLinks')
                },
                {
                  icon: <FileCheck className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.reviews'),
                  description: t('localSeo.feature.reviews')
                },
                {
                  icon: <BarChart className="w-10 h-10 text-primary" />,
                  title: t('localSeo.feature.localReports'),
                  description: t('localSeo.feature.localReports')
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className={`text-xl font-semibold mb-3 ${languageMeta.fontFamily}`}>{feature.title}</h3>
                  <p className={`text-gray-600 ${languageMeta.fontFamily}`}>{feature.description}</p>
                </div>
              ))}
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

export default LocalSeo;
