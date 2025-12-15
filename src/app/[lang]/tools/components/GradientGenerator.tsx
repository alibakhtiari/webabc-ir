"use client";

import React, { useState, useEffect } from 'react';
import { Palette, Copy, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function GradientGenerator() {
    const { t, languageMeta } = useLanguage();
    const [color1, setColor1] = useState('#4f46e5');
    const [color2, setColor2] = useState('#ec4899');
    const [direction, setDirection] = useState(135);
    const [cssCode, setCssCode] = useState('');

    useEffect(() => {
        const code = `background: linear-gradient(${direction}deg, ${color1}, ${color2});`;
        setCssCode(code);
    }, [color1, color2, direction]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success(t('gradientGen.copied'));
    };

    const randomizeColors = () => {
        const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setColor1(randomColor());
        setColor2(randomColor());
        setDirection(Math.floor(Math.random() * 360));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-fuchsia-50 rounded-xl">
                            <Palette className="w-8 h-8 text-fuchsia-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {t('gradientGen.title')}
                            </h2>
                            <p className="text-gray-600">
                                {t('gradientGen.description')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('gradientGen.colors')}
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="color"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="w-full h-12 rounded-lg cursor-pointer border border-gray-200"
                                    />
                                </div>
                                <ArrowRight className={`w-5 h-5 text-gray-400 ${languageMeta.direction === 'rtl' ? 'rotate-180' : ''}`} />
                                <div className="flex-1">
                                    <input
                                        type="color"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="w-full h-12 rounded-lg cursor-pointer border border-gray-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('gradientGen.direction')} ({direction}°)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={direction}
                                onChange={(e) => setDirection(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <button
                            onClick={randomizeColors}
                            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {t('gradientGen.randomize')}
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <div
                            className="w-full aspect-video rounded-2xl shadow-inner border border-gray-100"
                            style={{ background: `linear-gradient(${direction}deg, ${color1}, ${color2})` }}
                        />

                        <div className="bg-gray-900 rounded-xl p-4 relative group">
                            <code className="text-blue-300 break-all pr-12 block font-mono text-sm">
                                {cssCode}
                            </code>
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title={t('gradientGen.copy')}
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
