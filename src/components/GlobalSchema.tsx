"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const GlobalSchema = () => {
    const { language } = useLanguage();
    const origin = "https://webabc.ir";

    const localBusinessSchema = createLocalBusinessSchema(
        `${origin}/${language}`,
        `${origin}/images/logo.webp`,
        `${origin}/images/og-image.webp`,
        [{ telephone: "+989125811880", contactType: "customer service" }],
        "$$",
        language
    );

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        "name": "WebABC",
        "url": origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${origin}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        'name': 'WebABC',
        'url': `${origin}/${language}`,
        'logo': {
            '@type': 'ImageObject',
            'url': `${origin}/images/logo.webp`,
            'width': 512,
            'height': 512
        },
        'image': `${origin}/images/logo.webp`,
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
