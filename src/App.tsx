
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";
import SeoServices from "./pages/SeoServices";
import LocalSeoServices from "./pages/LocalSeoServices";
import WebDevelopmentServices from "./pages/WebDevelopmentServices";
import WordpressWoocommerceDevelopment from "./pages/WordpressWoocommerceDevelopment";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
