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
        "https://webabc.ir/images/hero-image.webp",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        "$$",
        language
    );

    return <SchemaMarkup schema={localBusinessSchema} />;
};

export default GlobalSchema;
