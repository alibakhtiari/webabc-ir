
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import ConsultationForm from './ConsultationForm';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { t, language, languageMeta } = useLanguage();
  
  useEffect(() => {
    // Apply animation classes immediately on component mount
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => {
      el.classList.add('animate-zoom-in');
      el.classList.remove('opacity-0');
    });

    // Also set up the intersection observer for future scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-zoom-in');
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
      id="contact"
      ref={sectionRef} 
      className="py-24 relative overflow-hidden snap-section"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="animate-on-scroll opacity-0 transition-all duration-500 max-w-5xl mx-auto">
          <div 
            className={cn(
              "bg-primary rounded-3xl p-8 md:p-12",
              "relative overflow-hidden"
            )}
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className={cn("text-3xl md:text-4xl font-bold text-white mb-6 text-balance", languageMeta.fontFamily)}>
                {t('cta.title')}
              </h2>
              
              <p className={cn("text-white/90 text-lg mb-8 max-w-3xl mx-auto text-balance", languageMeta.fontFamily)}>
                {t('cta.description')}
              </p>
              
              <div className={cn("flex flex-col sm:flex-row items-center justify-center gap-4 mt-10", languageMeta.fontFamily)}>
                <button 
                  className={cn(
                    "px-6 py-3 rounded-full bg-white text-primary font-medium",
                    "transition-all duration-300 shadow-md hover:shadow-lg",
                    "hover:translate-y-[-2px] flex items-center gap-2",
                    languageMeta.direction === 'rtl' ? 'flex-row-reverse' : ''
                  )}
                  onClick={() => setConsultationOpen(true)}
                >
                  <span>{t('cta.primaryButton')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to={`/${language}/contact`}
                  className={cn(
                    "px-6 py-3 rounded-full bg-transparent text-white",
                    "border border-white/30 transition-all duration-300",
                    "hover:bg-white/10"
                  )}
                >
                  <span>{t('cta.secondaryButton')}</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: t('cta.address'),
                content: t('cta.addressValue')
              },
              {
                title: t('cta.phone'),
                content: t('cta.phoneValue')
              },
              {
                title: t('cta.email'),
                content: t('cta.emailValue')
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="neo-morphism p-6 rounded-xl text-center transition-all duration-300 hover:shadow-md"
              >
                <h3 className={cn("text-xl font-medium mb-2", languageMeta.fontFamily)}>{item.title}</h3>
                <p className={cn("text-foreground/80", languageMeta.fontFamily)}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Consultation Form Dialog */}
      <ConsultationForm open={consultationOpen} onOpenChange={setConsultationOpen} />
    </section>
  );
};

export default CTASection;
