import WordpressDevelopmentClient from './WordpressDevelopmentClient';
import { Metadata } from 'next';
import { getDictionary } from '@/i18n/get-dictionary';
import { constructMetadata } from '@/lib/metadata';
import { SupportedLanguage } from '@/types/language';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const supportedLang = lang as SupportedLanguage;
    const t = await getDictionary(supportedLang);

    return constructMetadata({
        title: t.webDev?.title,
        description: t.webDev?.subtitle,
        slug: '/services/wordpress-development',
        lang: supportedLang,
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    await params;
    return <WordpressDevelopmentClient />;
}
