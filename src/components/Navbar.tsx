
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { NavLink, ServicesDropdown } from './NavLinks';
import MobileMenu from './MobileMenu';
import { Button } from './ui/button';

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
          "backdrop-blur-xl bg-white/40 rounded-2xl px-6 py-3 shadow-lg border border-white/20",
          { "shadow-md": isScrolled }
        )}>
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">خانه</NavLink>
            <ServicesDropdown />
            <NavLink to="/portfolio">نمونه کارها</NavLink>
            <NavLink to="/case-studies">مطالعات موردی</NavLink>
            <NavLink to="#about">درباره ما</NavLink>
            <NavLink to="#contact">تماس با ما</NavLink>
            <Button size="sm" className="px-4 py-2 rounded-md">
              مشاوره رایگان
            </Button>
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
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
