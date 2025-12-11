"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import { NavLink, ServicesDropdown, NavLinks } from './NavLinks';
import MobileMenu from './MobileMenu';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const ConsultationForm = dynamic(() => import('./ConsultationForm'), {
  ssr: false,
  loading: () => null,
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4',
        {
          'py-3': isScrolled,
          'py-5': !isScrolled,
        }
      )}
    >
      <div className="container mx-auto">
        <div className={cn(
          "flex items-center justify-between",
          "backdrop-blur-xl bg-white/40 rounded-full px-6 py-3 shadow-lg border border-white/20",
          { "shadow-md": isScrolled }
        )}>
          <Link href={`/${language}`} className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="">{t('common.home')}</NavLink>
            <ServicesDropdown />
            <NavLinks />
            <NavLink to="/portfolio">{t('common.portfolio')}</NavLink>
            <NavLink to="/blog">{t('common.blog')}</NavLink>
            <NavLink to="/about">{t('common.about')}</NavLink>
            <NavLink to="/contact">{t('common.contact')}</NavLink>
            <LanguageSwitcher />
            <Button
              size="sm"
              className="px-4 py-2 rounded-md"
              onClick={() => setConsultationOpen(true)}
            >
              {t('common.freeConsultation')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher type="dropdown" />
            <button
              className="p-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Consultation Form Dialog */}
      {consultationOpen && (
        <ConsultationForm open={consultationOpen} onOpenChange={setConsultationOpen} />
      )}
    </header>
  );
};

export default Navbar;
