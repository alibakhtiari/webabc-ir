
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getAllBlogPosts, getCategories, filterPostsByCategory, BlogMetadata } from '@/lib/blogUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const BlogPage: React.FC = () => {
  const { t, language, languageMeta } = useLanguage();
  const [posts, setPosts] = useState<BlogMetadata[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogMetadata[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const blogPosts = await getAllBlogPosts(language);
      setPosts(blogPosts);
      setFilteredPosts(blogPosts);
      setCategories(getCategories(blogPosts));
      setIsLoading(false);
    };

    loadPosts();
  }, [language]);

  useEffect(() => {
    setFilteredPosts(filterPostsByCategory(posts, selectedCategory));
  }, [selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div dir={languageMeta.direction} className={languageMeta.fontFamily}>
      <SEOHead 
        title={t('blog.blogTitle')}
        description={t('blog.blogDescription')}
        keywords={t('seo.keywords')}
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('blog.title')}</h1>
              <p className="text-xl text-muted-foreground">{t('blog.blogDescription')}</p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="text-sm font-medium">{t('blog.filterBy')}:</span>
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                {t('blog.allCategories')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">{t('common.noResults')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link key={post.slug} to={`/${language}/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime} {t('blog.minuteRead')}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" className="group-hover:text-primary">
                          {t('blog.readMore')}
                          <ArrowRight className={`${languageMeta.direction === 'rtl' ? 'mr-2' : 'ml-2'} h-4 w-4 group-hover:translate-x-1 transition-transform`} />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
