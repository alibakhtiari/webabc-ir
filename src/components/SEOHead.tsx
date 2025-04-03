
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

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
  languageAlternates
}: SEOHeadProps) => {
  const { language, getSeoTitle, getSeoDescription, languageMeta } = useLanguage();
  
  // Generate SEO title and description based on current language
  const seoTitle = getSeoTitle(title);
  const seoDescription = getSeoDescription(description);
  
  // Get author based on current language
  const seoAuthor = author || (language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث');
  
  // Generate canonical URL
  const currentUrl = canonicalUrl || window.location.href;
  
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
      {keywords && <meta name="keywords" content={keywords} />}
      {seoAuthor && <meta name="author" content={seoAuthor} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'ar' ? 'ar_AR' : 'fa_IR'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
