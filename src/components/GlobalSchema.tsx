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

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://webabc.ir/#organization',
        'name': 'WebABC',
        'url': `https://webabc.ir/${language}`,
        'logo': {
            '@type': 'ImageObject',
            'url': 'https://webabc.ir/images/logo.webp',
            'width': 512,
            'height': 512
        },
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+989125811880',
            'contactType': 'customer service',
            'areaServed': ['IR', 'AE', 'OM'],
            'availableLanguage': ['en', 'fa', 'ar']
        },
        'sameAs': [
            'https://twitter.com/webabc',
            'https://instagram.com/webabc',
            'https://linkedin.com/company/webabc',
            'https://facebook.com/webabc'
        ]
    };

    return <SchemaMarkup schema={[localBusinessSchema, websiteSchema, organizationSchema]} />;
};

export default GlobalSchema;
