"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SerpPreview: React.FC = () => {
  const { language, languageMeta } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const titleLength = title.length;
  const descriptionLength = description.length;

  return (
    <div>
      <SEOHead
        title="SERP Snippet Preview Tool"
        description="Preview how your webpage will appear in Google search results"
      />

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">SERP Snippet Preview</h1>
          <p className="text-muted-foreground text-center mb-8">
            Preview how your page will appear in Google search results
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
                <CardDescription>Fill in your meta information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title Tag</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your page title"
                    maxLength={70}
                  />
                  <p className={`text-sm mt-1 ${titleLength > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {titleLength}/60 characters (max 70)
                  </p>
                </div>

                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/page"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Your meta description"
                    maxLength={170}
                    rows={4}
                  />
                  <p className={`text-sm mt-1 ${descriptionLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {descriptionLength}/160 characters (max 170)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google Search Preview</CardTitle>
                <CardDescription>How it will appear in search results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 p-4 rounded border">
                  <div className="text-sm text-green-700 dark:text-green-500 mb-1">
                    {url || 'https://example.com/page'}
                  </div>
                  <div className="text-xl text-blue-600 dark:text-blue-400 mb-2 hover:underline cursor-pointer">
                    {title || 'Your Page Title Will Appear Here'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {description || 'Your meta description will appear here. Make it compelling to improve click-through rates from search results.'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SerpPreview;