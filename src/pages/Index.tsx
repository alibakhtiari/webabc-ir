
import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createOrganizationSchema } from '@/lib/schema';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy loading components
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const BenefitsSection = lazy(() => import('@/components/BenefitsSection'));
const CTASection = lazy(() => import('@/components/CTASection'));

// Fallback component for lazy loaded sections
const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-64 bg-gray-100 rounded-lg"></div>
  </div>
);

const IndexPage = () => {
  const { t, language, languageMeta } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  // Schema markup for Organization
  const organizationSchema = createOrganizationSchema(
    window.location.origin,
    "/images/logo.jpg",
    [{ telephone: "+98123456789", contactType: "customer service" }],
    language
  );

  return (
    <div className="relative overflow-x-hidden" dir={languageMeta.direction === 'rtl' ? 'rtl' : 'ltr'}>
      <SEOHead 
        title={t('home.heroTitle', { fallback: 'Web Development & SEO Services' })} 
        description={t('home.heroDescription', { fallback: 'Professional web development and SEO services to boost your online presence' })} 
        keywords={t('home.heroKeywords', { fallback: 'web design, seo, digital marketing' })}
        ogType="website"
      />
      
      <SchemaMarkup schema={organizationSchema} />
      
      <Navbar />
      <main className="mt-20">
        <HeroSection />
        
        <Suspense fallback={<SectionSkeleton />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <BenefitsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;
