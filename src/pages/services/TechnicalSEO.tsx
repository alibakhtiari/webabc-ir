
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, Zap, ShieldCheck, BarChart3, Layers, Settings, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnicalSEO = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  useEffect(() => {
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
      // Start with opacity-0, but remove it when in view
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Technical SEO Services and Benefits
  const technicalSeoServices = [
    {
      title: 'بهینه‌سازی سرعت سایت',
      description: 'افزایش سرعت بارگذاری صفحات وب‌سایت با بهینه‌سازی کدها، تصاویر و منابع',
      icon: <Zap className="h-12 w-12 text-primary" />,
      features: [
        'بهینه‌سازی تصاویر و فایل‌های چندرسانه‌ای',
        'مینیفای کردن کدهای CSS و JavaScript',
        'پیاده‌سازی لیزی لودینگ',
        'بهینه‌سازی کش مرورگر',
        'بهبود Core Web Vitals',
        'پیاده‌سازی CDN'
      ]
    },
    {
      title: 'بهینه‌سازی ساختار وب‌سایت',
      description: 'طراحی و بهبود معماری اطلاعات سایت برای دسترسی بهتر کاربران و موتورهای جستجو',
      icon: <Layers className="h-12 w-12 text-primary" />,
      features: [
        'بهینه‌سازی ساختار URL',
        'بهبود ناوبری و دسترسی',
        'ایجاد سایت‌مپ XML',
        'بهینه‌سازی فایل robots.txt',
        'بهبود ساختار لینک‌های داخلی',
        'رفع مشکلات صفحات تکراری'
      ]
    },
    {
      title: 'پیاده‌سازی Schema Markup',
      description: 'افزودن داده‌های ساختاریافته برای کمک به موتورهای جستجو در درک بهتر محتوای سایت',
      icon: <Settings className="h-12 w-12 text-primary" />,
      features: [
        'پیاده‌سازی Schema.org',
        'ایجاد Rich Snippets',
        'بهینه‌سازی برای نمایش در نتایج ویژه گوگل',
        'افزودن اطلاعات تماس و آدرس ساختاریافته',
        'نشانه‌گذاری محصولات و خدمات',
        'نشانه‌گذاری نظرات و امتیازات'
      ]
    },
    {
      title: 'امنیت و بهینه‌سازی فنی',
      description: 'ارتقای امنیت وب‌سایت و رفع مشکلات فنی مؤثر بر SEO',
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      features: [
        'پیاده‌سازی HTTPS',
        'رفع خطاهای کنسول سرچ کنسول',
        'بهینه‌سازی ریسپانسیو و موبایل',
        'رفع مشکلات Crawling و Indexing',
        'پیاده‌سازی هدرهای HTTP مناسب',
        'رفع مشکلات ریدایرکت و خطاهای 404'
      ]
    },
    {
      title: 'تست و عیب‌یابی',
      description: 'بررسی مداوم و عیب‌یابی مشکلات فنی وب‌سایت با ابزارهای تخصصی',
      icon: <LineChart className="h-12 w-12 text-primary" />,
      features: [
        'تست سرعت و عملکرد سایت',
        'بررسی سازگاری با موبایل',
        'بررسی خطاهای خزش و ایندکس',
        'تست سازگاری مرورگر',
        'بررسی مشکلات کانونیکال',
        'تحلیل لاگ‌های سرور'
      ]
    }
  ];

  const benefits = [
    {
      title: 'افزایش سرعت بارگذاری',
      description: 'کاهش زمان بارگذاری صفحات برای بهبود تجربه کاربری و افزایش رتبه در موتورهای جستجو'
    },
    {
      title: 'بهبود رتبه در نتایج جستجو',
      description: 'رفع مشکلات فنی که مانع از رتبه‌بندی مناسب سایت شما می‌شود'
    },
    {
      title: 'افزایش نرخ تبدیل',
      description: 'بهبود ساختار سایت و سرعت بارگذاری منجر به افزایش نرخ تبدیل و فروش می‌شود'
    },
    {
      title: 'کاهش نرخ پرش',
      description: 'با بهبود سرعت و عملکرد سایت، کاربران زمان بیشتری در سایت شما می‌مانند'
    },
    {
      title: 'بهبود تجربه کاربری',
      description: 'ساختار مناسب و سرعت بالا منجر به تجربه کاربری بهتر می‌شود'
    },
    {
      title: 'مزیت رقابتی',
      description: 'با داشتن یک سایت فنی بهینه، نسبت به رقبای خود مزیت رقابتی خواهید داشت'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات سئو فنی و بهینه‌سازی تکنیکال | وب آ ب ث" 
        description="بهینه‌سازی فنی وب‌سایت شما برای افزایش سرعت، بهبود عملکرد و رفع مشکلات فنی که مانع از رتبه‌بندی مناسب سایت شما می‌شود" 
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
                بهینه‌سازی فنی وب‌سایت شما برای بهبود عملکرد، افزایش سرعت و رفع مشکلات فنی که مانع از رتبه‌بندی مناسب سایت شما در موتورهای جستجو می‌شود.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#services" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  مشاهده خدمات
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  درخواست مشاوره رایگان
                </a>
              </div>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>
        </section>
        
        {/* What is Technical SEO Section */}
        <section 
          id="what-is" 
          className="py-20 bg-white relative overflow-hidden"
          ref={addToRefs}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  سئو فنی چیست؟
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  مفهوم <span className="text-primary">سئو فنی</span> و اهمیت آن
                </h2>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  سئو فنی (Technical SEO) به بهینه‌سازی جنبه‌های فنی یک وب‌سایت برای بهبود رتبه‌بندی آن در موتورهای جستجو اشاره دارد. این جنبه از سئو بر روی بهبود زیرساخت‌های فنی سایت متمرکز است، نه محتوای آن.
                </p>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  هدف سئو فنی، کمک به موتورهای جستجو برای پیمایش، خزش و نمایه‌سازی بهتر وب‌سایت است. بهینه‌سازی فنی مناسب، پایه و اساس استراتژی سئو موفق را تشکیل می‌دهد.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex-1 p-5 rounded-xl neo-morphism">
                    <div className="text-2xl font-bold text-primary mb-2">80%</div>
                    <p className="text-sm text-foreground/70">از مشکلات رتبه‌بندی به مسائل فنی سایت مربوط است</p>
                  </div>
                  <div className="flex-1 p-5 rounded-xl neo-morphism">
                    <div className="text-2xl font-bold text-primary mb-2">2.5x</div>
                    <p className="text-sm text-foreground/70">افزایش نرخ تبدیل با بهبود سرعت بارگذاری سایت</p>
                  </div>
                </div>
              </div>
              
              <div className="animate-on-scroll">
                <div className="neo-morphism rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">مهم‌ترین فاکتورهای سئو فنی:</h3>
                  <ul className="space-y-4">
                    {[
                      'سرعت بارگذاری صفحات سایت',
                      'بهینه‌سازی برای تجربه کاربری موبایل',
                      'ساختار URL مناسب',
                      'امنیت وب‌سایت (HTTPS)',
                      'معماری سایت و ساختار لینک داخلی',
                      'استفاده از داده‌های ساختاریافته (Schema)',
                      'سایت‌مپ XML',
                      'فایل robots.txt',
                      'مدیریت خطاها و ریدایرکت‌ها',
                      'بهینه‌سازی Core Web Vitals'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section 
          id="services" 
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
          ref={addToRefs}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                خدمات ما
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو فنی</span> وب آ ب ث
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما طیف کاملی از خدمات سئو فنی را ارائه می‌دهیم تا وب‌سایت شما از نظر فنی برای موتورهای جستجو بهینه شود.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalSeoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-6 animate-on-scroll"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-4">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section 
          id="benefits" 
          className="py-20 bg-white relative overflow-hidden"
          ref={addToRefs}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                مزایا
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                مزایای <span className="text-primary">سئو فنی</span> برای کسب و کار شما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                بهینه‌سازی فنی سایت شما علاوه بر بهبود رتبه در موتورهای جستجو، مزایای بسیار دیگری نیز به همراه دارد.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-xl glass-morphism"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <span className="text-xl font-bold">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-foreground/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section 
          id="process" 
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
          ref={addToRefs}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                روش کار ما
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                فرآیند <span className="text-primary">سئو فنی</span> وب آ ب ث
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما از یک رویکرد ساختاریافته و مرحله‌بندی شده برای بهینه‌سازی فنی وب‌سایت شما استفاده می‌کنیم.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  title: 'تحلیل و ممیزی فنی',
                  description: 'بررسی دقیق وضعیت فعلی سایت و شناسایی مشکلات فنی موجود',
                  steps: [
                    'بررسی سرعت و عملکرد سایت',
                    'ارزیابی ساختار URL و معماری سایت',
                    'بررسی سازگاری با موبایل',
                    'ممیزی امنیت و SSL',
                    'تحلیل خطاها و مشکلات خزش'
                  ]
                },
                {
                  title: 'تدوین استراتژی بهینه‌سازی',
                  description: 'ایجاد برنامه اجرایی مرحله‌بندی شده برای رفع مشکلات شناسایی شده',
                  steps: [
                    'اولویت‌بندی مشکلات بر اساس تأثیر',
                    'تعیین راهکارهای فنی مناسب',
                    'برنامه‌ریزی زمان‌بندی اجرا',
                    'تعیین شاخص‌های موفقیت',
                    'پیش‌بینی نتایج مورد انتظار'
                  ]
                },
                {
                  title: 'اجرای تغییرات فنی',
                  description: 'پیاده‌سازی تغییرات تکنیکال بر اساس استراتژی تدوین شده',
                  steps: [
                    'بهینه‌سازی سرعت و عملکرد',
                    'اصلاح ساختار URL و لینک‌های داخلی',
                    'پیاده‌سازی Schema Markup',
                    'رفع مشکلات ریدایرکت و 404',
                    'بهینه‌سازی سایت‌مپ و robots.txt'
                  ]
                },
                {
                  title: 'نظارت و گزارش‌دهی',
                  description: 'پایش مداوم شاخص‌های کلیدی و ارائه گزارش‌های دوره‌ای',
                  steps: [
                    'پایش شاخص‌های عملکردی',
                    'بررسی خزش و ایندکس صفحات',
                    'تحلیل بهبود رتبه‌بندی',
                    'ارائه گزارش‌های ماهانه',
                    'بروزرسانی استراتژی بر اساس نتایج'
                  ]
                }
              ].map((phase, idx) => (
                <div 
                  key={idx} 
                  className="relative pb-12 animate-on-scroll"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {idx < 3 && (
                    <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-primary/20"></div>
                  )}
                  <div className="relative flex items-start">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg ml-6 relative z-10">
                      {idx + 1}
                    </div>
                    <div className="flex-1 neo-morphism p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                      <p className="text-foreground/70 mb-4">{phase.description}</p>
                      <ul className="space-y-2">
                        {phase.steps.map((step, sidx) => (
                          <li key={sidx} className="flex items-start text-sm">
                            <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید سایت خود را از نظر فنی بهینه کنید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                ما به شما کمک می‌کنیم تا وب‌سایت خود را از نظر فنی به گونه‌ای بهینه کنید که موتورهای جستجو آن را به راحتی پیمایش و نمایه‌سازی کنند.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  درخواست مشاوره رایگان
                </a>
                <Link 
                  to="/services" 
                  className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  مشاهده سایر خدمات
                </Link>
              </div>
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

export default TechnicalSEO;
