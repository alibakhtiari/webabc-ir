
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
import { useLocation, useNavigate } from 'react-router-dom';
import { getPathWithoutLanguage } from '@/lib/languageUtils';

interface LanguageSwitcherProps {
  type?: 'dropdown' | 'buttons';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  type = 'dropdown',
  className
}) => {
  const { language, setLanguage, languageMeta, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathWithoutLang = getPathWithoutLanguage(location.pathname);
  const isRTL = languageMeta.direction === 'rtl';

  const handleLanguageChange = (lang: SupportedLanguage) => {
    console.log(`Switching language to: ${lang}, current path: ${location.pathname}, without lang: ${currentPathWithoutLang}`);
    
    if (lang === language) return;
    
    // Navigate directly to prevent 404 errors during language changes
    const newPath = `/${lang}${currentPathWithoutLang}`;
    navigate(newPath);
    
    // Then update the language in context
    setLanguage(lang);
  };

  if (type === 'buttons') {
    return (
      <div className={cn("flex space-x-2", className, {
        "space-x-0 space-s-2": isRTL
      })}>
        {Object.entries(languages).map(([code, lang]) => (
          <Button
            key={code}
            variant={language === code ? "default" : "outline"}
            size="sm"
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            className={cn(
              "px-3 min-w-[40px]",
              isRTL ? "ms-2" : "me-2",
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
      <DropdownMenuContent align={isRTL ? "start" : "end"}>
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
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
