
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPage = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'} className={language === 'en' ? 'font-sans' : 'font-arabic'}>
      <SEOHead 
        title={`${t('common.blog')} | WebABC`}
        description={t('common.blogDescription') || 'Read our latest blog posts about web development, SEO, and digital marketing.'}
        keywords={t('common.blogKeywords') || 'blog, web development, SEO, digital marketing'}
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          {t('common.blog') || 'Blog'}
        </h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-xl text-gray-600">
            {language === 'en' ? 'Blog posts coming soon!' : 
             language === 'ar' ? 'مقالات المدونة قادمة قريبا!' : 
             'مقالات وبلاگ به زودی!'}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
