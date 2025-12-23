"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocalSeoServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    color: string;
    iconColor: string;
}

export const LocalSeoServiceCard: React.FC<LocalSeoServiceCardProps> = ({ icon, title, description, features, color, iconColor }) => {
    return (
        <div className={`p-8 rounded-2xl ${color} hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 group`}>
            <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${iconColor}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>
            <ul className="space-y-3">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle2 className={`w-4 h-4 me-2 ${iconColor} opacity-80`} />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ProcessCard: React.FC<{ number: string; title: string; description: string; color: string }> = ({ number, title, description, color }) => (
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
