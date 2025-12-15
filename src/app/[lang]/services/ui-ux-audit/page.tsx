"use client";

import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQ from '@/components/FAQ';
import { CheckCircle2, Layout } from 'lucide-react';

const UiUxAudit = () => {
    const { t } = useLanguage();

    const features = [
        t('uiUxAudit.features.0'),
        t('uiUxAudit.features.1'),
        t('uiUxAudit.features.2'),
        t('uiUxAudit.features.3'),
        t('uiUxAudit.features.4'),
    ];

    const faqItems = [
        {
            question: t('uiUxAudit.faq.q1'),
            answer: t('uiUxAudit.faq.a1')
        },
        {
            question: t('uiUxAudit.faq.q2'),
            answer: t('uiUxAudit.faq.a2')
        },
        {
            question: t('uiUxAudit.faq.q3'),
            answer: t('uiUxAudit.faq.a3')
        },
        {
            question: t('uiUxAudit.faq.q4'),
            answer: t('uiUxAudit.faq.a4')
        },
    ];

    return (
        <ServicePageTemplate
            title={t('uiUxAudit.title')}
            subtitle={t('uiUxAudit.subtitle')}
            heroImage="/images/services/ui-ux-audit.webp"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="prose max-w-none mb-12">
                        <p className="text-xl text-gray-600 leading-relaxed text-center">
                            {t('uiUxAudit.description')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Layout className="w-8 h-8 text-indigo-500" />
                            {t('uiUxAudit.title')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="font-medium text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <FAQ items={faqItems} />
                </div>
            </div>
        </ServicePageTemplate>
    );
};

export default UiUxAudit;
