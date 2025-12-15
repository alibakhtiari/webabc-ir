"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/seo/Breadcrumb';

const PAAScraper: React.FC = () => {
  const { languageMeta, t } = useLanguage();
  const [keyword, setKeyword] = useState('');
  const [questions] = useState<string[]>([]);

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('paaScraper.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('paaScraper.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('paaScraper.enterKeyword')}</CardTitle>
                <CardDescription>
                  {t('paaScraper.enterKeywordDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keyword">{t('paaScraper.keywordLabel')}</Label>
                  <Input
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={t('paaScraper.placeholder')}
                  />
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t('paaScraper.demoAlert')}
                  </AlertDescription>
                </Alert>

                <Button className="w-full" disabled>
                  {t('paaScraper.searchButton')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('paaScraper.exampleQuestions')}</CardTitle>
                <CardDescription>
                  {t('paaScraper.exampleDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    t('paaScraper.q1'),
                    t('paaScraper.q2'),
                    t('paaScraper.q3'),
                    t('paaScraper.q4'),
                    t('paaScraper.q5'),
                    t('paaScraper.q6'),
                    t('paaScraper.q7'),
                    t('paaScraper.q8')
                  ].map((q, i) => (
                    <li key={i} className="p-3 bg-muted rounded flex items-start gap-2">
                      <span className="text-primary font-semibold">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('paaScraper.results')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {questions.map((q, i) => (
                      <li key={i} className="p-3 bg-muted rounded">
                        {q}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PAAScraper;