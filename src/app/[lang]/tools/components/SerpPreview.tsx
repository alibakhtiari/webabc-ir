"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import Breadcrumb from '@/components/seo/Breadcrumb';

const SerpPreview: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const isRtl = languageMeta.direction === 'rtl';

  const titleLength = title.length;
  const descriptionLength = description.length;

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('serpPreview.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('serpPreview.description')}
            </p>
          </div>


          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('serpPreview.enterDetails')}</CardTitle>
                <CardDescription>{t('serpPreview.fillDetails')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('serpPreview.titleTag')}</Label>
                  <Input
                    id="title"
                    dir={isRtl ? 'rtl' : 'ltr'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('serpPreview.placeholderTitle')}
                    maxLength={70}
                  />
                  <p className={`text-sm mt-1 ${titleLength > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {titleLength}/60 {t('serpPreview.charsMax')} 70)
                  </p>
                </div>

                <div>
                  <Label htmlFor="url">{t('serpPreview.url')}</Label>
                  <Input
                    id="url"
                    dir="ltr"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t('serpPreview.placeholderUrl')}
                  />
                </div>

                <div>
                  <Label htmlFor="description">{t('serpPreview.metaDescription')}</Label>
                  <Textarea
                    id="description"
                    dir={isRtl ? 'rtl' : 'ltr'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('serpPreview.placeholderDesc')}
                    maxLength={170}
                    rows={4}
                  />
                  <p className={`text-sm mt-1 ${descriptionLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {descriptionLength}/160 {t('serpPreview.charsMax')} 170)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('serpPreview.googlePreview')}</CardTitle>
                <CardDescription>{t('serpPreview.previewDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 p-4 rounded border text-left" dir="ltr">
                  <div className="text-sm text-green-700 dark:text-green-500 mb-1 break-all font-sans">
                    {url || t('serpPreview.placeholderUrl')}
                  </div>
                  <div className="text-xl text-blue-600 dark:text-blue-400 mb-2 hover:underline cursor-pointer font-sans">
                    {title || t('serpPreview.previewTitleDefault')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-sans">
                    {description || t('serpPreview.previewDescDefault')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SerpPreview;