
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleConsultation = () => {
    onClose(); // Close the mobile menu
    setConsultationOpen(true); // Open the consultation form
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-3/4 sm:max-w-md p-0 font-persian" dir="rtl">
          <div className="flex flex-col h-full overflow-auto py-6">
            <div className="px-6 pb-6 border-b">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="text-xl font-bold" onClick={onClose}>
                  WebABC
                </Link>
              </div>
            </div>
  
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-6">
                <li>
                  <Link 
                    to="/" 
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    خانه
                  </Link>
                </li>
  
                <li className="border-b pb-6">
                  <button 
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between text-lg font-medium"
                  >
                    <span>خدمات</span>
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
                      to="/services" 
                      className="block pl-4 border-r-2 pr-3 text-foreground/80 hover:text-primary" 
                      onClick={onClose}
                    >
                      همه خدمات
                    </Link>
                    <Link 
                      to="/seo-services" 
                      className="block pl-4 border-r-2 pr-3 text-foreground/80 hover:text-primary" 
                      onClick={onClose}
                    >
                      خدمات سئو
                    </Link>
                    <Link 
                      to="/local-seo-services" 
                      className="block pl-4 border-r-2 pr-3 text-foreground/80 hover:text-primary" 
                      onClick={onClose}
                    >
                      سئو محلی
                    </Link>
                    <Link 
                      to="/web-development-services" 
                      className="block pl-4 border-r-2 pr-3 text-foreground/80 hover:text-primary" 
                      onClick={onClose}
                    >
                      توسعه وب
                    </Link>
                    <Link 
                      to="/wordpress-woocommerce-development" 
                      className="block pl-4 border-r-2 pr-3 text-foreground/80 hover:text-primary" 
                      onClick={onClose}
                    >
                      وردپرس و ووکامرس
                    </Link>
                  </div>
                </li>
  
                <li>
                  <Link 
                    to="/portfolio" 
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    نمونه کارها
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to="/case-studies" 
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    مطالعات موردی
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to="/about" 
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    درباره ما
                  </Link>
                </li>
  
                <li>
                  <Link 
                    to="/contact" 
                    className="text-lg font-medium" 
                    onClick={onClose}
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </nav>
  
            <div className="p-6 border-t">
              <Button 
                className="w-full"
                onClick={handleConsultation}
              >
                مشاوره رایگان
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
