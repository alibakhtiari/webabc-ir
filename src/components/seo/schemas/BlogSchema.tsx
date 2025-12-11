import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { BlogMetadata } from '@/lib/blogUtils';

interface BlogSchemaProps {
    posts: BlogMetadata[];
}

const BlogSchema: React.FC<BlogSchemaProps> = ({ posts }) => {
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const blogListSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: t('blog.title'),
        description: t('blog.blogDescription'),
        url: `${origin}${pathname}`,
        blogPost: posts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: post.image.startsWith('http') ? post.image : `${origin}${post.image}`,
            datePublished: post.date,
            author: {
                "@type": "Person",
                name: post.author
            },
            url: `${origin}/${language}/blog/${post.slug}`
        }))
    };

    return <SchemaMarkup schema={blogListSchema} />;
};

export default BlogSchema;
