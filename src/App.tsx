import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { portfolioItems } from './lib/portfolioData';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Import core pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioItemPage = lazy(() => import('./components/PortfolioItemPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Service pages
const WebDesign = lazy(() => import('./pages/WebDesign'));
const SeoService = lazy(() => import('./pages/SeoService'));
const LocalSeo = lazy(() => import('./pages/LocalSeo'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const ServiceAreas = lazy(() => import('./pages/ServiceAreas'));
const LocationPage = lazy(() => import('./pages/LocationPage'));

// Resources & Tools
const Resources = lazy(() => import('./pages/Resources'));
const SerpPreview = lazy(() => import('./pages/tools/SerpPreview'));
const MetaGenerator = lazy(() => import('./pages/tools/MetaGenerator'));
const PAAScraper = lazy(() => import('./pages/tools/PAAScraper'));
const UTMBuilder = lazy(() => import('./pages/tools/UTMBuilder'));
const HeadlineAnalyzer = lazy(() => import('./pages/tools/HeadlineAnalyzer'));
const ReadabilityChecker = lazy(() => import('./pages/tools/ReadabilityChecker'));
const LoremGenerator = lazy(() => import('./pages/tools/LoremGenerator'));

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-lg">Loading...</div>
          </div>
        }>
          <Routes>
            {/* Language-based routes */}
            <Route path="/:lang" element={<Home />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/contact" element={<Contact />} />
            <Route path="/:lang/services" element={<Services />} />
            <Route path="/:lang/portfolio" element={<Portfolio />} />
            <Route path="/:lang/portfolio/:id" element={<PortfolioItemPage portfolioItems={portfolioItems} />} />
            <Route path="/:lang/blog" element={<BlogPage />} />
            <Route path="/:lang/blog/:slug" element={<BlogPostPage />} />

            {/* Service Pages */}
            <Route path="/:lang/web-design" element={<WebDesign />} />
            <Route path="/:lang/seo-services" element={<SeoService />} />
            <Route path="/:lang/local-seo" element={<LocalSeo />} />
            <Route path="/:lang/web-development-services" element={<WebDevelopment />} />
            <Route path="/:lang/service-areas" element={<ServiceAreas />} />

            {/* Resources & Tools */}
            <Route path="/:lang/resources" element={<Resources />} />
            <Route path="/:lang/tools/serp-preview" element={<SerpPreview />} />
            <Route path="/:lang/tools/meta-generator" element={<MetaGenerator />} />
            <Route path="/:lang/tools/paa-scraper" element={<PAAScraper />} />
            <Route path="/:lang/tools/utm-builder" element={<UTMBuilder />} />
            <Route path="/:lang/tools/headline-analyzer" element={<HeadlineAnalyzer />} />
            <Route path="/:lang/tools/readability-checker" element={<ReadabilityChecker />} />
            <Route path="/:lang/tools/lorem-generator" element={<LoremGenerator />} />

            {/* Location Pages - must be last */}
            <Route path="/:lang/:slug" element={<LocationPage />} />

            {/* Redirect from root to default language */}
            <Route path="/" element={<Navigate to="/fa" replace />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </Router>
  );
}

export default App;
