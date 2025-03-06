
import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle, 
  ShoppingCart, 
  Layout, 
  Search, 
  Shield, 
  Zap, 
  BarChart,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const WordpressWoocommerceDevelopment = () => {
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

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="خدمات طراحی سایت با وردپرس و ووکامرس | توسعه وردپرس حرفه‌ای"
        description="طراحی و توسعه حرفه‌ای سایت‌های وردپرسی و فروشگاه‌های ووکامرس با قالب‌های اختصاصی، سرعت بالا و امنیت تضمین شده"
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
      
      {/* Benefits Section */}
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
      
      {/* Services Section */}
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
      
      {/* Portfolio Section */}
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
      
      {/* Pricing Section */}
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
      
      {/* CTA Section */}
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
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              سوالات متداول
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">پاسخ به سوالات رایج</h2>
            <p className="text-lg text-gray-600">
              پاسخ به سوالات رایج درباره خدمات طراحی سایت وردپرس و ووکامرس
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                q: "چه مدت زمانی برای طراحی یک سایت وردپرسی نیاز است؟",
                a: "زمان طراحی سایت وردپرسی به پیچیدگی پروژه بستگی دارد. یک سایت ساده معمولاً 1-2 هفته، سایت‌های متوسط 3-4 هفته و پروژه‌های پیچیده و فروشگاهی 6-8 هفته زمان نیاز دارند."
              },
              {
                q: "آیا می‌توانم بعداً سایت وردپرسی خود را به فروشگاه تبدیل کنم؟",
                a: "بله، یکی از مزایای وردپرس انعطاف‌پذیری آن است. شما می‌توانید در هر زمانی با نصب و پیکربندی افزونه ووکامرس، سایت خود را به یک فروشگاه آنلاین تبدیل کنید."
              },
              {
                q: "آیا نیازی به دانش فنی برای مدیریت سایت وردپرسی دارم؟",
                a: "خیر، وردپرس با رابط کاربری ساده طراحی شده است که حتی افراد غیر فنی نیز می‌توانند به راحتی محتوا را مدیریت کنند. ما همچنین آموزش‌های لازم را برای مدیریت سایت به شما ارائه می‌دهیم."
              },
              {
                q: "درگاه‌های پرداخت ایرانی در ووکامرس قابل پیاده‌سازی هستند؟",
                a: "بله، ما می‌توانیم تمام درگاه‌های پرداخت ایرانی مانند زرین‌پال، پی‌پینگ، ایدی‌پی و... را به فروشگاه ووکامرسی شما متصل کنیم."
              },
              {
                q: "آیا سایت وردپرسی من برای موتورهای جستجو بهینه خواهد بود؟",
                a: "بله، ما در فرآیند طراحی سایت، اصول سئو را رعایت می‌کنیم و با استفاده از افزونه‌های قدرتمند سئو مانند Yoast SEO یا Rank Math، سایت شما را برای موتورهای جستجو بهینه می‌کنیم."
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
    </div>
  );
};

export default WordpressWoocommerceDevelopment;
