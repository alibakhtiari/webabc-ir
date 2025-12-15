"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { toast } from 'sonner';

const PrivacyPolicyGenerator: React.FC = () => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        companyName: '',
        websiteUrl: '',
        email: '',
        address: '',
        cookies: true,
        ads: false
    });

    const [generatedPolicy, setGeneratedPolicy] = useState('');

    const generatePolicy = () => {
        const policy = `
${t('privacyGenerator.policyTitle')}
${t('privacyGenerator.lastUpdated')}: ${new Date().toLocaleDateString()}

${t('privacyGenerator.introTitle')}
${t('privacyGenerator.introText')
                .replace('{companyName}', formData.companyName || '[Company Name]')
                .replace('{websiteUrl}', formData.websiteUrl || '[Website URL]')}

${t('privacyGenerator.contactTitle')}
${t('privacyGenerator.contactText')}
${t('privacyGenerator.emailLabel')} ${formData.email || '[Email Address]'}
${t('privacyGenerator.addressLabel')} ${formData.address || '[Physical Address]'}

${t('privacyGenerator.dataTitle')}
${t('privacyGenerator.dataIntro')}
${t('privacyGenerator.dataIdentity')}
${t('privacyGenerator.dataContact')}
${t('privacyGenerator.dataTechnical')}

${formData.cookies ? `${t('privacyGenerator.cookiesTitle')}
${t('privacyGenerator.cookiesText')}` : ''}

${formData.ads ? `${t('privacyGenerator.adsTitle')}
${t('privacyGenerator.adsText')}` : ''}

${t('privacyGenerator.securityTitle')}
${t('privacyGenerator.securityText')}

${t('privacyGenerator.rightsTitle')}
${t('privacyGenerator.rightsText')}
        `.trim();

        setGeneratedPolicy(policy);
        toast.success(t('privacyGenerator.generated'));
    };

    const copyToClipboard = () => {
        if (generatedPolicy) {
            navigator.clipboard.writeText(generatedPolicy);
            toast.success(t('privacyGenerator.copied'));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('privacyGenerator.title')}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('privacyGenerator.description')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('privacyGenerator.companyInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>{t('privacyGenerator.companyName')}</Label>
                                <Input
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('privacyGenerator.websiteUrl')}</Label>
                                <Input
                                    value={formData.websiteUrl}
                                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('privacyGenerator.email')}</Label>
                                <Input
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="support@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('privacyGenerator.address')}</Label>
                                <Input
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <Label>{t('privacyGenerator.useCookies')}</Label>
                                    <Switch
                                        checked={formData.cookies}
                                        onCheckedChange={(c) => setFormData({ ...formData, cookies: c })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>{t('privacyGenerator.showAds')}</Label>
                                    <Switch
                                        checked={formData.ads}
                                        onCheckedChange={(c) => setFormData({ ...formData, ads: c })}
                                    />
                                </div>
                            </div>

                            <Button onClick={generatePolicy} className="w-full mt-4">
                                {t('privacyGenerator.generate')}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('privacyGenerator.result')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted p-4 rounded h-[400px] overflow-y-auto whitespace-pre-wrap text-sm border font-mono">
                                {generatedPolicy || t('privacyGenerator.placeholder')}
                            </div>
                            <Button
                                onClick={copyToClipboard}
                                className="w-full mt-4"
                                variant="outline"
                                disabled={!generatedPolicy}
                            >
                                {t('privacyGenerator.copy')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyGenerator;
