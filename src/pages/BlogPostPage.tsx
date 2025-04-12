
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const BlogPostPage: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={`${slug} - ${t('seo.blogTitle')}`}
        description={t('seo.blogDescription')}
        keywords={t('seo.keywords')}
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <Link to={`/${language}/blog`} className="text-primary hover:underline mb-4 block">
          ← {t('common.backToBlog')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">{slug}</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600">{t('common.comingSoon')}</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
