"use client";

import React, { lazy, Suspense, useActionState } from 'react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import ContactSchema from '@/components/seo/schemas/ContactSchema';
import { submitContact } from '@/app/actions/submitContact';

import { useLanguage } from '@/contexts/LanguageContext';

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
  const [state, formAction, isPending] = useActionState(submitContact, null);

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
              <form action={formAction} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.fullName')}</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input
                      name="name"
                      className={inputDirection}
                      placeholder={t('consultation.fullName')}
                      required
                    />
                  </Suspense>
                  {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.email')}</label>
                  <Suspense fallback={<InputSkeleton />}>
                    <Input
                      name="email"
                      type="email"
                      className={inputDirection}
                      placeholder="example@domain.com"
                      required
                    />
                  </Suspense>
                  {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.message')}</label>
                  <Suspense fallback={<TextareaSkeleton />}>
                    <Textarea
                      name="message"
                      rows={5}
                      className={inputDirection}
                      placeholder={t('contact.yourMessage')}
                      required
                    />
                  </Suspense>
                  {state?.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message}</p>}
                </div>

                <Suspense fallback={<ButtonSkeleton />}>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-70"
                  >
                    {isPending ? t('common.loading') || 'Sending...' : t('contact.submitMessage')}
                  </Button>
                </Suspense>

                {state?.message && (
                  <p className={`text-center text-sm ${state.message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {state.message}
                  </p>
                )}
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
          <Suspense fallback={<div className="mt-12 h-[400px] bg-gray-100 animate-pulse rounded-2xl" />}>
            <ContactMap />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Contact;
