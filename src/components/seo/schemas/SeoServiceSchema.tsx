import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const SeoServiceSchema = () => {
    const { t, language } = useLanguage();
    const [origin, setOrigin] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    // Create service schema for SEO
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('seoService.title'),
        "description": t('seoService.subtitle'),
        "provider": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
            "url": `${origin}/${language}`
        },
        "areaServed": {
            "@type": "Country",
            "name": "Global"
        },
        "serviceType": "Search Engine Optimization"
    };

    return <SchemaMarkup schema={serviceSchema} />;
};

export default SeoServiceSchema;
