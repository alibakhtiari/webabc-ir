import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MetaGenerator: React.FC = () => {
  const { languageMeta } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogImage, setOgImage] = useState('');

  const generatedCode = `<!-- Basic Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Your page description'}" />
<meta name="keywords" content="${keywords || 'your, keywords, here'}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title || 'Your Page Title'}" />
<meta property="og:description" content="${description || 'Your page description'}" />
<meta property="og:image" content="${ogImage || 'https://example.com/image.jpg'}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title || 'Your Page Title'}" />
<meta name="twitter:description" content="${description || 'Your page description'}" />
<meta name="twitter:image" content="${ogImage || 'https://example.com/image.jpg'}" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Copied to clipboard!');
  };

  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title="Meta Tag Generator"
        description="Generate SEO-optimized meta tags for your website"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Meta Tag Generator</h1>
          <p className="text-muted-foreground text-center mb-8">
            Generate SEO and social media meta tags for your website
          </p>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your page title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief description of your page"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <Label htmlFor="ogImage">Open Graph Image URL</Label>
                  <Input
                    id="ogImage"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Meta Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                  <code>{generatedCode}</code>
                </pre>
                <Button onClick={copyToClipboard} className="mt-4 w-full">
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MetaGenerator;