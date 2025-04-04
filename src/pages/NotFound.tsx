
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const { language, t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const translations = {
    fa: {
      title: "صفحه یافت نشد",
      subtitle: "متأسفانه صفحه مورد نظر شما پیدا نشد.",
      backHome: "بازگشت به صفحه اصلی",
      backPrevious: "بازگشت به صفحه قبلی",
      errorNumber: "404"
    },
    en: {
      title: "Page Not Found",
      subtitle: "Sorry, the page you're looking for doesn't exist.",
      backHome: "Back to Home",
      backPrevious: "Go Back",
      errorNumber: "404"
    },
    ar: {
      title: "الصفحة غير موجودة",
      subtitle: "عذراً، الصفحة التي تبحث عنها غير موجودة.",
      backHome: "العودة إلى الصفحة الرئيسية",
      backPrevious: "العودة للخلف",
      errorNumber: "404"
    }
  };

  const content = translations[language as keyof typeof translations] || translations.en;

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.subtitle}
        noIndex={true}
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring", 
                  stiffness: 200
                }}
              >
                <AlertCircle size={80} className="text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white text-2xl"
              >
                {content.errorNumber}
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {content.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="gap-2"
              asChild
            >
              <Link to={`/${language}`}>
                <Home size={18} />
                {content.backHome}
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              {content.backPrevious}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
