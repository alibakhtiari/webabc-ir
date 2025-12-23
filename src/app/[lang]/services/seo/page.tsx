import SeoClient from './SeoClient';
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
        title: t.seoService?.title,
        // @ts-ignore
        description: t.seoService?.subtitle,
        slug: '/services/seo',
        lang: supportedLang,
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    await params;
    return <SeoClient />;
}
