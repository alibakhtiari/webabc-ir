"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UTMBuilder: React.FC = () => {
  const { languageMeta } = useLanguage();
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
      toast.success('URL copied to clipboard!');
    }
  };

  return (
    <div>

      <div className="min-h-screen bg-linear-to-b from-background to-muted/20 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">UTM Link Builder</h1>
          <p className="text-muted-foreground text-center mb-8">
            Create trackable URLs with UTM parameters for Google Analytics
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="url">Website URL (required)</Label>
                  <Input
                    id="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="source">Campaign Source (required)</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="google, newsletter, facebook"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    The referrer: google, newsletter, facebook, etc.
                  </p>
                </div>

                <div>
                  <Label htmlFor="medium">Campaign Medium (required)</Label>
                  <Input
                    id="medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="cpc, email, social"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Marketing medium: cpc, email, social, etc.
                  </p>
                </div>

                <div>
                  <Label htmlFor="campaign">Campaign Name (required)</Label>
                  <Input
                    id="campaign"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    placeholder="summer_sale, product_launch"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Product, promo code, or slogan
                  </p>
                </div>

                <div>
                  <Label htmlFor="term">Campaign Term (optional)</Label>
                  <Input
                    id="term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="running+shoes"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Identify paid search keywords
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">Campaign Content (optional)</Label>
                  <Input
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="logolink, textlink"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Differentiate ads or links
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated UTM URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded break-all">
                  {finalUrl || 'Fill in the fields above to generate your UTM URL'}
                </div>
                <Button
                  onClick={copyUrl}
                  className="mt-4 w-full"
                  disabled={!finalUrl || !source || !medium || !campaign}
                >
                  Copy URL
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