"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelpCircle } from 'lucide-react';

const FaqGenerator = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{t('tools.faqGenerator.title') || "FAQ Generator"}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('tools.faqGenerator.description') || "Generate Schema.org compilant FAQ markup easily."}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-primary" />
                        {t('common.comingSoon') || "Coming Soon"}
                    </CardTitle>
                    <CardDescription>
                        This tool is currently under development. Please check back later!
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-12">
                    <div className="text-center">
                        <p className="text-lg text-muted-foreground">We are working hard to bring you the best FAQ generator experience.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FaqGenerator;
