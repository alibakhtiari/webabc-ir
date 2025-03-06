
import React from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WordpressHeroSection from '@/components/wordpress/HeroSection';
import WordpressBenefitsSection from '@/components/wordpress/BenefitsSection';
import WordpressServicesSection from '@/components/wordpress/ServicesSection';
import WordpressPortfolioSection from '@/components/wordpress/PortfolioSection';
import WordpressPricingSection from '@/components/wordpress/PricingSection';
import WordpressCTASection from '@/components/wordpress/CTASection';
import WordpressFAQSection from '@/components/wordpress/FAQSection';

const WordpressWoocommerceDevelopment = () => {
  return (
    <div className="min-h-screen font-persian" dir="rtl">
      <SEOHead 
        title="خدمات طراحی سایت با وردپرس و ووکامرس | توسعه وردپرس حرفه‌ای"
        description="طراحی و توسعه حرفه‌ای سایت‌های وردپرسی و فروشگاه‌های ووکامرس با قالب‌های اختصاصی، سرعت بالا و امنیت تضمین شده"
      />
      
      <Navbar />
      
      <WordpressHeroSection />
      <WordpressBenefitsSection />
      <WordpressServicesSection />
      <WordpressPortfolioSection />
      <WordpressPricingSection />
      <WordpressCTASection />
      <WordpressFAQSection />
      
      <Footer />
    </div>
  );
};

export default WordpressWoocommerceDevelopment;
