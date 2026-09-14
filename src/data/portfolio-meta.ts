import type { SupportedLanguage } from '@/types/language';

export const PILLARS = ['all', 'web-dev', 'ecommerce', 'seo', 'local-seo'] as const;
export type PortfolioPillar = (typeof PILLARS)[number];

export interface ProjectMetaItem {
  market: Record<SupportedLanguage, string>;
  timeline: Record<SupportedLanguage, string>;
  pillar: PortfolioPillar;
  faqs: Record<SupportedLanguage, Array<{ question: string; answer: string }>>;
}

export const PILLAR_LABELS: Record<SupportedLanguage, Record<PortfolioPillar, string>> = {
  en: {
    'all': 'All Projects',
    'web-dev': 'Web Design & Dev',
    'ecommerce': 'E-Commerce',
    'seo': 'SEO & Growth',
    'local-seo': 'Local SEO',
  },
  fa: {
    'all': 'همه پروژه‌ها',
    'web-dev': 'طراحی و توسعه وب',
    'ecommerce': 'تجارت الکترونیک',
    'seo': 'سئو و رشد ارگانیک',
    'local-seo': 'سئو محلی',
  },
  ar: {
    'all': 'جميع المشاريع',
    'web-dev': 'تصميم وتطوير المواقع',
    'ecommerce': 'التجارة الإلكترونية',
    'seo': 'تحسين محركات البحث',
    'local-seo': 'السيو المحلي',
  },
};

export const projectToPillar: Record<string, Exclude<PortfolioPillar, 'all'>> = {
  '4-seasons-carpet-clean': 'local-seo',
  'london-rug-cleaning': 'local-seo',
  'chocoreto': 'ecommerce',
  'odyps': 'ecommerce',
  'ramzarz-negaran': 'ecommerce',
  'remido': 'ecommerce',
  'rostateb': 'ecommerce',
  'soheil-accessory': 'ecommerce',
  'zeytoun-masoud': 'ecommerce',
  'samake-alpha': 'seo',
  'samake-bartar': 'seo',
  'behrad-dc': 'web-dev',
  'mahsun-visa': 'web-dev',
  'mapfan': 'web-dev',
  'mehromah-qazvin': 'web-dev',
  'tehran-enamel': 'web-dev',
};

export const rawCategoryToPillar: Record<string, Exclude<PortfolioPillar, 'all'>> = {
  // English
  'Local SEO & Automated Marketing': 'local-seo',
  'Local SEO': 'local-seo',
  'Web Design': 'web-dev',
  'Web Development': 'web-dev',
  'E-commerce': 'ecommerce',
  'E-commerce & Custom Development': 'ecommerce',
  'E-commerce & Logistics': 'ecommerce',
  'Healthcare SEO & Web Design': 'seo',
  'CMS Migration & SEO': 'seo',
  'SEO': 'seo',
  'SEO Projects': 'seo',

  // Persian
  'سئو محلی و بازاریابی خودکار': 'local-seo',
  'سئو محلی': 'local-seo',
  'تجارت الکترونیک و توسعه اختصاصی': 'ecommerce',
  'تجارت الکترونیک و لجستیک': 'ecommerce',
  'سئو پزشکی و طراحی وب': 'seo',
  'طراحی وب': 'web-dev',
  'توسعه وب': 'web-dev',
  'توسعه وب و سئو': 'web-dev',

  // Arabic
  'السئو المحلي والتسويق الآلي': 'local-seo',
  'تحسين محركات البحث المحلية': 'local-seo',
  'السيو المحلي': 'local-seo',
  'تصميم المواقع والسيو': 'web-dev',
  'التجارة الإلكترونية والسيو': 'ecommerce',
  'التجارة الإلكترونية والتطوير المخصص': 'ecommerce',
  'التجارة الإلكترونية واللوجستيات': 'ecommerce',
  'التجارة الإلكترونية': 'ecommerce',
  'تحسين محركات البحث الطبي وتصميم الويب': 'seo',
  'تطوير الويب وتحسين محركات البحث': 'seo',
  'تحسين محركات البحث': 'seo',
  'تصميم الويب': 'web-dev',
};

export function getProjectPillar(slug: string, rawCategory?: string): Exclude<PortfolioPillar, 'all'> {
  if (projectToPillar[slug]) {
    return projectToPillar[slug];
  }
  if (rawCategory && rawCategoryToPillar[rawCategory]) {
    return rawCategoryToPillar[rawCategory];
  }
  return 'web-dev';
}

export const projectMeta: Record<string, ProjectMetaItem> = {
  '4-seasons-carpet-clean': {
    pillar: 'local-seo',
    market: {
      en: 'London, United Kingdom',
      fa: 'لندن، انگلستان',
      ar: 'لندن، المملكة المتحدة',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How quickly did 4 Seasons Carpet Clean reach the Google Maps Top 3?',
          answer:
            'Within 60 days of implementing citation cleanup (NAP), Google Business Profile optimization, and local schema markup, target keywords entered the Map Pack top 3 across central London boroughs.',
        },
        {
          question: 'What local SEO techniques were deployed for London service areas?',
          answer:
            'We created high-intent localized landing pages, verified GBP category alignment, built authoritative UK directory citations, and automated review collection triggers.',
        },
        {
          question: 'How did automated marketing boost client retention?',
          answer:
            'Automated seasonal email and SMS sequences re-engaged residential and commercial clients for periodic maintenance, increasing repeat bookings by +15%.',
        },
      ],
      fa: [
        {
          question: 'چه مدت طول کشید تا ۴ Seasons به جمع ۳ رتبه برتر گوگل مپ لندن برسد؟',
          answer:
            'ظرف ۶۰ روز پس از پاکسازی استنادات محلی (NAP)، بهینه‌سازی کامل پروفایل کسب‌وکار گوگل (GBP) و نشانه‌گذاری‌های اسکیما، رتبه‌ها در مناطق هدف لندن وارد پک نقشه شد.',
        },
        {
          question: 'چه تکنیک‌های سئو محلی برای محدوده خدمات لندن به کار رفت؟',
          answer:
            'صفحات فرود اختصاصی برای محله‌های مختلف لندن، اسکیما محلی LocalBusiness و سیستم خودکار درخواست نظرات مشتریان پیاده‌سازی گردید.',
        },
        {
          question: 'سیستم بازاریابی خودکار چگونه نرخ بازگشت مشتریان را افزایش داد؟',
          answer:
            'با ارسال خودکار پیامک‌ها و ایمیل‌های دوره‌ای در فصول مختلف، مشتریان قبلی برای خدمات دوره‌ای مجدداً ترغیب شدند که نرخ بازگشت را ۱۵٪ ارتقا داد.',
        },
      ],
      ar: [
        {
          question: 'كم من الوقت استغرق وصول 4 Seasons إلى المراكز الثلاثة الأولى في خرائط جوجل؟',
          answer:
            'في غضون 60 يوماً من تصحيح بيانات NAP وتحسين ملف GBP وإضافة ترميز Schema المحلي، دخل الموقع قائمة أفضل 3 نتائج محلية في لندن.',
        },
        {
          question: 'ما هي استراتيجيات السيو المحلي المتبعة لمناطق لندن؟',
          answer:
            'تم إنشاء صفحات مخصصة لكل حي جغرافي مع ربط بيانات LocalBusiness وإدارة المراجعات الدورية لتعزيز الثقة.',
        },
        {
          question: 'كيف ساعد نظام التسويق الآلي في الحفاظ على العملاء؟',
          answer:
            'عبر رسائل تذكير تلقائية مجدولة موسمياً تعيد تنشيط العملاء السابقين لحجز خدمات التنظيف الدورية بنسبة زيادة بلغت ١٥٪.',
        },
      ],
    },
  },

  'london-rug-cleaning': {
    pillar: 'local-seo',
    market: {
      en: 'London, United Kingdom',
      fa: 'لندن، انگلستان',
      ar: 'لندن، المملكة المتحدة',
    },
    timeline: {
      en: '2 Months',
      fa: '۲ ماه',
      ar: '٢ شهران',
    },
    faqs: {
      en: [
        {
          question: 'Why was Astro v5 chosen for London Rug Cleaning?',
          answer:
            'Astro v5 outputs ultra-fast static HTML with zero client JavaScript by default, clocking a 0.4s load time and 99/100 Core Web Vitals on mobile devices.',
        },
        {
          question: 'How was local visibility achieved across London postcodes?',
          answer:
            'By building localized programmatic landing pages, targeted Schema.org structured data, and high-trust British business directory citations.',
        },
        {
          question: 'How did the quote request system improve lead generation?',
          answer:
            'A streamlined multi-step interactive quote calculator generated a +240% increase in qualified quote requests.',
        },
      ],
      fa: [
        {
          question: 'چرا فریم‌ورک مدرن Astro برای این وب‌سایت انتخاب شد؟',
          answer:
            'استرو بدون بارگذاری جاوااسکریپت اضافی، زمان لود ۰.۴ ثانیه و امتیاز ۹۹ از ۱۰۰ گوگل پیج‌اسپید را روی موبایل رقم زد.',
        },
        {
          question: 'چگونه سئوی محلی در تمام مناطق پستی لندن بهبود یافت؟',
          answer:
            'با ایجاد صفحات هدفمند برای هر منطقه پستی، اسکیماهای استاندارد انگلستان و ثبت استنادات معتبر بریتانیایی.',
        },
        {
          question: 'سیستم استعلام قیمت چه اثری بر ثبت سفارشات داشت؟',
          answer:
            'فرم محاسبه‌گر چندمرحله‌ای قیمت، ثبت درخواست استعلام را تا ۲۴۰٪ ارتقا داد.',
        },
      ],
      ar: [
        {
          question: 'لماذا تم اختيار إطار العمل Astro لموقع London Rug Cleaning؟',
          answer:
            'يوفر Astro سرعة تحميل فائقة بلغت ٠.٤ ثانية مع صفر جافا سكريبت غير ضروري ودرجة ٩٩٪ في Core Web Vitals.',
        },
        {
          question: 'كيف تم تحقيق الظهور المحلي في مختلف مناطق لندن؟',
          answer:
            'من خلال صفحات هبوط مخصصة لكل رمز بريدي وترميزات بيانات منظمة تخدم خوارزميات جوجل المحلية.',
        },
        {
          question: 'ما هو تأثير حاسبة الأسعار على جذب العملاء؟',
          answer:
            'أدت حاسبة عروض الأسعار التفاعلية إلى زيادة طلبات العملاء بنسبة +٢٤٠٪.',
        },
      ],
    },
  },

  'chocoreto': {
    pillar: 'ecommerce',
    market: {
      en: 'Toronto & Markham, Canada',
      fa: 'تورنتو و مارکام، کانادا',
      ar: 'تورنتو وماركهام، كندا',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How does the custom gift box builder work on Chocoreto?',
          answer:
            'We developed an interactive "Build Your Box" WooCommerce configurator letting clients pick bonbon flavors, custom ribbon colors, and personalized greeting cards in real time.',
        },
        {
          question: 'How does the store manage local delivery across the GTA?',
          answer:
            'Integrated postal code validation with Canada Post API alongside scheduled local pickup and courier delivery options.',
        },
        {
          question: 'What impact did the redesigned store have on conversion rates?',
          answer:
            'Online conversion rate surged by +185% during peak holiday shopping periods (Valentine’s and Mother’s Day).',
        },
      ],
      fa: [
        {
          question: 'ابزار اختصاصی جعبه‌ساز هدیه چوکورتو چگونه کار می‌کند؟',
          answer:
            'یک سیستم تعاملی ووکامرسی پیاده شد که مشتریان می‌توانند طعم‌های شکلات، اندازه جعبه و متن کارت تبریک را به دلخواه انتخاب و سفارش دهند.',
        },
        {
          question: 'لجستیک و ارسال سفارشات در منطقه تورنتو بزرگ چگونه مدیریت می‌شود؟',
          answer:
            'با اتصال وب‌سرویس Canada Post و سیستم اعتبارسنجی کد پستی و انتخاب تاریخ تحویل دقیق.',
        },
        {
          question: 'تاثیر طراحی جدید بر فروش چه میزان بود؟',
          answer:
            'نرخ تبدیل فروشگاه در ایام مناسبتی مانند ولنتاین و روز مادر تا ۱۸۵٪ افزایش یافت.',
        },
      ],
      ar: [
        {
          question: 'كيف تعمل ميزة تخصيص علب الهدايا في متجر Chocoreto؟',
          answer:
            'تم تطوير أداة تفاعلية تتيح للمشترين اختيار نكهات الشوكولاتة وحجم العلبة وبطاقة الإهداء بمرونة تامة.',
        },
        {
          question: 'كيف تتم إدارة التوصيل المحلي في منطقة تورنتو الكبرى؟',
          answer:
            'عبر التكامل مع واجهة بريد كندا وتحديد مواعيد التسليم وفق الرمز البريدي بدقة.',
        },
        {
          question: 'ما هو التأثير على المبيعات ونسبة التحويل؟',
          answer:
            'ارتفعت نسبة التحويل الإجمالية بأكثر من +١٨٥٪ في المواسم والمناسبات الخاصة.',
        },
      ],
    },
  },

  'odyps': {
    pillar: 'ecommerce',
    market: {
      en: 'Stockholm, Sweden',
      fa: 'استکهلم، سوئد',
      ar: 'ستوكهولم، السويد',
    },
    timeline: {
      en: '3.5 Months',
      fa: '۳.۵ ماه',
      ar: '٣.٥ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How was ODYPS tailored for the European luxury rug market?',
          answer:
            'A minimalist Scandinavian visual aesthetic highlighting artisanal craftsmanship, high-resolution zoom galleries, and multi-currency checkout.',
        },
        {
          question: 'What payment and international shipping methods are integrated?',
          answer:
            'Integrated Stripe & Klarna European payment gateways, with DHL/UPS automated rate calculators across the European Union.',
        },
        {
          question: 'What was the growth in average order value (AOV)?',
          answer:
            'Average Order Value rose by +65% thanks to premium storytelling, woven texture galleries, and certificate of authenticity displays.',
        },
      ],
      fa: [
        {
          question: 'سایت ODYPS چگونه برای بازار لوکس اروپا بهینه‌سازی شد؟',
          answer:
            'طراحی مینیمال و لوکس به سبک اسکاندیناوی، قابلیت زوم میکروسکوپی روی بافت فرش‌ها و پشتیبانی از چند ارز اروپایی.',
        },
        {
          question: 'چه درگاه‌های پرداختی برای مشتریان اروپایی متصل گردید؟',
          answer:
            'درگاه‌های امن استرایپ و کلارنا (Klarna) همراه با اتصال خودکار به سیستم حمل‌ونقل بین‌المللی DHL.',
        },
        {
          question: 'تاثیر برندینگ بر ارزش سبد خرید (AOV) چه بود؟',
          answer:
            'میانگین ارزش هر سفارش به دلیل ارائه شناسنامه اصالت و هویت بصری معتبر ۶۵٪ افزایش یافت.',
        },
      ],
      ar: [
        {
          question: 'كيف تم تصميم متجر ODYPS لسوق السجاد الفاخر في أوروبا؟',
          answer:
            'تصميم اسكندنافي بسيط وراقٍ يبرز تفاصيل الحياكة اليدوية مع إمكانية تكبير الصور بدقة عالية ودعم الدفع بعملات متعددة.',
        },
        {
          question: 'ما هي بوابات الدفع والشحن المعتمدة؟',
          answer:
            'التكامل مع Stripe وKlarna وخيارات الشحن الدولي السريع عبر DHL إلى مختلف دول الاتحاد الأوروبي.',
        },
        {
          question: 'ما هي النتائج المحققة في متوسط قيمة الطلبات؟',
          answer:
            'ارتفع متوسط قيمة الطلب (AOV) بنسبة +٦٥٪ بفضل عرض شهادات الأصالة والهوية المتميزة.',
        },
      ],
    },
  },

  'ramzarz-negaran': {
    pillar: 'ecommerce',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '4 Months',
      fa: '۴ ماه',
      ar: '٤ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What security measures protect the Ramzarz Negaran platform?',
          answer:
            'Enterprise-grade SSL, dedicated firewall configurations, secure API authentication, and multi-step KYC verification for hardware purchases.',
        },
        {
          question: 'How does the cryptocurrency mining hardware configurator operate?',
          answer:
            'Customers can calculate real-time profitability, electricity consumption, and hash rate returns before purchasing ASIC equipment.',
        },
        {
          question: 'What was the organic growth in crypto hardware search queries?',
          answer:
            'Achieved top 3 rankings for major ASIC miner model keywords, driving a +320% increase in qualified organic sales.',
        },
      ],
      fa: [
        {
          question: 'چه تدابیر امنیتی در پلتفرم رمز ارز نگاران پیاده شد؟',
          answer:
            'فایروال‌های سخت‌افزاری و نرم‌افزاری، رمزنگاری پیشرفته تراکنش‌ها و اعتبارسنجی چندمرحله‌ای احراز هویت خریداران.',
        },
        {
          question: 'سیستم محاسبه‌گر سودآوری ماینرها چگونه کار می‌کند؟',
          answer:
            'مشتریان می‌توانند درآمد لحظه‌ای، مصرف برق و زمان بازگشت سرمایه هر دستگاه استخراج را قبل از خرید محاسبه کنند.',
        },
        {
          question: 'سئوی تخصصی چه رتبه‌هایی برای فروشگاه ایجاد کرد؟',
          answer:
            'رتبه‌های ۱ تا ۳ گوگل در عبارات کلیدی خرید ماینر قانونی و افزایش ۳۲۰ درصدی فروش ارگانیک.',
        },
      ],
      ar: [
        {
          question: 'ما هي تدابير الأمان المطبقة في منصة Ramzarz Negaran؟',
          answer:
            'جدران حماية متقدمة، تشفير شامل للمعاملات، ونظام تحقق آمن متعدد الخطوات من هوية المشترين.',
        },
        {
          question: 'كيف تعمل حاسبة ربحية أجهزة التعدين؟',
          answer:
            'تتيح للعميل حساب استهلاك الطاقة ومعدل الهاش والربحية المتوقعة في الوقت الفعلي قبل الشراء.',
        },
        {
          question: 'ما هي نتائج السيو العضوي للكلمات التنافسية؟',
          answer:
            'الوصول إلى المراكز الثلاثة الأولى في كلمات أجهزة التعدين ونمو المبيعات بنسبة +٣٢٠٪.',
        },
      ],
    },
  },

  'remido': {
    pillar: 'ecommerce',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How does the Remido store facilitate online musical instrument sales?',
          answer:
            'Integrated high-fidelity audio previews, 360-degree instrument viewers, and detailed acoustic spec guides for musicians.',
        },
        {
          question: 'What performance optimizations were applied to the large product catalog?',
          answer:
            'Optimized WooCommerce database indexing, LiteSpeed page caching, and WebP image generation for instant browsing.',
        },
        {
          question: 'How much did mobile checkout completion improve?',
          answer:
            'Streamlined single-page checkout improved mobile purchase completion by +85%.',
        },
      ],
      fa: [
        {
          question: 'فروشگاه رمیدو چگونه انتخاب ساز موسیقی را برای خریداران آسان می‌کند؟',
          answer:
            'با اضافه کردن نمونه صدای باکیفیت هر ساز، تصاویر ۳۶۰ درجه و مشخصات دقیق چوب و سیم‌های ساز.',
        },
        {
          question: 'چه بهینه‌سازی‌هایی برای کاتالوگ حجیم سازها انجام شد؟',
          answer:
            'ایندکس‌گذاری اختصاصی دیتابیس ووکامرس، کش لایه سرور LiteSpeed و تبدیل خودکار تصاویر به وب‌پی.',
        },
        {
          question: 'بهبود فرآیند تسویه‌حساب موبایلی چقدر بود؟',
          answer:
            'تسویه‌حساب تک‌مرحله‌ای سریع، نرخ تکمیل خرید در گوشی‌های هوشمند را ۸۵٪ ارتقا داد.',
        },
      ],
      ar: [
        {
          question: 'كيف يسهل متجر Remido شراء الآلات الموسيقية عبر الإنترنت؟',
          answer:
            'عبر توفير عينات صوتية عالية الدقة لكل آلة، واستعراض الصور بزاوية ٣٦٠ درجة ومواصفات تفصيلية.',
        },
        {
          question: 'ما هي التحسينات التي أُدخلت على سرعة تصفح المنتجات؟',
          answer:
            'فهرسة قاعدة بيانات ووكومرس، واستخدام كاش LiteSpeed وتقنية WebP لسرعة تصفح فائقة.',
        },
        {
          question: 'ما نسبة تحسن عمليات إتمام الشراء عبر الموبايل؟',
          answer:
            'أدى تبسيط صفحة الدفع إلى ارتفاع نسبة إكمال الطلبات عبر الهواتف الذكية بنسبة +٨٥٪.',
        },
      ],
    },
  },

  'rostateb': {
    pillar: 'ecommerce',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '2.5 Months',
      fa: '۲.۵ ماه',
      ar: '٢.٥ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How was Rostateb structured for bulk B2B cosmetic packaging orders?',
          answer:
            'Dynamic wholesale tier pricing, minimum order quantity (MOQ) rules, and instant sample request forms for production plants.',
        },
        {
          question: 'How does the product catalog showcase packaging specifications?',
          answer:
            'Comprehensive volume, neck size, polymer grade (PET/PP), and closure compatibility specifications for pharmaceutical and cosmetic brands.',
        },
        {
          question: 'What was the growth in manufacturing client acquisition?',
          answer:
            'B2B client inquiries from cosmetic manufacturers surged by +175% within 90 days.',
        },
      ],
      fa: [
        {
          question: 'فروشگاه رُستاطب چگونه برای سفارشات عمده بسته‌بندی آرایشی بهینه‌سازی شد؟',
          answer:
            'قیمت‌گذاری پلکانی بر اساس تیراژ، تعیین حداقل سفارش (MOQ) و فرم درخواست نمونه تست برای کارخانه‌ها.',
        },
        {
          question: 'مشخصات ظروف و بطری‌ها چگونه ارائه شده است؟',
          answer:
            'درج دقیق حجم، سایز دهانه، جنس پلیمر (PET/PE) و نوع درب متناسب با استانداردهای دارویی و بهداشتی.',
        },
        {
          question: 'رشد جذب مشتریان کارخانه‌ای چه میزان بود؟',
          answer:
            'دریافت سفارشات عمده از برندهای آرایشی و بهداشتی طی ۳ ماه ۱۷۵٪ افزایش یافت.',
        },
      ],
      ar: [
        {
          question: 'كيف تم تخصيص منصة Rostateb للطلبات التجارية B2B في التعبئة والتغليف؟',
          answer:
            'أسعار متدرجة حسب الكميات، تحديد الحد الأدنى للطلب (MOQ)، ونموذج لطلب عينات مجانية للمصانع.',
        },
        {
          question: 'كيف يتم عرض مواصفات العبوات البلاستيكية ومطابقتها للمعايير؟',
          answer:
            'بيانات تفصيلية عن السعة، حجم الفوهة، نوع المادة (PET/PE) والتوافق مع المستحضرات الطبية والتجميلية.',
        },
        {
          question: 'ما هي نسبة زيادة استفسارات المصانع والشركات؟',
          answer:
            'ارتفعت استفسارات التوريد بالجملة من شركات التجميل بنسبة +١٧٥٪ في غضون ٩٠ يوماً.',
        },
      ],
    },
  },

  'soheil-accessory': {
    pillar: 'ecommerce',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '2.5 Months',
      fa: '۲.۵ ماه',
      ar: '٢.٥ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What theme and styling approach was used for Soheil Accessory?',
          answer:
            'Customized WoodMart framework engineered for ultra-fast mobile navigation, luxury jewelry typography, and high-impact hero banners.',
        },
        {
          question: 'How does the store handle high traffic spikes during seasonal flash sales?',
          answer:
            'Redis object caching, Cloudflare CDN integration, and optimized database queries guarantee zero downtime during peak promotional events.',
        },
        {
          question: 'What was the recorded increase in online transactions?',
          answer:
            'E-commerce sales increased by +260% in the first quarter post-launch.',
        },
      ],
      fa: [
        {
          question: 'چه تم و رویکرد طراحی برای فروشگاه سهیل اکسسوری انتخاب شد؟',
          answer:
            'پوسته اختصاصی شده WoodMart با تمرکز ویژه بر موبایل، نمایش لوکس بدلیجات و اکسسوری‌ها و بنرهای تخفیف فصلی.',
        },
        {
          question: 'سایت چگونه ترافیک سنگین حراجی‌ها و بلک فرایدی را مدیریت می‌کند؟',
          answer:
            'با استفاده از ردیس (Redis)، شبکه توزیع محتوا و بهینه‌سازی کوئری‌های ووکامرس برای حفظ پایداری ۱۰۰ درصدی سرور.',
        },
        {
          question: 'میزان رشد تراکنش‌های آنلاین فروشگاه چقدر بوده است؟',
          answer:
            'فروش آنلاین در سه‌ماهه اول پس از لانچ رشد ۲۶۰ درصدی را تجربه کرد.',
        },
      ],
      ar: [
        {
          question: 'ما هو الأسلوب المتبع في تصميم متجر Soheil Accessory؟',
          answer:
            'قالب وودمارت مخصص يركز على تصفح الموبايل، والخطوط الأنيقة التي تبرز بريق المجوهرات والإكسسوارات الفاخرة.',
        },
        {
          question: 'كيف يتعامل المتجر مع تدفق الزوار في مواسم التخفيضات الكبرى؟',
          answer:
            'عبر كاش Redis، والتكامل مع شبكة Cloudflare، وتحسين قاعدة البيانات لمنع أي بطء أو توقف.',
        },
        {
          question: 'ما هي نسبة الزيادة في المبيعات الإلكترونية؟',
          answer:
            'ارتفعت معاملات الشراء عبر الإنترنت بنسبة +٢٦٠٪ في الربع الأول بعد الإطلاق.',
        },
      ],
    },
  },

  'zeytoun-masoud': {
    pillar: 'ecommerce',
    market: {
      en: 'Roudbar & Tehran, Iran',
      fa: 'رودبار و تهران، ایران',
      ar: 'رودبار وطهران، إيران',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'How does Zeytoun Masoud manage fresh artisanal food shipping?',
          answer:
            'Cold-chain packaging logistics integration with regional courier APIs ensuring olive and oil products arrive fresh without spillage.',
        },
        {
          question: 'What content strategy positioned Zeytoun Masoud as an organic food leader?',
          answer:
            'In-depth guides on extra-virgin olive oil grading, acid levels, and health benefits, establishing high organic authority.',
        },
        {
          question: 'What was the growth in repeat customer purchases?',
          answer:
            'Repeat customer purchase rate reached 48% through automated SMS restock alerts and loyalty rewards.',
        },
      ],
      fa: [
        {
          question: 'فروشگاه زیتون مسعود چگونه چالش ارسال محصولات تازه را حل کرد؟',
          answer:
            'با تجهیز بسته‌بندی‌های ضدضربه و عایق دما و اتصال وب‌سرویس‌های لجستیک پستی و تیپاکس برای تحویل سریع.',
        },
        {
          question: 'استراتژی محتوای سئو چگونه اعتماد خریداران به اصالت روغن زیتون را جلب کرد؟',
          answer:
            'انتشار مقالات تخصصی پیرامون درصد اسیدیته، روش فرابکر و نحوه تشخیص روغن زیتون اصل رودبار.',
        },
        {
          question: 'نرخ خرید مجدد مشتریان (Retention) به چه عددی رسید؟',
          answer:
            'با اجرای سیستم پیامکی باشگاه مشتریان و تخفیف‌های دوره‌ای، نرخ خرید مجدد به ۴۸٪ رسید.',
        },
      ],
      ar: [
        {
          question: 'كيف تغلب متجر زيتون مسعود على تحديات شحن المواد الغذائية الطازجة؟',
          answer:
            'من خلال تغليف مخصص مقاوم للحرارة والصدمات والتكامل مع شركات الشحن السريع لضمان وصول المنتجات طازجة.',
        },
        {
          question: 'ما هي استراتيجية المحتوى المتبعة لبناء ثقة المستهلكين؟',
          answer:
            'نشر أدلة شاملة حول مواصفات زيت الزيتون البكر الممتاز، ونسب الحموضة وطرق فحص الجودة.',
        },
        {
          question: 'ما هي نسبة تكرار الشراء لدى العملاء؟',
          answer:
            'بلغت نسبة ولاء العملاء وإعادة الشراء ٤٨٪ عبر إشعارات التذكير التلقائية وبرامج المكافآت.',
        },
      ],
    },
  },

  'samake-alpha': {
    pillar: 'seo',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What SEO strategy established Samake Alpha’s audiology leadership?',
          answer:
            'Authoritative medical content siloing, answering patient questions on hearing aid technology, and obtaining top rankings for audiology consultations.',
        },
        {
          question: 'How does the website convert worried patients into clinic appointments?',
          answer:
            'Through free online hearing screening quizzes, transparent brand comparisons, and frictionless WhatsApp and phone scheduling.',
        },
        {
          question: 'What ranking milestones were achieved in Google organic results?',
          answer:
            'Dominating position #1 for high-intent audiology and hearing aid keywords in Tehran with a 4.2x organic traffic surge.',
        },
      ],
      fa: [
        {
          question: 'چه استراتژی سئویی کلینیک سمعک آلفا را به رتبه یک گوگل تبدیل کرد؟',
          answer:
            'معماری سیلوی محتوایی پزشکی، پاسخ به سوالات بیماران کم‌شنوا، بهینه‌سازی کلمات کلیدی تجویز سمعک و اسکیما MedicalWebPage.',
        },
        {
          question: 'چگونه مراجعین سایت به نوبت حضوری در کلینیک تبدیل می‌شوند؟',
          answer:
            'تست آنلاین شنوایی‌سنجی اولیه، مقایسه تخصصی برندهای سمعک و رزرو سریع مشاوره از طریق واتس‌اپ و تماس تلفنی.',
        },
        {
          question: 'نتایج کلیدی سئو در چه بازه زمانی حاصل شد؟',
          answer:
            'دستیابی به رتبه ۱ گوگل در پرجستجوترین عبارات سمعک و رشد ۴.۲ برابری ترافیک ارگانیک بیماران.',
        },
      ],
      ar: [
        {
          question: 'ما هي استراتيجية السيو التي جعلت عيادة Samake Alpha في صدارة نتائج البحث؟',
          answer:
            'تنظيم محتوى طبي موثوق، استهداف كلمات فحص السمع وأجهزة السمع، وتطبيق ترميز MedicalWebPage.',
        },
        {
          question: 'كيف يحول الموقع الزوار إلى مواعيد كشف في العيادة؟',
          answer:
            'عبر اختبار مبدئي لتقييم السمع عبر الإنترنت، ومقارنة مواصفات السماعات، وتسهيل الحجز المباشر.',
        },
        {
          question: 'ما هي أبرز نتائج الظهور العضوي على محرك جوجل؟',
          answer:
            'تصدر المركز الأول في أهم عبارات أجهزة السمع في طهران ونمو الزيارات بنسبة ٤.٢ ضعفاً.',
        },
      ],
    },
  },

  'samake-bartar': {
    pillar: 'seo',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '2 Months',
      fa: '۲ ماه',
      ar: '٢ شهران',
    },
    faqs: {
      en: [
        {
          question: 'How did Samakebartar recover its search rankings after migration?',
          answer:
            'A surgical 301 redirect map, resolving 404 crawl errors, pruning dead legacy URLs, and rebuilding Core Web Vitals performance.',
        },
        {
          question: 'What CMS architecture replaced the outdated legacy platform?',
          answer:
            'A clean, modern WordPress setup with optimized taxonomy and mobile-first responsive templates.',
        },
        {
          question: 'What was the measurable outcome of the SEO recovery effort?',
          answer:
            'A 100% recovery of legacy search rankings within 45 days, followed by a +140% boost in patient consultations.',
        },
      ],
      fa: [
        {
          question: 'چگونه رتبه‌های گوگل سمعک برتر پس از مهاجرت سایت احیا شد؟',
          answer:
            'با نگاشت دقیق ریدایرکت‌های ۳۰۱، رفع خطاهای ۴۰۴ سرچ‌کنسول، پاکسازی لینک‌های اسپم قدیمی و ارتقای امتیاز Core Web Vitals.',
        },
        {
          question: 'سیستم مدیریت محتوای قبلی با چه پلتفرمی جایگزین شد؟',
          answer:
            'وردپرس مدرن با ساختار دسته‌بندی استاندارد، تم سبک و رابط کاربری واکنش‌گرا و سریع.',
        },
        {
          question: 'نتیجه ملموس این پروژه پس از لانچ چه بود؟',
          answer:
            'بازگشت ۱۰۰٪ کلمات کلیدی افت‌کرده در کمتر از ۴۵ روز و رشد ۱۴۰ درصدی تماس‌های ورودی متقاضیان سمعک.',
        },
      ],
      ar: [
        {
          question: 'كيف استعاد موقع Samakebartar تصنيفاته على جوجل بعد ترحيل الموقع؟',
          answer:
            'من خلال إعادة توجيه دقيقة 301، وتصحيح أخطاء الفهرسة 404، وتحسين سرعة الصفحة ومؤشرات Core Web Vitals.',
        },
        {
          question: 'ما هي المنصة البديلة للنظام القديم؟',
          answer:
            'نظام ووردبريس حديث مع بنية تصنيفات مهيكلة وتصميم سريع متوافق تماماً مع الهواتف الذكية.',
        },
        {
          question: 'ما هي النتيجة بعد إطلاق الموقع المحدث؟',
          answer:
            'استعادة كاملة للمراكز التنافسية خلال ٤٥ يوماً وزيادة الاستشارات بنسبة +١٤٠٪.',
        },
      ],
    },
  },

  'behrad-dc': {
    pillar: 'web-dev',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '2.5 Months',
      fa: '۲.۵ ماه',
      ar: '٢.٥ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What was the main focus for the Behrad Dental Clinic website?',
          answer:
            'Creating an ultra-fast, patient-friendly medical portal with intuitive appointment booking and clear specialized dentistry service information.',
        },
        {
          question: 'How does the site build patient trust and conversions?',
          answer:
            'Through high-quality before/after galleries, transparent treatment workflows, doctor credentials, and direct WhatsApp consultation CTAs.',
        },
        {
          question: 'What CMS and optimization tools power the website?',
          answer:
            'A tailored WordPress installation optimized with high-performance caching, medical schema markup, and responsive UI components.',
        },
      ],
      fa: [
        {
          question: 'تمرکز اصلی در طراحی وب‌سایت کلینیک دندانپزشکی بهراد چه بود؟',
          answer:
            'ایجاد یک پلتفرم درمانی با رابط کاربری بسیار ساده، رزرو آسان نوبت و معرفی جامع خدمات تخصصی دندانپزشکی.',
        },
        {
          question: 'چگونه اعتماد مراجعین و نرخ تبدیل نوبت‌دهی افزایش یافت؟',
          answer:
            'از طریق گالری نتایج درمان‌ها، معرفی شفاف رزومه پزشکان و دکمه‌های سریع تماس و مشاوره آنلاین واتس‌اپ.',
        },
        {
          question: 'از چه ساختار فنی برای سرعت و سئو سایت استفاده شد؟',
          answer:
            'وردپرس بهینه‌سازی شده با سیستم کش پیشرفته، اسکیما MedicalClinic و معماری سریع موبایل‌محور.',
        },
      ],
      ar: [
        {
          question: 'ما هو التركيز الأساسي في تصميم موقع عيادة بهراد لطب الأسنان؟',
          answer:
            'توفير منصة طبية سريعة وسهلة الاستخدام لحجز المواعيد والتعرف على الخدمات العلاجية والتجميلية.',
        },
        {
          question: 'كيف تم بناء ثقة المرضى وزيادة معدل الحجوزات؟',
          answer:
            'من خلال معرض لنتائج الحالات السابقة، إبراز مؤهلات الأطباء، وتسهيل التواصل الفوري عبر الواتساب.',
        },
        {
          question: 'ما هي البنية التقنية المستخدمة؟',
          answer:
            'نظام ووردبريس مخصص مع ترميز MedicalClinic وتحسين سرعة التصفح على الهواتف الذكية.',
        },
      ],
    },
  },

  'mahsun-visa': {
    pillar: 'web-dev',
    market: {
      en: 'Istanbul & Tehran',
      fa: 'استانبول و تهران',
      ar: 'إسطنبول وطهران',
    },
    timeline: {
      en: '3 Months',
      fa: '۳ ماه',
      ar: '٣ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What features were essential for the Mahsun Visa immigration portal?',
          answer:
            'Interactive visa assessment eligibility quizzes, comprehensive country destination guides, and seamless booking for immigration consultants.',
        },
        {
          question: 'How does the portal maintain high organic search rankings for immigration terms?',
          answer:
            'A targeted content strategy targeting study abroad and residency keywords backed by technical SEO and multi-language architecture.',
        },
        {
          question: 'What was the result on qualified consultation leads?',
          answer:
            'Online consultation bookings grew by +210% within 4 months of launch.',
        },
      ],
      fa: [
        {
          question: 'امکانات کلیدی پورتال مهاجرتی ماهسون ویزا چه بود؟',
          answer:
            'آزمون آنلاین سنجش شرایط مهاجرت، راهنماهای جامع کشورهای مقصد و سیستم رزرو وقت مشاوره با وکلای مهاجرتی.',
        },
        {
          question: 'استراتژی سئو در حوزه مهاجرت تحصیلی چگونه پیاده شد؟',
          answer:
            'تولید محتوای ساختاریافته و خوشه‌ای برای کلیدواژه‌های پرجستجو همراه با سئوی تکنیکال و پاسخ به پرسش‌های حقوقی پرتکرار.',
        },
        {
          question: 'رشد درخواست‌های مشاوره پس از راه‌اندازی چقدر بود؟',
          answer:
            'ثبت فرم‌های مشاوره تخصصی در ۴ ماه اول رشد ۲۱۰ درصدی را تجربه کرد.',
        },
      ],
      ar: [
        {
          question: 'ما هي الميزات الأساسية لبوابة Mahsun Visa للهجرة؟',
          answer:
            'اختبار تقييم الأهلية للهجرة، أدلة شاملة للدول، ونظام متكامل لحجز مواعيد الاستشارات القانونية.',
        },
        {
          question: 'كيف تم استهداف الكلمات المفتاحية في قطاع الهجرة؟',
          answer:
            'من خلال بنية محتوى متخصصة تغطي تأشيرات الدراسة والإقامة وتوافق تقني كامل مع محركات البحث.',
        },
        {
          question: 'ما هي نسبة نمو طلبات الاستشارة؟',
          answer:
            'سجل الموقع زيادة بنسبة +٢١٠٪ في حجوزات الاستشارات المؤهلة خلال الأشهر الأولى.',
        },
      ],
    },
  },

  'mapfan': {
    pillar: 'web-dev',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '4 Months',
      fa: '۴ ماه',
      ar: '٤ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What was the primary engineering challenge for the Mapfan corporate portal?',
          answer:
            'Digitizing complex industrial ventilation equipment catalogs, technical data sheets, and custom aerodynamic spec selectors.',
        },
        {
          question: 'How did the website support B2B industrial procurement?',
          answer:
            'Engineers and procurement officers can filter fans by airflow, pressure, and motor specs, then request bulk quotes directly.',
        },
        {
          question: 'What improvements were recorded in B2B inquiries?',
          answer:
            'Industrial RFQ (Request for Quote) submissions increased by +160%.',
        },
      ],
      fa: [
        {
          question: 'چالش اصلی در طراحی سایت صنعتی مپ‌فن چه بود؟',
          answer:
            'دسته‌بندی و دیجیتالی‌سازی کاتالوگ‌های فنی هواکش‌ها و فن‌های صنعتی سنگین با مشخصات دقیق آیرودینامیک و الکتروموتورها.',
        },
        {
          question: 'چگونه سایت به مهندسین در انتخاب محصول کمک می‌کند؟',
          answer:
            'فیلترینگ پیشرفته بر اساس دبی هوا، فشار استاتیک و دور موتور به همراه دانلود مستقیم نقشه‌ها و دیتاشیت‌های فنی.',
        },
        {
          question: 'تاثیر سایت بر دریافت استعلام‌های قیمت شرکتی چه بود؟',
          answer:
            'ثبت پیش‌فاکتور و استعلام‌های B2B توسط کارخانجات و پروژه‌های صنعتی ۱۶۰٪ افزایش یافت.',
        },
      ],
      ar: [
        {
          question: 'ما هو التحدي الهندسي الأساسي في بوابة Mapfan الصناعية؟',
          answer:
            'رقمنة مواصفات مراوح التهوية الصناعية الثقيلة وجداول الأداء الديناميكي الهوائي المعقدة.',
        },
        {
          question: 'كيف يخدم الموقع مهندسي المشاريع الصناعية؟',
          answer:
            'يتيح فرز المنتجات حسب تدفق الهواء والضغط، مع إمكانية تنزيل الكتالوجات الفنية وطلب عروض الأسعار.',
        },
        {
          question: 'ما مدى ارتفاع طلبات التسعير B2B؟',
          answer:
            'ارتفعت طلبات التسعير من الشركات والمصانع بنسبة +١٦٠٪.',
        },
      ],
    },
  },

  'mehromah-qazvin': {
    pillar: 'web-dev',
    market: {
      en: 'Qazvin, Iran',
      fa: 'قزوین، ایران',
      ar: 'قزوين، إيران',
    },
    timeline: {
      en: '2 Months',
      fa: '۲ ماه',
      ar: '٢ شهران',
    },
    faqs: {
      en: [
        {
          question: 'What did the Mehromah Commercial Complex digital platform achieve?',
          answer:
            'An interactive tenant directory, cinema and entertainment guide, and location-based promotions for mall visitors.',
        },
        {
          question: 'How does the platform boost foot traffic to physical stores?',
          answer:
            'Through targeted local SEO, event announcements, and dynamic floor maps that make discovering retail brands easy.',
        },
        {
          question: 'What technologies were used for optimal speed and mobile UX?',
          answer:
            'Built with Astro and Tailwind CSS to guarantee sub-second page loads even on crowded mall mobile networks.',
        },
      ],
      fa: [
        {
          question: 'پلتفرم مجتمع تجاری مه‌روماه قزوین چه بخش‌هایی را شامل می‌شود؟',
          answer:
            'راهنمای تعاملی طبقات و اصناف، برنامه سینما و شهربازی، معرفی برندها و اطلاع‌رسانی جشنواره‌های تخفیف.',
        },
        {
          question: 'چگونه سئو محلی به افزایش بازدید حضوری از مجتمع کمک کرد؟',
          answer:
            'با ثبت دقیق اطلاعات در گوگل مپ، اسکیما ShoppingCenter و کلمات کلیدی گردشگری تجاری شهر قزوین.',
        },
        {
          question: 'چرا از فریم‌ورک Astro استفاده شد؟',
          answer:
            'برای سرعت فوق‌العاده بالا و تجربه کاربری روان حتی در اینترنت‌های ضعیف موبایل بازدیدکنندگان مجتمع.',
        },
      ],
      ar: [
        {
          question: 'ما هي وظائف المنصة الرقمية لمجمع مهروماه التجاري؟',
          answer:
            'دليل تفاعلي للمحلات التجارية والمطاعم، جدول عروض السينما، وإعلانات الفعاليات الترويجية للمجمع.',
        },
        {
          question: 'كيف ساهمت المنصة في زيادة زوار المجمع؟',
          answer:
            'من خلال السيو المحلي لمدينة قزوين وترميز ShoppingCenter على محركات البحث وخرائط جوجل.',
        },
        {
          question: 'ما التقنيات المستخدمة في بناء المنصة؟',
          answer:
            'تم بناؤها بواسطة Astro وTailwind CSS لضمان سرعة تصفح فائقة على هواتف الزوار.',
        },
      ],
    },
  },

  'tehran-enamel': {
    pillar: 'web-dev',
    market: {
      en: 'Tehran, Iran',
      fa: 'تهران، ایران',
      ar: 'طهران، إيران',
    },
    timeline: {
      en: '2.5 Months',
      fa: '۲.۵ ماه',
      ar: '٢.٥ أشهر',
    },
    faqs: {
      en: [
        {
          question: 'What corporate goals did the Tehran Enamel website satisfy?',
          answer:
            'Establishing industrial authority for frit and porcelain enamel manufacturing, showcasing ISO certifications, and supporting export inquiries.',
        },
        {
          question: 'How are specialized industrial products classified on the portal?',
          answer:
            'Categorized by chemical resistance, firing temperature, and substrate suitability (steel, cast iron, aluminum) with technical TDS downloads.',
        },
        {
          question: 'What results were observed in export and B2B requests?',
          answer:
            'Export inquiry submissions and domestic manufacturing contracts grew by +130%.',
        },
      ],
      fa: [
        {
          question: 'وب‌سایت لعاب تهران چه اهداف سازمانی و صنعتی را پوشش داد؟',
          answer:
            'معرفی توانمندی‌های کارخانجات تولید فریت و لعاب صنعتی، نمایش گواهینامه‌های بین‌المللی ISO و جذب مشتریان صادراتی.',
        },
        {
          question: 'محصولات تخصصی لعاب چگونه دسته‌بندی شده‌اند؟',
          answer:
            'بر اساس مقاومت شیمیایی، دمای پخت و نوع فلز پایه (فولاد، چدن، آلومینیوم) همراه با دانلود برگه مشخصات فنی TDS.',
        },
        {
          question: 'تاثیر سایت بر قراردادهای تولیدی و صادراتی چه بود؟',
          answer:
            'ثبت درخواست‌های استعلام صادراتی و قراردادهای تأمین لعاب صنعتی ۱۳۰٪ افزایش یافت.',
        },
      ],
      ar: [
        {
          question: 'ما هي الأهداف المؤسسية لبوابة طهران إينامل (Tehran Enamel)؟',
          answer:
            'إبراز المكانة الصناعية في إنتاج الفريت ولعاب المينا، وعرض شهادات الجودة العالمية وجذب طلبات التصدير.',
        },
        {
          question: 'كيف تم تصنيف المنتجات الصناعية الدقيقة في الموقع؟',
          answer:
            'تصنيف حسب المقاومة الكيميائية، درجات حرارة الحرق، والمعدن المستخدم مع إمكانية تحميل أوراق المواصفات TDS.',
        },
        {
          question: 'ما هو حجم النمو في طلبات التصدير والتعاقدات؟',
          answer:
            'سجل الموقع نمواً بنسبة +١٣٠٪ في استفسارات التصدير وعقود التوريد الصناعية الكبرى.',
        },
      ],
    },
  },
};

export function getProjectMeta(slug: string, lang: SupportedLanguage) {
  const meta = projectMeta[slug];
  if (!meta) {
    return {
      market: lang === 'fa' ? 'بین‌المللی' : lang === 'ar' ? 'دولي' : 'International',
      timeline: lang === 'fa' ? '۳ ماه' : lang === 'ar' ? '٣ أشهر' : '3 Months',
      pillar: 'web-dev' as const,
      faqs: [],
    };
  }

  return {
    market: meta.market[lang] || meta.market.en,
    timeline: meta.timeline[lang] || meta.timeline.en,
    pillar: meta.pillar,
    faqs: meta.faqs[lang] || meta.faqs.en || [],
  };
}

export function formatLocalizedNumber(num: number, lang: SupportedLanguage): string {
  const locale = lang === 'fa' ? 'fa-IR' : lang === 'ar' ? 'ar-SA' : 'en-US';
  return new Intl.NumberFormat(locale).format(num);
}
