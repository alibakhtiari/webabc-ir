
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const WordpressPricingSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            تعرفه خدمات
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">پلن‌های طراحی سایت وردپرس</h2>
          <p className="text-lg text-gray-600">
            پلن‌های متنوع طراحی سایت وردپرسی متناسب با نیازها و بودجه کسب و کارهای مختلف
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "پلن پایه",
              price: "از ۷ میلیون تومان",
              features: [
                "طراحی با قالب آماده", 
                "نصب و پیکربندی افزونه‌های ضروری", 
                "سازگاری با موبایل",
                "پشتیبانی ۳ ماهه",
                "آموزش پنل مدیریت"
              ]
            },
            {
              title: "پلن استاندارد",
              price: "از ۱۵ میلیون تومان",
              popular: true,
              features: [
                "طراحی نیمه اختصاصی",
                "راه‌اندازی فروشگاه ووکامرس",
                "بهینه‌سازی سرعت سایت",
                "پشتیبانی ۶ ماهه",
                "سئو داخلی اولیه"
              ]
            },
            {
              title: "پلن حرفه‌ای",
              price: "از ۲۵ میلیون تومان",
              features: [
                "طراحی کاملاً اختصاصی",
                "توسعه افزونه‌های سفارشی",
                "بهینه‌سازی کامل سرعت و عملکرد",
                "پشتیبانی ۱۲ ماهه",
                "سئو داخلی پیشرفته"
              ]
            }
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={cn(
                "rounded-xl p-8 transition-all duration-300 animate-fade-up relative",
                plan.popular 
                  ? "bg-primary/5 border-2 border-primary shadow-xl" 
                  : "bg-white border border-gray-100 shadow-md"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  پیشنهاد ویژه
                </span>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <p className="text-xl font-bold mb-6 text-primary">{plan.price}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2">
                    <CheckCircle className={cn(
                      "h-5 w-5 flex-shrink-0",
                      plan.popular ? "text-primary" : "text-green-500"
                    )} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={cn(
                  "w-full",
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90" 
                    : "bg-primary/10 hover:bg-primary/20 text-primary"
                )}
              >
                <a href="#contact">سفارش طرح</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WordpressPricingSection;
