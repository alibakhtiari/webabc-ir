
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
import { X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock form submission - in production, connect to your backend
    toast({
      title: "فرم ارسال شد",
      description: "کارشناسان ما به زودی با شما تماس خواهند گرفت.",
      duration: 5000,
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">درخواست مشاوره رایگان</DialogTitle>
          <DialogDescription className="text-center">
            فرم زیر را تکمیل کنید تا کارشناسان ما با شما تماس بگیرند.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">نام و نام خانوادگی</label>
            <Input id="name" className="w-full text-right" required />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">شماره تماس</label>
            <Input id="phone" type="tel" className="w-full text-right" required />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">ایمیل (اختیاری)</label>
            <Input id="email" type="email" className="w-full text-right" />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">توضیحات</label>
            <Textarea id="message" className="w-full text-right h-24" />
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">انصراف</Button>
            </DialogClose>
            <Button type="submit">ارسال درخواست</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
