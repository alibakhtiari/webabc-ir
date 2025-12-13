import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_DIR = path.join(process.cwd(), 'public');

export async function getItem<T>(subdirectory: string, slug: string, language: string): Promise<T | null> {
    try {
        const filePath = path.join(BASE_DIR, subdirectory, language, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        // Merge frontmatter with slug, language, and content
        return {
            ...data,
            slug,
            language,
            content,
        } as T;
    } catch (error) {
        console.error(`Error loading item: ${subdirectory}/${language}/${slug}`, error);
        return null;
    }
}

export async function getAllItems<T>(subdirectory: string, language: string): Promise<T[]> {
    try {
        const langDir = path.join(BASE_DIR, subdirectory, language);

        if (!fs.existsSync(langDir)) {
            return [];
        }

        const files = fs.readdirSync(langDir);
        const items: T[] = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const slug = file.replace('.md', '');
                const item = await getItem<T>(subdirectory, slug, language);
                if (item) {
                    items.push(item);
                }
            }
        }

        return items;
    } catch (error) {
        console.error(`Error loading items for: ${subdirectory}/${language}`, error);
        return [];
    }
}
