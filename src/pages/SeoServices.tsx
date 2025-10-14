
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { CheckCircle, Settings, FileText, Link, ArrowRight, Globe, Code, BarChart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SeoServices = () => {
  const technicalSeoRef = useRef<HTMLDivElement>(null);
  const contentSeoRef = useRef<HTMLDivElement>(null);
  const externalSeoRef = useRef<HTMLDivElement>(null);
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
  const technicalSeoServices = [
    {
      title: 'تحلیل فنی سایت',
      description: 'بررسی جامع وضعیت فنی وب‌سایت و شناسایی مشکلات تأثیرگذار بر عملکرد و رتبه‌بندی',
      features: [
        'بررسی سرعت بارگذاری صفحات',
        'تحلیل ساختار URL و معماری سایت',
        'بررسی خطاهای خزش و ایندکس‌گذاری',
        'ارزیابی نسخه موبایل سایت',
        'تحلیل کدهای HTTP و ریدایرکت‌ها',
        'بررسی ساختار لینک‌های داخلی'
      ],
      icon: <Code className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی سرعت سایت',
      description: 'افزایش سرعت بارگذاری صفحات و بهبود شاخص‌های Core Web Vitals برای تجربه کاربری بهتر',
      features: [
        'بهینه‌سازی تصاویر و فایل‌های چندرسانه‌ای',
        'فشرده‌سازی و کاهش حجم کدها (CSS/JS)',
        'پیکربندی کش مرورگر و سرور',
        'بهینه‌سازی Render-Blocking Resources',
        'پیاده‌سازی فناوری‌های AMP و Lazy Loading',
        'تنظیم CDN برای بارگذاری سریع‌تر'
      ],
      icon: <BarChart className="h-10 w-10 text-primary" />
    },
    {
      title: 'پیاده‌سازی اسکیما مارکاپ',
      description: 'استفاده از داده‌های ساختاریافته برای کمک به موتورهای جستجو در درک بهتر محتوای سایت',
      features: [
        'پیاده‌سازی Schema.org برای انواع محتوا',
        'اسکیمای محصولات و خدمات',
        'اسکیمای نتایج سوالات متداول',
        'اسکیمای مقالات و محتوای آموزشی',
        'اسکیمای نقد و بررسی و امتیازدهی',
        'تست و اعتبارسنجی داده‌های ساختاریافته'
      ],
      icon: <Settings className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی سئو تکنیکال وردپرس',
      description: 'تنظیمات و بهینه‌سازی‌های تخصصی برای سایت‌های وردپرسی جهت عملکرد بهینه در موتورهای جستجو',
      features: [
        'پیکربندی افزونه‌های سئو (Yoast، Rank Math و...)',
        'تنظیم XML Sitemap و robots.txt',
        'بهینه‌سازی دیتابیس و پاکسازی کدهای اضافی',
        'رفع مشکلات کاستوم پست تایپ‌ها و تکسونومی‌ها',
        'بهینه‌سازی ناوبری و ساختار لینک داخلی',
        'افزایش امنیت و پایداری سایت'
      ],
      icon: <Settings className="h-10 w-10 text-primary" />
    }
  ];

  // Content SEO Services
  const contentSeoServices = [
    {
      title: 'تحقیق کلمات کلیدی',
      description: 'شناسایی و تحلیل کلمات کلیدی مرتبط با کسب و کار شما برای استفاده در استراتژی محتوا',
      features: [
        'تحقیق کلمات کلیدی با حجم جستجوی بالا',
        'شناسایی کلمات کلیدی دم بلند با رقابت کمتر',
        'تحلیل کلمات کلیدی رقبا',
        'گروه‌بندی و اولویت‌بندی کلمات کلیدی',
        'تحلیل نیت جستجو (Search Intent)',
        'ارائه گزارش و نقشه راه کلمات کلیدی'
      ],
      icon: <FileText className="h-10 w-10 text-primary" />
    },
    {
      title: 'تولید محتوای سئو محور',
      description: 'ایجاد محتوای با کیفیت و بهینه‌سازی شده برای موتورهای جستجو و کاربران',
      features: [
        'تولید محتوای اصیل و منحصر به فرد',
        'بهینه‌سازی عناوین و متاتگ‌ها',
        'ساختاربندی محتوا با استفاده از تگ‌های H1 تا H6',
        'بهینه‌سازی تصاویر و عناصر چندرسانه‌ای',
        'استفاده از لینک‌های داخلی و خارجی مرتبط',
        'به‌روزرسانی منظم محتوای قدیمی'
      ],
      icon: <FileText className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی صفحات اصلی',
      description: 'بهینه‌سازی صفحات مهم و استراتژیک سایت برای افزایش نرخ تبدیل و بهبود رتبه در گوگل',
      features: [
        'بهینه‌سازی صفحه اصلی',
        'بهینه‌سازی صفحات محصولات و خدمات',
        'بهینه‌سازی صفحات فرود (Landing Pages)',
        'بهینه‌سازی صفحات دسته‌بندی و آرشیو',
        'بهینه‌سازی صفحات درباره ما و تماس با ما',
        'ارزیابی و بهبود نرخ تبدیل (CRO)'
      ],
      icon: <FileText className="h-10 w-10 text-primary" />
    },
    {
      title: 'تدوین استراتژی محتوا',
      description: 'طراحی و اجرای برنامه محتوایی بلندمدت برای پوشش کامل نیازهای مخاطبان و کلمات کلیدی هدف',
      features: [
        'تحلیل مخاطبان هدف و نیازهای آنها',
        'ایجاد تقویم محتوایی منظم',
        'طراحی استراتژی پیلار کانتنت (Pillar Content)',
        'برنامه‌ریزی وبلاگ و محتوای آموزشی',
        'تولید محتوای موردنیاز در مراحل مختلف قیف فروش',
        'اندازه‌گیری و گزارش‌دهی عملکرد محتوا'
      ],
      icon: <FileText className="h-10 w-10 text-primary" />
    }
  ];

  // External SEO Services
  const externalSeoServices = [
    {
      title: 'لینک‌سازی طبیعی',
      description: 'ایجاد پروفایل لینک قدرتمند و طبیعی از سایت‌های معتبر و مرتبط',
      features: [
        'تحلیل پروفایل لینک فعلی و بک‌لینک‌های رقبا',
        'شناسایی فرصت‌های لینک‌سازی با کیفیت',
        'تولید محتوای قابل لینک‌دهی (Linkable Assets)',
        'ایجاد بک‌لینک از سایت‌های معتبر و مرتبط',
        'مدیریت بک‌لینک‌های سمی و Disavow',
        'گزارش‌های دوره‌ای پیشرفت لینک‌سازی'
      ],
      icon: <Link className="h-10 w-10 text-primary" />
    },
    {
      title: 'بازاریابی محتوایی',
      description: 'ترویج محتوای سایت در پلتفرم‌های مختلف برای افزایش ترافیک و جذب لینک طبیعی',
      features: [
        'انتشار محتوا در رسانه‌های آنلاین مرتبط',
        'مشارکت در انجمن‌ها و اجتماعات تخصصی',
        'همکاری با اینفلوئنسرها و کارشناسان صنعت',
        'استفاده از پلتفرم‌های اشتراک‌گذاری محتوا',
        'خبرنامه‌های ایمیلی و بازاریابی ایمیلی',
        'بازاریابی شبکه‌های اجتماعی محتوا'
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: 'مدیریت اعتبار آنلاین',
      description: 'بهبود اعتبار برند در فضای آنلاین از طریق مدیریت نظرات، بررسی‌ها و حضور در رسانه‌ها',
      features: [
        'مانیتورینگ نام برند در موتورهای جستجو',
        'مدیریت نظرات و بررسی‌های آنلاین',
        'پاسخگویی به نظرات منفی و مثبت',
        'ایجاد محتوای مثبت برای صفحه اول گوگل',
        'همکاری با سایت‌های خبری و رسانه‌ای',
        'تحلیل و گزارش‌دهی وضعیت اعتبار آنلاین'
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: 'همکاری با تولیدکنندگان محتوا',
      description: 'ایجاد ارتباط با وبلاگ‌نویسان، سایت‌های خبری و تولیدکنندگان محتوا برای افزایش دید آنلاین',
      features: [
        'شناسایی سایت‌ها و وبلاگ‌های مرتبط با صنعت',
        'ارائه محتوای مهمان با کیفیت (Guest Posting)',
        'مصاحبه‌ها و نظرات کارشناسی در رسانه‌ها',
        'برنامه‌های همکاری محتوایی با سایت‌های مکمل',
        'معرفی محصولات و خدمات به بررسی‌کنندگان',
        'برنامه‌های سفیران برند آنلاین'
      ],
      icon: <Link className="h-10 w-10 text-primary" />
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'سئو چیست و چرا برای کسب و کار من مهم است؟',
      answer: 'سئو (بهینه‌سازی موتورهای جستجو) مجموعه‌ای از تکنیک‌ها برای بهبود رتبه وب‌سایت شما در نتایج موتورهای جستجو است. اهمیت سئو در این است که بیش از 70% مشتریان بالقوه، جستجو در گوگل را اولین قدم برای یافتن محصولات و خدمات می‌دانند. با سئو درست، ترافیک هدفمند به سایت شما هدایت می‌شود که منجر به افزایش فروش، شناخت برند و اعتماد مشتریان می‌گردد.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج سئو را ببینیم؟',
      answer: 'سئو یک فرآیند مداوم و بلندمدت است. معمولاً شما می‌توانید برخی تغییرات اولیه را در 3-4 ماه اول مشاهده کنید، اما نتایج قابل توجه و پایدار معمولاً بین 6 تا 12 ماه زمان می‌برد. این زمان‌بندی به عوامل مختلفی مانند رقابت، سن دامنه، کیفیت محتوا و ساختار فنی سایت بستگی دارد.'
    },
    {
      question: 'تفاوت سئو فنی، سئو محتوا و سئو خارجی چیست؟',
      answer: 'سئو فنی بر بهینه‌سازی زیرساخت‌های فنی وب‌سایت تمرکز دارد تا موتورهای جستجو بتوانند سایت را بهتر بخزند و ایندکس کنند. سئو محتوا شامل تولید و بهینه‌سازی محتوای با کیفیت مطابق با نیاز کاربران و موتورهای جستجو است. سئو خارجی به استراتژی‌های افزایش اعتبار دامنه از طریق دریافت لینک از سایت‌های دیگر و ایجاد حضور قوی در فضای آنلاین اشاره دارد. هر سه بخش برای موفقیت در سئو ضروری هستند.'
    },
    {
      question: 'آیا سئو فقط مربوط به گوگل است یا برای موتورهای جستجوی دیگر هم کار می‌کند؟',
      answer: 'اگرچه بیشتر تلاش‌های سئو بر روی گوگل به عنوان بزرگترین موتور جستجو متمرکز است، اما اصول سئو برای سایر موتورهای جستجو مانند بینگ، یاهو و موتورهای جستجوی محلی نیز کاربرد دارد. استراتژی‌های سئوی خوب معمولاً باعث بهبود رتبه‌بندی در تمام موتورهای جستجو می‌شود، اگرچه ممکن است برخی تفاوت‌های جزئی در الگوریتم‌های آنها وجود داشته باشد.'
    },
    {
      question: 'آیا می‌توانم سئو را خودم انجام دهم یا باید با یک شرکت متخصص همکاری کنم؟',
      answer: 'بله، می‌توانید برخی اصول اولیه سئو را خودتان اجرا کنید، اما سئو حرفه‌ای نیاز به دانش تخصصی، تجربه و ابزارهای پیشرفته دارد. شرکت‌های متخصص سئو می‌توانند استراتژی‌های پیچیده‌تر و مؤثرتری را پیاده‌سازی کنند و از روندهای جدید و تغییرات الگوریتم‌ها آگاه باشند. بسته به اندازه کسب و کار، رقابت در صنعت و اهداف شما، همکاری با متخصصان می‌تواند بازگشت سرمایه بهتری داشته باشد.'
    },
    {
      question: 'آیا از روش‌های سئو کلاه سیاه استفاده می‌کنید؟',
      answer: 'خیر، ما فقط از تکنیک‌های سئو کلاه سفید و روش‌های اخلاقی مطابق با دستورالعمل‌های گوگل استفاده می‌کنیم. استراتژی‌های ما بر توسعه محتوای با کیفیت، تجربه کاربری عالی و بهینه‌سازی فنی تمرکز دارد. استفاده از روش‌های غیراخلاقی ممکن است نتایج کوتاه‌مدتی داشته باشد، اما در نهایت منجر به جریمه و آسیب دیدن کسب و کار شما خواهد شد.'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <Helmet>
        <title>خدمات تخصصی سئو | بهینه‌سازی موتورهای جستجو</title>
        <meta name="description" content="خدمات کامل و تخصصی سئو شامل سئو فنی، سئو محتوا و سئو خارجی برای بهبود رتبه وب‌سایت شما در نتایج گوگل و افزایش ترافیک هدفمند" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content="خدمات تخصصی سئو | بهینه‌سازی موتورهای جستجو" />
        <meta property="og:description" content="خدمات کامل و تخصصی سئو شامل سئو فنی، سئو محتوا و سئو خارجی برای بهبود رتبه وب‌سایت شما در نتایج گوگل و افزایش ترافیک هدفمند" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                خدمات تخصصی سئو
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-normal">
                خدمات <span className="text-primary">سئو</span> و بهینه‌سازی موتورهای جستجو
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                با استفاده از جدیدترین تکنیک‌ها و استراتژی‌های سئو، رتبه وب‌سایت شما را در نتایج گوگل بهبود می‌دهیم و ترافیک هدفمند و با کیفیت را به کسب و کار شما هدایت می‌کنیم.
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
                  href="#external-seo" 
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سئو خارجی
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
        
        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  چرا سئو؟
                </span>
                
                <h2 className="text-3xl font-bold mb-6">
                  چرا <span className="text-primary">سئو</span> برای کسب و کار شما ضروری است؟
                </h2>
                
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  در دنیای رقابتی امروز، داشتن یک وب‌سایت به تنهایی کافی نیست. بیش از 90% تجربه آنلاین با یک جستجو در گوگل آغاز می‌شود و 75% کاربران هرگز به صفحه دوم نتایج جستجو نمی‌روند.
                </p>
                
                <ul className="space-y-3">
                  {[
                    'افزایش ترافیک ارگانیک و هدفمند به وب‌سایت',
                    'بهبود تجربه کاربری و افزایش نرخ تبدیل',
                    'افزایش اعتبار و اعتماد برند در فضای آنلاین',
                    'کاهش هزینه‌های تبلیغات کلیکی در بلندمدت',
                    'دستیابی به نتایج پایدار و بلندمدت'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mt-1 ml-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="animate-on-scroll opacity-0 delay-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">افزایش بازدید</h3>
                    <p className="text-foreground/70 text-sm">بیش از 70% کلیک‌ها در نتایج جستجو به نتایج ارگانیک تعلق دارد.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">اعتبار برند</h3>
                    <p className="text-foreground/70 text-sm">حضور در صفحه اول گوگل اعتبار و اعتماد به برند شما را افزایش می‌دهد.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">نرخ تبدیل بالاتر</h3>
                    <p className="text-foreground/70 text-sm">ترافیک ارگانیک 6 برابر بیشتر از تبلیغات کلیکی به مشتری تبدیل می‌شود.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <Link className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">ROI بالا</h3>
                    <p className="text-foreground/70 text-sm">سئو یکی از بالاترین نرخ‌های بازگشت سرمایه را در بازاریابی دیجیتال دارد.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technical SEO Services Section */}
        <section 
          id="technical-seo" 
          ref={technicalSeoRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو فنی
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو فنی</span> و بهینه‌سازی زیرساخت سایت
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سئو فنی به بهینه‌سازی جنبه‌های فنی وب‌سایت برای بهبود عملکرد و افزایش رتبه در موتورهای جستجو می‌پردازد. این بخش از سئو پایه و اساس موفقیت استراتژی سئوی شماست.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalSeoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
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
            
            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو فنی
              </a>
            </div>
          </div>
        </section>
        
        {/* Content SEO Services Section */}
        <section 
          id="content-seo" 
          ref={contentSeoRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو محتوا
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو محتوا</span> و تولید محتوای هدفمند
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                محتوا پادشاه است! سئو محتوا شامل تولید و بهینه‌سازی محتوای با کیفیت است که هم برای کاربران جذاب باشد و هم برای موتورهای جستجو قابل درک و ارزشمند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contentSeoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
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
            
            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو محتوا
              </a>
            </div>
          </div>
        </section>
        
        {/* External SEO Services Section */}
        <section 
          id="external-seo" 
          ref={externalSeoRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو خارجی
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو خارجی</span> و لینک‌سازی حرفه‌ای
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سئو خارجی به فعالیت‌های خارج از وب‌سایت شما اشاره دارد که اعتبار دامنه را افزایش می‌دهد. بک‌لینک‌های با کیفیت از سایت‌های معتبر همچنان یکی از مهم‌ترین فاکتورهای رتبه‌بندی گوگل هستند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {externalSeoServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="neo-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
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
            
            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو خارجی
              </a>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                فرایند کار
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                روند <span className="text-primary">همکاری</span> و فرایند بهینه‌سازی سئو
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما یک فرایند شفاف و منظم برای پروژه‌های سئو داریم تا اطمینان حاصل کنیم که کسب و کار شما بهترین نتایج ممکن را به دست می‌آورد.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { title: 'تحلیل اولیه', desc: 'بررسی وضعیت فعلی سایت، رقبا و فرصت‌ها', icon: <Settings className="h-6 w-6" /> },
                { title: 'استراتژی', desc: 'تدوین استراتژی سئو بر اساس اهداف کسب و کار', icon: <FileText className="h-6 w-6" /> },
                { title: 'بهینه‌سازی', desc: 'اجرای تغییرات فنی، محتوایی و خارجی', icon: <Code className="h-6 w-6" /> },
                { title: 'پایش و تحلیل', desc: 'بررسی مداوم نتایج و تنظیم استراتژی', icon: <BarChart className="h-6 w-6" /> },
                { title: 'گزارش‌دهی', desc: 'ارائه گزارش‌های شفاف از پیشرفت کار', icon: <FileText className="h-6 w-6" /> },
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 relative">
                    {step.icon}
                    {idx < 4 && (
                      <div className="absolute top-1/2 right-[-100%] w-full h-0.5 bg-primary/20 hidden md:block"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
                  <p className="text-foreground/70 text-sm text-center">{step.desc}</p>
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
                پاسخ به <span className="text-primary">سؤالات</span> رایج درباره سئو
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                در اینجا به برخی از سؤالات متداول درباره خدمات سئو و بهینه‌سازی موتورهای جستجو پاسخ داده‌ایم. اگر سؤال دیگری دارید، لطفاً با ما تماس بگیرید.
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
        <section id="contact" className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید رتبه سایت خود را بهبود دهید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره نیازهای خاص سئوی شما گفتگو کنیم و راهکاری متناسب با اهداف کسب و کار شما ارائه دهیم.
              </p>
              
              <a 
                href="#contact-form" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو
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
