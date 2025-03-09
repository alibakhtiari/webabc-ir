
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Layout, Code, Database, ShoppingCart, Globe, ArrowRight } from 'lucide-react';
import Logo from './Logo';
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
            
            {/* Services Mega Menu Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-foreground/80 font-persian text-base hover:text-primary transition-colors">
                خدمات
                <ChevronDown className="h-4 w-4 mr-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Mega Menu */}
              <div className="absolute top-full right-0 mt-2 w-[680px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column - Featured Service */}
                    <div className="bg-primary/5 rounded-lg p-5">
                      <h3 className="text-lg font-bold text-primary mb-2">وردپرس و ووکامرس</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        طراحی و توسعه حرفه‌ای سایت‌های وردپرسی و فروشگاه‌های آنلاین با ووکامرس
                      </p>
                      <Link 
                        to="/wordpress-woocommerce-development" 
                        className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        مشاهده جزئیات
                        <ArrowRight className="mr-1 h-4 w-4" />
                      </Link>
                    </div>
                    
                    {/* Right Column - Service Links */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">همه خدمات</h3>
                      <ul className="space-y-4">
                        <li>
                          <Link 
                            to="/services" 
                            className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group/link"
                          >
                            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover/link:bg-primary/10 transition-colors">
                              <Globe className="h-5 w-5 text-gray-500 group-hover/link:text-primary" />
                            </span>
                            <div>
                              <span className="block font-medium">همه خدمات</span>
                              <span className="text-xs text-gray-500">مشاهده لیست کامل خدمات</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/seo-services" 
                            className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group/link"
                          >
                            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover/link:bg-primary/10 transition-colors">
                              <Globe className="h-5 w-5 text-gray-500 group-hover/link:text-primary" />
                            </span>
                            <div>
                              <span className="block font-medium">خدمات سئو</span>
                              <span className="text-xs text-gray-500">بهینه‌سازی برای موتورهای جستجو</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/local-seo-services" 
                            className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group/link"
                          >
                            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover/link:bg-primary/10 transition-colors">
                              <Globe className="h-5 w-5 text-gray-500 group-hover/link:text-primary" />
                            </span>
                            <div>
                              <span className="block font-medium">سئو محلی</span>
                              <span className="text-xs text-gray-500">افزایش حضور محلی کسب و کار</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/web-development-services" 
                            className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors group/link"
                          >
                            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover/link:bg-primary/10 transition-colors">
                              <Code className="h-5 w-5 text-gray-500 group-hover/link:text-primary" />
                            </span>
                            <div>
                              <span className="block font-medium">توسعه وب</span>
                              <span className="text-xs text-gray-500">طراحی و توسعه وب‌سایت‌های مدرن</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
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
          
          <div className="w-full text-center border-t border-b border-gray-100 py-5">
            <p className="mb-4 text-primary font-bold">خدمات</p>
            <div className="grid grid-cols-1 gap-5">
              <MobileServiceLink 
                to="/services" 
                title="همه خدمات" 
                description="مشاهده لیست کامل خدمات" 
                icon={<Globe className="h-5 w-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileServiceLink 
                to="/seo-services" 
                title="خدمات سئو" 
                description="بهینه‌سازی برای موتورهای جستجو" 
                icon={<Globe className="h-5 w-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileServiceLink 
                to="/local-seo-services" 
                title="سئو محلی" 
                description="افزایش حضور محلی کسب و کار" 
                icon={<Globe className="h-5 w-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileServiceLink 
                to="/web-development-services" 
                title="توسعه وب" 
                description="طراحی و توسعه وب‌سایت‌های مدرن" 
                icon={<Code className="h-5 w-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileServiceLink 
                to="/wordpress-woocommerce-development" 
                title="وردپرس و ووکامرس" 
                description="طراحی و توسعه سایت‌های وردپرسی"
                icon={<Layout className="h-5 w-5" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
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

const MobileServiceLink = ({ 
  to, 
  title,
  description,
  icon,
  onClick 
}: { 
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="text-right">
        <span className="block font-medium text-base">{title}</span>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
    </Link>
  );
};

export default Navbar;
