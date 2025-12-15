"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import ConsultationForm from './ConsultationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleConsultation = () => {
    onClose(); // Close the mobile menu
    setConsultationOpen(true); // Open the consultation form
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-[90%] sm:max-w-lg p-0 font-persian">
          <div className="flex flex-col h-full overflow-auto py-6">
            <div className="px-6 pb-6 border-b">
              <div className="flex items-center justify-between mb-6">
                <Link href={`/${language}`} className="text-xl font-bold" onClick={onClose}>
                  WebABC
                </Link>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-6">
                <li>
                  <Link
                    href={`/${language}`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.home')}
                  </Link>
                </li>

                <li className="border-b pb-6">
                  <div className="w-full flex items-center justify-between text-lg font-medium mb-4">
                    <span>{t('common.services')}</span>
                  </div>

                  <div className="space-y-6">
                    <Link
                      href={`/${language}/services`}
                      className={`block ps-3 border-s-2 text-foreground/80 hover:text-primary font-medium`}
                      onClick={onClose}
                    >
                      {t('common.allServices')}
                    </Link>

                    {/* SEO Services Group */}
                    <div className="ps-3">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{t('common.seoServices')}</h4>
                      <div className="grid grid-cols-2 gap-3 ps-2 border-s border-border/50">
                        <Link
                          href={`/${language}/services/seo`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('services.seoTitle')}
                        </Link>
                        <Link
                          href={`/${language}/services/local-seo`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('services.localSeoTitle')}
                        </Link>
                        <Link
                          href={`/${language}/services/link-building`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('services.linkBuildingTitle')}
                        </Link>
                        <Link
                          href={`/${language}/services/content-creation`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('services.contentCreationTitle')}
                        </Link>
                      </div>
                    </div>

                    {/* Development Services Group */}
                    <div className="ps-3">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{t('common.developmentServices')}</h4>
                      <div className="grid grid-cols-2 gap-3 ps-2 border-s border-border/50">
                        <Link
                          href={`/${language}/services/web-development`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('services.webDevTitle')}
                        </Link>
                        <Link
                          href={`/${language}/services/wordpress-development`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('wordpress.wordpressAndWoocommerce')}
                        </Link>
                        <Link
                          href={`/${language}/services/web-design`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('common.webDesignAndDevelopment')}
                        </Link>
                        <Link
                          href={`/${language}/services/modern-web-development`}
                          className="block text-foreground/80 hover:text-primary text-sm break-words"
                          onClick={onClose}
                        >
                          {t('common.modernWebDevelopment')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <Link
                    href={`/${language}/portfolio`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.portfolio')}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/${language}/service-areas`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.serviceAreas')}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/${language}/blog`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.blog')}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/${language}/about`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.about')}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/${language}/contact`}
                    className="text-lg font-medium"
                    onClick={onClose}
                  >
                    {t('common.contact')}
                  </Link>
                </li>

                <li>
                  <LanguageSwitcher type="buttons" />
                </li>
              </ul>
            </nav>

            <div className="p-6 border-t">
              <Button
                className="w-full"
                onClick={handleConsultation}
              >
                {t('common.freeConsultation')}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Consultation Form */}
      <ConsultationForm open={consultationOpen} onOpenChange={setConsultationOpen} />
    </>
  );
};

export default MobileMenu;
