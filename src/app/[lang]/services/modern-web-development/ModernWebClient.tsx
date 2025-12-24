"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import ServiceHero from '@/components/templates/ServiceHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { TimelineItem, TechItem } from '@/components/services/WebDesignComponents';
import Link from 'next/link';
import { PenTool, Link2, ArrowRight, ArrowLeft, Code, Database, Server, Smartphone, Layout, Zap, Rocket } from 'lucide-react';
import WebDesignSchema from '@/components/seo/schemas/WebDesignSchema'; // Using WebDesign schema as base or create new if needed
import ServiceHeroButtons from '@/components/ServiceHeroButtons';


const ModernWebDevelopment = () => {
    const { t, language } = useLanguage();

    // Map features to icons
    const featureIcons = [
        <Zap key="1" className="w-6 h-6 text-yellow-500" />,     // Next.js - Fast
        <Layout key="2" className="w-6 h-6 text-blue-500" />,    // React - UI
        <Rocket key="3" className="w-6 h-6 text-orange-500" />,  // Astro - Speed
        <Database key="4" className="w-6 h-6 text-purple-500" />, // Headless CMS
        <Server key="5" className="w-6 h-6 text-green-500" />,   // Performance
        <Smartphone key="6" className="w-6 h-6 text-indigo-500" /> // PWA
    ];

    // Helper to get icon safely
    const getIcon = (index: number) => featureIcons[index] || <Code className="w-6 h-6 text-primary" />;

    return (
        <>
            {/* Ideally we would have a specific Schema for this, using WebDesign for now as acceptable fallback or create new */}
            <WebDesignSchema />

            <ServicePageTemplate
                hero={
                    <ServiceHero
                        title={t('modern-web.title')}
                        subtitle={t('modern-web.description')}
                        heroImage="/images/services/modern-web-development.webp"
                        heroButtons={<ServiceHeroButtons />}
                    />
                }
            >
                {/* Services Details */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('modern-web.ourServices')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {['nextjs', 'react', 'astro', 'headless', 'performance', 'pwa'].map((key, index) => (
                                <div key={key} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up hover:-translate-y-1" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 border border-primary/10">
                                        {getIcon(index)}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{t(`modern-web.features.${key}.title`)}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t(`modern-web.features.${key}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('modern-web.process.title')}
                        </h2>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Timeline bar */}
                            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20"></div>

                            {/* Timeline steps */}
                            <div className="space-y-12">
                                <TimelineItem
                                    title={t('modern-web.process.step1.title')}
                                    description={t('modern-web.process.step1.description')}
                                    index={1}
                                    isLeft={true}
                                />
                                <TimelineItem
                                    title={t('modern-web.process.step2.title')}
                                    description={t('modern-web.process.step2.description')}
                                    index={2}
                                    isLeft={false}
                                />
                                <TimelineItem
                                    title={t('modern-web.process.step3.title')}
                                    description={t('modern-web.process.step3.description')}
                                    index={3}
                                    isLeft={true}
                                />
                                <TimelineItem
                                    title={t('modern-web.process.step4.title')}
                                    description={t('modern-web.process.step4.description')}
                                    index={4}
                                    isLeft={false}
                                />
                                <TimelineItem
                                    title={t('modern-web.process.step5.title')}
                                    description={t('modern-web.process.step5.description')}
                                    index={5}
                                    isLeft={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technologies */}
                <section className="py-16 bg-white overflow-hidden">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('modern-web.technologies.title')}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <TechItem name="Next.js 14" icon="▲" />
                            <TechItem name="React" icon="⚛️" />
                            <TechItem name="Astro" icon="🚀" />
                            <TechItem name="Strapi" icon="👾" />
                            <TechItem name="TypeScript" icon="TS" />
                            <TechItem name="Tailwind CSS" icon="🎨" />
                            <TechItem name="Vercel" icon="▲" />
                            <TechItem name="Supabase" icon="⚡" />
                        </div>
                    </div>
                </section>

                {/* Complementary Services */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                            {t('common.complementaryServices')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* SEO Card */}
                            <Link href={`/${language}/services/seo`} className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                        <Rocket className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t('services.seoTitle')}</h3>
                                </div>
                                <p className="text-gray-600 mb-6">{t('services.seoDescription')}</p>
                                <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {t('common.learnMore')}
                                    {language === 'fa' || language === 'ar' ? <ArrowLeft className="w-4 h-4 me-2 group-hover:-translate-x-1" /> : <ArrowRight className="w-4 h-4 ms-2" />}
                                </div>
                            </Link>

                            {/* Web Design Card */}
                            <Link href={`/${language}/services/web-design`} className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up border border-gray-100" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <PenTool className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t('common.webDesignAndDevelopment')}</h3>
                                </div>
                                <p className="text-gray-600 mb-6">{t('webDesign.description')}</p>
                                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {t('common.learnMore')} <ArrowRight className="w-4 h-4 ms-2" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </ServicePageTemplate >
        </>
    );
};

export default ModernWebDevelopment;
