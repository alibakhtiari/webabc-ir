import { languages, SupportedLanguage } from "@/types/language";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export async function generateStaticParams() {
    return Object.keys(languages).map((lang) => ({ lang }));
}

export const metadata: Metadata = {
    title: "WebABC",
    description: "Web Design and Development Services",
};

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
        <html lang={supportedLang} dir={language.direction}>
            <body className={language.fontFamily}>
                <LanguageProvider defaultLanguage={supportedLang}>
                    {children}
                    <Toaster />
                </LanguageProvider>
            </body>
        </html>
    );
}
