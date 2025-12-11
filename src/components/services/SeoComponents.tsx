"use client";

import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import OptimizedImage from '@/components/OptimizedImage';
import { ChartBar, Search, Globe, LinkIcon, PieChart } from 'lucide-react';

// SEO Service Card Component
export const SeoServiceCard = ({ icon, title, description, features, color, iconColor }: {
    icon: React.ReactNode,
    title: string,
    description: string,
    features: string[],
    color: string,
    iconColor: string
}) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'}`}
        >
            <div className={`p-6 ${color}`}>
                <div className={`rounded-full w-12 h-12 flex items-center justify-center ${iconColor} bg-white mb-4`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700">{description}</p>
            </div>
            <div className="p-6">
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Results Card Component
export const ResultsCard = ({ number, text }: { number: string, text: string }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`bg-white rounded-xl shadow-md p-6 text-center ${isIntersecting ? 'animate-scaleIn' : 'opacity-0'}`}
        >
            <div className="text-4xl font-bold text-primary mb-2">{number}</div>
            <div className="text-gray-700">{text}</div>
        </div>
    );
};

// Case Study Card Component
export const CaseStudyCard = ({ title, category, image, result }: { title: string, category: string, image: string, result: string }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'}`}
        >
            <div className="relative">
                <OptimizedImage
                    src={image}
                    alt={title}
                    className="w-full aspect-video object-cover"
                    width={400}
                    height={225}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">{category}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <div className="flex items-center text-green-600">
                    <ChartBar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{result}</span>
                </div>
            </div>
        </div>
    );
};

// Process Card Component
export const ProcessCard = ({ number, title, description, color }: { number: string, title: string, description: string, color: string }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`bg-white rounded-xl shadow-md p-6 relative overflow-hidden ${isIntersecting ? 'animate-fadeInUp' : 'opacity-0'}`}
        >
            <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
            <div className="mb-4">
                <span className={`text-3xl font-bold ${color.replace('bg-', 'text-')}`}>{number}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};
