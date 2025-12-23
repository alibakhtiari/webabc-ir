import LocalSeoClient from './LocalSeoClient';
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
        title: t.localSeo?.localSeoTitle,
        // @ts-ignore
        description: t.localSeo?.localSeoDescription,
        slug: '/services/local-seo',
        lang: supportedLang,
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    await params;
    return <LocalSeoClient />;
}
