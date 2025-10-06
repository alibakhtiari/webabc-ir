
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import CTASection from '@/components/CTASection';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import portfolioEcommerce from '@/assets/portfolio-ecommerce.jpg';
import portfolioNews from '@/assets/portfolio-news.jpg';
import portfolioCorporate from '@/assets/portfolio-corporate.jpg';

const CaseStudies = () => {
  const { language, t, languageMeta } = useLanguage();
  const Icon = languageMeta.direction === 'rtl' ? ArrowLeft : ArrowRight;
  const caseStudies = [
    {
      id: 'ecommerce-seo',
      title: t('caseStudies.ecommerceCase.title'),
      category: t('caseStudies.ecommerceCase.category'),
      image: portfolioEcommerce,
      challenge: t('caseStudies.ecommerceCase.challenge'),
      solution: t('caseStudies.ecommerceCase.solution'),
      results: [
        t('caseStudies.ecommerceCase.results1'),
        t('caseStudies.ecommerceCase.results2'),
        t('caseStudies.ecommerceCase.results3'),
        t('caseStudies.ecommerceCase.results4')
      ]
    },
    {
      id: 'wordpress-rebrand',
      title: t('caseStudies.wordpressCase.title'),
      category: t('caseStudies.wordpressCase.category'),
      image: portfolioNews,
      challenge: t('caseStudies.wordpressCase.challenge'),
      solution: t('caseStudies.wordpressCase.solution'),
      results: [
        t('caseStudies.wordpressCase.results1'),
        t('caseStudies.wordpressCase.results2'),
        t('caseStudies.wordpressCase.results3')
      ]
    },
    {
      id: 'local-seo-clinic',
      title: t('caseStudies.localSeoCase.title'),
      category: t('caseStudies.localSeoCase.category'),
      image: portfolioCorporate,
      challenge: t('caseStudies.localSeoCase.challenge'),
      solution: t('caseStudies.localSeoCase.solution'),
      results: [
        t('caseStudies.localSeoCase.results1'),
        t('caseStudies.localSeoCase.results2'),
        t('caseStudies.localSeoCase.results3'),
        t('caseStudies.localSeoCase.results4')
      ]
    },
    {
      id: 'webapp-fintech',
      title: t('caseStudies.webDevCase.title'),
      category: t('caseStudies.webDevCase.category'),
      image: portfolioEcommerce,
      challenge: t('caseStudies.webDevCase.challenge'),
      solution: t('caseStudies.webDevCase.solution'),
      results: [
        t('caseStudies.webDevCase.results1'),
        t('caseStudies.webDevCase.results2'),
        t('caseStudies.webDevCase.results3'),
        t('caseStudies.webDevCase.results4')
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${languageMeta.fontFamily}`} dir={languageMeta.direction}>
      <SEOHead
        title={t('caseStudies.title')}
        description={t('caseStudies.description')}
      />

      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('caseStudies.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('caseStudies.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-primary">
                        {study.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{study.title}</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {t('caseStudies.challenge')}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {study.challenge.substring(0, 100)}...
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {t('caseStudies.results')}
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {study.results.slice(0, 2).map((result, idx) => (
                            <li key={idx}>{result}</li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to={`/${language}/case-studies/${study.id}`}
                        className="inline-flex items-center text-primary hover:text-primary/80"
                      >
                        {t('common.readMore')}
                        <Icon className={`${languageMeta.direction === 'rtl' ? 'mr-1' : 'ml-1'} h-4 w-4`} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t('caseStudies.downloadHint')}
              </h3>
              <Button size="lg">
                {t('caseStudies.downloadFull')}
              </Button>
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

export default CaseStudies;
