import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const ReadabilityChecker: React.FC = () => {
  const { languageMeta } = useLanguage();
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
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  };

  const stats = text ? calculateReadability() : null;

  return (
    <div>
      <SEOHead 
        title="Readability Checker"
        description="Analyze text readability with Flesch-Kincaid scores"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Readability Checker</h1>
          <p className="text-muted-foreground text-center mb-8">
            Analyze your text readability and get Flesch-Kincaid scores
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="text">Text to Analyze</Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here..."
                  rows={10}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {stats && (
              <Card>
                <CardHeader>
                  <CardTitle>Readability Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Flesch Reading Ease</span>
                      <span className="font-bold text-primary">{stats.fleschScore}/100</span>
                    </div>
                    <Progress value={stats.fleschScore} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Level: {getReadabilityLevel(stats.fleschScore)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Grade Level</div>
                      <div className="text-2xl font-bold">{stats.gradeLevel}</div>
                      <div className="text-sm">U.S. Grade Level</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Word Count</div>
                      <div className="text-2xl font-bold">{stats.wordCount}</div>
                      <div className="text-sm">Total words</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Sentences</div>
                      <div className="text-2xl font-bold">{stats.sentenceCount}</div>
                      <div className="text-sm">Total sentences</div>
                    </div>

                    <div className="p-4 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Avg Words/Sentence</div>
                      <div className="text-2xl font-bold">{stats.avgWordsPerSentence}</div>
                      <div className="text-sm">Ideal: 15-20</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <h3 className="font-semibold mb-2">Score Guide</h3>
                    <ul className="text-sm space-y-1">
                      <li>90-100: Very easy to read</li>
                      <li>80-90: Easy to read</li>
                      <li>70-80: Fairly easy to read</li>
                      <li>60-70: Standard/Conversational</li>
                      <li>50-60: Fairly difficult to read</li>
                      <li>30-50: Difficult to read</li>
                      <li>0-30: Very difficult to read</li>
                    </ul>
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

export default ReadabilityChecker;