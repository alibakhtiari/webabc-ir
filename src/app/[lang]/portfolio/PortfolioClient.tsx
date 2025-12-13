"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Rendered obsolete by OptimizedImage
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import PortfolioSchema from '@/components/seo/schemas/PortfolioSchema';
import { portfolioItems } from '@/lib/portfolioData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const portfolioEcommerce = '/images/portfolio-ecommerce.webp';
const portfolioNews = '/images/portfolio-news.webp';
const portfolioCorporate = '/images/portfolio-corporate.webp';

const Portfolio = () => {
  const { t, language, languageMeta } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const caseStudies = [
    {
      id: 'ecommerce-seo',
      title: t('caseStudies.ecommerceCase.title'),
      category: 'SEO',
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
      category: 'Web Design',
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
      category: 'Local SEO',
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
      category: 'E-commerce',
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

  // Filter portfolio items by language
  const filteredPortfolio = portfolioItems.filter(
    item => !item.language || item.language === language
  );

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(filteredPortfolio.map(item => item.category)))];

  const getCategoryLabel = (category: string) => {
    if (category === 'all') return t('portfolio.allProjects');
    if (category === 'Web Design') return t('portfolio.webDesign');
    if (category === 'SEO') return t('portfolio.seoProjects');
    if (category === 'Local SEO') return t('portfolio.localSeo');
    if (category === 'E-commerce') return t('portfolio.ecommerce');
    return category;
  };

  const displayedItems = activeTab === 'all'
    ? filteredPortfolio
    : filteredPortfolio.filter(item => item.category === activeTab);

  return (
    <>
      <PortfolioSchema />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-linear-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Breadcrumb />
              <Badge className="mb-4" variant="secondary">
                {t('portfolio.title')}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
                {t('portfolio.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('portfolio.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio & Case Studies Tabs */}
        < section className="py-16" >
          <div className="container mx-auto px-4">
            <Tabs defaultValue="portfolio" className="w-full" dir={languageMeta.direction}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="portfolio">{t('common.portfolio')}</TabsTrigger>
                <TabsTrigger value="case-studies">{t('common.caseStudies')}</TabsTrigger>
              </TabsList>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      variant={activeTab === category ? 'default' : 'outline-solid'}
                      className="rounded-full"
                    >
                      {getCategoryLabel(category)}
                    </Button>
                  ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedItems.map((item) => (
                    <Link key={item.id} href={`/${language}/portfolio/${item.id}`}>
                      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                        <div className="relative aspect-video overflow-hidden">
                          <OptimizedImage
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-primary/90">{getCategoryLabel(item.category)}</Badge>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 mb-4">
                            {item.description}
                          </p>
                          <div className="flex items-center text-primary font-medium">
                            {t('common.viewDetails')}
                            <ArrowRight className={`${languageMeta.direction === 'rtl' ? 'mr-2' : 'ml-2'} h-4 w-4 group-hover:translate-x-1 transition-transform`} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Case Studies Tab */}
              <TabsContent value="case-studies">
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {caseStudies.map((study) => (
                    <Card key={study.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                      <div className="aspect-video overflow-hidden relative">
                        <OptimizedImage
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-3" variant="secondary">{study.category}</Badge>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {study.title}
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                              {t('caseStudies.challenge')}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {study.challenge.substring(0, 120)}...
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                              {t('caseStudies.results')}
                            </h4>
                            <ul className="space-y-2">
                              {study.results.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-16 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {t('caseStudies.downloadHint')}
                  </h3>
                  <Button size="lg" className="rounded-full">
                    {t('caseStudies.downloadFull')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section >

        {/* CTA Section */}
        < section className="py-20 bg-linear-to-br from-primary to-primary/80 text-white" >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary" className="rounded-full" asChild>
                  <Link href={`/${language}/contact`}>
                    {t('cta.primaryButton')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-white/10 text-white hover:bg-white/20" asChild>
                  <Link href={`/${language}/contact`}>
                    {t('cta.secondaryButton')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section >
      </div >
    </>
  );
};

export default Portfolio;
