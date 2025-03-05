
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, Server, BarChart, Zap, Database, Shield, Code, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SeoTechnical = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Technical SEO Services
  const technicalSeoServices = [
    {
      title: 'بهینه‌سازی سرعت وب‌سایت',
      description: 'افزایش سرعت بارگذاری صفحات وب‌سایت شما برای بهبود تجربه کاربری و رتبه در موتورهای جستجو',
      features: [
        'بهینه‌سازی و فشرده‌سازی تصاویر و فایل‌های CSS و JavaScript',
        'پیاده‌سازی فناوری‌های کش (Cache) و CDN',
        'بهینه‌سازی Core Web Vitals و معیارهای Lighthouse',
        'کاهش زمان پاسخگویی سرور (TTFB)',
        'حذف کدهای اضافی و بلاک‌کننده رندر',
        'بهینه‌سازی ساختار DOM'
      ],
      icon: <Zap className="h-10 w-10 text-primary" />
    },
    {
      title: 'ساختار لینک‌های داخلی',
      description: 'بهبود معماری اطلاعات و ساختار لینک‌های داخلی برای هدایت بهتر ربات‌های خزنده و کاربران',
      features: [
        'تحلیل و بهینه‌سازی ساختار فعلی لینک‌های داخلی',
        'ایجاد سلسله مراتب منطقی در محتوا (Siloing)',
        'برطرف کردن لینک‌های شکسته و ریدایرکت‌های نادرست',
        'بهینه‌سازی متن لنگر (Anchor Text) لینک‌های داخلی',
        'استفاده از لینک‌های Breadcrumb برای بهبود ناوبری',
        'شناسایی و تقویت صفحات استراتژیک'
      ],
      icon: <LineChart className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی موبایل',
      description: 'اطمینان از عملکرد بهینه وب‌سایت شما در دستگاه‌های موبایل با توجه به اولویت ایندکس موبایل گوگل',
      features: [
        'پیاده‌سازی و بهینه‌سازی طراحی واکنش‌گرا (Responsive)',
        'بهبود تعامل‌پذیری و قابلیت استفاده در موبایل',
        'بهینه‌سازی سرعت بارگذاری در شبکه‌های موبایل',
        'رفع مشکلات محتوای مسدودشده برای موبایل',
        'بهینه‌سازی دکمه‌ها و عناصر تعاملی برای لمس',
        'تست سازگاری در انواع دستگاه‌های موبایل'
      ],
      icon: <BarChart className="h-10 w-10 text-primary" />
    },
    {
      title: 'اصلاح خطاهای خزش و ایندکس',
      description: 'شناسایی و رفع مشکلاتی که مانع خزش کامل و ایندکس صحیح وب‌سایت شما توسط موتورهای جستجو می‌شود',
      features: [
        'بررسی و اصلاح خطاهای گزارش شده در Search Console',
        'بهینه‌سازی فایل robots.txt و sitemap.xml',
        'رفع صفحات با محتوای تکراری و کنونیکال‌سازی',
        'بهبود ساختار URL و استفاده از URL‌های دوستانه',
        'رفع خطاهای 404 و ریدایرکت‌های نادرست',
        'بهینه‌سازی بودجه خزش (Crawl Budget)'
      ],
      icon: <Server className="h-10 w-10 text-primary" />
    },
    {
      title: 'پیاده‌سازی Schema Markup',
      description: 'افزودن داده‌های ساختاریافته به وب‌سایت شما برای کمک به موتورهای جستجو در درک بهتر محتوا',
      features: [
        'پیاده‌سازی Schema.org برای انواع محتوا',
        'بهینه‌سازی Rich Snippets برای نتایج بهتر در SERP',
        'پیاده‌سازی Organization، LocalBusiness و BreadcrumbList',
        'افزودن Schema برای محصولات، مقالات و FAQ',
        'پیاده‌سازی اسکیما برای ویدیوها و تصاویر',
        'تست و رفع خطاهای Schema با ابزارهای گوگل'
      ],
      icon: <Code className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی امنیت و عملکرد سرور',
      description: 'تقویت امنیت وب‌سایت و بهینه‌سازی عملکرد سرور برای افزایش سرعت و قابلیت اطمینان',
      features: [
        'پیاده‌سازی HTTPS و گواهی SSL',
        'بهینه‌سازی پیکربندی سرور وب',
        'رفع آسیب‌پذیری‌های امنیتی',
        'بهینه‌سازی پایگاه داده و کوئری‌ها',
        'محافظت در برابر حملات DDOS و Brute Force',
        'پیکربندی فشرده‌سازی Gzip/Brotli'
      ],
      icon: <Shield className="h-10 w-10 text-primary" />
    },
    {
      title: 'تحلیل و بهبود Core Web Vitals',
      description: 'بهینه‌سازی معیارهای حیاتی وب گوگل برای بهبود تجربه کاربری و افزایش رتبه در نتایج جستجو',
      features: [
        'بهبود LCP (Largest Contentful Paint)',
        'کاهش FID (First Input Delay) و CLS (Cumulative Layout Shift)',
        'بهینه‌سازی INP (Interaction to Next Paint)',
        'رفع مشکلات تاخیر در رندر JavaScript',
        'بهینه‌سازی فونت‌ها و تصاویر بزرگ',
        'بهبود معیارهای Lighthouse و PageSpeed Insights'
      ],
      icon: <Database className="h-10 w-10 text-primary" />
    }
  ];

  // Case studies
  const caseStudies = [
    {
      title: 'افزایش سرعت سایت فروشگاهی',
      description: 'بهبود 80% در سرعت بارگذاری و افزایش 45% نرخ تبدیل',
      metrics: [
        { label: 'بهبود سرعت', value: '80%' },
        { label: 'افزایش نرخ تبدیل', value: '45%' },
        { label: 'کاهش نرخ خروج', value: '30%' }
      ]
    },
    {
      title: 'بهینه‌سازی ساختار لینک‌های داخلی',
      description: 'افزایش 60% در نرخ خزش و بهبود 35% در رتبه‌بندی کلمات کلیدی هدف',
      metrics: [
        { label: 'افزایش نرخ خزش', value: '60%' },
        { label: 'بهبود رتبه‌بندی', value: '35%' },
        { label: 'افزایش بازدید ارگانیک', value: '50%' }
      ]
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات سئو فنی و بهینه‌سازی تکنیکال | وب آ ب ث" 
        description="بهینه‌سازی فنی و تکنیکال وب‌سایت شما برای افزایش سرعت، بهبود ایندکس‌شدن و افزایش رتبه در موتورهای جستجو" 
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                خدمات تخصصی
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                خدمات <span className="text-primary">سئو فنی</span> و بهینه‌سازی تکنیکال
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                ما با استفاده از جدیدترین تکنیک‌های سئو فنی، زیرساخت وب‌سایت شما را برای موتورهای جستجو بهینه می‌کنیم. هدف ما افزایش سرعت، بهبود ایندکس‌شدن و در نهایت افزایش رتبه وب‌سایت شما در نتایج جستجو است.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#tech-seo-services" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  مشاوره رایگان
                </a>
                <a 
                  href="#case-studies" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  نمونه کارها
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technical SEO Services Section */}
        <section 
          id="tech-seo-services" 
          ref={sectionRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو فنی
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو تکنیکال</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سئو فنی یا تکنیکال به بهینه‌سازی جنبه‌های فنی وب‌سایت شما می‌پردازد تا موتورهای جستجو بتوانند به راحتی آن را خزش و ایندکس کنند. ما با رفع موانع فنی، افزایش سرعت و بهبود ساختار وب‌سایت، زمینه را برای رشد رتبه شما فراهم می‌کنیم.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technicalSeoServices.slice(0, 4).map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-4 text-sm">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="link" className="mt-4 p-0 text-primary">
                    مشاهده جزئیات بیشتر
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalSeoServices.slice(4).map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-4 text-sm">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="link" className="mt-4 p-0 text-primary">
                    مشاهده جزئیات بیشتر
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                فرایند کار
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                فرایند <span className="text-primary">بهینه‌سازی سئو فنی</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سئو فنی یک فرایند مداوم و سیستماتیک است. ما با تجزیه و تحلیل دقیق، اجرای حساب شده تغییرات و نظارت مستمر، بهترین نتایج را برای شما به ارمغان می‌آوریم.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto animate-on-scroll opacity-0">
              {/* Timeline Line */}
              <div className="absolute top-0 bottom-0 left-0 right-0 lg:left-1/2 lg:right-auto w-px bg-primary/30 ml-6 lg:ml-0"/>
              
              {/* Timeline Items */}
              {[
                {
                  title: 'ممیزی فنی',
                  description: 'بررسی جامع وضعیت فعلی وب‌سایت شما از نظر فنی و شناسایی مشکلات و فرصت‌های بهبود',
                  features: [
                    'بررسی سرعت و عملکرد سایت',
                    'تحلیل خطاهای خزش و ایندکس',
                    'بررسی ساختار URL و لینک‌های داخلی',
                    'ارزیابی سازگاری موبایل',
                    'بررسی وضعیت امنیت و SSL'
                  ]
                },
                {
                  title: 'تدوین استراتژی',
                  description: 'ایجاد نقشه راه دقیق برای بهینه‌سازی فنی وب‌سایت شما با اولویت‌بندی اقدامات بر اساس تأثیر و تلاش مورد نیاز',
                  features: [
                    'اولویت‌بندی مشکلات فنی',
                    'زمان‌بندی اجرای تغییرات',
                    'تعیین شاخص‌های کلیدی عملکرد',
                    'پیش‌بینی نتایج و بازگشت سرمایه',
                    'تخصیص منابع و برنامه‌ریزی'
                  ]
                },
                {
                  title: 'اجرای تغییرات',
                  description: 'پیاده‌سازی تغییرات فنی مورد نیاز با حداقل اختلال در عملکرد سایت و تجربه کاربری',
                  features: [
                    'بهینه‌سازی سرعت و عملکرد',
                    'رفع خطاهای خزش و ایندکس',
                    'بهبود ساختار URL و لینک‌های داخلی',
                    'پیاده‌سازی Schema Markup',
                    'بهینه‌سازی فایل‌های robots.txt و sitemap.xml'
                  ]
                },
                {
                  title: 'پایش و گزارش‌دهی',
                  description: 'نظارت مستمر بر عملکرد سایت و تأثیر تغییرات اعمال شده، همراه با گزارش‌های منظم و قابل درک',
                  features: [
                    'پایش شاخص‌های کلیدی عملکرد',
                    'تحلیل روند بهبود رتبه و ترافیک',
                    'شناسایی مشکلات جدید',
                    'گزارش‌دهی منظم و شفاف',
                    'پیشنهاد اقدامات اصلاحی جدید'
                  ]
                }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "relative flex items-start mb-12",
                    idx % 2 === 0 ? "flex-row lg:pr-16" : "flex-row lg:flex-row-reverse lg:pl-16"
                  )}
                >
                  {/* Timeline Bullet */}
                  <div className="absolute top-0 lg:top-6 right-auto lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-primary shadow-lg">
                    <span className="text-white font-bold">{idx + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={cn(
                    "mr-16 lg:mr-0 flex-1",
                    idx % 2 === 0 ? "lg:text-right" : "lg:text-right"
                  )}>
                    <Card className="shadow-md">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-foreground/70 mb-4">{step.description}</p>
                        
                        <ul className="space-y-2">
                          {step.features.map((feature, fidx) => (
                            <li key={fidx} className="flex items-start text-sm">
                              <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section 
          id="case-studies"
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                نمونه کارها
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                نتایج <span className="text-primary">مشتریان ما</span>
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                افزایش چشمگیر ترافیک ارگانیک و بهبود رتبه‌بندی در موتورهای جستجو، نتیجه اجرای استراتژی‌های سئو فنی توسط تیم متخصص ماست.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {caseStudies.map((study, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                  <p className="text-foreground/70 mb-6">{study.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {study.metrics.map((metric, midx) => (
                      <div key={midx} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                        <div className="text-sm text-foreground/70">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6">
                    مطالعه موردی کامل
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید رتبه وب‌سایت خود را بهبود بخشید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با مشاوره رایگان ما، پتانسیل‌های بهبود سئو فنی وب‌سایت خود را کشف کنید و برنامه سفارشی دریافت کنید.
              </p>
              
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو فنی
              </a>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeoTechnical;
