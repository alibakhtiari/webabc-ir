import LinkBuildingClient from './LinkBuildingClient';
import { Metadata } from 'next';
import { getDictionary } from '@/i18n/get-dictionary';
import { constructMetadata } from '@/lib/metadata';
import { SupportedLanguage } from '@/types/language';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return constructMetadata({
        // @ts-ignore
        title: t.linkBuilding?.title,
        // @ts-ignore
        description: t.linkBuilding?.subtitle,
        slug: '/services/link-building',
        lang: supportedLang,
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    await params;
    return <LinkBuildingClient />;
}
