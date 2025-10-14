
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, MapPin, Building, Search, Globe, Star, ArrowRight, MessageSquare } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEOHead from '@/components/SEOHead';

const LocalSeoServices = () => {
  const localSeoRef = useRef<HTMLDivElement>(null);
  const gbpRef = useRef<HTMLDivElement>(null);
  const citationsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Local SEO Services Data
  const localSeoServices = [
    {
      title: 'تحلیل رقابت محلی',
      description: 'بررسی و تحلیل رقبای محلی شما برای شناسایی فرصت‌ها و استراتژی‌های برتری در بازار منطقه‌ای',
      features: [
        'شناسایی کسب‌وکارهای مشابه در منطقه شما',
        'تحلیل استراتژی‌های سئو محلی رقبا',
        'بررسی پروفایل لینک و محتوای رقبای محلی',
        'شناسایی کلمات کلیدی محلی مورد استفاده رقبا',
        'تحلیل نقاط قوت و ضعف حضور آنلاین رقبا',
        'ارائه گزارش مقایسه‌ای و استراتژی برتری'
      ],
      icon: <Search className="h-10 w-10 text-primary" />
    },
    {
      title: 'بهینه‌سازی نقشه و اطلاعات تماس',
      description: 'بهینه‌سازی اطلاعات NAP (نام، آدرس، تلفن) در سایت و سراسر وب برای افزایش رتبه در نتایج محلی',
      features: [
        'بهینه‌سازی ساختار Schema.org برای اطلاعات محلی',
        'اطمینان از یکپارچگی اطلاعات NAP در تمام پلتفرم‌ها',
        'پیاده‌سازی نقشه تعاملی در صفحات مرتبط سایت',
        'بهینه‌سازی صفحه تماس با ما برای سئو محلی',
        'ایجاد صفحات اختصاصی برای شعب مختلف (در صورت نیاز)',
        'پیاده‌سازی مسیریابی و راهنمای رسیدن به محل کسب‌وکار'
      ],
      icon: <MapPin className="h-10 w-10 text-primary" />
    },
    {
      title: 'تولید محتوای محلی سازی شده',
      description: 'ایجاد محتوای اختصاصی متمرکز بر مخاطبان محلی شما برای افزایش ارتباط و جذب مشتریان منطقه‌ای',
      features: [
        'تحقیق کلمات کلیدی محلی مرتبط با کسب‌وکار شما',
        'تولید محتوای بهینه‌شده برای جستجوهای محلی',
        'ایجاد مطالب مرتبط با رویدادها و اخبار محلی',
        'نگارش مطالب راهنما برای مخاطبان محلی',
        'تولید محتوای ویدیویی و تصویری از محیط کسب‌وکار',
        'بهینه‌سازی محتوا برای نمایش در نتایج محلی گوگل'
      ],
      icon: <MessageSquare className="h-10 w-10 text-primary" />
    },
    {
      title: 'مدیریت نظرات و بررسی‌های محلی',
      description: 'مدیریت حرفه‌ای بازخوردها و نظرات مشتریان محلی برای تقویت اعتبار و رتبه کسب‌وکار شما',
      features: [
        'ایجاد استراتژی جمع‌آوری نظرات مشتریان',
        'پاسخگویی حرفه‌ای به نظرات مثبت و منفی',
        'یکپارچه‌سازی نظرات در وب‌سایت شما',
        'مانیتورینگ پلتفرم‌های نظردهی محلی',
        'آموزش کارکنان برای درخواست نظر از مشتریان راضی',
        'تحلیل نظرات برای شناسایی فرصت‌های بهبود'
      ],
      icon: <Star className="h-10 w-10 text-primary" />
    }
  ];

  // Google Business Profile Services
  const gbpServices = [
    {
      title: 'ایجاد و بهینه‌سازی پروفایل',
      description: 'ایجاد و بهینه‌سازی کامل پروفایل کسب‌وکاری گوگل (GBP) برای حداکثر تأثیرگذاری و رؤیت‌پذیری',
      features: [
        'ایجاد یا مطالبه پروفایل کسب‌وکاری گوگل',
        'بهینه‌سازی کامل تمام بخش‌های پروفایل',
        'انتخاب دسته‌بندی‌های اصلی و فرعی مناسب',
        'بارگذاری تصاویر حرفه‌ای و بهینه‌شده',
        'تنظیم ساعات کاری دقیق و اطلاعات تماس',
        'نوشتن توضیحات جذاب و بهینه‌شده برای کسب‌وکار'
      ],
      icon: <Building className="h-10 w-10 text-primary" />
    },
    {
      title: 'مدیریت محصولات و خدمات',
      description: 'معرفی و مدیریت حرفه‌ای محصولات و خدمات در پروفایل کسب‌وکاری گوگل برای افزایش فروش',
      features: [
        'اضافه کردن محصولات و خدمات با جزئیات کامل',
        'بهینه‌سازی توضیحات محصولات با کلمات کلیدی مرتبط',
        'آپلود تصاویر با کیفیت برای هر محصول',
        'دسته‌بندی صحیح و منطقی محصولات و خدمات',
        'به‌روزرسانی منظم قیمت‌ها و موجودی',
        'افزودن اطلاعات تماس اختصاصی برای هر خدمت'
      ],
      icon: <Building className="h-10 w-10 text-primary" />
    },
    {
      title: 'انتشار محتوا و پست‌ها',
      description: 'ایجاد و انتشار منظم محتوا در پروفایل گوگل برای افزایش تعامل و جذب مشتریان جدید',
      features: [
        'برنامه‌ریزی تقویم محتوایی برای پست‌های گوگل',
        'ایجاد پست‌های جذاب با تصاویر حرفه‌ای',
        'انتشار اخبار، رویدادها و پیشنهادات ویژه',
        'بهینه‌سازی هر پست با کلمات کلیدی مناسب',
        'طراحی کال‌تو‌اکشن‌های مؤثر در پست‌ها',
        'تحلیل عملکرد پست‌ها و بهینه‌سازی مداوم'
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: 'پاسخگویی به پرسش‌ها و نظرات',
      description: 'مدیریت حرفه‌ای پرسش‌ها و نظرات کاربران در پروفایل گوگل برای افزایش اعتبار و خدمات مشتری',
      features: [
        'پاسخگویی سریع و حرفه‌ای به تمام نظرات',
        'مدیریت سؤالات کاربران در بخش پرسش و پاسخ',
        'ایجاد پاسخ‌های استاندارد برای سؤالات متداول',
        'حل مشکلات مشتریان ناراضی از طریق پاسخ مناسب',
        'تشویق مشتریان راضی به ثبت نظرات مثبت',
        'گزارش‌گیری و تحلیل نظرات برای بهبود خدمات'
      ],
      icon: <MessageSquare className="h-10 w-10 text-primary" />
    }
  ];

  // Citation Services
  const citationServices = [
    {
      title: 'ایجاد و مدیریت سایت‌های دایرکتوری محلی',
      description: 'ثبت و بهینه‌سازی اطلاعات کسب‌وکار شما در دایرکتوری‌های معتبر محلی برای افزایش اعتبار',
      features: [
        'شناسایی بهترین دایرکتوری‌های محلی مرتبط با صنعت شما',
        'ثبت کسب‌وکار با اطلاعات کامل و دقیق',
        'اطمینان از یکپارچگی اطلاعات NAP در تمام پلتفرم‌ها',
        'بارگذاری تصاویر و اطلاعات تکمیلی در هر پلتفرم',
        'مدیریت و به‌روزرسانی منظم اطلاعات ثبت شده',
        'گزارش کامل از تمام سایتشن‌های ایجاد شده'
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: 'اصلاح و یکپارچه‌سازی اطلاعات کسب‌وکار',
      description: 'بررسی و اصلاح ناهماهنگی‌ها در اطلاعات کسب‌وکار شما در سراسر وب برای تقویت اعتبار',
      features: [
        'ممیزی جامع سایتیشن‌های موجود و شناسایی مشکلات',
        'اصلاح اطلاعات نادرست در پلتفرم‌های مختلف',
        'یکپارچه‌سازی اطلاعات NAP در تمام پلتفرم‌ها',
        'حذف لیستینگ‌های تکراری و اضافی',
        'به‌روزرسانی اطلاعات در صورت تغییر آدرس یا تلفن',
        'پایش مداوم برای جلوگیری از ناهماهنگی‌های جدید'
      ],
      icon: <CheckCircle className="h-10 w-10 text-primary" />
    },
    {
      title: 'سایتیشن‌های صنعتی و تخصصی',
      description: 'ثبت کسب‌وکار شما در دایرکتوری‌های تخصصی صنعت شما برای افزایش اعتبار در حوزه تخصصی',
      features: [
        'شناسایی دایرکتوری‌های تخصصی مرتبط با صنعت شما',
        'ثبت کسب‌وکار با اطلاعات کامل و تخصصی',
        'بهینه‌سازی پروفایل با کلمات کلیدی تخصصی',
        'پیوند دادن به وب‌سایت و شبکه‌های اجتماعی',
        'درج گواهینامه‌ها و مجوزهای تخصصی',
        'معرفی خدمات تخصصی با جزئیات کامل'
      ],
      icon: <Building className="h-10 w-10 text-primary" />
    },
    {
      title: 'گزارش‌دهی و پایش سایتیشن‌ها',
      description: 'مانیتورینگ مداوم و گزارش‌دهی از وضعیت سایتیشن‌های کسب‌وکار شما برای اطمینان از صحت اطلاعات',
      features: [
        'پایش مداوم سایتیشن‌های موجود',
        'تهیه گزارش‌های دوره‌ای از وضعیت سایتیشن‌ها',
        'بررسی تأثیر سایتیشن‌ها بر رتبه‌بندی محلی',
        'شناسایی فرصت‌های جدید برای ایجاد سایتیشن',
        'اصلاح سریع مشکلات و ناهماهنگی‌های احتمالی',
        'ارائه توصیه‌های استراتژیک برای بهبود بیشتر'
      ],
      icon: <CheckCircle className="h-10 w-10 text-primary" />
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'سئو محلی چیست و چرا برای کسب و کار من مهم است؟',
      answer: 'سئو محلی (Local SEO) مجموعه تکنیک‌هایی است که به بهبود رؤیت‌پذیری کسب‌وکار شما در نتایج جستجوی محلی گوگل و سایر موتورهای جستجو کمک می‌کند. اهمیت آن در این است که 46% جستجوهای گوگل به دنبال یافتن اطلاعات محلی هستند و 88% افرادی که جستجوی محلی انجام می‌دهند، همان روز با کسب‌وکار تماس می‌گیرند یا به آن مراجعه می‌کنند. برای هر کسب‌وکاری که مشتریان محلی دارد، سئو محلی یک استراتژی ضروری برای جذب مشتریان جدید است.'
    },
    {
      question: 'پروفایل کسب‌وکاری گوگل (Google Business Profile) چیست؟',
      answer: 'پروفایل کسب‌وکاری گوگل (سابقاً Google My Business) یک ابزار رایگان ارائه شده توسط گوگل است که به صاحبان مشاغل اجازه می‌دهد حضور آنلاین خود را در گوگل مپ و جستجوی گوگل مدیریت کنند. با استفاده از GBP، می‌توانید اطلاعات کسب‌وکار خود مانند آدرس، ساعات کاری، شماره تماس، تصاویر، خدمات و محصولات، نظرات مشتریان و پست‌های به‌روزرسانی را نمایش دهید. این ابزار نقش حیاتی در سئو محلی دارد و به کسب‌وکارها کمک می‌کند تا در نتایج جستجوی محلی و در بسته سه‌گانه محلی (Local Pack) گوگل نمایش داده شوند.'
    },
    {
      question: 'سایتیشن (Citation) چیست و چگونه به سئو محلی کمک می‌کند؟',
      answer: 'سایتیشن به هر جایی در وب اطلاق می‌شود که نام، آدرس و شماره تلفن (NAP) کسب‌وکار شما ذکر شده باشد، مانند دایرکتوری‌های آنلاین، سایت‌های نظردهی، اپلیکیشن‌های نقشه و شبکه‌های اجتماعی. سایتیشن‌ها به سئو محلی کمک می‌کنند زیرا به گوگل اطمینان می‌دهند که کسب‌وکار شما واقعی و معتبر است. یکپارچگی و سازگاری اطلاعات NAP در تمام سایتیشن‌ها بسیار مهم است، زیرا ناهماهنگی می‌تواند اعتبار شما را کاهش دهد. سایتیشن‌های با کیفیت از سایت‌های معتبر، به‌ویژه سایت‌های مرتبط با صنعت شما، تأثیر بیشتری بر رتبه‌بندی محلی دارند.'
    },
    {
      question: 'چه مدت طول می‌کشد تا نتایج سئو محلی را مشاهده کنیم؟',
      answer: 'زمان مشاهده نتایج سئو محلی به عوامل مختلفی بستگی دارد، از جمله رقابت در منطقه و صنعت شما، وضعیت فعلی حضور آنلاین شما، و کیفیت اجرای استراتژی‌های سئو محلی. به طور کلی، می‌توانید انتظار داشته باشید برخی تغییرات اولیه را در 4-8 هفته مشاهده کنید، مانند بهبود در رتبه‌بندی برای کلمات کلیدی با رقابت کمتر. اما نتایج قابل توجه و پایدار معمولاً بین 3 تا 6 ماه زمان می‌برد. بهبود در پروفایل کسب‌وکاری گوگل معمولاً سریع‌تر از سایر جنبه‌های سئو محلی نتیجه می‌دهد.'
    },
    {
      question: 'آیا نظرات مشتریان واقعاً برای سئو محلی مهم هستند؟',
      answer: 'بله، نظرات مشتریان یکی از مهم‌ترین فاکتورهای سئو محلی هستند. طبق تحقیقات، نظرات تأثیر قابل توجهی بر رتبه‌بندی محلی، اعتماد مصرف‌کننده و نرخ تبدیل دارند. گوگل از تعداد، کیفیت، تازگی و تنوع نظرات به عنوان سیگنال‌های رتبه‌بندی استفاده می‌کند. همچنین، 93% مصرف‌کنندگان می‌گویند که نظرات آنلاین بر تصمیم خرید آنها تأثیر می‌گذارد. پاسخگویی منظم و حرفه‌ای به نظرات (چه مثبت و چه منفی) نیز اهمیت زیادی دارد و می‌تواند تأثیر مثبتی بر رتبه‌بندی و اعتبار کسب‌وکار شما داشته باشد.'
    },
    {
      question: 'آیا سئو محلی فقط برای کسب‌وکارهای دارای فروشگاه فیزیکی مهم است؟',
      answer: 'اگرچه سئو محلی برای کسب‌وکارهای دارای محل فیزیکی ضروری‌تر است، اما برای کسب‌وکارهایی که خدمات خود را در مناطق خاص ارائه می‌دهند (مانند شرکت‌های خدماتی، پیمانکاران، مشاوران با منطقه خدمات‌رسانی مشخص) نیز بسیار مهم است. حتی اگر دفتر یا فروشگاه فیزیکی ندارید، اما به یک منطقه جغرافیایی خاص خدمات ارائه می‌کنید، می‌توانید از استراتژی‌های سئو محلی برای هدف‌گیری مشتریان در آن منطقه استفاده کنید. گوگل گزینه‌هایی مانند "منطقه خدمات‌رسانی" را در پروفایل کسب‌وکاری ارائه می‌دهد که مخصوص این نوع کسب‌وکارها طراحی شده است.'
    }
  ];

  return (
    <div dir="rtl" className="font-persian relative overflow-x-hidden">
      <SEOHead
        title="خدمات سئو محلی | بهینه‌سازی جستجوی محلی و گوگل بیزینس"
        description="خدمات تخصصی سئو محلی، بهینه‌سازی پروفایل کسب‌وکاری گوگل، مدیریت سایتیشن‌ها و بهبود رتبه در نتایج جستجوی محلی برای کسب‌وکارهای محلی"
      />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                خدمات تخصصی سئو محلی
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-normal">
                خدمات <span className="text-primary">سئو محلی</span> و بهینه‌سازی جستجوی منطقه‌ای
              </h1>

              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                با استفاده از تکنیک‌های پیشرفته سئو محلی، حضور کسب‌وکار شما را در نتایج جستجوی محلی گوگل تقویت می‌کنیم و مشتریان منطقه شما را به سمت کسب‌وکارتان هدایت می‌کنیم.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="#local-seo"
                  className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سئو محلی
                </a>
                <a
                  href="#gbp"
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  گوگل بیزینس پروفایل
                </a>
                <a
                  href="#citations"
                  className="px-6 py-3 rounded-full bg-white border border-primary/20 text-primary font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
                >
                  سایتیشن‌ها (Citations)
                </a>
              </div>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0">
                <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                  چرا سئو محلی؟
                </span>

                <h2 className="text-3xl font-bold mb-6">
                  چرا <span className="text-primary">سئو محلی</span> برای کسب و کار شما ضروری است؟
                </h2>

                <p className="text-foreground/80 mb-6 leading-relaxed">
                  در دنیای رقابتی امروز، حضور قدرتمند در نتایج جستجوی محلی می‌تواند تفاوت بزرگی در موفقیت کسب‌وکار شما ایجاد کند. حدود 46% از جستجوهای گوگل به دنبال اطلاعات محلی هستند.
                </p>

                <ul className="space-y-3">
                  {[
                    'افزایش رؤیت‌پذیری در میان مشتریان محلی و بالقوه',
                    'جذب ترافیک هدفمند با قصد خرید بالا',
                    'برتری نسبت به رقبای محلی در نتایج جستجو',
                    'بهبود اعتبار و اعتماد برند در بازار محلی',
                    'افزایش بازدیدکنندگان فیزیکی و تماس‌های تلفنی'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="text-primary h-5 w-5 mt-1 ml-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-on-scroll opacity-0 delay-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">نمایش در نقشه</h3>
                    <p className="text-foreground/70 text-sm">86% کاربران از گوگل مپ برای یافتن کسب‌وکارهای محلی استفاده می‌کنند.</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <Star className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">نظرات محلی</h3>
                    <p className="text-foreground/70 text-sm">93% مصرف‌کنندگان می‌گویند نظرات آنلاین بر تصمیم خرید آنها تأثیر می‌گذارد.</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <Building className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">سایتیشن‌ها</h3>
                    <p className="text-foreground/70 text-sm">سایتیشن‌های با کیفیت تا 25% رتبه شما را در نتایج محلی بهبود می‌بخشند.</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">نرخ تبدیل بالا</h3>
                    <p className="text-foreground/70 text-sm">78% جستجوهای محلی در موبایل به بازدید فیزیکی در 24 ساعت منجر می‌شوند.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local SEO Services Section */}
        <section
          id="local-seo"
          ref={localSeoRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سئو محلی
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">سئو محلی</span> برای کسب‌وکارهای منطقه‌ای
              </h2>

              <p className="text-foreground/80 leading-relaxed">
                سئو محلی به مجموعه استراتژی‌هایی اطلاق می‌شود که باعث افزایش رؤیت‌پذیری کسب‌وکار شما در نتایج جستجوی محلی می‌شود. این استراتژی‌ها به شما کمک می‌کند تا در زمانی که مشتریان بالقوه در نزدیکی شما به دنبال محصولات یا خدمات شما هستند، کسب‌وکارتان نمایش داده شود.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {localSeoServices.map((service, idx) => (
                <div
                  key={idx}
                  className="neo-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو محلی
              </a>
            </div>
          </div>
        </section>

        {/* Google Business Profile Section */}
        <section
          id="gbp"
          ref={gbpRef}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                گوگل بیزینس پروفایل
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">بهینه‌سازی گوگل بیزینس پروفایل</span>
              </h2>

              <p className="text-foreground/80 leading-relaxed">
                پروفایل کسب‌وکاری گوگل (Google Business Profile) یکی از مهم‌ترین ابزارهای سئو محلی است. این پروفایل به شما اجازه می‌دهد اطلاعات کسب‌وکارتان را در گوگل مپ و جستجوی گوگل نمایش دهید و با مشتریان بالقوه تعامل داشته باشید.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gbpServices.map((service, idx) => (
                <div
                  key={idx}
                  className="glass-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان بهینه‌سازی GBP
              </a>
            </div>
          </div>
        </section>

        {/* Citations Section */}
        <section
          id="citations"
          ref={citationsRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سایتیشن‌ها
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدمات <span className="text-primary">مدیریت سایتیشن</span> و ثبت دایرکتوری‌های محلی
              </h2>

              <p className="text-foreground/80 leading-relaxed">
                سایتیشن‌ها (Citations) به هر جایی در وب اطلاق می‌شود که نام، آدرس و شماره تلفن (NAP) کسب‌وکار شما ذکر شده باشد. سایتیشن‌های با کیفیت و سازگار، یکی از مهم‌ترین فاکتورهای رتبه‌بندی در سئو محلی هستند.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {citationServices.map((service, idx) => (
                <div
                  key={idx}
                  className="neo-morphism rounded-2xl p-8 animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="text-primary h-5 w-5 mt-0.5 ml-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-on-scroll opacity-0">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان مدیریت سایتیشن
              </a>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                فرایند کار
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                روند <span className="text-primary">همکاری</span> و فرایند بهینه‌سازی سئو محلی
              </h2>

              <p className="text-foreground/80 leading-relaxed">
                ما یک فرایند شفاف و منظم برای پروژه‌های سئو محلی داریم تا اطمینان حاصل کنیم که کسب و کار شما بهترین نتایج ممکن را در بازار محلی به دست می‌آورد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { title: 'تحلیل وضعیت محلی', desc: 'بررسی وضعیت فعلی سئو محلی و رقبای منطقه', icon: <Search className="h-6 w-6" /> },
                { title: 'استراتژی محلی', desc: 'تدوین استراتژی اختصاصی سئو محلی برای منطقه شما', icon: <MapPin className="h-6 w-6" /> },
                { title: 'بهینه‌سازی پروفایل', desc: 'تنظیم و بهینه‌سازی GBP و سایتیشن‌ها', icon: <Building className="h-6 w-6" /> },
                { title: 'محتوای محلی', desc: 'تولید محتوای هدفمند برای مخاطبان محلی', icon: <MessageSquare className="h-6 w-6" /> },
                { title: 'گزارش و بهبود', desc: 'پایش نتایج و بهینه‌سازی مداوم استراتژی', icon: <Star className="h-6 w-6" /> },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center animate-on-scroll opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 relative">
                    {step.icon}
                    {idx < 4 && (
                      <div className="absolute top-1/2 right-[-100%] w-full h-0.5 bg-primary/20 hidden md:block"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
                  <p className="text-foreground/70 text-sm text-center">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={faqRef}
          className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <span className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                سؤالات متداول
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                پاسخ به <span className="text-primary">سؤالات</span> رایج درباره سئو محلی
              </h2>

              <p className="text-foreground/80 leading-relaxed">
                در اینجا به برخی از سؤالات متداول درباره خدمات سئو محلی و بهینه‌سازی پروفایل کسب‌وکاری گوگل پاسخ داده‌ایم. اگر سؤال دیگری دارید، لطفاً با ما تماس بگیرید.
              </p>
            </div>

            <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 text-right text-lg font-medium hover:no-underline hover:bg-gray-50 text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                آماده‌اید حضور محلی خود را تقویت کنید؟
              </h2>

              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                با ما تماس بگیرید تا درباره نیازهای خاص سئو محلی شما گفتگو کنیم و راهکاری متناسب با کسب‌وکار و منطقه شما ارائه دهیم.
              </p>

              <a
                href="#contact-form"
                className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg transition-all hover:shadow-lg hover:translate-y-[-2px]"
              >
                مشاوره رایگان سئو محلی
              </a>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocalSeoServices;
