"use client";

import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SeoServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    color: string;
    iconColor: string;
}

export const SeoServiceCard: React.FC<SeoServiceCardProps> = ({ icon, title, description, features, color, iconColor }) => {
    return (
        <div className={`p-8 rounded-2xl ${color} hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 group`}>
            <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform ${iconColor}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>
            <ul className="space-y-3">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle2 className={`w-4 h-4 mr-2 ${iconColor} opacity-80`} />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ResultsCard = ({ number, text }: { number: string; text: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center border border-gray-100">
        <div className="text-4xl font-bold text-primary mb-2">{number}</div>
        <p className="text-gray-600 font-medium">{text}</p>
    </div>
);

interface CaseStudyCardProps {
    title: string;
    category: string;
    image: string;
    result: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, category, image, result }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
        <div className="relative h-48 overflow-hidden">
            <OptimizedImage
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-primary uppercase tracking-wider">
                {category}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex items-center text-green-600 font-medium mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {result}
            </div>
            <button className="text-gray-500 hover:text-primary text-sm font-medium flex items-center transition-colors">
                Read Case Study <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    </div>
);

interface ProcessCardProps {
    number: string;
    title: string;
    description: string;
    color: string;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ number, title, description, color }) => (
    <div className="relative p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
        <div className={`absolute -top-4 -left-4 w-12 h-12 ${color} text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform rotate-3 group-hover:rotate-6`}>
            {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>
);
