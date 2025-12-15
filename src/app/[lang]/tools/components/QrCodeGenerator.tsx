"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { toast } from 'sonner';

const QrCodeGenerator: React.FC = () => {
    const { t } = useLanguage();
    const [text, setText] = useState('');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [qrSize, setQrSize] = useState(256);

    const downloadQrCode = () => {
        const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast.success(t('qrGenerator.downloadSuccess'));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
                <Breadcrumb />
                <div className="text-center space-y-3 md:space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('qrGenerator.title')}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground px-2">
                        {t('qrGenerator.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('qrGenerator.settings')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="text">{t('qrGenerator.contentLabel')}</Label>
                                <Input
                                    id="text"
                                    placeholder={t('qrGenerator.placeholder')}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fgColor">{t('qrGenerator.fgColor')}</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="fgColor"
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <span className="text-sm text-muted-foreground">{fgColor}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bgColor">{t('qrGenerator.bgColor')}</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="bgColor"
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <span className="text-sm text-muted-foreground">{bgColor}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('qrGenerator.preview')}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-6">
                            <div className="p-4 bg-white rounded-lg shadow-sm border">
                                <QRCodeCanvas
                                    id="qr-canvas"
                                    value={text || "https://example.com"}
                                    size={qrSize}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    includeMargin={true}
                                    level="H"
                                />
                            </div>

                            <Button onClick={downloadQrCode} className="w-full max-w-xs" disabled={!text}>
                                {t('qrGenerator.download')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default QrCodeGenerator;
