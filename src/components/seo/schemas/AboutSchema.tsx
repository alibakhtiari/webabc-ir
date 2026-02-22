import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const AboutSchema = () => {
    const { language, t } = useLanguage();
    const baseUrl = 'https://webabc.ir'; // Hardcoding base URL for SSR consistency or use a config

    // Organization schema
    const orgSchema = {
        "@id": "https://webabc.ir/#organization"
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": language === 'en' ? 'About Us' : language === 'ar' ? 'من نحن' : 'درباره ما',
        "description": t('about.description'),
        "mainEntity": {
            "@id": "https://webabc.ir/#organization"
        }
    };

    return <SchemaMarkup schema={aboutPageSchema} />;
};

export default AboutSchema;
