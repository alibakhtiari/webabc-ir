
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LoadingSpinner from './components/LoadingSpinner';
import { portfolioItems } from './lib/portfolioData';

// Import core pages - make sure Home is properly imported
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

function App() {
  console.log("App rendering");
  return (
    <Router>
      <LanguageProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Root route - redirect to language home */}
            <Route path="/" element={<Navigate to="/fa" replace />} />
            
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
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </Router>
  );
}

export default App;
