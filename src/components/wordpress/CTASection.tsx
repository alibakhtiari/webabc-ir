
import React from 'react';
import { Button } from '@/components/ui/button';

const WordpressCTASection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-primary/90 to-primary relative">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">آماده شروع پروژه وردپرسی خود هستید؟</h2>
          <p className="text-xl text-white/80 mb-8">
            برای مشاوره رایگان و دریافت اطلاعات بیشتر درباره خدمات طراحی سایت وردپرس با ما تماس بگیرید
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="tel:+989123456789">تماس با ما</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="mailto:info@example.com">ارسال ایمیل</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordpressCTASection;
