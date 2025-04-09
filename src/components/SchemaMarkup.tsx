
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { getPathWithoutLanguage, generateLanguageAlternates } from '@/lib/languageUtils';

interface SchemaMarkupProps {
  schema: Record<string, any> | Array<Record<string, any>>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const pathWithoutLang = getPathWithoutLanguage(location.pathname);
  
  // Convert schema to array if it's not already
  const schemas = Array.isArray(schema) ? schema : [schema];
  
  // Add language attributes to schemas if not already present
  const enhancedSchemas = schemas.map(schemaItem => {
    // Only add inLanguage if it's a type that supports it
    const supportsLanguage = [
      'Article', 'BlogPosting', 'WebPage', 'ItemList', 'CollectionPage', 
      'Service', 'Product', 'Review', 'Organization', 'Person', 'BreadcrumbList'
    ].includes(schemaItem['@type']);
    
    return {
      ...schemaItem,
      ...(supportsLanguage && !schemaItem.inLanguage ? { inLanguage: language } : {})
    };
  });

  // Generate language alternate URLs for SEO
  const alternates = generateLanguageAlternates(pathWithoutLang, language);

  return (
    <Helmet>
      {/* Add each schema as a separate script */}
      {enhancedSchemas.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
      
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
