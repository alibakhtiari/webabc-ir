import { Metadata } from 'next';
import { getImageData } from '@/lib/imageUtils';
import ReactDOM from 'react-dom';

// Use env variable or fallback
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webabc.ir';

type PreloadOptions = {
    imagePath: string;
    sizes?: string;
};

export function constructMetadata({
    title = 'WebABC - Web Design and Development Services',
    description = 'WebABC offers top-tier web design, development, and SEO services. Transform your digital presence with our expert team.',
    image = '/images/og-image.jpg',
    icons = '/favicon.ico',
    noIndex = false,
    metadataBase,
    preloadHero,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    metadataBase?: URL;
    preloadHero?: string | PreloadOptions;
} = {}): Metadata {
    // General Preload Logic
    if (preloadHero) {
        const path = typeof preloadHero === 'string' ? preloadHero : preloadHero.imagePath;
        const sizes = typeof preloadHero === 'string' ? '(max-width: 768px) 100vw, 50vw' : preloadHero.sizes;

        const imgData = getImageData(path);

        if (imgData) {
            // 1. Prioritize AVIF (Modern Browsers)
            if (imgData.avif && imgData.avif.length > 0) {
                const srcSet = imgData.avif.map((v: any) => `${v.src} ${v.width}w`).join(', ');
                // @ts-ignore - ReactDOM.preload types might be missing in some versions
                ReactDOM.preload(imgData.avif[imgData.avif.length - 1].src, {
                    as: 'image',
                    imageSrcSet: srcSet,
                    imageSizes: sizes,
                    type: 'image/avif',
                    fetchPriority: 'high'
                });
            }
            // 2. Fallback to WebP
            else if (imgData.webp && imgData.webp.length > 0) {
                const srcSet = imgData.webp.map((v: any) => `${v.src} ${v.width}w`).join(', ');
                // @ts-ignore
                ReactDOM.preload(imgData.webp[imgData.webp.length - 1].src, {
                    as: 'image',
                    imageSrcSet: srcSet,
                    imageSizes: sizes,
                    type: 'image/webp',
                    fetchPriority: 'high'
                });
            }
        }
    }
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
