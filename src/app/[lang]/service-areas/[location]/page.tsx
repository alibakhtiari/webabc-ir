import LocationPage from "@/views/LocationPage";
import { languages, SupportedLanguage } from "@/types/language";
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

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; location: string }>;
}) {
    const { lang } = await params;
    return <LocationPage />;
}
