
import React from 'react';
import { useLanguage, languages, SupportedLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  type?: 'dropdown' | 'buttons';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  type = 'dropdown',
  className
}) => {
  const { language, setLanguage, languageMeta } = useLanguage();

  if (type === 'buttons') {
    return (
      <div className={cn("flex space-x-2", className)}>
        {Object.entries(languages).map(([code, lang]) => (
          <Button
            key={code}
            variant={language === code ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(code as SupportedLanguage)}
            className={cn(
              "px-3 min-w-[40px]",
              language === code ? "bg-primary text-white" : "bg-transparent"
            )}
          >
            {lang.nativeName}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-1", className)}
        >
          <Globe className="h-4 w-4" />
          <span>{languageMeta.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as SupportedLanguage)}
            className={cn(
              "cursor-pointer",
              language === code && "bg-primary/10"
            )}
          >
            {lang.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
