"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import WebDevelopmentSchema from '@/components/seo/schemas/WebDevelopmentSchema';
import FAQ from '@/components/FAQ';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout, Server, Code2, Rocket, ShieldCheck, ShoppingCart, Stethoscope, Briefcase, GraduationCap, Home, Plane, Database, Cloud } from 'lucide-react';

const WebDevelopment = () => {
    const { t } = useLanguage();

    const faqItems = [
        {
            question: t('webDevelopmentServices.faq.q1'),
            answer: t('webDevelopmentServices.faq.a1')
        },
        {
            question: t('webDevelopmentServices.faq.q2'),
            answer: t('webDevelopmentServices.faq.a2')
        },
        {
            question: t('webDevelopmentServices.faq.q3'),
            answer: t('webDevelopmentServices.faq.a3')
        },
        {
            question: t('webDevelopmentServices.faq.q4'),
            answer: t('webDevelopmentServices.faq.a4')
        }
    ];

    return (
        <>
            <WebDevelopmentSchema />

            <ServicePageTemplate
                title={t('webDevelopmentServices.webDevelopmentTitle')}
                subtitle={t('webDevelopmentServices.webDevelopmentDescription')}
                heroImage="/images/services/web-development.png"
            >
                {/* What is Custom Web Development? */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-center">{t('webDevelopmentServices.whatIs.title')}</h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed">
                                <p className="mb-4 text-lg">{t('webDevelopmentServices.whatIs.p1')}</p>
                                <p className="mb-4">{t('webDevelopmentServices.whatIs.p2')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            {t('webDevelopmentServices.ourServices')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Frontend Development */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    <Layout className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    {t('webDevelopmentServices.frontendDev')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('webDevelopmentServices.frontendDesc')}
                                </p>
                                <div className="space-y-3">
                                    {['uiuxDesign', 'reactNextjs', 'responsiveDesign', 'webVitals', 'animations', 'apiIntegration'].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            <span className="text-gray-700">
                                                {t(`webDevelopmentServices.feature.${feature}`)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Backend Development */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    <Server className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    {t('webDevelopmentServices.backendDev')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('webDevelopmentServices.backendDesc')}
                                </p>
                                <div className="space-y-3">
                                    {['restApi', 'python', 'nodejs', 'database', 'auth', 'cloudIntegration'].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            <span className="text-gray-700">
                                                {t(`webDevelopmentServices.feature.${feature}`)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4 text-center">{t('webDevelopmentServices.technologies.title')}</h2>
                        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('webDevelopmentServices.technologies.description')}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: <Code2 className="w-8 h-8" />, key: 'frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                                { icon: <Server className="w-8 h-8" />, key: 'backend', items: ['Node.js', 'Python', 'Express', 'Django'] },
                                { icon: <Database className="w-8 h-8" />, key: 'database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL'] },
                                { icon: <Cloud className="w-8 h-8" />, key: 'devops', items: ['Docker', 'AWS', 'CI/CD', 'Vercel'] }
                            ].map((tech, index) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-4 shadow-sm">
                                        {tech.icon}
                                    </div>
                                    <h3 className="font-semibold mb-3">{t(`webDevelopmentServices.technologies.${tech.key}`)}</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {tech.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industries Section */}
                <section className="py-16 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-4 text-center">{t('webDevelopmentServices.industries.title')}</h2>
                        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('webDevelopmentServices.industries.description')}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { icon: <ShoppingCart />, key: 'ecommerce' },
                                { icon: <Stethoscope />, key: 'healthcare' },
                                { icon: <Briefcase />, key: 'fintech' },
                                { icon: <GraduationCap />, key: 'education' },
                                { icon: <Home />, key: 'realEstate' },
                                { icon: <Plane />, key: 'travel' }
                            ].map((industry, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all">
                                    <div className="text-primary mb-2 flex justify-center">{industry.icon}</div>
                                    <span className="font-medium text-sm">{t(`webDevelopmentServices.industries.${industry.key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">{t('webDevelopmentServices.process.title')}</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">{t('webDevelopmentServices.process.description')}</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <Code2 className="w-8 h-8" />, step: 1 },
                                { icon: <Layout className="w-8 h-8" />, step: 2 },
                                { icon: <ShieldCheck className="w-8 h-8" />, step: 3 },
                                { icon: <Rocket className="w-8 h-8" />, step: 4 }
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full hover:shadow-md transition-all">
                                        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t(`webDevelopmentServices.process.step${item.step}.title`)}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {t(`webDevelopmentServices.process.step${item.step}.desc`)}
                                        </p>
                                    </div>
                                    {index < 3 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <div className="w-8 h-0.5 bg-gray-200"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <FAQ
                    items={faqItems}
                    title={t('webDevelopmentServices.faq.title')}
                    description={t('webDevelopmentServices.faq.description')}
                />
            </ServicePageTemplate>
        </>
    );
};

export default WebDevelopment;
