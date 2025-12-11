import WordpressWoocommerceDevelopment from "@/views/WordpressWoocommerceDevelopment";
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
            title: t.wordpress?.title || "WordPress & WooCommerce Development | WebABC",
            description: t.wordpress?.subtitle || "Expert WordPress Solutions",
        }),
        alternates: {
            canonical: `https://webabc.ir/${supportedLang}/wordpress-woocommerce-development`,
            languages: {
                'en': '/en/wordpress-woocommerce-development',
                'fa': '/fa/wordpress-woocommerce-development',
                'ar': '/ar/wordpress-woocommerce-development',
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
    return <WordpressWoocommerceDevelopment />;
}
