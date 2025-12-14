import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createServiceSchema, createLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const LocalSeoSchema = () => {
    const { t, language } = useLanguage();

    const serviceSchema = createServiceSchema(
        t('localSeo.localSeoTitle'),
        t('localSeo.localSeoDescription'),
        `https://webabc.ir/${language}/local-seo`,
        "https://webabc.ir/images/local-seo.webp",
        language
    );

    const localBusinessSchema = createLocalBusinessSchema(
        `https://webabc.ir/${language}`,
        "https://webabc.ir/images/logo.webp",
        "https://webabc.ir/images/og-image.webp",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        "$$",
        language
    );

    return <SchemaMarkup schema={[serviceSchema, localBusinessSchema]} />;
};

export default LocalSeoSchema;
