"use client";

import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { toast } from 'sonner';

export default function SlugGenerator() {
    const { t, languageMeta } = useLanguage();
    const [input, setInput] = useState('');
    const [slug, setSlug] = useState('');

    const generateSlug = () => {
        if (!input) return;

        const newSlug = input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        setSlug(newSlug);
        toast.success(t('slugGenerator.generated'));
    };

    const copyToClipboard = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        toast.success(t('slugGenerator.copied'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('slugGenerator.title')}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('slugGenerator.description')}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('slugGenerator.inputLabel')}
                            </label>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('slugGenerator.placeholder')}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            onClick={generateSlug}
                            disabled={!input}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {t('slugGenerator.generate')}
                        </button>

                        {slug && (
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-fade-in">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('slugGenerator.resultLabel')}
                                </label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 block w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-800 font-mono text-sm break-all">
                                        {slug}
                                    </code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title={t('slugGenerator.copy')}
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
