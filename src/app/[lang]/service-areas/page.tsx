import ServiceAreas from "@/views/ServiceAreas";
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
            title: t['service-areas']?.title || "Service Areas | WebABC",
            description: t['service-areas']?.subtitle || "Areas We Serve",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/service-areas`,
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
