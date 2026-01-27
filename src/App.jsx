import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import MouseGlow from './components/ui/MouseGlow';
import ScrollToTop from './components/common/ScrollToTop';

// Eagerly load Home for fast initial paint
import Home from './pages/Home';

// Lazy load all other pages for code splitting
const TradeDetail = lazy(() => import('./pages/TradeDetail'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Where = lazy(() => import('./pages/Where'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MouseGlow />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:tradeId" element={<TradeDetail />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:projectId" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="where" element={<Where />} />
            <Route path="partnerships" element={<Partnerships />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
