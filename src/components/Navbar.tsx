
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        {
          'py-3 bg-white/90 backdrop-blur-md shadow-sm': isScrolled,
          'py-5 bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex items-center justify-between",
          "backdrop-blur-sm bg-white/80 rounded-xl px-4 py-2 mx-auto",
          { "shadow-sm": isScrolled }
        )}>
          <a href="/" className="flex items-center space-x-2">
            <Logo size="sm" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">خانه</NavLink>
            <NavLink href="#services">خدمات</NavLink>
            <NavLink href="#about">درباره ما</NavLink>
            <NavLink href="#contact">تماس با ما</NavLink>
            <button className="px-4 py-2 rounded-md bg-primary text-white font-persian transition-all hover:bg-primary/90">
              مشاوره رایگان
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
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

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out pt-20',
          {
            'translate-x-0': isMobileMenuOpen,
            'translate-x-full': !isMobileMenuOpen,
          }
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-6 font-persian text-lg">
          <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
            خانه
          </MobileNavLink>
          <MobileNavLink href="#services" onClick={() => setIsMobileMenuOpen(false)}>
            خدمات
          </MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            درباره ما
          </MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            تماس با ما
          </MobileNavLink>
          <button className="w-full px-4 py-3 rounded-md bg-primary text-white font-persian transition-all hover:bg-primary/90">
            مشاوره رایگان
          </button>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-foreground/80 font-persian text-base hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <a
      href={href}
      className="text-foreground w-full text-center py-3 hover:text-primary transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
