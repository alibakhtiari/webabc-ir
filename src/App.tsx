
import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import PagePreloader from './components/PagePreloader';
import FloatingActions from './components/FloatingActions';
import { portfolioItems } from './lib/portfolioData';

// Loading indicator
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Lazy load all pages
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PagePreloader />
          <FloatingActions />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioItemPage portfolioItems={portfolioItems} />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/seo-services" element={<SeoServices />} />
              <Route path="/local-seo-services" element={<LocalSeoServices />} />
              <Route path="/web-development-services" element={<WebDevelopmentServices />} />
              <Route path="/wordpress-woocommerce-development" element={<WordpressWoocommerceDevelopment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
