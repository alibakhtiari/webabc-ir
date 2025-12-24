"use client";

import React from 'react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import OptimizedImage from '@/components/OptimizedImage';
import { getImageData } from '@/lib/imageUtils';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    description?: string;
    heroImage?: string;
    heroButtons?: React.ReactNode;
    className?: string; // Allow passing className for flexibility
}

const ServiceHero = ({
    title,
    subtitle,
    description,
    heroImage,
    heroButtons,
    className
}: ServiceHeroProps) => {
    return (
        <section className={cn("bg-gradient-to-b from-primary/10 to-white pt-28 pb-16 md:pt-32 md:pb-24", className)}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-6xl mx-auto", !heroImage && "text-center")}>
                    <Breadcrumb />

                    <div className={cn("mt-8", heroImage && "flex flex-col lg:flex-row items-center gap-12")}>
                        {/* Text Content */}
                        <div className={cn(heroImage ? "lg:w-1/2" : "max-w-3xl mx-auto")}>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl font-medium text-primary mb-6 leading-relaxed">
                                {subtitle}
                            </p>
                            {description && (
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {description}
                                </p>
                            )}
                            {heroButtons && (
                                <div className={cn("flex flex-wrap gap-4", !heroImage && "justify-center")}>
                                    {heroButtons}
                                </div>
                            )}
                        </div>

                        {/* Optional Hero Image */}
                        {heroImage && (
                            <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                                <div className="rounded-2xl overflow-hidden shadow-2xl relative min-h-[300px] h-[300px] lg:h-[400px] w-full">
                                    <OptimizedImage
                                        src={heroImage}
                                        imageData={getImageData(heroImage)}
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
    );
};

export default ServiceHero;
