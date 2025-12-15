"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { toast } from 'sonner';

const GlassmorphismGenerator: React.FC = () => {
    const { t } = useLanguage();

    const [blur, setBlur] = useState(16);
    const [opacity, setOpacity] = useState(0.5);
    const [saturation, setSaturation] = useState(150);
    const [color, setColor] = useState('#ffffff');

    // Convert hex to rgb for rgba string
    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `${r}, ${g}, ${b}`;
    };

    const cssCode = `backdrop-filter: blur(${blur}px) saturate(${saturation}%);
background-color: rgba(${hexToRgb(color)}, ${opacity});
border: 1px solid rgba(255, 255, 255, 0.3);`;

    const copyCss = () => {
        navigator.clipboard.writeText(cssCode);
        toast.success(t('glassGen.copied'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('glassGen.title')}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('glassGen.description')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('glassGen.settings')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>{t('glassGen.blur')}</Label>
                                    <span>{blur}px</span>
                                </div>
                                <Slider
                                    value={[blur]}
                                    min={0}
                                    max={40}
                                    step={1}
                                    onValueChange={(val) => setBlur(val[0])}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>{t('glassGen.opacity')}</Label>
                                    <span>{Math.round(opacity * 100)}%</span>
                                </div>
                                <Slider
                                    value={[opacity]}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onValueChange={(val) => setOpacity(val[0])}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>{t('glassGen.saturation')}</Label>
                                    <span>{saturation}%</span>
                                </div>
                                <Slider
                                    value={[saturation]}
                                    min={0}
                                    max={200}
                                    step={1}
                                    onValueChange={(val) => setSaturation(val[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>{t('glassGen.color')}</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-10 w-20 p-1 cursor-pointer"
                                    />
                                    <span className="text-sm text-muted-foreground">{color}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('glassGen.preview')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Preview Box with Pattern Background */}
                            <div className="h-64 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8 relative overflow-hidden">
                                {/* Abstract shapes for glass effect */}
                                <div className="absolute top-4 left-4 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
                                <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>

                                <div
                                    className="w-full h-full rounded-xl flex items-center justify-center text-white font-medium p-4 text-center"
                                    style={{
                                        backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                                        backgroundColor: `rgba(${hexToRgb(color)}, ${opacity})`,
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {t('glassGen.previewText')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>{t('glassGen.cssOutput')}</Label>
                                <div className="relative">
                                    <div className="bg-slate-950 text-slate-50 p-4 rounded font-mono text-sm whitespace-pre">
                                        {cssCode}
                                    </div>
                                    <Button
                                        onClick={copyCss}
                                        className="absolute top-2 right-2 h-8 text-xs"
                                        variant="secondary"
                                    >
                                        {t('glassGen.copy')}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GlassmorphismGenerator;
