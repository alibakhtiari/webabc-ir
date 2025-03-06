
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WordpressPortfolioSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            نمونه کارها
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">پروژه‌های موفق وردپرس و ووکامرس</h2>
          <p className="text-lg text-gray-600">
            نگاهی به برخی از پروژه‌های برجسته وردپرس و ووکامرس که توسط تیم ما طراحی و توسعه یافته‌اند
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "فروشگاه محصولات دیجیتال",
              desc: "طراحی و پیاده‌سازی فروشگاه اینترنتی محصولات دیجیتال با ووکامرس و سیستم پرداخت چندگانه"
            },
            {
              title: "پورتال خبری",
              desc: "طراحی سایت خبری با قالب اختصاصی وردپرس و سیستم اشتراک‌گذاری و کامنت‌گذاری پیشرفته"
            },
            {
              title: "سایت شرکتی چندزبانه",
              desc: "طراحی سایت شرکتی چندزبانه با وردپرس و قابلیت‌های سفارشی برای معرفی خدمات و محصولات"
            }
          ].map((project, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-lg group animate-fade-up">
              <div className="aspect-[4/3] bg-gray-100 relative">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600">تصویر پروژه</p>
                </div>
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link to="/portfolio">
              مشاهده همه نمونه کارها
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WordpressPortfolioSection;
