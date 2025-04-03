
import { SupportedLanguage } from '@/contexts/LanguageContext';

export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const createServiceSchema = (
  name: string,
  description: string,
  url: string,
  provider: string = "WebABC",
  image: string = "/og-image.png",
  language: SupportedLanguage = 'en'
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "url": url,
    "image": image,
    "inLanguage": language
  };
};

export const createOrganizationSchema = (
  url: string = "https://webabc.com",
  logo: string = "/images/logo.jpg",
  contactPoint: Array<{telephone: string, contactType: string}> = [],
  language: SupportedLanguage = 'en',
  name?: string
) => {
  // Use appropriate name based on language if not provided
  const orgName = name || (language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث');
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": orgName,
    "url": url,
    "logo": logo,
    "sameAs": [
      "https://www.instagram.com/webabc",
      "https://www.linkedin.com/company/webabc",
      "https://twitter.com/webabc"
    ],
    "contactPoint": contactPoint,
    "inLanguage": language
  };
};

export const createArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "WebABC Team",
  language: SupportedLanguage = 'en',
  publisherName?: string
) => {
  // Use appropriate publisher name based on language if not provided
  const publisher = publisherName || (language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث');
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": publisher,
      "logo": {
        "@type": "ImageObject",
        "url": "/images/logo.jpg"
      }
    },
    "inLanguage": language
  };
};
