"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import LocalSeoSchema from '@/components/seo/schemas/LocalSeoSchema';
import FAQ from '@/components/FAQ';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Target, Search, MapPin, FileCheck, BarChart } from 'lucide-react';
import ServiceHeroButtons from '@/components/ServiceHeroButtons';
import { LocalSeoServiceCard, ProcessCard } from '@/components/services/LocalSeoComponents';


const LocalSeo = () => {
    const { t } = useLanguage();

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
                heroImage="/images/services/local-seo.webp"
                heroButtons={<ServiceHeroButtons />}
            >
                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('localSeo.features.title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <LocalSeoServiceCard
                                icon={<Globe className="w-6 h-6" />}
                                title={t('localSeo.feature.gmb')}
                                description={t('localSeo.feature.gmbDesc')}
                                features={[t('localSeo.feature.gmb')]}
                                color="bg-blue-50"
                                iconColor="text-blue-600"
                            />
                            <LocalSeoServiceCard
                                icon={<Target className="w-6 h-6" />}
                                title={t('localSeo.feature.localKeywords')}
                                description={t('localSeo.feature.localKeywordsDesc')}
                                features={[t('localSeo.feature.localKeywords')]}
                                color="bg-green-50"
                                iconColor="text-green-600"
                            />
                            <LocalSeoServiceCard
                                icon={<Search className="w-6 h-6" />}
                                title={t('localSeo.feature.nearMe')}
                                description={t('localSeo.feature.nearMeDesc')}
                                features={[t('localSeo.feature.nearMe')]}
                                color="bg-purple-50"
                                iconColor="text-purple-600"
                            />
                            <LocalSeoServiceCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t('localSeo.feature.localLinks')}
                                description={t('localSeo.feature.localLinksDesc')}
                                features={[t('localSeo.feature.localLinks')]}
                                color="bg-amber-50"
                                iconColor="text-amber-600"
                            />
                            <LocalSeoServiceCard
                                icon={<FileCheck className="w-6 h-6" />}
                                title={t('localSeo.feature.reviews')}
                                description={t('localSeo.feature.reviewsDesc')}
                                features={[t('localSeo.feature.reviews')]}
                                color="bg-rose-50"
                                iconColor="text-rose-600"
                            />
                            <LocalSeoServiceCard
                                icon={<BarChart className="w-6 h-6" />}
                                title={t('localSeo.feature.localReports')}
                                description={t('localSeo.feature.localReportsDesc')}
                                features={[t('localSeo.feature.localReports')]}
                                color="bg-indigo-50"
                                iconColor="text-indigo-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('localSeo.process.title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((step) => (
                                <ProcessCard
                                    key={step}
                                    number={`0${step}`}
                                    title={t(`localSeo.process.step${step}.title`)}
                                    description={t(`localSeo.process.step${step}.desc`)}
                                    color="bg-primary"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <FAQ
                            items={faqItems}
                            title={t('localSeo.faq.title')}
                            description={t('localSeo.faq.description')}
                        />
                    </div>
                </section>
            </ServicePageTemplate>
        </>
    );
};

export default LocalSeo;

