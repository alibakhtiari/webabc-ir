
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createOrganizationSchema } from '@/lib/schema';
import PagePreloader from '@/components/PagePreloader';

const Home: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();

  // Create organization schema for SEO
  const organizationSchema = createOrganizationSchema(
    window.location.origin,
    "/images/logo.jpg",
    [{ telephone: "+98123456789", contactType: "customer service" }],
    language
  );
  
  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={t('home.heroTitle')} 
        description={t('home.heroDescription')} 
        keywords={t('home.heroKeywords')}
        ogType="website"
      />
      
      <SchemaMarkup schema={organizationSchema} />
      <PagePreloader />
      
      <Navbar />
      
      <main className="relative overflow-x-hidden">
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
