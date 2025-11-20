"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, Globe, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
  const { language } = useLanguage();

  return (
    <Link
      href={`/${language}${to}`}
      className="text-foreground/80 font-persian text-base hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

export const NavLinks = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <NavLink to="/service-areas">{t('common.serviceAreas')}</NavLink>
    </>
  );
};

export const ServicesDropdown = () => {
  const { t, language, languageMeta } = useLanguage();
  const isRtl = languageMeta.direction === 'rtl';

  return (
    <div className="relative group">
      <Link href={`/${language}/services`} className="flex items-center text-foreground/80 font-persian text-base hover:text-primary transition-colors">
        {t('common.services')}
        <ChevronDown className="h-4 w-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
      </Link>

      {/* Mega Menu - removed backdrop-blur */}
      <div className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 w-[680px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50`}>
        <div className="bg-white p-6 animate-zoom-in shadow-xl rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Featured Service */}
            <div className="bg-primary/5 rounded-lg p-5">
              <h3 className="text-lg font-bold text-primary mb-2">{t('wordpress.wordpressAndWoocommerce')}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('wordpress.subtitle')}
              </p>
              <Link
                href={`/${language}/wordpress-woocommerce-development`}
                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
              >
                {t('common.viewDetails')}
                <ArrowRight className={`${isRtl ? 'mr-1' : 'ml-1'} h-4 w-4`} />
              </Link>
            </div>

            {/* Right Column - Service Links */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">{t('common.allServices')}</h3>
              <ul className="space-y-4">
                <ServiceLink
                  to={`/${language}/services`}
                  title={t('common.allServices')}
                  description={t('common.viewAll')}
                  icon={<Globe />}
                />
                <ServiceLink
                  to={`/${language}/seo-services`}
                  title={t('services.seoTitle')}
                  description={t('services.seoDescription')}
                  icon={<Globe />}
                />
                <ServiceLink
                  to={`/${language}/local-seo`}
                  title={t('services.localSeoTitle')}
                  description={t('services.localSeoDescription')}
                  icon={<Globe />}
                />
                <ServiceLink
                  to={`/${language}/web-development-services`}
                  title={t('services.webDevTitle')}
                  description={t('services.webDevDescription')}
                  icon={<Code />}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceLinkProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ServiceLink = ({ to, title, description, icon }: ServiceLinkProps) => {
  const { languageMeta } = useLanguage();
  const isRtl = languageMeta.direction === 'rtl';

  return (
    <li>
      <Link
        href={to}
        className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group/link"
      >
        <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover/link:bg-primary/10 transition-colors">
          {React.cloneElement(icon as React.ReactElement, {
            className: "h-5 w-5 text-gray-500 group-hover/link:text-primary"
          })}
        </span>
        <div>
          <span className="block font-medium">{title}</span>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      </Link>
    </li>
  );
};
