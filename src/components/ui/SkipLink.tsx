import { cn } from "@/lib/utils";

export const SkipLink = () => (
    <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md transition-all"
    >
        Skip to main content
    </a>
);
