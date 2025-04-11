
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { language, t, languageMeta } = useLanguage();
  const location = useLocation();
  
  console.log("Home page rendering with language:", language);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div dir={languageMeta.direction} className={language === 'en' ? 'font-sans' : 'font-persian'}>
      <SEOHead 
        title={t('home.heroTitle', { fallback: 'Web Development & SEO Services' })}
        description={t('home.heroDescription', { fallback: 'Professional web development and SEO services to boost your online presence' })}
        keywords={t('home.heroKeywords', { fallback: 'web design, seo, digital marketing' })}
      />
      
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BenefitsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
