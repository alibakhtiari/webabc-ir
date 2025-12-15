"use client";

import React, { useState } from 'react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const HeadlineAnalyzer: React.FC = () => {
  const { t, languageMeta } = useLanguage();
  const [headline, setHeadline] = useState('');

  const analyzeHeadline = () => {
    const wordCount = headline.trim().split(/\s+/).filter(w => w).length;
    const charCount = headline.length;
    const hasNumber = /\d/.test(headline);
    const hasQuestion = headline.includes('?');
    const emotionalWords = ['amazing', 'incredible', 'essential', 'ultimate', 'powerful', 'proven', 'secret', 'free'];
    const hasEmotion = emotionalWords.some(word => headline.toLowerCase().includes(word));

    let score = 0;
    if (wordCount >= 6 && wordCount <= 12) score += 25;
    else if (wordCount >= 4 && wordCount <= 15) score += 15;

    if (charCount >= 40 && charCount <= 60) score += 25;
    else if (charCount >= 30 && charCount <= 70) score += 15;

    if (hasNumber) score += 20;
    if (hasQuestion) score += 15;
    if (hasEmotion) score += 15;

    return {
      score: Math.min(score, 100),
      wordCount,
      charCount,
      hasNumber,
      hasQuestion,
      hasEmotion
    };
  };

  const analysis = headline ? analyzeHeadline() : null;

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('headlineAnalyzer.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('headlineAnalyzer.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('headlineAnalyzer.enterHeadline')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="headline">{t('headlineAnalyzer.headlineLabel')}</Label>
                <Textarea
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder={t('headlineAnalyzer.placeholder')}
                  rows={3}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('headlineAnalyzer.results')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{t('headlineAnalyzer.overallScore')}</span>
                      <span className={`font-bold ${analysis.score >= 70 ? 'text-green-600' :
                        analysis.score >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                        {analysis.score}/100
                      </span>
                    </div>
                    <Progress value={analysis.score} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('headlineAnalyzer.wordCount')}</div>
                      <div className="text-2xl font-bold">{analysis.wordCount}</div>
                      <div className="text-sm">{t('headlineAnalyzer.wordCountIdeal')}</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('headlineAnalyzer.charCount')}</div>
                      <div className="text-2xl font-bold">{analysis.charCount}</div>
                      <div className="text-sm">{t('headlineAnalyzer.charCountIdeal')}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{t('headlineAnalyzer.containsNumber')}</span>
                      <span className={analysis.hasNumber ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasNumber ? t('headlineAnalyzer.yes') : t('headlineAnalyzer.no')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{t('headlineAnalyzer.containsQuestion')}</span>
                      <span className={analysis.hasQuestion ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasQuestion ? t('headlineAnalyzer.yes') : t('headlineAnalyzer.no')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{t('headlineAnalyzer.emotionalWords')}</span>
                      <span className={analysis.hasEmotion ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasEmotion ? t('headlineAnalyzer.yes') : t('headlineAnalyzer.no')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadlineAnalyzer;
