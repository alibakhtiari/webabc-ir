"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const LoremGenerator: React.FC = () => {
  const { languageMeta } = useLanguage();
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
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Lorem Ipsum Generator</h1>
          <p className="text-muted-foreground text-center mb-8">
            Generate customizable placeholder text for your designs
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paragraphs">Number of Paragraphs</Label>
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
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic Lorem Ipsum</SelectItem>
                        <SelectItem value="startup">Startup Lorem</SelectItem>
                        <SelectItem value="design">Designer Lorem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateLorem} className="w-full">
                  Generate Text
                </Button>
              </CardContent>
            </Card>

            {generatedText && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded whitespace-pre-wrap">
                    {generatedText}
                  </div>
                  <Button onClick={copyToClipboard} className="mt-4 w-full">
                    Copy to Clipboard
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