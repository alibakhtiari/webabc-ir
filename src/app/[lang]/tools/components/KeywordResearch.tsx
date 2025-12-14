"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from 'lucide-react';

const KeywordResearch = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{t('tools.keywordResearch.title') || "Keyword Research Tool"}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('tools.keywordResearch.description') || "Discover high-potential keywords for your content strategy."}
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
    );
};

export default KeywordResearch;
