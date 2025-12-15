"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Trash2, Copy, Code, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const FaqGenerator = () => {
    const { t, languageMeta } = useLanguage();
    const [faqs, setFaqs] = useState<FaqItem[]>([
        { id: '1', question: '', answer: '' }
    ]);
    const [generatedSchema, setGeneratedSchema] = useState('');
    const [copied, setCopied] = useState(false);

    const isRtl = languageMeta.direction === 'rtl';

    const addFaq = () => {
        setFaqs([...faqs, { id: Date.now().toString(), question: '', answer: '' }]);
    };

    const removeFaq = (id: string) => {
        if (faqs.length > 1) {
            setFaqs(faqs.filter(faq => faq.id !== id));
        }
    };

    const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
        setFaqs(faqs.map(faq =>
            faq.id === id ? { ...faq, [field]: value } : faq
        ));
    };

    const generateSchema = () => {
        const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

        if (validFaqs.length === 0) {
            toast.error(t('tools.faqGenerator.noQuestions') || "Add at least one question");
            return;
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": validFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        setGeneratedSchema(JSON.stringify(schema, null, 2));
    };

    const copyToClipboard = () => {
        if (!generatedSchema) return;
        navigator.clipboard.writeText(generatedSchema);
        setCopied(true);
        toast.success(t('tools.faqGenerator.copied') || "Copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{t('tools.faqGenerator.title')}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('tools.faqGenerator.description')}
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <Card key={faq.id}>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">
                                                {t('tools.faqGenerator.questionLabel')} #{index + 1}
                                            </label>
                                            <Input
                                                dir={isRtl ? 'rtl' : 'ltr'}
                                                value={faq.question}
                                                onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                                                placeholder={t('tools.faqGenerator.questionLabel')}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">
                                                {t('tools.faqGenerator.answerLabel')} #{index + 1}
                                            </label>
                                            <Textarea
                                                dir={isRtl ? 'rtl' : 'ltr'}
                                                value={faq.answer}
                                                onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                                                placeholder={t('tools.faqGenerator.answerLabel')}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive/90 shrink-0 mt-6"
                                        onClick={() => removeFaq(faq.id)}
                                        disabled={faqs.length === 1}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex gap-4">
                        <Button onClick={addFaq} variant="outline" className="flex-1">
                            <Plus className="h-4 w-4 mr-2" />
                            {t('tools.faqGenerator.addQuestion')}
                        </Button>
                        <Button onClick={generateSchema} className="flex-1">
                            <Code className="h-4 w-4 mr-2" />
                            {t('tools.faqGenerator.generateSchema')}
                        </Button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                {t('tools.faqGenerator.schemaResult')}
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyToClipboard}
                                disabled={!generatedSchema}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 mr-2" />
                                )}
                                {t('tools.faqGenerator.copyJson')}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="relative rounded-md bg-slate-950 p-4 min-h-[400px] font-mono text-sm text-slate-50 overflow-auto">
                                <pre>
                                    {generatedSchema || "// JSON-LD Schema will appear here..."}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FaqGenerator;
