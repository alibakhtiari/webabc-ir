import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Tag, HelpCircle, Link2, FileText, BarChart, Type } from 'lucide-react';

const Resources: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();

  const tools = [
    {
      icon: Search,
      name: t('resources.serpPreview'),
      description: t('resources.serpPreviewDesc'),
      link: `/${language}/tools/serp-preview`,
      category: 'seo'
    },
    {
      icon: Tag,
      name: t('resources.metaGenerator'),
      description: t('resources.metaGeneratorDesc'),
      link: `/${language}/tools/meta-generator`,
      category: 'seo'
    },
    {
      icon: HelpCircle,
      name: t('resources.paaScaper'),
      description: t('resources.paaScraperDesc'),
      link: `/${language}/tools/paa-scraper`,
      category: 'seo'
    },
    {
      icon: Link2,
      name: t('resources.utmBuilder'),
      description: t('resources.utmBuilderDesc'),
      link: `/${language}/tools/utm-builder`,
      category: 'seo'
    },
    {
      icon: BarChart,
      name: t('resources.headlineAnalyzer'),
      description: t('resources.headlineAnalyzerDesc'),
      link: `/${language}/tools/headline-analyzer`,
      category: 'content'
    },
    {
      icon: FileText,
      name: t('resources.readabilityChecker'),
      description: t('resources.readabilityCheckerDesc'),
      link: `/${language}/tools/readability-checker`,
      category: 'content'
    },
    {
      icon: Type,
      name: t('resources.loremGenerator'),
      description: t('resources.loremGeneratorDesc'),
      link: `/${language}/tools/lorem-generator`,
      category: 'content'
    }
  ];

  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={t('resources.title')}
        description={t('resources.resourcesDesc')}
        keywords="SEO tools, free tools, meta tags, SERP preview, UTM builder"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('resources.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('resources.resourcesDesc')}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('resources.seoTools')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'seo').map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <tool.icon className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={tool.link}>{t('resources.useTool')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">{t('resources.contentTools')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'content').map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <tool.icon className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={tool.link}>{t('resources.useTool')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;