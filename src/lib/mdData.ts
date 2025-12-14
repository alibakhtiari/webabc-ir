import contentData from '@/generated/content.json';

// Type definition for the content structure
type ContentMap = {
    [key: string]: {
        [lang: string]: any[]
    }
};

const typedContentData = contentData as ContentMap;

export async function getItem<T>(subdirectory: string, slug: string, language: string): Promise<T | null> {
    try {
        const categoryData = typedContentData[subdirectory];
        if (!categoryData) return null;

        const langItems = categoryData[language];
        if (!langItems) return null;

        const item = langItems.find((i: any) => i.slug === slug);
        return item as T || null;
    } catch (error) {
        console.error(`Error loading item: ${subdirectory}/${language}/${slug}`, error);
        return null;
    }
}

export async function getAllItems<T>(subdirectory: string, language: string): Promise<T[]> {
    try {
        const categoryData = typedContentData[subdirectory];
        if (!categoryData) {
            console.warn(`[mdData] No data found for category: ${subdirectory}`);
            return [];
        }

        const langItems = categoryData[language];
        if (!langItems) {
            console.warn(`[mdData] No data found for language: ${language} in ${subdirectory}`);
            return [];
        }

        return langItems as T[];
    } catch (error) {
        console.error(`Error loading items for: ${subdirectory}/${language}`, error);
        return [];
    }
}

