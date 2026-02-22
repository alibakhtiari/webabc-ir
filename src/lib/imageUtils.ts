import imageMap from '@/generated/images-map.json';

export function getImageData(src: string) {
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (imageMap as Record<string, any>)[normalizedSrc];
}
