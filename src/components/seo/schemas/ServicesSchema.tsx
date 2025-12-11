import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema, createServiceSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const ServicesSchema = () => {
    const { t, language } = useLanguage();
    const [origin, setOrigin] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const orgSchema = createOrganizationSchema(
        origin,
        `${origin}/images/logo.webp`,
        [{ telephone: "+989125811880", contactType: "customer service" }],
        language
    );

    const serviceSchema = createServiceSchema(
        t('services.title'),
        t('services.subtitle'),
        `${origin}/${language}/services`,
        `${origin}/images/services-og.webp`,
        language
    );

    return <SchemaMarkup schema={[orgSchema, serviceSchema]} />;
};

export default ServicesSchema;
