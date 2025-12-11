import { Metadata } from 'next';

export function constructMetadata({
    title = 'WebABC - Web Design and Development Services',
    description = 'WebABC offers top-tier web design, development, and SEO services. Transform your digital presence with our expert team.',
    image = '/images/og-image.jpg',
    icons = '/favicon.ico',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
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
        metadataBase: new URL('https://webabc.ir'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
