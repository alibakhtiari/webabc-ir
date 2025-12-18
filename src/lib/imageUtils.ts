import imageMap from '@/generated/images-map.json';

export function getImageData(src: string) {
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    return (imageMap as Record<string, any>)[normalizedSrc];
}
