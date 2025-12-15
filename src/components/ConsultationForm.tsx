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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
          <DialogTitle className="text-center text-xl">{t('consultation.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('consultation.description')}
          </DialogDescription>
        </DialogHeader>

        <ContactForm onSuccess={() => setTimeout(() => onOpenChange(false), 2000)} />
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
