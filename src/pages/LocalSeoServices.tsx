
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ExternalLink, MapPin, Star, Building, Award, Users } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LocalSeoServices = () => {
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

  // Local SEO Services Data
  const localSeoServices = [
    {
      title: 'بهینه‌سازی گوگل بیزینس پروفایل',
      description: 'بهینه‌سازی و مدیریت حرفه‌ای پروفایل گوگل بیزینس شما برای بهبود حضور در نتایج جستجوی محلی و Google Maps',
      features: [
        'تکمیل و بهینه‌سازی اطلاعات پروفایل',
        'بارگذاری تصاویر و ویدیوهای با کیفیت',
        'مدیریت و پاسخگویی به نظرات مشتریان',
        'به‌روزرسانی منظم محصولات و خدمات',
        'ایجاد پست‌های منظم در پروفایل',
        'بهینه‌سازی مبتنی بر کلمات کلیدی محلی'
      ],
      icon: <Building className="h-10 w-10 text-primary" />,
      id: 'google-business-profile'
    },
    {
      title: 'سئو محلی وب‌سایت',
      description: 'بهینه‌سازی وب‌سایت شما برای جستجوهای محلی و افزایش ترافیک هدفمند از مناطق جغرافیایی مورد نظر',
      features: [
        'تحقیق کلمات کلیدی محلی',
        'بهینه‌سازی محتوا برای جستجوهای محلی',
        'ایجاد و بهینه‌سازی صفحات منطقه‌ای (Landing Pages)',
        'پیاده‌سازی Schema Markup محلی',
        'بهینه‌سازی نقشه و اطلاعات تماس سایت',
        'بهینه‌سازی برای جستجوهای موبایل محلی (Near Me)'
      ],
      icon: <MapPin className="h-10 w-10 text-primary" />,
      id: 'local-seo-website'
    },
    {
      title: 'مدیریت نظرات و شهرت آنلاین',
      description: 'مدیریت حرفه‌ای نظرات و شهرت آنلاین کسب و کار شما در پلتفرم‌های مختلف برای افزایش اعتماد مشتریان',
      features: [
        'استراتژی جمع‌آوری نظرات مثبت از مشتریان',
        'مدیریت و پاسخگویی به نظرات مثبت و منفی',
        'پایش مداوم شهرت آنلاین در پلتفرم‌های مختلف',
        'بهبود امتیاز ستاره‌ای کسب و کار',
        'ارائه گزارش‌های تحلیلی نظرات و شهرت آنلاین',
        'آموزش تیم شما برای مدیریت نظرات'
      ],
      icon: <Star className="h-10 w-10 text-primary" />,
      id: 'review-management'
    },
    {
      title: 'ثبت و مدیریت Citations',
      description: 'ایجاد و مدیریت Citations یکپارچه و با کیفیت در دایرکتوری‌ها و پلتفرم‌های محلی برای تقویت سئو محلی',
      features: [
        'شناسایی و ثبت در دایرکتوری‌های معتبر محلی',
        'ایجاد Citations یکپارچه و دقیق (NAP)',
        'بهینه‌سازی پروفایل‌ها در پلتفرم‌های مختلف',
        'اصلاح Citations نادرست موجود',
        'پایش مداوم و به‌روزرسانی اطلاعات کسب و کار',
        'ایجاد Citation های صنعتی تخصصی'
      ],
      icon: <Award className="h-10 w-10 text-primary" />,
      id: 'citation-management'
    }
  ];

  // Local SEO FAQ Data
  const faqs = [
    {
      question: 'سئو محلی چیست و چرا برای کسب و کار من مهم است؟',
      answer: 'سئو محلی مجموعه‌ای از تکنیک‌ها برای بهینه‌سازی حضور آنلاین کسب و کارهای محلی است. این استراتژی‌ها به شما کمک می‌کنند در جستجوهای محلی مانند "رستوران نزدیک من" یا "فروشگاه موبایل در تهران" بهتر دیده شوید. امروزه بیش از 46٪ جستجوها در گوگل هدف محلی دارند و 88٪ کاربرانی که جستجوی محلی انجام می‌دهند، در همان روز با آن کسب و کار تماس می‌گیرند یا به آن مراجعه می‌کنند. اگر کسب و کار شما مشتریان محلی دارد، سئو محلی یکی از مؤثرترین راه‌های جذب مشتریان جدید است.'
    },
    {
      question: 'گوگل بیزینس پروفایل چیست و چگونه به کسب و کار من کمک می‌کند؟',
      answer: 'گوگل بیزینس پروفایل (Google Business Profile یا همان Google My Business سابق) یک ابزار رایگان از گوگل است که به کسب و کارها اجازه می‌دهد حضور خود را در جستجوی گوگل و Google Maps مدیریت کنند. با ایجاد و بهینه‌سازی این پروفایل، کسب و کار شما می‌تواند در جستجوهای محلی و نقشه گوگل نمایش داده شود، اطلاعات مهم مانند ساعات کاری، آدرس، شماره تلفن و عکس‌ها را نمایش دهد، نظرات مشتریان را دریافت کند و با آنها تعامل داشته باشد. کسب و کارهایی که پروفایل گوگل بیزینس بهینه‌شده دارند، 7 برابر بیشتر مورد بازدید قرار می‌گیرند و 70٪ احتمال بیشتری دارد که مشتریان از آنها خرید کنند.'
    },
    {
      question: 'Citation چیست و چرا برای سئو محلی مهم است؟',
      answer: 'Citation به هر اشاره‌ای به نام، آدرس و شماره تلفن (NAP) کسب و کار شما در وب گفته می‌شود، مانند ثبت‌نام در دایرکتوری‌های آنلاین، سایت‌های نظرات، اپلیکیشن‌های نقشه و غیره. Citations یکی از مهم‌ترین فاکتورهای رتبه‌بندی در سئو محلی هستند. گوگل از این اشارات برای تأیید اعتبار و موقعیت کسب و کار شما استفاده می‌کند. هرچه تعداد Citations معتبر و یکپارچه بیشتر باشد، اعتماد گوگل به کسب و کار شما بیشتر می‌شود. مهم است که اطلاعات NAP شما در تمام Citations یکسان باشد، زیرا تناقض می‌تواند به رتبه شما آسیب برساند.'
    },
    {
      question: 'چرا مدیریت نظرات آنلاین برای سئو محلی مهم است؟',
      answer: 'نظرات آنلاین یکی از مهم‌ترین فاکتورهای رتبه‌بندی در سئو محلی و همچنین یک عامل کلیدی در تصمیم‌گیری مشتریان هستند. 88٪ مصرف‌کنندگان به نظرات آنلاین به اندازه توصیه‌های شخصی اعتماد می‌کنند. گوگل از کمیت، کیفیت و تازگی نظرات به عنوان سیگنال‌های رتبه‌بندی استفاده می‌کند. پاسخ دادن به نظرات (چه مثبت و چه منفی) نشان‌دهنده تعهد شما به خدمات مشتری است و می‌تواند نرخ تبدیل را تا 85٪ افزایش دهد. مدیریت فعال نظرات همچنین به شما کمک می‌کند مشکلات را شناسایی و برطرف کنید و تجربه مشتری را بهبود بخشید.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج سئو محلی را ببینیم؟',
      answer: 'سئو محلی معمولاً سریع‌تر از سئو عمومی نتیجه می‌دهد، اما باز هم یک استراتژی بلندمدت است. بسته به رقابت در منطقه و صنعت شما، وضعیت فعلی حضور آنلاین شما و میزان تلاش‌های انجام شده، می‌توانید انتظار داشته باشید که برخی نتایج اولیه را در 1-3 ماه مشاهده کنید. بهبود قابل توجه در رتبه‌بندی‌های محلی معمولاً در 3-6 ماه اتفاق می‌افتد. برخی اقدامات مانند بهینه‌سازی گوگل بیزینس پروفایل می‌تواند نتایج سریع‌تری (حتی در عرض چند هفته) داشته باشد، در حالی که ساخت Citations با کیفیت و کسب نظرات مثبت زمان بیشتری می‌برد.'
    },
    {
      question: 'آیا سئو محلی برای کسب و کارهایی که فقط به صورت آنلاین فعالیت می‌کنند نیز مهم است؟',
      answer: 'اگرچه سئو محلی عمدتاً برای کسب و کارهایی که دارای موقعیت فیزیکی هستند یا در مناطق جغرافیایی خاصی خدمات ارائه می‌دهند مفید است، اما کسب و کارهای آنلاین نیز می‌توانند از برخی استراتژی‌های سئو محلی بهره ببرند. اگر کسب و کار آنلاین شما به یک منطقه خاص خدمات می‌دهد (مثلاً فروشگاه آنلاینی که فقط در تهران ارسال رایگان دارد)، می‌توانید با ایجاد محتوای مرتبط با آن منطقه و هدف‌گیری کلمات کلیدی محلی، ترافیک هدفمند بیشتری جذب کنید. همچنین، حتی کسب و کارهای کاملاً آنلاین می‌توانند از ایجاد یک صفحه "درباره ما" با اطلاعات محلی و پیاده‌سازی Schema Markup مناسب بهره ببرند.'
    }
  ];

  // Success Stories
  const successStories = [
    {
      business: 'رستوران سنتی شمیران',
      results: [
        'افزایش ۱۸۰٪ در نمایش در نتایج محلی گوگل',
        'افزایش ۶۵٪ در تماس‌های تلفنی از طریق گوگل',
        'بهبود رتبه از ستاره ۳.۲ به ۴.۷ در گوگل'
      ]
    },
    {
      business: 'کلینیک دندانپزشکی مدرن',
      results: [
        'افزایش ۲۲۰٪ در جستجوهای محلی مرتبط',
        'افزایش ۹۰٪ در رزرو آنلاین وقت ملاقات',
        'رتبه اول در جستجوی "دندانپزشک نزدیک من"'
      ]
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات سئو محلی و بهینه‌سازی گوگل بیزینس | وب آ ب ث" 
        description="افزایش حضور کسب و کار شما در جستجوهای محلی گوگل با خدمات تخصصی سئو محلی، بهینه‌سازی گوگل بیزینس پروفایل و مدیریت Citations" 
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
                خدمات <span className="text-primary">سئو محلی</span> و بهینه‌سازی <span className="text-primary">گوگل بیزینس</span>
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                با افزایش حضور کسب و کار خود در جستجوهای محلی گوگل و Google Maps، مشتریان بیشتری را در منطقه خود جذب کنید و فروش خود را افزایش دهید.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#google-business-profile" 
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  گوگل بیزینس پروفایل
                </a>
                <a 
                  href="#citation-management" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  مدیریت Citations
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
        
        {/* Local SEO Services Section */}
        <section 
          id="local-seo-services" 
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو محلی
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو محلی</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما راهکارهای جامع سئو محلی را ارائه می‌دهیم تا کسب و کار شما در جستجوهای محلی و Google Maps بهتر دیده شود و مشتریان بیشتری را جذب کنید.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {localSeoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  id={service.id}
                  className="neo-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
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
        
        {/* Google Business Profile Deep Dive */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  اهمیت گوگل بیزینس پروفایل
                </span>
                
                <h2 className="text-3xl font-bold mb-6">
                  چرا <span className="text-primary">گوگل بیزینس پروفایل</span> برای کسب و کار شما ضروری است؟
                </h2>
                
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  گوگل بیزینس پروفایل (Google Business Profile) پنجره‌ای رایگان به دنیای دیجیتال برای کسب و کار شماست. این ابزار قدرتمند به شما امکان می‌دهد:
                </p>
                
                <ul className="space-y-4">
                  {[
                    'در جعبه دانش گوگل و نقشه گوگل نمایش داده شوید',
                    'اطلاعات مهم کسب و کار خود را به مشتریان نشان دهید',
                    'نظرات مشتریان را مدیریت کنید و اعتبار خود را افزایش دهید',
                    'آمار و تحلیل‌های مفیدی از تعاملات مشتریان دریافت کنید',
                    'محصولات و خدمات خود را مستقیماً در گوگل نمایش دهید',
                    'پست‌های تبلیغاتی و اطلاع‌رسانی منتشر کنید'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-100 rounded-2xl p-6 animate-on-scroll opacity-0">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="font-persian text-muted-foreground">
                    تصویر نمونه گوگل بیزینس پروفایل
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                داستان‌های موفقیت
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                نتایج <span className="text-primary">واقعی</span> برای کسب و کارهای واقعی
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                مشتریان ما با استفاده از خدمات سئو محلی ما به نتایج قابل توجهی دست یافته‌اند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {successStories.map((story, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center mb-6">
                    <Users className="h-10 w-10 text-primary mr-4" />
                    <h3 className="text-xl font-bold">{story.business}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {story.results.map((result, ridx) => (
                      <li key={ridx} className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{result}</span>
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
                در اینجا به برخی از سؤالات متداول درباره خدمات سئو محلی و بهینه‌سازی گوگل بیزینس پروفایل پاسخ داده‌ایم.
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
                href="/seo-services" 
                className="neo-morphism p-6 rounded-xl flex items-start gap-4 transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span className="text-3xl">🔍</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    خدمات سئو و بهینه‌سازی
                    <ExternalLink className="w-4 h-4 mr-1 inline-block" />
                  </h3>
                  <p className="text-foreground/70">
                    بهینه‌سازی وب‌سایت شما برای موتورهای جستجو و افزایش ترافیک هدفمند
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
                آماده‌اید حضور محلی خود را تقویت کنید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره راهکارهای سئو محلی متناسب با کسب و کار شما صحبت کنیم.
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

export default LocalSeoServices;
