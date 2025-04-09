
import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';

// Loading indicator
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Import critical components
import PagePreloader from './components/PagePreloader';
import FloatingActions from './components/FloatingActions';

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioItemPage = lazy(() => import("./components/PortfolioItemPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SeoServices = lazy(() => import("./pages/SeoServices"));
const LocalSeoServices = lazy(() => import("./pages/LocalSeoServices"));
const WebDevelopmentServices = lazy(() => import("./pages/WebDevelopmentServices"));
const WordpressWoocommerceDevelopment = lazy(() => import("./pages/WordpressWoocommerceDevelopment"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// Create and configure QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Dynamically import portfolio data
const portfolioData = lazy(() => import('./lib/portfolioData').then(module => ({
  default: module.portfolioItems
})));

const App = () => {
  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.error('Service Worker registration failed:', error);
        });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <PagePreloader />
              <FloatingActions />
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Root redirect - will be handled by LanguageProvider to redirect to correct language */}
                  <Route path="/" element={<Navigate to="/en" replace />} />
                  
                  {/* Language-specific routes */}
                  {['fa', 'en', 'ar'].map(lang => (
                    <React.Fragment key={lang}>
                      <Route path={`/${lang}`} element={<Index />} />
                      <Route path={`/${lang}/services`} element={<Services />} />
                      <Route path={`/${lang}/portfolio`} element={<Portfolio />} />
                      <Route path={`/${lang}/portfolio/:id`} element={
                        <Suspense fallback={<LoadingScreen />}>
                          <PortfolioItemPage portfolioItems={[]} />
                        </Suspense>
                      } />
                      <Route path={`/${lang}/case-studies`} element={<CaseStudies />} />
                      <Route path={`/${lang}/seo-services`} element={<SeoServices />} />
                      <Route path={`/${lang}/local-seo-services`} element={<LocalSeoServices />} />
                      <Route path={`/${lang}/web-development-services`} element={<WebDevelopmentServices />} />
                      <Route path={`/${lang}/wordpress-woocommerce-development`} element={<WordpressWoocommerceDevelopment />} />
                      <Route path={`/${lang}/contact`} element={<Contact />} />
                      <Route path={`/${lang}/about`} element={<About />} />
                    </React.Fragment>
                  ))}
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </TooltipProvider>
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
