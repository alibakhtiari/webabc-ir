"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Dynamically import tool components to reduce initial bundle size
const HeadlineAnalyzer = dynamic(() => import('../components/HeadlineAnalyzer'));
const LoremGenerator = dynamic(() => import('../components/LoremGenerator'));
const MetaGenerator = dynamic(() => import('../components/MetaGenerator'));
const PaaScraper = dynamic(() => import('../components/PAAScraper'));
const ReadabilityChecker = dynamic(() => import('../components/ReadabilityChecker'));
const SerpPreview = dynamic(() => import('../components/SerpPreview'));
const UtmBuilder = dynamic(() => import('../components/UTMBuilder'));

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
        default:
            return notFound();
    }
};

export default ToolRenderer;
