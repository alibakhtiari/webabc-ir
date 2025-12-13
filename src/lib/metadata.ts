import { Metadata } from 'next';

// Use env variable or fallback
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webabc.ir';

export function constructMetadata({
    title = 'WebABC - Web Design and Development Services',
    description = 'WebABC offers top-tier web design, development, and SEO services. Transform your digital presence with our expert team.',
    image = '/images/og-image.jpg',
    icons = '/favicon.ico',
    noIndex = false,
    metadataBase,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    metadataBase?: URL;
} = {}): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: BASE_URL,
            languages: {
                'en': `${BASE_URL}/en`,
                'fa': `${BASE_URL}/fa`,
                'ar': `${BASE_URL}/ar`,
                'x-default': `${BASE_URL}/en`,
            },
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
            url: BASE_URL,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@webabc_ir',
        },
        icons,
        metadataBase: metadataBase || new URL(BASE_URL),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
