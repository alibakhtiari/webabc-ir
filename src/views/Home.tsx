"use client";

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import HomeSchema from '@/components/seo/schemas/HomeSchema';
import PagePreloader from '@/components/PagePreloader';

const Home: React.FC = () => {
  return (
    <>
      <HomeSchema />
      <PagePreloader />

      <div className="relative overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home;
