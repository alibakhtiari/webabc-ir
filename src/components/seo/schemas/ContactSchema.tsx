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
            "@id": "https://webabc.ir/#organization"
        },
        "inLanguage": language
    };

    return <SchemaMarkup schema={contactSchema} />;
};

export default ContactSchema;
