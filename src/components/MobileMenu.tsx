
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { t, language, languageMeta } = useLanguage();

  const handleConsultation = () => {
    onClose(); // Close the mobile menu
    setConsultationOpen(true); // Open the consultation form
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={languageMeta.direction === 'rtl' ? 'left' : 'right'} className="w-3/4 sm:max-w-md p-0 font-persian" dir={languageMeta.direction}>
          <div className="flex flex-col h-full overflow-auto py-6">
            <div className="px-6 pb-6 border-b">
              <div className="flex items-center justify-between mb-6">
                <Link to={`/${language}`} className="text-xl font-bold" onClick={onClose}>
                  WebABC
                </Link>
              </div>
            </div>
  
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-6">
                <li>
                  <Link 
                    to={`/${language}`}
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    {t('common.home')}
                  </Link>
                </li>
  
                <li className="border-b pb-6">
                  <button 
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between text-lg font-medium"
                  >
                    <span>{t('common.services')}</span>
                    <span className="text-gray-400">
                      {servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
  
                  <div 
                    className={cn(
                      "overflow-hidden transition-all mt-4 space-y-3",
                      servicesOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <Link 
                      to={`/${language}/services`}
                      className={`block ${languageMeta.direction === 'rtl' ? 'pr-3 border-r-2' : 'pl-3 border-l-2'} text-foreground/80 hover:text-primary`}
                      onClick={onClose}
                    >
                      {t('common.allServices')}
                    </Link>
                    <Link 
                      to={`/${language}/seo-services`}
                      className={`block ${languageMeta.direction === 'rtl' ? 'pr-3 border-r-2' : 'pl-3 border-l-2'} text-foreground/80 hover:text-primary`}
                      onClick={onClose}
                    >
                      {t('common.services')} SEO
                    </Link>
                    <Link 
                      to={`/${language}/local-seo-services`}
                      className={`block ${languageMeta.direction === 'rtl' ? 'pr-3 border-r-2' : 'pl-3 border-l-2'} text-foreground/80 hover:text-primary`}
                      onClick={onClose}
                    >
                      {t('common.services')} SEO {language === 'en' ? 'Local' : language === 'ar' ? 'المحلي' : 'محلی'}
                    </Link>
                    <Link 
                      to={`/${language}/web-development-services`}
                      className={`block ${languageMeta.direction === 'rtl' ? 'pr-3 border-r-2' : 'pl-3 border-l-2'} text-foreground/80 hover:text-primary`}
                      onClick={onClose}
                    >
                      {language === 'en' ? 'Web Development' : language === 'ar' ? 'تطوير المواقع' : 'توسعه وب'}
                    </Link>
                    <Link 
                      to={`/${language}/wordpress-woocommerce-development`}
                      className={`block ${languageMeta.direction === 'rtl' ? 'pr-3 border-r-2' : 'pl-3 border-l-2'} text-foreground/80 hover:text-primary`}
                      onClick={onClose}
                    >
                      {t('wordpress.wordpressAndWoocommerce')}
                    </Link>
                  </div>
                </li>
  
                <li>
                  <Link 
                    to={`/${language}/portfolio`}
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    {t('common.portfolio')}
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to={`/${language}/case-studies`}
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    {t('common.caseStudies')}
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to={`/${language}/about`}
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    {t('common.about')}
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to={`/${language}/contact`}
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
