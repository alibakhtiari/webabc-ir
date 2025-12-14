"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import WebDesignSchema from '@/components/seo/schemas/WebDesignSchema';
import { useLanguage } from '@/contexts/LanguageContext';
import { TimelineItem, TechItem } from '@/components/services/WebDesignComponents';
import Link from 'next/link';
import { PenTool, Link2, ArrowRight } from 'lucide-react';

const WebDesign = () => {
    const { t, language } = useLanguage();

    return (
        <>
            <WebDesignSchema />

            <ServicePageTemplate
                title={t('webDesign.title')}
                subtitle={t('webDesign.description')}
                heroImage="/images/services/web-design.png"
            >
                {/* Services Details */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('webDesign.ourServices')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up">
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.uiux.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.uiux.description')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.1s' }}>
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.responsive.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.responsive.description')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.2s' }}>
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.wordpress.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.wordpress.description')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.3s' }}>
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.react.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.react.description')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.4s' }}>
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.ecommerce.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.ecommerce.description')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-primary text-2xl">✦</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t('webDesign.features.seo.title')}</h3>
                                <p className="text-gray-600">
                                    {t('webDesign.features.seo.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('webDesign.process.title')}
                        </h2>

                        <div className="relative">
                            {/* Timeline bar */}
                            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20"></div>

                            {/* Timeline steps */}
                            <div className="space-y-12">
                                <TimelineItem
                                    title={t('webDesign.process.step1.title')}
                                    description={t('webDesign.process.step1.description')}
                                    index={1}
                                    isLeft={true}
                                />
                                <TimelineItem
                                    title={t('webDesign.process.step2.title')}
                                    description={t('webDesign.process.step2.description')}
                                    index={2}
                                    isLeft={false}
                                />
                                <TimelineItem
                                    title={t('webDesign.process.step3.title')}
                                    description={t('webDesign.process.step3.description')}
                                    index={3}
                                    isLeft={true}
                                />
                                <TimelineItem
                                    title={t('webDesign.process.step4.title')}
                                    description={t('webDesign.process.step4.description')}
                                    index={4}
                                    isLeft={false}
                                />
                                <TimelineItem
                                    title={t('webDesign.process.step5.title')}
                                    description={t('webDesign.process.step5.description')}
                                    index={5}
                                    isLeft={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Complementary Services */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('common.complementaryServices')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Content Creation Card */}
                            <Link href={`/${language}/services/content-creation`} className="group bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <PenTool className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t('services.contentCreationTitle')}</h3>
                                </div>
                                <p className="text-gray-600 mb-6">{t('services.contentCreationDescription')}</p>
                                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {t('common.learnMore')} <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </Link>

                            {/* Link Building Card */}
                            <Link href={`/${language}/services/link-building`} className="group bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up border border-gray-100" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                        <Link2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t('services.linkBuildingTitle')}</h3>
                                </div>
                                <p className="text-gray-600 mb-6">{t('services.linkBuildingDescription')}</p>
                                <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {t('common.learnMore')} <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Technologies */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('webDesign.technologies.title')}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <TechItem name="React" icon="⚛️" />
                            <TechItem name="Next.js" icon="▲" />
                            <TechItem name="WordPress" icon="W" />
                            <TechItem name="Tailwind CSS" icon="🎨" />
                            <TechItem name="Node.js" icon="🟢" />
                            <TechItem name="MongoDB" icon="🍃" />
                            <TechItem name="TypeScript" icon="TS" />
                            <TechItem name="GraphQL" icon="◢" />
                        </div>
                    </div>
                </section>
            </ServicePageTemplate >
        </>
    );
};

export default WebDesign;
