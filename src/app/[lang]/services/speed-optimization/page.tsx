"use client";

import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQ from '@/components/FAQ';
import { CheckCircle2, Zap } from 'lucide-react';

const SpeedOptimization = () => {
    const { t } = useLanguage();

    const features = [
        t('speedOptimization.features.0'),
        t('speedOptimization.features.1'),
        t('speedOptimization.features.2'),
        t('speedOptimization.features.3'),
        t('speedOptimization.features.4'),
    ];

    const faqItems = [
        {
            question: t('speedOptimization.faq.q1'),
            answer: t('speedOptimization.faq.a1')
        },
        {
            question: t('speedOptimization.faq.q2'),
            answer: t('speedOptimization.faq.a2')
        },
        {
            question: t('speedOptimization.faq.q3'),
            answer: t('speedOptimization.faq.a3')
        },
        {
            question: t('speedOptimization.faq.q4'),
            answer: t('speedOptimization.faq.a4')
        },
    ];

    return (
        <ServicePageTemplate
            title={t('speedOptimization.title')}
            subtitle={t('speedOptimization.subtitle')}
            heroImage="/images/services/speed-optimization.webp"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="prose max-w-none mb-12">
                        <p className="text-xl text-gray-600 leading-relaxed text-center">
                            {t('speedOptimization.description')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-orange-500" />
                            {t('speedOptimization.title')}
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

export default SpeedOptimization;
