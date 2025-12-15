"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, Globe, Code, PenTool, Link2, Zap } from 'lucide-react';
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
        <ChevronDown className="h-4 w-4 ms-1 group-hover:rotate-180 transition-transform duration-200" />
      </Link>

      {/* Mega Menu - removed backdrop-blur */}
      <div className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 w-[680px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50`}>
        <div className="bg-white p-6 animate-zoom-in shadow-xl rounded-lg">
          <div className="grid grid-cols-2 gap-8">
            {/* SEO Services Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg text-primary">{t('common.seoServices')}</h3>
              </div>
              <ul className="space-y-3">
                <ServiceLink
                  to={`/${language}/services/seo`}
                  title={t('services.seoTitle')}
                  description={t('services.seoDescription')}
                  icon={<Globe />}
                />
                <ServiceLink
                  to={`/${language}/services/local-seo`}
                  title={t('services.localSeoTitle')}
                  description={t('services.localSeoDescription')}
                  icon={<Globe />}
                />
                <ServiceLink
                  to={`/${language}/services/link-building`}
                  title={t('services.linkBuildingTitle')}
                  description={t('services.linkBuildingDescription')}
                  icon={<Link2 />}
                />
                <ServiceLink
                  to={`/${language}/services/content-creation`}
                  title={t('services.contentCreationTitle')}
                  description={t('services.contentCreationDescription')}
                  icon={<PenTool />}
                />
              </ul>
            </div>

            {/* Development Services Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg text-primary">{t('common.developmentServices')}</h3>
              </div>
              <ul className="space-y-3">
                <ServiceLink
                  to={`/${language}/services/web-development`}
                  title={t('services.webDevTitle')}
                  description={t('services.webDevDescription')}
                  icon={<Code />}
                />
                <ServiceLink
                  to={`/${language}/services/wordpress-development`}
                  title={t('wordpress.wordpressAndWoocommerce')}
                  description={t('wordpress.subtitle')}
                  icon={<Code />}
                />
                <ServiceLink
                  to={`/${language}/services/web-design`}
                  title={t('common.webDesignAndDevelopment')}
                  description={t('services.webDevDescription')}
                  icon={<PenTool />}
                />
                <ServiceLink
                  to={`/${language}/services/modern-web-development`}
                  title={t('common.modernWebDevelopment')}
                  description={t('modern-web.description')?.substring(0, 50) + '...'}
                  icon={<Zap />}
                />
              </ul>
              {/* Featured / View All Link at bottom of dev column or separate? */}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Link
                  href={`/${language}/services`}
                  className="inline-flex items-center text-primary font-medium hover:underline text-sm"
                >
                  {t('common.viewAll')} {t('common.services')}
                  <ArrowRight className="ms-1 h-4 w-4" />
                </Link>
              </div>
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
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
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
