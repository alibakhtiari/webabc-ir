import type { SupportedLanguage } from '../types/language';

export const categoryTranslations: Record<string, Record<SupportedLanguage, string>> = {
  SEO: {
    en: 'SEO',
    fa: 'سئو',
    ar: 'سيو',
  },
  'Web Design': {
    en: 'Web Design',
    fa: 'طراحی وب',
    ar: 'تصميم المواقع',
  },
  'Web Development': {
    en: 'Web Development',
    fa: 'توسعه وب',
    ar: 'تطوير المواقع',
  },
  'Digital Marketing': {
    en: 'Digital Marketing',
    fa: 'دیجیتال مارکتینگ',
    ar: 'التسويق الرقمي',
  },
  'E-Commerce': {
    en: 'E-Commerce',
    fa: 'فروشگاه اینترنتی',
    ar: 'المتاجر الإلكترونية',
  },
  'Link Building': {
    en: 'Link Building',
    fa: 'لینک‌سازی',
    ar: 'بناء الروابط',
  },
  Maintenance: {
    en: 'Maintenance',
    fa: 'پشتیبانی و امنیت',
    ar: 'صيانة المواقع',
  },
  'Speed Optimization': {
    en: 'Speed Optimization',
    fa: 'افزایش سرعت',
    ar: 'تسريع المواقع',
  },
  'UI/UX Design': {
    en: 'UI/UX Design',
    fa: 'طراحی UI/UX',
    ar: 'تصميم UI/UX',
  },
  WordPress: {
    en: 'WordPress',
    fa: 'وردپرس',
    ar: 'ووردبريس',
  },
};

export function getCategoryLabel(category: string, lang: SupportedLanguage): string {
  const normCategory = normalizeCategoryKey(category);
  if (categoryTranslations[normCategory] && categoryTranslations[normCategory][lang]) {
    return categoryTranslations[normCategory][lang];
  }
  return category;
}

export function normalizeCategoryKey(category: string): string {
  if (!category) return 'SEO';
  const c = category.trim();
  if (c === 'سئو' || c === 'سيو' || c.toLowerCase() === 'seo') return 'SEO';
  if (c === 'طراحی وب' || c === 'تصميم الويب' || c.toLowerCase() === 'web design')
    return 'Web Design';
  if (c === 'توسعه وب' || c === 'تطوير الويب' || c.toLowerCase() === 'web development')
    return 'Web Development';
  if (
    c === 'بازاریابی دیجیتال' ||
    c === 'دیجیتال مارکتینگ' ||
    c === 'التسويق الرقمي' ||
    c.toLowerCase() === 'digital marketing'
  )
    return 'Digital Marketing';
  if (
    c === 'فروشگاه اینترنتی' ||
    c === 'المتاجر الإلكترونية' ||
    c.toLowerCase() === 'e-commerce' ||
    c.toLowerCase() === 'ecommerce'
  )
    return 'E-Commerce';
  if (c === 'لینک‌سازی' || c === 'بناء الروابط' || c.toLowerCase() === 'link building')
    return 'Link Building';
  if (c === 'پشتیبانی و امنیت' || c === 'صيانة المواقع' || c.toLowerCase() === 'maintenance')
    return 'Maintenance';
  if (c === 'افزایش سرعت' || c === 'تسريع المواقع' || c.toLowerCase() === 'speed optimization')
    return 'Speed Optimization';
  if (c === 'طراحی UI/UX' || c === 'تصميم UI/UX' || c.toLowerCase() === 'ui/ux design')
    return 'UI/UX Design';
  if (c === 'وردپرس' || c === 'ووردبريس' || c.toLowerCase() === 'wordpress') return 'WordPress';
  return c;
}
