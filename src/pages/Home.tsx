
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';

const Home: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const location = useLocation();
  
  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <Helmet>
        <title>{t('home.heroTitle')}</title>
        <meta name="description" content={t('home.heroDescription')} />
        <meta name="keywords" content={t('home.heroKeywords')} />
        <html lang={language} />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
