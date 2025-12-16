import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

// CONFIGURATION

// CONFIGURATION
const INPUT_DIR = 'public'; // Root public folder
const SRC_DIR = 'src'; // Source code folder to look for references
const OUTPUT_JSON_PATH = 'src/generated/images-map.json';
const WIDTHS = [640, 768, 1024, 1280, 1536, 1920];
const QUALITY = {
    avif: 60,
    webp: 80
};

async function optimizeImages() {
    console.log('🚀 Starting image optimization & conversion...');

    // Ensure generated directory exists
    const jsonDir = path.dirname(OUTPUT_JSON_PATH);
    try { await fs.access(jsonDir); }
    catch { await fs.mkdir(jsonDir, { recursive: true }); }

    // Find all images (jpg, png, webp) in subdirectories of public
    // We want to avoid modifying files in the root of 'public' (like favicon.ico, etc unless specified)
    // The user said "except root".
    const allFiles = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`);

    // Filter out root files (files directly in 'public/') and existing numbered variations
    const filesToProcess = allFiles.filter(file => {
        const relativePath = path.relative(INPUT_DIR, file);
        const isInSubDir = relativePath.includes(path.sep);
        const isVariation = /-\d+\.(avif|webp|jpg|jpeg|png)$/.test(file);
        return isInSubDir && !isVariation;
    });

    const replacementMap = new Map(); // oldPathString -> newPathString
    const imageMap = {};

    for (const file of filesToProcess) {
        const dir = path.dirname(file);
        const ext = path.extname(file);
        const name = path.basename(file, ext); // filename without ext
        const filename = path.basename(file);

        // Read file and metadata for ALL processed files
        const imageBuffer = await fs.readFile(file);
        const sharpInstance = sharp(imageBuffer);
        const metadata = await sharpInstance.metadata();

        let webpPath = file;
        let relativeNew = '/' + path.relative(INPUT_DIR, file).replace(/\\/g, '/');

        // IF NOT WEBP/AVIF, Convert to WebP
        if (ext !== '.webp' && ext !== '.avif') {
            console.log(`📸 Converting: ${filename} -> WebP`);

            const webpFilename = `${name}.webp`;
            webpPath = path.join(dir, webpFilename);

            // 1. Convert to WebP (Overwrite/Create)
            await sharpInstance
                .clone()
                .webp({
                    quality: QUALITY.webp,
                    effort: 4,
                    smartSubsample: true
                })
                .toFile(webpPath);

            // 2. Map for replacement
            const relativeOld = '/' + path.relative(INPUT_DIR, file).replace(/\\/g, '/');
            relativeNew = '/' + path.relative(INPUT_DIR, webpPath).replace(/\\/g, '/');

            replacementMap.set(relativeOld, relativeNew);

            // 3. Delete original
            await fs.unlink(file);
            console.log(`   🗑️ Deleted original: ${filename}`);
        } else {
            console.log(`ℹ️  Processing existing: ${filename}`);
        }

        // 4. Generate Responsive Sizes (for the NEW webp file)
        // We act as if the loop is now processing the new webp file for the image map
        // (Simplified: We just generate sizes from the sharp instance we already have)

        const variants = {
            avif: [],
            webp: [],
            original: relativeNew
        };

        const base64Placeholder = await sharpInstance.clone().resize(20).blur(10).toBuffer()
            .then(buf => `data:image/webp;base64,${buf.toString('base64')}`);

        await Promise.all(WIDTHS.map(async (width) => {
            if (width > metadata.width) return;

            const suffix = `-${width}`;

            // AVIF
            const avifName = `${name}${suffix}.avif`;
            const avifPath = path.join(dir, avifName);
            await sharpInstance.clone().resize(width).avif({ quality: QUALITY.avif, effort: 4, chromaSubsampling: '4:2:0' }).toFile(avifPath);
            variants.avif.push({ src: '/' + path.relative(INPUT_DIR, avifPath).replace(/\\/g, '/'), width });

            // WebP Sized
            const webpSizedName = `${name}${suffix}.webp`;
            const webpSizedPath = path.join(dir, webpSizedName);
            await sharpInstance.clone().resize(width).webp({ quality: QUALITY.webp, effort: 4, smartSubsample: true }).toFile(webpSizedPath);
            variants.webp.push({ src: '/' + path.relative(INPUT_DIR, webpSizedPath).replace(/\\/g, '/'), width });
        }));

        variants.avif.sort((a, b) => a.width - b.width);
        variants.webp.sort((a, b) => a.width - b.width);

        // Remove leading slash for map key if preferred, or keep it. Previous script had leading slash.
        imageMap[relativeNew] = {
            ...variants,
            placeholder: base64Placeholder,
            width: metadata.width,
            height: metadata.height
        };
    }

    // UPDATE REFERENCES IN CODEBASE
    if (replacementMap.size > 0) {
        console.log('📝 Updating references in source code...');
        const sourceFiles = await glob(`${SRC_DIR}/**/*.{tsx,ts,jsx,js,css,scss,md,json}`);
        const publicFiles = await glob(`${INPUT_DIR}/**/*.md`); // Also update markdown in public if any (like portfolios)

        const allCodeFiles = [...sourceFiles, ...publicFiles];

        for (const filePath of allCodeFiles) {
            let content = await fs.readFile(filePath, 'utf-8');
            let hasChanges = false;

            for (const [oldPath, newPath] of replacementMap.entries()) {
                if (content.includes(oldPath)) {
                    // Global replace
                    content = content.split(oldPath).join(newPath);
                    hasChanges = true;
                }
            }

            if (hasChanges) {
                await fs.writeFile(filePath, content, 'utf-8');
                console.log(`   ✨ Updated references in: ${path.relative(process.cwd(), filePath)}`);
            }
        }
    }

    // Write the map file
    await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(imageMap, null, 2));
    console.log(`✅ Done! Image map saved and code updated.`);
}

optimizeImages().catch(console.error);
