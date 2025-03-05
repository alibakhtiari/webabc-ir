
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { CheckCircle, FileText, Search, PenTool, BarChart3, Globe, BookOpen, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SeoContent = () => {
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

  // Content SEO Services
  const contentSeoServices = [
    {
      title: 'تحقیق کلمات کلیدی تخصصی',
      description: 'شناسایی بهترین کلمات کلیدی برای کسب و کار شما با تحلیل رقبا، حجم جستجو و قصد کاربر',
      features: [
        'تحلیل کلمات کلیدی رقبا',
        'شناسایی کلمات کلیدی Long-tail با رقابت کمتر',
        'بررسی قصد جستجوی کاربر (Search Intent)',
        'گروه‌بندی و اولویت‌بندی کلمات کلیدی',
        'تحلیل روند و فصلی بودن کلمات کلیدی',
        'تخمین پتانسیل ترافیک و نرخ تبدیل'
      ],
      icon: <Search className="h-10 w-10 text-primary" />
    },
    {
      title: 'تولید محتوای اصیل و با ارزش',
      description: 'ایجاد محتوای با کیفیت بالا که هم برای کاربران جذاب باشد و هم نیازهای موتورهای جستجو را برآورده کند',
      features: [
        'تولید محتوای تخصصی مرتبط با صنعت شما',
        'بهینه‌سازی محتوا برای کلمات کلیدی هدف',
        'رعایت اصول E-A-T (تخصص، اعتبار، قابلیت اعتماد)',
        'تولید محتوای Evergreen با ارزش بلندمدت',
        'بهینه‌سازی متن، عناوین و توضیحات متا',
        'ایجاد محتوای تعاملی و جذاب برای کاربران'
      ],
      icon: <PenTool className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی عناوین و متاتگ‌ها',
      description: 'بهبود نرخ کلیک در نتایج جستجو با بهینه‌سازی عناوین، توضیحات متا و سایر عناصر مهم صفحه',
      features: [
        'نگارش عناوین جذاب و مرتبط با کلمات کلیدی',
        'ایجاد توضیحات متا با Call-to-Action قوی',
        'بهینه‌سازی تگ‌های Alt تصاویر',
        'بهینه‌سازی URL‌ها برای کلمات کلیدی',
        'استفاده از Rich Snippets برای جلب توجه بیشتر',
        'تست و بهبود مداوم نرخ کلیک (CTR)'
      ],
      icon: <FileText className="h-10 w-10 text-primary" />
    },
    {
      title: 'ساختاربندی محتوا',
      description: 'سازماندهی محتوا به شکلی که هم برای کاربران قابل درک‌تر باشد و هم برای موتورهای جستجو راحت‌تر قابل پردازش',
      features: [
        'استفاده اصولی از تگ‌های هدینگ H1 تا H6',
        'ایجاد فهرست مطالب داخلی',
        'تقسیم‌بندی محتوا به پاراگراف‌های کوتاه و خوانا',
        'استفاده از لیست‌ها، جداول و نمودارها',
        'افزودن تصاویر و ویدیوهای مرتبط',
        'ایجاد ساختار محتوایی اسکن‌پذیر و کاربرپسند'
      ],
      icon: <BookOpen className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی تصاویر و چندرسانه‌ای',
      description: 'افزایش تأثیر محتوای چندرسانه‌ای با بهینه‌سازی تصاویر، ویدیوها و سایر عناصر رسانه‌ای',
      features: [
        'فشرده‌سازی تصاویر بدون کاهش کیفیت',
        'نام‌گذاری اصولی فایل‌های تصویری',
        'استفاده از تگ Alt مناسب برای تصاویر',
        'پیاده‌سازی Lazy Loading برای تصاویر',
        'بهینه‌سازی ویدیوها و عناصر چندرسانه‌ای',
        'ایجاد نقشه تصویر برای تصاویر بزرگ'
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: 'ایجاد استراتژی محتوای بلندمدت',
      description: 'طراحی و اجرای برنامه محتوایی هدفمند و بلندمدت برای رشد پایدار ترافیک ارگانیک',
      features: [
        'تدوین تقویم محتوایی',
        'ایجاد توالی و ارتباط بین محتواهای مختلف',
        'شناسایی فرصت‌های محتوایی جدید',
        'به‌روزرسانی منظم محتواهای قدیمی',
        'مدیریت چرخه حیات محتوا',
        'تحلیل و بهبود عملکرد محتوا'
      ],
      icon: <Target className="h-10 w-10 text-primary" />
    },
    {
      title: 'تحلیل و گزارش‌دهی عملکرد محتوا',
      description: 'ارزیابی مداوم عملکرد محتوا و ارائه گزارش‌های دقیق برای بهبود استراتژی محتوایی',
      features: [
        'پایش رتبه‌بندی کلمات کلیدی',
        'تحلیل ترافیک و رفتار کاربران',
        'بررسی نرخ تبدیل محتوا',
        'شناسایی فرصت‌های بهبود',
        'مقایسه با عملکرد رقبا',
        'ارائه توصیه‌های بهبود مستمر'
      ],
      icon: <BarChart3 className="h-10 w-10 text-primary" />
    }
  ];

  // Case studies
  const caseStudies = [
    {
      title: 'رشد ترافیک ارگانیک فروشگاه آنلاین',
      description: 'افزایش 120% ترافیک ارگانیک با استراتژی محتوای هدفمند در مدت 6 ماه',
      metrics: [
        { label: 'افزایش ترافیک', value: '120%' },
        { label: 'افزایش رتبه‌های صفحه اول', value: '80%' },
        { label: 'افزایش نرخ تبدیل', value: '35%' }
      ]
    },
    {
      title: 'تولید محتوای تخصصی در صنعت خدمات مالی',
      description: 'افزایش 95% ترافیک ارگانیک و کاهش 45% نرخ پرش با بهبود محتوای تخصصی',
      metrics: [
        { label: 'افزایش مدت زمان حضور', value: '140%' },
        { label: 'کاهش نرخ پرش', value: '45%' },
        { label: 'افزایش سرنخ‌های تجاری', value: '60%' }
      ]
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead 
        title="خدمات سئو محتوا و تولید محتوای تخصصی | وب آ ب ث" 
        description="تولید و بهینه‌سازی محتوای با کیفیت برای افزایش رتبه در موتورهای جستجو و جذب ترافیک هدفمند به وب‌سایت شما" 
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
                ما با تولید محتوای با ارزش و استراتژیک، ترافیک هدفمند به وب‌سایت شما هدایت می‌کنیم. محتوایی که هم برای کاربران مفید است و هم موتورهای جستجو را راضی می‌کند.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#content-seo-services" 
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
        
        {/* Content SEO Services Section */}
        <section 
          id="content-seo-services" 
          ref={sectionRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو محتوا
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">بهینه‌سازی محتوا</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                سئو محتوا به فرایند ایجاد و بهبود محتوا برای جذب ترافیک ارگانیک از موتورهای جستجو اشاره دارد. هدف ما تولید محتوایی است که برای کلمات کلیدی هدف رتبه‌بندی شود و همزمان نیازهای کاربران را برطرف کند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contentSeoServices.slice(0, 4).map((service, idx) => (
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
              {contentSeoServices.slice(4).map((service, idx) => (
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
        
        {/* Content Types Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                انواع محتوا
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                انواع <span className="text-primary">محتوای تخصصی</span> ما
              </h2>
              
              <p className="text-foreground/80 leading-relaxed">
                ما انواع مختلفی از محتوا را متناسب با نیازهای کسب و کار شما و مخاطبان هدف تولید می‌کنیم. هر نوع محتوا برای مرحله خاصی از سفر مشتری طراحی شده است.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'مقالات آموزشی',
                  description: 'محتوای عمیق و جامع که سؤالات کاربران را پاسخ می‌دهد و شما را به عنوان متخصص در صنعت خود معرفی می‌کند',
                  features: [
                    'پاسخ به سؤالات رایج کاربران',
                    'آموزش استفاده از محصولات و خدمات',
                    'ارائه راهکارهای عملی و کاربردی',
                    'استفاده از تصاویر، نمودارها و مثال‌های واقعی'
                  ]
                },
                {
                  title: 'محتوای محصول',
                  description: 'معرفی جامع محصولات و خدمات شما با تمرکز بر مزایا و ارزش‌های آن‌ها برای کاربران',
                  features: [
                    'توضیح ویژگی‌ها و مزایای محصول',
                    'مقایسه با محصولات مشابه',
                    'نمایش نمونه کارها و مطالعات موردی',
                    'پاسخ به سؤالات متداول درباره محصول'
                  ]
                },
                {
                  title: 'مطالعات موردی',
                  description: 'داستان‌های واقعی از موفقیت مشتریان شما که نشان می‌دهد چگونه محصول یا خدمات شما مشکلات آن‌ها را حل کرده است',
                  features: [
                    'شرح چالش‌های اولیه مشتری',
                    'توضیح راهکار ارائه شده',
                    'بیان نتایج قابل اندازه‌گیری',
                    'نقل قول‌های واقعی از مشتریان'
                  ]
                },
                {
                  title: 'مقالات خبری و روندها',
                  description: 'محتوای به‌روز در مورد آخرین تحولات و روندهای صنعت شما که جایگاه شما را به عنوان رهبر فکری تقویت می‌کند',
                  features: [
                    'تحلیل آخرین اخبار و روندها',
                    'پیش‌بینی تحولات آینده صنعت',
                    'ارائه دیدگاه تخصصی و نظرات کارشناسی',
                    'معرفی فناوری‌های جدید و کاربردهای آن‌ها'
                  ]
                },
                {
                  title: 'محتوای ویدیویی',
                  description: 'ویدیوهای آموزشی، معرفی محصول و مصاحبه‌ها که تعامل کاربران را افزایش می‌دهد و محتوای شما را غنی‌تر می‌کند',
                  features: [
                    'آموزش تصویری استفاده از محصولات',
                    'معرفی ویژگی‌های محصول به صورت ویدیویی',
                    'مصاحبه با متخصصان و مشتریان',
                    'پاسخ ویدیویی به سؤالات متداول'
                  ]
                },
                {
                  title: 'اینفوگرافیک و محتوای بصری',
                  description: 'ارائه اطلاعات پیچیده به شکلی ساده و قابل درک با استفاده از عناصر بصری جذاب',
                  features: [
                    'خلاصه‌سازی اطلاعات پیچیده',
                    'استفاده از آمار و ارقام به شکل بصری',
                    'توضیح فرایندها و مراحل به صورت گرافیکی',
                    'قابلیت به اشتراک‌گذاری آسان در شبکه‌های اجتماعی'
                  ]
                }
              ].map((contentType, idx) => (
                <Card 
                  key={idx} 
                  className="animate-on-scroll opacity-0 shadow-md hover:shadow-lg transition-all"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <span className="text-xl font-bold">{idx + 1}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{contentType.title}</h3>
                    <p className="text-foreground/70 mb-4 text-sm">{contentType.description}</p>
                    
                    <ul className="space-y-2">
                      {contentType.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start text-sm">
                          <CheckCircle className="text-primary h-4 w-4 mt-1 ml-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
                استراتژی محتوای ما به مشتریان کمک کرده است تا ترافیک ارگانیک خود را افزایش دهند، نرخ تبدیل را بهبود بخشند و به عنوان رهبر فکری در صنعت خود شناخته شوند.
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
                آماده‌اید محتوای وب‌سایت خود را متحول کنید؟
              </h2>
              
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با مشاوره رایگان ما، استراتژی محتوای مناسب کسب و کار خود را دریافت کنید و ترافیک ارگانیک خود را افزایش دهید.
              </p>
              
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو محتوا
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

export default SeoContent;
