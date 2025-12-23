"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Dynamically import tool components to reduce initial bundle size
// Dynamically import tool components to reduce initial bundle size
const HeadlineAnalyzer = dynamic(() => import('../components/HeadlineAnalyzer'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const LoremGenerator = dynamic(() => import('../components/LoremGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const MetaGenerator = dynamic(() => import('../components/MetaGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const PaaScraper = dynamic(() => import('../components/PAAScraper'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const ReadabilityChecker = dynamic(() => import('../components/ReadabilityChecker'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const SerpPreview = dynamic(() => import('../components/SerpPreview'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const UtmBuilder = dynamic(() => import('../components/UTMBuilder'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const FaqGenerator = dynamic(() => import('../components/FaqGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const CostCalculator = dynamic(() => import('../components/CostCalculator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const PrivacyPolicyGenerator = dynamic(() => import('../components/PrivacyPolicyGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const QrCodeGenerator = dynamic(() => import('../components/QrCodeGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const SocialMediaPreview = dynamic(() => import('../components/SocialMediaPreview'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const GradientGenerator = dynamic(() => import('../components/GradientGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const GlassmorphismGenerator = dynamic(() => import('../components/GlassmorphismGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });
const SlugGenerator = dynamic(() => import('../components/SlugGenerator'), { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" /> });


interface ToolRendererProps {
    tool: string;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({ tool }) => {
    switch (tool) {
        case 'headline-analyzer':
            return <HeadlineAnalyzer />;
        case 'lorem-generator':
            return <LoremGenerator />;
        case 'meta-generator':
            return <MetaGenerator />;
        case 'paa-scraper':
            return <PaaScraper />;
        case 'readability-checker':
            return <ReadabilityChecker />;
        case 'serp-preview':
            return <SerpPreview />;
        case 'utm-builder':
            return <UtmBuilder />;
        case 'faq-generator':
            return <FaqGenerator />;
        case 'cost-calculator':
            return <CostCalculator />;
        case 'privacy-policy-generator':
            return <PrivacyPolicyGenerator />;
        case 'qr-generator':
            return <QrCodeGenerator />;
        case 'social-media-preview':
            return <SocialMediaPreview />;
        case 'css-gradient-generator':
            return <GradientGenerator />;
        case 'glassmorphism-generator':
            return <GlassmorphismGenerator />;
        case 'slug-generator':
            return <SlugGenerator />;

        default:
            return notFound();
    }
};

export default ToolRenderer;
