"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { toast } from 'sonner';
import { Calculator, Check, Mail } from 'lucide-react';

const CostCalculator: React.FC = () => {
    const { t, language } = useLanguage();

    // Base cost in USD
    const baseCost = 500;

    const [features, setFeatures] = useState({
        pages: 5,
        design: 'template', // template, custom
        ecommerce: false,
        seo: false,
        blog: false,
        auth: false,
        multilingual: false
    });

    const [totalCost, setTotalCost] = useState(baseCost);

    useEffect(() => {
        let cost = baseCost;

        // Pages cost: $50 per page after 5 pages
        if (features.pages > 5) {
            cost += (features.pages - 5) * 50;
        }

        // Design cost
        if (features.design === 'custom') {
            cost += 1000;
        }

        // Feature costs
        if (features.ecommerce) cost += 1500;
        if (features.seo) cost += 300;
        if (features.blog) cost += 400;
        if (features.auth) cost += 600;
        if (features.multilingual) cost += 800;

        setTotalCost(cost);
    }, [features]);

    const handleEmailQuote = () => {
        // For V1, simple mailto
        const subject = `Website Quote Request - Budget: $${totalCost}`;
        const body = `Hi, I used your calculator and I'm interested in a website with these specs:%0D%0A%0D%0A` +
            `- Pages: ${features.pages}%0D%0A` +
            `- Design: ${features.design}%0D%0A` +
            `- E-commerce: ${features.ecommerce ? 'Yes' : 'No'}%0D%0A` +
            `- SEO: ${features.seo ? 'Yes' : 'No'}%0D%0A` +
            `- Blog: ${features.blog ? 'Yes' : 'No'}%0D%0A` +
            `- Authentication: ${features.auth ? 'Yes' : 'No'}%0D%0A` +
            `- Multilingual: ${features.multilingual ? 'Yes' : 'No'}%0D%0A%0D%0A` +
            `Estimated Cost: $${totalCost}`;

        window.location.href = `mailto:contact@webabc.com?subject=${subject}&body=${body}`;
        toast.success(t('costCalculator.emailSent'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('costCalculator.title')}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('costCalculator.description')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5" />
                                    {t('costCalculator.customize')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Pages Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>{t('costCalculator.numberOfPages')}</Label>
                                        <span className="font-bold">{features.pages}</span>
                                    </div>
                                    <Slider
                                        value={[features.pages]}
                                        min={1}
                                        max={50}
                                        step={1}
                                        onValueChange={(val: number[]) => setFeatures({ ...features, pages: val[0] })}
                                    />
                                </div>

                                {/* Design Toggle */}
                                <div className="space-y-3 pt-4 border-t">
                                    <Label>{t('costCalculator.designStyle')}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            variant={features.design === 'template' ? 'default' : 'outline'}
                                            onClick={() => setFeatures({ ...features, design: 'template' })}
                                            className="w-full"
                                        >
                                            {t('costCalculator.template')}
                                        </Button>
                                        <Button
                                            variant={features.design === 'custom' ? 'default' : 'outline'}
                                            onClick={() => setFeatures({ ...features, design: 'custom' })}
                                            className="w-full"
                                        >
                                            {t('costCalculator.custom')}
                                        </Button>
                                    </div>
                                </div>

                                {/* Features Toggles */}
                                <div className="space-y-4 pt-4 border-t">
                                    <Label>{t('costCalculator.features')}</Label>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                            <Label htmlFor="ecommerce">{t('costCalculator.ecommerce')}</Label>
                                            <Switch
                                                id="ecommerce"
                                                checked={features.ecommerce}
                                                onCheckedChange={(c: boolean) => setFeatures({ ...features, ecommerce: c })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                            <Label htmlFor="seo">{t('costCalculator.seo')}</Label>
                                            <Switch
                                                id="seo"
                                                checked={features.seo}
                                                onCheckedChange={(c: boolean) => setFeatures({ ...features, seo: c })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                            <Label htmlFor="blog">{t('costCalculator.blog')}</Label>
                                            <Switch
                                                id="blog"
                                                checked={features.blog}
                                                onCheckedChange={(c: boolean) => setFeatures({ ...features, blog: c })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                            <Label htmlFor="auth">{t('costCalculator.auth')}</Label>
                                            <Switch
                                                id="auth"
                                                checked={features.auth}
                                                onCheckedChange={(c: boolean) => setFeatures({ ...features, auth: c })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                                            <Label htmlFor="multilingual">{t('costCalculator.multilingual')}</Label>
                                            <Switch
                                                id="multilingual"
                                                checked={features.multilingual}
                                                onCheckedChange={(c: boolean) => setFeatures({ ...features, multilingual: c })}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 border-primary/20 shadow-lg">
                            <CardHeader className="bg-primary/5">
                                <CardTitle>{t('costCalculator.estimatedCost')}</CardTitle>
                                <CardDescription>{t('costCalculator.estimateDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary">
                                        ${totalCost.toLocaleString()}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {features.design === 'custom' ? t('costCalculator.customDesign') : t('costCalculator.templateDesign')}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold mb-2">{t('costCalculator.included')}:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500" />
                                            {features.pages} {t('costCalculator.pages')}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500" />
                                            {t('costCalculator.responsive')}
                                        </li>
                                        {features.ecommerce && (
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                {t('costCalculator.ecommerce')}
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <Button onClick={handleEmailQuote} className="w-full size-lg gap-2">
                                    <Mail className="w-4 h-4" />
                                    {t('costCalculator.emailQuote')}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostCalculator;
