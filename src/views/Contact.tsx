"use client";

import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';

import { useLanguage } from '@/contexts/LanguageContext';

// Lazy loading components
const Button = lazy(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })));
const Input = lazy(() => import('@/components/ui/input').then(mod => ({ default: mod.Input })));
const Textarea = lazy(() => import('@/components/ui/textarea').then(mod => ({ default: mod.Textarea })));

// Fallback components
const ButtonSkeleton = () => (
  <div className="w-full h-10 bg-primary/30 rounded animate-pulse"></div>
);

const InputSkeleton = () => (
  <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>
);

const TextareaSkeleton = () => (
  <div className="w-full h-32 bg-gray-100 rounded animate-pulse"></div>
);

const Contact = () => {
  const { language, t, languageMeta } = useLanguage();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('common.contact'),
    "description": language === 'en' ? "Contact WebABC team and get a free consultation" : language === 'ar' ? "اتصل بفريق ويب أ ب ج واحصل على استشارة مجانية" : "برای ارتباط با تیم وب آ ب ث و دریافت مشاوره رایگان، با ما تماس بگیرید",
    "mainEntity": {
      "@type": "Organization",
      "name": "WebABC",
      "email": "info@webabc.ir",
      "telephone": language === 'en' ? "+989125811880" : "09125811880",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": language === 'en' ? "123 Azadi St, Keshavarz Blvd" : language === 'ar' ? "شارع آزادي، بوليفارد كشاورز، المبنى ١٢٣" : "خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳",
        "addressLocality": language === 'en' ? "Tehran" : language === 'ar' ? "طهران" : "تهران",
        "addressRegion": language === 'en' ? "Tehran" : language === 'ar' ? "طهران" : "تهران",
        "postalCode": "123456",
        "addressCountry": "IR"
      }
    },
    "inLanguage": language
  };

  const textDirection = languageMeta.direction === 'rtl' ? 'text-right' : 'text-left';
  const inputDirection = languageMeta.direction === 'rtl' ? 'text-right' : '';

  return (
    <div className={`min-h-screen flex flex-col ${languageMeta.fontFamily}`}>

      <SchemaMarkup schema={contactSchema} />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto mt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-12">
          <div className="text-center">
            <Breadcrumb />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.5]">{t('contact.getInTouch')}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <form className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.fullName')}</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input className={inputDirection} placeholder={t('consultation.fullName')} />
                  </Suspense>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.email')}</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input type="email" className={inputDirection} placeholder="example@domain.com" />
                  </Suspense>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.message')}</label>
                  <Suspense fallback={<TextareaSkeleton />}>
                    <Textarea rows={5} className={inputDirection} placeholder={t('contact.yourMessage')} />
                  </Suspense>
                </div>

                <Suspense fallback={<ButtonSkeleton />}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                    {t('contact.submitMessage')}
                  </Button>
                </Suspense>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('contact.contactInfo')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">{t('contact.officeAddress')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'en' ? "123 Azadi St, Keshavarz Blvd" : language === 'ar' ? "شارع آزادي، بوليفارد كشاورز، المبنى ١٢٣" : "خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳"}<br />
                      {language === 'en' ? "Tehran, Iran" : language === 'ar' ? "طهران، إيران" : "تهران، ایران"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">{t('contact.phoneNumber')}</h3>
                    <p className="text-gray-600">{language === 'en' ? "+98-21-12345678" : "۰۲۱-۱۲۳۴۵۶۷۸"}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">{t('contact.emailAddress')}</h3>
                    <p className="text-gray-600">info@webabc.ir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              title={t('contact.locationMap')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.676897237655!2d51.38910441526849!3d35.73296868018775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07118a35a56d%3A0x67cce5d4674ffa0f!2sAzadi%20Tower!5e0!3m2!1sen!2sir!4v1627987654325!5m2!1sen!2sir"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div >
  );
};

export default Contact;
