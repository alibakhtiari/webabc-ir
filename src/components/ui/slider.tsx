"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
    value?: number[];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number[]) => void;
    className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
    ({ className, value = [0], min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
        const currentValue = value[0] ?? 0;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onValueChange?.([parseFloat(e.target.value)]);
        };

        const percentage = ((currentValue - min) / (max - min)) * 100;

        return (
            <div
                ref={ref}
                className={cn("relative flex w-full touch-none select-none items-center", className)}
                {...props}
            >
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <div
                        className="absolute h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={currentValue}
                    onChange={handleChange}
                    className="absolute h-full w-full opacity-0 cursor-pointer"
                />
                <div
                    className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 pointer-events-none"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />
            </div>
        );
    }
);
Slider.displayName = "Slider";

export { Slider };
