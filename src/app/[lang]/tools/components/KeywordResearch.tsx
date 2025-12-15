"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from 'lucide-react';
import Breadcrumb from '@/components/seo/Breadcrumb';

const KeywordResearch = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('keywordResearch.title') || "Keyword Research Tool"}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('keywordResearch.description') || "Discover high-potential keywords for your content strategy."}
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-6 w-6 text-primary" />
                            {t('common.comingSoon') || "Coming Soon"}
                        </CardTitle>
                        <CardDescription>
                            This tool is currently under development. Please check back later!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-12">
                        <div className="text-center">
                            <p className="text-lg text-muted-foreground">We are working hard to bring you the best keyword research experience.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default KeywordResearch;
