"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import "@/animations.css";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <>
      <SEOHead
        title={t('notFound.title')}
        description={t('notFound.subtitle')}
        noIndex={true}
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-gray-100 p-4">
        <div className="text-center max-w-md animate-fadeInUp">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="animate-scaleIn">
                <AlertCircle size={80} className="text-primary" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white text-2xl animate-fadeIn delay-300">
                {t('notFound.errorNumber')}
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInUp delay-100">
            {t('notFound.title')}
          </h1>

          <p className="text-xl text-gray-600 mb-8 animate-fadeInUp delay-200">
            {t('notFound.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
            <Button
              variant="default"
              size="lg"
              className="gap-2"
              asChild
            >
              <Link href={`/${language}`}>
                <Home size={18} />
                {t('notFound.backHome')}
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft size={18} />
              {t('notFound.backPrevious')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
