import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  const seoRef = useRef<HTMLDivElement>(null);
  const webdevRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
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

  // SEO Services Data
  const seoServices = [
    {
      title: 'سئو فنی',
      description: 'بهینه‌سازی فنی وب‌سایت شما برای بهبود عملکرد و افزایش رتبه در موتورهای جستجو',
      features: [
        'بهینه‌سازی سرعت بارگذاری صفحات',
        'رفع خطاهای فنی و مشکلات خزش',
        'بهینه‌سازی ساختار URL و معماری سایت',
        'پیاده‌سازی Schema Markup و داده‌های ساختاریافته',
        'بهینه‌سازی موبایل و ریسپانسیو',
        'بهبود امنیت و عملکرد سرور'
      ],
      icon: '🔧'
    },
    {
      title: 'سئو محتوا',
      description: 'تولید و بهینه‌سازی محتوای با کیفیت که هم برای کاربران و هم برای موتورهای جستجو جذاب باشد',
      features: [
        'تحقیق کلمات کلیدی تخصصی',
        'تولید محتوای اصیل و با ارزش',
        'بهینه‌سازی عناوین و متاتگ‌ها',
        'ساختاربندی محتوا با استفاده از تگ‌های H1 تا H6',
        'بهینه‌سازی تصاویر و رسانه‌ها',
        'ایجاد استراتژی محتوای بلندمدت'
      ],
      icon: '📝'
    },
    {
      title: 'سئو محلی',
      description: 'افزایش دید کسب و کار شما در جستجوهای محلی و نتایج نقشه گوگل',
      features: [
        'بهینه‌سازی پروفایل Google My Business',
        'مدیریت نظرات و امتیازات محلی',
        'بهینه‌سازی محتوا برای کلمات کلیدی محلی',
        'ایجاد لینک‌های محلی با کیفیت',
        'بهینه‌سازی برای جستجوهای "نزدیک من"',
        'گزارش‌های تحلیلی سئو محلی'
      ],
      icon: '📍'
    },
    {
      title: 'سئو خارجی',
      description: 'ایجاد پروفایل لینک قدرتمند با استراتژی لینک‌سازی اصولی و طبیعی',
      features: [
        'تحلیل پروفایل لینک فعلی',
        'شناسایی فرصت‌های لینک‌سازی با کیفیت',
        'تولید محتوای قابل لینک‌دهی',
        'لینک‌سازی از سایت‌های معتبر مرتبط',
        'پایش و خنثی‌سازی لینک‌های مخرب',
        'گزارش‌های دوره‌ای پیشرفت'
      ],
      icon: '🔗'
    }
  ];

  // Web Development Services Data
  const webdevServices = [
    {
      title: 'توسعه وردپرس',
      description: 'طراحی و توسعه وب‌سایت‌های حرفه‌ای با وردپرس، سفارشی‌سازی شده برای نیازهای کسب و کار شما',
      features: [
        'طراحی قالب اختصاصی وردپرس',
        'توسعه افزونه‌های سفارشی',
        'بهینه‌سازی عملکرد و سرعت',
        'پیاده‌سازی فروشگاه آنلاین با WooCommerce',
        'ارتقا و بهبود سایت‌های وردپرسی موجود',
        'پشتیبانی و نگهداری مداوم'
      ],
      icon: '🔌'
    },
    {
      title: 'توسعه فرانت‌اند با React و Next.js',
      description: 'ایجاد رابط کاربری مدرن، سریع و واکنش‌گرا با استفاده از فناوری‌های پیشرفته فرانت‌اند',
      features: [
        'طراحی و توسعه UI/UX مدرن',
        'پیاده‌سازی با React.js و Next.js',
        'طراحی ریسپانسیو برای تمام دستگاه‌ها',
        'بهینه‌سازی Core Web Vitals',
        'انیمیشن‌ها و تعاملات پیشرفته کاربری',
        'یکپارچه‌سازی با API‌های مختلف'
      ],
      icon: '⚛️'
    },
    {
      title: 'توسعه بک‌اند با پایتون و Node.js',
      description: 'ایجاد زیرساخت‌های قدرتمند، مقیاس‌پذیر و امن برای اپلیکیشن‌های وب',
      features: [
        'طراحی و پیاده‌سازی API‌های RESTful',
        'توسعه با Django یا Flask (پایتون)',
        'توسعه با Express یا NestJS (Node.js)',
        'مدیریت پایگاه‌داده‌ها (SQL و NoSQL)',
        'پیاده‌سازی سیستم‌های احراز هویت و مجوزدهی',
        'یکپارچه‌سازی با سرویس‌های ابری'
      ],
      icon: '🔋'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'هزینه خدمات سئو شما چقدر است؟',
      answer: 'هزینه خدمات سئو ما بسته به نیازهای خاص کسب و کار شما، اندازه وب‌سایت، سطح رقابت در صنعت شما و اهداف مورد نظر متغیر است. ما برای هر مشتری یک برنامه سفارشی با قیمت‌گذاری شفاف ارائه می‌دهیم. برای دریافت مشاوره رایگان و برآورد هزینه‌ها با ما تماس بگیرید.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج سئو را ببینیم؟',
      answer: 'سئو یک فرآیند مداوم و بلندمدت است. معمولاً شما می‌توانید برخی تغییرات اولیه را در 3-4 ماه اول مشاهده کنید، اما نتایج قابل توجه و پایدار معمولاً بین 6 تا 12 ماه زمان می‌برد. این زمان‌بندی به عوامل مختلفی مانند رقابت، سن دامنه، کیفیت محتوا و ساختار فنی سایت بستگی دارد.'
    },
    {
      question: 'آیا برای توسعه وب‌سایت فقط از وردپرس استفاده می‌کنید؟',
      answer: 'خیر، ما از طیف گسترده‌ای از فناوری‌ها متناسب با نیازهای پروژه شما استفاده می‌کنیم. در کنار وردپرس، تیم ما در توسعه با React، Next.js، Node.js، پایتون (Django/Flask) و سایر فریم‌ورک‌های مدرن تخصص دارد. ما تکنولوژی مناسب را بر اساس الزامات خاص پروژه شما پیشنهاد می‌دهیم.'
    },
    {
      question: 'آیا از روش‌های سئو کلاه سیاه استفاده می‌کنید؟',
      answer: 'به هیچ وجه. ما فقط از تکنیک‌های سئو کلاه سفید و روش‌های اخلاقی مطابق با دستورالعمل‌های گوگل استفاده می‌کنیم. استراتژی‌های ما بر توسعه محتوای با کیفیت، تجربه کاربری عالی و بهینه‌سازی فنی تمرکز دارد. استفاده از روش‌های غیراخلاقی ممکن است نتایج کوتاه‌مدتی داشته باشد، اما در نهایت منجر به جریمه و آسیب دیدن کسب و کار شما خواهد شد.'
    },
    {
      question: 'آیا برای سایت‌های چندزبانه هم خدمات ارائه می‌دهید؟',
      answer: 'بله، ما در طراحی و بهینه‌سازی وب‌سایت‌های چندزبانه تخصص داریم. تیم ما می‌تواند راهکارهای فنی مناسب برای پیاده‌سازی سایت چندزبانه، از جمله ساختار URL مناسب، تگ‌های hreflang و ترجمه محتوا را ارائه دهد. ما تجربه خاصی در بهینه‌سازی سایت‌های فارسی-انگلیسی داریم.'
    },
    {
      question: 'آیا پس از تحویل پروژه، خدمات پشتیبانی هم ارائه می‌دهید؟',
      answer: 'بله، ما بسته‌های پشتیبانی مختلفی ارائه می‌دهیم تا اطمینان حاصل کنیم وب‌سایت شما همیشه به روز، امن و بهینه باقی می‌ماند. این خدمات شامل به‌روزرسانی‌های امنیتی، پشتیبان‌گیری منظم، بهینه‌سازی عملکرد، به‌روزرسانی محتوا و رفع اشکالات فنی است. ما همچنین آموزش‌های لازم را برای مدیریت سایت به تیم شما ارائه می‌دهیم.'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات تخصصی سئو و توسعه وب | وب آ ب ث" 
        description="ارائه خدمات حرفه‌ای سئو فنی، سئو محتوا، سئو محلی و توسعه وب‌سایت با استفاده از WordPress، React، Next.js، و فناوری‌های پیشرفته" 
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
                خدمات <span className="text-primary">سئو</span> و <span className="text-primary">توسعه وب</span> حرفه‌ای
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                راهکارهای جامع دیجیتال مارکتینگ برای رشد کسب و کار شما. با استفاده از جدیدترین تکنولوژی‌ها و روش‌های به روز، وب‌سایت شما را به ابزاری قدرتمند برای جذب مشتری تبدیل می‌کنیم.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#seo-services" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  خدمات سئو
                </a>
                <a 
                  href="#webdev-services" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  خدمات توسعه وب
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Services Section */}
        <section 
          id="seo-services" 
          ref={seoRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو تخصصی
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو</span> و بهینه‌سازی موتورهای جستجو
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما با استفاده از روش‌های اصولی و استاندارد، رتبه وب‌سایت شما را در موتورهای جستجو بهبود می‌بخشیم. هدف ما افزایش ترافیک هدفمند، بهبود نرخ تبدیل و ایجاد حضور آنلاین قدرتمند برای کسب و کار شماست.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {seoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-4 text-sm">{service.description}</p>
                  
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
        
        {/* Web Development Services Section */}
        <section 
          id="webdev-services" 
          ref={webdevRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {webdevServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section 
          id="faq" 
          ref={faqRef}
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
                در اینجا به برخی از سؤالات متداول درباره خدمات سئو و توسعه وب ما پاسخ داده‌ایم. اگر سؤال دیگری دارید، لطفاً با ما تماس بگیرید.
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
                آماده‌اید کسب و کار خود را متحول کنید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره نیازهای خاص پروژه شما گفتگو کنیم و راهکاری متناسب با اهداف کسب و کار شما ارائه دهیم.
              </p>
              
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان
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

export default Services;
