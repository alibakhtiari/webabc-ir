import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

// CONFIGURATION
const INPUT_DIR = 'public/images';
const OUTPUT_JSON_PATH = 'src/generated/images-map.json';
const WIDTHS = [640, 768, 1024, 1280, 1536, 1920];
const QUALITY = {
    avif: 60,
    webp: 80
};


async function optimizeImages() {
    console.log('🚀 Starting image optimization...');

    // Ensure generated directory exists
    const jsonDir = path.dirname(OUTPUT_JSON_PATH);
    try { await fs.access(jsonDir); }
    catch { await fs.mkdir(jsonDir, { recursive: true }); }

    // Find all images (jpg, png, webp)
    const files = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`, { ignore: ['**/*-[0-9]*', '**/og-image.webp'] });


    const imageMap = {};

    for (const file of files) {
        const filename = path.basename(file);
        const dir = path.dirname(file);
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        // Skip already optimized files (ending in hyphen + numbers)
        if (/-\d+$/.test(name)) continue;


        console.log(`📸 Processing: ${filename}`);

        const imageBuffer = await fs.readFile(file);
        const sharpInstance = sharp(imageBuffer);
        const metadata = await sharpInstance.metadata();

        // 1. Generate Low Quality Image Placeholder (LQIP) - Base64
        const placeholderBuffer = await sharpInstance
            .clone() // Clone before mutating for placeholder
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

            const suffix = `-${width}`;


            // AVIF (High compression, slower generation)
            const avifName = `${name}${suffix}.avif`;
            const avifPath = path.join(dir, avifName);
            await sharpInstance
                .clone()
                .resize(width)
                .avif({
                    quality: QUALITY.avif,
                    effort: 4, // 0-9 (higher = smaller file, slower build)
                    chromaSubsampling: '4:2:0' // Standard for web images
                })
                .toFile(avifPath);
            variants.avif.push({
                src: `/${path.relative('public', avifPath).replace(/\\/g, '/')}`,
                width
            });

            // WebP (Faster generation, widely supported)
            const webpName = `${name}${suffix}.webp`;
            const webpPath = path.join(dir, webpName);
            await sharpInstance
                .clone()
                .resize(width)
                .webp({
                    quality: QUALITY.webp,
                    effort: 4, // 0-6 (higher = smaller file)
                    smartSubsample: true
                })
                .toFile(webpPath);
            variants.webp.push({
                src: `/${path.relative('public', webpPath).replace(/\\/g, '/')}`,
                width
            });
        }));

        // 3. OPTIMIZE ORIGINAL (Overwrite source file)
        // We already have the 'imageBuffer' in memory, so we can safely overwrite the file.

        // Define optimization settings for originals
        const originalQuality = 80;

        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
            await sharpInstance
                .clone()
                .jpeg({
                    quality: originalQuality,
                    mozjpeg: true, // Uses advanced Mozilla compression (slower but better)
                    progressive: true // Better loading experience
                })
                .toFile(file); // ⚠️ Overwrites the original

            console.log(`   📉 Optimized original JPEG: ${filename}`);
        }
        else if (metadata.format === 'png') {
            await sharpInstance
                .clone()
                .png({
                    quality: originalQuality,
                    compressionLevel: 9, // Max compression
                    palette: true, // Use indexed colors (huge saving for simple PNGs)
                    effort: 10     // Max CPU effort
                })
                .toFile(file); // ⚠️ Overwrites the original

            console.log(`   📉 Optimized original PNG: ${filename}`);
        }

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
