"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceHeroButtonsProps {
    primaryText?: string;
    primaryHref?: string;
    secondaryText?: string;
    secondaryHref?: string;
}

const ServiceHeroButtons = ({
    primaryText,
    primaryHref,
    secondaryText,
    secondaryHref
}: ServiceHeroButtonsProps) => {
    const { t, language, languageMeta } = useLanguage();
    const isRTL = languageMeta.direction === 'rtl';
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    return (
        <>
            <Button size="lg" className="px-8 font-bold text-lg h-12 rounded-full" asChild>
                <Link href={primaryHref || `/${language}/contact`}>
                    {primaryText || t('common.freeConsultation')}
                </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 font-bold text-lg h-12 rounded-full hidden sm:inline-flex" asChild>
                <Link href={secondaryHref || `/${language}/portfolio`} className="flex items-center gap-2">
                    {secondaryText || t('common.viewPortfolio')}
                    <ArrowIcon className="w-4 h-4" />
                </Link>
            </Button>
        </>
    );
};

export default ServiceHeroButtons;
