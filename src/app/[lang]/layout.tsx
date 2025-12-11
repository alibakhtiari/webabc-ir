import { languages, SupportedLanguage } from "@/types/language";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import GlobalSchema from "@/components/GlobalSchema";

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

// Default metadata
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata();

// Removed static metadata - using generateMetadata in page.tsx instead
// This allows each page to have dynamic, localized metadata

import { Vazirmatn, Lato } from "next/font/google";
import { cn } from "@/lib/utils";

// Initialize fonts
const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
    display: "swap",
});

const lato = Lato({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
    variable: "--font-lato",
    display: "swap",
});

import { getDictionary } from "@/i18n/get-dictionary";

// ... existing imports

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const language = languages[supportedLang] || languages.fa;

    // Fetch dictionary for the current language
    const dictionary = await getDictionary(supportedLang);

    return (
        <html lang={supportedLang} dir={language.direction} suppressHydrationWarning>
            <body
                className={cn(
                    // Apply font variables globally
                    vazirmatn.variable,
                    lato.variable,
                    language.fontFamily, // Make sure your language config uses the CSS variable names (e.g., 'font-persian')
                    "antialiased"
                )}
                suppressHydrationWarning
            >
                <LanguageProvider defaultLanguage={supportedLang} dictionary={dictionary}>
                    <GlobalSchema />
                    {children}
                    <Toaster />
                </LanguageProvider>
            </body>
        </html>
    );
}

