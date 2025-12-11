import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { createOrganizationSchema } from '@/lib/schema';

const HomeSchema: React.FC = () => {
    const { language } = useLanguage();
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const organizationSchema = origin ? createOrganizationSchema(
        origin,
        "/images/logo.webp",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        language
    ) : null;

    return organizationSchema ? <SchemaMarkup schema={organizationSchema} /> : null;
};

export default HomeSchema;
