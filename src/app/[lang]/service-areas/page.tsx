import ServiceAreasClient from "./ServiceAreasClient";
import { SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/metadata";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return constructMetadata({
        title: t['service-areas']?.title || "Service Areas | WebABC",
        description: t['service-areas']?.subtitle || "Areas We Serve",
        lang: supportedLang,
        slug: '/service-areas',
    });
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return <ServiceAreasClient />;
}
