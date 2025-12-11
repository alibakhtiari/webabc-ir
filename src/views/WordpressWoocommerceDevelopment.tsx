"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createServiceSchema } from '@/lib/schema';
import { ShoppingCart, Layout, Settings, Smartphone } from 'lucide-react';

const WordpressWoocommerceDevelopment = () => {
    const { t, languageMeta, language } = useLanguage();

    const serviceSchema = createServiceSchema(
        t('wordpress.title'),
        t('wordpress.subtitle'),
        `https://webabc.ir/${language}/wordpress-woocommerce-development`,
        "https://webabc.ir/images/wordpress.webp",
        "WebABC",
        "Worldwide",
        language
    );

    return (
        <div className="min-h-screen flex flex-col">

            <SchemaMarkup schema={serviceSchema} />

            <Navbar />

            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <Breadcrumb />
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {t('wordpress.title')}
                            </h1>
                            <p className="text-xl text-gray-600">
                                {t('wordpress.subtitle')}
                            </p>
                        </div>
                    </div>
                </section>

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

                {/* CTA Section */}
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default WordpressWoocommerceDevelopment;
