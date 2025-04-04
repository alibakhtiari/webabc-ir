
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, generateLanguageAlternates } from '@/lib/languageUtils';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const pathWithoutLang = getPathWithoutLanguage(location.pathname);
  
  // Add language attributes to schema if not already present
  const enhancedSchema = {
    ...schema,
    inLanguage: schema.inLanguage || language
  };

  // Generate language alternate URLs for SEO
  const alternates = generateLanguageAlternates(pathWithoutLang, language);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchema)}
      </script>
      
      {/* Add alternate language links */}
      {alternates.map(alt => (
        <link 
          key={alt.lang} 
          rel="alternate" 
          hrefLang={alt.lang} 
          href={alt.url} 
        />
      ))}
      
      {/* Add x-default for search engines */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${window.location.origin}/en${pathWithoutLang}`} 
      />
      
      {/* Add canonical URL */}
      <link 
        rel="canonical" 
        href={`${window.location.origin}/${language}${pathWithoutLang}`} 
      />
    </Helmet>
  );
};

export default SchemaMarkup;
