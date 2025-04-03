
import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createOrganizationSchema } from '@/lib/schema';

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

const Index = () => {
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

  // Schema markup for Local Business
  const organizationSchema = createOrganizationSchema();

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden snap-container">
      <SEOHead 
        title="وب آ ب ث | خدمات سئو و طراحی وب‌سایت حرفه‌ای" 
        description="ارائه دهنده خدمات تخصصی سئو و بهینه‌سازی برای موتورهای جستجو، طراحی وب‌سایت و توسعه اپلیکیشن‌های تحت وب با جدیدترین تکنولوژی‌ها" 
        keywords="طراحی سایت، سئو، بهینه سازی سایت، طراحی وب، دیجیتال مارکتینگ، وردپرس"
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

export default Index;
