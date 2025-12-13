"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import SeoServiceSchema from '@/components/seo/schemas/SeoServiceSchema';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Globe, LinkIcon, PieChart } from 'lucide-react';
import FAQ from '@/components/FAQ';
import { SeoServiceCard, ResultsCard, CaseStudyCard, ProcessCard } from '@/components/services/SeoComponents';

const SeoService = () => {
    const { t } = useLanguage();

    const HeroButtons = (
        <>
            <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                {t('common.freeConsultation')}
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all">
                {t('common.viewPortfolio')}
            </button>
        </>
    );

    return (
        <>
            <SeoServiceSchema />

            <ServicePageTemplate
                title={t('seoService.title')}
                subtitle={t('seoService.subtitle')}
                heroImage="/images/service-seo.png"
                heroButtons={HeroButtons}
            >
                {/* SEO Services */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
                            {t('seoService.servicesTitle')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <SeoServiceCard
                                icon={<Search className="w-6 h-6" />}
                                title={t('seoService.onPageSeo')}
                                description={t('seoService.contentStrategyDesc')}
                                features={[
                                    t('seoService.feature.keywordResearch'),
                                    t('seoService.feature.qualityContent'),
                                    t('seoService.feature.titleOptimization'),
                                    t('seoService.feature.headings')
                                ]}
                                color="bg-blue-50"
                                iconColor="text-blue-600"
                            />

                            <SeoServiceCard
                                icon={<Globe className="w-6 h-6" />}
                                title={t('seoService.technicalSeo')}
                                description={t('seoService.technicalSeoDesc')}
                                features={[
                                    t('seoService.feature.pageSpeed'),
                                    t('seoService.feature.technicalErrors'),
                                    t('seoService.feature.urlStructure'),
                                    t('seoService.feature.schema')
                                ]}
                                color="bg-green-50"
                                iconColor="text-green-600"
                            />

                            <SeoServiceCard
                                icon={<LinkIcon className="w-6 h-6" />}
                                title={t('seoService.offPageSeo')}
                                description={t('seoService.offPageSeoDesc')}
                                features={[
                                    t('seoService.feature.linkProfile'),
                                    t('seoService.feature.linkOpportunities'),
                                    t('seoService.feature.linkableContent'),
                                    t('seoService.feature.authorityLinks')
                                ]}
                                color="bg-purple-50"
                                iconColor="text-purple-600"
                            />

                            <SeoServiceCard
                                icon={<PieChart className="w-6 h-6" />}
                                title={t('seoService.localSeo')}
                                description={t('seoService.localSeoDesc')}
                                features={[
                                    t('seoService.feature.gmb'),
                                    t('seoService.feature.reviews'),
                                    t('seoService.feature.localKeywords'),
                                    t('seoService.feature.nearMe')
                                ]}
                                color="bg-amber-50"
                                iconColor="text-amber-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Results & Case Studies */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
                            {t('seoService.results.title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <ResultsCard number="250%" text={t('seoService.results.trafficIncrease')} />
                            <ResultsCard number="85%" text={t('seoService.results.firstPage')} />
                            <ResultsCard number="120+" text={t('seoService.results.projectsCompleted')} />
                            <ResultsCard number="30%" text={t('seoService.results.conversionLift')} />
                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-center mb-8">{t('seoService.caseStudies.title')}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <CaseStudyCard
                                    title={t('seoService.caseStudies.ecommerce.title')}
                                    category={t('seoService.caseStudies.ecommerce.category')}
                                    image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                                    result={t('seoService.caseStudies.ecommerce.result')}
                                />
                                <CaseStudyCard
                                    title={t('seoService.caseStudies.local.title')}
                                    category={t('seoService.caseStudies.local.category')}
                                    image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                                    result={t('seoService.caseStudies.local.result')}
                                />
                                <CaseStudyCard
                                    title={t('seoService.caseStudies.b2b.title')}
                                    category={t('seoService.caseStudies.b2b.category')}
                                    image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                                    result={t('seoService.caseStudies.b2b.result')}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Added Back */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <FAQ
                            items={[
                                { question: t('services.faq.costQuestion'), answer: t('services.faq.costAnswer') },
                                { question: t('services.faq.timelineQuestion'), answer: t('services.faq.timelineAnswer') },
                                { question: t('services.faq.blackhatQuestion'), answer: t('services.faq.blackhatAnswer') },
                                { question: t('services.faq.multilingualQuestion'), answer: t('services.faq.multilingualAnswer') }
                            ]}
                            title={t('services.faqTitle')}
                        />
                    </div>
                </section>

                {/* SEO Process */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp">
                            {t('seoService.process.title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ProcessCard
                                number="01"
                                title={t('seoService.process.step1.title')}
                                description={t('seoService.process.step1.description')}
                                color="bg-blue-500"
                            />
                            <ProcessCard
                                number="02"
                                title={t('seoService.process.step2.title')}
                                description={t('seoService.process.step2.description')}
                                color="bg-green-500"
                            />
                            <ProcessCard
                                number="03"
                                title={t('seoService.process.step3.title')}
                                description={t('seoService.process.step3.description')}
                                color="bg-purple-500"
                            />
                        </div>
                    </div>
                </section>
            </ServicePageTemplate>
        </>
    );
};

export default SeoService;
