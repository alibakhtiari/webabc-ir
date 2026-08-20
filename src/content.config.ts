import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().or(z.date()),
    updatedDate: z.string().or(z.date()).optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    image: z.string(),
    readTime: z.number().optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/portfolio',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    client: z.string(),
    technologies: z.array(z.string()),
    projectUrl: z.string(),
    results: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
  }),
});

export const collections = { blog, portfolio };
