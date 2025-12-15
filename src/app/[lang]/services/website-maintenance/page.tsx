"use client";

import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQ from '@/components/FAQ';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const WebsiteMaintenance = () => {
    const { t } = useLanguage();

    const features = [
        t('maintenance.features.0'),
        t('maintenance.features.1'),
        t('maintenance.features.2'),
        t('maintenance.features.3'),
        t('maintenance.features.4'),
    ];

    const faqItems = [
        {
            question: t('maintenance.faq.q1'),
            answer: t('maintenance.faq.a1')
        },
        {
            question: t('maintenance.faq.q2'),
            answer: t('maintenance.faq.a2')
        },
        {
            question: t('maintenance.faq.q3'),
            answer: t('maintenance.faq.a3')
        },
        {
            question: t('maintenance.faq.q4'),
            answer: t('maintenance.faq.a4')
        },
    ];

    return (
        <ServicePageTemplate
            title={t('maintenance.title')}
            subtitle={t('maintenance.subtitle')}
            heroImage="/images/services/maintenance.webp"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="prose max-w-none mb-12">
                        <p className="text-xl text-gray-600 leading-relaxed text-center">
                            {t('maintenance.description')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-cyan-500" />
                            {t('maintenance.title')}
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

export default WebsiteMaintenance;
