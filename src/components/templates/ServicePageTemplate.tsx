"use client";

import React from 'react';
import CTASection from '@/components/CTASection';
import { cn } from '@/lib/utils';

interface ServicePageProps {
    children: React.ReactNode;
    className?: string;
    // Slots for flexibility
    hero: React.ReactNode;
    cta?: React.ReactNode; // Optional, allows overriding the default CTA
}

export const ServicePageTemplate = ({
    children,
    className,
    hero,
    cta = <CTASection /> // Default to standard CTA
}: ServicePageProps) => {
    return (
        <div className={cn("service-page", className)}>
            {/* Render the passed Hero component directly */}
            {hero}

            {/* Unique Page Content */}
            <div className="service-content container mx-auto px-4 py-8">
                {children}
            </div>

            {cta}
        </div>
    );
};
