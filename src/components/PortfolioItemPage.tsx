
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateLanguageAlternates, getPathWithoutLanguage } from '@/lib/languageUtils';
import { useLocation } from 'react-router-dom';

interface PortfolioItemProps {
  portfolioItems: {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    fullDescription?: string;
    client?: string;
    projectUrl?: string;
    technologies?: string[];
    results?: { label: string; value: string }[];
  }[];
}

const PortfolioItemPage: React.FC<PortfolioItemProps> = ({ portfolioItems }) => {
  const { id } = useParams<{ id: string }>();
  const { t, language, languageMeta } = useLanguage();
  const location = useLocation();
  const path = getPathWithoutLanguage(location.pathname);
  const languageAlternates = generateLanguageAlternates(path, language);
  
  const item = portfolioItems.find(item => item.id === id);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={languageMeta.direction}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{language === 'en' ? 'Portfolio item not found' : language === 'ar' ? 'لم يتم العثور على العنصر' : 'نمونه کار یافت نشد'}</h1>
          <p className="mb-6">{language === 'en' ? 'The requested portfolio item could not be found.' : language === 'ar' ? 'لم يتم العثور على عنصر المحفظة المطلوب.' : 'متأسفانه نمونه کار مورد نظر یافت نشد.'}</p>
          <Button asChild>
            <Link to={`/${language}/portfolio`}>{t('common.backToPortfolio')}</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Schema markup for portfolio item
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: language === 'en' ? 'Home' : language === 'ar' ? 'الرئيسية' : 'صفحه اصلی', item: `https://webabc.com/${language}` },
    { name: t('common.portfolio'), item: `https://webabc.com/${language}/portfolio` },
    { name: item.title, item: `https://webabc.com/${language}/portfolio/${item.id}` }
  ]);
  
  const portfolioItemSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": item.title,
    "description": item.description,
    "image": item.image,
    "creator": {
      "@type": "Organization",
      "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
    },
    "inLanguage": language
  };

  return (
    <div dir={languageMeta.direction} className="font-persian min-h-screen flex flex-col">
      <SEOHead 
        title={`${item.title} | ${t('common.portfolio')}`}
        description={item.description}
        keywords={`${item.title}, ${item.category}, ${language === 'en' ? 'portfolio, web design sample, seo sample' : language === 'ar' ? 'معرض الأعمال، نموذج تصميم الويب، نموذج تحسين محركات البحث' : 'نمونه کار طراحی سایت, نمونه کار سئو'}`}
        languageAlternates={languageAlternates}
      />
      
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={portfolioItemSchema} />
      
      <Navbar />
      
      <main className="flex-1 mt-24 mb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm mb-6">
            <Link to={`/${language}`} className="text-gray-500 hover:text-primary">{t('common.home')}</Link>
            <span className="mx-2">/</span>
            <Link to={`/${language}/portfolio`} className="text-gray-500 hover:text-primary">{t('common.portfolio')}</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{item.title}</span>
          </div>
          
          {/* Project Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h1>
            <div className="flex items-center">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {item.category}
              </span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <LazyImage 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-3">{language === 'en' ? 'Project Description' : language === 'ar' ? 'وصف المشروع' : 'توضیحات پروژه'}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {item.fullDescription || item.description}
                </p>
              </div>
              
              {item.client && (
                <div>
                  <h2 className="text-xl font-bold mb-3">{language === 'en' ? 'Client' : language === 'ar' ? 'العميل' : 'کارفرما'}</h2>
                  <p className="text-gray-700">{item.client}</p>
                </div>
              )}
              
              {item.technologies && (
                <div>
                  <h2 className="text-xl font-bold mb-3">{language === 'en' ? 'Technologies Used' : language === 'ar' ? 'التقنيات المستخدمة' : 'تکنولوژی‌های استفاده شده'}</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {item.results && (
                <div>
                  <h2 className="text-xl font-bold mb-3">{language === 'en' ? 'Results' : language === 'ar' ? 'النتائج' : 'نتایج'}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {item.results.map((result, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-sm">{result.label}</span>
                        <span className="block text-xl font-bold text-primary">{result.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link to={`/${language}/portfolio`}>
                    {languageMeta.direction === 'rtl' ? (
                      <>
                        {t('common.backToPortfolio')}
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('common.backToPortfolio')}
                      </>
                    )}
                  </Link>
                </Button>
                
                {item.projectUrl && (
                  <Button asChild>
                    <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                      {t('common.viewWebsite')}
                      <ExternalLink className={languageMeta.direction === 'rtl' ? 'mr-2 h-4 w-4' : 'ml-2 h-4 w-4'} />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioItemPage;
