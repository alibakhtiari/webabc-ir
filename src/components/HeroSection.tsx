
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import OptimizedImage from './OptimizedImage';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden snap-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="animate-on-scroll opacity-0 max-w-3xl mx-auto space-y-4">
            <Logo className="mx-auto mb-6" size="lg" />
            
            <span 
              className={cn(
                "inline-block mb-4 px-3 py-1 rounded-full",
                "border border-primary/20 bg-primary/5 text-primary",
                "font-persian text-sm font-medium"
              )}
            >
              وب آ ب ث - تخصص در سئو و توسعه وب
            </span>
            
            <h1 className="font-persian text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              طراحی و بهینه‌سازی وب‌سایت
              <span className="text-primary"> که نتیجه می‌دهد</span>
            </h1>
            
            <p className="font-persian text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto text-balance">
              با بیش از 10 سال تجربه در زمینه طراحی وب و سئو، کسب و کار شما را در موتورهای جستجو به صدر می‌رسانیم.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 font-persian">
              <button 
                className={cn(
                  "px-6 py-3 rounded-full bg-primary text-white",
                  "transition-all duration-300 shadow-md hover:shadow-lg",
                  "hover:translate-y-[-2px]"
                )}
              >
                مشاوره رایگان سئو
              </button>
              <button 
                className={cn(
                  "px-6 py-3 rounded-full bg-white text-primary",
                  "border border-primary/20 transition-all duration-300",
                  "hover:bg-primary/5"
                )}
              >
                مشاهده نمونه کارها
              </button>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 mt-16 transition-all duration-500 delay-300">
            <div className="neo-morphism rounded-2xl p-2 max-w-5xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-xl">
                <OptimizedImage 
                  src="/images/web-design-showcase.jpg" 
                  alt="تصویر نمایشی وب‌سایت طراحی شده توسط وب آ ب ث با طراحی اختصاصی و بهینه برای سئو" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'بیش از 500 پروژه موفق', image: '/images/projects-icon.svg', alt: 'آیکون پروژه‌های موفق سئو و توسعه وب' },
              { title: 'رتبه 1 در گوگل', image: '/images/rank-icon.svg', alt: 'آیکون رتبه اول در گوگل' }, 
              { title: 'طراحی اختصاصی', image: '/images/design-icon.svg', alt: 'آیکون طراحی اختصاصی وب‌سایت' },
              { title: 'پشتیبانی 24/7', image: '/images/support-icon.svg', alt: 'آیکون پشتیبانی شبانه روزی وب‌سایت' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "glass-morphism p-4 rounded-xl text-center",
                  "transition-all duration-300 hover:shadow-md"
                )}
              >
                <div className="h-12 w-12 mx-auto mb-3">
                  <OptimizedImage src={item.image} alt={item.alt} />
                </div>
                <p className="font-persian font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
