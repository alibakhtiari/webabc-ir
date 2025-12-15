"use client";

import React, { lazy, Suspense, useState } from 'react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import ContactSchema from '@/components/seo/schemas/ContactSchema';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '@/components/ContactForm';

// Lazy loading components
const Button = lazy(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })));
const Input = lazy(() => import('@/components/ui/input').then(mod => ({ default: mod.Input })));
const Textarea = lazy(() => import('@/components/ui/textarea').then(mod => ({ default: mod.Textarea })));
const ContactMap = lazy(() => import('@/components/ContactMap'));

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




  const textDirection = languageMeta.direction === 'rtl' ? 'text-right' : 'text-left';
  const inputDirection = languageMeta.direction === 'rtl' ? 'text-right' : '';

  return (
    <>
      <ContactSchema />

      <div className={`max-w-4xl mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8 w-full ${languageMeta.fontFamily}`}>
        <div className="space-y-12">
          <div className="text-center">
            <Breadcrumb />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.5]">{t('contact.getInTouch')}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <ContactForm />
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
                    <p className="text-gray-600" dir="ltr">{language === 'en' ? "+98 912 581 1880" : "+98 912 581 1880"}</p>
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
          <Suspense fallback={<div className="mt-12 h-[400px] bg-gray-100 animate-pulse rounded-2xl" />}>
            <ContactMap />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Contact;
