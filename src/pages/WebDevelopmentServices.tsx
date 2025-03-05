
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WebDevelopmentServices = () => {
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    wordpress: useRef<HTMLDivElement>(null),
    frontend: useRef<HTMLDivElement>(null),
    backend: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
  };
  
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

  // Web Development Services Data
  const webdevServices = [
    {
      id: "wordpress",
      title: 'توسعه وردپرس',
      slug: 'wordpress-development',
      description: 'طراحی و توسعه وب‌سایت‌های حرفه‌ای با وردپرس، سفارشی‌سازی شده برای نیازهای کسب و کار شما',
      features: [
        'طراحی قالب اختصاصی وردپرس',
        'توسعه افزونه‌های سفارشی',
        'بهینه‌سازی عملکرد و سرعت',
        'پیاده‌سازی فروشگاه آنلاین با WooCommerce',
        'ارتقا و بهبود سایت‌های وردپرسی موجود',
        'پشتیبانی و نگهداری مداوم'
      ],
      icon: '🔌',
      fullDescription: 'وردپرس به‌عنوان محبوب‌ترین سیستم مدیریت محتوا، قدرت و انعطاف‌پذیری فوق‌العاده‌ای برای ساخت انواع وب‌سایت‌ها از وبلاگ‌ها گرفته تا فروشگاه‌های پیچیده ارائه می‌دهد. تیم متخصص ما با سال‌ها تجربه در توسعه وردپرس، راهکارهای سفارشی و بهینه را برای کسب‌وکار شما ارائه می‌دهد.'
    },
    {
      id: "frontend",
      title: 'توسعه فرانت‌اند با React و Next.js',
      slug: 'frontend-development',
      description: 'ایجاد رابط کاربری مدرن، سریع و واکنش‌گرا با استفاده از فناوری‌های پیشرفته فرانت‌اند',
      features: [
        'طراحی و توسعه UI/UX مدرن',
        'پیاده‌سازی با React.js و Next.js',
        'طراحی ریسپانسیو برای تمام دستگاه‌ها',
        'بهینه‌سازی Core Web Vitals',
        'انیمیشن‌ها و تعاملات پیشرفته کاربری',
        'یکپارچه‌سازی با API‌های مختلف'
      ],
      icon: '⚛️',
      fullDescription: 'فناوری‌های نوین فرانت‌اند مانند React و Next.js به ما امکان می‌دهند تا رابط‌های کاربری سریع، پویا و تعاملی ایجاد کنیم که تجربه کاربری استثنایی را به همراه دارند. با استفاده از این فناوری‌ها، وب‌سایت‌هایی با قابلیت‌های اپلیکیشن‌های تک‌صفحه‌ای (SPA) و رندر سمت سرور (SSR) توسعه می‌دهیم که سرعت، امنیت و کارایی بالایی دارند.'
    },
    {
      id: "backend",
      title: 'توسعه بک‌اند با پایتون و Node.js',
      slug: 'backend-development',
      description: 'ایجاد زیرساخت‌های قدرتمند، مقیاس‌پذیر و امن برای اپلیکیشن‌های وب',
      features: [
        'طراحی و پیاده‌سازی API‌های RESTful',
        'توسعه با Django یا Flask (پایتون)',
        'توسعه با Express یا NestJS (Node.js)',
        'مدیریت پایگاه‌داده‌ها (SQL و NoSQL)',
        'پیاده‌سازی سیستم‌های احراز هویت و مجوزدهی',
        'یکپارچه‌سازی با سرویس‌های ابری'
      ],
      icon: '🔋',
      fullDescription: 'زیرساخت بک‌اند قوی، قلب هر اپلیکیشن وب موفق است. تیم ما در توسعه بک‌اند با استفاده از Python (Django/Flask) و Node.js (Express/NestJS) تخصص دارد. ما راهکارهای بک‌اند مقیاس‌پذیر، امن و کارآمد را برای پشتیبانی از نیازهای کسب‌وکار شما طراحی و پیاده‌سازی می‌کنیم.'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'هزینه طراحی و توسعه وب‌سایت چقدر است؟',
      answer: 'هزینه طراحی و توسعه وب‌سایت بسته به پیچیدگی پروژه، فناوری‌های مورد استفاده، و امکاناتی که می‌خواهید متغیر است. برای یک وب‌سایت ساده وردپرسی، هزینه‌ها از X شروع می‌شود، در حالی که برای اپلیکیشن‌های وب پیچیده با React یا Next.js، هزینه‌ها بالاتر خواهد بود. ما برای هر پروژه، پس از درک کامل نیازهای شما، برآورد دقیق هزینه را ارائه می‌دهیم.'
    },
    {
      question: 'چه مدت زمانی برای توسعه یک وب‌سایت نیاز است؟',
      answer: 'زمان توسعه یک وب‌سایت بسته به پیچیدگی و حجم کار متغیر است. به طور معمول، یک وب‌سایت وردپرسی ساده می‌تواند در 2-4 هفته آماده شود، در حالی که پروژه‌های پیچیده‌تر مانند فروشگاه‌های آنلاین یا اپلیکیشن‌های وب سفارشی ممکن است 8-12 هفته یا بیشتر زمان ببرند. ما در ابتدای پروژه، یک برنامه زمانی دقیق با مراحل مختلف تحویل به شما ارائه می‌دهیم.'
    },
    {
      question: 'آیا پس از تحویل پروژه، خدمات پشتیبانی هم ارائه می‌دهید؟',
      answer: 'بله، ما بسته‌های پشتیبانی مختلفی را برای نگهداری و بهبود مداوم وب‌سایت شما ارائه می‌دهیم. این خدمات شامل به‌روزرسانی‌های امنیتی، بک‌آپ منظم، بهینه‌سازی عملکرد، و افزودن ویژگی‌های جدید می‌شود. علاوه بر این، ما آموزش‌های لازم را برای مدیریت وب‌سایت به تیم شما ارائه می‌دهیم تا بتوانید به صورت مستقل بخش‌های مختلف سایت را مدیریت کنید.'
    },
    {
      question: 'آیا وب‌سایت‌ها برای موبایل بهینه‌سازی می‌شوند؟',
      answer: 'بله، تمامی وب‌سایت‌هایی که ما طراحی می‌کنیم کاملاً ریسپانسیو و برای تمامی دستگاه‌ها (موبایل، تبلت، دسکتاپ) بهینه‌سازی می‌شوند. با توجه به اینکه بیش از 50% ترافیک وب امروزه از طریق دستگاه‌های موبایل است، ما طراحی موبایل‌فرست را در اولویت قرار می‌دهیم تا اطمینان حاصل کنیم که سایت شما در تمام دستگاه‌ها عملکرد عالی دارد.'
    },
    {
      question: 'آیا می‌توانید سایت فعلی من را بهبود دهید یا باید از ابتدا شروع کنیم؟',
      answer: 'ما هر دو خدمات بهبود و ارتقای سایت‌های موجود و ساخت سایت جدید را ارائه می‌دهیم. پس از بررسی دقیق وب‌سایت فعلی شما، بهترین گزینه را پیشنهاد خواهیم داد. در برخی موارد، بهبود و بهینه‌سازی سایت موجود مقرون به صرفه‌تر است، اما گاهی اوقات، ساخت مجدد سایت از ابتدا نتایج بهتری به همراه دارد، به خصوص اگر سایت فعلی دارای مشکلات زیرساختی باشد.'
    },
    {
      question: 'آیا خدمات سئو هم در پروژه‌های توسعه وب ارائه می‌دهید؟',
      answer: 'بله، ما سئو را به عنوان بخش جدایی‌ناپذیر از فرآیند توسعه وب در نظر می‌گیریم. تمامی وب‌سایت‌های ما با اصول اولیه سئو مانند ساختار URL مناسب، بهینه‌سازی سرعت، تگ‌های متا استاندارد، و ساختار HTML معنایی توسعه می‌یابند. همچنین، خدمات سئو تخصصی جداگانه‌ای نیز برای بهینه‌سازی محتوا، سئو فنی پیشرفته، و استراتژی‌های سئو بلندمدت ارائه می‌دهیم.'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات تخصصی توسعه وب | وب آ ب ث" 
        description="ارائه خدمات حرفه‌ای توسعه وب‌سایت با وردپرس، React، Next.js، پایتون و Node.js برای کسب و کارهای کوچک و بزرگ" 
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
                خدمات <span className="text-primary">توسعه وب</span> حرفه‌ای
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                راهکارهای جامع توسعه وب برای کسب و کار شما. با استفاده از جدیدترین تکنولوژی‌ها و روش‌های به روز، وب‌سایت شما را به ابزاری قدرتمند برای رشد کسب و کار تبدیل می‌کنیم.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#wordpress" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  توسعه وردپرس
                </a>
                <a 
                  href="#frontend" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  توسعه فرانت‌اند
                </a>
                <a 
                  href="#backend" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  توسعه بک‌اند
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Introduction */}
        <section 
          id="intro" 
          ref={sectionRefs.intro}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                توسعه وب
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">طراحی</span> و <span className="text-primary">توسعه</span> وب‌سایت
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                تیم متخصص ما وب‌سایت‌هایی مدرن، کاربرپسند و بهینه برای موتورهای جستجو طراحی می‌کند. از سایت‌های شرکتی ساده تا فروشگاه‌های آنلاین پیچیده و اپلیکیشن‌های وب تعاملی، ما راهکاری متناسب با نیازهای شما ارائه می‌دهیم.
              </p>
            </div>
          </div>
        </section>
        
        {/* Web Development Services Section */}
        {webdevServices.map((service, idx) => (
          <section 
            key={idx}
            id={service.id}
            ref={sectionRefs[service.id as keyof typeof sectionRefs]}
            className={cn(
              "py-20 relative overflow-hidden",
              idx % 2 === 0 ? "bg-white" : "bg-gradient-to-b from-gray-50 to-white"
            )}
          >
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={cn(
                  "animate-on-scroll opacity-0",
                  idx % 2 === 1 && "lg:order-2"
                )}>
                  <div className="mb-6">
                    <span className="inline-block text-5xl mb-4">{service.icon}</span>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>
                    
                    <Link 
                      to={`/web-development/${service.slug}`} 
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      مشاهده جزئیات بیشتر <ArrowRight className="mr-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <ul className="space-y-3 mt-8">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={cn(
                  "animate-on-scroll opacity-0",
                  idx % 2 === 1 && "lg:order-1"
                )}>
                  <div className="neo-morphism rounded-2xl p-8 h-full">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-8">
                      <span className="font-persian text-muted-foreground">
                        تصویر {service.title}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">چرا {service.title} برای کسب و کار شما مهم است؟</h3>
                    <p className="text-foreground/80 mb-6">
                      با بهره‌گیری از قدرت {service.title}، می‌توانید وب‌سایتی حرفه‌ای، کاربرپسند و بهینه برای موتورهای جستجو داشته باشید که به رشد کسب و کار شما کمک می‌کند.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <span className="text-primary font-bold">{i}</span>
                          </div>
                          <p className="text-sm">ویژگی {i} {service.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        {/* FAQ Section */}
        <section 
          id="faq" 
          ref={sectionRefs.faq}
          className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سؤالات متداول
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                پاسخ به <span className="text-primary">سؤالات</span> رایج شما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                در اینجا به برخی از سؤالات متداول درباره خدمات توسعه وب ما پاسخ داده‌ایم. اگر سؤال دیگری دارید، لطفاً با ما تماس بگیرید.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`faq-${idx}`}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 text-right text-lg font-medium hover:no-underline hover:bg-gray-50 text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید وب‌سایت رویایی خود را بسازید؟
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

export default WebDevelopmentServices;
