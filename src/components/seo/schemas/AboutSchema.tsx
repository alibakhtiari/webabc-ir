import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const AboutSchema = () => {
    const { language } = useLanguage();
    const baseUrl = 'https://webabc.ir'; // Hardcoding base URL for SSR consistency or use a config

    // Organization schema
    const orgSchema = createOrganizationSchema(
        baseUrl,
        `${baseUrl}/images/logo.webp`,
        [
            { telephone: "+1234567890", contactType: "customer service" }
        ],
        language
    );

    return <SchemaMarkup schema={orgSchema} />;
};

export default AboutSchema;
