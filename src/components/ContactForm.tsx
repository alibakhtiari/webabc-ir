"use client";

import React, { lazy, Suspense, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Fallback components (moved here or imported)
const ButtonSkeleton = () => (
    <div className="w-full h-10 bg-primary/30 rounded animate-pulse"></div>
);

const InputSkeleton = () => (
    <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>
);

const TextareaSkeleton = () => (
    <div className="w-full h-32 bg-gray-100 rounded animate-pulse"></div>
);

interface ContactFormProps {
    onSuccess?: () => void;
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className }) => {
    const { t, languageMeta } = useLanguage();
    const [isPending, setIsPending] = useState(false);
    const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setResponseMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const apiUrl = '/api/contact';

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                setResponseMessage({ type: 'success', text: result.message || t('contact.messageSent') || 'Message sent successfully!' });
                (e.target as HTMLFormElement).reset();
                if (onSuccess) onSuccess();
            } else {
                setResponseMessage({ type: 'error', text: result.error || 'Failed to send message.' });
            }
        } catch (error) {
            setResponseMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsPending(false);
        }
    };

    const textDirection = languageMeta.direction === 'rtl' ? 'text-right' : 'text-left';
    const inputDirection = languageMeta.direction === 'rtl' ? 'text-right' : '';

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className || ''}`}>
            <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.fullName')}</label>
                <Suspense fallback={<InputSkeleton />}>
                    <Input
                        name="name"
                        className={inputDirection}
                        placeholder={t('consultation.fullName')}
                        required
                    />
                </Suspense>
            </div>

            <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.email')}</label>
                <Suspense fallback={<InputSkeleton />}>
                    <Input
                        name="email"
                        type="email"
                        className={inputDirection}
                        placeholder="example@domain.com"
                        required
                    />
                </Suspense>
            </div>

            <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${textDirection}`}>{t('consultation.message')}</label>
                <Suspense fallback={<TextareaSkeleton />}>
                    <Textarea
                        name="message"
                        rows={5}
                        className={inputDirection}
                        placeholder={t('contact.yourMessage')}
                        required
                    />
                </Suspense>
            </div>

            <Suspense fallback={<ButtonSkeleton />}>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-70"
                >
                    {isPending ? t('common.loading') || 'Sending...' : t('contact.submitMessage')}
                </Button>
            </Suspense>

            {responseMessage && (
                <p className={`text-center text-sm ${responseMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {responseMessage.text}
                </p>
            )}
        </form>
    );
};

export default ContactForm;
