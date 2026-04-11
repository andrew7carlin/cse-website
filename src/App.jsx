import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './components/layout/Layout';
import SignatureCursor from './components/ui/SignatureCursor';
import ScrollToTop from './components/common/ScrollToTop';

// Eagerly load Home for fast initial paint
import Home from './pages/Home';
import GoogleAnalytics, { trackPageView } from './components/common/GoogleAnalytics';

// Lazy load all other pages for code splitting
const TradeDetail = lazy(() => import('./pages/TradeDetail'));
const Services = lazy(() => import('./pages/Services'));
const PortfolioLanding = lazy(() => import('./pages/PortfolioLanding'));
const CommercialPortfolio = lazy(() => import('./pages/CommercialPortfolio'));
const ResidentialPortfolio = lazy(() => import('./pages/ResidentialPortfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Where = lazy(() => import('./pages/Where'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

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
  return (
    <Router>
      <ScrollToTop />
      <SignatureCursor />
      <GoogleAnalytics />
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
            <Route path="partnerships" element={<Partnerships />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
