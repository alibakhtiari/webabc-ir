
import React from 'react';
import { Layout, ShoppingCart, Code, Zap, Shield, BarChart } from 'lucide-react';

const services = [
  {
    icon: <Layout className="h-6 w-6 text-primary" />,
    title: 'طراحی قالب اختصاصی',
    description: 'طراحی و توسعه قالب‌های اختصاصی وردپرس متناسب با نیاز و هویت برند شما'
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    title: 'فروشگاه ووکامرس',
    description: 'راه‌اندازی و پیکربندی فروشگاه آنلاین با استفاده از ووکامرس و افزونه‌های کاربردی'
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: 'توسعه افزونه اختصاصی',
    description: 'طراحی و توسعه افزونه‌های سفارشی برای افزودن قابلیت‌های خاص به سایت وردپرسی شما'
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'بهینه‌سازی سرعت',
    description: 'بهینه‌سازی عملکرد و سرعت سایت وردپرسی برای تجربه کاربری بهتر و رتبه بندی بهتر در گوگل'
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'امنیت و بکاپ',
    description: 'تأمین امنیت سایت وردپرسی شما با استفاده از روش‌های استاندارد و سیستم پشتیبان‌گیری خودکار'
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'میگریشن و به‌روزرسانی',
    description: 'انتقال سایت‌های قدیمی به وردپرس و به‌روزرسانی نسخه‌های قدیمی وردپرس به نسخه‌های جدید'
  }
];

const WordpressServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            خدمات ما
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">خدمات توسعه وردپرس و ووکامرس</h2>
          <p className="text-lg text-gray-600">
            ما مجموعه‌ای از خدمات تخصصی وردپرس و ووکامرس را برای رشد کسب و کار آنلاین شما ارائه می‌دهیم
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-3 inline-block rounded-full bg-primary/10">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WordpressServicesSection;
export { services };
