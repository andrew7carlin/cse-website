
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

import TradeDetail from './pages/TradeDetail';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Where from './pages/Where';

import ProjectDetail from './pages/ProjectDetail';
import FAQ from './pages/FAQ';

import IntroSplash from './components/common/IntroSplash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:tradeId" element={<TradeDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:projectId" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="where" element={<Where />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
