import LocationPage from "@/views/LocationPage";
import { SupportedLanguage } from "@/types/language";

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; location: string }>;
}) {
    const { lang } = await params;
    return <LocationPage />;
}
