
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

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
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">خانه</NavLink>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground/80 font-persian text-base hover:text-primary transition-colors">
                خدمات
                <ChevronDown className="h-4 w-4 mr-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 font-persian">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="w-full">همه خدمات</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seo-services" className="w-full">خدمات سئو</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/local-seo-services" className="w-full">سئو محلی</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/web-development-services" className="w-full">توسعه وب</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wordpress-woocommerce-development" className="w-full">وردپرس و ووکامرس</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <NavLink to="/portfolio">نمونه کارها</NavLink>
            <NavLink to="/case-studies">مطالعات موردی</NavLink>
            <NavLink to="#about">درباره ما</NavLink>
            <NavLink to="#contact">تماس با ما</NavLink>
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
          <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            خانه
          </MobileNavLink>
          
          <div className="w-full text-center border-t border-b border-gray-100 py-3">
            <p className="mb-2 text-primary font-medium">خدمات</p>
            <div className="flex flex-col space-y-3 mr-4">
              <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                همه خدمات
              </MobileNavLink>
              <MobileNavLink to="/seo-services" onClick={() => setIsMobileMenuOpen(false)}>
                خدمات سئو
              </MobileNavLink>
              <MobileNavLink to="/local-seo-services" onClick={() => setIsMobileMenuOpen(false)}>
                سئو محلی
              </MobileNavLink>
              <MobileNavLink to="/web-development-services" onClick={() => setIsMobileMenuOpen(false)}>
                توسعه وب
              </MobileNavLink>
              <MobileNavLink to="/wordpress-woocommerce-development" onClick={() => setIsMobileMenuOpen(false)}>
                وردپرس و ووکامرس
              </MobileNavLink>
            </div>
          </div>
          
          <MobileNavLink to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
            نمونه کارها
          </MobileNavLink>
          <MobileNavLink to="/case-studies" onClick={() => setIsMobileMenuOpen(false)}>
            مطالعات موردی
          </MobileNavLink>
          <MobileNavLink to="#about" onClick={() => setIsMobileMenuOpen(false)}>
            درباره ما
          </MobileNavLink>
          <MobileNavLink to="#contact" onClick={() => setIsMobileMenuOpen(false)}>
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

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="text-foreground/80 font-persian text-base hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      to={to}
      className="text-foreground w-full text-center py-3 hover:text-primary transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
