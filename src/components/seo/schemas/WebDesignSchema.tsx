import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const WebDesignSchema = () => {
    const { t, language } = useLanguage();
    const [origin, setOrigin] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('webDesign.title'),
        "description": t('webDesign.description'),
        "provider": {
            "@type": "Organization",
            "name": language === 'en' ? 'WebABC' : language === 'ar' ? 'ويب إيه بي سي' : 'وب آ ب ث',
            "url": `${origin}/${language}`
        },
        "areaServed": {
            "@type": "Country",
            "name": "Global"
        },
        "serviceType": "Web Design and Development"
    };

    return <SchemaMarkup schema={serviceSchema} />;
};

export default WebDesignSchema;
