import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PortfolioItem } from '@/types/portfolio';

export type { PortfolioItem };

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');

export async function getPortfolioItem(slug: string, language: string): Promise<PortfolioItem | null> {
    try {
        const filePath = path.join(PORTFOLIO_DIR, language, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            language,
            title: data.title,
            description: data.description,
            category: data.category,
            image: data.image,
            client: data.client,
            projectUrl: data.projectUrl,
            technologies: data.technologies || [],
            results: data.results || [],
            content: content,
        };
    } catch (error) {
        console.error(`Error loading portfolio item: ${slug} (${language})`, error);
        return null;
    }
}

export async function getAllPortfolioItems(language: string): Promise<PortfolioItem[]> {
    try {
        const langDir = path.join(PORTFOLIO_DIR, language);

        if (!fs.existsSync(langDir)) {
            return [];
        }

        const files = fs.readdirSync(langDir);
        const items: PortfolioItem[] = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const slug = file.replace('.md', '');
                const item = await getPortfolioItem(slug, language);
                if (item) {
                    items.push(item);
                }
            }
        }

        return items;
    } catch (error) {
        console.error(`Error loading portfolio items for language: ${language}`, error);
        return [];
    }
}
