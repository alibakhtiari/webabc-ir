
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const WordpressHeroSection = () => {
  return (
    <section className="py-20 pt-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 animate-fade-right">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              وردپرس و ووکامرس
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              طراحی و توسعه حرفه‌ای <span className="text-primary">وردپرس و ووکامرس</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ایجاد سایت‌های وردپرسی اختصاصی و فروشگاه‌های آنلاین ووکامرس با طراحی منحصر به فرد و عملکرد بهینه
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#services">خدمات وردپرس</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <a href="#contact">درخواست مشاوره</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-fade-left">
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-xl">
                <div className="aspect-[4/3] bg-white rounded-lg flex items-center justify-center">
                  {/* WordPress & WooCommerce image placeholder */}
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <ShoppingCart className="w-20 h-20 text-primary mb-4" />
                    <p className="text-gray-600">تصویر طراحی وردپرس</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary/10 w-full h-full rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordpressHeroSection;
