import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src/generated/content.json');

function getContent(subdirectory) {
    const dir = path.join(PUBLIC_DIR, subdirectory);
    const result = {};

    if (!fs.existsSync(dir)) return result;

    const languages = fs.readdirSync(dir);
    for (const lang of languages) {
        const langDir = path.join(dir, lang);
        if (fs.statSync(langDir).isDirectory()) {
            result[lang] = [];
            const files = fs.readdirSync(langDir);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    const filePath = path.join(langDir, file);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const { data, content } = matter(fileContent);
                    result[lang].push({
                        ...data,
                        slug: file.replace('.md', ''),
                        language: lang,
                        content
                    });
                }
            }
        }
    }
    return result;
}

const contentMap = {
    portfolio: getContent('portfolio'),
    blog: getContent('blog')
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(contentMap, null, 2));
console.log(`Generated content map at ${OUTPUT_FILE}`);
