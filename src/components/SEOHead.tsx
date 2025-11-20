import React from 'react';

// This component is deprecated in favor of Next.js generateMetadata.
// It is kept to prevent build errors in components that still import it,
// but it renders nothing and should be removed eventually.

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

const SEOHead = (props: SEOHeadProps) => {
  return null;
};

export default SEOHead;
