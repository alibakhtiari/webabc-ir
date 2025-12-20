"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from '@/components/OptimizedImage';
import { getImageData } from '@/lib/imageUtils';

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language, languageMeta } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation class but don't remove it once added
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

  // Get benefits from translations instead of hardcoding
  const benefits = [
    {
      title: t('benefits.brandCredibility.title', { fallback: 'افزایش اعتبار برند' }),
      description: t('benefits.brandCredibility.description', { fallback: 'با حضور قدرتمند در نتایج جستجو، اعتبار برند خود را افزایش دهید.' }),
    },
    {
      title: t('benefits.increaseSales.title', { fallback: 'افزایش فروش و درآمد' }),
      description: t('benefits.increaseSales.description', { fallback: 'با جذب ترافیک هدفمند، نرخ تبدیل و فروش خود را افزایش دهید.' }),
    },
    {
      title: t('benefits.reduceCosts.title', { fallback: 'کاهش هزینه‌های تبلیغاتی' }),
      description: t('benefits.reduceCosts.description', { fallback: 'با بهبود رتبه‌های ارگانیک، هزینه‌های تبلیغات کلیکی را کاهش دهید.' }),
    },
    {
      title: t('benefits.competitiveAdvantage.title', { fallback: 'برتری نسبت به رقبا' }),
      description: t('benefits.competitiveAdvantage.description', { fallback: 'با استراتژی‌های سئوی پیشرفته، از رقبای خود پیشی بگیرید.' }),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="py-24 relative overflow-hidden snap-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
          <span
            className={cn(
              "inline-block mb-2 px-3 py-1 rounded-full",
              "border border-primary/20 bg-primary/5 text-primary",
              "font-persian text-sm font-medium"
            )}
          >
            {t('benefits.sectionTag', { fallback: 'مزایای همکاری با ما' })}
          </span>

          <h2 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance">
            {t('benefits.sectionTitle.prefix', { fallback: 'چرا ' })}
            <span className="text-primary">{t('benefits.sectionTitle.highlight', { fallback: 'وب آ ب ث' })}</span>
            {t('benefits.sectionTitle.suffix', { fallback: ' را انتخاب کنید؟' })}
          </h2>

          <p className="font-persian text-foreground/80 leading-relaxed text-balance">
            {t('benefits.sectionDescription', { fallback: 'ما با تمرکز بر نتایج ملموس و استراتژی‌های اثبات شده، به کسب و کار شما کمک می‌کنیم تا در دنیای دیجیتال امروزی رشد کند.' })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 glass-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-md"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-persian text-xl font-medium">{benefit.title}</h3>
                  <p className="font-persian text-foreground/70">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll opacity-0 neo-morphism rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div
                className="flex max-w-max mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                <span>
                  {t('benefits.guaranteeTag', { fallback: 'تضمین نتیجه' })}
                </span>
              </div>

              <h3 className="font-persian text-2xl md:text-3xl font-bold mb-6 text-balance">
                {t('benefits.guaranteeTitle.prefix', { fallback: 'نتایج ملموس با روش‌های ' })}
                <span className="text-primary">{t('benefits.guaranteeTitle.highlight', { fallback: 'اثبات شده' })}</span>
              </h3>

              <p className="font-persian text-foreground/80 leading-relaxed mb-8 text-balance">
                {t('benefits.guaranteeDescription', { fallback: 'ما معتقدیم که سئو یک فرآیند مستمر است و با برنامه‌ریزی دقیق و استراتژی‌های اصولی، نتایج درازمدت و پایداری را برای کسب و کار شما به ارمغان می‌آوریم.' })}
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  t('benefits.guaranteeFeatures.0', { fallback: 'گزارش‌های ماهانه با متریک‌های دقیق' }),
                  t('benefits.guaranteeFeatures.1', { fallback: 'شفافیت کامل در تمام مراحل همکاری' }),
                  t('benefits.guaranteeFeatures.2', { fallback: 'تضمین بهبود رتبه در کلمات کلیدی هدف' }),
                  t('benefits.guaranteeFeatures.3', { fallback: 'قراردادهای منعطف و بدون تعهد بلندمدت' })
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center font-persian">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary me-3 shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  className={cn(
                    "px-6 py-3 rounded-full bg-primary text-white font-persian",
                    "transition-all duration-300 shadow-md hover:shadow-lg",
                    "hover:translate-y-[-2px] flex items-center"
                  )}
                >
                  <span>{t('benefits.ctaButton', { fallback: 'دریافت مشاوره رایگان' })}</span>
                  {languageMeta.direction === 'rtl' ? (
                    <ArrowLeft className="h-4 w-4 me-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 ms-2" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-auto bg-gray-50 flex items-center justify-center min-h-[400px]">
              <OptimizedImage
                src="/images/seo-results.webp"
                imageData={getImageData('/images/seo-results.webp')}
                alt={t('benefits.imageAlt', { fallback: 'تصویر نتایج سئو' })}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
