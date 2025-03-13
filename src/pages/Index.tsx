
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

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
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "وب آ ب ث",
    "description": "ارائه دهنده خدمات تخصصی سئو و بهینه‌سازی برای موتورهای جستجو، طراحی وب‌سایت و توسعه اپلیکیشن‌های تحت وب با جدیدترین تکنولوژی‌ها",
    "image": "https://yourwebsite.com/images/logo.jpg",
    "url": "https://yourwebsite.com",
    "telephone": "+982112345678",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "خیابان ولیعصر، بالاتر از میدان ونک",
      "addressLocality": "تهران",
      "postalCode": "1234567890",
      "addressCountry": "IR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7219,
      "longitude": 51.3347
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/webabc",
      "https://www.linkedin.com/company/webabc",
      "https://twitter.com/webabc"
    ]
  };

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden snap-container">
      <SEOHead 
        title="وب آ ب ث | خدمات سئو و طراحی وب‌سایت حرفه‌ای" 
        description="ارائه دهنده خدمات تخصصی سئو و بهینه‌سازی برای موتورهای جستجو، طراحی وب‌سایت و توسعه اپلیکیشن‌های تحت وب با جدیدترین تکنولوژی‌ها" 
      />
      
      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="mt-20">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
