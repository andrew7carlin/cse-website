import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';

// SignatureCursor pulls in GSAP (~70 kB / 27 kB gzip) and is entirely useless
// on touch devices — it bails out of rendering once it sees a touch pointer.
// Loading it lazily and only on `pointer: fine` devices keeps GSAP out of the
// mobile bundle completely (which is what Lighthouse audits).
const SignatureCursor = lazy(() => import('./components/ui/SignatureCursor'));

// Only Home is eager — every other route is lazy. About/Contact were briefly
// eager-imported to fix LCP-discovery on those routes, but that added ~10 kB
// gzip to the home-page initial bundle. Instead we keep them lazy and
// idle-prefetch them after the home page is interactive (see useIdlePrefetch
// below), which preserves the LCP fix while keeping the home entry small.
import Home from './pages/Home';
import GoogleTagManager from './components/common/GoogleTagManager';
import { trackPageView } from './components/common/analytics';
import SchemaMarkup from './components/common/SchemaMarkup';

// Lazy-loaded routes. Imports are extracted into named functions so they can
// be reused by the idle-prefetch hook below.
const importAbout                = () => import('./pages/About');
const importContact              = () => import('./pages/Contact');
const importServices             = () => import('./pages/Services');
const importTradeDetail          = () => import('./pages/TradeDetail');
const importPortfolioLanding     = () => import('./pages/PortfolioLanding');
const importCommercialPortfolio  = () => import('./pages/CommercialPortfolio');
const importResidentialPortfolio = () => import('./pages/ResidentialPortfolio');
const importCareers              = () => import('./pages/Careers');
const importWhere                = () => import('./pages/Where');
const importPartnerships         = () => import('./pages/Partnerships');
const importProjectDetail        = () => import('./pages/ProjectDetail');
const importFAQ                  = () => import('./pages/FAQ');
const importNotFound             = () => import('./pages/NotFound');
const importPrivacy              = () => import('./pages/Privacy');
const importTerms                = () => import('./pages/Terms');
const importLocationPage         = () => import('./pages/LocationPage');
const importThankYou             = () => import('./pages/ThankYou');
const importBlog                 = () => import('./pages/Blog');
const importBlogPost             = () => import('./pages/BlogPost');

const About                = lazy(importAbout);
const Contact              = lazy(importContact);
const Services             = lazy(importServices);
const TradeDetail          = lazy(importTradeDetail);
const PortfolioLanding     = lazy(importPortfolioLanding);
const CommercialPortfolio  = lazy(importCommercialPortfolio);
const ResidentialPortfolio = lazy(importResidentialPortfolio);
const Careers              = lazy(importCareers);
const Where                = lazy(importWhere);
const Partnerships         = lazy(importPartnerships);
const ProjectDetail        = lazy(importProjectDetail);
const FAQ                  = lazy(importFAQ);
const NotFound             = lazy(importNotFound);
const Privacy              = lazy(importPrivacy);
const Terms                = lazy(importTerms);
const LocationPage         = lazy(importLocationPage);
const ThankYou             = lazy(importThankYou);
const Blog                 = lazy(importBlog);
const BlogPost             = lazy(importBlogPost);

// After the page is interactive (during browser idle time), prefetch the
// chunks for the most-likely next navigation. Click → render feels instant
// because the chunk is already cached, but the home-page critical path
// doesn't pay the parse/execute cost up front.
function useIdlePrefetch() {
  useEffect(() => {
    const prefetch = () => {
      importAbout();
      importContact();
      importServices();
      importPortfolioLanding();
      importBlog();
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback?.(id);
    }
    // Safari fallback — schedule after the page is interactive
    const id = window.setTimeout(prefetch, 2500);
    return () => window.clearTimeout(id);
  }, []);
}

// Loading fallback component
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-bg-base)'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--color-divider)',
      borderTopColor: 'var(--color-copper)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
  </div>
);

// Tracks page views on every SPA route change
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);
  return null;
}

function App() {
  useIdlePrefetch();
  // Only load SignatureCursor on devices with a real mouse — keeps GSAP out of
  // the mobile critical path. State updates after mount so SSR/initial paint
  // never tries to evaluate window.matchMedia.
  const [enableCursor, setEnableCursor] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(pointer: fine)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnableCursor(true);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {enableCursor && (
        <Suspense fallback={null}>
          <SignatureCursor />
        </Suspense>
      )}
      <GoogleTagManager />
      <SchemaMarkup />
      <RouteTracker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:tradeId" element={<TradeDetail />} />
            <Route path="portfolio" element={<PortfolioLanding />} />
            <Route path="portfolio/commercial" element={<CommercialPortfolio />} />
            <Route path="portfolio/residential" element={<ResidentialPortfolio />} />
            <Route path="portfolio/:projectId" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="where" element={<Where />} />
            <Route path="locations/:locationId" element={<LocationPage />} />
            <Route path="partnerships" element={<Partnerships />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
