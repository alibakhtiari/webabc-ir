"use client";

import Link from 'next/link';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQ from '@/components/FAQ';
import { CheckCircle2, Layout, ArrowRight } from 'lucide-react';
import ServiceHeroButtons from '@/components/ServiceHeroButtons';


const UiUxAudit = () => {
    const { t, language } = useLanguage();

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
            description={t('uiUxAudit.heroDescription')}
            heroImage="/images/services/ui-ux-audit.webp"
            heroButtons={
                <Link
                    href={`/${language}/contact`}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    {t('uiUxAudit.ctaButton')}
                    <ArrowRight className={`w-5 h-5 ${language === 'fa' || language === 'ar' ? 'rotate-180' : ''}`} />
                </Link>
            }
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

                    {/* Benefits Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-10">{t('common.whyChooseUs') || "Why an Audit?"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold mb-3 text-indigo-600">
                                        {t(`uiUxAudit.benefits.${i}.title`)}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t(`uiUxAudit.benefits.${i}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-10">{t('common.howItWorks') || "Our Audit Process"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="relative p-6 pt-12 bg-white rounded-xl border border-gray-200 text-center">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-bold text-lg mb-3 mt-2">{t(`uiUxAudit.process.${i}.title`)}</h3>
                                    <p className="text-sm text-gray-600">{t(`uiUxAudit.process.${i}.description`)}</p>
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
