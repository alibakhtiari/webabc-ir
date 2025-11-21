"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema } from '@/lib/schema';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    const { t, language, languageMeta } = useLanguage();
    const isRtl = languageMeta.direction === 'rtl';

    // Generate organization schema
    const organizationSchema = createOrganizationSchema(
        "https://webabc.com", // Replace with actual domain
        "https://webabc.com/images/logo.jpg",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        language
    );

    // FAQ Schema
    const faqItems = [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' },
        { q: 'faq.q4', a: 'faq.a4' },
        { q: 'faq.q5', a: 'faq.a5' },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": t(item.q),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": t(item.a)
            }
        }))
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SEOHead
                title={`${t('faq.title')} | WebABC`}
                description={t('faq.description')}
            />

            <SchemaMarkup schema={[organizationSchema, faqSchema]} />

            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Breadcrumb />

                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold mb-4 text-gray-900">{t('faq.title')}</h1>
                            <p className="text-xl text-gray-600">{t('faq.subtitle')}</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqItems.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border border-gray-100 rounded-lg px-4">
                                        <AccordionTrigger className={`text-lg font-medium hover:no-underline hover:text-primary transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {t(item.q)}
                                        </AccordionTrigger>
                                        <AccordionContent className={`text-gray-600 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {t(item.a)}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('faq.stillHaveQuestions')}</h2>
                            <p className="text-gray-600 mb-6">{t('faq.contactText')}</p>
                            <a
                                href={`/${language}/contact`}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                            >
                                {t('common.contactUs')}
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
