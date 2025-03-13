
import React from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold tracking-tight text-primary">
                  WebABC
                </span>
              </a>
              
              <p className="font-persian text-foreground/70 mt-2">
                وب آ ب ث، متخصص در ارائه خدمات سئو و توسعه وب با بیش از 10 سال تجربه در صنعت دیجیتال مارکتینگ.
              </p>
              
              <div className="flex space-x-4 mt-4">
                {['twitter', 'instagram', 'linkedin', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com/webabc`}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all hover:bg-primary hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'خدمات',
                links: [
                  { name: 'سئو تخصصی', href: '#' },
                  { name: 'طراحی سایت', href: '#' },
                  { name: 'تولید محتوا', href: '#' },
                  { name: 'بهینه‌سازی فنی', href: '#' },
                  { name: 'لینک‌سازی خارجی', href: '#' },
                ]
              },
              {
                title: 'شرکت',
                links: [
                  { name: 'درباره ما', href: '#' },
                  { name: 'تیم ما', href: '#' },
                  { name: 'نمونه کارها', href: '#' },
                  { name: 'بلاگ', href: '#' },
                  { name: 'تماس با ما', href: '/contact' },
                ]
              },
              {
                title: 'منابع',
                links: [
                  { name: 'آموزش سئو', href: '#' },
                  { name: 'راهنمای طراحی سایت', href: '#' },
                  { name: 'مقالات تخصصی', href: '#' },
                  { name: 'ابزارهای رایگان', href: '#' },
                  { name: 'سوالات متداول', href: '#' },
                ]
              }
            ].map((category, idx) => (
              <div key={idx}>
                <h3 className="font-persian text-lg font-medium mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href} 
                        className="font-persian text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className="font-persian text-foreground/70 text-sm">
            © 1403 وب آ ب ث. تمامی حقوق محفوظ است.
          </p>
          
          <div className="flex space-x-4 space-x-reverse mt-4 md:mt-0">
            {['حریم خصوصی', 'شرایط استفاده', 'سیاست کوکی‌ها'].map((item, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="font-persian text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
