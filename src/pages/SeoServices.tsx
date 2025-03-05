
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SeoServices = () => {
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
      icon: '🔧',
      id: 'technical-seo'
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
      icon: '📝',
      id: 'content-seo'
    },
    {
      title: 'سئو خارجی',
      description: 'ایجاد پروفایل لینک قدرتمند با استراتژی لینک‌سازی اصولی و طبیعی برای افزایش اعتبار سایت',
      features: [
        'تحلیل پروفایل لینک فعلی',
        'شناسایی فرصت‌های لینک‌سازی با کیفیت',
        'تولید محتوای قابل لینک‌دهی',
        'لینک‌سازی از سایت‌های معتبر مرتبط',
        'پایش و خنثی‌سازی لینک‌های مخرب',
        'گزارش‌های دوره‌ای پیشرفت'
      ],
      icon: '🔗',
      id: 'off-page-seo'
    },
    {
      title: 'سئو تکنیکال پیشرفته',
      description: 'راهکارهای پیشرفته سئو فنی برای سایت‌های بزرگ و پیچیده با چالش‌های خاص',
      features: [
        'بهینه‌سازی JavaScript برای موتورهای جستجو',
        'رفع مشکلات Rendering و Indexing',
        'پیاده‌سازی پیشرفته Structured Data',
        'بهینه‌سازی سایت‌های چندزبانه',
        'تحلیل و رفع مشکلات فنی پیچیده',
        'بهینه‌سازی فنی فروشگاه‌های آنلاین'
      ],
      icon: '⚙️',
      id: 'advanced-technical-seo'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'سئو فنی چه تاثیری بر رتبه‌بندی سایت دارد؟',
      answer: 'سئو فنی پایه و اساس بهینه‌سازی برای موتورهای جستجو است. موتورهای جستجو مانند گوگل به سایت‌هایی که از نظر فنی بهینه هستند، سریع بارگذاری می‌شوند و تجربه کاربری خوبی ارائه می‌دهند، امتیاز بالاتری می‌دهند. مشکلات فنی می‌تواند مانع خزش و ایندکس صفحات شما شود و رتبه‌بندی سایت را به شدت کاهش دهد، حتی اگر محتوای شما عالی باشد.'
    },
    {
      question: 'چرا تولید محتوای اصیل برای سئو مهم است؟',
      answer: 'محتوای اصیل و با کیفیت یکی از مهم‌ترین فاکتورهای رتبه‌بندی در الگوریتم‌های جدید گوگل است. محتوای اصیل باعث می‌شود کاربران زمان بیشتری را در سایت شما صرف کنند، نرخ بازگشت پایین‌تری داشته باشید و از همه مهم‌تر، گوگل سایت شما را به عنوان یک منبع معتبر در حوزه‌ کاری‌تان شناسایی کند. محتوای کپی شده یا کم ارزش می‌تواند منجر به جریمه الگوریتمی و افت شدید رتبه شود.'
    },
    {
      question: 'استراتژی لینک‌سازی خارجی چگونه باید باشد؟',
      answer: 'یک استراتژی لینک‌سازی موفق باید طبیعی، تدریجی و مرتبط با حوزه کاری شما باشد. کیفیت لینک‌ها بسیار مهم‌تر از تعداد آنهاست. لینک‌های با کیفیت از سایت‌های معتبر و مرتبط با کسب و کار شما هستند. از تکنیک‌های کلاه سیاه مانند خرید لینک انبوه یا شبکه‌های لینک خصوصی باید اجتناب کرد، زیرا می‌توانند منجر به جریمه الگوریتمی شوند.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج سئو را ببینیم؟',
      answer: 'سئو یک فرآیند بلندمدت است و نتایج آن معمولاً در بازه 3 تا 6 ماه شروع به نمایان شدن می‌کند. برای کلمات کلیدی رقابتی، این زمان می‌تواند به 6 تا 12 ماه افزایش یابد. موفقیت در سئو به عوامل مختلفی مانند سن دامنه، سطح رقابت در صنعت شما، کیفیت محتوا و اقتدار دامنه فعلی شما بستگی دارد. صبر و پایبندی به استراتژی‌های درست کلید موفقیت در سئو است.'
    },
    {
      question: 'آیا برای سایت‌های وردپرسی سئو متفاوت است؟',
      answer: 'اصول پایه‌ای سئو برای همه سایت‌ها یکسان است، اما وردپرس ابزارها و افزونه‌های اختصاصی برای بهینه‌سازی دارد که می‌تواند فرآیند را ساده‌تر کند. سایت‌های وردپرسی نیز چالش‌های خاص خود مانند افزونه‌های زیاد، کدهای اضافی و مسائل امنیتی را دارند که باید به درستی مدیریت شوند. ما در تیم خود متخصصان وردپرس داریم که می‌توانند سایت وردپرسی شما را به صورت تخصصی بهینه‌سازی کنند.'
    },
    {
      question: 'چرا باید خدمات سئو را برون‌سپاری کنم؟',
      answer: 'سئو یک تخصص پیچیده و در حال تغییر است که نیاز به دانش عمیق، تجربه و زمان کافی دارد. یک تیم متخصص سئو دسترسی به ابزارهای حرفه‌ای، دانش به‌روز از الگوریتم‌های جدید و تجربه کار با سایت‌های مختلف را دارد. برون‌سپاری سئو به متخصصان به شما امکان می‌دهد بر روی اصل کسب و کار خود تمرکز کنید، در حالی که حضور آنلاین شما به طور حرفه‌ای مدیریت می‌شود.'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات تخصصی سئو و بهینه‌سازی سایت | وب آ ب ث" 
        description="ارائه خدمات حرفه‌ای سئو فنی، سئو محتوا، سئو خارجی، و استراتژی‌های پیشرفته بهینه‌سازی موتورهای جستجو برای کسب و کارهای ایرانی" 
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
                خدمات <span className="text-primary">سئو</span> و بهینه‌سازی <span className="text-primary">موتورهای جستجو</span>
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                با استفاده از جدیدترین استراتژی‌های سئو و بهینه‌سازی، رتبه وب‌سایت شما را در موتورهای جستجو افزایش می‌دهیم و ترافیک هدفمند و مشتریان بالقوه بیشتری برای کسب و کار شما جذب می‌کنیم.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#technical-seo" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سئو فنی
                </a>
                <a 
                  href="#content-seo" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سئو محتوا
                </a>
                <a 
                  href="#off-page-seo" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سئو خارجی
                </a>
              </div>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          </div>
        </section>
        
        {/* SEO Services Section */}
        <section 
          id="seo-services" 
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  id={service.id}
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
        
        {/* Process Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                روش کار ما
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                فرآیند <span className="text-primary">بهینه‌سازی</span> سایت شما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما یک رویکرد سیستماتیک و شفاف برای پروژه‌های سئو داریم تا اطمینان حاصل کنیم که همه جنبه‌های سایت شما به درستی بهینه‌سازی می‌شوند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-on-scroll opacity-0">
              {[
                {
                  step: '۱',
                  title: 'تحلیل و بررسی',
                  description: 'بررسی دقیق وضعیت فعلی سایت، رقبا، کلمات کلیدی و شناسایی فرصت‌ها و چالش‌ها.'
                },
                {
                  step: '۲',
                  title: 'استراتژی و برنامه‌ریزی',
                  description: 'تدوین استراتژی اختصاصی سئو بر اساس نیازهای کسب و کار و اهداف شما.'
                },
                {
                  step: '۳',
                  title: 'اجرا و پیاده‌سازی',
                  description: 'پیاده‌سازی تغییرات فنی، بهینه‌سازی محتوا و اجرای استراتژی‌های لینک‌سازی.'
                },
                {
                  step: '۴',
                  title: 'پایش و بهبود مستمر',
                  description: 'بررسی مداوم نتایج، تحلیل داده‌ها و بهینه‌سازی استراتژی برای بهبود عملکرد.'
                }
              ].map((item, idx) => (
                <div key={idx} className="glass-morphism p-6 rounded-xl text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section 
          id="faq" 
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
                در اینجا به برخی از سؤالات متداول درباره خدمات سئو و بهینه‌سازی موتورهای جستجو پاسخ داده‌ایم.
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
        
        {/* Related Services Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll opacity-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                خدمات <span className="text-primary">مرتبط</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-on-scroll opacity-0">
              <a 
                href="/local-seo-services" 
                className="neo-morphism p-6 rounded-xl flex items-start gap-4 transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    خدمات سئو محلی
                    <ExternalLink className="w-4 h-4 mr-1 inline-block" />
                  </h3>
                  <p className="text-foreground/70">
                    بهینه‌سازی کسب و کار شما برای جستجوهای محلی و افزایش حضور در نتایج محلی گوگل
                  </p>
                </div>
              </a>
              
              <a 
                href="/web-development-services" 
                className="neo-morphism p-6 rounded-xl flex items-start gap-4 transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span className="text-3xl">💻</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    خدمات توسعه وب
                    <ExternalLink className="w-4 h-4 mr-1 inline-block" />
                  </h3>
                  <p className="text-foreground/70">
                    طراحی و توسعه وب‌سایت‌های مدرن، سریع و بهینه‌شده برای موتورهای جستجو
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید رتبه وب‌سایت خود را افزایش دهید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره نیازهای خاص کسب و کار شما گفتگو کنیم و راهکاری متناسب ارائه دهیم.
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

export default SeoServices;
