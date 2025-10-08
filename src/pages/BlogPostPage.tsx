
import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getBlogPost, BlogPost } from '@/lib/blogUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar, Clock, User, Share2, ArrowLeft, ArrowRight, ChevronDown, List, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTocOpen, setIsTocOpen] = useState(true);

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

  const tableOfContents = useMemo(() => {
    if (!post?.content) return [];
    const headings = post.content.match(/^##\s+(.+)$/gm) || [];
    return headings.map(heading => {
      const text = heading.replace(/^##\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { text, id };
    });
  }, [post?.content]);

  if (isLoading) {
    return (
      <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground text-lg">Loading...</div>
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

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <Card className="mb-8 sticky top-24">
                <Collapsible open={isTocOpen} onOpenChange={setIsTocOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex items-center justify-between p-6">
                      <div className="flex items-center gap-2">
                        <List className="w-5 h-5" />
                        <span className="font-semibold">{t('blog.tableOfContents')}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isTocOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <nav className="px-6 pb-6">
                      <ul className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <li key={index}>
                            <a
                              href={`#${item.id}`}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <Card className="mb-8 bg-primary/5 border-primary/20">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {t('blog.keyTakeaways')}
                  </h2>
                  <ul className="space-y-2">
                    {post.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}

            {/* Post Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return <h2 id={id}>{children}</h2>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <Card className="mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">{t('blog.faq')}</h2>
                  <div className="space-y-4">
                    {post.faq.map((item, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h3 className="font-semibold mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

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
