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

    const locationData = serviceAreas.locations.find((l: any) => l.slug === location);

    if (!locationData) {
        return {
            title: "Location Not Found | WebABC",
        };
    }

    return {
        ...constructMetadata({
            title: `${locationData.name} | WebABC`,
            description: `Web Design and SEO Services in ${locationData.name}`,
        }),
        alternates: {
            canonical: `https://webabc.ir/${lang}/service-areas/${location}`,
            languages: {
                'en': `/en/service-areas/${location}`,
                'fa': `/fa/service-areas/${location}`,
                'ar': `/ar/service-areas/${location}`,
            },
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; location: string }>;
}) {
    const { lang } = await params;
    return <LocationClient />;
}
