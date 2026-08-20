import type { ImageMetadata } from 'astro';

import seoImg from '@/assets/images/services/seo.webp';
import localSeoImg from '@/assets/images/services/local-seo.webp';
import webDevelopmentImg from '@/assets/images/services/web-development.webp';
import wordpressImg from '@/assets/images/services/wordpress.webp';
import webDesignImg from '@/assets/images/services/web-design.webp';
import contentCreationImg from '@/assets/images/services/content-creation.webp';
import linkBuildingImg from '@/assets/images/services/link-building.webp';
import speedOptimizationImg from '@/assets/images/services/speed-optimization.webp';
import uiUxAuditImg from '@/assets/images/services/ui-ux-audit.webp';
import websiteMaintenanceImg from '@/assets/images/services/website-maintenance.webp';

export const serviceSlugs = [
  'seo',
  'web-development',
  'local-seo',
  'wordpress-development',
  'web-design',
  'content-creation',
  'link-building',
  'speed-optimization',
  'ui-ux-audit',
  'website-maintenance',
  'ecommerce',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export interface ServiceMeta {
  ns: string;
  titleKey: string;
  subtitleKey: string;
  img: ImageMetadata;
}

export const slugInfoMap: Record<string, ServiceMeta> = {
  seo: {
    ns: 'seoService',
    titleKey: 'seoService.title',
    subtitleKey: 'seoService.subtitle',
    img: seoImg,
  },
  'local-seo': {
    ns: 'localSeo',
    titleKey: 'localSeo.localSeoTitle',
    subtitleKey: 'localSeo.localSeoDescription',
    img: localSeoImg,
  },
  'web-development': {
    ns: 'webDevelopmentServices',
    titleKey: 'webDevelopmentServices.webDevelopmentTitle',
    subtitleKey: 'webDevelopmentServices.webDevelopmentDescription',
    img: webDevelopmentImg,
  },
  'wordpress-development': {
    ns: 'wordpress',
    titleKey: 'wordpress.title',
    subtitleKey: 'wordpress.subtitle',
    img: wordpressImg,
  },
  'web-design': {
    ns: 'webDesign',
    titleKey: 'webDesign.title',
    subtitleKey: 'webDesign.description',
    img: webDesignImg,
  },
  'content-creation': {
    ns: 'contentCreation',
    titleKey: 'contentCreation.title',
    subtitleKey: 'contentCreation.description',
    img: contentCreationImg,
  },
  'link-building': {
    ns: 'linkBuilding',
    titleKey: 'linkBuilding.title',
    subtitleKey: 'linkBuilding.description',
    img: linkBuildingImg,
  },
  'speed-optimization': {
    ns: 'speedOptimization',
    titleKey: 'speedOptimization.title',
    subtitleKey: 'speedOptimization.subtitle',
    img: speedOptimizationImg,
  },
  'ui-ux-audit': {
    ns: 'uiUxAudit',
    titleKey: 'uiUxAudit.title',
    subtitleKey: 'uiUxAudit.subtitle',
    img: uiUxAuditImg,
  },
  'website-maintenance': {
    ns: 'maintenance',
    titleKey: 'maintenance.title',
    subtitleKey: 'maintenance.subtitle',
    img: websiteMaintenanceImg,
  },
  ecommerce: {
    ns: 'ecommerce',
    titleKey: 'ecommerce.title',
    subtitleKey: 'ecommerce.subtitle',
    img: webDevelopmentImg,
  },
};

export const serviceTypeMap: Record<string, Record<string, string>> = {
  seo: {
    en: 'Search Engine Optimization',
    fa: 'بهینه‌سازی موتورهای جستجو (سئو)',
    ar: 'تحسين محركات البحث',
  },
  'local-seo': { en: 'Local SEO Optimization', fa: 'سئو محلی', ar: 'سيو محلي' },
  'web-development': {
    en: 'Custom Web Development',
    fa: 'توسعه وب سفارشی',
    ar: 'تطوير مواقع الويب',
  },
  'wordpress-development': {
    en: 'WordPress & WooCommerce Development',
    fa: 'توسعه وردپرس و ووکامرس',
    ar: 'تطوير ووردبريس وووكومرس',
  },
  'web-design': {
    en: 'Web Design & Prototyping',
    fa: 'طراحی سایت و رابط کاربری',
    ar: 'تصميم مواقع الويب',
  },
  'content-creation': {
    en: 'SEO Content Strategy & Creation',
    fa: 'تولید محتوای تخصصی سئو',
    ar: 'إنشاء المحتوى والاستراتيجية',
  },
  'link-building': {
    en: 'Link Building & Authority Enhancement',
    fa: 'لینک‌سازی و افزایش اعتبار دامنه',
    ar: 'بناء الروابط وزيادة السلطة',
  },
  'speed-optimization': {
    en: 'Core Web Vitals & Speed Optimization',
    fa: 'افزایش سرعت سایت و بهینه‌سازی',
    ar: 'تحسين سرعة الموقع',
  },
  'ui-ux-audit': {
    en: 'UI/UX Audit & Usability Consulting',
    fa: 'ممیزی رابط کاربری و تجربه کاربری',
    ar: 'تدقيق واجهة وتجربة المستخدم',
  },
  'website-maintenance': {
    en: 'Website Maintenance & Care Plans',
    fa: 'پشتیبانی و نگهداری وب‌سایت',
    ar: 'صيانة وتحديث الموقع',
  },
  ecommerce: {
    en: 'E-commerce Website Development',
    fa: 'طراحی و توسعه فروشگاه اینترنتی',
    ar: 'تطوير المتاجر الإلكترونية',
  },
};

export const offerSubServicesMap: Record<string, Record<string, string[]>> = {
  seo: {
    en: ['On-Page SEO', 'Technical SEO', 'Off-Page SEO', 'Local SEO'],
    fa: ['سئو داخلی (On-Page)', 'سئو تکنیکال', 'سئو خارجی (Off-Page)', 'سئو محلی'],
    ar: ['السيو الداخلي', 'السيو التقني', 'السيو الخارجي', 'السيو المحلي'],
  },
  'local-seo': {
    en: [
      'Google Business Profile Optimization',
      'Local Citations',
      'Near Me Targeting',
      'Review Management',
    ],
    fa: [
      'بهینه‌سازی پروفایل گوگل',
      'ثبت در دایرکتوری‌های محلی',
      'هدف‌گذاری جستجوهای محلی',
      'مدیریت نظرات کاربران',
    ],
    ar: [
      'تحسين ملف جوجل التجاري',
      'التواجد في الأدلة المحلية',
      'استهداف البحث المحلي',
      'إدارة التقييمات',
    ],
  },
  'web-development': {
    en: [
      'Frontend Web App Development',
      'Backend API Integration',
      'Responsive Design',
      'Database Architecture',
    ],
    fa: [
      'توسعه فرانت‌اند با React/Next.js',
      'اتصال به API و بک‌اند',
      'طراحی واکنش‌گرا',
      'طراحی پایگاه داده',
    ],
    ar: [
      'تطوير الواجهة الأمامية',
      'ربط البرمجيات والـ API',
      'التصميم المتجاوب',
      'إدارة قواعد البيانات',
    ],
  },
  'wordpress-development': {
    en: [
      'Custom Theme Development',
      'WooCommerce Setup',
      'Custom Plugin Development',
      'CMS Maintenance',
    ],
    fa: [
      'طراحی قالب اختصاصی وردپرس',
      'راه‌اندازی فروشگاه ووکامرس',
      'توسعه افزونه سفارشی',
      'پشتیبانی و به‌روزرسانی',
    ],
    ar: [
      'تصميم قوالب ووردبريس مخصصة',
      'إعداد متجر ووكومرس',
      'تطوير إضافات مخصصة',
      'صيانة وتحديث وردبريس',
    ],
  },
  'web-design': {
    en: ['UI/UX Prototyping', 'Responsive Design System', 'Wireframing', 'Design Audit'],
    fa: ['طراحی پروتوتایپ UI/UX', 'دیزاین سیستم واکنش‌گرا', 'طراحی وایرفریم', 'ممیزی طراحی وب'],
    ar: [
      'تصميم واجهات وتجربة المستخدم',
      'أنظمة التصميم المتجاوبة',
      'تخطيط الهيكل السلكي',
      'تدقيق التصميم',
    ],
  },
  'content-creation': {
    en: ['SEO Article Writing', 'Content Strategy', 'Copywriting', 'Keyword Optimization'],
    fa: [
      'تولید مقالات تخصصی سئو',
      'استراتژی و تقویم محتوایی',
      'کپی‌رایتینگ و تبلیغ‌نویسی',
      'بهینه‌سازی کلمات کلیدی',
    ],
    ar: [
      'كتابة مقالات متوافقة مع السيو',
      'استراتيجية المحتوى',
      'الكتابة الإعلانية',
      'تحسين الكلمات المفتاحية',
    ],
  },
  'link-building': {
    en: ['Guest Post Outreach', 'Authority Backlinks', 'Link Audit', 'Digital PR'],
    fa: [
      'ریپورتاژ آگهی و پست مهمان',
      'لینک‌سازی باکیفیت و معتبر',
      'تحلیل و آنالیز بک‌لینک‌ها',
      'روابط عمومی دیجیتال',
    ],
    ar: [
      'المنشورات الضيفة والروبورتاج',
      'بناء روابط عالية الجودة',
      'تحليل الروابط الخلفية',
      'العلاقات العامة الرقمية',
    ],
  },
  'speed-optimization': {
    en: [
      'Core Web Vitals Optimization',
      'Image Optimization',
      'Code Minification',
      'Database Tuning',
    ],
    fa: [
      'بهینه‌سازی شاخص‌های Core Web Vitals',
      'فشرده‌سازی و بهینه‌سازی تصاویر',
      'مینify کردن کدهای JS و CSS',
      'پاکسازی پایگاه داده',
    ],
    ar: [
      'تحسين مؤشرات Core Web Vitals',
      'ضغط وتحسين الصور',
      'تضغط الأكواد البرمجية',
      'تحسين قاعدة البيانات',
    ],
  },
  'ui-ux-audit': {
    en: ['Usability Testing', 'Conversion Rate Optimization', 'Navigation Audit', 'UX Report'],
    fa: [
      'تست کاربردپذیری',
      'بهینه‌سازی نرخ تبدیل (CRO)',
      'بررسی ساختار منوها و مسیریابی',
      'ارائه گزارش جامع UX',
    ],
    ar: [
      'اختبار قابلية الاستخدام',
      'تحسين معدل التحويل',
      'تدقيق التنقل في الموقع',
      'تقرير شامل لتجربة المستخدم',
    ],
  },
  'website-maintenance': {
    en: ['WordPress Core Updates', 'Cloud Backups', 'Uptime Monitoring', 'Security Audits'],
    fa: [
      'به‌روزرسانی هسته و افزونه‌ها',
      'پشتیبان‌گیری ابری منظم',
      'مانیتورینگ پایداری و دسترس‌پذیری',
      'پایش و تست‌های امنیتی',
    ],
    ar: [
      'تحديث النظام والإضافات',
      'نسخ احتياطي سحابي',
      'مراقبة استقرار الموقع',
      'فحص الأمان والتدقيق',
    ],
  },
  ecommerce: {
    en: [
      'Shopify Store Setup',
      'WooCommerce Customization',
      'Payment Gateway Integration',
      'Product SEO',
    ],
    fa: [
      'راه‌اندازی فروشگاه اینترنتی',
      'سفارشی‌سازی اختصاصی فروشگاه',
      'اتصال به درگاه‌های پرداخت',
      'سئو و بهینه‌سازی محصولات',
    ],
    ar: [
      'إعداد وتطوير المتاجر',
      'تخصيص المتاجر الإلكترونية',
      'ربط بوابات الدفع الإلكتروني',
      'سيو المنتجات والمتاجر',
    ],
  },
};

export const ogImageMap: Record<string, string> = {
  seo: '/images/og/services/seo.webp',
  'local-seo': '/images/og/services/local-seo.webp',
  'web-development': '/images/og/services/web-development.webp',
  'wordpress-development': '/images/og/services/wordpress.webp',
  'web-design': '/images/og/services/web-design.webp',
  'content-creation': '/images/og/services/content-creation.webp',
  'link-building': '/images/og/services/link-building.webp',
  'speed-optimization': '/images/og/services/speed-optimization.webp',
  'ui-ux-audit': '/images/og/services/ui-ux-audit.webp',
  'website-maintenance': '/images/og/services/website-maintenance.webp',
  ecommerce: '/images/og/services/web-development.webp',
};
