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

interface ConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { t, languageMeta } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock form submission - in production, connect to your backend
    toast({
      title: t('consultation.formSubmitted'),
      description: t('consultation.formSubmittedDesc'),
      duration: 5000,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t('consultation.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('consultation.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">{t('consultation.fullName')}</label>
            <Input id="name" className={`w-full ${languageMeta.direction === 'rtl' ? 'text-right' : 'text-left'}`} required />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">{t('consultation.phone')}</label>
            <Input id="phone" type="tel" className={`w-full ${languageMeta.direction === 'rtl' ? 'text-right' : 'text-left'}`} required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">{t('consultation.email')}</label>
            <Input id="email" type="email" className={`w-full ${languageMeta.direction === 'rtl' ? 'text-right' : 'text-left'}`} />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">{t('consultation.message')}</label>
            <Textarea id="message" className={`w-full ${languageMeta.direction === 'rtl' ? 'text-right' : 'text-left'} h-24`} />
          </div>

          <div className={`flex justify-end ${languageMeta.direction === 'rtl' ? 'space-x-2 space-x-reverse' : 'space-x-2'} pt-2`}>
            <DialogClose asChild>
              <Button type="button" variant="outline">{t('common.cancel')}</Button>
            </DialogClose>
            <Button type="submit">{t('common.sendRequest')}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
