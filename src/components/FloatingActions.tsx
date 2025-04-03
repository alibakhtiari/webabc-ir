
import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, MessageCircleMore } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsultationForm from './ConsultationForm';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingActions: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Detect scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = "+989123456789";
    const message = t('common.whatsappMessage');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {showScrollButton && (
          <Button 
            onClick={scrollToTop} 
            size="icon" 
            className="bg-white text-primary shadow-lg hover:bg-white/90 border border-primary/10 rounded-full h-12 w-12 animate-fade-in"
            aria-label={t('common.backToTop')}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          onClick={() => setConsultationOpen(true)} 
          size="icon" 
          className="bg-primary text-white shadow-lg hover:bg-primary/90 rounded-full h-12 w-12"
          aria-label={t('common.freeConsultation')}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button 
          onClick={openWhatsApp} 
          size="icon" 
          className="bg-green-500 text-white shadow-lg hover:bg-green-600 rounded-full h-12 w-12"
          aria-label={t('common.contactViaWhatsApp')}
        >
          <MessageCircleMore className="h-5 w-5" />
        </Button>
      </div>
      
      <ConsultationForm open={consultationOpen} onOpenChange={setConsultationOpen} />
    </>
  );
};

export default FloatingActions;
