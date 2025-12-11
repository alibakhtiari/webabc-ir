import { Metadata } from 'next';

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
            canonical: 'https://webabc.ir',
            languages: {
                'en': 'https://webabc.ir/en',
                'fa': 'https://webabc.ir/fa',
                'ar': 'https://webabc.ir/ar',
                'x-default': 'https://webabc.ir/en',
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
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@webabc_ir',
        },
        icons,
        metadataBase: metadataBase || new URL('https://webabc.ir'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
