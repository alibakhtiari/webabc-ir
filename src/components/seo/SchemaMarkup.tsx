"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import { getPathWithoutLanguage, generateLanguageAlternates } from '@/lib/languageUtils';

interface SchemaMarkupProps {
  schema: Record<string, any> | Array<Record<string, any>>;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SchemaMarkup = ({ schema, noIndex = false, noFollow = false }: SchemaMarkupProps) => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const pathWithoutLang = getPathWithoutLanguage(pathname || '');

  // Convert schema to array if it's not already
  const schemas = Array.isArray(schema) ? schema : [schema];

  // Add language attributes to schemas if not already present
  const enhancedSchemas = schemas.map(schemaItem => {
    // Only add inLanguage if it's a type that supports it and doesn't already have it
    const supportsLanguage = [
      'Article', 'BlogPosting', 'WebPage', 'ItemList', 'CollectionPage',
      'Service', 'Product', 'Review', 'Organization', 'Person', 'FAQPage',
      'BreadcrumbList', 'Event', 'Course', 'Recipe', 'JobPosting', 'VideoObject'
    ].includes(schemaItem['@type']);

    return {
      ...schemaItem,
      ...(supportsLanguage && !schemaItem.inLanguage ? {
        inLanguage: language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fa-IR'
      } : {})
    };
  });

  // Note: Helmet is removed. We render script tags directly.
  // Metadata like canonical, alternates, robots should be handled in generateMetadata in page.tsx.
  // Here we only render the JSON-LD scripts.

  return (
    <>
      {/* Add each schema as a separate script */}
      {enhancedSchemas.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItem) }}
        />
      ))}
    </>
  );
};

export default SchemaMarkup;
