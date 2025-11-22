"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema, createServiceSchema, createFAQSchema } from '@/lib/schema';
import { ChevronRight } from 'lucide-react';

interface SchemaData {
  [key: string]: unknown;
}

const ServicesOverview = () => {
  const { t, language, languageMeta } = useLanguage();
  const [schemaMarkup, setSchemaMarkup] = useState<SchemaData[]>([]);

  useEffect(() => {
    // Generate schemas
    const baseUrl = window.location.origin;

    // Organization schema
    const orgSchema = createOrganizationSchema(
      baseUrl,
      `${baseUrl}/images/logo.jpg`,
      [
        { telephone: "+1234567890", contactType: "customer service" }
      ],
      language
    );

    // Service schemas
    const seoServiceSchema = createServiceSchema(
      t('services.seoTitle'),
      t('services.seoDescription'),
      `${baseUrl}/${language}/seo-services`,
      `${baseUrl}/images/seo-service.jpg`,
      'WebABC',
      'Worldwide',
      language
    );

    const webDevServiceSchema = createServiceSchema(
      t('services.webDevTitle'),
      t('services.webDevDescription'),
      `${baseUrl}/${language}/web-development-services`,
      `${baseUrl}/images/webdev-service.jpg`,
      'WebABC',
      'Worldwide',
      language
    );

    const wordpressServiceSchema = createServiceSchema(
      t('wordpress.title'),
      t('wordpress.subtitle'),
      `${baseUrl}/${language}/wordpress-woocommerce-development`,
      `${baseUrl}/images/wordpress-service.jpg`,
      'WebABC',
      'Worldwide',
      language
    );

    const localSeoServiceSchema = createServiceSchema(
      t('services.localSeoTitle'),
      t('services.localSeoDescription'),
      `${baseUrl}/${language}/local-seo-services`,
      `${baseUrl}/images/localseo-service.jpg`,
      'WebABC',
      'Worldwide',
      language
    );

    // FAQ schema
    const faqSchema = createFAQSchema([
      {
        question: t('services.faq.costQuestion'),
        answer: t('services.faq.costAnswer')
      },
      {
        question: t('services.faq.timelineQuestion'),
        answer: t('services.faq.timelineAnswer')
      },
      {
        question: t('services.faq.wordpressQuestion'),
        answer: t('services.faq.wordpressAnswer')
      },
      {
        question: t('services.faq.multilingualQuestion'),
        answer: t('services.faq.multilingualAnswer')
      }
    ], language);

    setSchemaMarkup([
      orgSchema,
      seoServiceSchema,
      webDevServiceSchema,
      wordpressServiceSchema,
      localSeoServiceSchema,
      faqSchema
    ]);
  }, [language, t]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={t('seo.servicesTitle')}
        description={t('seo.servicesDescription')}
        keywords={t('seo.keywords')}
        ogType="website"
      />

      {schemaMarkup.length > 0 && <SchemaMarkup schema={schemaMarkup} />}

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Breadcrumb />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.5]">{t('services.title')}</h1>
              <p className="text-xl text-gray-600">{t('services.description')}</p>

              {/* Quick navigation links */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Link
                  href={`/${language}/seo-services`}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {t('seo.title')}
                </Link>
                <Link
                  href={`/${language}/web-development-services`}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
                >
                  {t('services.webDevelopment')}
                </Link>
                <Link
                  href={`/${language}/wordpress-woocommerce-development`}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                >
                  {t('wordpress.title')}
                </Link>
                <Link
                  href={`/${language}/local-seo`}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors"
                >
                  {t('seo.localSeo')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SEO Services */}
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('seo.title')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('seo.subtitle')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.onPageSeo')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.offPageSeo')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.technicalSeo')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.localSeo')}</span>
                  </li>
                </ul>
                <Link href={`/${language}/seo-services`} className={`inline-flex items-center text-primary font-medium hover:underline ${languageMeta.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {t('common.readMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${languageMeta.direction === 'rtl' ? 'ml-2' : 'ml-2'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points={languageMeta.direction === 'rtl' ? "19 5 12 12 19 19" : "12 5 19 12 12 19"}></polyline>
                  </svg>
                </Link>
              </div>

              {/* Web Development Services */}
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('services.webDevelopment')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('services.webDevelopmentDescription')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('services.feature.uiuxDesign')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('services.feature.responsiveDesign')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('services.feature.apiIntegration')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('services.feature.database')}</span>
                  </li>
                </ul>
                <Link href={`/${language}/web-development-services`} className={`inline-flex items-center text-primary font-medium hover:underline ${languageMeta.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {t('common.readMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${languageMeta.direction === 'rtl' ? 'ml-2' : 'ml-2'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points={languageMeta.direction === 'rtl' ? "19 5 12 12 19 19" : "12 5 19 12 12 19"}></polyline>
                  </svg>
                </Link>
              </div>

              {/* WordPress Services */}
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('wordpress.wordpressAndWoocommerce')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('wordpress.subtitle')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('wordpress.themeCustomization')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('wordpress.pluginDevelopment')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('wordpress.ecommerceSetup')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('wordpress.maintenanceSupport')}</span>
                  </li>
                </ul>
                <Link href={`/${language}/wordpress-woocommerce-development`} className={`inline-flex items-center text-primary font-medium hover:underline ${languageMeta.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {t('common.readMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${languageMeta.direction === 'rtl' ? 'ml-2' : 'ml-2'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points={languageMeta.direction === 'rtl' ? "19 5 12 12 19 19" : "12 5 19 12 12 19"}></polyline>
                  </svg>
                </Link>
              </div>

              {/* Local SEO Services */}
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('seo.localSeo')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('seo.localSeoDesc')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.feature.gmb')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.feature.reviews')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.feature.localKeywords')}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className={`h-5 w-5 text-primary ${languageMeta.direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    <span>{t('seo.feature.nearMe')}</span>
                  </li>
                </ul>
                <Link href={`/${language}/local-seo`} className={`inline-flex items-center text-primary font-medium hover:underline ${languageMeta.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {t('common.readMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${languageMeta.direction === 'rtl' ? 'ml-2' : 'ml-2'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points={languageMeta.direction === 'rtl' ? "19 5 12 12 19 19" : "12 5 19 12 12 19"}></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{t('services.faqTitle')}</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{t('services.faq.costQuestion')}</h3>
                  <p className="text-gray-600">{t('services.faq.costAnswer')}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{t('services.faq.timelineQuestion')}</h3>
                  <p className="text-gray-600">{t('services.faq.timelineAnswer')}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{t('services.faq.wordpressQuestion')}</h3>
                  <p className="text-gray-600">{t('services.faq.wordpressAnswer')}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{t('services.faq.multilingualQuestion')}</h3>
                  <p className="text-gray-600">{t('services.faq.multilingualAnswer')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{t('services.ctaTitle')}</h2>
              <p className="text-xl mb-8 opacity-90">{t('services.ctaDescription')}</p>
              <Link
                href={`/${language}/contact`}
                className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all"
              >
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesOverview;
