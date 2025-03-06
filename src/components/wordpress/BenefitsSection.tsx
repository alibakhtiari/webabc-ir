
import React from 'react';
import { cn } from '@/lib/utils';

const WordpressBenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            مزایا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">چرا وردپرس و ووکامرس؟</h2>
          <p className="text-lg text-gray-600">
            وردپرس و ووکامرس مزایای بی‌شماری برای کسب و کارهای آنلاین دارند که آنها را به انتخابی ایده‌آل تبدیل می‌کند
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "انعطاف‌پذیری بالا",
              desc: "وردپرس با بیش از 59,000 افزونه و هزاران قالب، قابلیت شخصی‌سازی بی‌نظیری را ارائه می‌دهد."
            },
            {
              title: "مقرون به صرفه",
              desc: "هزینه راه‌اندازی و نگهداری سایت وردپرسی در مقایسه با سایر پلتفرم‌ها بسیار مناسب‌تر است."
            },
            {
              title: "سئو-فرندلی",
              desc: "وردپرس به طور پیش‌فرض برای موتورهای جستجو بهینه شده و با افزونه‌های سئو قدرتمند تقویت می‌شود."
            },
            {
              title: "پشتیبانی گسترده",
              desc: "جامعه بزرگ توسعه‌دهندگان وردپرس، پشتیبانی و منابع آموزشی فراوانی را فراهم می‌کند."
            },
            {
              title: "امنیت قوی",
              desc: "با به‌روزرسانی‌های منظم و افزونه‌های امنیتی، وردپرس محیطی امن برای کسب و کار شماست."
            },
            {
              title: "مدیریت آسان",
              desc: "رابط کاربری ساده وردپرس، مدیریت محتوا و فروشگاه آنلاین را حتی برای افراد غیر فنی آسان می‌کند."
            }
          ].map((benefit, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WordpressBenefitsSection;
