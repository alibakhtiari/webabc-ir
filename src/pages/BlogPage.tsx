
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const BlogPage: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  
  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={t('seo.blogTitle')}
        description={t('seo.blogDescription')}
        keywords={t('seo.keywords')}
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('common.blog')}</h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">{t('common.comingSoon')}</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
