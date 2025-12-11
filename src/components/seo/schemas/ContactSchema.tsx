import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

const ContactSchema = () => {
    const { language, t } = useLanguage();

    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": t('common.contact'),
        "description": language === 'en' ? "Contact WebABC team and get a free consultation" : language === 'ar' ? "اتصل بفريق ويب أ ب ج واحصل على استشارة مجانية" : "برای ارتباط با تیم وب آ ب ث و دریافت مشاوره رایگان، با ما تماس بگیرید",
        "mainEntity": {
            "@type": "Organization",
            "name": "WebABC",
            "email": "info@webabc.ir",
            "telephone": language === 'en' ? "+989125811880" : "09125811880",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": language === 'en' ? "123 Azadi St, Keshavarz Blvd" : language === 'ar' ? "شارع آزادي، بوليفارد كشاورز، المبنى ١٢٣" : "خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳",
                "addressLocality": language === 'en' ? "Tehran" : language === 'ar' ? "طهران" : "تهران",
                "addressRegion": language === 'en' ? "Tehran" : language === 'ar' ? "طهران" : "تهران",
                "postalCode": "123456",
                "addressCountry": "IR"
            }
        },
        "inLanguage": language
    };

    return <SchemaMarkup schema={contactSchema} />;
};

export default ContactSchema;
