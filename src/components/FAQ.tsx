"use client";

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { createFAQSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
    description?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title, description }) => {
    const { language, languageMeta } = useLanguage();

    const faqSchema = createFAQSchema(items, language);

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <SchemaMarkup schema={faqSchema} />

                <div className="max-w-3xl mx-auto">
                    {(title || description) && (
                        <div className="text-center mb-10">
                            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                            {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}
                        </div>
                    )}

                    <Accordion type="single" collapsible className="w-full">
                        {items.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className={`text-left ${languageMeta.fontFamily}`}>
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className={`text-gray-600 dark:text-gray-300 ${languageMeta.fontFamily}`}>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
