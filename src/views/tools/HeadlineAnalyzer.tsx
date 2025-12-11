"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/seo/Breadcrumb';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const HeadlineAnalyzer: React.FC = () => {
  const { languageMeta } = useLanguage();
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
    <div>


      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumb />
          <h1 className="text-4xl font-bold mb-4 text-center">Headline Analyzer</h1>
          <p className="text-muted-foreground text-center mb-8">
            Analyze and score your headlines for maximum impact
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Headline</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="headline">Headline</Label>
                <Textarea
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter your headline here..."
                  rows={3}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Overall Score</span>
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
                      <div className="text-sm text-muted-foreground">Word Count</div>
                      <div className="text-2xl font-bold">{analysis.wordCount}</div>
                      <div className="text-sm">Ideal: 6-12 words</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Character Count</div>
                      <div className="text-2xl font-bold">{analysis.charCount}</div>
                      <div className="text-sm">Ideal: 40-60 characters</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>Contains Number</span>
                      <span className={analysis.hasNumber ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasNumber ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>Contains Question</span>
                      <span className={analysis.hasQuestion ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasQuestion ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>Emotional Words</span>
                      <span className={analysis.hasEmotion ? 'text-green-600 font-semibold' : 'text-muted-foreground'}>
                        {analysis.hasEmotion ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HeadlineAnalyzer;
