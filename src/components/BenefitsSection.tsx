import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      title: "افزایش اعتبار برند",
      description: "با حضور قدرتمند در نتایج جستجو، اعتبار برند خود را افزایش دهید.",
    },
    {
      title: "افزایش فروش و درآمد",
      description: "با جذب ترافیک هدفمند، نرخ تبدیل و فروش خود را افزایش دهید.",
    },
    {
      title: "کاهش هزینه‌های تبلیغاتی",
      description: "با بهبود رتبه‌های ارگانیک، هزینه‌های تبلیغات کلیکی را کاهش دهید.",
    },
    {
      title: "برتری نسبت به رقبا",
      description: "با استراتژی‌های سئوی پیشرفته، از رقبای خود پیشی بگیرید.",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden snap-section"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          "opacity-100 transform translate-y-0"
        )}>
          <span 
            className={cn(
              "inline-block mb-2 px-3 py-1 rounded-full",
              "border border-primary/20 bg-primary/5 text-primary",
              "font-persian text-sm font-medium"
            )}
          >
            مزایای همکاری با ما
          </span>
          
          <h2 className="font-persian text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance">
            چرا <span className="text-primary">وب آ ب ث</span> را انتخاب کنید؟
          </h2>
          
          <p className="font-persian text-foreground/80 leading-relaxed text-balance">
            ما با تمرکز بر نتایج ملموس و استراتژی‌های اثبات شده، به کسب و کار شما کمک می‌کنیم تا در دنیای دیجیتال امروزی رشد کند.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "افزایش اعتبار برند",
              description: "با حضور قدرتمند در نتایج جستجو، اعتبار برند خود را افزایش دهید.",
            },
            {
              title: "افزایش فروش و درآمد",
              description: "با جذب ترافیک هدفمند، نرخ تبدیل و فروش خود را افزایش دهید.",
            },
            {
              title: "کاهش هزینه‌های تبلیغاتی",
              description: "با بهبود رتبه‌های ارگانیک، هزینه‌های تبلیغات کلیکی را کاهش دهید.",
            },
            {
              title: "برتری نسبت به رقبا",
              description: "با استراتژی‌های سئوی پیشرفته، از رقبای خود پیشی بگیرید.",
            },
          ].map((benefit, idx) => (
            <div 
              key={idx} 
              className={cn(
                "glass-morphism p-6 rounded-xl transition-all duration-700",
                "hover:shadow-md opacity-100 transform translate-y-0"
              )}
            >
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-persian text-xl font-medium">{benefit.title}</h3>
                  <p className="font-persian text-foreground/70">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "neo-morphism rounded-2xl overflow-hidden transition-all duration-700",
          "opacity-100 transform translate-y-0"
        )}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span 
                className={cn(
                  "inline-block mb-2 px-3 py-1 rounded-full",
                  "border border-primary/20 bg-primary/5 text-primary",
                  "font-persian text-sm font-medium"
                )}
              >
                تضمین نتیجه
              </span>
              
              <h3 className="font-persian text-2xl md:text-3xl font-bold mb-6 text-balance">
                نتایج ملموس با روش‌های <span className="text-primary">اثبات شده</span>
              </h3>
              
              <p className="font-persian text-foreground/80 leading-relaxed mb-8 text-balance">
                ما معتقدیم که سئو یک فرآیند مستمر است و با برنامه‌ریزی دقیق و استراتژی‌های اصولی، نتایج درازمدت و پایداری را برای کسب و کار شما به ارمغان می‌آوریم.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'گزارش‌های ماهانه با متریک‌های دقیق',
                  'شفافیت کامل در تمام مراحل همکاری',
                  'تضمین بهبود رتبه در کلمات کلیدی هدف',
                  'قراردادهای منعطف و بدون تعهد بلندمدت'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center font-persian">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3 shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  className={cn(
                    "px-6 py-3 rounded-full bg-primary text-white font-persian",
                    "transition-all duration-300 shadow-md hover:shadow-lg",
                    "hover:translate-y-[-2px] flex items-center"
                  )}
                >
                  <span>دریافت مشاوره رایگان</span>
                  <ArrowRight className="h-4 w-4 mr-2" />
                </button>
              </div>
            </div>
            
            <div className="aspect-auto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <span className="font-persian text-muted-foreground">
                تصویر نتایج سئو
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
