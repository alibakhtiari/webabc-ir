
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateLanguageAlternates, getPathWithoutLanguage, getPageNameFromPath } from '@/lib/languageUtils';
import { useLocation } from 'react-router-dom';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
  author?: string;
  noIndex?: boolean;
  languageAlternates?: {
    lang: string;
    url: string;
  }[];
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl,
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords,
  author,
  noIndex = false,
  languageAlternates: customLanguageAlternates
}: SEOHeadProps) => {
  const { language, getSeoTitle, getSeoDescription, languageMeta, t } = useLanguage();
  const location = useLocation();
  const [languageAlternates, setLanguageAlternates] = useState<{lang: string, url: string}[]>([]);
  
  const pageName = getPageNameFromPath(location.pathname);
  
  // Generate SEO title and description based on current language and page context
  const seoTitle = getSeoTitle(title || t(`${pageName}.title`));
  const seoDescription = getSeoDescription(description || t(`${pageName}.description`));
  const seoKeywords = keywords || t(`${pageName}.keywords`, { fallback: t('seo.keywords') });
  
  // Get author based on current language
  const seoAuthor = author || (language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث');
  
  // Generate canonical URL
  const currentUrl = canonicalUrl || window.location.href;

  // Generate language alternates
  useEffect(() => {
    if (customLanguageAlternates) {
      setLanguageAlternates(customLanguageAlternates);
    } else {
      const path = getPathWithoutLanguage(location.pathname);
      const alternates = generateLanguageAlternates(path, language);
      setLanguageAlternates(alternates);
    }
  }, [customLanguageAlternates, location.pathname, language]);
  
  return (
    <Helmet>
      <html lang={language} dir={languageMeta.direction} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Language alternates for SEO */}
      {languageAlternates?.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Default hreflang x-default */}
      <link rel="alternate" hrefLang="x-default" href={window.location.origin} />
      
      {/* Basic SEO */}
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      {seoAuthor && <meta name="author" content={seoAuthor} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {!noIndex && <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`} />
      <meta property="og:site_name" content={language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'ar' ? 'ar_SA' : 'fa_IR'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`} />

      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
