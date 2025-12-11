import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createServiceSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const WordpressSchema = () => {
    const { t, language } = useLanguage();

    const serviceSchema = createServiceSchema(
        t('wordpress.title'),
        t('wordpress.subtitle'),
        `https://webabc.ir/${language}/wordpress-woocommerce-development`,
        "https://webabc.ir/images/wordpress.webp",
        language
    );

    return <SchemaMarkup schema={serviceSchema} />;
};

export default WordpressSchema;
