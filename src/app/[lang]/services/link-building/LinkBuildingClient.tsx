"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import ServiceHero from '@/components/templates/ServiceHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link2, Search, Share2, Shield, TrendingUp, Users } from 'lucide-react';
import ServiceHeroButtons from '@/components/ServiceHeroButtons';


const LinkBuilding = () => {
    const { t } = useLanguage();

    return (
        <ServicePageTemplate
            hero={
                <ServiceHero
                    title={t('linkBuilding.title')}
                    subtitle={t('linkBuilding.description')}
                    heroImage="/images/services/link-building.webp"
                    heroButtons={<ServiceHeroButtons />}
                />
            }
            cta={
                <section className="py-20 bg-primary text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">{t('linkBuilding.cta.title')}</h2>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">{t('linkBuilding.cta.description')}</p>
                    </div>
                </section>
            }
        >
            {/* Services Details */}
            < section className="py-16 bg-white" >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                        {t('linkBuilding.ourServices')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { key: 'guestPosting', icon: Users, color: 'text-blue-500' },
                            { key: 'brokenLink', icon: Link2, color: 'text-red-500' },
                            { key: 'outreach', icon: Share2, color: 'text-green-500' },
                            { key: 'unlinkedMentions', icon: Search, color: 'text-purple-500' },
                            { key: 'authority', icon: TrendingUp, color: 'text-orange-500' },
                            { key: 'audit', icon: Shield, color: 'text-indigo-500' }
                        ].map(({ key, icon: Icon, color }) => (
                            <div key={key} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-up">
                                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className={`w-8 h-8 ${color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t(`linkBuilding.features.${key}.title`)}</h3>
                                <p className="text-gray-600">
                                    {t(`linkBuilding.features.${key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Process */}
            < section className="py-16 bg-gray-50" >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
                        {t('linkBuilding.process.title')}
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div key={step} className="flex gap-6 animate-fade-up" style={{ animationDelay: `${step * 0.1}s` }}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                                    {step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {t(`linkBuilding.process.step${step}.title`)}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t(`linkBuilding.process.step${step}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </ServicePageTemplate >
    );
};

export default LinkBuilding;
