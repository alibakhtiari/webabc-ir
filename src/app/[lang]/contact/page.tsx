import Contact from "@/views/Contact";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return {
        ...constructMetadata({
            title: t.contact?.title || "Contact Us | WebABC",
            description: t.contact?.subtitle || "Get in Touch with Our Team",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/contact`,
            languages: {
                'en': '/en/contact',
                'fa': '/fa/contact',
                'ar': '/ar/contact',
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return <Contact />;
}
