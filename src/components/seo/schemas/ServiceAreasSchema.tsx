import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

interface Location {
    name: string;
    country: string;
}

const ServiceAreasSchema = () => {
    const { t, language } = useLanguage();
    const [origin, setOrigin] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const locations: Location[] = [
        { name: "Dubai", country: "United Arab Emirates" },
        { name: "Istanbul", country: "Turkey" },
        { name: "Toronto", country: "Canada" },
        { name: "London", country: "United Kingdom" },
        { name: "Tehran", country: "Iran" },
        { name: "Muscat", country: "Oman" },
        { name: "Doha", country: "Qatar" },
        { name: "Kuwait City", country: "Kuwait" }
    ];

    const serviceAreaSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: t('service-areas.title'),
        description: t('service-areas.description'),
        provider: {
            "@type": "Organization",
            name: language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث'
        },
        areaServed: locations.map(loc => ({
            "@type": "City",
            name: loc.name,
            containedInPlace: {
                "@type": "Country",
                name: loc.country
            }
        }))
    };

    return <SchemaMarkup schema={serviceAreaSchema} />;
};

export default ServiceAreasSchema;
