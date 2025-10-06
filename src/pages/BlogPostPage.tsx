
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getBlogPost, BlogPost } from '@/lib/blogUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      setIsLoading(true);
      const blogPost = await getBlogPost(slug, language);
      setPost(blogPost);
      setIsLoading(false);
    };

    loadPost();
  }, [slug, language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">{t('notFound.title')}</h1>
            <p className="text-xl text-muted-foreground mb-8">{t('notFound.message')}</p>
            <Button asChild>
              <Link to={`/${language}/blog`}>{t('common.backToBlog')}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={`${post.title} - ${t('blog.title')}`}
        description={post.description}
        keywords={post.tags.join(', ')}
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Button variant="ghost" asChild>
            <Link to={`/${language}/blog`}>
              {languageMeta.direction === 'rtl' ? (
                <><ArrowRight className="mr-2 h-4 w-4" /> {t('common.backToBlog')}</>
              ) : (
                <><ArrowLeft className="mr-2 h-4 w-4" /> {t('common.backToBlog')}</>
              )}
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} {t('blog.minuteRead')}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

            {/* Share Section */}
            <div className="border-t pt-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{t('blog.shareArticle')}:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
