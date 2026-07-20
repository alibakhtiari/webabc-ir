"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  const { t, language, languageMeta } = useLanguage();
  const isRtl = languageMeta.direction === 'rtl';

  return (
    <footer className="bg-gray-50 pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <Link href={`/${language}`} className="flex items-center space-x-2">
                <span className={cn("text-2xl font-bold tracking-tight text-primary", languageMeta.fontFamily)}>
                  WebABC
                </span>
              </Link>

              <p className={cn("text-foreground/70 mt-2", languageMeta.fontFamily)}>
                {t('common.aboutCompany')}
              </p>

              <div className={cn("flex space-x-4 mt-4", isRtl && "space-x-reverse")}>
                {[
                  { name: 'twitter', Icon: TwitterIcon, url: 'https://twitter.com/webabc' },
                  { name: 'instagram', Icon: InstagramIcon, url: 'https://instagram.com/webabc' },
                  { name: 'linkedin', Icon: LinkedinIcon, url: 'https://linkedin.com/company/webabc' },
                  { name: 'facebook', Icon: FacebookIcon, url: 'https://facebook.com/webabc' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all hover:bg-primary hover:text-white text-gray-600"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: t('common.services'),
                links: [
                  { name: t('services.seoTitle'), href: `/${language}/services/seo` },
                  { name: t('services.webDesignTitle'), href: `/${language}/services/web-design` },
                  { name: t('services.contentCreationTitle'), href: `/${language}/services/content-creation` },
                  { name: t('services.technicalOptimization'), href: `/${language}/services/speed-optimization` },
                  { name: t('services.linkBuildingTitle'), href: `/${language}/services/link-building` },
                ]
              },
              {
                title: t('common.company'),
                links: [
                  { name: t('common.about'), href: `/${language}/about` },
                  { name: t('common.portfolio'), href: `/${language}/portfolio` },
                  { name: t('blog.title'), href: `/${language}/blog` },
                  { name: t('common.contact'), href: `/${language}/contact` },
                  { name: t('common.privacyPolicy'), href: `/${language}/privacy` },
                ]
              },
              {
                title: t('tools.title'),
                links: [
                  { name: t('metaGenerator.title'), href: `/${language}/tools/meta-generator` },
                  { name: t('serpPreview.title'), href: `/${language}/tools/serp-preview` },

                  { name: t('utmBuilder.title'), href: `/${language}/tools/utm-builder` },
                  { name: t('faqGenerator.title'), href: `/${language}/tools/faq-generator` },
                ]
              }
            ].map((category, idx) => (
              <div key={idx}>
                <h3 className={cn("text-lg font-medium mb-4", languageMeta.fontFamily)}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className={cn("text-foreground/70 hover:text-primary transition-colors", languageMeta.fontFamily)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4 border-t border-gray-200 text-center">
          <p className={cn("text-foreground/70 text-sm", languageMeta.fontFamily)}>
            {t('common.copyright').replace('{year}', new Intl.DateTimeFormat(language, { year: 'numeric' }).format(new Date()))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
