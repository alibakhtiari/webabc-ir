import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

interface LocationData {
    name: string;
    country: string;
    longDescription: string;
}

interface LocationSchemaProps {
    location: LocationData;
}

const LocationSchema: React.FC<LocationSchemaProps> = ({ location }) => {
    const { t } = useLanguage();
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const locationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${t('common.companyName')} - ${location.name}`,
        description: location.longDescription,
        address: {
            "@type": "PostalAddress",
            addressLocality: location.name,
            addressCountry: location.country
        },
        areaServed: {
            "@type": "City",
            name: location.name,
            containedInPlace: {
                "@type": "Country",
                name: location.country
            }
        },
        provider: {
            "@type": "Organization",
            name: t('common.companyName'),
            url: origin
        }
    };

    return <SchemaMarkup schema={locationSchema} />;
};

export default LocationSchema;
