import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { createOrganizationSchema } from '@/lib/schema';

const FAQPageSchema: React.FC = () => {
    const { t, language } = useLanguage();

    // Generate organization schema
    const organizationSchema = createOrganizationSchema(
        "https://webabc.ir",
        "https://webabc.ir/images/logo.webp",
        [{ telephone: "+98123456789", contactType: "customer service" }],
        language
    );

    // FAQ Schema
    const faqItems = [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' },
        { q: 'faq.q4', a: 'faq.a4' },
        { q: 'faq.q5', a: 'faq.a5' },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": t(item.q),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": t(item.a)
            }
        }))
    };

    return <SchemaMarkup schema={[organizationSchema, faqSchema]} />;
};

export default FAQPageSchema;
