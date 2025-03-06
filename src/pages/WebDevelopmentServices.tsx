
import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Database, Layout, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WebDevelopmentServices = () => {
  const services = [
    {
      icon: <Layout className="h-8 w-8 text-primary" />,
      title: 'توسعه وردپرس و ووکامرس',
      description: 'طراحی و توسعه سایت‌های وردپرسی با پشتیبانی از ووکامرس برای فروشگاه‌های آنلاین',
      link: '/wordpress-woocommerce-development',
      features: ['طراحی قالب اختصاصی', 'راه‌اندازی فروشگاه آنلاین', 'افزونه‌های سفارشی', 'بهینه‌سازی سرعت']
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: 'توسعه فرانت‌اند',
      description: 'پیاده‌سازی رابط کاربری مدرن و واکنش‌گرا با استفاده از React و Next.js',
      link: '/frontend-development',
      features: ['طراحی UI/UX', 'توسعه با React', 'اپلیکیشن Next.js', 'PWA']
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: 'توسعه بک‌اند',
      description: 'ایجاد API‌ها و سرویس‌های قدرتمند با استفاده از Node.js، Express و پایتون',
      link: '/backend-development',
      features: ['API RESTful', 'معماری میکروسرویس', 'پایگاه داده NoSQL و SQL', 'امنیت']
    }
  ];

  return (
    <div className="min-h-screen font-persian" dir="rtl">
      <SEOHead 
        title="خدمات توسعه وب | طراحی سایت و توسعه اپلیکیشن"
        description="خدمات حرفه‌ای طراحی سایت و توسعه وب با استفاده از تکنولوژی‌های مدرن وردپرس، ری‌اکت، نکست‌جی‌اس و نود‌جی‌اس برای کسب و کارهای مختلف"
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-down">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              خدمات توسعه وب
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">راهکارهای مدرن</span> توسعه وب برای کسب و کار شما
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              با استفاده از تکنولوژی‌های پیشرفته، سایت و اپلیکیشن‌هایی پویا، سریع و کاربرپسند برای کسب و کار شما طراحی می‌کنیم
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#services">مشاهده خدمات</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <a href="#contact">مشاوره رایگان</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              خدمات ما
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">خدمات تخصصی توسعه وب</h2>
            <p className="text-lg text-gray-600">
              با تیمی از متخصصان تکنولوژی‌های مختلف، راهکارهای توسعه وب متناسب با نیازهای کسب و کار شما ارائه می‌دهیم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 p-3 inline-block rounded-full bg-primary/10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-medium mb-4">ویژگی‌ها:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
                  <Link to={service.link}>
                    <span>مشاهده جزئیات</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              فرآیند کار
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">مراحل توسعه پروژه‌های وب</h2>
            <p className="text-lg text-gray-600">
              فرآیند توسعه وب ما شامل مراحل مشخص و استانداردی است که تضمین‌کننده‌ی کیفیت و کارایی محصول نهایی خواهد بود
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "تحلیل نیازها", desc: "بررسی دقیق نیازها و اهداف کسب و کار شما" },
              { title: "طراحی و برنامه‌ریزی", desc: "ایجاد نقشه راه و طراحی معماری مناسب برای پروژه" },
              { title: "توسعه و پیاده‌سازی", desc: "کدنویسی و پیاده‌سازی ویژگی‌های مورد نیاز" },
              { title: "تست و انتشار", desc: "تست جامع و انتشار نهایی پروژه با پشتیبانی کامل" }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "relative p-6 rounded-lg bg-white shadow-md z-10",
                  "before:content-[''] before:absolute before:top-8 before:right-[-30px] before:h-1 before:bg-primary/40",
                  "before:w-[30px] before:hidden before:md:block",
                  idx === 3 && "before:hidden"
                )}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary/90 to-primary relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">آماده همکاری با ما هستید؟</h2>
            <p className="text-xl text-white/80 mb-8">
              برای مشاوره رایگان و دریافت اطلاعات بیشتر درباره خدمات توسعه وب با ما تماس بگیرید
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="tel:+989123456789">تماس با ما</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              سوالات متداول
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">پاسخ به سوالات رایج</h2>
            <p className="text-lg text-gray-600">
              پاسخ به سوالات رایج درباره خدمات توسعه وب ما
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                q: "چه تکنولوژی‌هایی برای توسعه وب استفاده می‌کنید؟",
                a: "ما از تکنولوژی‌های مدرن و بروز شامل وردپرس، React، Next.js، Node.js و پایتون برای توسعه وب استفاده می‌کنیم. انتخاب تکنولوژی بر اساس نیازهای پروژه شما صورت می‌گیرد."
              },
              {
                q: "مدت زمان توسعه یک پروژه وب چقدر است؟",
                a: "مدت زمان توسعه به پیچیدگی و ابعاد پروژه بستگی دارد. پروژه‌های ساده وردپرسی ممکن است 1-2 هفته زمان ببرد، درحالی که پروژه‌های پیچیده‌تر 2-3 ماه یا بیشتر زمان نیاز دارند."
              },
              {
                q: "آیا پس از تحویل پروژه، پشتیبانی هم ارائه می‌دهید؟",
                a: "بله، ما خدمات پشتیبانی و نگهداری را برای تمامی پروژه‌های توسعه وب ارائه می‌دهیم. بسته‌های پشتیبانی مختلفی داریم که می‌توانید متناسب با نیاز خود انتخاب کنید."
              },
              {
                q: "هزینه پروژه‌های توسعه وب چگونه محاسبه می‌شود؟",
                a: "هزینه‌ها بر اساس پیچیدگی، ویژگی‌های مورد نیاز و زمان توسعه محاسبه می‌شود. ما پس از بررسی دقیق نیازهای شما، یک پیش‌فاکتور شفاف ارائه خواهیم داد."
              },
              {
                q: "آیا سایت‌های ریسپانسیو و سازگار با موبایل طراحی می‌کنید؟",
                a: "بله، تمامی سایت‌هایی که ما توسعه می‌دهیم به صورت کاملاً ریسپانسیو و سازگار با تمامی دستگاه‌ها (موبایل، تبلت و دسکتاپ) طراحی می‌شوند."
              }
            ].map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WebDevelopmentServices;
