import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply animation classes immediately on component mount
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => {
      el.classList.add('animate-fade-up');
      el.classList.remove('opacity-0');
    });

    // Also set up the intersection observer for future scrolling
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
    
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="py-24 relative overflow-hidden snap-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll opacity-0 transition-all duration-500">
            <div className="neo-morphism rounded-2xl p-3 relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="font-persian text-muted-foreground">تصویر تیم وب آ ب ث</span>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass-morphism rounded-lg p-4 w-64">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-persian font-medium">تجربه تیم ما</span>
                  <span className="text-primary font-bold">10+</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-all duration-500 space-y-6">
            <span 
              className={cn(
                "inline-block mb-2 px-3 py-1 rounded-full",
                "border border-primary/20 bg-primary/5 text-primary",
                "font-persian text-sm font-medium"
              )}
            >
              درباره وب آ ب ث
            </span>
            
            <h2 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance">
              تیمی از متخصصان <span className="text-primary">سئو و توسعه وب</span>
            </h2>
            
            <p className="font-persian text-foreground/80 leading-relaxed text-balance">
              وب آ ب ث یک تیم متخصص در زمینه طراحی سایت، بهینه‌سازی موتورهای جستجو (سئو) و توسعه وب است. با بیش از یک دهه تجربه در صنعت دیجیتال مارکتینگ، ما به کسب‌وکارها کمک می‌کنیم تا در فضای آنلاین رشد کنند و دیده شوند.
            </p>
            
            <p className="font-persian text-foreground/80 leading-relaxed text-balance">
              ما به روش‌های استاندارد و اخلاقی سئو باور داریم که نتایج پایدار و درازمدت را تضمین می‌کند. رویکرد ما بر اساس تحقیق دقیق کلمات کلیدی، تولید محتوای با کیفیت و بهینه‌سازی فنی است.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { title: 'پروژه‌های موفق', value: '500+' },
                { title: 'مشتریان راضی', value: '300+' },
                { title: 'کارشناسان مجرب', value: '15+' },
                { title: 'سال تجربه', value: '10+' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="glass-morphism p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <p className="text-primary font-bold text-2xl">{stat.value}</p>
                  <p className="font-persian text-foreground/80 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>
            
            <button 
              className={cn(
                "mt-8 px-6 py-3 rounded-full bg-primary text-white font-persian",
                "transition-all duration-300 shadow-md hover:shadow-lg",
                "hover:translate-y-[-2px]"
              )}
            >
              بیشتر درباره ما
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
