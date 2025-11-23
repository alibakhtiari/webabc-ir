import { languages, SupportedLanguage } from "@/types/language";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import GlobalSchema from "@/components/GlobalSchema";

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

// Removed static metadata - using generateMetadata in page.tsx instead
// This allows each page to have dynamic, localized metadata

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

    return (
        <html lang={supportedLang} dir={language.direction} suppressHydrationWarning>
            <body className={language.fontFamily} suppressHydrationWarning>
                <LanguageProvider defaultLanguage={supportedLang}>
                    <GlobalSchema />
                    {children}
                    <Toaster />
                </LanguageProvider>
            </body>
        </html>
    );
}
