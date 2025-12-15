"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Breadcrumb from '@/components/seo/Breadcrumb';

const UTMBuilder: React.FC = () => {
  const { languageMeta, t } = useLanguage();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const buildUTMUrl = () => {
    if (!websiteUrl) return '';

    const params = new URLSearchParams();
    if (source) params.append('utm_source', source);
    if (medium) params.append('utm_medium', medium);
    if (campaign) params.append('utm_campaign', campaign);
    if (term) params.append('utm_term', term);
    if (content) params.append('utm_content', content);

    const utmString = params.toString();
    return utmString ? `${websiteUrl}?${utmString}` : websiteUrl;
  };

  const finalUrl = buildUTMUrl();

  const copyUrl = () => {
    if (finalUrl) {
      navigator.clipboard.writeText(finalUrl);
      toast.success(t('utmBuilder.copied'));
    }
  };

  return (
    <div>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('utmBuilder.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('utmBuilder.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('utmBuilder.campaignDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="url">{t('utmBuilder.websiteUrl')}</Label>
                  <Input
                    id="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder={t('utmBuilder.urlPlaceholder')}
                  />
                </div>

                <div>
                  <Label htmlFor="source">{t('utmBuilder.source')}</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder={t('utmBuilder.sourcePlaceholder')}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('utmBuilder.sourceHelp')}
                  </p>
                </div>

                <div>
                  <Label htmlFor="medium">{t('utmBuilder.medium')}</Label>
                  <Input
                    id="medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder={t('utmBuilder.mediumPlaceholder')}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('utmBuilder.mediumHelp')}
                  </p>
                </div>

                <div>
                  <Label htmlFor="campaign">{t('utmBuilder.campaign')}</Label>
                  <Input
                    id="campaign"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    placeholder={t('utmBuilder.campaignPlaceholder')}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('utmBuilder.campaignHelp')}
                  </p>
                </div>

                <div>
                  <Label htmlFor="term">{t('utmBuilder.term')}</Label>
                  <Input
                    id="term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={t('utmBuilder.termPlaceholder')}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('utmBuilder.termHelp')}
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">{t('utmBuilder.content')}</Label>
                  <Input
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t('utmBuilder.contentPlaceholder')}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('utmBuilder.contentHelp')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('utmBuilder.generatedUrl')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded break-all">
                  {finalUrl || t('utmBuilder.fillFields')}
                </div>
                <Button
                  onClick={copyUrl}
                  className="mt-4 w-full"
                  disabled={!finalUrl || !source || !medium || !campaign}
                >
                  {t('utmBuilder.copyUrl')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMBuilder;