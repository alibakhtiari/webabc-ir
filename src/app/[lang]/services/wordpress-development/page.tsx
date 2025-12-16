"use client";

import React from 'react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import WordpressSchema from '@/components/seo/schemas/WordpressSchema';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Layout, Settings, Smartphone } from 'lucide-react';
import ServiceHeroButtons from '@/components/ServiceHeroButtons';

const WordpressWoocommerceDevelopment = () => {
    const { t } = useLanguage();

    return (
        <>
            <WordpressSchema />

            <ServicePageTemplate
                title={t('wordpress.title')}
                subtitle={t('wordpress.subtitle')}
                heroImage="/images/services/wordpress.webp"
                heroButtons={<ServiceHeroButtons />}
            >
                {/* Features Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="mb-4">
                                    <Layout className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('wordpress.customTheme')}</h3>
                                <p className="text-gray-600">{t('wordpress.customThemeDesc')}</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="mb-4">
                                    <ShoppingCart className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('wordpress.woocommerce')}</h3>
                                <p className="text-gray-600">{t('wordpress.woocommerceDesc')}</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="mb-4">
                                    <Settings className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('wordpress.pluginDev')}</h3>
                                <p className="text-gray-600">{t('wordpress.pluginDevDesc')}</p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="mb-4">
                                    <Smartphone className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('wordpress.responsive')}</h3>
                                <p className="text-gray-600">{t('wordpress.responsiveDesc')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </ServicePageTemplate>
        </>
    );
};

export default WordpressWoocommerceDevelopment;
