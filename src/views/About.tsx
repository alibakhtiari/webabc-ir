"use client";

import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { createOrganizationSchema } from '@/lib/schema';
import { useLanguage } from '@/contexts/LanguageContext';

interface SchemaData {
  [key: string]: unknown;
}



const About = () => {
  const { language, t, languageMeta } = useLanguage();
  const [schemaMarkup, setSchemaMarkup] = useState<SchemaData[]>([]);

  useEffect(() => {
    // Create schema markup
    const baseUrl = window.location.origin;

    // Organization schema
    const orgSchema = createOrganizationSchema(
      baseUrl,
      `${baseUrl}/images/logo.webp`,
      [
        { telephone: "+1234567890", contactType: "customer service" }
      ],
      language
    );

    setSchemaMarkup([orgSchema]);
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={t('about.title')}
        description={t('about.subtitle')}
        keywords={t('seo.keywords')}
      />

      {schemaMarkup.length > 0 && <SchemaMarkup schema={schemaMarkup} />}
      <Navbar />

      <main className={`flex-1 max-w-6xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full ${languageMeta.fontFamily}`}>
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center">
            <Breadcrumb />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.5]">{t('about.title')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('about.mission')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </Card>


          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="py-6 border-0 bg-blue-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">{t('about.stats.years.value')}</div>
              <div className="text-gray-700">{t('about.yearsExperience')}</div>
            </Card>
            <Card className="py-6 border-0 bg-purple-50">
              <div className="text-3xl font-bold text-purple-600 mb-2">{t('about.stats.projects.value')}</div>
              <div className="text-gray-700">{t('about.successfulProjects')}</div>
            </Card>
            <Card className="py-6 border-0 bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">{t('about.stats.satisfaction.value')}</div>
              <div className="text-gray-700">{t('about.clientSatisfaction')}</div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
