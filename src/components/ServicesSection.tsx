"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import OptimizedImage from './OptimizedImage';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // Use translations for services
  const services = [
    {
      title: t('services.seo.title', { fallback: 'سئو تخصصی و بهینه‌سازی' }),
      description: t('services.seo.description', { fallback: 'افزایش رتبه وب‌سایت شما در موتورهای جستجو با استفاده از تکنیک‌های استاندارد سئو.' }),
      features: [
        t('services.seo.features.0', { fallback: 'تحقیق کلمات کلیدی' }),
        t('services.seo.features.1', { fallback: 'بهینه‌سازی محتوا' }),
        t('services.seo.features.2', { fallback: 'سئو فنی' }),
        t('services.seo.features.3', { fallback: 'لینک‌سازی خارجی' }),
        t('services.seo.features.4', { fallback: 'گزارش‌دهی ماهانه' }),
      ],
    },
    {
      title: t('services.webDesign.title', { fallback: 'طراحی سایت اختصاصی' }),
      description: t('services.webDesign.description', { fallback: 'طراحی و توسعه وب‌سایت با رابط کاربری جذاب، کدنویسی تمیز و سازگار با موبایل.' }),
      features: [
        t('services.webDesign.features.0', { fallback: 'طراحی ریسپانسیو' }),
        t('services.webDesign.features.1', { fallback: 'رابط کاربری مدرن' }),
        t('services.webDesign.features.2', { fallback: 'سرعت بارگذاری بالا' }),
        t('services.webDesign.features.3', { fallback: 'سازگار با سئو' }),
        t('services.webDesign.features.4', { fallback: 'امنیت بالا' }),
      ],
    },
    {
      title: t('services.contentCreation.title', { fallback: 'تولید محتوای تخصصی' }),
      description: t('services.contentCreation.description', { fallback: 'تولید محتوا با کیفیت، اصولی و بهینه شده برای کلمات کلیدی مرتبط با کسب و کار شما.' }),
      features: [
        t('services.contentCreation.features.0', { fallback: 'محتوای تخصصی' }),
        t('services.contentCreation.features.1', { fallback: 'بهینه‌شده برای سئو' }),
        t('services.contentCreation.features.2', { fallback: 'استراتژی محتوا' }),
        t('services.contentCreation.features.3', { fallback: 'تقویم انتشار' }),
        t('services.contentCreation.features.4', { fallback: 'گرافیک اختصاصی' }),
      ],
    },
  ];

  // Map services to their generated images based on index or title key
  const serviceImages = [
    '/images/services/seo.png',
    '/images/services/web-design.png',
    '/images/blog/digital-marketing.webp', // Using a relevant existing image for Content Creation as we didn't generate one specifically named 'content-creation' yet, or reuse web-dev
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-linear-to-b from-white to-gray-50 relative overflow-hidden snap-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 transition-all duration-500">
          <span
            className={cn(
              "inline-block mb-2 px-3 py-1 rounded-full",
              "border border-primary/20 bg-primary/5 text-primary",
              "font-persian text-sm font-medium"
            )}
          >
            {t('services.sectionTag', { fallback: 'خدمات ما' })}
          </span>

          <h2 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance">
            {t('services.sectionTitle.prefix', { fallback: 'راهکارهای ' })}
            <span className="text-primary">{t('services.sectionTitle.highlight', { fallback: 'دیجیتال مارکتینگ' })}</span>
            {t('services.sectionTitle.suffix', { fallback: ' برای کسب و کار شما' })}
          </h2>

          <p className="font-persian text-foreground/80 leading-relaxed text-balance">
            {t('services.sectionDescription', { fallback: 'ما خدمات جامع سئو و توسعه وب را ارائه می‌دهیم تا کسب و کار شما در فضای آنلاین موفق شود. تمامی خدمات ما با استانداردهای روز دنیا و متناسب با نیازهای بازار ایران طراحی شده‌اند.' })}
          </p>
        </div>

        <div className="flex overflow-x-auto -mx-4 px-4 pb-4 mb-8 snap-x">
          <div className="flex space-x-2 space-x-reverse mx-auto font-persian">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "transition-all duration-300 px-6 py-3 rounded-full whitespace-nowrap",
                  "focus:outline-hidden focus:ring-2 focus:ring-primary/40 snap-start",
                  activeTab === idx
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-foreground/80 border border-gray-200 hover:bg-gray-50"
                )}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-on-scroll opacity-0 transition-all duration-500">
          <div
            className="glass-morphism rounded-2xl p-8 transition-all duration-500"
            style={{ minHeight: '400px' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-6">
                <h3 className="font-persian text-2xl font-bold text-foreground">
                  {services[activeTab].title}
                </h3>

                <p className="font-persian text-foreground/80 leading-relaxed">
                  {services[activeTab].description}
                </p>

                <ul className="space-y-3 mt-6">
                  {services[activeTab].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center font-persian">
                      <CheckCircle className="text-primary h-5 w-5 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "mt-8 px-6 py-3 rounded-full bg-primary text-white font-persian",
                    "transition-all duration-300 shadow-md hover:shadow-lg",
                    "hover:translate-y-[-2px]"
                  )}
                >
                  {t('services.consultButton', { fallback: 'مشاوره در مورد' })} {services[activeTab].title}
                </button>
              </div>

              <div className="md:col-span-2">
                <div className="aspect-square w-full rounded-xl overflow-hidden shadow-xl relative">
                  <OptimizedImage
                    key={activeTab}
                    src={serviceImages[activeTab] || '/images/hero-image.webp'}
                    alt={services[activeTab].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-on-scroll opacity-0 transition-all duration-500">
          {[
            {
              title: t('services.keyFeatures.0.title', { fallback: 'تحقیق کلمات کلیدی' }),
              desc: t('services.keyFeatures.0.desc', { fallback: 'شناسایی بهترین کلمات کلیدی برای کسب و کار شما' })
            },
            {
              title: t('services.keyFeatures.1.title', { fallback: 'بهینه‌سازی محتوا' }),
              desc: t('services.keyFeatures.1.desc', { fallback: 'محتوای با کیفیت و بهینه شده برای موتورهای جستجو' })
            },
            {
              title: t('services.keyFeatures.2.title', { fallback: 'لینک‌سازی خارجی' }),
              desc: t('services.keyFeatures.2.desc', { fallback: 'استراتژی حرفه‌ای لینک‌سازی برای افزایش اعتبار سایت' })
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="neo-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-xl font-bold">{idx + 1}</span>
              </div>
              <h3 className="font-persian text-xl font-medium mb-2">{item.title}</h3>
              <p className="font-persian text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
