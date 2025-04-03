
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SchemaMarkup from '@/components/SchemaMarkup';
import { createBreadcrumbSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

interface PortfolioItemProps {
  portfolioItems: {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    fullDescription?: string;
    client?: string;
    projectUrl?: string;
    technologies?: string[];
    results?: { label: string; value: string }[];
  }[];
}

const PortfolioItemPage: React.FC<PortfolioItemProps> = ({ portfolioItems }) => {
  const { id } = useParams<{ id: string }>();
  
  const item = portfolioItems.find(item => item.id === id);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">نمونه کار یافت نشد</h1>
          <p className="mb-6">متأسفانه نمونه کار مورد نظر یافت نشد.</p>
          <Button asChild>
            <Link to="/portfolio">بازگشت به نمونه کارها</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Schema markup for portfolio item
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "صفحه اصلی", url: "https://webabc.com" },
    { name: "نمونه کارها", url: "https://webabc.com/portfolio" },
    { name: item.title, url: `https://webabc.com/portfolio/${item.id}` }
  ]);
  
  const portfolioItemSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": item.title,
    "description": item.description,
    "image": item.image,
    "creator": {
      "@type": "Organization",
      "name": "WebABC"
    }
  };

  return (
    <div dir="rtl" className="font-persian min-h-screen flex flex-col">
      <SEOHead 
        title={`${item.title} | نمونه کارهای وب آ ب ث`}
        description={item.description}
        keywords={`${item.title}, ${item.category}, نمونه کار طراحی سایت, نمونه کار سئو, وب آ ب ث`}
      />
      
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={portfolioItemSchema} />
      
      <Navbar />
      
      <main className="flex-1 mt-24 mb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-primary">خانه</Link>
            <span className="mx-2">/</span>
            <Link to="/portfolio" className="text-gray-500 hover:text-primary">نمونه کارها</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{item.title}</span>
          </div>
          
          {/* Project Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h1>
            <div className="flex items-center">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {item.category}
              </span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <LazyImage 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-3">توضیحات پروژه</h2>
                <p className="text-gray-700 leading-relaxed">
                  {item.fullDescription || item.description}
                </p>
              </div>
              
              {item.client && (
                <div>
                  <h2 className="text-xl font-bold mb-3">کارفرما</h2>
                  <p className="text-gray-700">{item.client}</p>
                </div>
              )}
              
              {item.technologies && (
                <div>
                  <h2 className="text-xl font-bold mb-3">تکنولوژی‌های استفاده شده</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {item.results && (
                <div>
                  <h2 className="text-xl font-bold mb-3">نتایج</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {item.results.map((result, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-sm">{result.label}</span>
                        <span className="block text-xl font-bold text-primary">{result.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link to="/portfolio">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    بازگشت به نمونه کارها
                  </Link>
                </Button>
                
                {item.projectUrl && (
                  <Button asChild>
                    <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                      مشاهده وب‌سایت
                      <ExternalLink className="mr-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioItemPage;
