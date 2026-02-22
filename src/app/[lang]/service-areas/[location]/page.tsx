import LocationClient from "./LocationClient";
import { languages, SupportedLanguage } from "@/types/language";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import enServiceAreas from '@/i18n/en/service-areas.json';
import faServiceAreas from '@/i18n/fa/service-areas.json';
import arServiceAreas from '@/i18n/ar/service-areas.json';

// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const params = [];

    for (const lang of Object.keys(languages)) {
        let serviceAreas;
        switch (lang) {
            case 'fa':
                serviceAreas = faServiceAreas;
                break;
            case 'ar':
                serviceAreas = arServiceAreas;
                break;
            default:
                serviceAreas = enServiceAreas;
        }

        for (const location of serviceAreas.locations) {
            params.push({
                lang: lang,
                location: location.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; location: string }> }): Promise<Metadata> {
    const { lang, location } = await params;

    let serviceAreas;
    switch (lang) {
        case 'fa':
            serviceAreas = faServiceAreas;
            break;
        case 'ar':
            serviceAreas = arServiceAreas;
            break;
        default:
            serviceAreas = enServiceAreas;
    }

    const locationData = serviceAreas.locations.find((l: { slug: string; name: string }) => l.slug === location);

    if (!locationData) {
        return {
            title: "Location Not Found | WebABC",
        };
    }

    let title, description;
    switch (lang) {
        case 'fa':
            title = `خدمات طراحی سایت و سئو در ${locationData.name} | آژانس وب‌ اِی‌بی‌سی`;
            description = `خدمات تخصصی طراحی سایت، سئو و دیجیتال مارکتینگ در ${locationData.name} توسط تیم وب‌ اِی‌بی‌سی.`;
            break;
        case 'ar':
            title = `خدمات تصميم المواقع والسيو في ${locationData.name} | وكالة WebABC`;
            description = `خدمات احترافية في تصميم المواقع وتحسين محركات البحث في ${locationData.name} من قبل فريق WebABC.`;
            break;
        default:
            title = `Web Design & SEO Services in ${locationData.name} | WebABC Agency`;
            description = `Professional Web Design and SEO services in ${locationData.name} by WebABC team. Comprehensive digital growth solutions.`;
    }

    return constructMetadata({
        title,
        description,
        lang: lang,
        slug: `/service-areas/${location}`,
    });
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; location: string }>;
}) {
    const { lang } = await params;
    return <LocationClient />;
}
