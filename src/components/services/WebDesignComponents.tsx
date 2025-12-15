"use client";

import React from 'react';

// Timeline item component
export const TimelineItem = ({ title, description, index, isLeft }: { title: string, description: string, index: number, isLeft: boolean }) => {
    return (
        <div className="relative flex flex-col lg:flex-row items-start">
            <div className={`lg:w-1/2 ${isLeft ? 'lg:pe-12 lg:text-end' : 'lg:ps-12 lg:order-last'}`}>
                <div className="bg-white p-6 rounded-xl shadow-md animate-fade-up">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
            <div className="absolute start-0 lg:start-1/2 top-0 flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white -translate-x-1/2 rtl:translate-x-1/2 ms-4 lg:ms-0 shadow-md z-10 animate-fade-up">
                {index}
            </div>
            <div className={`lg:w-1/2 ${!isLeft ? 'lg:pe-12 hidden lg:block' : 'lg:ps-12 hidden lg:block'}`}></div>
        </div>
    );
};

// Technology item component
export const TechItem = ({ name, icon }: { name: string, icon: string }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-fade-up">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="font-medium">{name}</div>
        </div>
    );
};
