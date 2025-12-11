"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const PAAScraper: React.FC = () => {
  const { languageMeta } = useLanguage();
  const [keyword, setKeyword] = useState('');
  const [questions] = useState<string[]>([]);

  return (
    <div>


      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">People Also Ask Scraper</h1>
          <p className="text-muted-foreground text-center mb-8">
            Discover common questions about your keywords for content ideas
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Keyword</CardTitle>
                <CardDescription>
                  Find questions people are asking about your topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="keyword">Keyword or Topic</Label>
                  <Input
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g., web design, SEO, digital marketing"
                  />
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This tool demonstrates the interface. To scrape live "People Also Ask" data from Google,
                    you would need to integrate with a third-party API service like SerpAPI, DataForSEO, or similar.
                  </AlertDescription>
                </Alert>

                <Button className="w-full" disabled>
                  Search Questions (Demo Mode)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example Questions</CardTitle>
                <CardDescription>
                  Common "People Also Ask" questions for: Web Design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "What is web design and why is it important?",
                    "How much does a website design cost?",
                    "What are the key principles of good web design?",
                    "What is the difference between web design and web development?",
                    "How long does it take to design a website?",
                    "What tools do web designers use?",
                    "Is web design a good career?",
                    "What skills do you need for web design?"
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
                  <CardTitle>Results</CardTitle>
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
      </main>

      <Footer />
    </div>
  );
};

export default PAAScraper;