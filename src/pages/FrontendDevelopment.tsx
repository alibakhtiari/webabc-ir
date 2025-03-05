
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowLeft, Code, Layers, Laptop, Gauge, Webhook } from 'lucide-react';
import { Link } from 'react-router-dom';

const FrontendDevelopment = () => {
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

  // Frontend Development services details
  const serviceDetails = [
    {
      title: 'توسعه با React.js',
      description: 'توسعه رابط کاربری پویا و تعاملی با استفاده از React.js و کتابخانه‌های مدرن',
      icon: <Webhook className="h-10 w-10 text-primary" />
    },
    {
      title: 'اپلیکیشن‌های Next.js',
      description: 'توسعه وب‌سایت‌های سریع و بهینه با Next.js با قابلیت رندر سمت سرور (SSR) و تولید استاتیک',
      icon: <Gauge className="h-10 w-10 text-primary" />
    },
    {
      title: 'فریم‌ورک‌های UI مدرن',
      description: 'پیاده‌سازی رابط‌های کاربری زیبا با استفاده از Tailwind CSS، Material UI، و سایر فریم‌ورک‌های مدرن',
      icon: <Layers className="h-10 w-10 text-primary" />
    },
    {
      title: 'اپلیکیشن‌های وب پیشرفته',
      description: 'توسعه اپلیکیشن‌های وب پیچیده با قابلیت‌های پیشرفته مانند آفلاین مود، PWA و انیمیشن‌های سطح بالا',
      icon: <Laptop className="h-10 w-10 text-primary" />
    }
  ];

  // Tech Stack
  const techStack = [
    { name: 'React.js', category: 'فریم‌ورک اصلی' },
    { name: 'Next.js', category: 'فریم‌ورک متاسرور' },
    { name: 'TypeScript', category: 'زبان برنامه‌نویسی' },
    { name: 'Redux', category: 'مدیریت استیت' },
    { name: 'React Query', category: 'مدیریت داده' },
    { name: 'Tailwind CSS', category: 'استایل‌دهی' },
    { name: 'Material UI', category: 'کامپوننت‌های آماده' },
    { name: 'Framer Motion', category: 'انیمیشن' },
    { name: 'Jest', category: 'تست' },
    { name: 'Cypress', category: 'تست E2E' },
    { name: 'Storybook', category: 'مستندسازی کامپوننت' },
    { name: 'Vite', category: 'ابزار توسعه' },
  ];

  // Benefits
  const benefits = [
    {
      title: 'عملکرد فوق‌العاده',
      description: 'اپلیکیشن‌های وب سریع و بهینه که تجربه کاربری عالی را فراهم می‌کنند'
    },
    {
      title: 'رابط کاربری تعاملی',
      description: 'رابط‌های کاربری پویا و تعاملی که کاربران را جذب می‌کنند'
    },
    {
      title: 'مقیاس‌پذیری',
      description: 'معماری مقیاس‌پذیر که امکان رشد و توسعه در آینده را فراهم می‌کند'
    },
    {
      title: 'بهینه‌سازی SEO',
      description: 'تکنیک‌های بهینه‌سازی موتورهای جستجو برای رتبه‌بندی بهتر وب‌سایت شما'
    },
    {
      title: 'سازگاری با موبایل',
      description: 'طراحی واکنش‌گرا که در تمامی دستگاه‌ها عملکرد عالی دارد'
    },
    {
      title: 'کد تمیز و قابل نگهداری',
      description: 'کدنویسی استاندارد و ماژولار که نگهداری و توسعه آینده را آسان می‌کند'
    }
  ];

  // Projects
  const projects = [
    {
      title: 'داشبورد مدیریت خدمات آنلاین',
      description: 'داشبورد پیشرفته با React و کتابخانه Chart.js برای نمایش داده‌های آماری'
    },
    {
      title: 'پلتفرم آموزش آنلاین',
      description: 'وب‌سایت آموزش آنلاین با Next.js و قابلیت پخش ویدیو و مدیریت دوره‌ها'
    },
    {
      title: 'اپلیکیشن SPA فروشگاهی',
      description: 'اپلیکیشن تک‌صفحه‌ای فروشگاهی با React و Redux برای مدیریت سبد خرید'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات توسعه فرانت‌اند با React و Next.js | وب آ ب ث" 
        description="توسعه حرفه‌ای فرانت‌اند با استفاده از React.js و Next.js برای ساخت اپلیکیشن‌های وب مدرن، سریع و تعاملی" 
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Link to="/web-development-services" className="inline-flex items-center text-primary mb-4 hover:underline">
                <ArrowLeft className="ml-1 h-4 w-4" /> بازگشت به خدمات توسعه وب
              </Link>
              
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                توسعه فرانت‌اند
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                توسعه <span className="text-primary">فرانت‌اند</span> با React و Next.js
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                ساخت رابط‌های کاربری مدرن، سریع و تعاملی با استفاده از جدیدترین فناوری‌های فرانت‌اند. ما اپلیکیشن‌های وب پیشرفته‌ای می‌سازیم که کاربران را مجذوب می‌کنند.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  درخواست مشاوره
                </a>
                <a 
                  href="#portfolio" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  نمونه کارها
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Details Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                خدمات فرانت‌اند
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">توسعه فرانت‌اند</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                فناوری‌های نوین فرانت‌اند مانند React و Next.js به ما امکان می‌دهند تا رابط‌های کاربری سریع، پویا و تعاملی ایجاد کنیم که تجربه کاربری استثنایی را به همراه دارند. تیم متخصص ما در توسعه فرانت‌اند، راهکارهای مدرن و بهینه را برای کسب‌وکار شما ارائه می‌دهد.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {serviceDetails.map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tech Stack Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                تکنولوژی‌ها
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">استک تکنولوژی</span> مورد استفاده ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما از جدیدترین و بهترین تکنولوژی‌های فرانت‌اند برای توسعه اپلیکیشن‌های وب استفاده می‌کنیم.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-on-scroll opacity-0">
              {techStack.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="font-bold mb-1">{tech.name}</h3>
                  <p className="text-sm text-foreground/60">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  مزایا
                </span>
                
                <h2 className="text-3xl font-bold mb-6">
                  مزایای استفاده از <span className="text-primary">فناوری‌های مدرن</span> فرانت‌اند
                </h2>
                
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  با استفاده از فناوری‌های پیشرفته مانند React و Next.js، اپلیکیشن‌های وبی می‌سازیم که سریع، مقیاس‌پذیر و کاربرپسند هستند.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex flex-col p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                      <h3 className="font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-foreground/70">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0">
                <div className="neo-morphism rounded-2xl p-8 h-full">
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-8">
                    <span className="font-persian text-muted-foreground">
                      تصویر نمونه اپلیکیشن React
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                نمونه کارها
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                برخی از <span className="text-primary">پروژه‌های موفق</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                نمونه‌ای از پروژه‌های فرانت‌اند که توسط تیم ما با موفقیت طراحی و پیاده‌سازی شده‌اند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl overflow-hidden animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="font-persian text-muted-foreground">
                      تصویر پروژه
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-foreground/70 text-sm">{project.description}</p>
                    <a href="#" className="mt-4 inline-block text-primary font-medium hover:underline">مشاهده جزئیات</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید اپلیکیشن وب مدرن خود را بسازید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره نیازهای خاص پروژه شما گفتگو کنیم و راهکاری متناسب با اهداف کسب و کار شما ارائه دهیم.
              </p>
              
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                درخواست مشاوره رایگان
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

export default FrontendDevelopment;
