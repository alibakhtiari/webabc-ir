"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Rendered obsolete by OptimizedImage
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import PortfolioSchema from '@/components/seo/schemas/PortfolioSchema';
import { PortfolioItem } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PortfolioClientProps {
  items: PortfolioItem[];
}

const Portfolio = ({ items }: PortfolioClientProps) => {
  const { t, language, languageMeta } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');



  // Filter portfolio items by language
  const filteredPortfolio = items;

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
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
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

        {/* Portfolio Grid Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  variant={activeTab === category ? 'default' : 'outline'}
                  className="rounded-full"
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedItems.map((item) => (
                <Link key={item.slug} href={`/${language}/portfolio/${item.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                    <div className="relative aspect-video overflow-hidden">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        {languageMeta.direction === 'rtl' ? (
                          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Section */}
        < section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white" >
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
