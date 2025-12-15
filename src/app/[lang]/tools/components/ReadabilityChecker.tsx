"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Breadcrumb from '@/components/seo/Breadcrumb';

const ReadabilityChecker: React.FC = () => {
  const { languageMeta, t } = useLanguage();
  const [text, setText] = useState('');

  const calculateReadability = () => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const words = text.trim().split(/\s+/).filter(w => w);
    const syllables = words.reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);

    const avgWordsPerSentence = words.length / (sentences.length || 1);
    const avgSyllablesPerWord = syllables / (words.length || 1);

    // Flesch Reading Ease
    const fleschScore = Math.max(0, Math.min(100,
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
    ));

    // Flesch-Kincaid Grade Level
    const gradeLevel = Math.max(0,
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59
    );

    return {
      fleschScore: Math.round(fleschScore),
      gradeLevel: Math.round(gradeLevel * 10) / 10,
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10
    };
  };

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const getReadabilityLevel = (score: number): string => {
    if (score >= 90) return t('readabilityChecker.guide90').split(':')[1].trim();
    if (score >= 80) return t('readabilityChecker.guide80').split(':')[1].trim();
    if (score >= 70) return t('readabilityChecker.guide70').split(':')[1].trim();
    if (score >= 60) return t('readabilityChecker.guide60').split(':')[1].trim();
    if (score >= 50) return t('readabilityChecker.guide50').split(':')[1].trim();
    if (score >= 30) return t('readabilityChecker.guide30').split(':')[1].trim();
    return t('readabilityChecker.guide0').split(':')[1].trim();
  };

  const stats = text ? calculateReadability() : null;

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('readabilityChecker.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('readabilityChecker.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('readabilityChecker.enterText')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="text">{t('readabilityChecker.textLabel')}</Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('readabilityChecker.placeholder')}
                  rows={10}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {stats && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('readabilityChecker.analysis')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{t('readabilityChecker.fleschScore')}</span>
                      <span className="font-bold text-primary">{stats.fleschScore}/100</span>
                    </div>
                    <Progress value={stats.fleschScore} />
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('readabilityChecker.level')} {getReadabilityLevel(stats.fleschScore)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('readabilityChecker.gradeLevel')}</div>
                      <div className="text-2xl font-bold">{stats.gradeLevel}</div>
                      <div className="text-sm">{t('readabilityChecker.usGrade')}</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('readabilityChecker.wordCount')}</div>
                      <div className="text-2xl font-bold">{stats.wordCount}</div>
                      <div className="text-sm">{t('readabilityChecker.totalWords')}</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('readabilityChecker.sentences')}</div>
                      <div className="text-2xl font-bold">{stats.sentenceCount}</div>
                      <div className="text-sm">{t('readabilityChecker.totalSentences')}</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">{t('readabilityChecker.avgWords')}</div>
                      <div className="text-2xl font-bold">{stats.avgWordsPerSentence}</div>
                      <div className="text-sm">{t('readabilityChecker.avgWordsIdeal')}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <h3 className="font-semibold mb-2">{t('readabilityChecker.scoreGuide')}</h3>
                    <ul className="text-sm space-y-1">
                      <li>{t('readabilityChecker.guide90')}</li>
                      <li>{t('readabilityChecker.guide80')}</li>
                      <li>{t('readabilityChecker.guide70')}</li>
                      <li>{t('readabilityChecker.guide60')}</li>
                      <li>{t('readabilityChecker.guide50')}</li>
                      <li>{t('readabilityChecker.guide30')}</li>
                      <li>{t('readabilityChecker.guide0')}</li>
                    </ul>
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

export default ReadabilityChecker;