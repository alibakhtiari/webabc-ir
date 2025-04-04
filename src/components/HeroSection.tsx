
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="col-span-1 lg:col-span-6 text-center lg:text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="px-8" asChild>
                <Link to={`/${language}/services`}>
                  {t('hero.primaryCta')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8" asChild>
                <Link to={`/${language}/portfolio`} className="flex items-center gap-2">
                  {t('hero.secondaryCta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-6">
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full transform scale-110"></div>
              <img 
                src="/images/hero-image.png" 
                alt={t('hero.imageAlt')} 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
