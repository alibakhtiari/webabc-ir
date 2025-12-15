"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from './ContactForm';

interface ConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t('contact.consultation.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('contact.consultation.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mb-6">
          <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 text-white" size="lg">
            <a
              href="https://wa.me/989125811880"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.whatsapp') || "WhatsApp"}
              title={t('contact.whatsapp') || "WhatsApp"}
            >
              <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.whatsapp') || "WhatsApp"}
            </a>
          </Button>
          <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            <a
              href="tel:+989125811880"
              aria-label={t('contact.callNow') || "Call Now"}
              title={t('contact.callNow') || "Call Now"}
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.callNow') || "Call Now"}
            </a>
          </Button>
        </div>

        <ContactForm onSuccess={() => setTimeout(() => onOpenChange(false), 2000)} />
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
