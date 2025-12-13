"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import LocalSeoSchema from '@/components/seo/schemas/LocalSeoSchema';
import FAQ from '@/components/FAQ';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Target, Search, MapPin, FileCheck, BarChart, CheckCircle2 } from 'lucide-react';

const LocalSeo = () => {
    const { t, languageMeta } = useLanguage();

    const faqItems = [
        {
            question: t('localSeo.faq.q1'),
            answer: t('localSeo.faq.a1')
        },
        {
            question: t('localSeo.faq.q2'),
            answer: t('localSeo.faq.a2')
        },
        {
            question: t('localSeo.faq.q3'),
            answer: t('localSeo.faq.a3')
        },
        {
            question: t('localSeo.faq.q4'),
            answer: t('localSeo.faq.a4')
        }
    ];

    return (
        <>
            <LocalSeoSchema />

            <ServicePageTemplate
                title={t('localSeo.localSeoTitle')}
                subtitle={t('localSeo.localSeoDescription')}
            >
                {/* What is Local SEO? */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-center">{t('localSeo.whatIs.title')}</h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed">
                                <p className="mb-4 text-lg">{t('localSeo.whatIs.p1')}</p>
                                <p className="mb-4">{t('localSeo.whatIs.p2')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">{t('localSeo.features.title')}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Globe className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.gmb'),
                                    description: t('localSeo.feature.gmbDesc')
                                },
                                {
                                    icon: <Target className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.localKeywords'),
                                    description: t('localSeo.feature.localKeywordsDesc')
                                },
                                {
                                    icon: <Search className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.nearMe'),
                                    description: t('localSeo.feature.nearMeDesc')
                                },
                                {
                                    icon: <MapPin className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.localLinks'),
                                    description: t('localSeo.feature.localLinksDesc')
                                },
                                {
                                    icon: <FileCheck className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.reviews'),
                                    description: t('localSeo.feature.reviewsDesc')
                                },
                                {
                                    icon: <BarChart className="w-10 h-10 text-primary" />,
                                    title: t('localSeo.feature.localReports'),
                                    description: t('localSeo.feature.localReportsDesc')
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className={`text-xl font-semibold mb-3 ${languageMeta.fontFamily}`}>{feature.title}</h3>
                                    <p className={`text-gray-600 ${languageMeta.fontFamily}`}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us / Process */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">{t('localSeo.process.title')}</h2>
                                <p className="text-gray-600 mb-8">{t('localSeo.process.description')}</p>
                                <ul className="space-y-4">
                                    {[1, 2, 3, 4].map((step) => (
                                        <li key={step} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-lg">{t(`localSeo.process.step${step}.title`)}</h4>
                                                <p className="text-gray-500">{t(`localSeo.process.step${step}.desc`)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
                                <img
                                    src="/images/services/local-seo.png"
                                    alt="Local SEO Process"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <FAQ
                    items={faqItems}
                    title={t('localSeo.faq.title')}
                    description={t('localSeo.faq.description')}
                />
            </ServicePageTemplate>
        </>
    );
};

export default LocalSeo;
