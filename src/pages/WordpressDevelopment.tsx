
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowLeft, Code, Database, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const WordpressDevelopment = () => {
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

  // WordPress services details
  const serviceDetails = [
    {
      title: 'طراحی قالب اختصاصی',
      description: 'قالب‌های اختصاصی وردپرس که منحصراً برای برند و نیازهای کسب و کار شما طراحی شده‌اند',
      icon: <Code className="h-10 w-10 text-primary" />
    },
    {
      title: 'توسعه افزونه سفارشی',
      description: 'افزونه‌های سفارشی برای گسترش عملکرد وب‌سایت شما و پیاده‌سازی ویژگی‌های منحصر به فرد',
      icon: <Zap className="h-10 w-10 text-primary" />
    },
    {
      title: 'فروشگاه آنلاین ووکامرس',
      description: 'راه‌اندازی فروشگاه آنلاین حرفه‌ای با ووکامرس، سفارشی‌سازی محصولات، سبد خرید و درگاه پرداخت',
      icon: <Database className="h-10 w-10 text-primary" />
    },
    {
      title: 'امنیت و بهینه‌سازی',
      description: 'ارتقای امنیت وب‌سایت وردپرسی، بهینه‌سازی عملکرد و سرعت بارگذاری و پشتیبان‌گیری منظم',
      icon: <ShieldCheck className="h-10 w-10 text-primary" />
    }
  ];

  // Features
  const features = [
    'رابط کاربری اختصاصی و منطبق با برند شما',
    'طراحی واکنش‌گرا (Responsive) برای تمامی دستگاه‌ها',
    'بهینه‌سازی سرعت و عملکرد',
    'پیاده‌سازی SEO اولیه',
    'یکپارچه‌سازی با شبکه‌های اجتماعی',
    'سیستم مدیریت محتوای آسان',
    'امنیت بالا و محافظت در برابر حملات سایبری',
    'پشتیبانی از زبان فارسی و چند زبانه',
    'قابلیت توسعه و مقیاس‌پذیری',
    'پشتیبانی و به‌روزرسانی مداوم'
  ];

  // Process Steps
  const processSteps = [
    { 
      title: 'تحلیل و برنامه‌ریزی', 
      description: 'شناخت نیازهای شما، تحلیل بازار و رقبا، و برنامه‌ریزی پروژه' 
    },
    { 
      title: 'طراحی رابط کاربری', 
      description: 'طراحی وایرفریم و رابط کاربری منطبق با برند و نیازهای کسب و کار شما' 
    },
    { 
      title: 'توسعه و کدنویسی', 
      description: 'پیاده‌سازی طرح‌ها به صورت قالب وردپرس و افزودن عملکردهای مورد نیاز' 
    },
    { 
      title: 'تست و بازبینی', 
      description: 'آزمایش همه‌جانبه وب‌سایت، رفع اشکالات و بهینه‌سازی عملکرد' 
    },
    { 
      title: 'راه‌اندازی', 
      description: 'انتقال به سرور اصلی، راه‌اندازی نهایی و آموزش مدیریت سایت' 
    }
  ];

  // Projects
  const projects = [
    {
      title: 'فروشگاه آنلاین محصولات دیجیتال',
      description: 'طراحی و توسعه فروشگاه آنلاین با ووکامرس و سیستم عضویت ویژه'
    },
    {
      title: 'وب‌سایت شرکتی چندزبانه',
      description: 'وب‌سایت شرکتی به سه زبان فارسی، انگلیسی و عربی با سیستم رزرو آنلاین'
    },
    {
      title: 'پورتال اطلاع‌رسانی',
      description: 'پورتال خبری با سیستم عضویت، دسته‌بندی پیشرفته و ارسال خبرنامه'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات توسعه و طراحی سایت با وردپرس | وب آ ب ث" 
        description="طراحی و توسعه حرفه‌ای سایت‌های وردپرسی، قالب‌های اختصاصی، افزونه‌های سفارشی و فروشگاه‌های آنلاین ووکامرس" 
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
                توسعه وب
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                توسعه حرفه‌ای <span className="text-primary">وردپرس</span>
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                طراحی و توسعه وب‌سایت‌های حرفه‌ای با وردپرس، سفارشی‌سازی شده برای نیازهای کسب و کار شما. از قالب‌های اختصاصی تا فروشگاه‌های آنلاین پیچیده.
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
                خدمات وردپرس
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">توسعه وردپرس</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                وردپرس به عنوان محبوب‌ترین سیستم مدیریت محتوا، قدرت و انعطاف‌پذیری فوق‌العاده‌ای برای ساخت انواع وب‌سایت‌ها ارائه می‌دهد. تیم متخصص ما با سال‌ها تجربه در توسعه وردپرس، راهکارهای سفارشی و بهینه را برای کسب‌وکار شما ارائه می‌دهد.
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
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  ویژگی‌ها
                </span>
                
                <h2 className="text-3xl font-bold mb-6">
                  چرا وردپرس برای <span className="text-primary">کسب و کار</span> شما مناسب است؟
                </h2>
                
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  وب‌سایت‌های وردپرسی ما با تمرکز بر تجربه کاربری عالی، قابلیت مدیریت آسان و بهینه‌سازی برای موتورهای جستجو طراحی می‌شوند. 
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0">
                <div className="neo-morphism rounded-2xl p-8 h-full">
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-8">
                    <span className="font-persian text-muted-foreground">
                      تصویر نمونه وب‌سایت وردپرسی
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                فرآیند کار
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                مراحل <span className="text-primary">طراحی و توسعه</span> وب‌سایت وردپرسی
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                فرآیند طراحی و توسعه وب‌سایت وردپرسی ما شامل مراحل زیر است که اطمینان حاصل می‌کند نتیجه نهایی کاملاً منطبق با نیازها و اهداف کسب‌وکار شماست.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {processSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start mb-10 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ml-4 mt-1">
                    <span className="text-primary font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-foreground/80">{step.description}</p>
                  </div>
                </div>
              ))}
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
                نمونه‌ای از پروژه‌های وردپرسی که توسط تیم ما با موفقیت طراحی و پیاده‌سازی شده‌اند.
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
                آماده‌اید وب‌سایت وردپرسی خود را بسازید؟
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

export default WordpressDevelopment;
