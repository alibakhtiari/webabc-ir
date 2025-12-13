import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

// CONFIGURATION
const INPUT_DIR = 'public/images';
const OUTPUT_JSON_PATH = 'src/generated/images-map.json';
const WIDTHS = [640, 768, 1024, 1280, 1536]; // Standard responsive breakpoints
const QUALITY = 80;

async function optimizeImages() {
    console.log('🚀 Starting image optimization...');

    // Ensure generated directory exists
    const jsonDir = path.dirname(OUTPUT_JSON_PATH);
    try { await fs.access(jsonDir); }
    catch { await fs.mkdir(jsonDir, { recursive: true }); }

    // Find all images (jpg, png, webp)
    const files = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`, { ignore: '**/*-opt-*' });
    const imageMap = {};

    for (const file of files) {
        const filename = path.basename(file);
        const dir = path.dirname(file);
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        // Skip already optimized files if re-running
        if (name.endsWith('-opt')) continue;

        console.log(`📸 Processing: ${filename}`);

        const imageBuffer = await fs.readFile(file);
        const sharpInstance = sharp(imageBuffer);
        const metadata = await sharpInstance.metadata();

        // 1. Generate Low Quality Image Placeholder (LQIP) - Base64
        const placeholderBuffer = await sharpInstance
            .resize(20) // Tiny size
            .blur(10)   // High blur
            .toBuffer();
        const base64Placeholder = `data:image/${metadata.format};base64,${placeholderBuffer.toString('base64')}`;

        // 2. Generate Responsive Sizes
        const variants = {
            avif: [],
            webp: [],
            original: `/${path.relative('public', file).replace(/\\/g, '/')}`
        };

        // Parallel processing for all sizes and formats
        await Promise.all(WIDTHS.map(async (width) => {
            if (width > metadata.width) return; // Don't upscale

            const suffix = `-opt-${width}`;

            // AVIF
            const avifName = `${name}${suffix}.avif`;
            const avifPath = path.join(dir, avifName);
            await sharpInstance.clone().resize(width).avif({ quality: QUALITY }).toFile(avifPath);
            variants.avif.push({
                src: `/${path.relative('public', avifPath).replace(/\\/g, '/')}`,
                width
            });

            // WebP
            const webpName = `${name}${suffix}.webp`;
            const webpPath = path.join(dir, webpName);
            await sharpInstance.clone().resize(width).webp({ quality: QUALITY }).toFile(webpPath);
            variants.webp.push({
                src: `/${path.relative('public', webpPath).replace(/\\/g, '/')}`,
                width
            });
        }));

        // Sort variants by width for correct srcSet generation
        variants.avif.sort((a, b) => a.width - b.width);
        variants.webp.sort((a, b) => a.width - b.width);

        // Save to map using the relative path as key
        const relativeKey = path.relative('public', file).replace(/\\/g, '/');
        imageMap[`/${relativeKey}`] = {
            ...variants,
            placeholder: base64Placeholder,
            width: metadata.width,
            height: metadata.height
        };
    }

    // Write the map file
    await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(imageMap, null, 2));
    console.log(`✅ Done! Image map saved to ${OUTPUT_JSON_PATH}`);
}

optimizeImages().catch(console.error);
