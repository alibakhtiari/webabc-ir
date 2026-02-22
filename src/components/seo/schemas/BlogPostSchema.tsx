import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { BlogPost } from '@/lib/blogUtils';

interface BlogPostSchemaProps {
    post: BlogPost;
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({ post }) => {
    const { language } = useLanguage();
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            requestAnimationFrame(() => setOrigin(window.location.origin));
        }
    }, []);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${origin}/${language}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        image: post.image.startsWith('http') ? post.image : `${origin}${post.image}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            "name": post.author,
            "url": `${origin}/about`
        },
        publisher: {
            "@id": "https://webabc.ir/#organization"
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${origin}/${language}/blog/${post.slug}`
        },
        keywords: post.tags.join(', '),
        articleSection: post.category,
        wordCount: post.content.split(/\s+/).length
    };

    const faqSchema = post.faq && post.faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer
            }
        }))
    } : null;

    return <SchemaMarkup schema={faqSchema ? [articleSchema, faqSchema] : articleSchema} />;
};

export default BlogPostSchema;
