
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

  return (
    <>
      <SEOHead
        title={t('notFound.title')}
        description={t('notFound.subtitle')}
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
                {t('notFound.errorNumber')}
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {t('notFound.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            {t('notFound.subtitle')}
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
                {t('notFound.backHome')}
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              {t('notFound.backPrevious')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
