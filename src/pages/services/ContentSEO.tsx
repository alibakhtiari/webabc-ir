
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, FileText, Search, PenTool, BarChart3, MessagesSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentSEO = () => {
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

  // Content SEO Services
  const contentSeoServices = [
    {
      title: 'تحقیق کلمات کلیدی',
      description: 'شناسایی و تحلیل کلمات کلیدی مرتبط با کسب و کار شما با بیشترین پتانسیل جذب ترافیک هدفمند',
      icon: <Search className="h-12 w-12 text-primary" />,
      features: [
        'تحقیق جامع کلمات کلیدی',
        'تحلیل رقابت و سختی کلمات',
        'شناسایی کلمات کلیدی بلند دم',
        'گروه‌بندی کلمات کلیدی مرتبط',
        'تعیین کلمات کلیدی با پتانسیل تبدیل بالا',
        'تحلیل کلمات کلیدی رقبا'
      ]
    },
    {
      title: 'تولید محتوای اصیل',
      description: 'تولید محتوای با کیفیت، جامع و اصیل با رویکرد کاربرمحور و بهینه‌سازی شده برای موتورهای جستجو',
      icon: <PenTool className="h-12 w-12 text-primary" />,
      features: [
        'تولید مقالات تخصصی و جامع',
        'تولید محتوای اینفوگرافیک و تصویری',
        'ایجاد محتوای ویدئویی',
        'نگارش متون تبلیغاتی و توضیحات محصول',
        'بهینه‌سازی محتوای موجود',
        'طراحی تقویم محتوایی'
      ]
    },
    {
      title: 'بهینه‌سازی صفحات',
      description: 'بهینه‌سازی عناصر داخل صفحه برای بهبود رتبه در موتورهای جستجو و افزایش نرخ تبدیل',
      icon: <FileText className="h-12 w-12 text-primary" />,
      features: [
        'بهینه‌سازی عناوین و متاتگ‌ها',
        'بهینه‌سازی ساختار H1 تا H6',
        'بهینه‌سازی تصاویر و محتوای چندرسانه‌ای',
        'بهینه‌سازی لینک‌های داخلی',
        'تنظیم توضیحات متا و اسنیپت‌ها',
        'بهینه‌سازی محتوا برای فیچرهای گوگل'
      ]
    },
    {
      title: 'تحلیل و بهبود مداوم',
      description: 'پایش مستمر عملکرد محتوا و بهینه‌سازی آن بر اساس نتایج و بازخوردها',
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      features: [
        'تحلیل عملکرد محتوا در موتورهای جستجو',
        'بررسی نرخ تبدیل و تعامل کاربران',
        'شناسایی فرصت‌های بهبود محتوا',
        'به‌روزرسانی مداوم محتوای قدیمی',
        'آزمایش A/B برای بهبود نتایج',
        'ارائه گزارش‌های دوره‌ای عملکرد'
      ]
    },
    {
      title: 'تولید محتوای تعاملی',
      description: 'ایجاد محتوای تعاملی و جذاب که کاربران را تشویق به مشارکت و اشتراک‌گذاری می‌کند',
      icon: <MessagesSquare className="h-12 w-12 text-primary" />,
      features: [
        'طراحی نظرسنجی‌ها و آزمون‌ها',
        'ایجاد محتوای پرسش و پاسخ',
        'توسعه ابزارهای تعاملی',
        'طراحی مسابقات و چالش‌ها',
        'تولید پادکست و ویدیوهای آموزشی',
        'ایجاد جوامع آنلاین و فروم‌ها'
      ]
    },
    {
      title: 'استراتژی محتوا',
      description: 'تدوین استراتژی جامع محتوا متناسب با اهداف کسب و کار و نیازهای مخاطبان هدف',
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      features: [
        'تحلیل بازار و مخاطبان هدف',
        'تعریف اهداف استراتژی محتوا',
        'ایجاد شخصیت‌های خریدار',
        'طراحی قیف محتوایی',
        'برنامه‌ریزی کانال‌های توزیع محتوا',
        'تدوین شاخص‌های کلیدی عملکرد'
      ]
    }
  ];

  // Benefits of Content SEO
  const benefits = [
    {
      title: 'افزایش ترافیک ارگانیک',
      description: 'محتوای باکیفیت و بهینه شده، ترافیک ارگانیک بیشتری از موتورهای جستجو جذب می‌کند'
    },
    {
      title: 'افزایش اعتبار برند',
      description: 'محتوای تخصصی و ارزشمند، اعتبار و جایگاه برند شما را به عنوان متخصص صنعت تقویت می‌کند'
    },
    {
      title: 'بهبود نرخ تبدیل',
      description: 'محتوای هدفمند و اقناع‌کننده، بازدیدکنندگان را به مشتریان بالفعل تبدیل می‌کند'
    },
    {
      title: 'افزایش تعامل کاربران',
      description: 'محتوای جذاب و مفید، تعامل کاربران را افزایش داده و نرخ پرش را کاهش می‌دهد'
    },
    {
      title: 'افزایش اشتراک‌گذاری',
      description: 'محتوای باارزش بیشتر در شبکه‌های اجتماعی به اشتراک گذاشته می‌شود و دسترسی را افزایش می‌دهد'
    },
    {
      title: 'سودآوری بلندمدت',
      description: 'محتوای خوب یک سرمایه‌گذاری بلندمدت است که با گذشت زمان بازدهی آن افزایش می‌یابد'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات سئو محتوا و تولید محتوای تخصصی | وب آ ب ث" 
        description="تولید و بهینه‌سازی محتوای با کیفیت و اصیل برای افزایش رتبه در موتورهای جستجو، جذب مخاطبان هدفمند و افزایش نرخ تبدیل" 
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
                خدمات <span className="text-primary">سئو محتوا</span> و تولید محتوای تخصصی
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                تولید و بهینه‌سازی محتوای با کیفیت که هم برای کاربران جذاب باشد و هم به بهبود رتبه سایت شما در موتورهای جستجو کمک کند.
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
        
        {/* What is Content SEO Section */}
        <section 
          id="what-is" 
          className="py-20 bg-white relative overflow-hidden"
          ref={addToRefs}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  سئو محتوا چیست؟
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  مفهوم <span className="text-primary">سئو محتوا</span> و اهمیت آن
                </h2>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  سئو محتوا (Content SEO) به فرآیند بهینه‌سازی محتوای وب‌سایت برای بهبود رتبه در موتورهای جستجو و جذب ترافیک هدفمند اشاره دارد. این فرآیند شامل تولید محتوای با کیفیت و مرتبط با نیازهای مخاطب هدف و بهینه‌سازی آن برای کلمات کلیدی مناسب است.
                </p>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  محتوای با کیفیت، یکی از مهم‌ترین عوامل در بهبود رتبه‌بندی وب‌سایت و جذب مخاطبان هدفمند است. گوگل به طور مداوم در حال بهبود الگوریتم‌های خود برای شناسایی و پاداش دادن به محتوای باکیفیت، اصیل و ارزشمند است.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex-1 p-5 rounded-xl neo-morphism">
                    <div className="text-2xl font-bold text-primary mb-2">67%</div>
                    <p className="text-sm text-foreground/70">از متخصصان سئو، محتوا را مهم‌ترین عامل در رتبه‌بندی می‌دانند</p>
                  </div>
                  <div className="flex-1 p-5 rounded-xl neo-morphism">
                    <div className="text-2xl font-bold text-primary mb-2">3x</div>
                    <p className="text-sm text-foreground/70">محتوای باکیفیت ترافیک ارگانیک را تا سه برابر افزایش می‌دهد</p>
                  </div>
                </div>
              </div>
              
              <div className="animate-on-scroll">
                <div className="neo-morphism rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">عناصر کلیدی سئو محتوا:</h3>
                  <ul className="space-y-4">
                    {[
                      'تحقیق دقیق کلمات کلیدی',
                      'تولید محتوای اصیل و باکیفیت',
                      'ساختار مناسب و سلسله مراتبی',
                      'بهینه‌سازی عناوین و متاتگ‌ها',
                      'غنی‌سازی محتوا با تصاویر و ویدیوها',
                      'هماهنگی با نیت جستجوی کاربر',
                      'خوانایی و کاربرپسندی محتوا',
                      'به‌روزرسانی منظم محتوای قدیمی',
                      'کسب لینک‌های باکیفیت',
                      'تحلیل و بهبود مداوم محتوا'
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
                خدمات <span className="text-primary">سئو محتوا</span> وب آ ب ث
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما طیف کاملی از خدمات سئو محتوا را برای کمک به کسب و کار شما در جذب ترافیک هدفمند ارائه می‌دهیم.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentSeoServices.map((service, idx) => (
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
                مزایای <span className="text-primary">سئو محتوا</span> برای کسب و کار شما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سرمایه‌گذاری در تولید محتوای با کیفیت و بهینه‌سازی آن برای موتورهای جستجو، مزایای بسیاری برای کسب و کار شما به همراه دارد.
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
                فرآیند <span className="text-primary">سئو محتوا</span> وب آ ب ث
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما از یک فرآیند جامع و سیستماتیک برای تولید و بهینه‌سازی محتوا استفاده می‌کنیم.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  title: 'تحقیق و برنامه‌ریزی',
                  description: 'شناخت کسب و کار، رقبا و مخاطبان هدف برای تدوین استراتژی محتوا',
                  steps: [
                    'تحلیل کسب و کار و صنعت',
                    'تحقیق کلمات کلیدی',
                    'تحلیل رقبا و بنچمارکینگ',
                    'شناسایی پرسونای مخاطب',
                    'تعیین اهداف و KPIها'
                  ]
                },
                {
                  title: 'تولید محتوا',
                  description: 'ایجاد محتوای با کیفیت و جذاب متناسب با نیازهای مخاطب و اهداف کسب و کار',
                  steps: [
                    'تدوین ساختار و طرح کلی',
                    'نگارش محتوای اصلی',
                    'تهیه عناوین و متاتگ‌های بهینه',
                    'طراحی و تولید عناصر بصری',
                    'ویرایش و بازبینی نهایی'
                  ]
                },
                {
                  title: 'بهینه‌سازی',
                  description: 'بهینه‌سازی محتوا برای موتورهای جستجو و تجربه کاربری بهتر',
                  steps: [
                    'بهینه‌سازی کلمات کلیدی',
                    'بهبود ساختار عناوین و متن',
                    'بهینه‌سازی تصاویر و ویدیوها',
                    'افزودن لینک‌های داخلی و خارجی',
                    'بهینه‌سازی برای تجربه کاربری'
                  ]
                },
                {
                  title: 'انتشار و بازاریابی',
                  description: 'انتشار محتوا و ترویج آن از طریق کانال‌های مختلف',
                  steps: [
                    'انتشار در وب‌سایت و بلاگ',
                    'اشتراک‌گذاری در شبکه‌های اجتماعی',
                    'ارسال خبرنامه ایمیلی',
                    'لینک‌سازی و توزیع محتوا',
                    'همکاری با تأثیرگذاران'
                  ]
                },
                {
                  title: 'تحلیل و بهینه‌سازی مجدد',
                  description: 'ارزیابی عملکرد محتوا و بهبود مداوم آن بر اساس نتایج',
                  steps: [
                    'تحلیل داده‌های ترافیک و تعامل',
                    'بررسی رتبه‌بندی کلمات کلیدی',
                    'تحلیل نرخ تبدیل',
                    'به‌روزرسانی و بهبود محتوا',
                    'تدوین استراتژی‌های جدید'
                  ]
                }
              ].map((phase, idx) => (
                <div 
                  key={idx} 
                  className="relative pb-12 animate-on-scroll"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {idx < 4 && (
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
                آماده‌اید محتوای وب‌سایت خود را متحول کنید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با محتوای حرفه‌ای و بهینه‌شده، ترافیک ارگانیک وب‌سایت خود را افزایش دهید و مشتریان بیشتری جذب کنید.
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

export default ContentSEO;
