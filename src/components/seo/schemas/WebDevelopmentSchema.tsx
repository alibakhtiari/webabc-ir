import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createServiceSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const WebDevelopmentSchema = () => {
    const { t, language } = useLanguage();

    // Use a fixed origin or retrieve it safely
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://webabc.ir';

    const serviceSchema = createServiceSchema(
        t('webDevelopmentServices.webDevelopmentTitle'),
        t('webDevelopmentServices.webDevelopmentDescription'),
        `https://webabc.ir/${language}/web-development-services`,
        "https://webabc.ir/images/web-development.webp",
        language
    );

    return <SchemaMarkup schema={serviceSchema} />;
};

export default WebDevelopmentSchema;
