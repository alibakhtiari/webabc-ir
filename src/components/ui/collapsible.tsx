"use client"

import * as React from "react";
import { cn } from "@/lib/utils";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
    ({ className, children, open: controlledOpen, onOpenChange, defaultOpen = false, ...props }, ref) => {
        const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
        const isControlled = controlledOpen !== undefined;
        const isOpen = isControlled ? controlledOpen : internalOpen;

        const handleOpenChange = (newOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        };

        return (
            <div
                ref={ref}
                className={className}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<any>, {
                            isOpen,
                            handleOpenChange,
                        });
                    }
                    return child;
                })}
            </div>
        );
    }
);
Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen?: boolean;
    handleOpenChange?: (open: boolean) => void;
    asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ className, children, isOpen, handleOpenChange, asChild, ...props }, ref) => {
        const handleClick = () => {
            handleOpenChange?.(!isOpen);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                "data-state": isOpen ? "open" : "closed",
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                className={className}
                onClick={handleClick}
                data-state={isOpen ? "open" : "closed"}
                aria-expanded={isOpen}
                {...props}
            >
                {children}
            </button>
        );
    }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
    ({ className, children, isOpen, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "animate-in slide-in-from-top-2" : "animate-out slide-out-to-top-2 hidden"
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                <div className={className}>{children}</div>
            </div>
        );
    }
);
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
