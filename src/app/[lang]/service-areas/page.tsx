import ServiceAreas from "@/views/ServiceAreas";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { translations } from "@/i18n";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = translations[supportedLang] || translations.fa;

    return {
        title: t.serviceAreas?.title || "Service Areas | WebABC",
        description: t.serviceAreas?.subtitle || "Areas We Serve",
        alternates: {
            languages: {
                'en': '/en/service-areas',
                'fa': '/fa/service-areas',
                'ar': '/ar/service-areas',
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
    return <ServiceAreas />;
}
