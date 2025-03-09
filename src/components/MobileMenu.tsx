
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Code, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-white/80 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out pt-20',
        {
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen,
        }
      )}
    >
      <nav className="flex flex-col items-center space-y-6 p-6 font-persian text-lg">
        <MobileNavLink to="/" onClick={onClose}>
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
              onClick={onClose}
            />
            <MobileServiceLink 
              to="/seo-services" 
              title="خدمات سئو" 
              description="بهینه‌سازی برای موتورهای جستجو" 
              icon={<Globe className="h-5 w-5" />}
              onClick={onClose}
            />
            <MobileServiceLink 
              to="/local-seo-services" 
              title="سئو محلی" 
              description="افزایش حضور محلی کسب و کار" 
              icon={<Globe className="h-5 w-5" />}
              onClick={onClose}
            />
            <MobileServiceLink 
              to="/web-development-services" 
              title="توسعه وب" 
              description="طراحی و توسعه وب‌سایت‌های مدرن" 
              icon={<Code className="h-5 w-5" />}
              onClick={onClose}
            />
            <MobileServiceLink 
              to="/wordpress-woocommerce-development" 
              title="وردپرس و ووکامرس" 
              description="طراحی و توسعه سایت‌های وردپرسی"
              icon={<Layout className="h-5 w-5" />}
              onClick={onClose}
            />
          </div>
        </div>
        
        <MobileNavLink to="/portfolio" onClick={onClose}>
          نمونه کارها
        </MobileNavLink>
        <MobileNavLink to="/case-studies" onClick={onClose}>
          مطالعات موردی
        </MobileNavLink>
        <MobileNavLink to="#about" onClick={onClose}>
          درباره ما
        </MobileNavLink>
        <MobileNavLink to="#contact" onClick={onClose}>
          تماس با ما
        </MobileNavLink>
        <Button className="w-full px-4 py-3 rounded-md">
          مشاوره رایگان
        </Button>
      </nav>
    </div>
  );
};

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}

const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => {
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

interface MobileServiceLinkProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MobileServiceLink = ({ 
  to, 
  title,
  description,
  icon,
  onClick 
}: MobileServiceLinkProps) => {
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

export default MobileMenu;
