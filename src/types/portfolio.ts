export interface PortfolioItem {
    slug: string;
    title: string;
    description: string;
    content: string; // Markdown content
    category: string;
    image: string;
    client: string;
    projectUrl: string;
    technologies: string[];
    results: { label: string; value: string }[];
    language: string;
}
