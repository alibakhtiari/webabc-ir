"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const GlobalSchema = () => {
    const { language } = useLanguage();

    const localBusinessSchema = createLocalBusinessSchema(
        `https://webabc.ir/${language}`,
        "https://webabc.ir/images/logo.webp",
        "https://webabc.ir/images/og-image.webp",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        "$$",
        language
    );

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "WebABC",
        "url": "https://webabc.ir",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://webabc.ir/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return <SchemaMarkup schema={[localBusinessSchema, websiteSchema]} />;
};

export default GlobalSchema;
