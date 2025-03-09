
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Globe, Code, Layout, ShoppingCart } from 'lucide-react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-foreground/80 font-persian text-base hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

export const ServicesDropdown = () => {
  return (
    <div className="relative group">
      <button className="flex items-center text-foreground/80 font-persian text-base hover:text-primary transition-colors">
        خدمات
        <ChevronDown className="h-4 w-4 mr-1 group-hover:rotate-180 transition-transform duration-200" />
      </button>
      
      {/* Mega Menu */}
      <div className="absolute top-full right-0 mt-2 w-[680px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="glass-morphism p-6 animate-zoom-in shadow-xl">
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
                <ServiceLink 
                  to="/services" 
                  title="همه خدمات"
                  description="مشاهده لیست کامل خدمات"
                  icon={<Globe />}
                />
                <ServiceLink 
                  to="/seo-services" 
                  title="خدمات سئو"
                  description="بهینه‌سازی برای موتورهای جستجو"
                  icon={<Globe />}
                />
                <ServiceLink 
                  to="/local-seo-services" 
                  title="سئو محلی"
                  description="افزایش حضور محلی کسب و کار"
                  icon={<Globe />}
                />
                <ServiceLink 
                  to="/web-development-services" 
                  title="توسعه وب"
                  description="طراحی و توسعه وب‌سایت‌های مدرن"
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
  return (
    <li>
      <Link 
        to={to} 
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
