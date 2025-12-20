import { languages, SupportedLanguage } from "@/types/language";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import GlobalSchema from "@/components/GlobalSchema";
import Navbar from "@/components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer
import { constructMetadata } from "@/lib/metadata";
import { Vazirmatn, Lato } from "next/font/google";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";

import { Viewport } from 'next';

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

export const viewport: Viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export const metadata = constructMetadata({
    metadataBase: new URL('https://webabc.ir'),
});

// Initialize fonts
const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
    display: "swap",
});

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-lato",
    display: "swap",
});

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
    const dictionary = await getDictionary(supportedLang);

    // ✂️ OPTIMIZATION: Only pass global namespaces to the root context
    const globalDictionary = {
        common: dictionary.common,
        cta: dictionary.cta,
        contact: dictionary.contact, // Needed for Navbar > ConsultationForm
        consultation: dictionary.consultation, // Needed for Navbar > ConsultationForm
        // Footer links use titles from these namespaces
        services: dictionary.services,
        blog: dictionary.blog,
        tools: dictionary.tools,
        // Specific tools used in Footer
        metaGenerator: dictionary.metaGenerator,
        serpPreview: dictionary.serpPreview,
        utmBuilder: dictionary.utmBuilder,
        faqGenerator: dictionary.faqGenerator,
    };

    return (
        <html lang={supportedLang} dir={language.direction} suppressHydrationWarning>
            <body
                className={cn(
                    vazirmatn.variable,
                    lato.variable,
                    language.fontFamily,
                    "antialiased min-h-screen flex flex-col" // Added flex column layout
                )}
                suppressHydrationWarning
            >
                <LanguageProvider defaultLanguage={supportedLang} dictionary={globalDictionary}>
                    <GlobalSchema />

                    {/* Skip Link for Accessibility */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md transition-all"
                    >
                        Skip to main content
                    </a>

                    {/* 1. Navbar is now Global */}
                    <Navbar />

                    {/* 2. Main Content Wrapper */}
                    <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
                        {children}
                    </main>

                    {/* 3. Footer is now Global */}
                    <Footer />

                    <Toaster />
                </LanguageProvider>
            </body>
        </html>
    );
}

