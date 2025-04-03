
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  const { language } = useLanguage();
  
  // Add language attributes to schema if not already present
  const enhancedSchema = {
    ...schema,
    inLanguage: language
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(enhancedSchema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
