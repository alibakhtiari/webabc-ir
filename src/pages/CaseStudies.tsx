
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import Testimonial from '@/components/Testimonial';

const CaseStudies = () => {
  // Schema markup for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "صفحه اصلی",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "مطالعات موردی",
        "item": "https://yourwebsite.com/case-studies"
      }
    ]
  };

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="مطالعات موردی | وب آ ب ث" 
        description="مطالعات موردی پروژه‌های موفق سئو و طراحی سایت - بررسی چالش‌ها، راه‌حل‌ها و نتایج پروژه‌های انجام شده توسط تیم وب آ ب ث" 
      />
      
      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="text-primary">مطالعات موردی</span> و داستان‌های موفقیت
          </h1>
          <p className="font-persian text-foreground/80 leading-relaxed mb-8">
            در این بخش، داستان‌های موفقیت مشتریان ما را مطالعه کنید. از چالش‌های اولیه تا راه‌حل‌های ما و نتایج قابل اندازه‌گیری.
          </p>
        </div>
        
        {/* Case Study Example */}
        <div className="neo-morphism rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-persian text-sm mb-4">
                مطالعه موردی: فروشگاه آنلاین
              </span>
              
              <h2 className="font-persian text-2xl font-bold mb-4">
                افزایش 200% فروش آنلاین با بهینه‌سازی سئو
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">چالش</h3>
                  <p className="font-persian text-foreground/80">
                    فروشگاه آنلاین لوازم خانگی با وجود محصولات با کیفیت، ترافیک سایت و فروش پایینی داشت. مشکل اصلی عدم بهینه‌سازی صحیح برای موتورهای جستجو و تجربه کاربری ضعیف بود.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">راه‌حل</h3>
                  <p className="font-persian text-foreground/80">
                    تیم ما استراتژی جامعی شامل بهینه‌سازی فنی سایت، بهبود ساختار محتوا، اصلاح معماری اطلاعات و ایجاد صفحات مقصد اختصاصی برای محصولات پرطرفدار طراحی کرد.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-persian text-lg font-semibold mb-2">نتایج</h3>
                  <ul className="list-disc list-inside font-persian text-foreground/80 space-y-1">
                    <li>افزایش 200% در فروش آنلاین طی 6 ماه</li>
                    <li>بهبود 150% در ترافیک ارگانیک از گوگل</li>
                    <li>افزایش 30% در نرخ تبدیل</li>
                    <li>کاهش 25% در نرخ خروج از سایت</li>
                  </ul>
                </div>
              </div>
              
              <Testimonial 
                name="علی محمدی"
                company="مدیرعامل فروشگاه آنلاین خانه برتر"
                image="/images/testimonial-1.jpg"
                quote="همکاری با تیم وب آ ب ث یکی از بهترین تصمیمات کسب و کار ما بود. نتایج بهینه‌سازی سایت ما بسیار فراتر از انتظارات ما بود."
                rating={5}
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-1.jpg" 
                  alt="نمودار افزایش فروش فروشگاه آنلاین پس از بهینه‌سازی سئو توسط وب آ ب ث" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage 
                  src="/images/case-study-1-results.jpg" 
                  alt="نتایج بهبود رتبه کلمات کلیدی فروشگاه آنلاین پس از اجرای سئو توسط وب آ ب ث" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* More case studies would go here */}
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
