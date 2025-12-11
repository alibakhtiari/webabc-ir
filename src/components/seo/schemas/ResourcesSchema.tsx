import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { createServiceSchema } from '@/lib/schema';

const ResourcesSchema: React.FC = () => {
    const { t, language } = useLanguage();

    const serviceSchema = createServiceSchema(
        t('resources.title'),
        t('resources.subtitle'),
        `https://webabc.ir/${language}/resources`,
        "https://webabc.ir/images/resources.jpg",
        "WebABC",
        "Worldwide",
        language
    );

    return <SchemaMarkup schema={serviceSchema} />;
};

export default ResourcesSchema;
