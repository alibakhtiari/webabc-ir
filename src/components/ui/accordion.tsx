"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
    openItems: string[];
    toggleItem: (value: string) => void;
    type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const AccordionItemContext = React.createContext<string | null>(null);

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean; defaultValue?: string }
>(({ className, children, type = "single", collapsible = false, defaultValue, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(defaultValue ? [defaultValue] : []);

    const toggleItem = (value: string) => {
        setOpenItems((prev) => {
            if (type === "single") {
                return prev.includes(value) ? (collapsible ? [] : prev) : [value];
            } else {
                return prev.includes(value)
                    ? prev.filter((item) => item !== value)
                    : [...prev, value];
            }
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
});
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={value}>
        <div ref={ref} className={cn("border-b", className)} {...props} />
    </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const value = React.useContext(AccordionItemContext);

    if (!context || !value) {
        throw new Error("AccordionTrigger must be used within AccordionItem and Accordion");
    }

    const isOpen = context.openItems.includes(value);

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            onClick={() => context.toggleItem(value)}
            aria-expanded={isOpen}
            data-state={isOpen ? "open" : "closed"}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const value = React.useContext(AccordionItemContext);

    if (!context || !value) {
        throw new Error("AccordionContent must be used within AccordionItem and Accordion");
    }

    const isOpen = context.openItems.includes(value);

    return (
        <div
            className={cn(
                "overflow-hidden text-sm transition-all duration-300",
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            )}
            data-state={isOpen ? "open" : "closed"}
            {...props}
        >
            <div ref={ref} className={cn("pb-4 pt-0", className)}>
                {children}
            </div>
        </div>
    );
});

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
