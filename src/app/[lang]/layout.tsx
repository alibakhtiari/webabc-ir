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
                <LanguageProvider defaultLanguage={supportedLang} dictionary={dictionary}>
                    <GlobalSchema />

                    {/* 1. Navbar is now Global */}
                    <Navbar />

                    {/* 2. Main Content Wrapper */}
                    <main className="flex-1 w-full pt-20">
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

