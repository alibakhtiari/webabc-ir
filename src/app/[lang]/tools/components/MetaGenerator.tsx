"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Breadcrumb from '@/components/seo/Breadcrumb';

const MetaGenerator: React.FC = () => {
  const { t, languageMeta } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogImage, setOgImage] = useState('');

  const generatedCode = `<!-- Basic Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Your page description'}" />
<meta name="keywords" content="${keywords || 'your, keywords, here'}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title || 'Your Page Title'}" />
<meta property="og:description" content="${description || 'Your page description'}" />
<meta property="og:image" content="${ogImage || 'https://example.com/image.jpg'}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title || 'Your Page Title'}" />
<meta name="twitter:description" content="${description || 'Your page description'}" />
<meta name="twitter:image" content="${ogImage || 'https://example.com/image.jpg'}" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success(t('metaGenerator.copied') || 'Copied to clipboard!');
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('metaGenerator.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('metaGenerator.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('metaGenerator.enterInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('metaGenerator.pageTitle')}</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('metaGenerator.titlePlaceholder')}
                  />
                </div>

                <div>
                  <Label htmlFor="description">{t('metaGenerator.metaDescription')}</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('metaGenerator.descPlaceholder')}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">{t('metaGenerator.keywords')}</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder={t('metaGenerator.keywordsPlaceholder')}
                  />
                </div>

                <div>
                  <Label htmlFor="ogImage">{t('metaGenerator.ogImage')}</Label>
                  <Input
                    id="ogImage"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder={t('metaGenerator.ogImagePlaceholder')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('metaGenerator.generatedTags')}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm whitespace-pre-wrap break-words">
                  <code>{generatedCode}</code>
                </pre>
                <Button onClick={copyToClipboard} className="mt-4 w-full">
                  {t('metaGenerator.copy')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaGenerator;