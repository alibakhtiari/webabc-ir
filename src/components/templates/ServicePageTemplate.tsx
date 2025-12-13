"use client";

import React from 'react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import CTASection from '@/components/CTASection';
import OptimizedImage from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';

interface ServicePageProps {
    title: string;
    subtitle: string;
    heroImage?: string; // Optional: If provided, renders split layout
    heroButtons?: React.ReactNode; // Optional: For CTA buttons in hero
    children: React.ReactNode;
    className?: string;
}

export const ServicePageTemplate = ({
    title,
    subtitle,
    heroImage,
    heroButtons,
    children,
    className
}: ServicePageProps) => {
    return (
        <div className={cn("service-page", className)}>
            {/* Dynamic Hero Section */}
            <section className="bg-linear-to-b from-primary/10 to-white pt-28 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-4">
                    <div className={cn("max-w-6xl mx-auto", !heroImage && "text-center")}>
                        <Breadcrumb />

                        <div className={cn("mt-8", heroImage && "flex flex-col lg:flex-row items-center gap-12")}>
                            {/* Text Content */}
                            <div className={cn(heroImage ? "lg:w-1/2" : "max-w-3xl mx-auto")}>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                                    {title}
                                </h1>
                                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                    {subtitle}
                                </p>
                                {heroButtons && (
                                    <div className={cn("flex flex-wrap gap-4", !heroImage && "justify-center")}>
                                        {heroButtons}
                                    </div>
                                )}
                            </div>

                            {/* Optional Hero Image */}
                            {heroImage && (
                                <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                                    <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
                                        <OptimizedImage
                                            src={heroImage}
                                            alt={title}
                                            priority={true}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Unique Page Content */}
            <div className="service-content">
                {children}
            </div>

            {/* Standard CTA for all services */}
            <CTASection />
        </div>
    );
};
