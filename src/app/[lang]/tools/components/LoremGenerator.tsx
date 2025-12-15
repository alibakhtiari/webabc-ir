"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Breadcrumb from '@/components/seo/Breadcrumb';

const LoremGenerator: React.FC = () => {
  const { languageMeta, t } = useLanguage();
  const [paragraphs, setParagraphs] = useState('3');
  const [theme, setTheme] = useState('classic');
  const [generatedText, setGeneratedText] = useState('');

  const loremThemes = {
    classic: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    ],
    startup: [
      "Disrupt the industry with our innovative, scalable solution that leverages cutting-edge technology to revolutionize your workflow.",
      "Our platform empowers teams to collaborate seamlessly, driving productivity and fostering innovation across your organization.",
      "We're building the future of digital transformation with AI-powered tools that optimize your business processes.",
      "Join thousands of forward-thinking companies who trust our cloud-based infrastructure to accelerate their growth.",
      "Experience the power of data-driven insights that enable smarter decision-making and unlock new opportunities."
    ],
    design: [
      "Beautiful typography and thoughtful spacing create harmonious visual hierarchies that guide the user's eye naturally.",
      "Our design system embraces minimalism while maintaining warmth through carefully selected color palettes and micro-interactions.",
      "Every pixel is intentionally placed to create delightful user experiences that feel both familiar and innovative.",
      "Responsive layouts adapt fluidly across devices, ensuring consistency and usability in every context.",
      "Accessibility isn't an afterthought—it's woven into every design decision we make, ensuring inclusive experiences for all."
    ]
  };

  const generateLorem = () => {
    const count = parseInt(paragraphs) || 3;
    const selectedTheme = loremThemes[theme as keyof typeof loremThemes];
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(selectedTheme[i % selectedTheme.length]);
    }

    setGeneratedText(result.join('\n\n'));
  };

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast.success(t('loremGenerator.copied'));
    }
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 md:space-y-8">
          <Breadcrumb />
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight px-4">{t('loremGenerator.title')}</h1>
            <p className="text-lg md:text-xl text-muted-foreground px-2">
              {t('loremGenerator.description')}
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('loremGenerator.settings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paragraphs">{t('loremGenerator.numParagraphs')}</Label>
                    <Input
                      id="paragraphs"
                      type="number"
                      min="1"
                      max="10"
                      value={paragraphs}
                      onChange={(e) => setParagraphs(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="theme">{t('loremGenerator.theme')}</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">{t('loremGenerator.themeClassic')}</SelectItem>
                        <SelectItem value="startup">{t('loremGenerator.themeStartup')}</SelectItem>
                        <SelectItem value="design">{t('loremGenerator.themeDesign')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateLorem} className="w-full">
                  {t('loremGenerator.generate')}
                </Button>
              </CardContent>
            </Card>

            {generatedText && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('loremGenerator.generatedTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded whitespace-pre-wrap">
                    {generatedText}
                  </div>
                  <Button onClick={copyToClipboard} className="mt-4 w-full">
                    {t('loremGenerator.copy')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoremGenerator;