import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const PortfolioSchema = () => {
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

    return <SchemaMarkup schema={orgSchema} />;
};

export default PortfolioSchema;
