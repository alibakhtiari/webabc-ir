
import React from 'react';
import { cn } from '@/lib/utils';

interface InfoStep {
  number: number;
  title: string;
  description: string;
}

interface InfographicProps {
  title: string;
  steps: InfoStep[];
  className?: string;
}

const Infographic = ({ title, steps, className }: InfographicProps) => {
  return (
    <div className={cn("w-full py-8", className)}>
      <h3 className="font-persian text-2xl font-bold text-center mb-8">{title}</h3>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary/20 -translate-x-1/2 z-0"></div>
        
        <div className="relative z-10 space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col md:flex-row items-center",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-full md:w-5/12",
                index % 2 === 0 ? "md:text-left" : "md:text-right"
              )}>
                <h4 className="font-persian text-xl font-semibold mb-2">{step.title}</h4>
                <p className="font-persian text-foreground/80">{step.description}</p>
              </div>
              
              <div className="flex items-center justify-center my-4 md:w-2/12">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-lg z-10">
                  {step.number}
                </div>
              </div>
              
              <div className="w-full md:w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infographic;
