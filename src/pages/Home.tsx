
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={t('home.heroTitle')}
        description={t('home.heroDescription')}
        keywords={t('home.heroKeywords')}
      />
      
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BenefitsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
